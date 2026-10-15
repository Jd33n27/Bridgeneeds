import React from 'react';
import './LoadingState.css';

export interface LoadingStateProps {
  message?: string;
  type?: 'skeleton' | 'spinner';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading music professionals...',
  type = 'skeleton'
}) => {
  if (type === 'spinner') {
    return (
      <div className="loading-spinner-box">
        <div className="audio-wave-spinner">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="loading-text">{message}</span>
      </div>
    );
  }

  return (
    <div className="skeleton-grid" aria-label="Loading content">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton-avatar" />
          <div className="skeleton-line title" />
          <div className="skeleton-line sub" />
          <div className="skeleton-line text" />
        </div>
      ))}
    </div>
  );
};
