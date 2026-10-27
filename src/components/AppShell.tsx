import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './Footer';
import { ToastContainer } from './ui/Toast';
import { AudioPlayer } from './AudioPlayer';
import { useApp } from '../context/AppContext';
import './AppShell.css';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { activeTrack, isPlaying, pauseTrack } = useApp();

  return (
    <div className="app-shell-root">
      <Header />
      
      <main className="app-main-content">
        {children || <Outlet />}
      </main>

      <Footer />

      {/* Floating Global Audio Player when a track is loaded */}
      {activeTrack && (
        <div className="global-player-bar animate-fade-in" role="region" aria-label="Audio player">
          <div className="container player-inner">
            <AudioPlayer
              title={activeTrack.title}
              artistOrRole={`${activeTrack.genre} • ${activeTrack.category}`}
              duration={activeTrack.duration}
              audioUrl={activeTrack.audioUrl}
              onClose={pauseTrack}
            />
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
