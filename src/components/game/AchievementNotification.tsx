'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AchievementNotificationProps {
  message: string;
  show: boolean;
  onHide: () => void;
}

export default function AchievementNotification({ message, show, onHide }: AchievementNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full max-w-md pointer-events-auto"
          >
            <div className="sensenet-gradient text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-xl sm:rounded-2xl shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl sm:text-3xl flex-shrink-0"
                >
                  ⭐
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide opacity-90 font-semibold">Achievement Unlocked!</p>
                  <p className="text-sm sm:text-lg md:text-xl font-bold break-words">{message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
