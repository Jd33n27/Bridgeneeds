'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { mockTalentProfiles } from '@/data/mockTalent';
import { mockServices } from '@/data/mockServices';
import { TalentCard } from '@/components/TalentCard';
import { ServiceCard } from '@/components/ServiceCard';
import { CategoryType } from '@/types';

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'talent' | 'services'>('talent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'projects' | 'price-asc' | 'price-desc'>('recommended');

  const categories: string[] = ['All', 'Production', 'Songwriting', 'Mixing', 'Mastering', 'Vocals', 'Musicians', 'Sound Design'];
  const genres: string[] = ['All', 'Afrobeats', 'R&B', 'Afro-Pop', 'Highlife', 'Gospel', 'Hip Hop', 'Cinematic'];
  const locations: string[] = ['All', 'Lagos, Nigeria', 'Accra, Ghana', 'Abuja, Nigeria', 'Remote'];

  // Filtered Talent
  const filteredTalent = useMemo(() => {
    return mockTalentProfiles.filter((talent) => {
      const matchesSearch =
        talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' ||
        talent.services.some((s) => s.category === selectedCategory);

      const matchesGenre =
        selectedGenre === 'All' || talent.genres.includes(selectedGenre);

      const matchesLocation =
        selectedLocation === 'All' || talent.location.includes(selectedLocation);

      const matchesVerified = !onlyVerified || talent.verified;

      return matchesSearch && matchesCategory && matchesGenre && matchesLocation && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedGenre, selectedLocation, onlyVerified, sortBy]);

  // Filtered Services
  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.talentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white">Discover Music Talent & Services</h1>
          <p className="text-sm text-zinc-400 mt-1">Explore verified producers, sound engineers, songwriters, and session musicians.</p>
        </div>

        {/* Top Controls & Search */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#B7F34A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, role, genre, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#B7F34A]"
              />
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 shrink-0">
              <button
                onClick={() => setActiveTab('talent')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'talent'
                    ? 'bg-[#B7F34A] text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Talent Profiles ({filteredTalent.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'services'
                    ? 'bg-[#B7F34A] text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Packaged Services ({filteredServices.length})
              </button>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-[#B7F34A]"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="projects">Most Reviewed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-zinc-500 font-semibold shrink-0">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#B7F34A]/10 text-[#B7F34A] border border-[#B7F34A]/40'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid + Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#B7F34A]" /> Filter Results
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedGenre('All');
                    setSelectedLocation('All');
                    setOnlyVerified(false);
                  }}
                  className="text-[11px] text-zinc-500 hover:text-[#B7F34A]"
                >
                  Reset
                </button>
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">Music Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-[#B7F34A]"
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-[#B7F34A]"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Verified Filter */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 accent-[#B7F34A]"
                  />
                  <span>Verified Identity Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-9">
            {activeTab === 'talent' ? (
              filteredTalent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTalent.map((talent) => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
                  <p className="text-zinc-400 text-sm">No talent profiles match your filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedGenre('All');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#B7F34A] text-black text-xs font-bold"
                  >
                    Clear Search Filters
                  </button>
                </div>
              )
            ) : (
              filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-400 text-sm">No packaged services found.</p>
                </div>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
