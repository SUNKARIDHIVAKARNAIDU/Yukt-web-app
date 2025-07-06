import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeedItem = ({ activity, onClick }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMs = now - activityDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return activityDate.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'event_joined': return 'Calendar';
      case 'event_created': return 'CalendarPlus';
      case 'club_joined': return 'Users';
      case 'club_left': return 'UserMinus';
      case 'post_liked': return 'Heart';
      case 'post_commented': return 'MessageCircle';
      case 'post_shared': return 'Share';
      case 'achievement_earned': return 'Award';
      case 'profile_updated': return 'User';
      case 'message_sent': return 'Send';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'event_joined': case'event_created': return 'text-primary';
      case 'club_joined': return 'text-success';
      case 'club_left': return 'text-warning';
      case 'post_liked': return 'text-error';
      case 'post_commented': case'message_sent': return 'text-accent';
      case 'post_shared': return 'text-secondary';
      case 'achievement_earned': return 'text-warning';
      case 'profile_updated': return 'text-text-muted';
      default: return 'text-text-muted';
    }
  };

  const handleClick = () => {
    onClick?.(activity);
  };

  return (
    <div 
      className="flex items-start space-x-3 p-4 hover:bg-background transition-micro cursor-pointer"
      onClick={handleClick}
    >
      {/* Activity Icon */}
      <div className={`w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0`}>
        <Icon 
          name={getActivityIcon(activity.type)} 
          size={16} 
          className={getActivityColor(activity.type)}
        />
      </div>

      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-primary">
            <span className="font-medium">{activity.description}</span>
          </p>
          <span className="text-xs text-text-muted flex-shrink-0 ml-2">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>

        {/* Related Entity */}
        {activity.relatedEntity && (
          <div className="flex items-center space-x-2 mt-1">
            {activity.relatedEntity.image && (
              <Image
                src={activity.relatedEntity.image}
                alt={activity.relatedEntity.name}
                className="w-6 h-6 rounded object-cover"
              />
            )}
            <span className="text-xs text-text-muted">
              {activity.relatedEntity.name}
            </span>
            {activity.relatedEntity.type && (
              <span className="text-xs text-text-muted">
                • {activity.relatedEntity.type}
              </span>
            )}
          </div>
        )}

        {/* Activity Metadata */}
        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
          <div className="flex items-center space-x-3 mt-2 text-xs text-text-muted">
            {activity.metadata.points && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>+{activity.metadata.points} points</span>
              </div>
            )}
            {activity.metadata.attendees && (
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span>{activity.metadata.attendees} attendees</span>
              </div>
            )}
            {activity.metadata.likes && (
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={12} />
                <span>{activity.metadata.likes} likes</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedItem;