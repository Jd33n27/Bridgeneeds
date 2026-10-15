export default function BrandPanel() {
  return (
    <div className="brand-panel">
      <div className="brand-panel-content">
        <div className="brand-logo">BRIDGENEEDS</div>
        <div className="brand-messaging">
          <h1>Find your people.<br />Make the sound.</h1>
          <p>Join a growing network of music professionals and people looking for the right talent for their next project.</p>
        </div>
      </div>
      
      <div className="brand-image-container">
        {/* Placeholder for real editorial image */}
        <div className="brand-image-placeholder">
          <div className="brand-image-overlay"></div>
        </div>
      </div>
      
      <div className="brand-footer">
        <p>Discover talent. Start projects. Make great work.</p>
      </div>

      <style>{`
        .brand-panel {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 48px;
          color: var(--color-white);
          justify-content: space-between;
        }
        .brand-logo {
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 1.125rem;
          margin-bottom: 64px;
        }
        .brand-messaging h1 {
          font-size: 3rem;
          line-height: 1.1;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .brand-messaging p {
          color: var(--color-neutral-200);
          font-size: 1.125rem;
          max-width: 400px;
          line-height: 1.6;
        }
        .brand-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 48px 0;
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background-color: var(--color-brand-evergreen-900);
        }
        .brand-image-placeholder {
          width: 100%;
          height: 100%;
          background-image: url('/hero.jpg');
          background-size: cover;
          background-position: center;
        }
        .brand-image-overlay {
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(16, 35, 26, 0.8), transparent 50%);
        }
        .brand-footer p {
          color: var(--color-neutral-200);
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
