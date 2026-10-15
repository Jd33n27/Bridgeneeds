'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Rating } from './Rating';

interface ServiceCardProps {
  service: ServiceItem;
  onHireClick?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onHireClick }) => {
  return (
    <div className="group rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-5 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between hover:shadow-xl">
      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
            {service.category}
          </span>
          {service.popular && (
            <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              Popular
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/services/${service.id}`}>
          <h3 className="text-lg font-bold text-white group-hover:text-[#B7F34A] transition-colors mb-2">
            {service.title}
          </h3>
        </Link>

        {/* Talent Provider Header */}
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-800/80">
          <img
            src={service.talentAvatar}
            alt={service.talentName}
            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
          />
          <div>
            <p className="text-xs font-medium text-zinc-200">By {service.talentName}</p>
            <p className="text-[11px] text-zinc-400">{service.talentTitle}</p>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Meta Timeline */}
        <div className="flex items-center gap-4 text-xs text-zinc-300 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{service.deliveryDays} Days Delivery</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
            <span>{service.revisions} Revisions</span>
          </div>
        </div>

        {/* Included List */}
        <div className="space-y-1.5 mb-5">
          {service.includes.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
              <Check className="w-3.5 h-3.5 text-[#B7F34A] shrink-0 mt-0.5" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block">Starting at</span>
          <span className="text-lg font-extrabold text-white">
            {formatCurrency(service.startingPrice, service.currency)}
          </span>
        </div>

        {onHireClick ? (
          <button
            onClick={() => onHireClick(service)}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors flex items-center gap-1"
          >
            <span>Hire Talent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            href={`/services/${service.id}`}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors flex items-center gap-1"
          >
            <span>View Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
