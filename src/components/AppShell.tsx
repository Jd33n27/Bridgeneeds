import React from 'react';
import { Header } from './layout/Header';
import { Footer } from './Footer';
import { Toast } from './ui/Toast';
import { AudioPlayer } from './AudioPlayer';
import { useApp } from '../context/AppContext';
import './AppShell.css';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { toasts, dismissToast, activeTrack, isPlaying, pauseTrack } = useApp();

  return (
    <div className="app-shell-root">
      <Header />
      
      <main className="app-main-content">
        {children}
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
      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};
