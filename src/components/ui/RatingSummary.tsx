import React from 'react';
import { Star } from 'lucide-react';
import './RatingSummary.css';

export interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className={`rating-summary rating-${size}`}>
      <div className="rating-stars" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            className={`star-icon ${
              starIndex <= fullStars
                ? 'filled'
                : starIndex === fullStars + 1 && hasHalf
                ? 'half-filled'
                : 'empty'
            }`}
          />
        ))}
      </div>
      <span className="rating-score">{rating.toFixed(2)}</span>
      {showCount && (
        <span className="rating-count">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
      )}
    </div>
  );
};
