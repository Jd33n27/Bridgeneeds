interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressIndicator({ currentStep, totalSteps = 3 }: ProgressIndicatorProps) {
  const steps = [
    { label: 'Account', num: 1 },
    { label: 'Profile', num: 2 },
    { label: 'Finish', num: 3 }
  ];

  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.num} className="progress-step-wrapper">
            <div className={`progress-step ${currentStep >= step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > step.num ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${currentStep > step.num ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <style>{`
        .progress-container {
          width: 100%;
          margin-bottom: 32px;
        }
        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 320px;
          margin: 0 auto;
        }
        .progress-step-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .progress-step-wrapper:last-child {
          flex: 0;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .step-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          color: var(--color-text-muted);
          transition: all var(--transition-fast);
        }
        .step-number svg {
          width: 14px;
          height: 14px;
        }
        .step-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-text-muted);
          position: absolute;
          top: 36px;
          white-space: nowrap;
          transition: color var(--transition-fast);
        }
        .progress-step.active .step-number {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .progress-step.active .step-label {
          color: var(--color-text);
        }
        .progress-step.completed .step-number {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }
        .progress-line {
          flex: 1;
          height: 2px;
          background: var(--color-border);
          margin: 0 8px;
          margin-bottom: 16px; /* align with circles */
          transition: background var(--transition-normal);
        }
        .progress-line.active {
          background: var(--color-primary);
        }
      `}</style>
    </div>
  );
}
