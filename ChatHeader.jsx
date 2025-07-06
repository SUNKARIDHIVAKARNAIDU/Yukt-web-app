import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  conversation, 
  onBack, 
  onVideoCall, 
  onVoiceCall, 
  onMoreOptions,
  currentLanguage,
  isMobile 
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const translations = {
    en: {
      online: "Online",
      lastSeen: "Last seen",
      videoCall: "Video Call",
      voiceCall: "Voice Call",
      viewProfile: "View Profile",
      muteNotifications: "Mute Notifications",
      blockUser: "Block User",
      reportUser: "Report User",
      clearChat: "Clear Chat",
      members: "members"
    },
    es: {
      online: "En línea",
      lastSeen: "Visto por última vez",
      videoCall: "Videollamada",
      voiceCall: "Llamada de Voz",
      viewProfile: "Ver Perfil",
      muteNotifications: "Silenciar Notificaciones",
      blockUser: "Bloquear Usuario",
      reportUser: "Reportar Usuario",
      clearChat: "Limpiar Chat",
      members: "miembros"
    }
  };

  const t = translations[currentLanguage];

  const formatLastSeen = (timestamp) => {
    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffInMinutes = (now - lastSeen) / (1000 * 60);

    if (diffInMinutes < 1) return t.online;
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return lastSeen.toLocaleDateString();
  };

  const handleOptionClick = (action) => {
    setShowOptions(false);
    onMoreOptions(action);
  };

  if (!conversation) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
      {/* Left Section */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Back Button (Mobile) */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            onClick={onBack}
            className="flex-shrink-0"
          />
        )}

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Image
            src={conversation.avatar}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>

        {/* Conversation Info */}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-text-primary truncate">
            {conversation.name}
          </h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-text-muted">
              {conversation.isOnline 
                ? t.online 
                : `${t.lastSeen} ${formatLastSeen(conversation.lastSeen)}`
              }
            </p>
            {conversation.memberCount && (
              <>
                <span className="text-text-muted">•</span>
                <p className="text-sm text-text-muted">
                  {conversation.memberCount} {t.members}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Video Call */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Video"
          onClick={onVideoCall}
          className="hidden sm:flex"
          title={t.videoCall}
        />

        {/* Voice Call */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Phone"
          onClick={onVoiceCall}
          className="hidden sm:flex"
          title={t.voiceCall}
        />

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowOptions(!showOptions)}
          />

          {/* Options Dropdown */}
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-dropdown border border-border py-1 z-dropdown">
              <button
                onClick={() => handleOptionClick('profile')}
                className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-background transition-micro"
              >
                <Icon name="User" size={16} className="mr-3" />
                {t.viewProfile}
              </button>
              
              <button
                onClick={() => handleOptionClick('mute')}
                className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-background transition-micro"
              >
                <Icon name="BellOff" size={16} className="mr-3" />
                {t.muteNotifications}
              </button>

              <button
                onClick={() => handleOptionClick('clear')}
                className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-background transition-micro"
              >
                <Icon name="Trash2" size={16} className="mr-3" />
                {t.clearChat}
              </button>

              <hr className="my-1 border-border" />

              <button
                onClick={() => handleOptionClick('block')}
                className="flex items-center w-full px-4 py-2 text-sm text-warning hover:bg-warning-50 transition-micro"
              >
                <Icon name="UserX" size={16} className="mr-3" />
                {t.blockUser}
              </button>

              <button
                onClick={() => handleOptionClick('report')}
                className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-micro"
              >
                <Icon name="Flag" size={16} className="mr-3" />
                {t.reportUser}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;