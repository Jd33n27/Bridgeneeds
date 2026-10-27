'use client';

import React, { useState } from 'react';
import { X, Check, Music, DollarSign, Calendar, Sparkles, Send, FileText } from 'lucide-react';
import { CategoryType } from '@/types';
import './CreateBriefModal.css';

interface CreateBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (briefData: any) => void;
}

export const CreateBriefModal: React.FC<CreateBriefModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Production' as CategoryType,
    serviceRequired: 'Music Production',
    budgetMin: '150000',
    budgetMax: '250000',
    deadline: '2026-10-24',
    location: 'Remote',
    requirements: '',
    referenceTrack: ''
  });

  if (!isOpen) return null;

  const categories: CategoryType[] = [
    'Production',
    'Songwriting',
    'Mixing',
    'Mastering',
    'Vocals',
    'Musicians',
    'Music Direction',
    'Sound Design'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess(formData);
    }, 1500);
  };

  return (
    <div className="brief-modal-backdrop" onClick={onClose}>
      <div className="brief-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="brief-modal-header">
          <div>
            <h3>
              <FileText size={18} color="#B7F34A" />
              <span>Create Project Brief</span>
            </h3>
            <p>Define your scope to receive verified proposals from talent</p>
          </div>
          <button
            onClick={onClose}
            className="brief-modal-close-btn"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="brief-modal-progress-track">
          <div
            className="brief-modal-progress-fill"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {submitted ? (
          <div className="brief-success-view">
            <div className="brief-success-icon">
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
              Brief Published to MAAS Network!
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#D4D4D8', maxWidth: '420px', lineHeight: 1.6 }}>
              Your brief for <strong style={{ color: '#B7F34A' }}>{formData.title || 'Afrobeats Single'}</strong> is now live. Top producers and engineers are being notified.
            </p>
            <div style={{ paddingTop: '16px' }}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onClose();
                }}
                className="brief-btn-next"
              >
                Go to Client Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="brief-modal-body">
            {step === 1 && (
              <div>
                <h4 className="brief-modal-step-title">Step 1: Category & Title</h4>
                
                <div className="brief-form-group">
                  <label className="brief-form-label">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afrobeats Lead Single Production & Vocal Mix"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="brief-form-input"
                  />
                </div>

                <div className="brief-form-group">
                  <label className="brief-form-label">Service Category</label>
                  <div className="brief-categories-grid">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`brief-category-chip ${formData.category === cat ? 'active' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 className="brief-modal-step-title">Step 2: Project Scope & References</h4>

                <div className="brief-form-group">
                  <label className="brief-form-label">Detailed Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you need: instrumentation, vibe, arrangement, vocal tuning, stems required..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="brief-form-textarea"
                  />
                </div>

                <div className="brief-form-group">
                  <label className="brief-form-label">Reference Songs (Spotify / YouTube Links)</label>
                  <input
                    type="url"
                    placeholder="https://spotify.com/track/..."
                    value={formData.referenceTrack}
                    onChange={(e) => setFormData({ ...formData, referenceTrack: e.target.value })}
                    className="brief-form-input"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 className="brief-modal-step-title">Step 3: Budget & Timeline</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="brief-form-group">
                    <label className="brief-form-label">Min Budget (₦)</label>
                    <input
                      type="number"
                      value={formData.budgetMin}
                      onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                      className="brief-form-input"
                    />
                  </div>

                  <div className="brief-form-group">
                    <label className="brief-form-label">Max Budget (₦)</label>
                    <input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                      className="brief-form-input"
                    />
                  </div>
                </div>

                <div className="brief-form-group">
                  <label className="brief-form-label">Target Completion Date</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="brief-form-input"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h4 className="brief-modal-step-title">Step 4: Review Brief Details</h4>

                <div style={{ backgroundColor: 'var(--color-evergreen-950, #0B0B0D)', borderRadius: '12px', padding: '16px', border: '1px solid var(--color-evergreen-800, #27272A)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA' }}>
                    <span>Title:</span>
                    <strong style={{ color: '#FFFFFF' }}>{formData.title || 'Afrobeats Single'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA' }}>
                    <span>Category:</span>
                    <strong style={{ color: '#B7F34A' }}>{formData.category}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA' }}>
                    <span>Budget Range:</span>
                    <strong style={{ color: '#FFFFFF' }}>₦{Number(formData.budgetMin).toLocaleString()} - ₦{Number(formData.budgetMax).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA' }}>
                    <span>Deadline:</span>
                    <strong style={{ color: '#FFFFFF' }}>{formData.deadline}</strong>
                  </div>
                  {formData.requirements && (
                    <div style={{ paddingTop: '8px', borderTop: '1px solid #27272A', color: '#A1A1AA' }}>
                      <span style={{ display: 'block', marginBottom: '4px' }}>Requirements:</span>
                      <p style={{ color: '#E4E4E7', fontStyle: 'italic' }}>{formData.requirements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="brief-modal-actions">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="brief-btn-back"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="brief-btn-next"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="brief-btn-next"
                >
                  <Send size={16} />
                  <span>Publish Brief</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
