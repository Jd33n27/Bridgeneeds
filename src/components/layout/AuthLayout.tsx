import React from 'react';
import BrandPanel from '../auth/BrandPanel';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout-left">
        <BrandPanel />
      </div>
      <div className="auth-layout-right">
        {children}
      </div>
      
      <style>{`
        .auth-layout {
          display: flex;
          min-height: 100vh;
        }
        .auth-layout-left {
          display: none;
        }
        .auth-layout-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px;
        }
        @media (min-width: 1024px) {
          .auth-layout-left {
            display: flex;
            width: 45%;
            position: relative;
            background-color: var(--color-brand-evergreen-950);
          }
          .auth-layout-right {
            width: 55%;
            padding: 48px;
          }
        }
      `}</style>
    </div>
  );
}
