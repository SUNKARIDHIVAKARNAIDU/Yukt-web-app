import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import ConversationList from './components/ConversationList';
import ChatInterface from './components/ChatInterface';
import Icon from '../../components/AppIcon';

const RealTimeChat = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mock current user data
  const currentUserId = 'user_1';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock conversations data
  const mockConversations = [
    {
      id: 'conv_1',
      name: 'Tech Club',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Great! Feel free to ask if you have any questions. We're here to help! 😊",
      lastMessageTime: new Date(Date.now() - 78000000),
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      clubType: 'Technology',
      memberCount: 245,
      lastSeen: new Date(Date.now() - 300000),
      lastMessageStatus: 'read'
    },
    {
      id: 'conv_2',
      name: 'Photography Club',
      avatar: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Don't forget about tomorrow's photo walk at 9 AM! Meet at the main entrance.",
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 2,
      isOnline: false,
      isTyping: false,
      clubType: 'Arts',
      memberCount: 89,
      lastSeen: new Date(Date.now() - 1800000),
      lastMessageStatus: 'delivered'
    },
    {
      id: 'conv_3',
      name: 'Music Society',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face',
      lastMessage: "🎵 New song recommendations are up! Check them out in our playlist.",
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 1,
      isOnline: true,
      isTyping: true,
      clubType: 'Arts',
      memberCount: 156,
      lastSeen: new Date(Date.now() - 60000),
      lastMessageStatus: 'read'
    },
    {
      id: 'conv_4',
      name: 'Debate Society',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastMessage: "The topic for next week's debate has been announced. Check your email for details.",
      lastMessageTime: new Date(Date.now() - 14400000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      clubType: 'Academic',
      memberCount: 67,
      lastSeen: new Date(Date.now() - 3600000),
      lastMessageStatus: 'sent'
    },
    {
      id: 'conv_5',
      name: 'Environmental Club',
      avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Join us for the campus cleanup drive this Saturday! Together we can make a difference 🌱",
      lastMessageTime: new Date(Date.now() - 21600000),
      unreadCount: 3,
      isOnline: true,
      isTyping: false,
      clubType: 'Social',
      memberCount: 198,
      lastSeen: new Date(Date.now() - 120000),
      lastMessageStatus: 'read'
    },
    {
      id: 'conv_6',
      name: 'Drama Club',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Auditions for the spring play start next Monday. Break a leg everyone! 🎭",
      lastMessageTime: new Date(Date.now() - 28800000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      clubType: 'Arts',
      memberCount: 78,
      lastSeen: new Date(Date.now() - 7200000),
      lastMessageStatus: 'delivered'
    },
    {
      id: 'conv_7',
      name: 'Sports Committee',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Basketball tournament registration is now open! Sign up before Friday.",
      lastMessageTime: new Date(Date.now() - 43200000),
      unreadCount: 1,
      isOnline: true,
      isTyping: false,
      clubType: 'Sports',
      memberCount: 312,
      lastSeen: new Date(Date.now() - 900000),
      lastMessageStatus: 'read'
    },
    {
      id: 'conv_8',
      name: 'Coding Club',
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Weekly coding challenge is live! This week\'s theme: Data Structures 💻",
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      clubType: 'Technology',
      memberCount: 189,
      lastSeen: new Date(Date.now() - 14400000),
      lastMessageStatus: 'sent'
    }
  ];

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setShowConversationList(true);
      setSelectedConversation(null);
    }
  };

  const translations = {
    en: {
      messages: 'Messages',
      noConversationSelected: 'No conversation selected',
      selectConversation: 'Select a conversation to start chatting'
    },
    es: {
      messages: 'Mensajes',
      noConversationSelected: 'Ninguna conversación seleccionada',
      selectConversation: 'Selecciona una conversación para comenzar a chatear'
    }
  };

  const t = translations[currentLanguage];

  return (
    <RoleBasedNavigation>
      <div className="h-screen bg-background flex flex-col">
        {/* Mobile Header */}
        {isMobile && showConversationList && (
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
            <h1 className="text-xl font-semibold text-text-primary">{t.messages}</h1>
          </div>
        )}

        {/* Chat Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List */}
          <div className={`${
            isMobile 
              ? showConversationList ? 'w-full' : 'hidden' :'w-80 border-r border-border'
          } flex-shrink-0`}>
            <ConversationList
              conversations={mockConversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Chat Interface */}
          <div className={`flex-1 ${
            isMobile 
              ? showConversationList ? 'hidden' : 'flex' :'flex'
          } flex-col`}>
            {selectedConversation ? (
              <ChatInterface
                conversation={selectedConversation}
                onBack={handleBackToList}
                currentUserId={currentUserId}
                currentLanguage={currentLanguage}
                isMobile={isMobile}
              />
            ) : (
              !isMobile && (
                <div className="flex-1 flex items-center justify-center bg-background">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {t.noConversationSelected}
                    </h3>
                    <p className="text-text-muted">
                      {t.selectConversation}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </RoleBasedNavigation>
  );
};

export default RealTimeChat;