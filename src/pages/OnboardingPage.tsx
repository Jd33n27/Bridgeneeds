import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../components/auth/BrandLogo';
import { authService, type AccountType } from '../services/auth';
import { Check, Sparkles, ArrowRight, LogOut, Briefcase, Music } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  const initialAccountType: AccountType =
    location.state?.accountType || currentUser?.accountType || 'creative_professional';

  const [accountType] = useState<AccountType>(initialAccountType);
  const [discipline, setDiscipline] = useState<string>('');
  const [experience, setExperience] = useState<string>('3-5 years');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [clientType, setClientType] = useState<string>('Independent Artist / Brand');
  const [projectNeed, setProjectNeed] = useState<string>('Music Production & Mixing');
  const [organization, setOrganization] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const creativeDisciplines = [
    'Music Producer',
    'Mixing & Mastering Engineer',
    'Songwriter & Lyricist',
    'Lead Vocalist',
    'Session Instrumentalist',
    'Film & Game Composer',
    'Sound Designer',
    'Audio Editor / Post-Production',
  ];

  const clientProjectTypes = [
    'Full Track Production',
    'Vocal Recording & Features',
    'Mixing & Mastering',
    'Commercial Audio & Jingles',
    'Podcast & Voiceover Editing',
    'Live Session Musicians',
  ];

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    if (currentUser) {
      currentUser.discipline = accountType === 'creative_professional' ? discipline : projectNeed;
    }

    setIsSubmitting(false);
    const dest = accountType === 'creative_professional' ? '/dashboard/talent' : '/dashboard/client';
    navigate(dest);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-primary-text)' }}>
      {/* Top Navbar */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BrandLogo variant="dark" size="sm" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-secondary-text)' }}>
              Signed in as <strong>{currentUser?.email || 'User'}</strong>
            </span>
            <button
              onClick={handleSignOut}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13.5px',
                color: 'var(--color-error)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '640px', margin: '48px auto', padding: '0 20px 60px 20px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: '40px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-blue-light)',
                color: 'var(--color-primary-blue)',
                fontSize: '12.5px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              <Sparkles size={14} />
              <span>Step 2 of 2: Profile Customization</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading, 'Manrope', sans-serif)",
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--color-primary-navy)',
                marginBottom: '8px',
              }}
            >
              {accountType === 'creative_professional'
                ? 'Tell us about your creative craft'
                : 'What are you looking to create?'}
            </h1>
            <p style={{ color: 'var(--color-secondary-text)', fontSize: '15px' }}>
              {accountType === 'creative_professional'
                ? "Help clients and producers discover your talents with the right specializations."
                : 'Help us match you with the right creators and producers for your vision.'}
            </p>
          </div>

          <form onSubmit={handleComplete}>
            {accountType === 'creative_professional' ? (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '10px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Primary Creative Discipline <span style={{ color: 'var(--color-primary-blue)' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {creativeDisciplines.map((d) => {
                      const isSelected = discipline === d;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDiscipline(d)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: `1.5px solid ${isSelected ? 'var(--color-primary-blue)' : 'var(--color-border)'}`,
                            backgroundColor: isSelected ? 'var(--color-blue-light)' : 'var(--color-surface)',
                            color: isSelected ? 'var(--color-primary-blue)' : 'var(--color-primary-text)',
                            fontWeight: isSelected ? 600 : 500,
                            fontSize: '13.5px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 150ms ease',
                          }}
                        >
                          <span>{d}</span>
                          {isSelected && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="portfolio-input"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Sample Work / Portfolio Link
                  </label>
                  <input
                    id="portfolio-input"
                    type="url"
                    className="form-input"
                    placeholder="https://soundcloud.com/your-name or spotify link"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginTop: '4px', display: 'block' }}>
                    Optional: You can link any audio reel, website, or social profile.
                  </span>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label
                    htmlFor="exp-select"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Experience Level
                  </label>
                  <select
                    id="exp-select"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="form-input"
                    style={{ height: '48px', cursor: 'pointer' }}
                  >
                    <option value="1-2 years">Emerging (1-2 years experience)</option>
                    <option value="3-5 years">Mid-level (3-5 years experience)</option>
                    <option value="6-10 years">Established Professional (6-10 years)</option>
                    <option value="10+ years">Studio Veteran / Executive (10+ years)</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '10px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Primary Project Need <span style={{ color: 'var(--color-primary-blue)' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {clientProjectTypes.map((t) => {
                      const isSelected = projectNeed === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setProjectNeed(t)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: `1.5px solid ${isSelected ? 'var(--color-primary-blue)' : 'var(--color-border)'}`,
                            backgroundColor: isSelected ? 'var(--color-blue-light)' : 'var(--color-surface)',
                            color: isSelected ? 'var(--color-primary-blue)' : 'var(--color-primary-text)',
                            fontWeight: isSelected ? 600 : 500,
                            fontSize: '13.5px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 150ms ease',
                          }}
                        >
                          <span>{t}</span>
                          {isSelected && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="client-type-input"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Account Category
                  </label>
                  <select
                    id="client-type-input"
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    className="form-input"
                    style={{ height: '48px', cursor: 'pointer' }}
                  >
                    <option value="Individual / Artist">Independent Artist</option>
                    <option value="Record Label">Record Label</option>
                    <option value="Agency / Production House">Agency / Production House</option>
                    <option value="Game Studio / Film Producer">Game Studio / Film Producer</option>
                    <option value="Brand / Commercial Enterprise">Brand / Enterprise Client</option>
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label
                    htmlFor="org-name-input"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-primary-text)',
                    }}
                  >
                    Company or Project Name (Optional)
                  </label>
                  <input
                    id="org-name-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g. EchoWave Studios or Solar Records"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>{isSubmitting ? 'Finalizing workspace...' : 'Enter BRIDGENEEDS Workspace'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;
