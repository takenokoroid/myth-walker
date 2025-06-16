import { Card } from '@/components/Card';
import { ActivityCard as ActivityCardType } from '@/types';

interface ActivityCardProps {
  card: ActivityCardType | null;
  isFlipped: boolean;
  onClick?: () => void;
}

export const ActivityCard = ({ card, isFlipped, onClick }: ActivityCardProps) => {
  return (
    <div className="w-full h-40 md:w-64 md:h-96 cursor-pointer">
      <Card isFlipped={isFlipped} onClick={onClick}>
        {card && (
          <div className="text-center flex flex-col justify-center h-full px-3 md:px-8">
            <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">何をする？</div>
            <div className="text-sm md:text-2xl font-bold text-gray-800 leading-tight md:leading-relaxed">
              {card.text}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};