'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Music, User, MapPin, DollarSign, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'talent';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    roleOrCompany: '',
    location: 'Lagos, Nigeria',
    genres: 'Afrobeats, R&B',
    startingPrice: '150000',
    bioOrNeeds: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (role === 'talent') {
        router.push('/dashboard/talent');
      } else {
        router.push('/dashboard/client');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-16 text-white flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 uppercase">
              {role === 'talent' ? 'Music Talent Onboarding' : 'Client Profile Setup'}
            </span>
            <h1 className="text-2xl font-black text-white">
              {role === 'talent' ? 'Set Up Your Professional Studio' : 'Create Your Organization Profile'}
            </h1>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B7F34A]/20 text-[#B7F34A] flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Profile Verified & Created!</h3>
              <p className="text-xs text-zinc-400">Redirecting to your workspace dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  {role === 'talent' ? 'Full Name or Stage Name' : 'Company or Organization Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'talent' ? 'e.g. Daniel Okafor' : 'e.g. Nesta Creative Agency'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  {role === 'talent' ? 'Primary Professional Role' : 'Primary Project Type'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'talent' ? 'e.g. Music Producer & Arranger' : 'e.g. Independent Record Label'}
                  value={formData.roleOrCompany}
                  onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                />
              </div>

              {role === 'talent' ? (
                <>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Genres & Specialties</label>
                    <input
                      type="text"
                      value={formData.genres}
                      onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Starting Rate (₦)</label>
                    <input
                      type="number"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                    />
                  </div>
                </>
              ) : null}

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  {role === 'talent' ? 'Professional Bio' : 'Music Needs & Scope Description'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={role === 'talent' ? 'Describe your studio experience and gear...' : 'Describe what music services your team regularly requires...'}
                  value={formData.bioOrNeeds}
                  onChange={(e) => setFormData({ ...formData, bioOrNeeds: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-sm hover:bg-[#A4E235] transition-colors"
                >
                  Complete Onboarding
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
