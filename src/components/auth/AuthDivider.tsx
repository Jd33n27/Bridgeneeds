import React from 'react';

interface AuthDividerProps {
  text?: string;
  className?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ text = 'or', className = '' }) => {
  return (
    <div className={`auth-divider ${className}`} role="separator" aria-label={text}>
      <span>{text}</span>
    </div>
  );
};

export default AuthDivider;
