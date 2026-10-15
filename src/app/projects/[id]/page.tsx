'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { AudioPlayer } from '@/components/AudioPlayer';
import { mockActiveProject } from '@/data/mockProjects';
import { CheckCircle2, ShieldCheck, Download, Send, Paperclip, Music, FileText, Lock, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const project = mockActiveProject;

  const [messages, setMessages] = useState(project.messages);
  const [newMessage, setNewMessage] = useState('');
  const [escrowApproved, setEscrowApproved] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `msg-${Date.now()}`,
      senderName: 'Nesta Creative Agency',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isTalent: false,
      content: newMessage,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Workspace Header */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 md:p-8 space-y-4 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">Workspace ID: {project.id}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">{project.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-zinc-500 block">Total Escrow Budget</span>
                <span className="text-xl font-extrabold text-[#B7F34A]">
                  {formatCurrency(project.totalBudget, project.currency)}
                </span>
              </div>

              {escrowApproved ? (
                <span className="px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Escrow Released
                </span>
              ) : (
                <button
                  onClick={() => setEscrowApproved(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#B7F34A] text-black font-extrabold text-xs hover:bg-[#A4E235] transition-colors flex items-center gap-1.5 shadow-lg shadow-[#B7F34A]/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Release Funds</span>
                </button>
              )}
            </div>
          </div>

          {/* Client & Talent Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Client:</span>
              <img src={project.clientAvatar} alt={project.clientName} className="w-6 h-6 rounded-full" />
              <strong className="text-white">{project.clientName}</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Talent:</span>
              <img src={project.talentAvatar} alt={project.talentName} className="w-6 h-6 rounded-full" />
              <strong className="text-white">{project.talentName} ({project.talentTitle})</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Status:</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-zinc-800 text-[#B7F34A]">
                {project.currentPhase} • {project.daysRemaining} days remaining
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <ProjectTimeline steps={project.timelineSteps} />

        {/* Workspace Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Deliverables Vault */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-[#B7F34A]" />
                <span>Deliverables & Audio Vault</span>
              </h3>

              <div className="space-y-4">
                {project.deliverables.map((del) => (
                  <div key={del.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white truncate max-w-[220px]">{del.name}</h4>
                        <p className="text-[10px] text-zinc-400">{del.size} • Uploaded {del.uploadDate}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B7F34A]/10 text-[#B7F34A]">
                        {del.version}
                      </span>
                    </div>

                    {del.type.includes('audio') && (
                      <AudioPlayer
                        title={del.name}
                        artistOrRole={project.talentName}
                        audioUrl={del.url}
                        compact={true}
                      />
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <a
                        href={del.url}
                        download
                        className="text-xs font-semibold text-[#B7F34A] hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download 24-bit File
                      </a>

                      <span className="text-[11px] text-zinc-500">Status: {del.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Chat & Revisions Thread */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col h-[520px]">
              <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-zinc-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B7F34A]" />
                <span>Project Chat & Revision Notes</span>
              </h3>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isTalent ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-[11px] text-zinc-400">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-2 ${
                        msg.isTalent
                          ? 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                          : 'bg-[#B7F34A] text-black font-medium rounded-tr-none'
                      }`}
                    >
                      <p>{msg.content}</p>
                      
                      {msg.audioAttachmentUrl && (
                        <div className="mt-2 pt-2 border-t border-black/10">
                          <AudioPlayer
                            title={msg.fileAttachmentName || 'Audio Attachment'}
                            audioUrl={msg.audioAttachmentUrl}
                            compact={true}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-zinc-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type revision notes or feedback..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#B7F34A]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#B7F34A] text-black hover:bg-[#A4E235] transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
