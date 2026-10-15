import React from 'react';
import { Music, Search, FileQuestion, Inbox } from 'lucide-react';
import { Button } from './Button';
import './EmptyState.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'search' | 'music' | 'file' | 'inbox';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'search',
  actionLabel,
  onAction,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'music': return <Music size={36} />;
      case 'file': return <FileQuestion size={36} />;
      case 'inbox': return <Inbox size={36} />;
      default: return <Search size={36} />;
    }
  };

  return (
    <div className="empty-state-box">
      <div className="empty-icon-circle">{getIcon()}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {actionLabel && onAction && (
        <Button variant="lime" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
