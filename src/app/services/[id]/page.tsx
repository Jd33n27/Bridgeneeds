'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, RefreshCw, Check, ArrowRight, ShieldCheck, MessageSquare, Star } from 'lucide-react';
import { mockServices } from '@/data/mockServices';
import { formatCurrency } from '@/lib/utils';
import { Rating } from '@/components/Rating';
import { CreateBriefModal } from '@/components/CreateBriefModal';
import { AudioPlayer } from '@/components/AudioPlayer';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id as string;
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const service = mockServices.find((s) => s.id === serviceId) || mockServices[0];

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-12 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/discover" className="hover:text-white">Services</Link>
          <span>/</span>
          <span className="text-zinc-200">{service.category}</span>
          <span>/</span>
          <span className="text-[#B7F34A] truncate">{service.title}</span>
        </div>

        {/* Main Service Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 md:p-8 space-y-6">
              
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
                  {service.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{service.title}</h1>
                <Rating rating={service.rating} reviewsCount={service.reviewsCount} size="md" />
              </div>

              {/* Provider Profile Header */}
              <div className="flex items-center gap-4 py-4 border-y border-zinc-800">
                <img src={service.talentAvatar} alt={service.talentName} className="w-12 h-12 rounded-full object-cover border border-zinc-700" />
                <div>
                  <h3 className="text-sm font-bold text-white">Provided by {service.talentName}</h3>
                  <p className="text-xs text-zinc-400">{service.talentTitle}</p>
                </div>
                <Link
                  href={`/talent/${service.talentId}`}
                  className="ml-auto text-xs font-semibold text-[#B7F34A] hover:underline"
                >
                  View Profile
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Service Overview</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">{service.description}</p>
              </div>

              {/* Audio Sample */}
              {service.audioSampleUrl && (
                <div className="pt-2">
                  <h4 className="text-sm font-bold text-white mb-3">Audio Sample</h4>
                  <AudioPlayer
                    title={service.title}
                    artistOrRole={service.talentName}
                    audioUrl={service.audioSampleUrl}
                  />
                </div>
              )}

              {/* Included Checklist */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">What's Included</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                      <Check className="w-4 h-4 text-[#B7F34A] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Checkout / Order Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 space-y-6 sticky top-28">
              
              <div>
                <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider block">Price Package</span>
                <span className="text-3xl font-black text-white">
                  {formatCurrency(service.startingPrice, service.currency)}
                </span>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 py-3 border-y border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-4 h-4 text-[#B7F34A]" /> Delivery Time
                  </span>
                  <span className="font-bold text-white">{service.deliveryDays} Business Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <RefreshCw className="w-4 h-4 text-[#B7F34A]" /> Revisions
                  </span>
                  <span className="font-bold text-white">{service.revisions} Included</span>
                </div>
              </div>

              <button
                onClick={() => setIsBriefModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-colors flex items-center justify-center gap-2"
              >
                <span>Hire {service.talentName.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#B7F34A]" />
                <span>Protected by MAAS Milestone Escrow</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      <CreateBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />
    </div>
  );
}
