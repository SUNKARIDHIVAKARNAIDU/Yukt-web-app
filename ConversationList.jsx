import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import ChatNotificationBadge from '../../../components/ui/ChatNotificationBadge';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  searchQuery, 
  onSearchChange,
  currentLanguage 
}) => {
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery, conversations]);

  const translations = {
    en: {
      searchPlaceholder: "Search conversations...",
      online: "Online",
      typing: "typing...",
      noMessages: "No messages yet",
      noConversations: "No conversations found"
    },
    es: {
      searchPlaceholder: "Buscar conversaciones...",
      online: "En línea",
      typing: "escribiendo...",
      noMessages: "Aún no hay mensajes",
      noConversations: "No se encontraron conversaciones"
    }
  };

  const t = translations[currentLanguage];

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'now' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-text-muted mb-4" />
            <p className="text-text-muted">{t.noConversations}</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`w-full p-3 rounded-lg text-left transition-micro hover:bg-background ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-primary-50 border border-primary-200' :''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar with Online Status */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
                    )}
                    {conversation.unreadCount > 0 && (
                      <ChatNotificationBadge count={conversation.unreadCount} />
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-text-primary truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-text-muted flex-shrink-0">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        {conversation.isTyping ? (
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-xs text-primary ml-2">{t.typing}</span>
                          </div>
                        ) : (
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 
                              ? 'text-text-primary font-medium' :'text-text-muted'
                          }`}>
                            {conversation.lastMessage || t.noMessages}
                          </p>
                        )}
                      </div>
                      
                      {conversation.lastMessageStatus && (
                        <Icon 
                          name={conversation.lastMessageStatus === 'sent' ? 'Check' : 'CheckCheck'} 
                          size={14} 
                          className={`flex-shrink-0 ml-2 ${
                            conversation.lastMessageStatus === 'read' ?'text-primary' :'text-text-muted'
                          }`}
                        />
                      )}
                    </div>

                    {/* Club Type Badge */}
                    {conversation.clubType && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-700">
                          {conversation.clubType}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;