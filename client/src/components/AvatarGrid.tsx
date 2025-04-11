import React, { useEffect } from 'react';
import { User } from '@/data/mockData';
import { motion } from 'framer-motion';
import { useEmojiAnimation } from '@/hooks/useEmojiAnimation';

interface AvatarGridProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const AvatarGrid: React.FC<AvatarGridProps> = ({ users, onUserClick }) => {
  const { containerRef, createRandomEmoji } = useEmojiAnimation();

  // Speakers are users with isSpeaker = true
  const speakers = users.filter(user => user.isSpeaker);
  
  // Listeners are users with isSpeaker = false
  const listeners = users.filter(user => !user.isSpeaker);

  // Create random emojis periodically
  useEffect(() => {
    const interval = setInterval(() => {
      createRandomEmoji();
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, [createRandomEmoji]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 z-10 relative">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Speakers</h3>
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {speakers.map(speaker => (
            <motion.div
              key={speaker.id}
              className="flex flex-col items-center space-y-2"
              variants={itemVariants}
              onClick={() => onUserClick(speaker)}
            >
              <div className="relative group">
                {speaker.isTalking && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-50 blur-sm group-hover:opacity-70 transition-all"></div>
                )}
                <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${speaker.isTalking ? 'border-indigo-500' : 'border-white/30'} transition-transform duration-300 transform group-hover:scale-105 cursor-pointer`}>
                  <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-1 inset-x-0 flex justify-center">
                    <i className={`fas fa-${speaker.isMuted ? 'microphone-slash' : 'microphone'} text-xs`}></i>
                  </div>
                </div>
                {speaker.isTalking && (
                  <div className="absolute -bottom-1 inset-x-0 flex justify-center">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">{speaker.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Listeners</h3>
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {listeners.map(listener => (
            <motion.div
              key={listener.id}
              className="flex flex-col items-center space-y-2"
              variants={itemVariants}
              onClick={() => onUserClick(listener)}
            >
              <div className="relative group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 transition-transform duration-300 transform group-hover:scale-105 cursor-pointer">
                  <img src={listener.avatar} alt={listener.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-xs font-medium">{listener.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Emoji Animation Container */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20"></div>
    </div>
  );
};

export default AvatarGrid;
