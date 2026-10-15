import React from 'react';
import { Proposal } from '../../types';
import { RatingSummary } from './RatingSummary';
import { Button } from './Button';
import { Clock, DollarSign, Check, X, FileText } from 'lucide-react';
import './ProposalSummary.css';

export interface ProposalSummaryProps {
  proposal: Proposal;
  onAccept?: (proposalId: string) => void;
  onDecline?: (proposalId: string) => void;
  isClientView?: boolean;
}

export const ProposalSummary: React.FC<ProposalSummaryProps> = ({
  proposal,
  onAccept,
  onDecline,
  isClientView = true,
}) => {
  return (
    <div className="proposal-card">
      <div className="proposal-header">
        <div className="proposal-talent-info">
          <img src={proposal.talentAvatar} alt={proposal.talentName} className="proposal-avatar" />
          <div>
            <h4 className="proposal-talent-name">{proposal.talentName}</h4>
            <span className="proposal-talent-role">{proposal.talentRole}</span>
          </div>
        </div>

        <div className="proposal-quote-badge">
          <span className="quote-amount">${proposal.priceQuote}</span>
          <span className="quote-days">
            <Clock size={13} /> {proposal.estimatedDays} days
          </span>
        </div>
      </div>

      <div className="proposal-body">
        <p className="proposal-cover-letter">{proposal.coverLetter}</p>

        {/* Milestones Breakdown */}
        {proposal.proposedMilestones && proposal.proposedMilestones.length > 0 && (
          <div className="proposed-milestones-box">
            <span className="milestones-title">
              <FileText size={14} /> Proposed Payment Milestones:
            </span>
            <ul className="milestones-list">
              {proposal.proposedMilestones.map((m, idx) => (
                <li key={idx} className="milestone-item">
                  <span className="m-title">{m.title}</span>
                  <span className="m-amount">${m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isClientView && proposal.status === 'pending' && (
        <div className="proposal-actions">
          {onDecline && (
            <Button variant="outline" size="sm" onClick={() => onDecline(proposal.id)} leftIcon={<X size={14} />}>
              Decline
            </Button>
          )}
          {onAccept && (
            <Button variant="lime" size="sm" onClick={() => onAccept(proposal.id)} leftIcon={<Check size={14} />}>
              Accept Proposal & Fund Escrow
            </Button>
          )}
        </div>
      )}

      {proposal.status !== 'pending' && (
        <div className={`proposal-status-badge status-${proposal.status}`}>
          Status: {proposal.status.toUpperCase()}
        </div>
      )}
    </div>
  );
};
