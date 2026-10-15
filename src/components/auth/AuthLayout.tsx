import React from 'react';
import LeftBrandPanel from './LeftBrandPanel';
import BrandLogo from './BrandLogo';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-page">
      {/* Left Promotional / Brand Panel (Desktop) */}
      <LeftBrandPanel />

      {/* Right Form Main Panel */}
      <main className="auth-main-panel" id="main-content">
        {/* Mobile Header (rendered when left panel collapses on mobile <= 820px) */}
        <div className="auth-mobile-header">
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <BrandLogo variant="dark" size="md" />
          </Link>
        </div>

        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
