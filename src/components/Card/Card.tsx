import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isFlipped?: boolean;
}

export const Card = ({ children, className = '', onClick, isFlipped = false }: CardProps) => {
  return (
    <div
      className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
        isFlipped ? 'rotate-y-180' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 backface-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center p-8">
          <div className="text-white text-4xl font-bold">?</div>
        </div>
      </div>
      <div className="absolute inset-0 rotate-y-180 backface-hidden">
        <div className="w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center p-8">
          {children}
        </div>
      </div>
    </div>
  );
};