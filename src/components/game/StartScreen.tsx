'use client';

import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-3 sm:p-4 md:p-6 lg:p-8"
    >
      <div className="sensenet-card p-4 sm:p-6 md:p-8 lg:p-12 max-w-3xl w-full">
        {/* SenseNet Branded Header */}
        <motion.div className="text-center mb-6 sm:mb-8 md:mb-10">
          <motion.div 
            className="inline-block sensenet-gradient text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl mb-4 sm:mb-5 md:mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🍩
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sensenet-dark mb-2 sm:mb-3 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Doughnut Vibes
          </motion.h1>
          <motion.div 
            className="inline-block sensenet-gradient text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Powered by SenseNet
          </motion.div>
        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center mb-1.5 sm:mb-2 text-sensenet-gray px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Innovation at startup speed. Now with doughnuts! 🚀
        </motion.p>
        <motion.p
          className="text-xs sm:text-sm md:text-base text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-sensenet-gray px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Match 3 or more doughnuts to score points
        </motion.p>

        {/* Game Instructions with SenseNet Style */}
        <motion.div
          className="bg-gradient-to-br from-sensenet-light to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-7 md:mb-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-sensenet-dark mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
            <span className="sensenet-gradient text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm flex-shrink-0">📖</span>
            <span className="break-words">S.N.A.P. Game Rules</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">🎯</span>
              <div className="min-w-0">
                <p className="font-semibold text-sensenet-dark mb-0.5 sm:mb-1 text-sm sm:text-base">Match & Swap</p>
                <p className="text-xs sm:text-sm text-sensenet-gray">Swap adjacent doughnuts to create matches of 3+</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">⭐</span>
              <div className="min-w-0">
                <p className="font-semibold text-sensenet-dark mb-0.5 sm:mb-1 text-sm sm:text-base">Bigger = Better</p>
                <p className="text-xs sm:text-sm text-sensenet-gray">Longer matches give exponential points</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">🔥</span>
              <div className="min-w-0">
                <p className="font-semibold text-sensenet-dark mb-0.5 sm:mb-1 text-sm sm:text-base">Chain Reactions</p>
                <p className="text-xs sm:text-sm text-sensenet-gray">Trigger cascades for massive combo bonuses</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">🎮</span>
              <div className="min-w-0">
                <p className="font-semibold text-sensenet-dark mb-0.5 sm:mb-1 text-sm sm:text-base">Strategic Moves</p>
                <p className="text-xs sm:text-sm text-sensenet-gray">Plan wisely - every move counts!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Button with SenseNet Gradient */}
        <motion.button
          onClick={onStart}
          className="w-full sensenet-gradient text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mb-3 sm:mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          🚀 Launch Game
        </motion.button>

        {/* Footer */}
        <motion.div 
          className="mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm text-sensenet-gray px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Built with ❤️ using the S.N.A.P. methodology</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
