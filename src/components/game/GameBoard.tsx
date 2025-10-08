'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { initializeGrid } from '@/utils/gridUtils';
import DoughnutCell from './DoughnutCell';

export default function GameBoard() {
  const { grid, isProcessing, isPaused, setGrid } = useGameStore();

  useEffect(() => {
    // Initialize grid on mount if empty
    if (grid.length === 0) {
      const newGrid = initializeGrid();
      setGrid(newGrid);
    }
  }, [ grid.length, setGrid]);

  if (grid.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🍩</div>
          <p className="text-xl text-gray-600">Preparing your doughnuts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-2xl">
          <div className="bg-white p-8 rounded-2xl text-center">
            <p className="text-3xl font-bold text-gray-800 mb-4">Game Paused</p>
            <p className="text-gray-600">Click Resume to continue</p>
          </div>
        </div>
      )}

      {/* Container for QR code, game board, and logo */}
      <div className="flex items-start justify-center gap-8">
        {/* QR Code - Left Side */}
        <div className="flex-shrink-0 mt-20">
          <img 
            src="/donutvibes_qr.png" 
            alt="Donut Vibes QR Code" 
            className="w-[400px] h-[400px] object-contain"
          />
        </div>

        {/* Game Board - Center */}
        <div className="flex-shrink-0">
          <div
            className={`sensenet-card p-4 border-2 border-sensenet-primary w-[600px] ${
              isProcessing ? 'pointer-events-none opacity-75' : ''
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl p-2 border-2 border-sensenet-secondary">
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((piece, colIndex) => (
                    <DoughnutCell
                      key={piece.id}
                      piece={piece}
                      row={rowIndex}
                      col={colIndex}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SenseNet Logo - Right Side */}
        <div className="flex-shrink-0 mt-20">
          <img 
            src="/sensenet-logo.svg" 
            alt="SenseNet Logo" 
            className="w-[400px] h-[400px] object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1857%) hue-rotate(179deg) brightness(95%) contrast(101%)' }}
          />
        </div>
      </div>

      {/* Game Stats Info */}
      <div className="mt-4 text-center">
        <div className="inline-block bg-gradient-to-r from-sensenet-primary to-sensenet-secondary text-white px-6 py-2 rounded-full text-sm font-semibold">
          Match 3+ doughnuts • Build momentum • Unlock achievements every 1000 points!
        </div>
      </div>
    </div>
  );
}
