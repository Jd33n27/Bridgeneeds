import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Music } from 'lucide-react';
import { CategoryCardData } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CategoryCardProps {
  category: CategoryCardData;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/discover?category=${encodeURIComponent(category.name)}`}
      className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-800/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#B7F34A]/50 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
    >
      {/* Background image & gradient overlay */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-[#B7F34A] border border-[#B7F34A]/30">
          {category.talentCount}+ Experts
        </span>

        <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#B7F34A] group-hover:text-black transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-[#B7F34A] transition-colors mb-1">
          {category.name}
        </h3>
        <p className="text-xs text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
          {category.description}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
          <span>Starting from</span>
          <span className="font-bold text-white">
            {formatCurrency(category.startingFrom)}
          </span>
        </div>
      </div>
    </Link>
  );
};
