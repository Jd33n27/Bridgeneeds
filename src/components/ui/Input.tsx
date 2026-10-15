import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, ...props }, ref) => {
    const generatedId = id || Math.random().toString(36).substr(2, 9);
    
    return (
      <div className={`input-wrapper ${error ? 'has-error' : ''} ${className}`}>
        <label htmlFor={generatedId} className="input-label">
          {label}
        </label>
        
        <div className="input-container">
          <input
            id={generatedId}
            ref={ref}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined}
            {...props}
          />
          {icon && <div className="input-icon">{icon}</div>}
        </div>

        {error ? (
          <span className="input-error" id={`${generatedId}-error`} role="alert">
            {error}
          </span>
        ) : hint ? (
          <span className="input-hint" id={`${generatedId}-hint`}>
            {hint}
          </span>
        ) : null}

        <style>{`
          .input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .input-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--color-text);
          }
          .input-container {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-field {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            background: var(--color-surface);
            color: var(--color-text);
            font-size: 1rem;
            transition: all var(--transition-fast);
          }
          .input-field:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(40, 122, 75, 0.1);
          }
          .has-error .input-field {
            border-color: var(--color-error);
          }
          .has-error .input-field:focus {
            box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
          }
          .input-icon {
            position: absolute;
            right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .input-field[type="password"],
          .input-container:has(.input-icon) .input-field {
            padding-right: 48px;
          }
          .input-error {
            font-size: 0.8125rem;
            color: var(--color-error);
            animation: fadeIn var(--transition-fast);
          }
          .input-hint {
            font-size: 0.8125rem;
            color: var(--color-text-muted);
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
