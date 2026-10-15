import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Toast.css';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" aria-live="polite">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success': return <CheckCircle2 size={18} className="toast-icon icon-success" />;
            case 'error': return <AlertCircle size={18} className="toast-icon icon-error" />;
            case 'warning': return <AlertTriangle size={18} className="toast-icon icon-warning" />;
            default: return <Info size={18} className="toast-icon icon-info" />;
          }
        };

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type} animate-fade-in`}>
            {getIcon()}
            <span className="toast-message">{toast.message}</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
