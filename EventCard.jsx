import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ 
  event, 
  viewMode = 'grid', 
  isBookmarked = false, 
  isRSVPed = false,
  onClick,
  onRSVP,
  onBookmark,
  onShare
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      social: 'bg-green-100 text-green-800',
      sports: 'bg-orange-100 text-orange-800',
      cultural: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCapacityStatus = () => {
    const percentage = (event.attendees / event.capacity) * 100;
    if (percentage >= 90) return { status: 'full', color: 'text-error' };
    if (percentage >= 70) return { status: 'filling', color: 'text-warning' };
    return { status: 'available', color: 'text-success' };
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-surface rounded-lg shadow-card border border-border overflow-hidden transition-hover hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-48 h-48 md:h-auto">
            <Image
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-center">
                <div className="text-xs text-text-muted font-medium">
                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {new Date(event.startDate).getDate()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <div className="flex items-center space-x-2">
                  <Image
                    src={event.club.avatar}
                    alt={event.club.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-text-secondary">{event.club.name}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark?.(event.id, !isBookmarked);
                }}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-warning bg-warning/10' : 'text-text-muted hover:text-warning hover:bg-warning/10'
                }`}
              >
                <Icon name="Bookmark" size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h3 
              className="text-lg font-semibold text-text-primary mb-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() => onClick?.(event)}
            >
              {event.title}
            </h3>
            
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDateTime(event.startDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span className={getCapacityStatus().color}>
                    {event.attendees}/{event.capacity}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.(event);
                  }}
                  iconName="Share"
                >
                  Share
                </Button>
              </div>
              <Button
                variant={isRSVPed ? 'success' : 'primary'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRSVP?.(event.id, !isRSVPed);
                }}
                iconName={isRSVPed ? 'Check' : 'Calendar'}
              >
                {isRSVPed ? 'Going' : 'RSVP'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border overflow-hidden transition-hover hover:shadow-md">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-center">
            <div className="text-xs text-text-muted font-medium">
              {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
            </div>
            <div className="text-lg font-bold text-text-primary">
              {new Date(event.startDate).getDate()}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.(event.id, !isBookmarked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isBookmarked ? 'text-warning bg-surface' : 'text-text-muted bg-surface bg-opacity-80 hover:text-warning'
          }`}
        >
          <Icon name="Bookmark" size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <div className="flex items-center space-x-2">
            <Image
              src={event.club.avatar}
              alt={event.club.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-text-secondary">{event.club.name}</span>
          </div>
        </div>

        <h3 
          className="text-lg font-semibold text-text-primary mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onClick?.(event)}
        >
          {event.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="MapPin" size={14} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <Icon name="Users" size={14} />
            <span className={getCapacityStatus().color}>
              {event.attendees}/{event.capacity} attending
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.(event);
            }}
            iconName="Share"
          >
            Share
          </Button>
          <Button
            variant={isRSVPed ? 'success' : 'primary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRSVP?.(event.id, !isRSVPed);
            }}
            iconName={isRSVPed ? 'Check' : 'Calendar'}
          >
            {isRSVPed ? 'Going' : 'RSVP'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;