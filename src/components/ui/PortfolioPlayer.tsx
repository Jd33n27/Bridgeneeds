import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { useApp } from '../../context/AppContext';
import './PortfolioPlayer.css';

export interface PortfolioPlayerProps {
  item: PortfolioItem;
  compact?: boolean;
}

export const PortfolioPlayer: React.FC<PortfolioPlayerProps> = ({ item, compact = false }) => {
  const { activeTrack, isPlaying, togglePlayTrack } = useApp();
  const isThisPlaying = activeTrack?.id === item.id && isPlaying;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isThisPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isThisPlaying]);

  return (
    <div className={`portfolio-player-card ${compact ? 'compact' : ''} ${isThisPlaying ? 'active-playing' : ''}`}>
      <div className="player-cover-box">
        <img src={item.coverImage} alt={item.title} className="player-cover-img" />
        <button
          type="button"
          className="player-toggle-btn"
          onClick={() => togglePlayTrack(item)}
          aria-label={isThisPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
        >
          {isThisPlaying ? <Pause size={20} /> : <Play size={20} className="play-icon-offset" />}
        </button>
      </div>

      <div className="player-details">
        <div className="player-top-row">
          <span className="player-genre-badge">{item.genre}</span>
          <span className="player-duration">{item.duration}</span>
        </div>

        <h4 className="player-title">{item.title}</h4>
        <p className="player-desc">{item.description}</p>

        {/* Audio Waveform / Progress Simulation */}
        <div className="player-waveform-box">
          <div className="waveform-bar-container">
            {[40, 70, 30, 90, 60, 80, 45, 100, 75, 50, 90, 65, 30, 85, 95, 40, 75, 55, 80, 60, 40, 90, 100, 60, 45].map((height, i) => {
              const barProgress = (i / 25) * 100;
              const isFilled = isThisPlaying && barProgress <= progress;
              return (
                <span
                  key={i}
                  className={`waveform-bar ${isFilled ? 'filled' : ''}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
          <div className="waveform-slider-track">
            <div className="waveform-progress" style={{ width: `${isThisPlaying ? progress : 0}%` }} />
          </div>
        </div>

        <div className="player-tags-row">
          {item.roles.map((r) => (
            <span key={r} className="player-role-tag">
              <Music size={11} /> {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
