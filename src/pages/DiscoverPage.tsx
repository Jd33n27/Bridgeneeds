import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TalentProfile, TalentFilterState } from '../types';
import { searchTalent } from '../lib/services';
import { TalentCard } from '../components/ui/TalentCard';
import { FilterPanel } from '../components/ui/FilterPanel';
import { SearchBar } from '../components/ui/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { Users, Filter } from 'lucide-react';
import './DiscoverPage.css';

export const DiscoverPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All Categories';

  const [filters, setFilters] = useState<TalentFilterState>({
    searchQuery: initialQuery,
    serviceCategory: initialCategory,
    genre: 'All Genres',
    instrument: 'All Instruments',
    location: 'All Locations',
    remoteOnly: false,
    minBudget: 0,
    maxBudget: 2500,
    availability: 'Any',
    verifiedOnly: false,
  });

  const [talentList, setTalentList] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    searchTalent(filters).then((results) => {
      if (isMounted) {
        setTalentList(results);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleSearchChange = (q: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: q }));
  };

  const handleFilterChange = (newFilters: Partial<TalentFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      serviceCategory: 'All Categories',
      genre: 'All Genres',
      instrument: 'All Instruments',
      location: 'All Locations',
      remoteOnly: false,
      minBudget: 0,
      maxBudget: 2500,
      availability: 'Any',
      verifiedOnly: false,
    });
    setSearchParams({});
  };

  // Check active filter pills
  const activePills = [
    filters.searchQuery ? `Search: "${filters.searchQuery}"` : null,
    filters.serviceCategory !== 'All Categories' ? filters.serviceCategory : null,
    filters.genre !== 'All Genres' ? `Genre: ${filters.genre}` : null,
    filters.instrument !== 'All Instruments' ? `Instrument: ${filters.instrument}` : null,
    filters.location !== 'All Locations' ? `Location: ${filters.location}` : null,
    filters.remoteOnly ? 'Remote Work Available' : null,
    filters.verifiedOnly ? 'Verified Only' : null,
  ].filter(Boolean) as string[];

  return (
    <div className="discover-page-root">
      <div className="container discover-container">
        
        {/* Header Title Bar */}
        <div className="discover-header">
          <div>
            <h1 className="discover-title">Discover Music Talent</h1>
            <p className="discover-subtitle">
              Find verified music producers, sound engineers, vocalists, songwriters, and session musicians for your project.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="discover-search-bar">
          <SearchBar
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, role, genre, or instrument (e.g. Afrobeats producer, Mixing)..."
          />
        </div>

        {/* Active Filter Pills Bar */}
        {activePills.length > 0 && (
          <div className="active-filters-bar">
            <span className="active-filters-label">Active Filters:</span>
            <div className="pills-list">
              {activePills.map((pill, idx) => (
                <span key={idx} className="filter-pill-badge">
                  {pill}
                </span>
              ))}
              <button type="button" onClick={handleResetFilters} className="reset-all-btn">
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-row">
          <button
            type="button"
            className="mobile-filter-toggle-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter Criteria ({activePills.length})</span>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="discover-layout">
          
          {/* Left Sidebar Filters */}
          <aside className={`discover-sidebar ${mobileFilterOpen ? 'mobile-visible' : ''}`}>
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Right Results Grid */}
          <main className="discover-results-area">
            {loading ? (
              <LoadingState message="Searching verified music talent..." />
            ) : talentList.length > 0 ? (
              <div className="talent-cards-grid">
                {talentList.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No music talent found"
                description="Try broadening your search query or resetting filters to see more verified professionals."
                actionLabel="Reset Search & Filters"
                onAction={handleResetFilters}
                icon={<Users size={32} />}
              />
            )}
          </main>

        </div>

      </div>
    </div>
  );
};

export default DiscoverPage;
