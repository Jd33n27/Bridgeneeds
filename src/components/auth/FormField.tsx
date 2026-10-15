import React from 'react';
import InlineError from './InlineError';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  rightLabelAction?: React.ReactNode;
  containerClassName?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      rightLabelAction,
      containerClassName = '',
      id,
      required,
      className = '',
      ...rest
    },
    ref
  ) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

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
            required={required}
            className={`form-input ${error ? 'has-error' : ''} ${className}`}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy || undefined}
            {...rest}
          />
        </div>

        {helperText && !error && (
          <div id={helperId} style={{ marginTop: '4px', fontSize: '12.5px', color: 'var(--color-secondary-text)' }}>
            {helperText}
          </div>
        )}

        <InlineError id={errorId} message={error} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
