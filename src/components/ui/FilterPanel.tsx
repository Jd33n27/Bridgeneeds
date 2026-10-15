import React from 'react';
import { Filter, RotateCcw, Check, DollarSign, MapPin, Globe, Sparkles } from 'lucide-react';
import { TalentFilterState } from '../../types';
import { Button } from './Button';
import './FilterPanel.css';

export interface FilterPanelProps {
  filters: TalentFilterState;
  onChange: (updated: TalentFilterState) => void;
  onReset: () => void;
  resultCount?: number;
}

const CATEGORIES = ['All Categories', 'Mixing & Mastering', 'Film & Game Scoring', 'Vocal Performance & Songwriting', 'Music Producer', 'Session Musician'];
const GENRES = ['All Genres', 'Indie Rock', 'Synth Pop', 'Cinematic Orchestral', 'R&B', 'Electronic', 'Hip-Hop', 'Ambient', 'Country'];
const INSTRUMENTS = ['All Instruments', 'SSL Console', 'Grand Piano', 'Cello', 'Neumann U87', 'Electric Guitar', 'Acoustic Guitar', 'Ableton Push'];
const LOCATIONS = ['All Locations', 'London, UK', 'Los Angeles, USA', 'Berlin, Germany', 'Nashville, USA', 'Toronto, Canada'];
const AVAILABILITY_OPTIONS = ['Any', 'Immediate', 'Within 1 week', 'Selective'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  resultCount
}) => {
  const handleSelectChange = (key: keyof TalentFilterState, value: any) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.serviceCategory !== 'All Categories' ||
    filters.genre !== 'All Genres' ||
    filters.instrument !== 'All Instruments' ||
    filters.location !== 'All Locations' ||
    filters.remoteOnly ||
    filters.verifiedOnly ||
    filters.maxBudget < 2000 ||
    filters.availability !== 'Any';

  return (
    <aside className="filter-panel" aria-label="Talent search filters">
      <div className="filter-panel-header">
        <div className="filter-title">
          <Filter size={18} />
          <span>Filters</span>
          {resultCount !== undefined && (
            <span className="filter-count-badge">{resultCount} talent found</span>
          )}
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset
          </Button>
        )}
      </div>

      <div className="filter-sections">
        {/* Category */}
        <div className="filter-group">
          <label className="filter-label">Service Category</label>
          <select
            className="filter-select"
            value={filters.serviceCategory}
            onChange={(e) => handleSelectChange('serviceCategory', e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div className="filter-group">
          <label className="filter-label">Genre</label>
          <select
            className="filter-select"
            value={filters.genre}
            onChange={(e) => handleSelectChange('genre', e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Instrument & Equipment */}
        <div className="filter-group">
          <label className="filter-label">Instrument / Rig</label>
          <select
            className="filter-select"
            value={filters.instrument}
            onChange={(e) => handleSelectChange('instrument', e.target.value)}
          >
            {INSTRUMENTS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        {/* Max Budget Range */}
        <div className="filter-group">
          <div className="filter-label-row">
            <label className="filter-label">Max Budget Rate</label>
            <span className="filter-value-highlight">${filters.maxBudget}</span>
          </div>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            className="filter-range"
            value={filters.maxBudget}
            onChange={(e) => handleSelectChange('maxBudget', Number(e.target.value))}
          />
          <div className="range-bounds">
            <span>$100</span>
            <span>$3,000+</span>
          </div>
        </div>

        {/* Location & Remote */}
        <div className="filter-group">
          <label className="filter-label">Location</label>
          <select
            className="filter-select"
            value={filters.location}
            onChange={(e) => handleSelectChange('location', e.target.value)}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={filters.remoteOnly}
              onChange={(e) => handleSelectChange('remoteOnly', e.target.checked)}
            />
            <Globe size={15} />
            <span>Remote Work Available Only</span>
          </label>
        </div>

        {/* Availability */}
        <div className="filter-group">
          <label className="filter-label">Availability</label>
          <select
            className="filter-select"
            value={filters.availability}
            onChange={(e) => handleSelectChange('availability', e.target.value)}
          >
            {AVAILABILITY_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Verified Only */}
        <div className="filter-group">
          <label className="filter-checkbox-label highlight">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => handleSelectChange('verifiedOnly', e.target.checked)}
            />
            <Sparkles size={15} className="text-lime" />
            <span>Bridgeneeds Verified Pros Only</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
