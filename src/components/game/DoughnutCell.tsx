'use client';

import { motion } from 'framer-motion';
import { DoughnutPiece } from '@/types/game.types';
import { useGameStore } from '@/stores/gameStore';
import { DOUGHNUT_COLORS } from '@/constants/gameConfig';

interface DoughnutCellProps {
  piece: DoughnutPiece;
  row: number;
  col: number;
}

export default function DoughnutCell({ piece, row, col }: DoughnutCellProps) {
  const { selectedPiece, selectPiece, makeMove, isProcessing } = useGameStore();

  const isSelected =
    selectedPiece?.row === row && selectedPiece?.col === col;

  const handleClick = () => {
    if (isProcessing) return;
    
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
        <img 
          src={getDoughnutImage(piece.type)}
          alt={`${piece.type} doughnut`}
          className="w-full h-full object-contain select-none pointer-events-none p-1"
          draggable={false}
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
      </div>
    </motion.div>
  );
}

function getDoughnutImage(type: string): string {
  const imageMap: Record<string, string> = {
    blue: '/pics/doughnut_blue.png',
    golden: '/pics/doughnut_golden.png',
    vanilla: '/pics/doughnut_vanilla.png',
  };
  return imageMap[type] || '/pics/doughnut_vanilla.png';
}
