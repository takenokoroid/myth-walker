'use client';

import { Button } from '@/components/Button';
import { LocationCard } from './LocationCard';
import { ActivityCard } from './ActivityCard';
import { useCardDraw } from '../hooks/useCardDraw';
import { useWalkHistory } from '@/features/walk-history/hooks/useWalkHistory';
import { WalkSession } from '@/types';
import { useSnackbar } from 'notistack';

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

  const { addSession } = useWalkHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveAndStartWalk = () => {
    if (drawnLocationCard && drawnActivityCard) {
      try {
        const session: WalkSession = {
          id: `walk-${Date.now()}`,
          locationCard: drawnLocationCard,
          activityCard: drawnActivityCard,
          createdAt: new Date(),
          completed: false,
        };
        
        addSession(session);
        
        // 成功メッセージを表示
        enqueueSnackbar('散歩が記録されました！楽しい散歩をお楽しみください！', { 
          variant: 'success',
          autoHideDuration: 4000,
        });
        
        // カードをリセットして新しい散歩の準備
        reset();
      } catch (error) {
        enqueueSnackbar('散歩の記録に失敗しました。もう一度お試しください。', { 
          variant: 'error' 
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* カードエリア - 固定レイアウト */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-sm md:max-w-none px-4 md:px-0 md:justify-center">
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
      
      {/* コントロールエリア - 固定高さでレイアウトシフトを防止 */}
      <div className="text-center w-full max-w-md md:max-w-2xl px-4 mt-6 md:mt-8">
        {/* メッセージエリア - 固定高さ */}
        <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center mb-4">
          {phase === 'complete' && (
            <div className="text-base md:text-2xl font-bold text-gray-800 text-center leading-tight">
              準備完了！散歩を楽しんでください
            </div>
          )}
        </div>
        
        {/* ボタンエリア - 固定高さ */}
        <div className="min-h-[48px] md:min-h-[64px] flex items-center justify-center">
          {phase === 'initial' && (
            <Button onClick={drawLocationCard} size="md" className="w-full max-w-xs md:max-w-none md:!px-8 md:!py-4 md:!text-lg">
              散歩を始める
            </Button>
          )}
          
          {phase === 'location' && (
            <Button onClick={drawActivityCard} size="md" className="w-full max-w-xs md:max-w-none md:!px-8 md:!py-4 md:!text-lg">
              次のカードを引く
            </Button>
          )}
          
          {phase === 'complete' && (
            <div className="flex flex-col gap-3 w-full md:flex-row md:gap-4 md:justify-center">
              <Button 
                onClick={handleSaveAndStartWalk} 
                size="md"
                className="w-full md:w-auto md:!px-8 md:!py-4 md:!text-lg"
                disabled={!drawnLocationCard || !drawnActivityCard}
              >
                散歩を記録して出発！
              </Button>
              <Button 
                onClick={reset} 
                variant="secondary" 
                size="md"
                className="w-full md:w-auto md:!px-8 md:!py-4 md:!text-lg"
              >
                もう一度引く
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};