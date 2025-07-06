import React from 'react';
import Icon from '../../../components/AppIcon';


const ManagementTools = ({ club, onEditClick }) => {
  const managementOptions = [
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View club performance metrics',
      icon: 'BarChart3',
      color: 'text-primary'
    },
    {
      id: 'members',
      title: 'Member Management',
      description: 'Add, remove, or modify member roles',
      icon: 'Users',
      color: 'text-success'
    },
    {
      id: 'events',
      title: 'Event Management',
      description: 'Create and manage club events',
      icon: 'Calendar',
      color: 'text-warning'
    },
    {
      id: 'content',
      title: 'Content Moderation',
      description: 'Review and moderate club posts',
      icon: 'Shield',
      color: 'text-error'
    },
    {
      id: 'settings',
      title: 'Club Settings',
      description: 'Update club information and preferences',
      icon: 'Settings',
      color: 'text-text-secondary'
    }
  ];

  const handleToolClick = (toolId) => {
    switch (toolId) {
      case 'settings':
        onEditClick?.();
        break;
      default:
        console.log(`Opening ${toolId} tool`);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Management Tools</h3>
      <div className="space-y-3">
        {managementOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleToolClick(option.id)}
            className="w-full flex items-center space-x-3 p-3 bg-background hover:bg-border rounded-lg transition-colors text-left"
          >
            <div className={`p-2 bg-opacity-10 rounded-lg ${option.color.replace('text-', 'bg-')}`}>
              <Icon name={option.icon} size={20} className={option.color} />
            </div>
            <div>
              <div className="font-medium text-text-primary">{option.title}</div>
              <div className="text-sm text-text-secondary">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManagementTools;