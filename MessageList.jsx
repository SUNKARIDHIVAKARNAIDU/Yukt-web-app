import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageList = ({ 
  messages, 
  currentUserId, 
  onMessageReact, 
  onMessageReply,
  currentLanguage 
}) => {
  const messagesEndRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const translations = {
    en: {
      today: "Today",
      yesterday: "Yesterday",
      edited: "edited",
      reply: "Reply",
      react: "React",
      copy: "Copy",
      delete: "Delete",
      deliveredTo: "Delivered to",
      readBy: "Read by",
      typing: "is typing..."
    },
    es: {
      today: "Hoy",
      yesterday: "Ayer",
      edited: "editado",
      reply: "Responder",
      react: "Reaccionar",
      copy: "Copiar",
      delete: "Eliminar",
      deliveredTo: "Entregado a",
      readBy: "Leído por",
      typing: "está escribiendo..."
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return `${t.yesterday} ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const formatDateSeparator = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return t.today;
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return t.yesterday;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'text':
        return (
          <div className="space-y-1">
            {message.replyTo && (
              <div className="p-2 bg-background rounded border-l-2 border-primary text-sm text-text-muted">
                <p className="font-medium">{message.replyTo.sender}</p>
                <p className="truncate">{message.replyTo.content}</p>
              </div>
            )}
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            {message.edited && (
              <span className="text-xs text-text-muted italic">{t.edited}</span>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <Image
              src={message.content}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-micro"
              onClick={() => window.open(message.content, '_blank')}
            />
            {message.caption && (
              <p className="text-sm">{message.caption}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg max-w-xs">
            <Icon name="FileText" size={24} className="text-primary" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{message.fileName}</p>
              <p className="text-sm text-text-muted">{message.fileSize}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => window.open(message.content, '_blank')}
            />
          </div>
        );

      case 'event':
        return (
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg max-w-sm">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} className="text-primary mt-1" />
              <div>
                <h4 className="font-medium text-primary">{message.eventTitle}</h4>
                <p className="text-sm text-text-muted mt-1">{message.eventDate}</p>
                <p className="text-sm mt-2">{message.eventDescription}</p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-3"
                  onClick={() => window.open(message.eventLink, '_blank')}
                >
                  View Event
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return <p>{message.content}</p>;
    }
  };

  const renderMessageReactions = (message) => {
    if (!message.reactions || message.reactions.length === 0) return null;

    const reactionCounts = message.reactions.reduce((acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => onMessageReact(message.id, emoji)}
            className="flex items-center space-x-1 px-2 py-1 bg-background rounded-full text-xs hover:bg-border transition-micro"
          >
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isOwnMessage = message.senderId === currentUserId;
        const previousMessage = index > 0 ? messages[index - 1] : null;
        const showDateSeparator = shouldShowDateSeparator(message, previousMessage);

        return (
          <div key={message.id}>
            {/* Date Separator */}
            {showDateSeparator && (
              <div className="flex items-center justify-center my-4">
                <div className="px-3 py-1 bg-background rounded-full text-xs text-text-muted border">
                  {formatDateSeparator(message.timestamp)}
                </div>
              </div>
            )}

            {/* Message */}
            <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex space-x-2 max-w-xs sm:max-w-md lg:max-w-lg ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar (for received messages) */}
                {!isOwnMessage && (
                  <Image
                    src={message.senderAvatar}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}

                {/* Message Content */}
                <div className={`relative group ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Sender Name (for received messages) */}
                  {!isOwnMessage && (
                    <p className="text-xs text-text-muted mb-1 px-1">{message.senderName}</p>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative px-4 py-2 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-background text-text-primary rounded-bl-md border border-border'
                    }`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelectedMessage(message.id);
                    }}
                  >
                    {renderMessageContent(message)}

                    {/* Message Actions (on hover) */}
                    <div className={`absolute top-0 ${isOwnMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-surface rounded-lg shadow-md border border-border p-1`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="CornerUpLeft"
                        onClick={() => onMessageReply(message)}
                        title={t.reply}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Smile"
                        onClick={() => onMessageReact(message.id, '👍')}
                        title={t.react}
                      />
                    </div>
                  </div>

                  {/* Reactions */}
                  {renderMessageReactions(message)}

                  {/* Message Info */}
                  <div className={`flex items-center space-x-2 mt-1 px-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-text-muted">
                      {formatMessageTime(message.timestamp)}
                    </span>
                    
                    {/* Message Status (for sent messages) */}
                    {isOwnMessage && (
                      <Icon 
                        name={message.status === 'sent' ? 'Check' : message.status === 'delivered' ? 'CheckCheck' : 'CheckCheck'} 
                        size={14} 
                        className={`${
                          message.status === 'read' ?'text-primary' :'text-text-muted'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Scroll to bottom anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;