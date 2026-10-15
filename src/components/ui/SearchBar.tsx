import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Button } from './Button';
import './SearchBar.css';

export interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  showExamples?: boolean;
  size?: 'md' | 'lg';
}

const EXAMPLE_SEARCHES = [
  'Music producer',
  'Mixing engineer',
  'Vocalist',
  'Songwriter',
  'Session guitarist'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  placeholder = 'What do you need for your project?',
  onSearch,
  showExamples = true,
  size = 'lg'
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSelectExample = (example: string) => {
    setQuery(example);
    onSearch(example);
  };

  return (
    <div className={`search-bar-container search-bar-${size}`}>
      <form onSubmit={handleSubmit} className="search-bar-form" role="search">
        <div className="search-bar-input-box">
          <Search className="search-bar-icon" size={20} />
          <input
            type="text"
            className="search-bar-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search music talent or services"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="search-bar-clear-btn"
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button type="submit" variant="lime" size={size === 'lg' ? 'lg' : 'md'}>
          Find Talent
        </Button>
      </form>

      {showExamples && (
        <div className="search-examples">
          <span className="search-examples-label">
            <Sparkles size={14} /> Try searching:
          </span>
          <div className="search-examples-pills">
            {EXAMPLE_SEARCHES.map((example) => (
              <button
                key={example}
                type="button"
                className="example-pill"
                onClick={() => handleSelectExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
