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
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="sensenet-card p-12 max-w-3xl w-full">
        {/* SenseNet Branded Header */}
        <motion.div className="text-center mb-10">
          <motion.div 
            className="inline-block sensenet-gradient text-white text-7xl p-6 rounded-3xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🍩
          </motion.div>
          <motion.h1
            className="text-6xl font-bold text-sensenet-dark mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            DoughnutVibes
          </motion.h1>
          <motion.div 
            className="inline-block sensenet-gradient text-white px-6 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Powered by SenseNet
          </motion.div>
        </motion.div>

        <motion.p
          className="text-xl text-center mb-2 text-sensenet-gray"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Innovation at startup speed. Now with doughnuts! 🚀
        </motion.p>
        <motion.p
          className="text-center mb-12 text-sensenet-gray"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Match 3 or more doughnuts to score points
        </motion.p>

        {/* Game Instructions with SenseNet Style */}
        <motion.div
          className="bg-gradient-to-br from-sensenet-light to-white rounded-2xl p-8 mb-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-sensenet-dark mb-6 flex items-center gap-3">
            <span className="sensenet-gradient text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">📖</span>
            S.N.A.P. Game Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="font-semibold text-sensenet-dark mb-1">Match & Swap</p>
                <p className="text-sm text-sensenet-gray">Swap adjacent doughnuts to create matches of 3+</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="font-semibold text-sensenet-dark mb-1">Bigger = Better</p>
                <p className="text-sm text-sensenet-gray">Longer matches give exponential points</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <span className="text-3xl">�</span>
              <div>
                <p className="font-semibold text-sensenet-dark mb-1">Chain Reactions</p>
                <p className="text-sm text-sensenet-gray">Trigger cascades for massive combo bonuses</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <span className="text-3xl">🎮</span>
              <div>
                <p className="font-semibold text-sensenet-dark mb-1">Strategic Moves</p>
                <p className="text-sm text-sensenet-gray">Plan wisely - every move counts!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Button with SenseNet Gradient */}
        <motion.button
          onClick={onStart}
          className="w-full sensenet-gradient text-white text-2xl font-bold py-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mb-4"
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
          className="mt-6 text-center text-sm text-sensenet-gray"
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
