import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { TextField } from './TextField';
import { Button } from './Button';
import { createBrief } from '../../lib/services';
import { useApp } from '../../context/AppContext';
import './BriefForm.css';

const PROJECT_TYPES = [
  'Single Track',
  'EP / Album',
  'Commercial Sync',
  'Film / Game Score',
  'Live Performance',
  'Custom Request'
] as const;

const SERVICES = [
  'Mixing & Mastering',
  'Film & Game Scoring',
  'Vocal Performance & Songwriting',
  'Music Producer & Beatmaking',
  'Session Musician (Guitars/Bass/Piano)',
  'Audio Post Production & Editing'
];

const COLLAB_FORMATS = ['Remote', 'In-Studio', 'Hybrid'] as const;

export const BriefForm: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, setUserRole } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    projectType: 'Single Track' as typeof PROJECT_TYPES[number],
    serviceNeeded: 'Mixing & Mastering',
    genres: 'Indie Pop, Synth Wave',
    styleReferences: 'Chvrches, Dua Lipa, The 1975',
    deliverables: '24-bit 96kHz Stem Mixes, Master WAV, Instrumental Pass',
    budgetMin: 500,
    budgetMax: 1500,
    deadline: '2026-11-01',
    collaborationFormat: 'Remote' as typeof COLLAB_FORMATS[number],
    locationRequirement: '',
    additionalNotes: 'Multitracks tracked in Logic Pro X. Looking for analog console warmth and polished vocal tuning.'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Project title is required';
      if (!formData.serviceNeeded) errs.serviceNeeded = 'Select a service type';
    } else if (step === 2) {
      if (!formData.styleReferences.trim()) errs.styleReferences = 'Please provide at least one style reference or artist';
    } else if (step === 3) {
      if (!formData.deliverables.trim()) errs.deliverables = 'Specify required deliverables';
    } else if (step === 4) {
      if (formData.budgetMax <= formData.budgetMin) errs.budgetMax = 'Max budget must be greater than min budget';
      if (!formData.deadline) errs.deadline = 'Select a target deadline';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const created = await createBrief({
        clientId: 'client-1',
        clientName: 'Alexander Vance',
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        clientCompany: 'Vance Audio Works',
        title: formData.title,
        projectType: formData.projectType,
        serviceNeeded: formData.serviceNeeded,
        genres: formData.genres.split(',').map((g) => g.trim()),
        styleReferences: formData.styleReferences,
        deliverables: formData.deliverables.split(',').map((d) => d.trim()),
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
        deadline: formData.deadline,
        collaborationFormat: formData.collaborationFormat,
        locationRequirement: formData.locationRequirement,
        additionalNotes: formData.additionalNotes,
      });

      showToast('Project brief published successfully!', 'success');
      setUserRole('client');
      navigate('/dashboard/client');
    } catch (err) {
      showToast('Failed to create brief. Please check your fields.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="brief-form-container">
      {/* Progress Steps Header */}
      <div className="brief-progress-bar">
        {[
          { step: 1, label: 'Project Info' },
          { step: 2, label: 'Creative Style' },
          { step: 3, label: 'Deliverables' },
          { step: 4, label: 'Budget & Dates' },
          { step: 5, label: 'Format' },
          { step: 6, label: 'Review & Post' }
        ].map((s) => (
          <div
            key={s.step}
            className={`progress-step-item ${currentStep === s.step ? 'active' : currentStep > s.step ? 'completed' : ''}`}
          >
            <div className="step-badge">
              {currentStep > s.step ? <CheckCircle2 size={16} /> : s.step}
            </div>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="brief-form-card">
        {/* STEP 1: Basic Info */}
        {currentStep === 1 && (
          <div className="brief-step-content animate-fade-in">
            <h3>Step 1: What project are you building?</h3>
            <p className="step-desc">Define the title and primary service category for your music project.</p>

            <TextField
              label="Project Title"
              placeholder="e.g. Mixing & Vocal Tuning for Synth Pop Single"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              required
            />

            <div className="form-group-custom">
              <label className="custom-label">Project Scope Type *</label>
              <div className="radio-cards-grid">
                {PROJECT_TYPES.map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    className={`radio-card ${formData.projectType === pt ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, projectType: pt })}
                  >
                    <span>{pt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group-custom">
              <label className="custom-label">Required Service *</label>
              <select
                className="form-select-lg"
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Creative & References */}
        {currentStep === 2 && (
          <div className="brief-step-content animate-fade-in">
            <h3>Step 2: Creative Direction & References</h3>
            <p className="step-desc">Help pros understand your vision by naming reference tracks or aesthetic goals.</p>

            <TextField
              label="Genres (comma separated)"
              placeholder="e.g. Indie Rock, Neo-Soul, Ambient Electronic"
              value={formData.genres}
              onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
            />

            <div className="form-group-custom">
              <label className="custom-label">Style References & Reference Artists *</label>
              <p className="field-help-text">List artists, albums, or Spotify/YouTube reference links that capture the sound you want.</p>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="e.g. Vocal clarity like Dua Lipa, bass weight like Mark Ronson's productions..."
                value={formData.styleReferences}
                onChange={(e) => setFormData({ ...formData, styleReferences: e.target.value })}
              />
              {errors.styleReferences && <span className="field-error-text">{errors.styleReferences}</span>}
            </div>
          </div>
        )}

        {/* STEP 3: Deliverables */}
        {currentStep === 3 && (
          <div className="brief-step-content animate-fade-in">
            <h3>Step 3: Expected Deliverables</h3>
            <p className="step-desc">Specify what files and audio formats you need delivered at project completion.</p>

            <div className="form-group-custom">
              <label className="custom-label">Deliverables Required *</label>
              <p className="field-help-text">Separate deliverables by commas (e.g. Master WAV 24-bit, Instrumental pass, Stems archive).</p>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              />
              {errors.deliverables && <span className="field-error-text">{errors.deliverables}</span>}
            </div>
          </div>
        )}

        {/* STEP 4: Budget & Timeline */}
        {currentStep === 4 && (
          <div className="brief-step-content animate-fade-in">
            <h3>Step 4: Budget & Target Timeline</h3>
            <p className="step-desc">Set a realistic budget range and completion deadline.</p>

            <div className="budget-inputs-grid">
              <TextField
                label="Minimum Budget ($ USD)"
                type="number"
                value={formData.budgetMin}
                onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
              />
              <TextField
                label="Maximum Budget ($ USD)"
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                error={errors.budgetMax}
              />
            </div>

            <TextField
              label="Target Completion Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              error={errors.deadline}
              required
            />
          </div>
        )}

        {/* STEP 5: Collaboration Format */}
        {currentStep === 5 && (
          <div className="brief-step-content animate-fade-in">
            <h3>Step 5: Collaboration Format & Extra Notes</h3>
            <p className="step-desc">Indicate how you prefer to work with your hired talent.</p>

            <div className="form-group-custom">
              <label className="custom-label">Format</label>
              <div className="radio-cards-grid">
                {COLLAB_FORMATS.map((cf) => (
                  <button
                    key={cf}
                    type="button"
                    className={`radio-card ${formData.collaborationFormat === cf ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, collaborationFormat: cf })}
                  >
                    <span>{cf}</span>
                  </button>
                ))}
              </div>
            </div>

            {formData.collaborationFormat !== 'Remote' && (
              <TextField
                label="Location Requirement / Studio City"
                placeholder="e.g. London UK or Greater Los Angeles Area"
                value={formData.locationRequirement}
                onChange={(e) => setFormData({ ...formData, locationRequirement: e.target.value })}
              />
            )}

            <div className="form-group-custom">
              <label className="custom-label">Additional Instructions & Technical Notes</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* STEP 6: Review & Submit */}
        {currentStep === 6 && (
          <div className="brief-step-content animate-fade-in">
            <div className="review-banner">
              <Sparkles size={20} />
              <div>
                <h4>Review Your Project Brief</h4>
                <p>Verify all details before publishing your brief to the Bridgeneeds talent community.</p>
              </div>
            </div>

            <div className="brief-summary-box">
              <div className="summary-row">
                <span className="summary-lbl">Project Title:</span>
                <span className="summary-val font-bold">{formData.title}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Category & Type:</span>
                <span className="summary-val">{formData.serviceNeeded} ({formData.projectType})</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Genres:</span>
                <span className="summary-val">{formData.genres}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Style References:</span>
                <span className="summary-val">{formData.styleReferences}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Budget Range:</span>
                <span className="summary-val text-brand">${formData.budgetMin} – ${formData.budgetMax} USD</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Deadline:</span>
                <span className="summary-val">{formData.deadline}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Collaboration:</span>
                <span className="summary-val">{formData.collaborationFormat}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">Deliverables:</span>
                <span className="summary-val">{formData.deliverables}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="brief-form-actions">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
          )}

          {currentStep < 6 ? (
            <Button
              type="button"
              variant="lime"
              onClick={handleNext}
              rightIcon={<ArrowRight size={16} />}
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="lime"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<Send size={18} />}
            >
              Publish Brief Now
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
