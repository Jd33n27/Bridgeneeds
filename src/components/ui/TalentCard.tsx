import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, Bookmark, ArrowUpRight, Play, Music } from 'lucide-react';
import { TalentProfile } from '../../types';
import { RatingSummary } from './RatingSummary';
import { VerificationBadge } from './VerificationBadge';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import './TalentCard.css';

export interface TalentCardProps {
  talent: TalentProfile;
}

export const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  const { isFavorite, toggleFavorite, playTrack } = useApp();
  const favorite = isFavorite(talent.id);

  return (
    <div className="talent-card">
      <div className="talent-card-header">
        <div className="talent-avatar-wrapper">
          <img src={talent.avatarUrl} alt={talent.name} className="talent-avatar" />
          {talent.isRemoteAvailable && (
            <span className="remote-status-badge" title="Available for Remote Projects">
              <Globe size={11} /> Remote
            </span>
          )}
        </div>

        <button
          type="button"
          className={`favorite-btn ${favorite ? 'is-favorite' : ''}`}
          onClick={() => toggleFavorite(talent.id)}
          aria-label={favorite ? `Remove ${talent.name} from saved` : `Save ${talent.name} to wishlist`}
        >
          <Bookmark size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="talent-card-body">
        <div className="talent-title-row">
          <Link to={`/talent/${talent.id}`} className="talent-name">
            {talent.name}
          </Link>
          <span className="talent-role">{talent.primaryRole}</span>
        </div>

        <div className="talent-meta-row">
          <span className="talent-location">
            <MapPin size={14} /> {talent.location}
          </span>
          <RatingSummary rating={talent.rating} reviewCount={talent.reviewCount} size="sm" />
        </div>

        <p className="talent-bio-snippet">{talent.biography}</p>

        {/* Verification Badges */}
        <div className="talent-verifications">
          {talent.verifications.map((v) => (
            <VerificationBadge key={v.type} badge={v} />
          ))}
        </div>

        {/* Genres & Skills Pills */}
        <div className="talent-tags-container">
          {talent.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="genre-pill">{genre}</span>
          ))}
          {talent.skills.slice(0, 2).map((skill) => (
            <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </div>

        {/* Featured Audio Track Button if available */}
        {talent.featuredTrack && (
          <button
            type="button"
            className="featured-sample-btn"
            onClick={() => playTrack(talent.featuredTrack!)}
          >
            <Play size={14} className="sample-play-icon" />
            <span>Sample: {talent.featuredTrack.title}</span>
            <span className="sample-duration">{talent.featuredTrack.duration}</span>
          </button>
        )}
      </div>

      <div className="talent-card-footer">
        <div className="rate-box">
          <span className="rate-label">Starting from</span>
          <span className="rate-price">${talent.startingRate}</span>
          <span className="rate-unit">/{talent.rateType === 'hourly' ? 'hr' : 'proj'}</span>
        </div>

        <div className="card-actions">
          <Link to={`/talent/${talent.id}`}>
            <Button variant="outline" size="sm" rightIcon={<ArrowUpRight size={14} />}>
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
