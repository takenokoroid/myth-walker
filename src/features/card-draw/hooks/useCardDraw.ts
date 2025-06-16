import { useState, useCallback } from 'react';
import { LocationCard, ActivityCard } from '@/types';
import { locationCards } from '@/data/locations';
import { activityCards } from '@/data/activities';
import { getRandomElement } from '@/utils/random';

export const useCardDraw = () => {
  const [drawnLocationCard, setDrawnLocationCard] = useState<LocationCard | null>(null);
  const [drawnActivityCard, setDrawnActivityCard] = useState<ActivityCard | null>(null);
  const [isLocationFlipped, setIsLocationFlipped] = useState(false);
  const [isActivityFlipped, setIsActivityFlipped] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'location' | 'activity' | 'complete'>('initial');

  const drawLocationCard = useCallback(() => {
    const card = getRandomElement(locationCards);
    setDrawnLocationCard(card);
    setIsLocationFlipped(true);
    setPhase('location');
  }, []);

  const drawActivityCard = useCallback(() => {
    const card = getRandomElement(activityCards);
    setDrawnActivityCard(card);
    setIsActivityFlipped(true);
    setPhase('activity');
    
    setTimeout(() => {
      setPhase('complete');
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    setDrawnLocationCard(null);
    setDrawnActivityCard(null);
    setIsLocationFlipped(false);
    setIsActivityFlipped(false);
    setPhase('initial');
  }, []);

  return {
    drawnLocationCard,
    drawnActivityCard,
    isLocationFlipped,
    isActivityFlipped,
    phase,
    drawLocationCard,
    drawActivityCard,
    reset,
  };
};