import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, Clock, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { MOCK_BRIEFS, MOCK_PROPOSALS } from '../data/mockData';
import { getStoredProjects, saveStoredProjects, getStoredBriefs } from '../lib/storage';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProposalSummary } from '../components/ui/ProposalSummary';
import { Modal } from '../components/ui/Modal';
import { BriefForm } from '../components/ui/BriefForm';
import { useApp } from '../context/AppContext';
import './DashboardPages.css';

export const ClientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [projects, setProjects] = useState(() => getStoredProjects());
  const [briefs, setBriefs] = useState(() => getStoredBriefs());
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const handleAcceptProposal = (propId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === propId ? { ...p, status: 'accepted' as const } : p))
    );
    showToast('Proposal accepted! Funds locked in Milestone Escrow.', 'success');
  };

  return (
    <div className="dashboard-page-root">
      <div className="container dashboard-container">
        
        {/* Header Bar */}
        <div className="dashboard-header-bar">
          <div>
            <span className="dashboard-kicker">Client Workspace</span>
            <h1 className="dashboard-title">Nesta Creative Agency</h1>
          </div>

          <div className="dashboard-header-actions">
            <Button
              variant="lime"
              size="md"
              onClick={() => setIsBriefModalOpen(true)}
              leftIcon={<PlusCircle size={18} />}
            >
              Create New Brief
            </Button>
          </div>
        </div>

        {/* Actionable Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Active Projects</span>
            <span className="metric-val">{projects.filter((p) => p.status !== 'completed').length}</span>
            <span className="metric-sub text-brand">Held in Escrow: $1,250 USD</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Published Briefs</span>
            <span className="metric-val">{briefs.length}</span>
            <span className="metric-sub">{proposals.length} Proposals Received</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">Completed Deliveries</span>
            <span className="metric-val">4</span>
            <span className="metric-sub">100% On-Time Sign-offs</span>
          </div>
        </div>

        {/* Active Projects List */}
        <section className="dashboard-section">
          <h2 className="section-title">Active Projects & Workspaces</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} userRole="client" />
            ))}
          </div>
        </section>

        {/* Incoming Proposals for Published Briefs */}
        <section className="dashboard-section">
          <h2 className="section-title">Incoming Proposals for Your Briefs</h2>
          <div className="proposals-list">
            {proposals.map((proposal) => (
              <ProposalSummary
                key={proposal.id}
                proposal={proposal}
                onAccept={() => handleAcceptProposal(proposal.id)}
              />
            ))}
          </div>
        </section>

        {/* Published Briefs Table */}
        <section className="dashboard-section">
          <h2 className="section-title">Your Published Project Briefs</h2>
          <div className="briefs-table-wrapper">
            <table className="briefs-table">
              <thead>
                <tr>
                  <th>Brief Title</th>
                  <th>Category</th>
                  <th>Budget Range</th>
                  <th>Deadline</th>
                  <th>Proposals</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {briefs.map((brief) => (
                  <tr key={brief.id}>
                    <td className="font-bold">{brief.title}</td>
                    <td>{brief.serviceNeeded}</td>
                    <td>${brief.budgetMin} - ${brief.budgetMax}</td>
                    <td>{brief.deadline}</td>
                    <td><span className="proposals-count-badge">{brief.proposalsCount} Bids</span></td>
                    <td>
                      <span className={`status-pill ${brief.status}`}>{brief.status.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <Modal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        title="Create New Project Brief"
      >
        <BriefForm
          onSuccess={() => {
            setIsBriefModalOpen(false);
            setBriefs(getStoredBriefs());
          }}
        />
      </Modal>
    </div>
  );
};

export default ClientDashboardPage;
