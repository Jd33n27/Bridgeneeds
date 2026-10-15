import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/auth/BrandLogo';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-primary-text)' }}>
      {/* Top Header */}
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

      {/* Main Legal Content */}
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
          <FileText size={16} />
          <span>Legal Documentation</span>
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
          Terms of Service
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
              1. Welcome to BRIDGENEEDS
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              BRIDGENEEDS is a professional creative services marketplace connecting music producers, recording artists, sound engineers, composers, session instrumentalists, and commercial clients. By creating an account or accessing our services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              2. User Accounts and Verification
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              To use BRIDGENEEDS, you must register an account as either a Creative Professional or a Hiring Client. You agree to provide accurate, truthful, and complete information during registration. You are responsible for safeguarding your password and notifying us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              3. Creative Engagements and Intellectual Property
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              All project briefs, master tracks, stems, sheet music, sound designs, and deliverables are subject to individual project agreements established between talent and clients. Creative professionals retain ownership of their uncommissioned portfolio materials, while commissioned works transfer rights according to the agreed milestone contract.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              4. Code of Conduct & Platform Integrity
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              We foster a community based on mutual respect, creative excellence, and professional communication. Spam, abusive conduct, fraudulent portfolios, intellectual property infringement, and attempts to circumvent platform escrow systems are grounds for immediate account suspension.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '12px' }}>
              5. Contact Us
            </h2>
            <p style={{ color: 'var(--color-secondary-text)' }}>
              If you have any questions regarding these Terms, please contact our legal and support team at{' '}
              <a href="mailto:support@bridgeneeds.com" style={{ color: 'var(--color-primary-blue)', fontWeight: 600 }}>
                support@bridgeneeds.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
