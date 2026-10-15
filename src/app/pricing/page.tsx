'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 uppercase">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-black">Simple, Fair Business Model</h1>
          <p className="text-base text-zinc-300">
            No hidden fees. Free profile setup for talent, transparent transaction fee on completed work.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Free Talent Profile</h3>
              <p className="text-xs text-zinc-400">For producers, engineers, and session musicians starting out.</p>
              <div className="text-3xl font-black text-white">₦0 <span className="text-xs text-zinc-500 font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Create storefront & bio</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Up to 3 packaged services</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> 10% marketplace transaction fee</li>
              </ul>
            </div>
            <Link href="/signup?role=talent" className="w-full py-3 rounded-xl bg-zinc-800 text-white text-xs font-bold text-center hover:bg-zinc-700">
              Create Free Profile
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-3xl border-2 border-[#B7F34A] p-8 space-y-6 flex flex-col justify-between relative shadow-xl shadow-[#B7F34A]/10">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#B7F34A] text-black">
              MOST POPULAR
            </span>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Pro Studio Talent</h3>
              <p className="text-xs text-zinc-400">For active professionals wanting maximum visibility & lower fees.</p>
              <div className="text-3xl font-black text-white">₦15,000 <span className="text-xs text-zinc-500 font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Featured placement in search</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Unlimited packaged services</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Reduced 5% transaction fee</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Advanced studio analytics & CRM</li>
              </ul>
            </div>
            <Link href="/signup?role=talent" className="w-full py-3 rounded-xl bg-[#B7F34A] text-black text-xs font-extrabold text-center hover:bg-[#A4E235]">
              Upgrade to Pro
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Business & Enterprise</h3>
              <p className="text-xs text-zinc-400">For advertising agencies, record labels, and film studios.</p>
              <div className="text-3xl font-black text-white">Custom <span className="text-xs text-zinc-500 font-normal">/ invoice</span></div>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Dedicated music procurement manager</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Multi-user team collaboration</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B7F34A]" /> Custom rights & sync licensing</li>
              </ul>
            </div>
            <Link href="/for-business" className="w-full py-3 rounded-xl bg-zinc-800 text-white text-xs font-bold text-center hover:bg-zinc-700">
              Contact Business Team
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
