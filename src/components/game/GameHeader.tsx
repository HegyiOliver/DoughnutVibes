'use client';

import { useGameStore } from '@/stores/gameStore';
import { motion } from 'framer-motion';

export default function GameHeader() {
  const { stats, resetGame, isPaused, setPaused } = useGameStore();

  return (
    <div className="sensenet-card mb-6 p-8">
      {/* SenseNet Branding Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="sensenet-gradient w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            🍩
          </div>
          <div>
            <h2 className="text-2xl font-bold text-sensenet-dark">DoughnutVibes</h2>
            <p className="text-xs text-sensenet-gray">Powered by SenseNet</p>
          </div>
        </div>
        {/* Control Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setPaused(!isPaused)}
            className="sensenet-gradient px-6 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            onClick={resetGame}
            className="bg-sensenet-accent text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            🔄 New Game
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Score Section with Modern Cards */}
        <div className="flex gap-4">
          <motion.div
            className="bg-gradient-to-br from-sensenet-primary to-sensenet-secondary text-white rounded-xl p-4 min-w-[110px] text-center"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <p className="text-xs uppercase tracking-wide opacity-90">Score</p>
            <p className="text-3xl font-bold">{stats.score}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-sensenet-primary rounded-xl p-4 min-w-[110px] text-center"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <p className="text-xs uppercase tracking-wide text-sensenet-primary">🏆 Best</p>
            <p className="text-3xl font-bold text-sensenet-primary">{stats.highScore}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-sensenet-secondary to-sensenet-accent text-white rounded-xl p-4 min-w-[110px] text-center"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <p className="text-xs uppercase tracking-wide opacity-90">Level</p>
            <p className="text-3xl font-bold">{stats.level}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-sensenet-accent to-orange-600 text-white rounded-xl p-4 min-w-[110px] text-center"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <p className="text-xs uppercase tracking-wide opacity-90">Moves</p>
            <p className="text-3xl font-bold">{stats.moves}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
