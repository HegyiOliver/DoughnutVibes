// Doughnut types
export enum DoughnutType {
  BLUE = 'blue',
  GOLDEN = 'golden',
  VANILLA = 'vanilla',
  SENSENET = 'sensenet',
}

// Special effects for power-ups
export enum SpecialEffect {
  NONE = 'none',
  LINE_CLEAR_H = 'line-clear-horizontal',
  LINE_CLEAR_V = 'line-clear-vertical',
  CROSS_CLEAR = 'cross-clear',
  EXPLOSION = 'explosion',
  COLOR_BOMB = 'color-bomb',
}

// Grid position
export interface GridPosition {
  row: number;
  col: number;
}

// Doughnut piece
export interface DoughnutPiece {
  id: string;
  type: DoughnutType;
  position: GridPosition;
  isAnimating: boolean;
  isMatched: boolean;
  specialEffect: SpecialEffect;
}

// Match result
export interface Match {
  pieces: DoughnutPiece[];
  type: 'horizontal' | 'vertical' | 'both';
  length: number;
  position: GridPosition;
}

// Game move
export interface Move {
  from: GridPosition;
  to: GridPosition;
}

// Game statistics
export interface GameStats {
  score: number;
  level: number;
  moves: number;
  highScore: number;
  matchesCount: number;
  specialMovesUsed: number;
}

// Game state
export interface GameState {
  grid: DoughnutPiece[][];
  stats: GameStats;
  isPlaying: boolean;
  isPaused: boolean;
  selectedPiece: GridPosition | null;
  isProcessing: boolean;
}

// Game configuration
export interface GameConfig {
  gridSize: number;
  minMatchLength: number;
  pointsPerMatch: number;
  pointsPerPiece: number;
  comboMultiplier: number;
  specialMoveThreshold: number;
  initialMoves: number;
  movesPerLevel: number;
}

// Level configuration
export interface LevelConfig {
  level: number;
  targetScore: number;
  moves: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  specialDoughnutChance: number;
  goldDoughnutChance: number;
}

// Animation state
export interface AnimationState {
  type: 'swap' | 'match' | 'fall' | 'fill';
  pieces: DoughnutPiece[];
  duration: number;
}
