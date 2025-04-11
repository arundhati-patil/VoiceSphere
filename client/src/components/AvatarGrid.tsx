import React, { useEffect, useState } from 'react';
import { User } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmojiAnimation } from '@/hooks/useEmojiAnimation';
import { Music, Mic, MicOff, User as UserIcon } from 'lucide-react';

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

  const [activeAvatars, setActiveAvatars] = useState<{[key: string]: boolean}>({});

  // Simulate speaker activity for animation
  useEffect(() => {
    const activeSpeakers = speakers.filter(s => s.isTalking).map(s => s.id);
    if (activeSpeakers.length > 0) {
      const newActiveAvatars = {...activeAvatars};
      activeSpeakers.forEach(id => {
        newActiveAvatars[id] = true;
      });
      setActiveAvatars(newActiveAvatars);
    }
    
    // Randomly toggle talking state for speakers
    const interval = setInterval(() => {
      const randomSpeakerId = speakers[Math.floor(Math.random() * speakers.length)]?.id;
      if (randomSpeakerId) {
        setActiveAvatars(prev => ({
          ...prev,
          [randomSpeakerId]: !prev[randomSpeakerId]
        }));
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [speakers]);
  
  // Sound wave animation for talking speakers
  const waveVariants = {
    animate: {
      height: [4, 12, 8, 16, 4, 8],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 z-10 relative">
      <div className="mb-8">
        <motion.h3 
          className="text-lg font-semibold mb-4 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Music className="h-5 w-5 mr-2 text-indigo-400" />
          Speakers
        </motion.h3>
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {speakers.map(speaker => (
              <motion.div
                key={speaker.id}
                id={`user-${speaker.id}`}
                className="flex flex-col items-center space-y-2"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUserClick(speaker)}
                layout
              >
                <div className="relative group">
                  {/* Colorful glow around active speakers */}
                  {(speaker.isTalking || activeAvatars[speaker.id]) && (
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0.6, scale: 1.1 }}
                      animate={{ 
                        opacity: [0.4, 0.7, 0.4], 
                        scale: [1.1, 1.15, 1.1],
                        background: [
                          'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(79,70,229,0) 70%)',
                          'radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(79,70,229,0) 70%)',
                          'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(79,70,229,0) 70%)'
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                  )}
                  
                  {/* Avatar container */}
                  <motion.div 
                    className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${speaker.isTalking || activeAvatars[speaker.id] ? 'border-indigo-500' : 'border-white/30'} cursor-pointer z-10`}
                    whileHover={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                    animate={{
                      scale: activeAvatars[speaker.id] ? [1, 1.05, 1] : 1,
                      transition: { 
                        duration: 1.5, 
                        repeat: activeAvatars[speaker.id] ? Infinity : 0,
                        repeatType: "reverse"
                      }
                    }}
                  >
                    <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                    
                    {/* Darkened bottom gradient */}
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    
                    {/* Microphone icon */}
                    <div className="absolute bottom-1 inset-x-0 flex justify-center">
                      {speaker.isMuted ? 
                        <MicOff className="h-3 w-3 text-white/90" /> : 
                        <Mic className="h-3 w-3 text-white/90" />
                      }
                    </div>
                  </motion.div>
                  
                  {/* Sound waves for speaking users */}
                  {(speaker.isTalking || activeAvatars[speaker.id]) && !speaker.isMuted && (
                    <div className="absolute -bottom-5 inset-x-0 flex justify-center items-end space-x-0.5 h-5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                          variants={waveVariants}
                          animate="animate"
                          style={{ animationDelay: `${i * 0.1}s` }}
                          custom={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* User name with motion */}
                <motion.span 
                  className="text-sm font-medium"
                  animate={{
                    color: activeAvatars[speaker.id] ? 
                      ['#ffffff', '#a78bfa', '#ffffff'] : '#ffffff',
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {speaker.name}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <div>
        <motion.h3 
          className="text-lg font-semibold mb-4 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UserIcon className="h-5 w-5 mr-2 text-indigo-400" />
          Listeners
        </motion.h3>
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {listeners.map((listener, index) => (
            <motion.div
              key={listener.id}
              id={`user-${listener.id}`}
              className="flex flex-col items-center space-y-2"
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUserClick(listener)}
            >
              <div className="relative group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 cursor-pointer z-10"
                  whileHover={{ borderColor: "rgba(139, 92, 246, 0.5)" }}
                >
                  <img src={listener.avatar} alt={listener.name} className="w-full h-full object-cover" />
                </motion.div>
              </div>
              <motion.span 
                className="text-xs font-medium opacity-80 group-hover:opacity-100"
                whileHover={{ opacity: 1 }}
              >
                {listener.name}
              </motion.span>
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
