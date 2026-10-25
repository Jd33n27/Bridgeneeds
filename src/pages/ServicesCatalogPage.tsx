import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Service } from '../types';
import { getServices } from '../lib/services';
import { ServiceCard } from '../components/ui/ServiceCard';
import { LoadingState } from '../components/ui/LoadingState';
import { SearchBar } from '../components/ui/SearchBar';
import './ServicesCatalogPage.css';

export const ServicesCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const categories = ['All', 'Production', 'Mixing', 'Mastering', 'Songwriting', 'Vocals', 'Instrumental'];

  // Keep state in sync with URL parameters if user navigates back/forward
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const q = searchParams.get('q') || '';
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getServices(selectedCategory === 'All' ? undefined : selectedCategory).then((res) => {
      if (isMounted) {
        setServices(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete('q');
    } else {
      newParams.set('q', val);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredServices = services.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.talentName.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="services-page-root">
      <div className="container services-container">
        
        <div className="services-header">
          <h1 className="services-title">Packaged Music Services</h1>
          <p className="services-subtitle">
            Fixed prices, clear stem deliverables, explicit revision policies, and turnaround guarantees from verified audio professionals.
          </p>
        </div>

        <div className="services-controls">
          <div className="search-flex">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search packaged services by keyword, outcome, or provider..."
            />
          </div>

          <div className="category-pills-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState message="Fetching packaged services..." />
        ) : filteredServices.length > 0 ? (
          <div className="services-cards-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="empty-services-box">
            <p>No packaged services matched your search criteria.</p>
            <button
              type="button"
              className="reset-btn"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ServicesCatalogPage;
