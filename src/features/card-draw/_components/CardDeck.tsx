'use client';

import { Button } from '@/components/Button';
import { LocationCard } from './LocationCard';
import { ActivityCard } from './ActivityCard';
import { useCardDraw } from '../hooks/useCardDraw';

export const CardDeck = () => {
  const {
    drawnLocationCard,
    drawnActivityCard,
    isLocationFlipped,
    isActivityFlipped,
    phase,
    drawLocationCard,
    drawActivityCard,
    reset,
  } = useCardDraw();

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex gap-8">
        <LocationCard
          card={drawnLocationCard}
          isFlipped={isLocationFlipped}
          onClick={phase === 'initial' ? drawLocationCard : undefined}
        />
        <ActivityCard
          card={drawnActivityCard}
          isFlipped={isActivityFlipped}
          onClick={phase === 'location' ? drawActivityCard : undefined}
        />
      </div>
      
      <div className="text-center">
        {phase === 'initial' && (
          <Button onClick={drawLocationCard} size="lg">
            散歩を始める
          </Button>
        )}
        
        {phase === 'location' && (
          <Button onClick={drawActivityCard} size="lg">
            次のカードを引く
          </Button>
        )}
        
        {phase === 'complete' && (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gray-800">
              準備完了！散歩を楽しんでください
            </div>
            <Button onClick={reset} variant="secondary">
              もう一度引く
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};