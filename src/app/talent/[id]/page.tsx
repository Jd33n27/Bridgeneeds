'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Clock, Award, ShieldCheck, ArrowRight, Star, Disc, Music, Check, Instagram, Twitter, Spotify } from 'lucide-react';
import { mockTalentProfiles } from '@/data/mockTalent';
import { VerificationBadge } from '@/components/VerificationBadge';
import { Rating } from '@/components/Rating';
import { AudioPlayer } from '@/components/AudioPlayer';
import { ServiceCard } from '@/components/ServiceCard';
import { CreateBriefModal } from '@/components/CreateBriefModal';
import { formatCurrency } from '@/lib/utils';

export default function TalentProfilePage() {
  const params = useParams();
  const talentId = params?.id as string;
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'portfolio' | 'credits' | 'reviews'>('about');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  // Find talent by id, fallback to first talent
  const talent = mockTalentProfiles.find((t) => t.id === talentId) || mockTalentProfiles[0];

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner & Header */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="h-56 md:h-72 w-full relative">
            <img
              src={talent.bannerImage}
              alt={talent.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          </div>

          <div className="px-6 md:px-10 pb-8 relative -mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-zinc-900 shadow-2xl shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{talent.name}</h1>
                  {talent.verified && <VerificationBadge />}
                </div>
                <p className="text-base text-zinc-300 font-medium">{talent.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Response: {talent.responseTime}</span>
                  </div>
                  <Rating rating={talent.rating} reviewsCount={talent.reviewsCount} size="sm" />
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsHireModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-transform hover:scale-105 shadow-lg shadow-[#B7F34A]/20 flex items-center gap-1.5"
              >
                <span>Hire {talent.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="px-6 md:px-10 border-t border-zinc-800 flex items-center gap-8 overflow-x-auto text-sm font-semibold">
            {(['about', 'services', 'portfolio', 'credits', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 capitalize border-b-2 transition-colors shrink-0 ${
                  activeTab === tab
                    ? 'border-[#B7F34A] text-[#B7F34A]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab === 'about' ? 'Overview' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                
                {/* Bio Card */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-3">
                  <h3 className="text-base font-bold text-white">About</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{talent.bio}</p>

                  <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
                    <span className="text-xs text-zinc-500 font-semibold mr-2 self-center">Genres:</span>
                    {talent.genres.map((g) => (
                      <span key={g} className="px-3 py-1 rounded-lg bg-zinc-950 text-xs font-semibold text-zinc-300 border border-zinc-800">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Portfolio Audio */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Disc className="w-4 h-4 text-[#B7F34A]" />
                    <span>Featured Audio Samples</span>
                  </h3>
                  <div className="space-y-3">
                    {talent.portfolio.map((item) => (
                      <AudioPlayer
                        key={item.id}
                        title={item.title}
                        artistOrRole={item.role}
                        coverUrl={item.coverUrl}
                        duration={item.duration}
                        audioUrl={item.audioUrl}
                      />
                    ))}
                  </div>
                </div>

                {/* Services Section */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Packaged Services</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {talent.services.map((srv) => (
                      <ServiceCard key={srv.id} service={srv} onHireClick={() => setIsHireModalOpen(true)} />
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {talent.services.map((srv) => (
                  <ServiceCard key={srv.id} service={srv} onHireClick={() => setIsHireModalOpen(true)} />
                ))}
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                {talent.portfolio.map((item) => (
                  <div key={item.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-3">
                    <AudioPlayer
                      title={item.title}
                      artistOrRole={`${item.role} • ${item.genre}`}
                      coverUrl={item.coverUrl}
                      duration={item.duration}
                      audioUrl={item.audioUrl}
                    />
                    {item.description && (
                      <p className="text-xs text-zinc-400 italic px-2">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* CREDITS TAB */}
            {activeTab === 'credits' && (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Verified Discography & Credits</h3>
                {talent.credits.length > 0 ? (
                  <div className="divide-y divide-zinc-800">
                    {talent.credits.map((cred) => (
                      <div key={cred.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                        <div>
                          <h4 className="font-bold text-white">{cred.songTitle}</h4>
                          <p className="text-zinc-400 text-xs">{cred.artist} • {cred.role}</p>
                        </div>
                        <div className="text-right text-xs">
                          <span className="font-mono text-[#B7F34A]">{cred.year}</span>
                          <span className="text-zinc-500 block text-[11px]">{cred.labelOrPlatform}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400">No additional external credits listed.</p>
                )}
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Client Transaction Reviews</h3>
                <div className="space-y-4">
                  {talent.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={rev.clientAvatar} alt={rev.clientName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-white">{rev.clientName}</h4>
                            <p className="text-[10px] text-zinc-400">{rev.clientRole}</p>
                          </div>
                        </div>
                        <Rating rating={rev.rating} showCount={false} size="sm" />
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">"{rev.comment}"</p>
                      <span className="text-[10px] text-zinc-500 font-mono block">{rev.date} • Project: {rev.projectTitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Pricing & Booking Card */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider block">Starting Rate</span>
                <span className="text-3xl font-extrabold text-white">
                  {formatCurrency(talent.startingPrice, talent.currency)}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Completed Projects:</span>
                  <span className="font-bold text-white">{talent.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Response Time:</span>
                  <span className="font-bold text-[#B7F34A]">{talent.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Availability:</span>
                  <span className="font-bold text-emerald-400">Available Now</span>
                </div>
              </div>

              <button
                onClick={() => setIsHireModalOpen(true)}
                className="w-full py-3 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-colors"
              >
                Hire {talent.name.split(' ')[0]} Now
              </button>
            </div>

            {/* Studio Equipment */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Studio Setup & Gear</h4>
              <div className="space-y-2 text-xs text-zinc-300">
                {talent.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B7F34A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <CreateBriefModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
}
