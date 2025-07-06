import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NotificationItem = ({ notification, onMarkAsRead, onDelete, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMs = now - notificationDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return notificationDate.toLocaleDateString();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event': return 'Calendar';
      case 'message': return 'MessageCircle';
      case 'announcement': return 'Megaphone';
      case 'system': return 'Settings';
      case 'reminder': return 'Clock';
      case 'achievement': return 'Award';
      default: return 'Bell';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'event': return 'text-primary';
      case 'message': return 'text-accent';
      case 'announcement': return 'text-warning';
      case 'system': return 'text-text-muted';
      case 'reminder': return 'text-secondary';
      case 'achievement': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'high':
        return <div className="w-2 h-2 bg-error rounded-full"></div>;
      case 'medium':
        return <div className="w-2 h-2 bg-warning rounded-full"></div>;
      case 'low':
        return <div className="w-2 h-2 bg-success rounded-full"></div>;
      default:
        return null;
    }
  };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead?.(notification.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(notification.id);
  };

  const handleAction = (actionId) => {
    onAction?.(notification.id, actionId);
  };

  return (
    <div 
      className={`p-4 border-b border-border hover:bg-background transition-micro cursor-pointer ${
        !notification.isRead ? 'bg-primary-50' : 'bg-surface'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar/Icon */}
        <div className="flex-shrink-0">
          {notification.sender?.avatar ? (
            <Image
              src={notification.sender.avatar}
              alt={notification.sender.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className={`w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center`}>
              <Icon 
                name={getTypeIcon(notification.type)} 
                size={20} 
                className={getTypeColor(notification.type)}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
                {getPriorityIndicator(notification.priority)}
                <h4 className={`text-sm font-medium ${
                  !notification.isRead ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {notification.title}
                </h4>
                <span className="text-xs text-text-muted">
                  {formatTimeAgo(notification.timestamp)}
                </span>
              </div>
              
              <p className={`text-sm ${
                !notification.isRead ? 'text-text-primary' : 'text-text-secondary'
              } ${isExpanded ? '' : 'line-clamp-2'}`}>
                {notification.message}
              </p>

              {notification.metadata?.location && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="MapPin" size={14} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {notification.metadata.location}
                  </span>
                </div>
              )}

              {notification.metadata?.eventDate && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Calendar" size={14} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {new Date(notification.metadata.eventDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-2">
              {!notification.isRead && (
                <button
                  onClick={handleMarkAsRead}
                  className="p-1 text-text-muted hover:text-primary transition-micro"
                  title="Mark as read"
                >
                  <Icon name="Check" size={16} />
                </button>
              )}
              
              <button
                onClick={handleDelete}
                className="p-1 text-text-muted hover:text-error transition-micro"
                title="Delete notification"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          {/* Expanded Actions */}
          {isExpanded && notification.actions && notification.actions.length > 0 && (
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
              {notification.actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={() => handleAction(action.id)}
                  iconName={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;