import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentMessages = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const [messages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      message: 'Hi! I have a question about the upcoming React workshop. Will there be any prerequisites?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      unread: true,
      type: 'member'
    },
    {
      id: 2,
      sender: 'Tech Club Admins',
      avatar: '/assets/images/club-avatar.jpg',
      message: 'New event approval request from Photography Club for joint workshop collaboration.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      unread: true,
      type: 'admin'
    },
    {
      id: 3,
      sender: 'Mike Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      message: 'Thanks for organizing the coding challenge! Looking forward to the next one.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: false,
      type: 'member'
    },
    {
      id: 4,
      sender: 'Alex Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      message: 'Could you share the presentation slides from yesterday\'s seminar?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unread: false,
      type: 'member'
    }
  ]);

  const translations = {
    en: {
      recentMessages: 'Recent Messages',
      viewAllChats: 'View All Chats',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      member: 'Member',
      admin: 'Admin',
      you: 'You'
    },
    es: {
      recentMessages: 'Mensajes Recientes',
      viewAllChats: 'Ver Todos los Chats',
      minutesAgo: 'minutos atrás',
      hoursAgo: 'horas atrás',
      member: 'Miembro',
      admin: 'Admin',
      you: 'Tú'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t.minutesAgo}`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} ${t.hoursAgo}`;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'admin': return 'text-warning bg-warning-50';
      case 'member': return 'text-primary bg-primary-50';
      default: return 'text-text-muted bg-background';
    }
  };

  const handleMessageClick = (messageId) => {
    navigate('/real-time-chat', { state: { messageId } });
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{t.recentMessages}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="MessageCircle"
            onClick={() => navigate('/real-time-chat')}
          >
            {t.viewAllChats}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 hover:bg-background transition-micro cursor-pointer ${
              message.unread ? 'bg-primary-50/30' : ''
            }`}
            onClick={() => handleMessageClick(message.id)}
          >
            <div className="flex space-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                <Image
                  src={message.avatar}
                  alt={message.sender}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {message.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface"></div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-sm font-medium truncate ${
                      message.unread ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {message.sender}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                      {t[message.type]}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted flex-shrink-0 ml-2">
                    {formatTimeAgo(message.timestamp)}
                  </span>
                </div>
                
                <p className={`text-sm line-clamp-2 ${
                  message.unread ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {message.message}
                </p>
              </div>

              {/* Unread Indicator */}
              {message.unread && (
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;