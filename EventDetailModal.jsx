import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailModal = ({ 
  event, 
  isBookmarked = false, 
  isRSVPed = false,
  onClose,
  onRSVP,
  onBookmark,
  onShare
}) => {
  const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const handleAddToCalendar = () => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <Image
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.(event.id, !isBookmarked);
              }}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'text-warning bg-surface' : 'text-text-muted bg-surface bg-opacity-80 hover:text-warning'
              }`}
            >
              <Icon name="Bookmark" size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-surface bg-opacity-80 text-text-muted hover:text-text-primary transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
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

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
              <div className="flex items-center space-x-2">
                <Image
                  src={event.club.avatar}
                  alt={event.club.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-text-secondary">{event.club.name}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-4">{event.title}</h1>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {formatDateTime(event.startDate)}
                </div>
                <div className="text-sm text-text-secondary">
                  Duration: {Math.ceil((new Date(event.endDate) - new Date(event.startDate)) / (1000 * 60 * 60))} hours
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-text-primary">{event.location}</div>
                <div className="text-sm text-text-secondary">Campus Location</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {event.attendees} / {event.capacity} attending
                </div>
                <div className="text-sm text-text-secondary">
                  {event.capacity - event.attendees} spots remaining
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">About this event</h3>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-background border border-border rounded-full text-sm text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Speakers</h3>
              <div className="space-y-3">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Image
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-text-primary">{speaker.name}</div>
                      <div className="text-sm text-text-secondary">{speaker.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Requirements</h3>
              <ul className="space-y-2">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span className="text-text-secondary">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {event.socialLinks && Object.keys(event.socialLinks).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Follow the conversation</h3>
              <div className="flex items-center space-x-4">
                {Object.entries(event.socialLinks).map(([platform, handle]) => (
                  <div key={platform} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name={platform === 'twitter' ? 'Twitter' : platform === 'instagram' ? 'Instagram' : 'Globe'} size={16} />
                    <span>{handle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => onShare?.(event)}
                iconName="Share"
              >
                Share
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToCalendar}
                iconName="Calendar"
              >
                Add to Calendar
              </Button>
            </div>
            <Button
              variant={isRSVPed ? 'success' : 'primary'}
              onClick={() => onRSVP?.(event.id, !isRSVPed)}
              iconName={isRSVPed ? 'Check' : 'Calendar'}
            >
              {isRSVPed ? 'Going' : 'RSVP'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;