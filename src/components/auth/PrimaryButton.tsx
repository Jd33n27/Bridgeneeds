import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  loadingText,
  children,
  disabled,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`btn-primary ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <div className="btn-spinner" aria-hidden="true" />
          <span>{loadingText || 'Please wait...'}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
