import React from 'react';
import { BriefForm } from '../components/ui/BriefForm';
import { Sparkles, ShieldCheck } from 'lucide-react';
import './CreateBriefPage.css';

export const CreateBriefPage: React.FC = () => {
  return (
    <div className="create-brief-page-root">
      <div className="container create-brief-container">
        
        <div className="brief-page-header">
          <div className="header-badge">
            <Sparkles size={14} />
            <span>Step-By-Step Brief Builder</span>
          </div>
          <h1 className="brief-page-title">Post a Project Brief</h1>
          <p className="brief-page-subtitle">
            Define your musical vision, deliverables, style references, and budget parameters to receive tailored proposals from pre-verified talent.
          </p>
        </div>

        <BriefForm />

      </div>
    </div>
  );
};
