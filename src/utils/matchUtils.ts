import { DoughnutPiece, Match, GridPosition } from '@/types/game.types';
import { GAME_CONFIG } from '@/constants/gameConfig';

/**
 * Find all matches in the grid
 */
export function findMatches(grid: DoughnutPiece[][]): Match[] {
  const matches: Match[] = [];
  const size = grid.length;

  // Find horizontal matches
  for (let row = 0; row < size; row++) {
    let matchLength = 1;
    let matchType = grid[row][0].type;

    for (let col = 1; col <= size; col++) {
      if (col < size && grid[row][col].type === matchType) {
        matchLength++;
      } else {
        if (matchLength >= GAME_CONFIG.minMatchLength) {
          const pieces: DoughnutPiece[] = [];
          for (let i = col - matchLength; i < col; i++) {
            pieces.push(grid[row][i]);
          }
          matches.push({
            pieces,
            type: 'horizontal',
            length: matchLength,
            position: { row, col: col - matchLength },
          });
        }
        if (col < size) {
          matchLength = 1;
          matchType = grid[row][col].type;
        }
      }
    }
  }

  // Find vertical matches
  for (let col = 0; col < size; col++) {
    let matchLength = 1;
    let matchType = grid[0][col].type;

    for (let row = 1; row <= size; row++) {
      if (row < size && grid[row][col].type === matchType) {
        matchLength++;
      } else {
        if (matchLength >= GAME_CONFIG.minMatchLength) {
          const pieces: DoughnutPiece[] = [];
          for (let i = row - matchLength; i < row; i++) {
            pieces.push(grid[i][col]);
          }
          matches.push({
            pieces,
            type: 'vertical',
            length: matchLength,
            position: { row: row - matchLength, col },
          });
        }
        if (row < size) {
          matchLength = 1;
          matchType = grid[row][col].type;
        }
      }
    }
  }

  return matches;
}

/**
 * Check if the grid has any possible moves
 */
export function hasPossibleMoves(grid: DoughnutPiece[][]): boolean {
  const size = grid.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // Try swapping with right neighbor
      if (col < size - 1) {
        const testGrid = swapForTest(grid, { row, col }, { row, col: col + 1 });
        if (findMatches(testGrid).length > 0) {
          return true;
        }
      }
      // Try swapping with bottom neighbor
      if (row < size - 1) {
        const testGrid = swapForTest(grid, { row, col }, { row: row + 1, col });
        if (findMatches(testGrid).length > 0) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Swap pieces for testing purposes (doesn't mutate original)
 */
function swapForTest(
  grid: DoughnutPiece[][],
  pos1: GridPosition,
  pos2: GridPosition
): DoughnutPiece[][] {
  const newGrid = grid.map(row => [...row]);
  const temp = newGrid[pos1.row][pos1.col];
  newGrid[pos1.row][pos1.col] = newGrid[pos2.row][pos2.col];
  newGrid[pos2.row][pos2.col] = temp;
  return newGrid;
}

/**
 * Calculate score for matches
 */
export function calculateScore(matches: Match[], comboMultiplier: number = 1): number {
  let totalScore = 0;

  matches.forEach((match) => {
    const baseScore = GAME_CONFIG.pointsPerMatch + 
                     (match.length - GAME_CONFIG.minMatchLength) * GAME_CONFIG.pointsPerPiece;
    totalScore += baseScore * comboMultiplier;
  });

  return Math.floor(totalScore);
}

/**
 * Remove matched pieces from grid
 */
export function removeMatches(grid: DoughnutPiece[][], matches: Match[]): DoughnutPiece[][] {
  const newGrid = grid.map(row => row.map(piece => ({ ...piece })));
  const matchedPositions = new Set<string>();

  matches.forEach((match) => {
    match.pieces.forEach((piece) => {
      const key = `${piece.position.row}-${piece.position.col}`;
      matchedPositions.add(key);
    });
  });

  matchedPositions.forEach((key) => {
    const [row, col] = key.split('-').map(Number);
    if (newGrid[row] && newGrid[row][col]) {
      newGrid[row][col].isMatched = true;
    }
  });

  return newGrid;
}
