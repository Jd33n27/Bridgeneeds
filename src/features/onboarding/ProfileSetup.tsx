import { useState } from 'react';
import type { UserRole } from '../../pages/SignUpPage';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Input from '../../components/ui/Input';

interface ProfileSetupProps {
  role: UserRole;
  onComplete: () => void;
}

const TALENT_ROLES = [
  'Producer', 'Beatmaker', 'Songwriter', 'Vocalist', 'Session Musician',
  'Recording Engineer', 'Mixing Engineer', 'Mastering Engineer', 'Vocal Producer',
  'DJ', 'Music Director', 'Composer', 'Sound Designer', 'Music Supervisor',
  'Band / Live Performer', 'Other'
];

const SEEKER_ROLES = [
  'Producer', 'Songwriter', 'Vocalist', 'Musician', 'Recording Engineer',
  'Mixing Engineer', 'Mastering Engineer', 'Composer', 'Sound Designer',
  'DJ', 'Music Director', 'Band / Live Performer', 'Other'
];

const PROJECT_TYPES = [
  'Music', 'Film & TV', 'Advertising', 'Games', 'Podcasts',
  'Events', 'Church / Ministry', 'Content', 'Brand / Corporate', 'Other'
];

export default function ProfileSetup({ role, onComplete }: ProfileSetupProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [knownFor, setKnownFor] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onComplete();
  };

  const isOffer = role === 'offer_services';
  const tagOptions = isOffer ? TALENT_ROLES : SEEKER_ROLES;

  return (
    <div className="profile-setup">
      <div className="header">
        <h2>Set up your profile</h2>
        <p>Let's personalize your experience. You can always update this later.</p>
      </div>

      <div className="form-section">
        <h3>{isOffer ? 'What do you do?' : 'What are you looking for?'}</h3>
        <div className="tags-grid">
          {tagOptions.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {!isOffer && (
        <div className="form-section">
          <h3>What kind of projects do you work on?</h3>
          <div className="tags-grid">
            {PROJECT_TYPES.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOffer && (
        <div className="form-section">
          <Input 
            label="What are you best known for?" 
            placeholder="e.g. Mixing acoustic pop, Producing hip hop beats"
            value={knownFor}
            onChange={(e) => setKnownFor(e.target.value)}
          />
        </div>
      )}

      <div className="form-section">
        <Input 
          label="Add your location" 
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-section photo-upload">
        <label className="photo-label">Add a profile photo</label>
        <div className="photo-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Upload photo</span>
        </div>
      </div>

      <div className="actions">
        <button className="skip-button" onClick={onComplete}>
          Skip for now
        </button>
        <PrimaryButton 
          onClick={handleComplete} 
          disabled={isSubmitting || selectedTags.length === 0}
          loading={isSubmitting}
        >
          Complete setup
        </PrimaryButton>
      </div>

      <style>{`
        .profile-setup .header {
          margin-bottom: 40px;
        }
        .profile-setup .header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .profile-setup .header p {
          color: var(--color-text-muted);
          font-size: 0.9375rem;
        }
        .form-section {
          margin-bottom: 32px;
        }
        .form-section h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag-button {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          font-size: 0.875rem;
          transition: all var(--transition-fast);
        }
        .tag-button:hover {
          border-color: var(--color-text-muted);
        }
        .tag-button.selected {
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        }
        .photo-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .photo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px dashed var(--color-border);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .photo-placeholder:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .photo-placeholder span {
          font-size: 0.75rem;
          margin-top: 8px;
        }
        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 48px;
        }
        .skip-button {
          color: var(--color-text-muted);
          font-weight: 500;
          padding: 8px;
        }
        .skip-button:hover {
          color: var(--color-text);
        }
      `}</style>
    </div>
  );
}
