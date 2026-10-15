import React, { useState } from 'react';
import { ShieldCheck, Award, Headphones, Info } from 'lucide-react';
import { VerificationBadgeInfo } from '../../types';
import './VerificationBadge.css';

export interface VerificationBadgeProps {
  badge: VerificationBadgeInfo;
  showDetails?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ badge, showDetails = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    switch (badge.type) {
      case 'identity':
        return <ShieldCheck size={14} className="badge-icon icon-identity" />;
      case 'audio_quality':
        return <Headphones size={14} className="badge-icon icon-audio" />;
      case 'industry_credits':
        return <Award size={14} className="badge-icon icon-credits" />;
      default:
        return <ShieldCheck size={14} className="badge-icon" />;
    }
  };

  return (
    <div className="verification-badge-container">
      <button
        type="button"
        className={`verification-badge badge-${badge.type}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-expanded={isOpen}
        aria-label={`Verification badge: ${badge.title}`}
      >
        {getIcon()}
        <span className="badge-title">{badge.title}</span>
        <Info size={12} className="badge-info-icon" />
      </button>

      {(isOpen || showDetails) && (
        <div className="verification-popover" role="tooltip">
          <div className="popover-header">
            {getIcon()}
            <strong>{badge.title}</strong>
          </div>
          <p className="popover-desc">{badge.description}</p>
          <div className="popover-footer">
            <span>Verified by Bridgeneeds Audit Team</span>
            <time dateTime={badge.verifiedDate}>{new Date(badge.verifiedDate).toLocaleDateString()}</time>
          </div>
        </div>
      )}
    </div>
  );
};
