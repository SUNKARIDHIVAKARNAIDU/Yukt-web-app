import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessageInput = ({ 
  onSendMessage, 
  onTyping, 
  replyTo, 
  onCancelReply,
  currentLanguage 
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const translations = {
    en: {
      typeMessage: "Type a message...",
      send: "Send",
      attach: "Attach file",
      emoji: "Add emoji",
      replyingTo: "Replying to",
      cancel: "Cancel"
    },
    es: {
      typeMessage: "Escribe un mensaje...",
      send: "Enviar",
      attach: "Adjuntar archivo",
      emoji: "Agregar emoji",
      replyingTo: "Respondiendo a",
      cancel: "Cancelar"
    }
  };

  const t = translations[currentLanguage];

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '🔥', '💯', '😢', '😮', '😡', '🙏', '👏', '🎊'];

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Trigger typing indicator
    onTyping(true);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' && attachments.length === 0) return;

    const messageData = {
      content: message.trim(),
      type: attachments.length > 0 ? 'file' : 'text',
      attachments: attachments,
      replyTo: replyTo
    };

    onSendMessage(messageData);
    setMessage('');
    setAttachments([]);
    onTyping(false);
    
    if (replyTo) {
      onCancelReply();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="border-t border-border bg-surface">
      {/* Reply Preview */}
      {replyTo && (
        <div className="px-4 py-2 bg-background border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CornerUpLeft" size={16} className="text-primary" />
              <span className="text-sm text-text-muted">{t.replyingTo} {replyTo.senderName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onCancelReply}
            />
          </div>
          <p className="text-sm text-text-muted truncate mt-1 ml-6">{replyTo.content}</p>
        </div>
      )}

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 bg-background border-b border-border">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 bg-surface rounded-lg p-2 border border-border">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm truncate max-w-32">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => removeAttachment(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              onClick={() => fileInputRef.current?.click()}
              title={t.attach}
            />
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.txt"
            />
          </div>

          {/* Message Input Field */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={t.typeMessage}
              className="w-full px-4 py-2 pr-12 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none max-h-32 min-h-[40px]"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '40px',
                maxHeight: '128px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />

            {/* Emoji Button */}
            <div className="absolute right-2 bottom-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Smile"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title={t.emoji}
              />
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded-lg shadow-dropdown p-3 z-dropdown">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-micro"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            variant={message.trim() || attachments.length > 0 ? "primary" : "ghost"}
            size="sm"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={message.trim() === '' && attachments.length === 0}
            title={t.send}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;