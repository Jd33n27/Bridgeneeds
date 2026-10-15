'use client';

import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { ProjectTimelineStep } from '@/types';

interface ProjectTimelineProps {
  steps: ProjectTimelineStep[];
  currentStepIndex?: number;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  steps
}) => {
  return (
    <div className="w-full bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Project Workspace Timeline</span>
            <span className="w-2 h-2 rounded-full bg-[#B7F34A] animate-ping" />
          </h3>
          <p className="text-xs text-zinc-400">Track real-time project milestones and milestone escrow states</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30">
          Escrow Protected
        </span>
      </div>

      <div className="relative">
        {/* Horizontal connector line on desktop */}
        <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-zinc-800 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={idx} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    isCompleted
                      ? 'bg-[#B7F34A] border-[#B7F34A] text-black font-bold shadow-md shadow-[#B7F34A]/20'
                      : isCurrent
                      ? 'bg-zinc-900 border-[#B7F34A] text-[#B7F34A] animate-pulse ring-4 ring-[#B7F34A]/20'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-black stroke-[#B7F34A]" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{idx + 1}</span>
                  )}
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isCompleted || isCurrent ? 'text-white' : 'text-zinc-500'}`}>
                    {step.label}
                  </h4>
                  {step.date && (
                    <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">{step.date}</span>
                  )}
                  {step.description && (
                    <p className="text-[10px] text-zinc-500 hidden lg:block mt-1 leading-tight max-w-[120px]">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
