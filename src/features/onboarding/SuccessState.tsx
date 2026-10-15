export default function SuccessState() {
  return (
    <div className="success-state">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2>Welcome to BRIDGENEEDS.</h2>
      <p>Your account is ready. Let's set up your profile.</p>

      <style>{`
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 400px;
          animation: slideUp var(--transition-normal);
        }
        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(40, 122, 75, 0.1);
          color: var(--color-success);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .success-icon svg {
          width: 32px;
          height: 32px;
        }
        .success-state h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .success-state p {
          color: var(--color-text-muted);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
