import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Icon from '../../../components/AppIcon';


const ChatInterface = ({ 
  conversation, 
  onBack, 
  currentUserId,
  currentLanguage,
  isMobile 
}) => {
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Mock messages data
  const mockMessages = [
    {
      id: 1,
      senderId: 'club_1',
      senderName: 'Tech Club',
      senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      content: `Welcome to Tech Club! 🚀\n\nWe're excited to have you join our community. Here you can:\n• Get updates about upcoming events\n• Ask questions about technology\n• Connect with fellow tech enthusiasts\n\nFeel free to introduce yourself!`,type: 'text',timestamp: new Date(Date.now() - 86400000),status: 'read',
      reactions: [
        { userId: 'user_1', emoji: '👍' },
        { userId: 'user_2', emoji: '🚀' }
      ]
    },
    {
      id: 2,
      senderId: 'user_1',senderName: 'You',senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',content: "Hi everyone! I'm Sarah, a Computer Science major. Looking forward to participating in club activities!",
      type: 'text',
      timestamp: new Date(Date.now() - 82800000),
      status: 'read'
    },
    {
      id: 3,
      senderId: 'club_1',
      senderName: 'Tech Club',
      senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      content: "That\'s awesome Sarah! We have a hackathon coming up next week. Would you be interested in participating?",type: 'text',timestamp: new Date(Date.now() - 82200000),status: 'read',
      replyTo: {
        sender: 'You',
        content: "Hi everyone! I\'m Sarah, a Computer Science major..."
      }
    },
    {
      id: 4,
      senderId: 'club_1',senderName: 'Tech Club',senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',content: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',caption: 'Here\'s a sneak peek of our hackathon venue! 💻',
      type: 'image',
      timestamp: new Date(Date.now() - 81600000),
      status: 'read'
    },
    {
      id: 5,
      senderId: 'user_1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: "Absolutely! Count me in. What's the theme for this hackathon?",
      type: 'text',
      timestamp: new Date(Date.now() - 81000000),
      status: 'delivered'
    },
    {
      id: 6,
      senderId: 'club_1',
      senderName: 'Tech Club',
      senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      eventTitle: 'Tech Innovation Hackathon 2024',
      eventDate: 'March 15-17, 2024',
      eventDescription: 'Build innovative solutions for sustainability challenges. Prizes worth $10,000!',
      eventLink: '/events/hackathon-2024',
      type: 'event',
      timestamp: new Date(Date.now() - 80400000),
      status: 'read'
    },
    {
      id: 7,
      senderId: 'user_1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: "Perfect! Sustainability is something I\'m passionate about. I\'ll start brainstorming ideas.",
      type: 'text',
      timestamp: new Date(Date.now() - 79800000),
      status: 'sent',
      reactions: [
        { userId: 'club_1', emoji: '💚' },
        { userId: 'user_3', emoji: '👍' }
      ]
    },
    {
      id: 8,
      senderId: 'club_1',
      senderName: 'Tech Club',
      senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      content: 'hackathon-guidelines.pdf',
      fileName: 'Hackathon Guidelines 2024.pdf',
      fileSize: '2.4 MB',
      type: 'file',
      timestamp: new Date(Date.now() - 79200000),
      status: 'read'
    },
    {
      id: 9,
      senderId: 'user_1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: "Thanks for sharing the guidelines! I'll review them tonight.",
      type: 'text',
      timestamp: new Date(Date.now() - 78600000),
      status: 'sent'
    },
    {
      id: 10,
      senderId: 'club_1',
      senderName: 'Tech Club',
      senderAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face',
      content: "Great! Feel free to ask if you have any questions. We're here to help! 😊",
      type: 'text',
      timestamp: new Date(Date.now() - 78000000),
      status: 'read',
      edited: true
    }
  ];

  useEffect(() => {
    if (conversation) {
      setMessages(mockMessages);
    }
  }, [conversation]);

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: messageData.content,
      type: messageData.type,
      timestamp: new Date(),
      status: 'sent',
      replyTo: messageData.replyTo,
      attachments: messageData.attachments
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 3000);
  };

  const handleMessageReact = (messageId, emoji) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find(r => r.userId === currentUserId);
          let newReactions = msg.reactions || [];
          
          if (existingReaction) {
            if (existingReaction.emoji === emoji) {
              // Remove reaction
              newReactions = newReactions.filter(r => r.userId !== currentUserId);
            } else {
              // Update reaction
              newReactions = newReactions.map(r => 
                r.userId === currentUserId ? { ...r, emoji } : r
              );
            }
          } else {
            // Add new reaction
            newReactions = [...newReactions, { userId: currentUserId, emoji }];
          }
          
          return { ...msg, reactions: newReactions };
        }
        return msg;
      })
    );
  };

  const handleMessageReply = (message) => {
    setReplyTo({
      id: message.id,
      senderName: message.senderName,
      content: message.content
    });
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleTyping = (typing) => {
    setIsTyping(typing);
  };

  const handleVideoCall = () => {
    console.log('Starting video call with', conversation.name);
  };

  const handleVoiceCall = () => {
    console.log('Starting voice call with', conversation.name);
  };

  const handleMoreOptions = (action) => {
    console.log('More options action:', action);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {currentLanguage === 'es' ? 'Selecciona una conversación' : 'Select a conversation'}
          </h3>
          <p className="text-text-muted">
            {currentLanguage === 'es' ?'Elige una conversación de la lista para comenzar a chatear' :'Choose a conversation from the list to start chatting'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        onVideoCall={handleVideoCall}
        onVoiceCall={handleVoiceCall}
        onMoreOptions={handleMoreOptions}
        currentLanguage={currentLanguage}
        isMobile={isMobile}
      />
      
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        onMessageReact={handleMessageReact}
        onMessageReply={handleMessageReply}
        currentLanguage={currentLanguage}
      />
      
      <MessageInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        replyTo={replyTo}
        onCancelReply={handleCancelReply}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default ChatInterface;