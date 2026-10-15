import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../components/auth/BrandLogo';
import { authService } from '../services/auth';
import { ShieldCheck, LogOut, User, Sparkles, Compass, PlusCircle } from 'lucide-react';

interface DashboardPreviewPageProps {
  role?: 'client' | 'talent';
}

export const DashboardPreviewPage: React.FC<DashboardPreviewPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const session = authService.getSession();
  const user = session?.user;

  const effectiveRole = role || (user?.accountType === 'creative_professional' ? 'talent' : 'client');

  const handleSignOut = async () => {
    await authService.signOut();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-primary-text)' }}>
      {/* Navbar */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '16px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <BrandLogo variant="dark" size="sm" />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-blue-light)',
                color: 'var(--color-primary-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {effectiveRole === 'talent' ? 'Creator Studio' : 'Client Workspace'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                {user?.name || 'Authorized Member'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-secondary-text)' }}>
                {user?.email || 'authenticated@bridgeneeds.com'}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-error)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px 64px 24px' }}>
        {/* Welcome Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-navy)',
            borderRadius: 'var(--radius-card)',
            padding: '36px',
            color: 'var(--color-white)',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#80A7FF',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              <ShieldCheck size={16} />
              <span>Authenticated Session Active & Verified</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading, 'Manrope', sans-serif)",
                fontSize: '28px',
                fontWeight: 800,
                marginBottom: '8px',
              }}
            >
              Welcome to BRIDGENEEDS, {user?.name || 'Creator'}!
            </h1>
            <p style={{ color: '#B2C0D4', fontSize: '15px', maxWidth: '600px', lineHeight: 1.6 }}>
              {effectiveRole === 'talent'
                ? "Your creator workspace is ready. You can now manage briefs, showcase your audio tracks, and collaborate with hiring clients."
                : 'Your hiring portal is ready. Post project briefs, review curated audio portfolios, and commission talent with milestone protection.'}
            </p>
          </div>
        </div>

        {/* Account Details Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-primary-navy)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <User size={20} color="var(--color-primary-blue)" />
            <span>Account Security & Session Info</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'var(--color-background)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                Account Type
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                {user?.accountType === 'creative_professional' ? 'Creative Professional' : 'Hiring Client'}
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'var(--color-background)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                Email Address
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                {user?.email || 'N/A'}
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'var(--color-background)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                Authentication Provider
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary-blue)' }}>
                {authService.getActiveProviderName()}
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'var(--color-background)' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                Session Token Status
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)' }}>
                Active (Auto-expiring)
              </div>
            </div>
          </div>

          {/* Quick Flow Verification Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/onboarding')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-blue-light)',
                border: '1px solid #C4D9FF',
                color: 'var(--color-primary-blue)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={16} />
              <span>Re-run Onboarding Flow</span>
            </button>

            <button
              onClick={handleSignOut}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary-text)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <LogOut size={16} />
              <span>Test Sign Out & Return to Login</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPreviewPage;
