import { Card } from '@/components/Card';
import { ActivityCard as ActivityCardType } from '@/types';

interface ActivityCardProps {
  card: ActivityCardType | null;
  isFlipped: boolean;
  onClick?: () => void;
}

export const ActivityCard = ({ card, isFlipped, onClick }: ActivityCardProps) => {
  return (
    <div className="w-64 h-96 cursor-pointer">
      <Card isFlipped={isFlipped} onClick={onClick}>
        {card && (
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">何をする？</div>
            <div className="text-2xl font-bold text-gray-800 leading-relaxed">
              {card.text}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};