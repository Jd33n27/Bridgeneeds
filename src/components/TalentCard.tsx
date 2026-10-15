'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TalentProfile } from '@/types';
import { Rating } from './Rating';
import { formatCurrency } from '@/lib/utils';

interface TalentCardProps {
  talent: TalentProfile;
}

export const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  return (
    <div className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-5 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-16 h-16 rounded-xl object-cover border border-zinc-700/80"
            />
            {talent.verified && (
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5" title="Verified Professional">
                <CheckCircle2 className="w-4 h-4 text-[#B7F34A] fill-black" />
              </div>
            )}
          </div>
          <Rating rating={talent.rating} reviewsCount={talent.reviewsCount} size="sm" />
        </div>

        {/* Title & Info */}
        <div className="mb-3">
          <Link href={`/talent/${talent.id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-[#B7F34A] transition-colors flex items-center justify-between">
              <span>{talent.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#B7F34A]" />
            </h3>
          </Link>
          <p className="text-sm font-medium text-zinc-300">{talent.title}</p>
          
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>{talent.location}</span>
          </div>
        </div>

        {/* Bio summary */}
        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {talent.bio}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {talent.genres.slice(0, 3).map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
            >
              {genre}
            </span>
          ))}
          {talent.genres.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800 text-zinc-400">
              +{talent.genres.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & CTA */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-zinc-500 block uppercase tracking-wider font-semibold">Starting at</span>
          <span className="text-base font-bold text-white">
            {formatCurrency(talent.startingPrice, talent.currency)}
          </span>
        </div>

        <Link
          href={`/talent/${talent.id}`}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 text-white hover:bg-[#B7F34A] hover:text-black transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};
