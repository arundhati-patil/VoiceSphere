import React, { useState, useRef, useEffect } from 'react';
import { User, ChatMessage } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatPanelProps {
  messages: ChatMessage[];
  users: User[];
  onSendMessage: (message: string) => void;
  isOpen: boolean;
  onToggleChat: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  users, 
  onSendMessage, 
  isOpen, 
  onToggleChat 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m`;
    } else {
      return `${Math.floor(diff / 3600000)}h`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-24 right-4 w-64 sm:w-80 z-30"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="glassmorphism rounded-lg p-3 max-h-96 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Chat</h3>
              <button 
                className="text-xs bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
                onClick={onToggleChat}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 py-2 max-h-60">
              <AnimatePresence initial={false}>
                {messages.map((message) => {
                  const user = getUserById(message.userId);
                  if (!user) return null;
                  
                  return (
                    <motion.div 
                      key={message.id}
                      className={`chat-message ${message.isCurrentUser ? 'chat-bubble-right' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isCurrentUser && (
                          <div className="flex-shrink-0 w-8 h-8">
                            <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
                          </div>
                        )}
                        <div className={`flex-1 ${message.isCurrentUser ? 'order-1' : 'order-2'}`}>
                          <div className={`flex items-center ${message.isCurrentUser ? 'justify-end' : ''} space-x-2`}>
                            <span className="font-semibold text-sm">{message.isCurrentUser ? 'You' : user.name}</span>
                            <span className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <div className={`chat-bubble mt-1 ${message.isCurrentUser ? 'bg-purple-600/40 ml-auto' : 'bg-indigo-600/40'} p-2 rounded-lg text-sm text-white`}>
                            {message.text}
                          </div>
                        </div>
                        {message.isCurrentUser && (
                          <div className="flex-shrink-0 w-8 h-8 order-2">
                            <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex">
              <input 
                type="text" 
                placeholder="Say something..." 
                className="glassmorphism flex-1 bg-white/10 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-white/10"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="ml-2 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
