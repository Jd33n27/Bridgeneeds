'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Music, Headphones, Sliders, Users, Layers, Zap, Play } from 'lucide-react';
import { mockTalentProfiles } from '@/data/mockTalent';
import { mockCategories } from '@/data/mockServices';
import { TalentCard } from '@/components/TalentCard';
import { CategoryCard } from '@/components/CategoryCard';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { CreateBriefModal } from '@/components/CreateBriefModal';
import { AudioPlayer } from '@/components/AudioPlayer';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const heroSearchTags = [
    'Music Producer',
    'Mixing Engineer',
    'Vocalist',
    'Songwriter',
    'Session Guitarist'
  ];

  const timelineStepsDemo = [
    { label: 'Brief submitted', date: '01 Oct', status: 'completed' as const, description: 'Client defined requirements & budget' },
    { label: 'Proposal accepted', date: '03 Oct', status: 'completed' as const, description: 'Scope agreed & escrow funded' },
    { label: 'Production', date: '05 Oct', status: 'completed' as const, description: 'Beat arrangement & tracking' },
    { label: 'Revision', date: '07 Oct', status: 'completed' as const, description: 'Vocal tuning & mixing tweaks' },
    { label: 'Final delivery', date: '09 Oct', status: 'completed' as const, description: '24-bit WAV master & stems uploaded' },
    { label: 'Approved', date: 'Pending', status: 'current' as const, description: 'Sign-off to release payment' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white selection:bg-[#B7F34A] selection:text-black">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-zinc-800/80">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B7F34A]/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-[#B7F34A]/30 text-[#B7F34A] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Music as a Service Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Find the people behind the <span className="text-[#B7F34A]">sound.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
                Discover producers, musicians, engineers, songwriters and other music professionals. Hire them for your next project with secure escrow protection.
              </p>

              {/* Large Search Interface */}
              <div className="bg-zinc-900/90 p-2 sm:p-3 rounded-2xl border border-zinc-800 shadow-2xl space-y-3">
                <div className="flex items-center gap-3 px-3 py-1">
                  <Search className="w-5 h-5 text-[#B7F34A] shrink-0" />
                  <input
                    type="text"
                    placeholder="What do you need? (e.g. Music Producer, Vocal Mixing)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <Link
                    href={`/discover?q=${encodeURIComponent(searchQuery)}`}
                    className="px-5 py-3 rounded-xl bg-[#B7F34A] text-black font-bold text-xs sm:text-sm hover:bg-[#A4E235] transition-transform hover:scale-105 shrink-0"
                  >
                    Find Talent
                  </Link>
                </div>

                {/* Search Quick Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-800/80 px-2 text-xs">
                  <span className="text-zinc-500 font-medium mr-1">Popular:</span>
                  {heroSearchTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/discover?q=${encodeURIComponent(tag)}`}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800/60 text-zinc-300 hover:text-[#B7F34A] hover:bg-zinc-800 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsBriefModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#B7F34A] text-black font-bold text-sm hover:bg-[#A4E235] transition-colors flex items-center gap-2 shadow-lg shadow-[#B7F34A]/20"
                >
                  <span>Post a Project Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/signup?role=talent"
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors"
                >
                  Offer Your Services
                </Link>
              </div>

              {/* Live Metric */}
              <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B7F34A] animate-pulse" />
                  <span><strong className="text-white font-bold">1,240+</strong> Verified Music Talent</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B7F34A]" />
                  <span>Escrow Payments</span>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Talent Card 1 Preview */}
                <div className="space-y-4">
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-xl hover:border-[#B7F34A]/40 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                      alt="Daniel Okafor"
                      className="w-full h-36 rounded-xl object-cover mb-3"
                    />
                    <h4 className="font-bold text-sm text-white">Daniel Okafor</h4>
                    <p className="text-xs text-zinc-400">Music Producer • Lagos</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[#B7F34A] font-semibold">★ 4.9 (42)</span>
                      <span className="text-zinc-300 font-bold">From ₦150k</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <AudioPlayer
                      title="High Life Grooves"
                      artistOrRole="Daniel Okafor (Producer)"
                      duration="3:15"
                      compact={true}
                    />
                  </div>
                </div>

                {/* Talent Card 2 Preview */}
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-xl hover:border-[#B7F34A]/40 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                      alt="Amaka James"
                      className="w-full h-36 rounded-xl object-cover mb-3"
                    />
                    <h4 className="font-bold text-sm text-white">Amaka James</h4>
                    <p className="text-xs text-zinc-400">Mixing Engineer • Lagos</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[#B7F34A] font-semibold">★ 4.8 (38)</span>
                      <span className="text-zinc-300 font-bold">From ₦80k</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-[#B7F34A] font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>100% Milestone Escrow</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">Talent receives payout only upon client approval.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY DISCOVERY */}
      <section className="py-20 border-b border-zinc-800/80 bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block mb-2">Marketplace Categories</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">What are you making?</h2>
            </div>
            <Link
              href="/discover"
              className="mt-4 md:mt-0 text-sm font-bold text-[#B7F34A] hover:underline flex items-center gap-1"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED TALENT */}
      <section className="py-20 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block mb-2">Verified Professionals</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Meet the people behind the music.</h2>
            </div>
            <Link
              href="/discover"
              className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:border-[#B7F34A] transition-colors"
            >
              View All 1,200+ Professionals
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTalentProfiles.slice(0, 3).map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 border-b border-zinc-800/80 bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block mb-2">Simple Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How MAAS Works</h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">From initial brief to final master delivery, every transaction is structured and protected.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-3xl font-black text-[#B7F34A] font-mono">01</span>
              <h3 className="text-lg font-bold text-white">Describe</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tell MAAS what you need. Specify your genre, budget, references, and deadline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-3xl font-black text-[#B7F34A] font-mono">02</span>
              <h3 className="text-lg font-bold text-white">Discover</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Browse relevant music professionals or receive tailored proposals for your brief.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-3xl font-black text-[#B7F34A] font-mono">03</span>
              <h3 className="text-lg font-bold text-white">Hire</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Agree on scope, price, and deliverables. Funds are securely locked in MAAS Escrow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <span className="text-3xl font-black text-[#B7F34A] font-mono">04</span>
              <h3 className="text-lg font-bold text-white">Create</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Collaborate in the workspace, request revisions, approve final deliverables & release payout.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 & 6: FOR TALENT & FOR BUSINESS */}
      <section className="py-20 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 5: FOR TALENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block">For Music Professionals</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Your skills are a business.</h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                Create a professional profile, package your services, specify your pricing, and get discovered by independent artists, labels, film studios, and brands looking for music professionals.
              </p>
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7F34A]" />
                  <span>Set your own rates and revision boundaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7F34A]" />
                  <span>Guaranteed payment with upfront escrow funding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7F34A]" />
                  <span>Build verified credits and reputation from real work</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/signup?role=talent"
                  className="px-6 py-3.5 rounded-xl bg-[#B7F34A] text-black font-bold text-sm hover:bg-[#A4E235] transition-colors inline-flex items-center gap-2"
                >
                  <span>Join as Talent</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B7F34A]/20 text-[#B7F34A] font-bold flex items-center justify-center">
                    DO
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Daniel Okafor Studio</h4>
                    <p className="text-xs text-zinc-400">Pro Talent Dashboard</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#B7F34A] text-black">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block">Earnings This Month</span>
                  <span className="text-lg font-extrabold text-white">₦480,000</span>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block">Completed Projects</span>
                  <span className="text-lg font-extrabold text-[#B7F34A]">12</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 italic">"MAAS eliminated WhatsApp negotiations and got me paid on time for every single mix."</p>
            </div>
          </div>

          {/* SECTION 6: FOR BUSINESS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-zinc-900">
            <div className="lg:col-span-6 order-2 lg:order-1 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Active Procurement Brief</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/10 text-amber-400">6 Proposals Received</span>
              </div>
              <h4 className="text-base font-bold text-white">Brand Commercial Jingle Production</h4>
              <div className="text-xs text-zinc-300 space-y-1">
                <p>Client: Peak Brand Communications</p>
                <p>Budget: ₦150,000 - ₦250,000</p>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={() => setIsBriefModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                >
                  Create Organization Brief
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block">For Labels & Businesses</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">One place to source music talent.</h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                Source and manage producers, musicians, composers, engineers and other creative professionals without fragmented WhatsApp chats, email attachments, and unverified bank transfers.
              </p>
              <div className="pt-2">
                <Link
                  href="/for-business"
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore MAAS for Business</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PROJECT EXAMPLE */}
      <section className="py-20 border-b border-zinc-800/80 bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block mb-2">Live Workspace Demo</span>
            <h2 className="text-3xl font-black text-white">Project Workspace & Timeline</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">Example: Afrobeats Single Production • ₦220,000 • 14 day timeline</p>
          </div>

          <ProjectTimeline steps={timelineStepsDemo} />
        </div>
      </section>

      {/* SECTION 8: TRUST SYSTEM */}
      <section className="py-20 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7F34A] block mb-2">Trust & Accountability</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Built around the work.</h2>
            <p className="text-sm text-zinc-400 mt-2">Every verification metric on MAAS reflects concrete transaction evidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#B7F34A]" />
              <h3 className="text-lg font-bold text-white">Verified Profiles</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Identity verification, payment screening, and verified discography credits ensure you work with real professionals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <Sliders className="w-8 h-8 text-[#B7F34A]" />
              <h3 className="text-lg font-bold text-white">Clear Project Scopes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Defined deliverables, clear revision limits, and explicit licensing rights remove ambiguity before work starts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <Zap className="w-8 h-8 text-[#B7F34A]" />
              <h3 className="text-lg font-bold text-white">Milestone Payments</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Funds are held securely in escrow until deliverables are reviewed and approved by the client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-24 bg-[#0B0B0D] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Whatever you're making, find the people who can make it happen.
          </h2>
          <p className="text-base text-zinc-400">Join MAAS — Music as a Service.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-[#B7F34A] text-black font-extrabold text-base hover:bg-[#A4E235] transition-transform hover:scale-105 shadow-xl shadow-[#B7F34A]/20"
            >
              Join MAAS
            </Link>
            <Link
              href="/discover"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-base hover:bg-zinc-800 transition-colors"
            >
              Explore Talent Marketplace
            </Link>
          </div>
        </div>
      </section>

      <CreateBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />

    </div>
  );
}
