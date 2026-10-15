'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, DollarSign, Award, Music, Sliders } from 'lucide-react';

export default function ForTalentPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 uppercase">
            For Music Professionals
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">Your skills are a business.</h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Create a professional storefront, package your production, mixing, and recording services, and get discovered by clients worldwide looking for top African music talent.
          </p>
          <div>
            <Link
              href="/signup?role=talent"
              className="px-8 py-4 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-transform hover:scale-105 inline-flex items-center gap-2 shadow-xl shadow-[#B7F34A]/20"
            >
              <span>Join as Talent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <DollarSign className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Guaranteed Payouts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No more chasing invoices or negotiating on WhatsApp. Funds are locked in MAAS Escrow before you start work.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <Award className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Build Verified Credits</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every completed transaction adds real transaction evidence to your profile, building a portable discography.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <Sliders className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Packaged Services</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Set clear delivery timelines, revision limits, and stem deliverables so clients know exactly what is included.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
