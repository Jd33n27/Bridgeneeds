import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, FileCheck, DollarSign } from 'lucide-react';
import { ProjectStatus, Milestone } from '../../types';
import './ProjectTimeline.css';

export interface ProjectTimelineProps {
  status: ProjectStatus;
  milestones: Milestone[];
}

const PHASES = [
  { id: 'setup', label: 'Brief Accepted', icon: CheckCircle2 },
  { id: 'funded', label: 'Escrow Funded', icon: ShieldCheck },
  { id: 'in_progress', label: 'Work in Progress', icon: Clock },
  { id: 'in_review', label: 'Delivery & Review', icon: FileCheck },
  { id: 'completed', label: 'Payment Released', icon: DollarSign },
];

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ status, milestones }) => {
  const getPhaseIndex = (s: ProjectStatus) => {
    switch (s) {
      case 'setup': return 0;
      case 'in_progress': return 2;
      case 'in_review': return 3;
      case 'revision_requested': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const currentIndex = getPhaseIndex(status);

  return (
    <div className="project-timeline-box">
      <h4 className="timeline-title">Project Progress Timeline</h4>
      <div className="timeline-steps-container">
        {PHASES.map((phase, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = phase.icon;

          return (
            <div key={phase.id} className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="step-icon-wrapper">
                <Icon size={16} />
              </div>
              <span className="step-label">{phase.label}</span>
              {idx < PHASES.length - 1 && <div className="step-connector" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
