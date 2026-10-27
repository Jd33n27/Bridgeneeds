import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CategoryCardData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import './CategoryCard.css';

interface CategoryCardProps {
  category: CategoryCardData;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const displayName = category.name || category.title || category.categoryName || '';
  const count = category.talentCount ?? category.count ?? 0;
  const startingRate = category.startingFrom;

  return (
    <Link
      to={`/discover?category=${encodeURIComponent(displayName)}`}
      className="category-card"
    >
      {/* Background image & gradient overlay */}
      {category.image ? (
        <img
          src={category.image}
          alt={displayName}
          className="category-card-bg-img"
        />
      ) : (
        <div className="category-card-fallback-bg" />
      )}
      <div className="category-card-overlay" />

      {/* Top Header */}
      <div className="category-card-header">
        <span className="category-card-badge">
          {count}+ Experts
        </span>

        <div className="category-card-arrow-btn">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="category-card-body">
        <h3 className="category-card-title">
          {displayName}
        </h3>
        <p className="category-card-desc">
          {category.description}
        </p>

        <div className="category-card-footer">
          <span>Starting from</span>
          <span className="category-card-price">
            {formatCurrency(startingRate)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
