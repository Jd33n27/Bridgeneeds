'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Headphones, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<'client' | 'talent'>('client');

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 flex items-center justify-center text-white">
      <div className="w-full max-w-xl mx-auto px-4 space-y-8 text-center">
        
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#B7F34A] text-black font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#B7F34A]/20">
            M
          </div>
          <h1 className="text-3xl font-black text-white">Join MAAS</h1>
          <p className="text-xs text-zinc-400">Music as a Service Infrastructure Platform</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          
          <div
            onClick={() => setSelectedRole('client')}
            className={`cursor-pointer rounded-2xl p-6 border transition-all ${
              selectedRole === 'client'
                ? 'bg-zinc-900 border-[#B7F34A] shadow-xl shadow-[#B7F34A]/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <Briefcase className={`w-8 h-8 mb-4 ${selectedRole === 'client' ? 'text-[#B7F34A]' : 'text-zinc-500'}`} />
            <h3 className="text-base font-bold text-white">I need music talent</h3>
            <p className="text-xs text-zinc-400 mt-1">
              For artists, agencies, brands, film studios, and clients needing producers, engineers, and session musicians.
            </p>
          </div>

          <div
            onClick={() => setSelectedRole('talent')}
            className={`cursor-pointer rounded-2xl p-6 border transition-all ${
              selectedRole === 'talent'
                ? 'bg-zinc-900 border-[#B7F34A] shadow-xl shadow-[#B7F34A]/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <Headphones className={`w-8 h-8 mb-4 ${selectedRole === 'talent' ? 'text-[#B7F34A]' : 'text-zinc-500'}`} />
            <h3 className="text-base font-bold text-white">I offer music services</h3>
            <p className="text-xs text-zinc-400 mt-1">
              For music producers, beatmakers, mixing engineers, vocalists, songwriters, and instrumentalists.
            </p>
          </div>

        </div>

        <div>
          <Link
            href={`/onboarding?role=${selectedRole}`}
            className="w-full py-4 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#B7F34A]/20"
          >
            <span>Continue as {selectedRole === 'client' ? 'Client' : 'Music Talent'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-zinc-500">
          Already have an account? <Link href="/dashboard/client" className="text-white hover:underline font-semibold">Sign In</Link>
        </p>

      </div>
    </div>
  );
}
