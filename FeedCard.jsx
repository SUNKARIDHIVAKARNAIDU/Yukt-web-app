import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeedCard = ({ item, onReaction, onRSVP, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onReaction?.(item.id, 'like', !isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onReaction?.(item.id, 'bookmark', !isBookmarked);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border overflow-hidden mb-4 transition-hover hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Image
            src={item.club.avatar}
            alt={item.club.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-text-primary text-sm">{item.club.name}</h3>
            <p className="text-text-muted text-xs">{formatDate(item.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {item.type === 'event' && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
              Event
            </span>
          )}
          <button className="p-1 text-text-muted hover:text-text-primary transition-micro">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          {showFullContent ? item.content : truncateContent(item.content)}
          {item.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-primary hover:text-primary-700 ml-1 font-medium"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Media */}
      {item.image && (
        <div className="relative">
          <Image
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          {item.type === 'event' && item.eventDate && (
            <div className="absolute top-3 left-3 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-center">
                <div className="text-xs text-text-muted font-medium">
                  {new Date(item.eventDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {new Date(item.eventDate).getDate()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Event Details */}
      {item.type === 'event' && (
        <div className="px-4 py-3 bg-background border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(item.eventDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{item.location}</span>
            </div>
            {item.attendees && (
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{item.attendees} attending</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-micro ${
              isLiked ? 'text-error' : 'text-text-muted hover:text-error'
            }`}
          >
            <Icon name={isLiked ? 'Heart' : 'Heart'} size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{item.likes + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => onShare?.(item)}
            className="flex items-center space-x-1 text-text-muted hover:text-primary transition-micro"
          >
            <Icon name="Share" size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`transition-micro ${
              isBookmarked ? 'text-warning' : 'text-text-muted hover:text-warning'
            }`}
          >
            <Icon name={isBookmarked ? 'Bookmark' : 'Bookmark'} size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {item.type === 'event' && (
          <Button
            variant={item.isRSVPed ? 'success' : 'primary'}
            size="sm"
            onClick={() => onRSVP?.(item.id, !item.isRSVPed)}
            iconName={item.isRSVPed ? 'Check' : 'Calendar'}
          >
            {item.isRSVPed ? 'Going' : 'RSVP'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeedCard;