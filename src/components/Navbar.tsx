'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Search, Menu, X, PlusCircle, Sparkles, User, SlidersHorizontal } from 'lucide-react';
import { CreateBriefModal } from './CreateBriefModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: 'Discover', href: '/discover' },
    { name: 'Services', href: '/services' },
    { name: 'For Talent', href: '/for-talent' },
    { name: 'For Business', href: '/for-business' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0B0D]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#B7F34A] text-black flex items-center justify-center font-extrabold text-xl group-hover:scale-105 transition-transform shadow-md shadow-[#B7F34A]/20">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-[#B7F34A] transition-colors">
                  MAAS
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase -mt-1">
                  Music as a Service
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 ml-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-[#B7F34A]' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <Link
              to="/discover"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs transition-colors"
            >
              <Search className="w-4 h-4 text-[#B7F34A]" />
              <span>Search talent, beats, mix...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">⌘K</kbd>
            </Link>

            {/* Create Brief Button */}
            <button
              onClick={() => setIsBriefModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-[#B7F34A]/30 text-[#B7F34A] hover:bg-[#B7F34A]/10 text-xs font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Brief</span>
            </button>

            {/* Dashboards link */}
            <Link
              to="/dashboard/client"
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Dashboard"
            >
              <User className="w-4 h-4 text-zinc-400" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            {/* Join CTA */}
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-[#B7F34A] text-black font-bold text-xs hover:bg-[#A4E235] transition-transform hover:scale-105 shadow-sm shadow-[#B7F34A]/20"
            >
              Join MAAS
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-6 space-y-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-[#B7F34A]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBriefModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#B7F34A]/10 border border-[#B7F34A]/30 text-[#B7F34A] font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Project Brief</span>
              </button>
              
              <Link
                href="/dashboard/talent"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-200 font-semibold text-sm text-center"
              >
                Talent Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Brief Creation Modal */}
      <CreateBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />
    </>
  );
};
