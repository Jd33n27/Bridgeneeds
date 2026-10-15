'use client';

import React, { useState } from 'react';
import { X, Check, Music, DollarSign, Calendar, Sparkles, Send, FileText } from 'lucide-react';
import { CategoryType } from '@/types';

interface CreateBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (briefData: any) => void;
}

export const CreateBriefModal: React.FC<CreateBriefModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Production' as CategoryType,
    serviceRequired: 'Music Production',
    budgetMin: '150000',
    budgetMax: '250000',
    deadline: '2026-10-24',
    location: 'Remote',
    requirements: '',
    referenceTrack: ''
  });

  if (!isOpen) return null;

  const categories: CategoryType[] = [
    'Production',
    'Songwriting',
    'Mixing',
    'Mastering',
    'Vocals',
    'Musicians',
    'Music Direction',
    'Sound Design'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess(formData);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#B7F34A]" />
              <span>Create Project Brief</span>
            </h3>
            <p className="text-xs text-zinc-400">Define your scope to receive verified proposals from talent</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-1">
          <div
            className="bg-[#B7F34A] h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#B7F34A]/20 text-[#B7F34A] border border-[#B7F34A]/40 flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Brief Published to MAAS Network!</h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              Your brief for <span className="text-[#B7F34A] font-semibold">{formData.title || 'Afrobeats Single'}</span> is now live. Top producers and engineers are being notified.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors"
              >
                Go to Client Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Step 1: Category & Title</h4>
                
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afrobeats Lead Single Production & Vocal Mix"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Service Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          formData.category === cat
                            ? 'bg-[#B7F34A]/10 border-[#B7F34A] text-[#B7F34A]'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Step 2: Project Scope & References</h4>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Detailed Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you need: instrumentation, vibe, arrangement, vocal tuning, stems required..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Reference Songs (Spotify / YouTube Links)</label>
                  <input
                    type="url"
                    placeholder="https://spotify.com/track/..."
                    value={formData.referenceTrack}
                    onChange={(e) => setFormData({ ...formData, referenceTrack: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Step 3: Budget & Timeline</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Min Budget (₦)</label>
                    <input
                      type="number"
                      value={formData.budgetMin}
                      onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Max Budget (₦)</label>
                    <input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Target Completion Date</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#B7F34A]"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Step 4: Review Brief Details</h4>

                <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Title:</span>
                    <span className="font-semibold text-white">{formData.title || 'Afrobeats Single'}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Category:</span>
                    <span className="font-semibold text-[#B7F34A]">{formData.category}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Budget Range:</span>
                    <span className="font-semibold text-white">₦{Number(formData.budgetMin).toLocaleString()} - ₦{Number(formData.budgetMax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Deadline:</span>
                    <span className="font-semibold text-white">{formData.deadline}</span>
                  </div>
                  {formData.requirements && (
                    <div className="pt-2 border-t border-zinc-800 text-zinc-400">
                      <span className="block mb-1">Requirements:</span>
                      <p className="text-zinc-200 italic">{formData.requirements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Brief</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
