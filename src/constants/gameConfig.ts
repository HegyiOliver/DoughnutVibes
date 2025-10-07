import { GameConfig } from '@/types/game.types';

// Game configuration constants
export const GAME_CONFIG: GameConfig = {
  gridSize: 5,
  minMatchLength: 3,
  pointsPerMatch: 50,
  pointsPerPiece: 10,
  comboMultiplier: 1.5,
  specialMoveThreshold: 4,
  initialMoves: 30,
  movesPerLevel: 5,
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  SWAP: 400,
  MATCH: 600,
  FALL: 800,
  FILL: 500,
  BOUNCE_IN: 500,
  POP: 300,
  SHAKE: 600,
};

// Grid constants
export const GRID_SIZE = 5;
export const CELL_SIZE = 64; // pixels
export const CELL_GAP = 8; // pixels

// Score multipliers
export const SCORE_MULTIPLIERS = {
  MATCH_3: 1,
  MATCH_4: 2,
  MATCH_5: 3,
  COMBO_2: 1.5,
  COMBO_3: 2,
  COMBO_4: 2.5,
  COMBO_5_PLUS: 3,
  SPECIAL_PIECE: 2,
  GOLDEN_PIECE: 5,
};

// Local storage keys
export const STORAGE_KEYS = {
  HIGH_SCORE: 'doughnutvibes_high_score',
  CURRENT_LEVEL: 'doughnutvibes_current_level',
  GAME_STATE: 'doughnutvibes_game_state',
  SETTINGS: 'doughnutvibes_settings',
  SOUND_ENABLED: 'doughnutvibes_sound_enabled',
  MUSIC_ENABLED: 'doughnutvibes_music_enabled',
};

// Doughnut colors for rendering (4 types including rare SenseNet)
export const DOUGHNUT_COLORS = {
  blue: '#0192db',
  golden: '#FFD700',
  vanilla: '#FFFFFF',
  sensenet: '#e7000b',
};

// Rare doughnut spawn rate (SenseNet special doughnut)
export const SENSENET_SPAWN_RATE = 0.02; // 2% chance

// SenseNet achievement catchphrases (every 1000 points)
export const SENSENET_CATCHPHRASES = [
  '🚀 Innovation at startup speed!',
  '⚡ S.N.A.P. methodology in action!',
  '🎯 Achieving product-market fit!',
  '💡 Building with purpose and values!',
  '🔥 Lean-agile thinking at work!',
  '✨ MVP mindset unlocked!',
  '🏆 Delivering impact, not just code!',
  '⭐ Moving fast, staying focused!',
  '🎨 Design thinking excellence!',
  '💪 Human experience meets A.I. power!',
  '🌟 Startup culture amplified!',
  '🚀 From idea to impact!',
  '⚙️ DevSecOps mastery!',
  '🎪 Agile at scale!',
  '🔮 Digital transformation accelerated!',
];

// Level configurations (4 doughnut types: blue, golden, vanilla, and rare sensenet)
export const LEVEL_CONFIGS = [
  { level: 1, targetScore: 1000, moves: 30, difficulty: 'easy' as const, specialDoughnutChance: 0.05, goldDoughnutChance: 0.08 },
  { level: 2, targetScore: 2000, moves: 28, difficulty: 'easy' as const, specialDoughnutChance: 0.05, goldDoughnutChance: 0.08 },
  { level: 3, targetScore: 3500, moves: 26, difficulty: 'medium' as const, specialDoughnutChance: 0.07, goldDoughnutChance: 0.10 },
  { level: 4, targetScore: 5000, moves: 24, difficulty: 'medium' as const, specialDoughnutChance: 0.07, goldDoughnutChance: 0.10 },
  { level: 5, targetScore: 7000, moves: 22, difficulty: 'hard' as const, specialDoughnutChance: 0.1, goldDoughnutChance: 0.12 },
];

// Game messages
export const GAME_MESSAGES = {
  WELCOME: 'Welcome to DoughnutVibes! 🍩',
  MATCH_3: 'Nice match!',
  MATCH_4: 'Great combo! 🔥',
  MATCH_5: 'Amazing! 🌟',
  COMBO_2: 'Double combo!',
  COMBO_3: 'Triple combo! 💥',
  COMBO_4_PLUS: 'Mega combo! 🚀',
  LEVEL_COMPLETE: 'Level Complete! 🎉',
  GAME_OVER: 'Game Over',
  NEW_HIGH_SCORE: 'New High Score! 👑',
  NO_MOVES: 'No more moves available!',
  SPECIAL_ACTIVATED: 'Special power activated! ✨',
};
