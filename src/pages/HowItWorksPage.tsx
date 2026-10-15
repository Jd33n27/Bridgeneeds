import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProjectTimeline } from '../components/ui/ProjectTimeline';
import { ShieldCheck, FileText, CheckCircle, Lock, Headphones, CreditCard, Sparkles } from 'lucide-react';
import './HowItWorksPage.css';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    { id: '1', title: 'Post Brief or Choose Service', description: 'Clients define project type, style references, stem deliverables, budget, and deadline.', status: 'completed' as const },
    { id: '2', title: 'Match & Review Proposals', description: 'Talent submit tailored bids with proposed milestones, cover note, and delivery estimate.', status: 'completed' as const },
    { id: '3', title: 'Fund Milestone Escrow', description: 'Agreed project funds are locked safely in Bridgeneeds Escrow before work begins.', status: 'completed' as const },
    { id: '4', title: 'Track Work in Workspace', description: 'Collaborate with live messaging, file uploads, and audio player previews.', status: 'completed' as const },
    { id: '5', title: 'Inspect Deliverables', description: 'Review 24-bit WAV masters, stems, and request revisions if needed.', status: 'completed' as const },
    { id: '6', title: 'Approve & Release Payment', description: 'Client signs off on completed deliverables to release funds directly to talent.', status: 'current' as const }
  ];

  return (
    <div className="how-it-works-page-root">
      
      {/* Hero */}
      <section className="how-hero-section">
        <div className="container">
          <div className="how-hero-content">
            <span className="how-badge">
              <Sparkles size={14} /> Clear Marketplace Protocol
            </span>
            <h1 className="how-title">How Bridgeneeds Works</h1>
            <p className="how-subtitle">
              A transparent, escrow-protected transaction framework connecting music talent with creators and organizations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Step Visualizer */}
      <section className="how-section">
        <div className="container">
          <div className="section-title-box">
            <span className="section-kicker">End-To-End Lifecycle</span>
            <h2 className="section-title">6-Stage Project Timeline</h2>
          </div>
          <ProjectTimeline steps={steps} />
        </div>
      </section>

      {/* Detailed Pillars */}
      <section className="how-section alt-bg-section">
        <div className="container">
          <div className="section-title-box">
            <span className="section-kicker">Core Protections</span>
            <h2 className="section-title">Why Creators & Talent Trust Bridgeneeds</h2>
          </div>

          <div className="pillars-grid">
            
            <div className="pillar-card">
              <div className="pillar-icon">
                <Lock size={24} />
              </div>
              <h3>100% Escrow Protection</h3>
              <p>
                Funds are deposited upfront into escrow and locked safely. Talent works knowing money is committed, and clients approve work before money is released.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <FileText size={24} />
              </div>
              <h3>Explicit Deliverable Scopes</h3>
              <p>
                Every project specifies exact WAV sample rate, bit depth, number of included revisions, and stem breakdown before work commences.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Verified Credentials</h3>
              <p>
                Talent profiles display verified discography releases, identity verification badges, and client transaction reviews.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="how-cta-section">
        <div className="container cta-box">
          <h2>Ready to produce your next track?</h2>
          <div className="cta-actions">
            <Link to="/create-brief">
              <Button variant="lime" size="lg">Create Project Brief</Button>
            </Link>
            <Link to="/discover">
              <Button variant="outline" size="lg">Explore Roster</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
