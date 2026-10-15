'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DollarSign, CheckCircle2, Eye, FileText, Send, Clock, ArrowRight, Star } from 'lucide-react';
import { mockBriefs } from '@/data/mockBriefs';
import { mockActiveProject } from '@/data/mockProjects';
import { formatCurrency } from '@/lib/utils';

export default function TalentDashboardPage() {
  const [selectedBrief, setSelectedBrief] = useState<any>(null);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('220000');
  const [proposedDays, setProposedDays] = useState('10');
  const [proposalMessage, setProposalMessage] = useState('');
  const [submittedProps, setSubmittedProps] = useState<string[]>([]);

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrief) {
      setSubmittedProps((prev) => [...prev, selectedBrief.id]);
      setProposalModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">Talent Studio Dashboard</span>
            <h1 className="text-3xl font-black text-white mt-1">Daniel Okafor Studio</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </span>
          </div>
        </div>

        {/* Financial & Studio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">This Month's Earnings</span>
            <span className="text-2xl font-black text-white block mt-1">₦480,000</span>
            <span className="text-[11px] text-[#B7F34A] block mt-1">+24% vs last month</span>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Completed Projects</span>
            <span className="text-2xl font-black text-white block mt-1">12</span>
            <span className="text-[11px] text-zinc-400 block mt-1">100% On-time delivery</span>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Profile Rating</span>
            <span className="text-2xl font-black text-[#B7F34A] block mt-1">★ 4.9</span>
            <span className="text-[11px] text-zinc-400 block mt-1">42 Verified Reviews</span>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <span className="text-xs text-zinc-400 font-medium">Profile Views</span>
            <span className="text-2xl font-black text-white block mt-1">840</span>
            <span className="text-[11px] text-zinc-400 block mt-1">32 Search appearances</span>
          </div>
        </div>

        {/* Incoming Briefs Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Incoming Marketplace Briefs (Matching Your Skills)</h2>
          
          <div className="space-y-4">
            {mockBriefs.map((brief) => {
              const hasSubmitted = submittedProps.includes(brief.id);
              return (
                <div key={brief.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#B7F34A]/40 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
                        {brief.category}
                      </span>
                      <span className="text-xs text-zinc-400">Posted {brief.createdAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{brief.title}</h3>
                    <p className="text-xs text-zinc-300 line-clamp-2">{brief.requirements}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                      <span>Client: <strong className="text-white">{brief.clientName}</strong></span>
                      <span>Budget: <strong className="text-white">₦{brief.budgetMin.toLocaleString()} - ₦{brief.budgetMax.toLocaleString()}</strong></span>
                      <span>Deadline: <strong className="text-white">{brief.deadline}</strong></span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {hasSubmitted ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Proposal Sent
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedBrief(brief);
                          setProposalModalOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs hover:bg-[#A4E235] transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Proposal</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Client Project */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">Active Client Project</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#B7F34A]">STATUS: IN PROGRESS</span>
              <h3 className="text-lg font-bold text-white mt-1">{mockActiveProject.title}</h3>
              <p className="text-xs text-zinc-400">Client: {mockActiveProject.clientName} • Payout: {formatCurrency(mockActiveProject.totalBudget, mockActiveProject.currency)}</p>
            </div>

            <Link
              href={`/projects/${mockActiveProject.id}`}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 text-white hover:bg-[#B7F34A] hover:text-black font-bold text-xs transition-colors"
            >
              Open Project Workspace
            </Link>
          </div>
        </div>

      </div>

      {/* Proposal Builder Modal */}
      {proposalModalOpen && selectedBrief && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl text-left">
            <h3 className="text-lg font-bold text-white">Submit Proposal for {selectedBrief.title}</h3>
            
            <form onSubmit={handleSendProposal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Price (₦)</label>
                  <input
                    type="number"
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Timeline (Days)</label>
                  <input
                    type="number"
                    value={proposedDays}
                    onChange={(e) => setProposedDays(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Cover Message & Work Strategy</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain why you are the best fit for this project and how you will execute the sound..."
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProposalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs"
                >
                  Send Proposal Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
