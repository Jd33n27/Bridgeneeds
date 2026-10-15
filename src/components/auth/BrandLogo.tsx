import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'navy'; // 'light' is for dark backgrounds (white text), 'dark' is for light backgrounds (navy text)
  showWordmark?: boolean;
  markOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showWordmark = true,
  markOnly = false,
  size = 'md',
  className = '',
  onClick,
}) => {
  const isLight = variant === 'light';
  
  // Height / scale based on size
  const heights = {
    sm: { symbol: 26, text: 16, total: 26 },
    md: { symbol: 36, text: 20, total: 36 },
    lg: { symbol: 46, text: 24, total: 46 },
  };

  const dim = heights[size];

  const primaryFill = isLight ? '#FFFFFF' : '#10233F';
  const blueFill = '#3978F6';
  const apexFill = isLight ? '#3978F6' : '#10233F';
  const apexDot = isLight ? '#FFFFFF' : '#FFFFFF';

  return (
    <div
      className={`bridgeneeds-logo-root ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      role="banner"
      aria-label="BRIDGENEEDS"
    >
      {/* Original Geometric Bridge Symbol */}
      <svg
        width={dim.symbol}
        height={dim.symbol}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Left Pillar: Creative Needs */}
        <rect
          x="4"
          y="15"
          width="8"
          height="22"
          rx="4"
          fill={blueFill}
        />

        {/* Right Pillar: Creative Talent */}
        <rect
          x="32"
          y="15"
          width="8"
          height="22"
          rx="4"
          fill={blueFill}
        />

        {/* Arch Bridge Connection */}
        <path
          d="M8 18 C 8 4, 36 4, 36 18"
          stroke={blueFill}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Dynamic Apex / Connection Meeting Point */}
        <circle cx="22" cy="10.5" r="4" fill={apexFill} />
        <circle cx="22" cy="10.5" r="1.8" fill={apexDot} />

        {/* Dynamic Bridge Span / Acoustic Harmonics curve */}
        <path
          d="M12 26 C 17 29, 27 29, 32 26"
          stroke={blueFill}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Wordmark with deliberate spacing */}
      {!markOnly && showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-heading, 'Manrope', 'Inter', sans-serif)",
            fontWeight: 800,
            fontSize: `${dim.text}px`,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: primaryFill,
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'baseline',
          }}
        >
          BRIDGE<span style={{ color: blueFill }}>NEEDS</span>
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
