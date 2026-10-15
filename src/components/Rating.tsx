import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewsCount,
  size = 'md',
  showCount = true
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className={`inline-flex items-center gap-1.5 ${textSize}`}>
      <div className="flex items-center text-[#B7F34A]">
        <Star className={`${iconSize} fill-[#B7F34A]`} />
      </div>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      {showCount && reviewsCount !== undefined && (
        <span className="text-zinc-400 font-normal">({reviewsCount})</span>
      )}
    </div>
  );
};
