import React from 'react';
import { motion } from 'framer-motion';

interface BottomNavigationProps {
  onGoLiveClick: () => void;
  onToggleMute: () => void;
  onToggleChat: () => void;
  onSettingsClick: () => void;
  isMuted: boolean;
  isChatOpen: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onGoLiveClick,
  onToggleMute,
  onToggleChat,
  onSettingsClick,
  isMuted,
  isChatOpen
}) => {
  return (
    <motion.div 
      className="fixed inset-x-0 bottom-0 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
    >
      <div className="glassmorphism px-4 pt-3 pb-5 border-t border-white/10">
        <div className="flex items-center justify-around">
          <button 
            className="flex flex-col items-center space-y-1 group"
            onClick={onToggleChat}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isChatOpen ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-indigo-700'} bg-opacity-80 transition-transform duration-300 transform group-hover:scale-105 shadow-lg`}>
              <i className="fas fa-comment text-lg"></i>
            </div>
            <span className="text-xs font-medium">Chat</span>
          </button>
          
          {/* Go Live Button */}
          <motion.button 
            className="flex flex-col items-center space-y-1 group -mt-5"
            onClick={onGoLiveClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 transition-transform duration-300 transform group-hover:scale-105 animate-pulse-soft shadow-lg">
              <i className="fas fa-podcast text-2xl"></i>
            </div>
            <span className="text-xs font-medium">Go Live</span>
          </motion.button>
          
          <button 
            className="flex flex-col items-center space-y-1 group"
            onClick={onToggleMute}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 bg-opacity-80 transition-transform duration-300 transform group-hover:scale-105 shadow-lg">
              <i className={`fas fa-${isMuted ? 'microphone-slash' : 'microphone'} text-lg`}></i>
            </div>
            <span className="text-xs font-medium">Mic</span>
          </button>
          
          <button 
            className="flex flex-col items-center space-y-1 group"
            onClick={onSettingsClick}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-700 bg-opacity-80 transition-transform duration-300 transform group-hover:scale-105 shadow-lg">
              <i className="fas fa-cog text-lg"></i>
            </div>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
