'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DoughnutPiece, SpecialEffect } from '@/types/game.types';
import { useGameStore } from '@/stores/gameStore';
import { DOUGHNUT_COLORS } from '@/constants/gameConfig';
import { getDoughnutImage } from '@/utils/imageUtils';

interface DoughnutCellProps {
  piece: DoughnutPiece;
  row: number;
  col: number;
}

export default function DoughnutCell({ piece, row, col }: DoughnutCellProps) {
  const { selectedPiece, selectPiece, makeMove, isProcessing, updateScore, setGrid } = useGameStore();
  const grid = useGameStore(state => state.grid);

  const isSelected =
    selectedPiece?.row === row && selectedPiece?.col === col;

  const handleClick = async () => {
    if (isProcessing) return;
    
    // Import necessary utilities
    const { dropPieces } = await import('@/utils/gridUtils');
    const { findMatches, calculateScore, removeMatches } = await import('@/utils/matchUtils');
    
    // Recursive function to process chain reactions
    const processChainReactions = (currentGrid: DoughnutPiece[][], comboMultiplier: number = 1) => {
      const currentMatches = findMatches(currentGrid);
      
      if (currentMatches.length === 0) {
        // No more matches, we're done
        useGameStore.getState().setProcessing(false);
        return;
      }

      // Calculate score with combo multiplier
      const score = calculateScore(currentMatches, comboMultiplier);
      updateScore(score);
      
      // Mark matched pieces
      currentGrid = removeMatches(currentGrid, currentMatches);
      setGrid(currentGrid);

      // Drop pieces and fill empty spaces
      setTimeout(() => {
        currentGrid = dropPieces(currentGrid);
        setGrid(currentGrid);
        
        // Check for new matches after dropping and continue recursively
        setTimeout(() => {
          processChainReactions(currentGrid, Math.min(comboMultiplier + 0.5, 3));
        }, 500);
      }, 600);
    };
    
    // Special handling for SenseNet doughnut - clears entire row and column
    if (piece.type === 'sensenet') {
      useGameStore.getState().setProcessing(true);
      
      // Award 1000 points immediately
      updateScore(1000);
      
      // Clear the entire row and column
      let newGrid = grid.map(r => r.map(p => ({ ...p })));
      
      // Mark entire row as matched
      for (let c = 0; c < newGrid[row].length; c++) {
        newGrid[row][c].isMatched = true;
      }
      
      // Mark entire column as matched
      for (let r = 0; r < newGrid.length; r++) {
        newGrid[r][col].isMatched = true;
      }
      
      setGrid(newGrid);
      
      // Drop pieces and refill after initial animation
      setTimeout(() => {
        newGrid = dropPieces(newGrid);
        setGrid(newGrid);
        
        // Check for matches after dropping and process chain reactions
        setTimeout(() => {
          processChainReactions(newGrid, 1.5);
        }, 500);
      }, 600);
      
      return;
    }
    
    // Special handling for special effect pieces
    if (hasSpecialEffect) {
      useGameStore.getState().setProcessing(true);
      let newGrid = grid.map(r => r.map(p => ({ ...p })));
      
      if (piece.specialEffect === SpecialEffect.COLOR_BOMB) {
        // Clear all pieces of the same type
        updateScore(500);
        for (let r = 0; r < newGrid.length; r++) {
          for (let c = 0; c < newGrid[r].length; c++) {
            if (newGrid[r][c].type === piece.type) {
              newGrid[r][c].isMatched = true;
            }
          }
        }
      } else if (piece.specialEffect === SpecialEffect.LINE_CLEAR_H) {
        // Clear entire row
        updateScore(300);
        for (let c = 0; c < newGrid[row].length; c++) {
          newGrid[row][c].isMatched = true;
        }
      } else if (piece.specialEffect === SpecialEffect.LINE_CLEAR_V) {
        // Clear entire column
        updateScore(300);
        for (let r = 0; r < newGrid.length; r++) {
          newGrid[r][col].isMatched = true;
        }
      } else if (piece.specialEffect === SpecialEffect.CROSS_CLEAR) {
        // Clear row and column
        updateScore(400);
        for (let c = 0; c < newGrid[row].length; c++) {
          newGrid[row][c].isMatched = true;
        }
        for (let r = 0; r < newGrid.length; r++) {
          newGrid[r][col].isMatched = true;
        }
      } else if (piece.specialEffect === SpecialEffect.EXPLOSION) {
        // Clear 3x3 area
        updateScore(250);
        for (let r = Math.max(0, row - 1); r <= Math.min(newGrid.length - 1, row + 1); r++) {
          for (let c = Math.max(0, col - 1); c <= Math.min(newGrid[r].length - 1, col + 1); c++) {
            newGrid[r][c].isMatched = true;
          }
        }
      }
      
      setGrid(newGrid);
      
      // Drop pieces and process chain reactions
      setTimeout(() => {
        newGrid = dropPieces(newGrid);
        setGrid(newGrid);
        
        setTimeout(() => {
          processChainReactions(newGrid, 1.5);
        }, 500);
      }, 600);
      
      return;
    }
    
    if (selectedPiece) {
      // If there's already a selected piece, try to make a move
      makeMove(selectedPiece, { row, col });
    } else {
      // Select this piece
      selectPiece({ row, col });
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (isProcessing) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ row, col }));
    selectPiece({ row, col });
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isProcessing) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isProcessing) return;
    e.preventDefault();
    
    try {
      const data = e.dataTransfer.getData('application/json');
      const fromPos = JSON.parse(data);
      makeMove(fromPos, { row, col });
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleDragEnd = () => {
    if (!isProcessing) {
      selectPiece(null);
    }
  };

  const backgroundColor = DOUGHNUT_COLORS[piece.type as keyof typeof DOUGHNUT_COLORS] || DOUGHNUT_COLORS.vanilla;

  const isSenseNet = piece.type === 'sensenet';
  const hasSpecialEffect = piece.specialEffect !== SpecialEffect.NONE;
  const isColorBomb = piece.specialEffect === SpecialEffect.COLOR_BOMB;
  const isLineClear = piece.specialEffect === SpecialEffect.LINE_CLEAR_H || piece.specialEffect === SpecialEffect.LINE_CLEAR_V;
  const isCrossClear = piece.specialEffect === SpecialEffect.CROSS_CLEAR;
  const isExplosion = piece.specialEffect === SpecialEffect.EXPLOSION;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      }}
    >
      <div
        className={`
          relative aspect-square rounded-xl cursor-pointer
          flex items-center justify-center
          ${isSelected ? 'ring-4 ring-sensenet-primary ring-offset-2' : ''}
          ${isSenseNet ? 'ring-2 ring-purple-500 ring-offset-1' : ''}
          ${hasSpecialEffect ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}
          shadow-md hover:shadow-lg transition-all
          hover:scale-110 active:scale-95
        `}
        style={{
          background: backgroundColor,
        }}
        draggable={!isProcessing}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
      >
        {/* Doughnut image based on type */}
        <Image 
          src={getDoughnutImage(piece.type)}
          alt={`${piece.type} doughnut`}
          className="select-none pointer-events-none"
          draggable={false}
          fill
          sizes="(max-width: 768px) 15vw, 10vw"
          style={{ objectFit: 'contain', padding: '4px' }}
          priority={isSenseNet}
          quality={85}
        />

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl border-4 border-sensenet-secondary"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Special glow for SenseNet doughnut */}
        {isSenseNet && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-purple-400 opacity-30"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Special effect indicators */}
        {isColorBomb && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 opacity-40"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="absolute top-1 right-1 text-2xl">💥</div>
          </>
        )}

        {piece.specialEffect === SpecialEffect.LINE_CLEAR_H && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl bg-blue-400 opacity-40"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="absolute top-1 right-1 text-xl">↔️</div>
          </>
        )}

        {piece.specialEffect === SpecialEffect.LINE_CLEAR_V && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl bg-green-400 opacity-40"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="absolute top-1 right-1 text-xl">↕️</div>
          </>
        )}

        {isCrossClear && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl bg-red-400 opacity-40"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="absolute top-1 right-1 text-xl">✖️</div>
          </>
        )}

        {isExplosion && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl bg-orange-400 opacity-40"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="absolute top-1 right-1 text-xl">💣</div>
          </>
        )}
      </div>
    </motion.div>
  );
}


