import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ShieldCheck, DollarSign, Award, Sliders, ArrowRight, Sparkles } from 'lucide-react';
import './ForTalentPage.css';

export const ForTalentPage: React.FC = () => {
  return (
    <div className="for-talent-page-root">
      
      {/* Hero */}
      <section className="talent-hero-section">
        <div className="container">
          <div className="talent-hero-content">
            <span className="talent-badge">
              <Sparkles size={14} /> Built For Music Creators
            </span>
            <h1 className="talent-hero-title">Your skills are a professional business.</h1>
            <p className="talent-hero-subtitle">
              Create your storefront, set your prices, publish stem packages, and receive guaranteed payouts from verified clients worldwide.
            </p>
            <div className="talent-hero-actions">
              <Link to="/signup?role=talent">
                <Button variant="lime" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Join Bridgeneeds as Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="talent-benefits-section">
        <div className="container">
          <div className="section-title-box">
            <span className="section-kicker">Talent Infrastructure</span>
            <h2 className="section-title">Everything You Need To Sell Music Services</h2>
          </div>

          <div className="benefits-grid">
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <DollarSign size={24} />
              </div>
              <h3>Guaranteed Milestone Escrow</h3>
              <p>
                Never chase invoices or negotiate via unverified DMs. Clients fund escrow before you start tracking or mixing.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Award size={24} />
              </div>
              <h3>Verified Discography & Reputation</h3>
              <p>
                Build a portable professional profile backed by verified release credits, audio sample playback, and real client reviews.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Sliders size={24} />
              </div>
              <h3>Clear Revision Boundaries</h3>
              <p>
                Define your delivery timeframe, exact stem formats, and maximum revision counts per package so you stay in control of your time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="talent-cta-section">
        <div className="container cta-box">
          <h2>Offer your production, mixing, or recording services today.</h2>
          <Link to="/signup?role=talent">
            <Button variant="lime" size="lg">Apply for Talent Account</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
