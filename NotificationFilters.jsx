import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationFilters = ({ 
  activeFilter, 
  onFilterChange, 
  unreadCount = 0,
  onBulkAction,
  onToggleSettings 
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filters = [
    { id: 'all', label: 'All', icon: 'Bell', count: null },
    { id: 'unread', label: 'Unread', icon: 'BellRing', count: unreadCount },
    { id: 'events', label: 'Events', icon: 'Calendar', count: null },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle', count: null },
    { id: 'announcements', label: 'Announcements', icon: 'Megaphone', count: null },
    { id: 'system', label: 'System', icon: 'Settings', count: null },
  ];

  const bulkActions = [
    { id: 'mark-all-read', label: 'Mark All as Read', icon: 'CheckCheck' },
    { id: 'delete-read', label: 'Delete Read', icon: 'Trash2' },
    { id: 'delete-all', label: 'Delete All', icon: 'Trash' },
  ];

  return (
    <div className="bg-surface border-b border-border">
      {/* Filter Tabs */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBulkActions(!showBulkActions)}
              iconName="MoreHorizontal"
            >
              Actions
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSettings}
              iconName="Settings"
            />
          </div>
        </div>

        <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange?.(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-micro ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:bg-background hover:text-text-primary'
              }`}
            >
              <Icon name={filter.icon} size={16} />
              <span className="text-sm font-medium">{filter.label}</span>
              {filter.count !== null && filter.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeFilter === filter.id
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {filter.count > 99 ? '99+' : filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {showBulkActions && (
        <div className="px-4 py-3 border-t border-border bg-background">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-sm text-text-muted whitespace-nowrap">Bulk actions:</span>
            {bulkActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  onBulkAction?.(action.id);
                  setShowBulkActions(false);
                }}
                iconName={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationFilters;