import { DoughnutPiece, GridPosition, DoughnutType, SpecialEffect } from '@/types/game.types';
import { GAME_CONFIG } from '@/constants/gameConfig';

/**
 * Generate a random doughnut type (4 types: blue, golden, vanilla, sensenet)
 * SenseNet is very rare (2% chance), others have equal probability
 */
export function generateRandomDoughnut(_: number = 0.05): DoughnutType {
  const random = Math.random();
  
  // 2% chance for rare SenseNet doughnut
  if (random < 0.02) {
    return DoughnutType.SENSENET;
  }
  
  // Remaining 98% distributed equally among blue, golden, vanilla
  const types = [
    DoughnutType.BLUE,
    DoughnutType.GOLDEN,
    DoughnutType.VANILLA,
  ];
  return types[Math.floor(Math.random() * types.length)];
}

/**
 * Create a new doughnut piece
 */
export function createDoughnutPiece(
  row: number,
  col: number,
  type?: DoughnutType
): DoughnutPiece {
  return {
    id: `${row}-${col}-${Date.now()}-${Math.random()}`,
    type: type || generateRandomDoughnut(),
    position: { row, col },
    isAnimating: false,
    isMatched: false,
    specialEffect: SpecialEffect.NONE,
  };
}

/**
 * Initialize the game grid with random doughnuts
 * Ensures no initial matches
 */
export function initializeGrid(size: number = GAME_CONFIG.gridSize): DoughnutPiece[][] {
  const grid: DoughnutPiece[][] = [];

  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      let doughnut: DoughnutPiece;
      let attempts = 0;
      const maxAttempts = 10;

      do {
        doughnut = createDoughnutPiece(row, col);
        attempts++;
      } while (
        attempts < maxAttempts &&
        wouldCreateMatch(grid, doughnut, row, col)
      );

      grid[row][col] = doughnut;
    }
  }

  return grid;
}

/**
 * Check if placing a doughnut would create a match
 */
function wouldCreateMatch(
  grid: DoughnutPiece[][],
  doughnut: DoughnutPiece,
  row: number,
  col: number
): boolean {
  // Check horizontal
  let horizontalCount = 1;
  // Check left
  for (let c = col - 1; c >= 0 && grid[row][c]?.type === doughnut.type; c--) {
    horizontalCount++;
  }
  // Check right
  for (let c = col + 1; c < grid[row]?.length && grid[row][c]?.type === doughnut.type; c++) {
    horizontalCount++;
  }

  if (horizontalCount >= GAME_CONFIG.minMatchLength) return true;

  // Check vertical
  let verticalCount = 1;
  // Check up
  for (let r = row - 1; r >= 0 && grid[r]?.[col]?.type === doughnut.type; r--) {
    verticalCount++;
  }
  // Check down
  for (let r = row + 1; r < grid.length && grid[r]?.[col]?.type === doughnut.type; r++) {
    verticalCount++;
  }

  return verticalCount >= GAME_CONFIG.minMatchLength;
}

/**
 * Check if two positions are adjacent
 */
export function areAdjacent(pos1: GridPosition, pos2: GridPosition): boolean {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * Swap two pieces in the grid
 */
export function swapPieces(
  grid: DoughnutPiece[][],
  pos1: GridPosition,
  pos2: GridPosition
): DoughnutPiece[][] {
  const newGrid = grid.map(row => [...row]);
  const temp = newGrid[pos1.row][pos1.col];
  newGrid[pos1.row][pos1.col] = newGrid[pos2.row][pos2.col];
  newGrid[pos2.row][pos2.col] = temp;

  // Update positions
  newGrid[pos1.row][pos1.col].position = pos1;
  newGrid[pos2.row][pos2.col].position = pos2;

  return newGrid;
}

/**
 * Check if position is valid within grid
 */
export function isValidPosition(position: GridPosition, gridSize: number = GAME_CONFIG.gridSize): boolean {
  return (
    position.row >= 0 &&
    position.row < gridSize &&
    position.col >= 0 &&
    position.col < gridSize
  );
}

/**
 * Drop pieces down to fill empty spaces
 * Creates new pieces to fill the grid
 */
export function dropPieces(grid: DoughnutPiece[][]): DoughnutPiece[][] {
  const size = grid.length;
  const newGrid = grid.map(row => [...row]);

  // Process each column from bottom to top
  for (let col = 0; col < size; col++) {
    // Collect non-matched pieces
    const pieces: DoughnutPiece[] = [];
    for (let row = size - 1; row >= 0; row--) {
      if (!newGrid[row][col].isMatched) {
        pieces.push(newGrid[row][col]);
      }
    }

    // Fill from bottom with existing pieces
    let rowIndex = size - 1;
    pieces.forEach(piece => {
      newGrid[rowIndex][col] = {
        ...piece,
        position: { row: rowIndex, col },
        isAnimating: true,
      };
      rowIndex--;
    });

    // Fill remaining spaces with new pieces
    while (rowIndex >= 0) {
      newGrid[rowIndex][col] = createDoughnutPiece(rowIndex, col);
      newGrid[rowIndex][col].isAnimating = true;
      rowIndex--;
    }
  }

  return newGrid;
}
