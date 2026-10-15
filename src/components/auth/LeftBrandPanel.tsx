import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { Sparkles, Users, Music2, ShieldCheck } from 'lucide-react';

export const LeftBrandPanel: React.FC = () => {
  return (
    <aside className="auth-brand-panel" aria-label="Brand Overview">
      {/* Brand Top Header */}
      <div className="auth-brand-top">
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <BrandLogo variant="light" size="md" />
        </Link>
      </div>

      {/* Abstract Connected Geometric Paths Artwork */}
      <div className="auth-brand-visual" aria-hidden="true">
        <svg
          className="brand-svg-canvas"
          viewBox="0 0 460 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3978F6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#3978F6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#80A7FF" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="waveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3978F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2864E8" stopOpacity="0.05" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Harmonic Grid Guidelines */}
          <line x1="30" y1="130" x2="430" y2="130" stroke="#1A3358" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
          <line x1="120" y1="40" x2="120" y2="220" stroke="#1A3358" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <line x1="340" y1="40" x2="340" y2="220" stroke="#1A3358" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />

          {/* Fluid Flowing Paths (Creative Collaborations) */}
          <path
            d="M 40 180 C 120 180, 160 80, 230 130 C 300 180, 340 90, 420 100"
            stroke="url(#bridgeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M 40 100 C 110 80, 170 190, 230 130 C 290 70, 360 170, 420 160"
            stroke="#2864E8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 8"
            opacity="0.55"
            fill="none"
          />

          {/* Architectural Bridge Span */}
          <path
            d="M 90 200 C 140 100, 320 100, 370 200"
            stroke="#3978F6"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 120 200 L 120 148"
            stroke="#204374"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 170 200 L 170 120"
            stroke="#204374"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 230 200 L 230 108"
            stroke="#3978F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 290 200 L 290 120"
            stroke="#204374"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 340 200 L 340 148"
            stroke="#204374"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Creative Needs Node (Left) */}
          <g transform="translate(90, 200)">
            <circle cx="0" cy="0" r="16" fill="#14294A" stroke="#3978F6" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#3978F6" />
            <text x="-40" y="32" fill="#80A7FF" fontSize="12" fontWeight="600" fontFamily="sans-serif">
              Creative Needs
            </text>
          </g>

          {/* Central Nexus (Meeting & Collaboration Point) */}
          <g transform="translate(230, 108)">
            <circle cx="0" cy="0" r="22" fill="#10233F" stroke="#80A7FF" strokeWidth="2" opacity="0.9" />
            <circle cx="0" cy="0" r="10" fill="#3978F6" filter="url(#glow)" />
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            <text x="-32" y="-28" fill="#FFFFFF" fontSize="12.5" fontWeight="700" letterSpacing="0.04em" fontFamily="sans-serif">
              COLLABORATION
            </text>
          </g>

          {/* Creative Talent Node (Right) */}
          <g transform="translate(370, 200)">
            <circle cx="0" cy="0" r="16" fill="#14294A" stroke="#3978F6" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#3978F6" />
            <text x="-36" y="32" fill="#80A7FF" fontSize="12" fontWeight="600" fontFamily="sans-serif">
              Creative Talent
            </text>
          </g>

          {/* Constellation Nodes */}
          <circle cx="160" cy="80" r="3.5" fill="#80A7FF" opacity="0.8" />
          <circle cx="310" cy="90" r="3.5" fill="#80A7FF" opacity="0.8" />
          <circle cx="210" cy="170" r="2.5" fill="#3978F6" opacity="0.6" />
        </svg>
      </div>

      {/* Brand Copy & Value Proposition */}
      <div className="auth-brand-content">
        <div className="auth-brand-tagline-badge">
          <Sparkles size={14} />
          <span>Where creative needs meet creative talent</span>
        </div>

        <h1 className="auth-brand-title">
          Your next creative connection starts here.
        </h1>

        <p className="auth-brand-description">
          Discover talented professionals, find new opportunities and bring your creative projects to life with BRIDGENEEDS.
        </p>

        <div className="auth-brand-features">
          <div className="brand-feature-item">
            <Music2 className="brand-feature-icon" />
            <span>Music producers, sound engineers, artists & creators</span>
          </div>
          <div className="brand-feature-item">
            <Users className="brand-feature-icon" />
            <span>Structured briefs, verified talent & clear collaboration</span>
          </div>
          <div className="brand-feature-item">
            <ShieldCheck className="brand-feature-icon" />
            <span>Secure agreements, milestone payments & reliable deliverables</span>
          </div>
        </div>
      </div>

      {/* Brand Footer */}
      <footer className="auth-brand-footer">
        <span>© 2026 BRIDGENEEDS. All rights reserved.</span>
        <div className="auth-brand-footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </aside>
  );
};

export default LeftBrandPanel;
