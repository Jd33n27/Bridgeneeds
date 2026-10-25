import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TalentProfile } from '../types';
import { getTalentProfile } from '../lib/services';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { RatingSummary } from '../components/ui/RatingSummary';
import { ServiceCard } from '../components/ui/ServiceCard';
import { PortfolioPlayer } from '../components/ui/PortfolioPlayer';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { Modal } from '../components/ui/Modal';
import { BriefForm } from '../components/ui/BriefForm';
import { MapPin, Clock, ShieldCheck, Heart, Share2, PlusCircle, CheckCircle, Disc, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './TalentProfilePage.css';

export const TalentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, showToast } = useApp();

  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'portfolio' | 'reviews'>('overview');
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (id) {
      getTalentProfile(id).then((profile) => {
        if (isMounted) {
          setTalent(profile);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading talent profile & portfolio..." />;
  }

  if (!talent) {
    return (
      <div className="container py-12">
        <ErrorState
          title="Talent profile not found"
          message="The requested music professional profile could not be located."
          onRetry={() => navigate('/discover')}
          retryLabel="Return to Discover"
        />
      </div>
    );
  }

  const favorite = isFavorite(talent.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="talent-profile-page-root">
      
      {/* Banner & Header Header */}
      <section className="profile-hero-banner">
        <div className="banner-image-holder">
          <img src={talent.bannerUrl} alt={`${talent.name} studio banner`} className="banner-img" />
          <div className="banner-overlay" />
        </div>

        <div className="container banner-content-container">
          <div className="profile-header-main">
            
            <div className="profile-avatar-block">
              <img src={talent.avatarUrl} alt={talent.name} className="profile-avatar-img" />
            </div>

            <div className="profile-header-text">
              <div className="name-badge-row">
                <h1 className="talent-name">{talent.name}</h1>
                {talent.stageName && <span className="stage-alias">({talent.stageName})</span>}
              </div>

              <p className="talent-role-title">{talent.primaryRole}</p>

              <div className="meta-pills-row">
                <span className="meta-pill">
                  <MapPin size={14} />
                  <span>{talent.location}</span>
                </span>
                {talent.isRemoteAvailable && (
                  <span className="meta-pill highlight-pill">
                    <CheckCircle size={14} /> Remote Work Available
                  </span>
                )}
                <span className="meta-pill">
                  <Clock size={14} /> Availability: {talent.availability}
                </span>
              </div>

              {/* Verification Badges Explained */}
              <div className="verifications-row">
                <span className="verifications-label">Verified Standards:</span>
                {talent.verifications.map((v, idx) => (
                  <VerificationBadge key={idx} badge={v} />
                ))}
              </div>
            </div>

            <div className="profile-cta-col">
              <div className="starting-price-box">
                <span className="price-label">Starting Rate</span>
                <span className="price-amount">${talent.startingRate}</span>
                <span className="price-unit">/{talent.rateType}</span>
              </div>

              <div className="action-buttons-group">
                <Button
                  variant="lime"
                  size="md"
                  onClick={() => setIsBriefModalOpen(true)}
                  leftIcon={<PlusCircle size={18} />}
                >
                  Hire {talent.name.split(' ')[0]}
                </Button>

                <Button
                  variant={favorite ? 'secondary' : 'outline'}
                  size="md"
                  onClick={() => toggleFavorite(talent.id)}
                  leftIcon={<Heart size={18} fill={favorite ? 'currentColor' : 'none'} />}
                >
                  {favorite ? 'Saved' : 'Save'}
                </Button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="icon-share-btn"
                  title="Share profile link"
                  aria-label="Share profile link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Profile Section Navigation Tabs */}
          <nav className="profile-tabs-nav" aria-label="Profile Sections">
            <button
              type="button"
              className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview & Bio
            </button>
            <button
              type="button"
              className={`tab-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services ({talent.services.length})
            </button>
            <button
              type="button"
              className={`tab-link ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio ({talent.portfolio.length})
            </button>
            <button
              type="button"
              className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Client Reviews ({talent.reviews.length})
            </button>
          </nav>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="container profile-body-container">
        <div className="profile-main-grid">
          
          {/* Main Column */}
          <main className="profile-primary-column">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="tab-pane-content">
                
                {/* Biography */}
                <section className="profile-card-block">
                  <h2 className="card-block-heading">Professional Biography</h2>
                  <p className="biography-paragraph">{talent.biography}</p>
                </section>

                {/* Featured Track Player */}
                {talent.featuredTrack && (
                  <section className="profile-card-block">
                    <h2 className="card-block-heading flex-heading">
                      <Disc size={18} className="heading-icon" />
                      <span>Featured Audio Showcase</span>
                    </h2>
                    <PortfolioPlayer item={talent.featuredTrack} />
                  </section>
                )}

                {/* Skills & Genres */}
                <section className="profile-card-block">
                  <h2 className="card-block-heading">Genres & Expertise</h2>
                  <div className="tags-section">
                    <div className="tags-group">
                      <span className="tags-label">Primary Genres:</span>
                      <div className="pills-flex">
                        {talent.genres.map((g) => (
                          <span key={g} className="genre-pill">{g}</span>
                        ))}
                      </div>
                    </div>

                    <div className="tags-group">
                      <span className="tags-label">Instruments & Gear:</span>
                      <div className="pills-flex">
                        {talent.instruments.map((i) => (
                          <span key={i} className="instrument-pill">{i}</span>
                        ))}
                      </div>
                    </div>

                    <div className="tags-group">
                      <span className="tags-label">Technical Skills:</span>
                      <div className="pills-flex">
                        {talent.skills.map((s) => (
                          <span key={s} className="skill-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services Preview */}
                <section className="profile-card-block">
                  <h2 className="card-block-heading">Available Services</h2>
                  <div className="services-grid-block">
                    {talent.services.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="tab-pane-content">
                <h2 className="section-title">Published Services</h2>
                <div className="services-grid-block">
                  {talent.services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="tab-pane-content">
                <h2 className="section-title">Verified Portfolio Tracks</h2>
                <div className="portfolio-list">
                  {talent.portfolio.map((item) => (
                    <PortfolioPlayer key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="tab-pane-content">
                <RatingSummary
                  rating={talent.rating}
                  reviewCount={talent.reviewCount}
                />

                <div className="reviews-list">
                  {talent.reviews.map((review) => (
                    <div key={review.id} className="review-item-card">
                      <div className="review-header">
                        <img src={review.authorAvatar} alt={review.authorName} className="review-author-img" />
                        <div>
                          <h4 className="review-author-name">{review.authorName}</h4>
                          {review.authorCompany && (
                            <span className="review-author-company">{review.authorCompany}</span>
                          )}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>

                      <p className="review-comment">"{review.comment}"</p>
                      
                      <div className="review-project-meta">
                        <span>Project: <strong>{review.projectTitle}</strong></span>
                        {review.verifiedPurchase && (
                          <span className="verified-badge-pill">
                            <ShieldCheck size={12} /> Verified Hire
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* Right Sidebar Info */}
          <aside className="profile-secondary-sidebar">
            
            {/* Quick Hire Summary Card */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Hire {talent.name}</h3>
              <div className="sidebar-stat-row">
                <span className="stat-name">Years Experience:</span>
                <span className="stat-val">{talent.yearsExperience} Years</span>
              </div>
              <div className="sidebar-stat-row">
                <span className="stat-name">Rating:</span>
                <span className="stat-val">★ {talent.rating} ({talent.reviewCount} reviews)</span>
              </div>
              <div className="sidebar-stat-row">
                <span className="stat-name">Location:</span>
                <span className="stat-val">{talent.location}</span>
              </div>

              <div className="sidebar-cta-box">
                <Button
                  variant="lime"
                  size="md"
                  fullWidth
                  onClick={() => setIsBriefModalOpen(true)}
                >
                  Create Brief for {talent.name.split(' ')[0]}
                </Button>
              </div>
            </div>

            {/* Verification Guarantee Card */}
            <div className="sidebar-card guarantee-card">
              <ShieldCheck size={24} className="guarantee-icon" />
              <h4 className="guarantee-title">Escrow Protection</h4>
              <p className="guarantee-text">
                Your payment is held safely in Bridgeneeds Milestone Escrow and released only when you inspect and approve final audio stems & masters.
              </p>
            </div>

          </aside>

        </div>
      </div>

      {/* Brief Creation Modal Pre-filled for this talent */}
      <Modal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        title={`Create Project Brief for ${talent.name}`}
      >
        <BriefForm
          targetTalentId={talent.id}
          targetTalentName={talent.name}
          onSuccess={() => {
            setIsBriefModalOpen(false);
            navigate('/dashboard/client');
          }}
        />
      </Modal>

    </div>
  );
};

export default TalentProfilePage;
