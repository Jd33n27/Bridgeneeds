import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, PortfolioItem } from '../types';
import { 
  getStoredUserRole, 
  saveStoredUserRole, 
  getStoredFavorites, 
  saveStoredFavorites 
} from '../lib/storage';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  favorites: string[];
  toggleFavorite: (talentId: string) => void;
  isFavorite: (talentId: string) => boolean;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Audio Player Global State
  activeTrack: PortfolioItem | null;
  isPlaying: boolean;
  playTrack: (track: PortfolioItem) => void;
  pauseTrack: () => void;
  togglePlayTrack: (track: PortfolioItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<UserRole>(() => getStoredUserRole());
  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Audio Player State
  const [activeTrack, setActiveTrack] = useState<PortfolioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    saveStoredUserRole(role);
    showToast(`Switched workspace mode to ${role.toUpperCase()}`, 'info');
  };

  const toggleFavorite = (talentId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(talentId);
      const updated = exists ? prev.filter((id) => id !== talentId) : [...prev, talentId];
      saveStoredFavorites(updated);
      showToast(exists ? 'Removed from saved talent' : 'Saved to talent wishlist', exists ? 'info' : 'success');
      return updated;
    });
  };

  const isFavorite = (talentId: string) => favorites.includes(talentId);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    showToast(`Theme changed to ${nextTheme} mode`, 'info');
  };

  const playTrack = (track: PortfolioItem) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlayTrack = (track: PortfolioItem) => {
    if (activeTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        favorites,
        toggleFavorite,
        isFavorite,
        toasts,
        showToast,
        dismissToast,
        theme,
        toggleTheme,
        activeTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlayTrack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
