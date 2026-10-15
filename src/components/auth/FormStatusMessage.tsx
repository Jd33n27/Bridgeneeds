import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface FormStatusMessageProps {
  type: 'error' | 'success' | 'info';
  message?: string | null;
  className?: string;
}

export const FormStatusMessage: React.FC<FormStatusMessageProps> = ({
  type,
  message,
  className = '',
}) => {
  if (!message) return null;

  const role = type === 'error' ? 'alert' : 'status';

  return (
    <div className={`form-status-alert ${type} ${className}`} role={role} aria-live="polite">
      {type === 'error' && <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />}
      {type === 'success' && <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />}
      {type === 'info' && <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />}
      <div>{message}</div>
    </div>
  );
};

export default FormStatusMessage;
