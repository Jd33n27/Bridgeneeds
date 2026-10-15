import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/auth/BrandLogo';
import { ArrowLeft, Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-primary-text)' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <BrandLogo variant="dark" size="sm" />
          </Link>
          <Link
            to="/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-primary-blue)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to sign up</span>
          </Link>
        </div>
      </header>

      {/* Main Privacy Content */}
      <main style={{ maxWidth: '820px', margin: '40px auto', padding: '0 24px 64px 24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: 'var(--color-blue-light)',
            color: 'var(--color-primary-blue)',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <Lock size={16} />
          <span>Data Protection & Privacy</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading, 'Manrope', sans-serif)",
            fontSize: '32px',
            fontWeight: 800,
            color: 'var(--color-primary-navy)',
            marginBottom: '12px',
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-secondary-text)', fontSize: '14px', marginBottom: '32px' }}>
          Effective Date: January 1, 2026 • Last updated: October 2026
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            lineHeight: 1.7,
            fontSize: '15px',
          }}
        >
          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              1. Information We Collect
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              We collect information you provide directly during account registration, including your full name, email address, password hash, account role, professional disciplines, sample portfolio links, and communication preferences. We do not store plaintext passwords.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              2. How We Use Your Information
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              Your information is used strictly to facilitate authentication, protect against unauthorized access, connect creative talent with suitable briefs, process project engagements, and provide notifications regarding your collaboration milestones.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              3. Data Security and Passwords
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              All authentication sessions utilize modern encryption, expiring access tokens, rate limiting against brute-force attacks, and HTTPS transmission. We will never sell your personal information or distribute it to third-party advertising brokers.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              4. Your Rights and Account Deletion
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              You may request an export of your account data or request permanent deletion of your profile and personal data at any time through your workspace account settings or by emailing privacy@bridgeneeds.com.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              5. Privacy Questions
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              Contact our privacy officer at{' '}
              <a href="mailto:privacy@bridgeneeds.com" style={{ color: 'var(--color-primary-blue)', fontWeight: 600 }}>
                privacy@bridgeneeds.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
