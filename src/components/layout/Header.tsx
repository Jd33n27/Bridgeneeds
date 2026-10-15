import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Music, Menu, X, PlusCircle, User, Shield, Moon, Sun, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import './Header.css';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userRole, setUserRole, theme, toggleTheme, favorites } = useApp();
  const navigate = useNavigate();

  const handleRoleToggle = (newRole: 'client' | 'talent') => {
    setUserRole(newRole);
    if (newRole === 'client') {
      navigate('/dashboard/client');
    } else {
      navigate('/dashboard/talent');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="container header-inner">
        {/* Brand Wordmark */}
        <Link to="/" className="brand-logo-link" aria-label="Bridgeneeds Home">
          <div className="brand-logo-mark">
            <Music size={22} className="logo-icon" />
          </div>
          <span className="brand-wordmark">Bridgeneeds</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/discover" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Discover Talent
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            How It Works
          </NavLink>
          <NavLink to="/for-talent" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            For Talent
          </NavLink>
          <NavLink to="/for-business" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            For Business
          </NavLink>
        </nav>

        {/* Action Controls & Profile Menu */}
        <div className="header-right-actions">
          {/* Quick Role Switcher Pill for Demo */}
          <div className="role-switcher-pill" title="Switch workspace view between Client and Talent">
            <button
              type="button"
              className={`role-btn ${userRole === 'client' ? 'active' : ''}`}
              onClick={() => handleRoleToggle('client')}
            >
              Client
            </button>
            <button
              type="button"
              className={`role-btn ${userRole === 'talent' ? 'active' : ''}`}
              onClick={() => handleRoleToggle('talent')}
            >
              Talent
            </button>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/create-brief" className="create-brief-btn">
            <Button variant="lime" size="sm" leftIcon={<PlusCircle size={16} />}>
              Create Brief
            </Button>
          </Link>

          <Link to={userRole === 'talent' ? '/dashboard/talent' : '/dashboard/client'}>
            <Button variant="outline" size="sm" leftIcon={<User size={16} />}>
              Dashboard
            </Button>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav-links">
            <NavLink to="/discover" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              Discover Talent
            </NavLink>
            <NavLink to="/services" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              Services
            </NavLink>
            <NavLink to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              How It Works
            </NavLink>
            <NavLink to="/for-talent" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              For Talent
            </NavLink>
            <NavLink to="/for-business" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              For Business
            </NavLink>
            <NavLink to="/signin" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              Sign In
            </NavLink>
            <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link highlight">
              Join Bridgeneeds
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
