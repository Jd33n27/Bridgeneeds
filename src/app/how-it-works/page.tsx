'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProjectTimeline } from '@/components/ProjectTimeline';

export default function HowItWorksPage() {
  const steps = [
    { label: 'Describe Brief', status: 'completed' as const, description: 'Client outlines project goals & budget' },
    { label: 'Match Talent', status: 'completed' as const, description: 'MAAS matches top pre-verified talent' },
    { label: 'Escrow Lock', status: 'completed' as const, description: 'Payment safely funded into escrow' },
    { label: 'Collaborate', status: 'completed' as const, description: 'Work in shared workspace & review stems' },
    { label: 'Final Master', status: 'completed' as const, description: 'Delivery of high-res WAV & stems' },
    { label: 'Approve & Pay', status: 'current' as const, description: 'Client approves and funds release' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 uppercase">
            Platform Workflow
          </span>
          <h1 className="text-4xl sm:text-5xl font-black">How MAAS Works</h1>
          <p className="text-base text-zinc-300">
            A transparent transaction framework connecting music talent with businesses and creators.
          </p>
        </div>

        <ProjectTimeline steps={steps} />

        <div className="max-w-3xl mx-auto text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm">
              Get Started Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
