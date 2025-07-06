import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingActivities = ({ activities, onActivityClick }) => {
  const getTrendingIcon = (type) => {
    switch (type) {
      case 'event':
        return 'Calendar';
      case 'post':
        return 'FileText';
      case 'announcement':
        return 'Megaphone';
      default:
        return 'TrendingUp';
    }
  };

  const getTrendingColor = (trend) => {
    if (trend > 50) return 'text-success';
    if (trend > 20) return 'text-warning';
    return 'text-text-muted';
  };

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Trending</h3>
        <Icon name="TrendingUp" size={16} className="text-primary" />
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            onClick={() => onActivityClick?.(activity)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-micro cursor-pointer"
          >
            <div className="flex-shrink-0 relative">
              <Image
                src={activity.club.avatar}
                alt={activity.club.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Icon name={getTrendingIcon(activity.type)} size={8} color="white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary text-sm truncate">{activity.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-text-muted">{activity.club.name}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={10} className={getTrendingColor(activity.trendingScore)} />
                  <span className={`text-xs font-medium ${getTrendingColor(activity.trendingScore)}`}>
                    +{activity.trendingScore}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 text-center">
              <div className="text-xs font-bold text-text-primary">#{index + 1}</div>
              <div className="text-xs text-text-muted">{activity.engagementCount}</div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="TrendingUp" size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No trending activities</p>
        </div>
      )}
    </div>
  );
};

export default TrendingActivities;