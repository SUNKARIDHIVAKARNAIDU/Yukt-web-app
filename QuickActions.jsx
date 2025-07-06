import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      createPost: 'Create Post',
      createEvent: 'Create Event',
      manageMembers: 'Manage Members',
      viewAnalytics: 'View Analytics'
    },
    es: {
      createPost: 'Crear Publicación',
      createEvent: 'Crear Evento',
      manageMembers: 'Gestionar Miembros',
      viewAnalytics: 'Ver Analíticas'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const actions = [
    {
      label: t.createPost,
      icon: 'FileText',
      variant: 'primary',
      onClick: () => navigate('/create-post')
    },
    {
      label: t.createEvent,
      icon: 'Calendar',
      variant: 'secondary',
      onClick: () => navigate('/create-event')
    },
    {
      label: t.manageMembers,
      icon: 'Users',
      variant: 'outline',
      onClick: () => navigate('/members')
    },
    {
      label: t.viewAnalytics,
      icon: 'BarChart3',
      variant: 'ghost',
      onClick: () => navigate('/analytics')
    }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 border border-border shadow-card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            iconName={action.icon}
            iconPosition="left"
            onClick={action.onClick}
            fullWidth
            className="justify-start"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;