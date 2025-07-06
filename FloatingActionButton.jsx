import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const FloatingActionButton = ({ onActionSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'create-post',
      label: 'Create Post',
      icon: 'Plus',
      color: 'bg-primary hover:bg-primary-700'
    },
    {
      id: 'join-club',
      label: 'Join Club',
      icon: 'UserPlus',
      color: 'bg-secondary hover:bg-secondary-700'
    },
    {
      id: 'find-events',
      label: 'Find Events',
      icon: 'Calendar',
      color: 'bg-accent hover:bg-accent-700'
    },
    {
      id: 'start-chat',
      label: 'Start Chat',
      icon: 'MessageCircle',
      color: 'bg-success hover:bg-success-700'
    }
  ];

  const handleActionClick = (actionId) => {
    setIsExpanded(false);
    onActionSelect?.(actionId);
  };

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-floating">
      {/* Action Items */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-surface text-text-primary px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
                {action.label}
              </span>
              <button
                onClick={() => handleActionClick(action.id)}
                className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg transition-hover hover:scale-110 flex items-center justify-center`}
              >
                <Icon name={action.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full bg-primary hover:bg-primary-700 text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;