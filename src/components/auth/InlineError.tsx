import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InlineErrorProps {
  id?: string;
  message?: string;
  className?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({ id, message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      id={id}
      className={`inline-error ${className}`}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="inline-error-icon" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default InlineError;
