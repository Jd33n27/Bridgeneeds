import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';
import { Play, Pause, Volume2, VolumeX, Music, X } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  artistOrRole?: string;
  audioUrl?: string;
  duration?: string;
  coverUrl?: string;
  compact?: boolean;
  onClose?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  artistOrRole,
  audioUrl,
  duration = '3:15',
  coverUrl,
  compact = false,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(true);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 180;
    setProgress((current / dur) * 100);
    const mins = Math.floor(current / 60);
    const secs = Math.floor(current % 60);
    setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio) currentAudio.pause();
    };
  }, []);

  return (
    <div className="audio-player-root" data-compact={compact}>
      <audio
        ref={audioRef}
        src={audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="audio-player-top">
        {/* Cover Art / Icon */}
        {coverUrl ? (
          <div className="audio-cover-art">
            <img src={coverUrl} alt={title} />
            {isPlaying && (
              <div className="audio-playing-indicator" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        ) : (
          <div className="audio-cover-placeholder">
            <Music size={20} />
          </div>
        )}

        {/* Track Info */}
        <div className="audio-track-info">
          <span className="audio-track-title">{title}</span>
          {artistOrRole && <span className="audio-track-meta">{artistOrRole}</span>}
        </div>

        {/* Play/Pause */}
        <button
          type="button"
          className="audio-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Mute */}
        {!compact && (
          <button
            type="button"
            className="audio-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}

        {/* Close */}
        {onClose && (
          <button
            type="button"
            className="audio-close-btn"
            onClick={onClose}
            aria-label="Close player"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Scrubber */}
      <div className="audio-scrubber-row">
        <span className="audio-time-label">{currentTime}</span>
        <input
          type="range"
          className="audio-scrubber"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          aria-label="Seek"
        />
        <span className="audio-time-label">{duration}</span>
      </div>
    </div>
  );
};
