import React, { useId } from 'react';
import './TextField.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id: customId,
  required,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`textfield-root ${fullWidth ? 'textfield-full' : ''} ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={inputId} className="textfield-label">
        {label}
        {required && <span className="textfield-required" aria-hidden="true"> *</span>}
      </label>

      <div className="textfield-input-wrapper">
        {leftIcon && <span className="textfield-icon left">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`textfield-input ${leftIcon ? 'has-left-icon' : ''} ${rightIcon ? 'has-right-icon' : ''}`}
          {...props}
        />
        {rightIcon && <span className="textfield-icon right">{rightIcon}</span>}
      </div>

      {error ? (
        <span id={errorId} className="textfield-error" role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} className="textfield-helper">
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

TextField.displayName = 'TextField';
