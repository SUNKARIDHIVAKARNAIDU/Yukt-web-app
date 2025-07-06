import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityQueue = ({ currentLanguage }) => {
  const translations = {
    en: {
      title: 'Priority Queue',
      viewAll: 'View All',
      approve: 'Approve',
      review: 'Review',
      reject: 'Reject'
    },
    es: {
      title: 'Cola de Prioridad',
      viewAll: 'Ver Todo',
      approve: 'Aprobar',
      review: 'Revisar',
      reject: 'Rechazar'
    }
  };

  const t = translations[currentLanguage];

  const priorityItems = [
    {
      id: 1,
      type: 'club_approval',
      title: 'Tech Innovation Club',
      description: 'New club registration pending approval',
      priority: 'high',
      timestamp: '2 hours ago',
      icon: 'Building',
      color: 'error'
    },
    {
      id: 2,
      type: 'content_moderation',
      title: 'Inappropriate Event Content',
      description: 'Event post flagged by multiple users',
      priority: 'high',
      timestamp: '4 hours ago',
      icon: 'Flag',
      color: 'warning'
    },
    {
      id: 3,
      type: 'user_report',
      title: 'User Harassment Report',
      description: 'Student reported inappropriate behavior',
      priority: 'medium',
      timestamp: '6 hours ago',
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      id: 4,
      type: 'club_approval',
      title: 'Environmental Action Society',
      description: 'Club profile update requires review',
      priority: 'medium',
      timestamp: '1 day ago',
      icon: 'Building',
      color: 'warning'
    },
    {
      id: 5,
      type: 'content_moderation',
      title: 'Spam Post Detection',
      description: 'Automated system flagged potential spam',
      priority: 'low',
      timestamp: '2 days ago',
      icon: 'Shield',
      color: 'secondary'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error-50 text-error border-error-200';
      case 'medium': return 'bg-warning-50 text-warning border-warning-200';
      case 'low': return 'bg-success-50 text-success border-success-200';
      default: return 'bg-background text-text-muted border-border';
    }
  };

  const getIconColor = (color) => {
    const colors = {
      error: 'text-error',
      warning: 'text-warning',
      success: 'text-success',
      secondary: 'text-secondary',
      primary: 'text-primary'
    };
    return colors[color] || 'text-text-muted';
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.title}</h3>
        <Button variant="ghost" size="sm">
          {t.viewAll}
        </Button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {priorityItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-background transition-micro">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${item.color}-50`}>
                <Icon name={item.icon} size={20} className={getIconColor(item.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">{item.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                <p className="text-xs text-text-muted">{item.timestamp}</p>
              </div>
              <div className="flex items-center space-x-2">
                {item.type === 'club_approval' && (
                  <>
                    <Button variant="success" size="xs">
                      {t.approve}
                    </Button>
                    <Button variant="danger" size="xs">
                      {t.reject}
                    </Button>
                  </>
                )}
                {(item.type === 'content_moderation' || item.type === 'user_report') && (
                  <Button variant="primary" size="xs">
                    {t.review}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityQueue;