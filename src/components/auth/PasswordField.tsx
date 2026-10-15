import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import InlineError from './InlineError';
import { getPasswordStrength } from '../../lib/validation';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showStrengthMeter?: boolean;
  rightLabelAction?: React.ReactNode;
  containerClassName?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      error,
      showStrengthMeter = false,
      rightLabelAction,
      containerClassName = '',
      id,
      value,
      onChange,
      required,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const strengthId = `${inputId}-strength`;

    const stringValue = typeof value === 'string' ? value : '';
    const strength = showStrengthMeter ? getPasswordStrength(stringValue) : null;

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className={`form-group ${containerClassName}`}>
        <div className="form-label-row">
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span aria-hidden="true" style={{ color: 'var(--color-primary-blue)', marginLeft: '3px' }}>*</span>}
          </label>
          {rightLabelAction}
        </div>

        <div className="input-container">
          <input
            ref={ref}
            id={inputId}
            type={isVisible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            required={required}
            className={`form-input ${error ? 'has-error' : ''} ${className}`}
            style={{ paddingRight: '44px' }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : showStrengthMeter ? strengthId : undefined}
            {...rest}
          />

          <button
            type="button"
            className="password-toggle-btn"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            title={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>

        {/* Optional Password Strength Meter (Section 6) */}
        {showStrengthMeter && stringValue.length > 0 && strength && (
          <div id={strengthId} className="password-strength-container" aria-live="polite">
            <div className="password-strength-bars" aria-hidden="true">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="password-strength-bar"
                  style={{
                    backgroundColor: step <= strength.score ? strength.color : 'var(--color-border)',
                  }}
                />
              ))}
            </div>
            <div className="password-strength-meta">
              <span className="password-strength-label" style={{ color: strength.color }}>
                Strength: {strength.label}
              </span>
              <span className="password-strength-hint">{strength.hint}</span>
            </div>
          </div>
        )}

        <InlineError id={errorId} message={error} />
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
