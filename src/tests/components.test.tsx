import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TalentCard } from '../components/ui/TalentCard';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { RatingSummary } from '../components/ui/RatingSummary';
import { MOCK_TALENT } from '../data/mockData';
import { searchTalent } from '../lib/services';
import { AppProvider } from '../context/AppContext';

describe('VerificationBadge', () => {
  it('renders title and tooltip information', () => {
    const badgeInfo = {
      type: 'identity' as const,
      title: 'Identity Verified',
      description: 'Government ID and legal name verified.',
      verifiedDate: '2026-01-15'
    };

    render(<VerificationBadge badge={badgeInfo} />);
    expect(screen.getByText('Identity Verified')).toBeInTheDocument();
  });
});

describe('RatingSummary', () => {
  it('renders rating score and review count', () => {
    render(<RatingSummary rating={4.9} reviewCount={42} />);
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
    expect(screen.getByText('(42 reviews)')).toBeInTheDocument();
  });
});

describe('TalentCard', () => {
  it('renders talent name, primary role, and location', () => {
    const talent = MOCK_TALENT[0];
    render(
      <MemoryRouter>
        <AppProvider>
          <TalentCard talent={talent} />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(talent.name)).toBeInTheDocument();
    expect(screen.getByText(talent.primaryRole)).toBeInTheDocument();
  });
});

describe('searchTalent Service Function', () => {
  it('filters talent by search query', async () => {
    const results = await searchTalent({ searchQuery: 'Production' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((t) => t.primaryRole.includes('Producer') || t.skills.some((s) => s.toLowerCase().includes('production')))).toBe(true);
  });
});
