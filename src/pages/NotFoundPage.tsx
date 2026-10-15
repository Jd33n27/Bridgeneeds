import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Music, ArrowLeft, Search } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page-root">
      <div className="container not-found-container">
        
        <div className="not-found-card">
          <div className="not-found-icon-box">
            <Music size={40} />
          </div>

          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            The track or page you are looking for doesn't exist, has been moved, or the link is invalid.
          </p>

          <div className="not-found-actions">
            <Link to="/">
              <Button variant="lime" size="md" leftIcon={<ArrowLeft size={16} />}>
                Return Home
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="outline" size="md" leftIcon={<Search size={16} />}>
                Discover Talent
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
