import { formatCurrency } from '../lib/utils';
import { CategoryCard } from '../components/CategoryCard';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TalentCard } from '../components/ui/TalentCard';
import { ServiceCard } from '../components/ui/ServiceCard';
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

describe('ServiceCard and Services Catalog', () => {
  it('renders service card with link to /services/:id', () => {
    const mockService = {
      id: 'srv-test-1',
      talentId: 'talent-1',
      talentName: 'Elena Rostova',
      talentAvatar: 'https://example.com/avatar.jpg',
      talentRole: 'Mixing Engineer',
      talentLocation: 'London, UK',
      title: 'Full Stems Mixing',
      category: 'Mixing',
      shortDescription: 'Professional analog mixdown',
      fullDescription: 'Detailed mix breakdown',
      outcome: 'Release ready WAV',
      startingPrice: 350,
      deliveryDays: 3,
      revisionsPolicy: '2 rounds included',
      clientRequirements: ['Send WAV stems'],
      packages: [],
      tags: ['mixing', 'analog'],
      genres: ['Pop'],
      coverImage: 'https://example.com/cover.jpg',
      rating: 4.9,
      reviewCount: 15,
      featuredWork: []
    };

    render(
      <MemoryRouter>
        <AppProvider>
          <ServiceCard service={mockService} />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Full Stems Mixing')).toBeInTheDocument();
    expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
    expect(screen.getByText('$350')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    const serviceLink = links.find((l) => l.getAttribute('href') === '/services/srv-test-1');
    expect(serviceLink).toBeDefined();
  });
});


describe('formatCurrency utility', () => {
  it('formats valid numbers with default and custom currency symbols', () => {
    expect(formatCurrency(100000)).toBe('₦100,000');
    expect(formatCurrency(50000, '$')).toBe('$50,000');
    expect(formatCurrency(0)).toBe('₦0');
  });

  it('safely handles undefined, null, NaN, and string inputs without throwing', () => {
    expect(formatCurrency(undefined)).toBe('₦0');
    expect(formatCurrency(null)).toBe('₦0');
    expect(formatCurrency(NaN)).toBe('₦0');
    expect(formatCurrency('invalid' as any)).toBe('₦0');
    expect(formatCurrency('25000' as any)).toBe('₦25,000');
  });
});

describe('CategoryCard component', () => {
  it('renders safely when startingFrom is undefined or missing', () => {
    const incompleteCategory = {
      id: 'cat-test',
      name: 'Vocal Performance',
      description: 'Session singers and choirs',
    };

    render(
      <MemoryRouter>
        <CategoryCard category={incompleteCategory as any} />
      </MemoryRouter>
    );

    expect(screen.getByText('Vocal Performance')).toBeInTheDocument();
    expect(screen.getByText('Starting from')).toBeInTheDocument();
    expect(screen.getByText('₦0')).toBeInTheDocument();
  });
});
