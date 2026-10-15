import { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({ 
  children, 
  loading, 
  fullWidth, 
  className = '', 
  disabled,
  ...props 
}: PrimaryButtonProps) {
  return (
    <button 
      className={`primary-button ${fullWidth ? 'full-width' : ''} ${loading ? 'loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      <span className="button-content">{children}</span>
      {loading && (
        <span className="spinner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </span>
      )}

      <style>{`
        .primary-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary);
          color: var(--color-white);
          font-weight: 500;
          font-size: 1rem;
          transition: all var(--transition-fast);
          overflow: hidden;
        }
        .primary-button:not(:disabled):hover {
          background-color: var(--color-primary-hover);
        }
        .primary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .primary-button.full-width {
          width: 100%;
        }
        .primary-button .button-content {
          transition: opacity var(--transition-fast);
        }
        .primary-button.loading .button-content {
          opacity: 0;
        }
        .spinner {
          position: absolute;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
