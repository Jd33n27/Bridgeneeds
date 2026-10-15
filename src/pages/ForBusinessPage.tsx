import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Building2, ShieldCheck, FileCheck, Users, Layers, ArrowRight, Sparkles } from 'lucide-react';
import './ForBusinessPage.css';

export const ForBusinessPage: React.FC = () => {
  return (
    <div className="for-business-page-root">
      
      {/* Hero */}
      <section className="biz-hero-section">
        <div className="container">
          <div className="biz-hero-content">
            <span className="biz-badge">
              <Sparkles size={14} /> For Record Labels & Commercial Agencies
            </span>
            <h1 className="biz-hero-title">One place to source music talent.</h1>
            <p className="biz-hero-subtitle">
              Source producers, composers, sound designers, and mixing engineers with enterprise NDAs, team seats, and streamlined invoicing.
            </p>
            <div className="biz-hero-actions">
              <Link to="/signup?role=client">
                <Button variant="lime" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Explore Bridgeneeds for Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="biz-solutions-section">
        <div className="container">
          <div className="section-title-box">
            <span className="section-kicker">Enterprise Features</span>
            <h2 className="section-title">Built For Commercial & Sync Workflows</h2>
          </div>

          <div className="biz-grid">
            
            <div className="biz-card">
              <div className="biz-icon">
                <Building2 size={24} />
              </div>
              <h3>Consolidated Invoicing & Procurement</h3>
              <p>
                Eliminate administrative burden. Consolidate dozens of independent session musician payouts into transparent corporate invoices.
              </p>
            </div>

            <div className="biz-card">
              <div className="biz-icon">
                <FileCheck size={24} />
              </div>
              <h3>Clear Commercial Rights & NDAs</h3>
              <p>
                Standardized master sync licensing and work-for-hire contracts tailored for TV advertising, video games, podcasts, and major film releases.
              </p>
            </div>

            <div className="biz-card">
              <div className="biz-icon">
                <Users size={24} />
              </div>
              <h3>Dedicated Talent Managers</h3>
              <p>
                Get personal assistance finding specialized talent for tight deadlines, custom scores, or multi-track album projects.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="biz-cta-section">
        <div className="container cta-box">
          <h2>Streamline your organization's music sourcing today.</h2>
          <Link to="/signup?role=client">
            <Button variant="lime" size="lg">Create Business Client Account</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
