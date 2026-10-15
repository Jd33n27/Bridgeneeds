'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, PlusCircle, Clock, CheckCircle2, DollarSign, MessageSquare, ArrowRight, User } from 'lucide-react';
import { mockBriefs, mockProposals } from '@/data/mockBriefs';
import { mockActiveProject } from '@/data/mockProjects';
import { mockTalentProfiles } from '@/data/mockTalent';
import { CreateBriefModal } from '@/components/CreateBriefModal';
import { formatCurrency } from '@/lib/utils';

export default function ClientDashboardPage() {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [proposals, setProposals] = useState(mockProposals);

  const handleAcceptProposal = (propId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === propId ? { ...p, status: 'Accepted' } : p))
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">Client Dashboard</span>
            <h1 className="text-3xl font-black text-white mt-1">Nesta Creative Agency</h1>
          </div>

          <button
            onClick={() => setIsBriefModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs sm:text-sm hover:bg-[#A4E235] transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Brief</span>
          </button>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Active Projects</span>
            <span className="text-2xl font-black text-white block mt-1">1</span>
            <span className="text-[11px] text-[#B7F34A] block mt-1">In Escrow: ₦220,000</span>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Published Briefs</span>
            <span className="text-2xl font-black text-white block mt-1">3</span>
            <span className="text-[11px] text-zinc-400 block mt-1">6 New Proposals</span>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Total Spent</span>
            <span className="text-2xl font-black text-white block mt-1">₦680,000</span>
            <span className="text-[11px] text-zinc-400 block mt-1">5 Completed Transactions</span>
          </div>
        </div>

        {/* Active Projects Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Active Projects</h2>
          
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#B7F34A]/40 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
                  {mockActiveProject.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">ID: {mockActiveProject.id}</span>
              </div>

              <h3 className="text-lg font-bold text-white">{mockActiveProject.title}</h3>

              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span>Talent: <strong className="text-white">{mockActiveProject.talentName}</strong></span>
                <span>Budget: <strong className="text-white">{formatCurrency(mockActiveProject.totalBudget, mockActiveProject.currency)}</strong></span>
                <span className="flex items-center gap-1 text-[#B7F34A] font-semibold">
                  <Clock className="w-3.5 h-3.5" /> {mockActiveProject.daysRemaining} days remaining
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/projects/${mockActiveProject.id}`}
                className="px-5 py-2.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs hover:bg-[#A4E235] transition-colors flex items-center gap-1"
              >
                <span>Open Project Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Proposals Inbox */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Incoming Proposals for Published Briefs</h2>
          
          <div className="space-y-4">
            {proposals.map((prop) => (
              <div key={prop.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img src={prop.talentAvatar} alt={prop.talentName} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{prop.talentName}</h4>
                      <p className="text-xs text-zinc-400">{prop.talentTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 block">Proposed Price</span>
                      <span className="text-base font-extrabold text-white">{formatCurrency(prop.price, prop.currency)}</span>
                    </div>

                    {prop.status === 'Accepted' ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Agreement Accepted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAcceptProposal(prop.id)}
                        className="px-4 py-2 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs hover:bg-[#A4E235] transition-colors"
                      >
                        Accept Proposal & Fund Escrow
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">"{prop.message}"</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 font-semibold block mb-1">Deliverables Included:</span>
                    <ul className="space-y-1 text-zinc-300">
                      {prop.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F34A]" /> {del}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-zinc-500 font-semibold block mb-1">Timeline & Terms:</span>
                    <p className="text-zinc-300">{prop.timelineDays} days delivery • {prop.revisions} Revisions</p>
                    <p className="text-zinc-400 text-[11px] mt-1">{prop.terms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Talent */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Saved Music Talent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTalentProfiles.slice(0, 2).map((talent) => (
              <div key={talent.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex items-center gap-4">
                <img src={talent.avatar} alt={talent.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{talent.name}</h4>
                  <p className="text-xs text-zinc-400 truncate">{talent.title}</p>
                  <span className="text-xs text-[#B7F34A] font-semibold">From {formatCurrency(talent.startingPrice, talent.currency)}</span>
                </div>
                <Link href={`/talent/${talent.id}`} className="text-xs font-bold text-zinc-300 hover:text-white">
                  Profile
                </Link>
              </div>
            ))}
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
