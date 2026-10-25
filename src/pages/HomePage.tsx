import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Sliders, Zap, Disc, Headphones, Users } from 'lucide-react';
import { MOCK_TALENT, MOCK_SERVICES } from '../data/mockData';
import { TalentCard } from '../components/ui/TalentCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CategoryCard } from '../components/CategoryCard';
import { ProjectTimeline } from '../components/ui/ProjectTimeline';
import { CreateBriefModal } from '../components/CreateBriefModal';
import { useApp } from '../context/AppContext';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const navigate = useNavigate();
  const { playTrack } = useApp();

  const exampleSearches = [
    'Music Producer',
    'Mixing Engineer',
    'Vocalist',
    'Songwriter',
    'Session Guitarist'
  ];

  const categories = [
    { id: 'cat-1', title: 'Music Production', iconName: 'Sliders', count: 420, description: 'Beatmakers, executive producers & arrangers', categoryName: 'Production' },
    { id: 'cat-2', title: 'Mixing & Mastering', iconName: 'Headphones', count: 310, description: 'Analog & digital mixing engineers', categoryName: 'Mixing' },
    { id: 'cat-3', title: 'Vocalists & Choirs', iconName: 'Users', count: 280, description: 'Lead vocals, backing & vocal tuning', categoryName: 'Vocals' },
    { id: 'cat-4', title: 'Songwriting', iconName: 'Disc', count: 190, description: 'Topliners, lyricists & melody writers', categoryName: 'Songwriting' }
  ];

  const timelineStepsDemo = [
    { id: '1', title: 'Brief Submitted', description: 'Client outlines requirements, style references & budget', date: '01 Oct', status: 'completed' as const },
    { id: '2', title: 'Proposal Accepted', description: 'Scope agreed & funds locked in milestone escrow', date: '03 Oct', status: 'completed' as const },
    { id: '3', title: 'Tracking & Production', description: 'Talent records stems & uploads initial draft', date: '05 Oct', status: 'completed' as const },
    { id: '4', title: 'Client Revisions', description: 'Vocal tuning & mix balance tweaks applied', date: '07 Oct', status: 'completed' as const },
    { id: '5', title: 'Final Delivery', description: '24-bit WAV master & individual stems delivered', date: '09 Oct', status: 'completed' as const },
    { id: '6', title: 'Approval & Release', description: 'Client approves delivery to release escrow funds', date: 'Pending', status: 'current' as const }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/discover');
    }
  };

  return (
    <div className="home-page-root">
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>The Premium Music Talent Marketplace</span>
              </div>

              <h1 className="hero-title">
                Find the people behind the <span className="highlight">sound.</span>
              </h1>

              <p className="hero-[#FAF9F5] hero-subtitle">
                Discover producers, musicians, engineers, songwriters and other music professionals. Find the right fit for your next project.
              </p>

              {/* Search Widget */}
              <form onSubmit={handleSearchSubmit} className="hero-search-box">
                <div className="search-input-wrapper">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="What do you need for your project?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="hero-input"
                    aria-label="What do you need for your project?"
                  />
                  <button type="submit" className="hero-search-btn">
                    Find Talent
                  </button>
                </div>

                <div className="example-searches">
                  <span className="example-label">Examples:</span>
                  {exampleSearches.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => navigate(`/discover?q=${encodeURIComponent(tag)}`)}
                      className="example-chip"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* Action Buttons */}
              <div className="hero-actions">
                <button
                  type="button"
                  onClick={() => setIsBriefModalOpen(true)}
                  className="cta-primary-btn"
                >
                  <span>Post a Project Brief</span>
                  <ArrowRight size={16} />
                </button>

                <Link to="/signup?role=talent" className="cta-secondary-btn">
                  Offer Your Services
                </Link>
              </div>

              {/* Trust Metric Bar */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <div className="pulse-dot" />
                  <span><strong>1,240+</strong> Verified Music Professionals</span>
                </div>
                <div className="trust-item">
                  <ShieldCheck size={16} className="trust-icon" />
                  <span>100% Escrow Payment Protection</span>
                </div>
              </div>
            </div>

            {/* Right Card Previews */}
            <div className="hero-preview-col">
              <div className="preview-card-wrapper">
                <TalentCard talent={MOCK_TALENT[0]} />
                <div className="preview-subcard">
                  <div className="subcard-header">
                    <CheckCircle2 size={16} className="lime-check" />
                    <span className="subcard-title">Verified Studio Escrow</span>
                  </div>
                  <p className="subcard-text">
                    Funds are released only when you inspect and approve final 24-bit WAV masters & stems.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY DISCOVERY */}
      <section className="home-section category-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-kicker">Marketplace Categories</span>
              <h2 className="section-title">What are you making?</h2>
            </div>
            <Link to="/discover" className="section-link">
              <span>Explore All Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED TALENT */}
      <section className="home-section talent-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-kicker">Curated Roster</span>
              <h2 className="section-title">Meet the people behind the music</h2>
            </div>
            <Link to="/discover" className="section-link">
              <span>View All Talent</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="talent-grid">
            {MOCK_TALENT.slice(0, 3).map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="home-section services-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-kicker">Fixed-Price Packages</span>
              <h2 className="section-title">Featured Creative Services</h2>
            </div>
            <Link to="/services" className="section-link">
              <span>Explore All Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="services-grid">
            {MOCK_SERVICES.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section workflow-section">
        <div className="container">
          <div className="section-header text-center-header">
            <span className="section-kicker">Simple & Transparent</span>
            <h2 className="section-title">How Bridgeneeds Works</h2>
            <p className="section-subtitle">
              From brief to final master delivery, every step is protected by structured milestone escrow.
            </p>
          </div>

          <div className="workflow-steps-grid">
            <div className="workflow-card">
              <span className="step-num">01</span>
              <h3 className="step-title">Describe Your Need</h3>
              <p className="step-desc">
                Post a brief or choose a packaged service with your target genre, budget, and deadline.
              </p>
            </div>

            <div className="workflow-card">
              <span className="step-num">02</span>
              <h3 className="step-title">Discover & Agree</h3>
              <p className="step-desc">
                Review proposals from verified talent, listen to portfolio tracks, and agree on scope.
              </p>
            </div>

            <div className="workflow-card">
              <span className="step-num">03</span>
              <h3 className="step-title">Fund Escrow</h3>
              <p className="step-desc">
                Deposit project budget securely into Bridgeneeds Escrow. Talent works with peace of mind.
              </p>
            </div>

            <div className="workflow-card">
              <span className="step-num">04</span>
              <h3 className="step-title">Review & Approve</h3>
              <p className="step-desc">
                Collaborate in the workspace, request revisions, approve deliverables, and release payout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSPACE DEMO PREVIEW */}
      <section className="home-section workspace-demo-section">
        <div className="container">
          <div className="section-header text-center-header">
            <span className="section-kicker">Live Collaboration Workspace</span>
            <h2 className="section-title">Structured Milestone Progress</h2>
            <p className="section-subtitle">
              Keep every release on schedule with transparent stage updates and deliverable files.
            </p>
          </div>

          <ProjectTimeline steps={timelineStepsDemo} />
        </div>
      </section>

      {/* FOR TALENT & FOR BUSINESS DUAL SECTIONS */}
      <section className="home-section dual-audience-section">
        <div className="container">
          <div className="dual-grid">
            
            {/* For Talent */}
            <div className="audience-card talent-audience">
              <span className="audience-kicker">For Music Professionals</span>
              <h3 className="audience-title">Your talent is a business.</h3>
              <p className="audience-text">
                Create a professional storefront, set your prices, manage revisions, and receive guaranteed payouts for every project.
              </p>
              <ul className="audience-features">
                <li><CheckCircle2 size={16} /> 100% Guaranteed milestone payouts</li>
                <li><CheckCircle2 size={16} /> Verified credits & client reviews</li>
                <li><CheckCircle2 size={16} /> Transparent revision boundaries</li>
              </ul>
              <Link to="/for-talent" className="audience-btn primary-lime">
                <span>Join as Talent</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* For Business */}
            <div className="audience-card business-audience">
              <span className="audience-kicker">For Labels & Organisations</span>
              <h3 className="audience-title">One place to source music talent.</h3>
              <p className="audience-text">
                Streamline creative procurement for record labels, sync agencies, game studios, and commercial producers.
              </p>
              <ul className="audience-features">
                <li><CheckCircle2 size={16} /> Dedicated project managers & NDAs</li>
                <li><CheckCircle2 size={16} /> Consolidated invoicing & team seats</li>
                <li><CheckCircle2 size={16} /> Commercial rights & licensing terms</li>
              </ul>
              <Link to="/for-business" className="audience-btn outline-btn">
                <span>Explore for Business</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST INFORMATION */}
      <section className="home-section trust-section">
        <div className="container">
          <div className="section-header text-center-header">
            <span className="section-kicker">Trust & Quality</span>
            <h2 className="section-title">Built for serious music creators</h2>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <ShieldCheck size={32} className="trust-card-icon" />
              <h3>Verified Identity & Credits</h3>
              <p>
                Every verification label on Bridgeneeds represents verified government ID or verified discography releases with major distributors.
              </p>
            </div>

            <div className="trust-card">
              <Sliders size={32} className="trust-card-icon" />
              <h3>Clear Project Scopes</h3>
              <p>
                Explicit deliverable lists, revision limits, and turnaround estimates eliminate scope creep before work begins.
              </p>
            </div>

            <div className="trust-card">
              <Zap size={32} className="trust-card-icon" />
              <h3>Milestone Payment Protection</h3>
              <p>
                Client funds are held safely in escrow and released only when deliverables meet the agreed milestone specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="home-cta-section">
        <div className="container cta-container">
          <h2 className="cta-headline">
            Whatever you're making, find the people who can bring it to life.
          </h2>
          <p className="cta-subtext">Join Bridgeneeds — the trusted music talent marketplace.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-big-btn">
              Join Bridgeneeds
            </Link>
            <Link to="/discover" className="cta-big-outline-btn">
              Discover Talent
            </Link>
          </div>
        </div>
      </section>

      <CreateBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />

    </div>
  );
};

export default HomePage;
