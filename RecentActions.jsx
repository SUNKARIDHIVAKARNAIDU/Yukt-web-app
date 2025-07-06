import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActions = ({ currentLanguage }) => {
  const translations = {
    en: {
      title: 'Recent Administrative Actions',
      viewAll: 'View All',
      approved: 'Approved',
      rejected: 'Rejected',
      suspended: 'Suspended',
      created: 'Created',
      updated: 'Updated',
      deleted: 'Deleted'
    },
    es: {
      title: 'Acciones Administrativas Recientes',
      viewAll: 'Ver Todo',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      suspended: 'Suspendido',
      created: 'Creado',
      updated: 'Actualizado',
      deleted: 'Eliminado'
    }
  };

  const t = translations[currentLanguage];

  const recentActions = [
    {
      id: 1,
      action: 'approved',
      target: 'Tech Innovation Club',
      type: 'club_registration',
      admin: 'John Smith',
      timestamp: '15 minutes ago',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 2,
      action: 'rejected',
      target: 'Inappropriate Event Post',
      type: 'content_moderation',
      admin: 'Sarah Johnson',
      timestamp: '32 minutes ago',
      icon: 'XCircle',
      color: 'error'
    },
    {
      id: 3,
      action: 'suspended',
      target: 'User: mike.wilson@university.edu',
      type: 'user_management',
      admin: 'John Smith',
      timestamp: '1 hour ago',
      icon: 'UserX',
      color: 'warning'
    },
    {
      id: 4,
      action: 'created',
      target: 'Platform Maintenance Announcement',
      type: 'announcement',
      admin: 'Admin System',
      timestamp: '2 hours ago',
      icon: 'Plus',
      color: 'primary'
    },
    {
      id: 5,
      action: 'updated',
      target: 'User Permission Settings',
      type: 'system_config',
      admin: 'Sarah Johnson',
      timestamp: '3 hours ago',
      icon: 'Edit',
      color: 'secondary'
    },
    {
      id: 6,
      action: 'approved',
      target: 'Environmental Action Society',
      type: 'club_registration',
      admin: 'John Smith',
      timestamp: '4 hours ago',
      icon: 'CheckCircle',
      color: 'success'
    }
  ];

  const getActionColor = (color) => {
    const colors = {
      success: 'text-success',
      error: 'text-error',
      warning: 'text-warning',
      primary: 'text-primary',
      secondary: 'text-secondary'
    };
    return colors[color] || 'text-text-muted';
  };

  const getActionBg = (color) => {
    const colors = {
      success: 'bg-success-50',
      error: 'bg-error-50',
      warning: 'bg-warning-50',
      primary: 'bg-primary-50',
      secondary: 'bg-secondary-50'
    };
    return colors[color] || 'bg-background';
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
          {recentActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-background transition-micro">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActionBg(action.color)}`}>
                <Icon name={action.icon} size={20} className={getActionColor(action.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-sm font-medium ${getActionColor(action.color)}`}>
                    {t[action.action]}
                  </span>
                  <span className="text-sm text-text-primary font-medium truncate">
                    {action.target}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-text-muted">
                  <span>by {action.admin}</span>
                  <span>•</span>
                  <span>{action.timestamp}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="xs">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActions;