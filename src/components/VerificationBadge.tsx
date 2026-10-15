import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  label?: string;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  label = 'Verified',
  className = ''
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/30 ${className}`}
      title="Verified identity and portfolio credentials"
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      <span>{label}</span>
    </span>
  );
};
