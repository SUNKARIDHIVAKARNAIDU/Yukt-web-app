import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityMonitor = ({ currentLanguage }) => {
  const [activities, setActivities] = useState([]);

  const translations = {
    en: {
      title: 'Real-time Activity',
      userJoined: 'joined the platform',
      clubCreated: 'created a new club',
      eventPosted: 'posted a new event',
      postCreated: 'created a new post',
      userReported: 'reported content',
      systemAlert: 'System maintenance scheduled'
    },
    es: {
      title: 'Actividad en Tiempo Real',
      userJoined: 'se unió a la plataforma',
      clubCreated: 'creó un nuevo club',
      eventPosted: 'publicó un nuevo evento',
      postCreated: 'creó una nueva publicación',
      userReported: 'reportó contenido',
      systemAlert: 'Mantenimiento del sistema programado'
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'user_joined',
        user: 'Sarah Johnson',
        action: t.userJoined,
        timestamp: new Date(Date.now() - 30000),
        icon: 'UserPlus',
        color: 'success'
      },
      {
        id: 2,
        type: 'club_created',
        user: 'Tech Innovation Club',
        action: t.clubCreated,
        timestamp: new Date(Date.now() - 120000),
        icon: 'Building',
        color: 'primary'
      },
      {
        id: 3,
        type: 'event_posted',
        user: 'Music Society',
        action: t.eventPosted,
        timestamp: new Date(Date.now() - 300000),
        icon: 'Calendar',
        color: 'secondary'
      },
      {
        id: 4,
        type: 'post_created',
        user: 'Drama Club',
        action: t.postCreated,
        timestamp: new Date(Date.now() - 450000),
        icon: 'FileText',
        color: 'warning'
      },
      {
        id: 5,
        type: 'user_reported',
        user: 'Anonymous User',
        action: t.userReported,
        timestamp: new Date(Date.now() - 600000),
        icon: 'Flag',
        color: 'error'
      },
      {
        id: 6,
        type: 'system_alert',
        user: 'System',
        action: t.systemAlert,
        timestamp: new Date(Date.now() - 900000),
        icon: 'AlertCircle',
        color: 'warning'
      }
    ];

    setActivities(mockActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: 'user_joined',
        user: `User ${Math.floor(Math.random() * 1000)}`,
        action: t.userJoined,
        timestamp: new Date(),
        icon: 'UserPlus',
        color: 'success'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [currentLanguage]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ago`;
    }
    return `${seconds}s ago`;
  };

  const getColorClasses = (color) => {
    const colors = {
      success: 'bg-success-50 text-success',
      primary: 'bg-primary-50 text-primary',
      secondary: 'bg-secondary-50 text-secondary',
      warning: 'bg-warning-50 text-warning',
      error: 'bg-error-50 text-error'
    };
    return colors[color] || 'bg-background text-text-muted';
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Live</span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-micro">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                <Icon name={activity.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-text-secondary ml-1">{activity.action}</span>
                </p>
                <p className="text-xs text-text-muted">{getTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityMonitor;