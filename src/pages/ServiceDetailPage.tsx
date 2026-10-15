import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Service, ServicePackage } from '../types';
import { getServiceDetail } from '../lib/services';
import { Button } from '../components/ui/Button';
import { PortfolioPlayer } from '../components/ui/PortfolioPlayer';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { Modal } from '../components/ui/Modal';
import { BriefForm } from '../components/ui/BriefForm';
import { Clock, RefreshCw, Check, ArrowRight, ShieldCheck, MapPin, Star, PackageCheck, AlertCircle } from 'lucide-react';
import './ServiceDetailPage.css';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPackage, setSelectedPackage] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (id) {
      getServiceDetail(id).then((res) => {
        if (isMounted) {
          setService(res);
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
    return <LoadingState message="Loading service package details..." />;
  }

  if (!service) {
    return (
      <div className="container py-12">
        <ErrorState
          title="Service package not found"
          message="The requested music service could not be located in our catalog."
          onRetry={() => navigate('/services')}
          retryLabel="Return to Services Catalog"
        />
      </div>
    );
  }

  const currentPackage = service.packages.find((p) => p.name === selectedPackage) || service.packages[0] || {
    id: 'pkg-default',
    name: 'Standard',
    price: service.startingPrice,
    deliveryDays: service.deliveryDays,
    revisions: 2,
    deliverables: ['24-bit WAV Master', 'Full Instrumental Stems'],
    description: service.shortDescription,
  };

  return (
    <div className="service-detail-page-root">
      <div className="container service-detail-container">
        
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/services">Services</Link>
          <span className="sep">/</span>
          <span>{service.category}</span>
          <span className="sep">/</span>
          <span className="active-crumb">{service.title}</span>
        </nav>

        {/* Main Header */}
        <div className="service-header-card">
          <div className="service-header-meta">
            <span className="category-badge">{service.category}</span>
            <h1 className="service-title">{service.title}</h1>
            <p className="service-outcome">
              <strong>Expected Outcome:</strong> {service.outcome}
            </p>

            {/* Provider Row */}
            <div className="provider-header-row">
              <Link to={`/talent/${service.talentId}`} className="provider-link">
                <img src={service.talentAvatar} alt={service.talentName} className="provider-avatar-img" />
                <div className="provider-info">
                  <h3 className="provider-name">{service.talentName}</h3>
                  <span className="provider-role">{service.talentRole} • {service.talentLocation}</span>
                </div>
              </Link>

              <div className="rating-pill">
                <Star size={16} className="star-icon" />
                <span><strong>{service.rating}</strong> ({service.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="service-main-grid">
          
          {/* Left Column: Description, Deliverables, Requirements */}
          <main className="service-left-col">
            
            {/* Service Cover & Description */}
            <section className="detail-card-block">
              <div className="cover-img-wrapper">
                <img src={service.coverImage} alt={service.title} className="cover-img" />
              </div>

              <h2 className="detail-heading">Service Description</h2>
              <p className="full-desc">{service.fullDescription}</p>
            </section>

            {/* Featured Work Samples */}
            {service.featuredWork && service.featuredWork.length > 0 && (
              <section className="detail-card-block">
                <h2 className="detail-heading">Relevant Audio Samples</h2>
                <div className="work-samples-list">
                  {service.featuredWork.map((track) => (
                    <PortfolioPlayer key={track.id} item={track} />
                  ))}
                </div>
              </section>
            )}

            {/* Client Requirements */}
            <section className="detail-card-block">
              <h2 className="detail-heading">Client Requirements to Start Work</h2>
              <p className="section-helper-text">
                To ensure a smooth workflow and avoid delays, please have the following items ready upon ordering:
              </p>
              <ul className="requirements-list">
                {service.clientRequirements.map((req, idx) => (
                  <li key={idx}>
                    <Check size={16} className="lime-check" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Revision & Refund Policy */}
            <section className="detail-card-block policy-card">
              <h2 className="detail-heading flex-heading">
                <AlertCircle size={20} className="info-icon" />
                <span>Revision & Guarantee Policy</span>
              </h2>
              <p className="policy-text">{service.revisionsPolicy}</p>
            </section>

          </main>

          {/* Right Column: Tier Selector & Checkout Box */}
          <aside className="service-right-sidebar">
            <div className="package-tier-card">
              
              {/* Package Tier Tabs */}
              <div className="tier-tabs-header">
                {service.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    className={`tier-tab-btn ${selectedPackage === pkg.name ? 'active' : ''}`}
                    onClick={() => setSelectedPackage(pkg.name)}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>

              {/* Selected Tier Price & Info */}
              <div className="tier-card-body">
                <div className="tier-price-row">
                  <span className="tier-price-amount">${currentPackage.price}</span>
                  <span className="tier-price-label">USD</span>
                </div>

                <p className="tier-desc">{currentPackage.description}</p>

                <div className="tier-specs-row">
                  <div className="spec-item">
                    <Clock size={16} />
                    <span>{currentPackage.deliveryDays} Days Delivery</span>
                  </div>
                  <div className="spec-item">
                    <RefreshCw size={16} />
                    <span>{currentPackage.revisions} Revisions</span>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="deliverables-box">
                  <h4 className="deliverables-heading">Deliverables Included:</h4>
                  <ul className="deliverables-checklist">
                    {currentPackage.deliverables.map((del, idx) => (
                      <li key={idx}>
                        <PackageCheck size={14} className="check-icon" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="tier-cta-box">
                  <Button
                    variant="lime"
                    size="lg"
                    fullWidth
                    onClick={() => setIsModalOpen(true)}
                  >
                    Order {currentPackage.name} Package (${currentPackage.price})
                  </Button>
                </div>

                <div className="escrow-guarantee-note">
                  <ShieldCheck size={16} />
                  <span>Protected by Milestone Escrow</span>
                </div>

              </div>

            </div>
          </aside>

        </div>

      </div>

      {/* Brief / Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Order Service: ${service.title}`}
      >
        <BriefForm
          targetTalentId={service.talentId}
          targetTalentName={service.talentName}
          initialService={service.title}
          initialBudget={currentPackage.price}
          onSuccess={() => {
            setIsModalOpen(false);
            navigate('/dashboard/client');
          }}
        />
      </Modal>

    </div>
  );
};
