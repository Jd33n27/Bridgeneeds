import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { RatingSummary } from './RatingSummary';
import { Button } from './Button';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-cover-wrapper">
        <img src={service.coverImage} alt={service.title} className="service-cover-img" />
        <span className="service-category-tag">{service.category}</span>
      </div>

      <div className="service-card-content">
        <div className="service-provider-row">
          <img src={service.talentAvatar} alt={service.talentName} className="provider-avatar" />
          <div className="provider-info">
            <span className="provider-name">{service.talentName}</span>
            <span className="provider-role">{service.talentRole}</span>
          </div>
        </div>

        <Link to={`/services/${service.id}`} className="service-title">
          {service.title}
        </Link>

        <p className="service-short-desc">{service.shortDescription}</p>

        <div className="service-meta">
          <RatingSummary rating={service.rating} reviewCount={service.reviewCount} size="sm" />
          <span className="service-delivery">
            <Clock size={13} /> {service.deliveryDays} day delivery
          </span>
        </div>

        <div className="service-card-footer">
          <div className="price-tag">
            <span className="from-text">From</span>
            <span className="price-amount">${service.startingPrice}</span>
          </div>

          <Link to={`/services/${service.id}`}>
            <Button variant="lime" size="sm" rightIcon={<ArrowRight size={14} />}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
