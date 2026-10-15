'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, ShieldCheck, Users, FileCheck, Layers } from 'lucide-react';

export default function ForBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 uppercase">
            For Labels, Agencies & Brands
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">One place to source music talent.</h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Manage projects, briefs, licensing, and creative relationships without searching through dozens of platforms and fragmented emails.
          </p>
          <div>
            <Link
              href="/signup?role=client"
              className="px-8 py-4 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-transform hover:scale-105 inline-flex items-center gap-2 shadow-xl shadow-[#B7F34A]/20"
            >
              <span>Explore MAAS for Business</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <Building2 className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Enterprise Procurement</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Consolidate composer, producer, and sound engineer billing into one platform with clear invoices and reporting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <FileCheck className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Structured Briefs</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Define reference tracks, budget parameters, and deadlines to receive proposals from pre-screened professionals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#B7F34A]" />
            <h3 className="text-lg font-bold text-white">Rights & Licensing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Clear commercial licensing terms for TV ads, films, podcasts, and digital campaign placements.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
