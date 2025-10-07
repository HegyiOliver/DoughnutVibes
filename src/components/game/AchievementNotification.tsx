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
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="sensenet-gradient text-white px-8 py-4 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.6 }}
                className="text-3xl"
              >
                ⭐
              </motion.div>
              <div>
                <p className="text-xs uppercase tracking-wide opacity-90 font-semibold">Achievement Unlocked!</p>
                <p className="text-xl font-bold">{message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
