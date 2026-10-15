import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Clock, CheckCircle2, DollarSign, Disc, FileText, ArrowRight } from 'lucide-react';
import { MOCK_TALENT, MOCK_SERVICES, MOCK_BRIEFS } from '../data/mockData';
import { getStoredProjects } from '../lib/storage';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { useApp } from '../context/AppContext';
import './DashboardPages.css';

export const TalentDashboardPage: React.FC = () => {
  const { showToast } = useApp();
  const talent = MOCK_TALENT[0]; // Active Talent Demo User
  const [projects] = useState(() => getStoredProjects());

  return (
    <div className="dashboard-page-root">
      <div className="container dashboard-container">
        
        {/* Header Bar */}
        <div className="dashboard-header-bar">
          <div className="talent-profile-head">
            <img src={talent.avatarUrl} alt={talent.name} className="talent-avatar-sm" />
            <div>
              <span className="dashboard-kicker">Talent Studio Workspace</span>
              <h1 className="dashboard-title">{talent.name} Studio</h1>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <Link to={`/talent/${talent.id}`}>
              <Button variant="outline" size="md">View Public Profile</Button>
            </Link>
          </div>
        </div>

        {/* Talent Decision Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Active Orders</span>
            <span className="metric-val">{projects.length}</span>
            <span className="metric-sub text-brand">In Escrow: $1,250 USD</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Published Services</span>
            <span className="metric-val">{talent.services.length}</span>
            <span className="metric-sub">Packaged Products Live</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Rating & Reviews</span>
            <span className="metric-val">★ {talent.rating}</span>
            <span className="metric-sub">{talent.reviewCount} Verified Client Reviews</span>
          </div>
        </div>

        {/* Active Client Orders */}
        <section className="dashboard-section">
          <h2 className="section-title">Active Client Orders</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} userRole="talent" />
            ))}
          </div>
        </section>

        {/* Relevant Open Client Briefs */}
        <section className="dashboard-section">
          <div className="section-header-flex">
            <h2 className="section-title">Open Client Briefs Matching Your Skills</h2>
            <Link to="/discover" className="section-link">Browse All Briefs</Link>
          </div>

          <div className="open-briefs-list">
            {MOCK_BRIEFS.map((brief) => (
              <div key={brief.id} className="open-brief-card">
                <div className="brief-card-meta">
                  <span className="brief-category-tag">{brief.serviceNeeded}</span>
                  <h3 className="brief-title">{brief.title}</h3>
                  <p className="brief-client-info">
                    Posted by <strong>{brief.clientName}</strong> ({brief.clientCompany})
                  </p>
                </div>

                <div className="brief-card-budget">
                  <span className="budget-range">${brief.budgetMin} – ${brief.budgetMax}</span>
                  <span className="deadline-tag">Due: {brief.deadline}</span>
                  <Button
                    variant="lime"
                    size="sm"
                    onClick={() => showToast(`Proposal draft opened for "${brief.title}"`, 'info')}
                  >
                    Submit Proposal
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Published Services Storefront */}
        <section className="dashboard-section">
          <h2 className="section-title">Your Published Service Storefront</h2>
          <div className="services-grid">
            {talent.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
