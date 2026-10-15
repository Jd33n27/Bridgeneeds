import React from 'react';
import { Mic2, Briefcase } from 'lucide-react';
import type { AccountType } from '../../services/auth';

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (type: AccountType) => void;
  className?: string;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const options: Array<{
    type: AccountType;
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      type: 'creative_professional',
      title: "I'm a Creative Professional",
      description: 'Showcase your work and connect with clients.',
      icon: <Mic2 size={16} aria-hidden="true" />,
    },
    {
      type: 'hiring_client',
      title: "I'm Hiring",
      description: 'Find the right talent for your creative projects.',
      icon: <Briefcase size={16} aria-hidden="true" />,
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, type: AccountType) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(type);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = type === 'creative_professional' ? 'hiring_client' : 'creative_professional';
      onChange(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = type === 'creative_professional' ? 'hiring_client' : 'creative_professional';
      onChange(prev);
    }
  };

  return (
    <div className={`account-type-group ${className}`}>
      <span id="account-type-label" className="account-type-label">
        Select Account Type
      </span>

      <div
        className="account-type-cards"
        role="radiogroup"
        aria-labelledby="account-type-label"
      >
        {options.map((opt) => {
          const isSelected = value === opt.type;
          return (
            <div
              key={opt.type}
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(opt.type)}
              onKeyDown={(e) => handleKeyDown(e, opt.type)}
              className={`account-type-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="account-type-card-top">
                <div className="account-type-icon">{opt.icon}</div>
                <div className="account-type-radio-indicator">
                  {isSelected && <div className="account-type-radio-indicator-dot" />}
                </div>
              </div>

              <div className="account-type-card-title">{opt.title}</div>
              <div className="account-type-card-desc">{opt.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountTypeSelector;
