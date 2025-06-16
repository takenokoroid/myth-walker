import { Card } from '@/components/Card';
import { LocationCard as LocationCardType } from '@/types';

interface LocationCardProps {
  card: LocationCardType | null;
  isFlipped: boolean;
  onClick?: () => void;
}

export const LocationCard = ({ card, isFlipped, onClick }: LocationCardProps) => {
  return (
    <div className="w-64 h-96 cursor-pointer">
      <Card isFlipped={isFlipped} onClick={onClick}>
        {card && (
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">どこへ行く？</div>
            <div className="text-2xl font-bold text-gray-800 leading-relaxed">
              {card.text}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};