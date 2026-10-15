import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Shield, CreditCard, Globe } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-link">
              <div className="footer-logo-mark">
                <Music size={20} />
              </div>
              <span className="footer-wordmark">Bridgeneeds</span>
            </Link>

            <p className="footer-tagline">
              Bridgeneeds is the premium music talent marketplace connecting world-class producers, engineers, vocalists, songwriters, and session musicians with artists, brands, and creative organizations.
            </p>

            <div className="footer-trust-badges">
              <span className="trust-pill">
                <Shield size={14} /> Escrow Protection
              </span>
              <span className="trust-pill">
                <CreditCard size={14} /> Verified Talent & Work
              </span>
            </div>
          </div>

          {/* Col 1: Discover */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Discover Talent</h4>
            <ul className="footer-links-list">
              <li><Link to="/discover?category=Production">Music Production</Link></li>
              <li><Link to="/discover?category=Songwriting">Songwriting & Toplining</Link></li>
              <li><Link to="/discover?category=Mixing">Mixing & Mastering</Link></li>
              <li><Link to="/discover?category=Vocals">Vocalists & Choirs</Link></li>
              <li><Link to="/discover?category=Musicians">Session Musicians</Link></li>
              <li><Link to="/discover?category=Sound%20Design">Scoring & Sound Design</Link></li>
            </ul>
          </div>

          {/* Col 2: Platform */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul className="footer-links-list">
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/for-talent">For Talent</Link></li>
              <li><Link to="/for-business">For Business</Link></li>
              <li><Link to="/create-brief">Create a Brief</Link></li>
              <li><Link to="/dashboard/client">Client Workspace</Link></li>
              <li><Link to="/dashboard/talent">Talent Studio</Link></li>
            </ul>
          </div>

          {/* Col 3: Company & Auth */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Account & Legal</h4>
            <ul className="footer-links-list">
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Join Bridgeneeds</Link></li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#support" onClick={(e) => e.preventDefault()}>Support & Trust</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} Bridgeneeds Technologies. All rights reserved.</p>
          <div className="footer-location">
            <Globe size={14} />
            <span>Global Creative Network • Verified Talent Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
