'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import GameBoard from '@/components/game/GameBoard';
import GameHeader from '@/components/game/GameHeader';
import StartScreen from '@/components/game/StartScreen';
import AchievementOverlay, { INNOVATION_QUOTES } from '@/components/game/AchievementOverlay';

export default function Home() {
  const { isPlaying, initializeGame, achievementMessage, showAchievement, setShowAchievement } = useGameStore();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    // When achievement is shown, pick a random quote
    if (showAchievement && achievementMessage) {
      const randomIndex = Math.floor(Math.random() * INNOVATION_QUOTES.length);
      setCurrentQuote(INNOVATION_QUOTES[randomIndex]);
    }
  }, [showAchievement, achievementMessage]);

  const handleDismissAchievement = () => {
    setShowAchievement(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <AchievementOverlay
        isVisible={showAchievement}
        catchphrase={achievementMessage}
        quote={currentQuote}
        onDismiss={handleDismissAchievement}
      />
      <div className="w-full max-w-4xl">
        {!isPlaying ? (
          <StartScreen onStart={initializeGame} />
        ) : (
          <>
            <GameHeader />
            <GameBoard />
          </>
        )}
      </div>
    </main>
  );
}
