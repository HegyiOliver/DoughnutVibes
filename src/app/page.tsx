'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import GameBoard from '@/components/game/GameBoard';
import GameHeader from '@/components/game/GameHeader';
import StartScreen from '@/components/game/StartScreen';
import AchievementNotification from '@/components/game/AchievementNotification';

export default function Home() {
  const { isPlaying, initializeGame, achievementMessage, showAchievement, setShowAchievement } = useGameStore();

  useEffect(() => {
    // Any initialization logic on mount
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <AchievementNotification 
        message={achievementMessage}
        show={showAchievement}
        onHide={() => setShowAchievement(false)}
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
