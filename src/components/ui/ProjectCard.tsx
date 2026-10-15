import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { Project } from '../../types';
import { Button } from './Button';
import './ProjectCard.css';

export interface ProjectCardProps {
  project: Project;
  userRole?: 'client' | 'talent';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, userRole = 'client' }) => {
  const counterpartyAvatar = userRole === 'client' ? project.talentAvatar : project.clientAvatar;
  const counterpartyName = userRole === 'client' ? project.talentName : project.clientName;
  const counterpartyRole = userRole === 'client' ? project.talentRole : 'Client';

  const completedMilestones = project.milestones.filter(m => m.status === 'approved' || m.status === 'paid').length;
  const totalMilestones = project.milestones.length;

  return (
    <div className="project-dashboard-card">
      <div className="project-card-header">
        <div className="counterparty-info">
          <img src={counterpartyAvatar} alt={counterpartyName} className="cp-avatar" />
          <div>
            <span className="cp-name">{counterpartyName}</span>
            <span className="cp-role">{counterpartyRole}</span>
          </div>
        </div>

        <span className={`project-status-pill status-${project.status}`}>
          {project.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="project-card-body">
        <h4 className="project-card-title">{project.title}</h4>
        <p className="project-agreed-scope">{project.agreedScope}</p>

        <div className="project-meta-grid">
          <div className="p-meta-item">
            <span className="p-meta-lbl">Total Budget</span>
            <span className="p-meta-val font-bold">${project.totalBudget}</span>
          </div>
          <div className="p-meta-item">
            <span className="p-meta-lbl">Escrow Status</span>
            <span className="p-meta-val text-green">
              <ShieldCheck size={13} /> {project.escrowStatus}
            </span>
          </div>
          <div className="p-meta-item">
            <span className="p-meta-lbl">Milestones</span>
            <span className="p-meta-val">{completedMilestones} / {totalMilestones} Completed</span>
          </div>
          <div className="p-meta-item">
            <span className="p-meta-lbl">Deadline</span>
            <span className="p-meta-val">
              <Calendar size={13} /> {project.targetCompletionDate}
            </span>
          </div>
        </div>
      </div>

      <div className="project-card-footer">
        <Link to={`/projects/${project.id}`} className="full-width-link">
          <Button variant="lime" fullWidth rightIcon={<ArrowRight size={16} />}>
            Open Project Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
};
