import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, DoughnutPiece, GridPosition, GameStats } from '@/types/game.types';
import { GAME_CONFIG, STORAGE_KEYS } from '@/constants/gameConfig';

interface GameStore extends GameState {
  // Actions
  initializeGame: () => void;
  resetGame: () => void;
  makeMove: (from: GridPosition, to: GridPosition) => void;
  selectPiece: (position: GridPosition | null) => void;
  updateScore: (points: number) => void;
  decrementMoves: () => void;
  setProcessing: (isProcessing: boolean) => void;
  setPaused: (isPaused: boolean) => void;
  nextLevel: () => void;
  gameOver: () => void;
  setGrid: (grid: DoughnutPiece[][]) => void;
  // Achievement system
  lastAchievementScore: number;
  achievementMessage: string;
  showAchievement: boolean;
  setShowAchievement: (show: boolean) => void;
}

const initialStats: GameStats = {
  score: 0,
  level: 1,
  moves: GAME_CONFIG.initialMoves,
  highScore: 0,
  matchesCount: 0,
  specialMovesUsed: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      grid: [],
      stats: initialStats,
      isPlaying: false,
      isPaused: false,
      selectedPiece: null,
      isProcessing: false,
      // Achievement state
      lastAchievementScore: 0,
      achievementMessage: '',
      showAchievement: false,

      // Initialize game
      initializeGame: () => {
        set({
          grid: [],
          stats: { ...initialStats, highScore: get().stats.highScore },
          isPlaying: true,
          isPaused: false,
          selectedPiece: null,
          isProcessing: false,
        });
      },

      // Reset game
      resetGame: () => {
        set({
          grid: [],
          stats: { ...initialStats, highScore: get().stats.highScore },
          isPlaying: false,
          isPaused: false,
          selectedPiece: null,
          isProcessing: false,
        });
      },

      // Make a move
      makeMove: async (from: GridPosition, to: GridPosition) => {
        const { grid, isProcessing, selectPiece, updateScore, decrementMoves, setProcessing } = get();
        if (isProcessing || grid.length === 0) return;
        
        // Don't allow move to the same position
        if (from.row === to.row && from.col === to.col) {
          selectPiece(null);
          return;
        }

        // Check if pieces are adjacent
        const { areAdjacent, swapPieces, dropPieces } = await import('@/utils/gridUtils');
        const { findMatches, calculateScore, removeMatches } = await import('@/utils/matchUtils');
        
        if (!areAdjacent(from, to)) {
          selectPiece(null);
          return;
        }

        setProcessing(true);
        selectPiece(null);

        // Swap pieces
        let newGrid = swapPieces(grid, from, to);
        
        // Check for matches
        const matches = findMatches(newGrid);
        
        if (matches.length === 0) {
          // No matches, swap back with smooth animation
          setTimeout(() => {
            newGrid = swapPieces(newGrid, to, from);
            set({ grid: newGrid, isProcessing: false });
          }, 400);
          return;
        }

        // Valid move - update grid and process matches
        set({ grid: newGrid });
        decrementMoves();

        // Recursive function to process chain reactions
        const processChainReactions = (currentGrid: DoughnutPiece[][], comboMultiplier: number = 1) => {
          const currentMatches = findMatches(currentGrid);
          
          if (currentMatches.length === 0) {
            // No more matches, we're done
            set({ isProcessing: false });
            return;
          }

          // Calculate score with combo multiplier
          const score = calculateScore(currentMatches, comboMultiplier);
          updateScore(score);
          
          // Mark matched pieces
          currentGrid = removeMatches(currentGrid, currentMatches);
          set({ grid: currentGrid });

          // Drop pieces and fill empty spaces
          setTimeout(() => {
            currentGrid = dropPieces(currentGrid);
            set({ grid: currentGrid });
            
            // Check for new matches after dropping and continue recursively
            setTimeout(() => {
              processChainReactions(currentGrid, Math.min(comboMultiplier + 0.5, 3));
            }, 500);
          }, 600);
        };

        // Start processing chain reactions with initial matches
        setTimeout(() => {
          processChainReactions(newGrid, 1);
        }, 400);
      },

      // Select a piece
      selectPiece: (position: GridPosition | null) => {
        set({ selectedPiece: position });
      },

      // Update score
      updateScore: async (points: number) => {
        const { SENSENET_CATCHPHRASES } = await import('@/constants/gameConfig');
        
        set((state) => {
          const newScore = state.stats.score + points;
          const newHighScore = Math.max(newScore, state.stats.highScore);
          
          // Check for achievement milestone (every 1000 points)
          const currentMilestone = Math.floor(newScore / 1000);
          const lastMilestone = Math.floor(state.lastAchievementScore / 1000);
          
          let newAchievementMessage = state.achievementMessage;
          let newShowAchievement = state.showAchievement;
          let newLevel = state.stats.level;
          
          if (currentMilestone > lastMilestone && newScore >= 1000) {
            // New achievement unlocked!
            const phraseIndex = (currentMilestone - 1) % SENSENET_CATCHPHRASES.length;
            newAchievementMessage = SENSENET_CATCHPHRASES[phraseIndex];
            newShowAchievement = true;
            // Increment level when achievement is unlocked
            newLevel = state.stats.level + 1;
          }
          
          return {
            stats: {
              ...state.stats,
              score: newScore,
              highScore: newHighScore,
              level: newLevel,
            },
            lastAchievementScore: newScore,
            achievementMessage: newAchievementMessage,
            showAchievement: newShowAchievement,
          };
        });
      },

      // Decrement moves
      decrementMoves: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            moves: Math.max(0, state.stats.moves - 1),
          },
        }));
      },

      // Set processing state
      setProcessing: (isProcessing: boolean) => {
        set({ isProcessing });
      },

      // Set paused state
      setPaused: (isPaused: boolean) => {
        set({ isPaused });
      },

      // Next level
      nextLevel: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            level: state.stats.level + 1,
            moves: GAME_CONFIG.initialMoves + (state.stats.level * GAME_CONFIG.movesPerLevel),
          },
        }));
      },

      // Game over
      gameOver: () => {
        set({
          isPlaying: false,
          isProcessing: false,
        });
      },

      // Set grid
      setGrid: (grid: DoughnutPiece[][]) => {
        set({ grid });
      },

      // Set achievement visibility
      setShowAchievement: (show: boolean) => {
        set({ showAchievement: show });
      },
    }),
    {
      name: STORAGE_KEYS.GAME_STATE,
      partialize: (state) => ({
        stats: { highScore: state.stats.highScore },
      }),
    }
  )
);
