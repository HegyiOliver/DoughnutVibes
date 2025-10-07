'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface AchievementOverlayProps {
  isVisible: boolean;
  catchphrase: string;
  quote: string;
  onDismiss: () => void;
}

// Meaningful quotes about innovation and startup culture
const INNOVATION_QUOTES_BASE = [
  "Innovation is not about saying yes to everything. It's about saying NO to all but the most crucial features.",
  "The only way to win is to learn faster than anyone else.",
  "Build products that 10 people love, not products that 100 people kind of like.",
  "Move fast, learn fast, and iterate faster.",
  "Your product is not your product. Your process for making your product is your product.",
  "Done is better than perfect when you're building an MVP.",
  "The cost of being wrong is less than the cost of doing nothing.",
  "Agility is thinking faster than your competition.",
  "Focus on delivering value, not just features.",
  "The best way to predict the future is to create it.",
  "Fail fast, learn faster, succeed fastest.",
  "Start with why, build with purpose, deliver with passion.",
  "Every expert was once a beginner who refused to give up.",
  "Simplicity is the ultimate sophistication in product design.",
  "The secret to getting ahead is getting started.",
];

// Shuffle the quotes array to randomize the order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const INNOVATION_QUOTES = shuffleArray(INNOVATION_QUOTES_BASE);

export default function AchievementOverlay({
  isVisible,
  catchphrase,
  quote,
  onDismiss,
}: AchievementOverlayProps) {
  // Prevent scrolling when overlay is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{
            backgroundColor: 'rgba(0, 102, 204, 0.85)', // sensenet-primary with transparency
          }}
          onClick={onDismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-title"
          aria-describedby="achievement-quote"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: 0.1,
            }}
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Paper Component */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-2 opacity-20"
                style={{
                  background:
                    'linear-gradient(90deg, #0066CC 0%, #00A3E0 50%, #FF6B35 100%)',
                }}
              />

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sensenet-primary to-sensenet-secondary flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Achievement Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2
                  id="achievement-title"
                  className="text-3xl md:text-4xl font-bold text-center mb-4"
                  style={{ color: '#0066CC' }}
                >
                  Achievement Unlocked!
                </h2>
              </motion.div>

              {/* Catchphrase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xl md:text-2xl font-semibold text-center mb-6 text-sensenet-dark">
                  {catchphrase}
                </p>
              </motion.div>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-24 h-1 mx-auto mb-6 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #0066CC 0%, #00A3E0 100%)',
                }}
              />

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <blockquote
                  id="achievement-quote"
                  className="text-base md:text-lg text-center italic text-gray-700 leading-relaxed"
                >
                  "{quote}"
                </blockquote>
              </motion.div>

              {/* Click to continue hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDismiss}
                  className="px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    background:
                      'linear-gradient(135deg, #0066CC 0%, #00A3E0 100%)',
                  }}
                >
                  Continue Playing
                </motion.button>
              </motion.div>

              {/* Pulsing indicator */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400"
              >
                Click anywhere to continue
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
