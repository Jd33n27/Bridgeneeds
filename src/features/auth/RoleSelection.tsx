import { Mic2, Search } from 'lucide-react';
import type { UserRole } from '../../pages/SignUpPage';
import { useState } from 'react';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

export default function RoleSelection({ onSelect }: RoleSelectionProps) {
  const [selected, setSelected] = useState<UserRole>(null);

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="role-selection">
      <div className="header">
        <h1>Create your account</h1>
        <p>Join BRIDGENEEDS and connect with the people behind the sound.</p>
      </div>

      <div className="prompt">
        <h2>What brings you to BRIDGENEEDS?</h2>
      </div>

      <div className="cards">
        <button 
          className={`role-card ${selected === 'offer_services' ? 'selected' : ''}`}
          onClick={() => setSelected('offer_services')}
          aria-pressed={selected === 'offer_services'}
        >
          <div className="card-icon">
            <Mic2 size={24} />
          </div>
          <div className="card-content">
            <h3>I offer music services</h3>
            <p>Create a profile, showcase your work and connect with people looking for your skills.</p>
          </div>
          <div className={`card-check ${selected === 'offer_services' ? 'visible' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </button>

        <button 
          className={`role-card ${selected === 'need_talent' ? 'selected' : ''}`}
          onClick={() => setSelected('need_talent')}
          aria-pressed={selected === 'need_talent'}
        >
          <div className="card-icon">
            <Search size={24} />
          </div>
          <div className="card-content">
            <h3>I need music talent</h3>
            <p>Find professionals, post project briefs and connect with the right people for your project.</p>
          </div>
          <div className={`card-check ${selected === 'need_talent' ? 'visible' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </button>
      </div>

      <div className="actions">
        <PrimaryButton 
          disabled={!selected} 
          onClick={handleContinue}
          fullWidth
        >
          Continue
        </PrimaryButton>
        <p className="signin-prompt">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      <style>{`
        .role-selection .header {
          margin-bottom: 40px;
          text-align: center;
        }
        .role-selection .header h1 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .role-selection .header p {
          color: var(--color-text-muted);
        }
        .role-selection .prompt h2 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .role-selection .cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .role-card {
          display: flex;
          align-items: flex-start;
          text-align: left;
          padding: 24px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-surface);
          transition: all var(--transition-fast);
          position: relative;
        }
        .role-card:hover {
          border-color: var(--color-primary-hover);
        }
        .role-card.selected {
          border-color: var(--color-primary);
          background-color: rgba(40, 122, 75, 0.04);
        }
        .card-icon {
          color: var(--color-primary);
          margin-right: 16px;
          flex-shrink: 0;
        }
        .card-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--color-text);
        }
        .card-content p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .card-check {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 20px;
          height: 20px;
          color: var(--color-primary);
          opacity: 0;
          transform: scale(0.8);
          transition: all var(--transition-fast);
        }
        .card-check.visible {
          opacity: 1;
          transform: scale(1);
        }
        .signin-prompt {
          text-align: center;
          margin-top: 24px;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }
        .signin-prompt a {
          color: var(--color-text);
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
