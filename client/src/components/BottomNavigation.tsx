import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Radio, 
  Settings,
  Volume2,
  Music,
  ChevronUp
} from 'lucide-react';

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
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [expandedControls, setExpandedControls] = useState(false);
  
  const toggleExpandControls = () => {
    setExpandedControls(!expandedControls);
  };

  const buttonVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 8px rgba(109, 40, 217, 0.2)" },
    hover: { 
      scale: 1.08, 
      boxShadow: "0px 0px 12px rgba(139, 92, 246, 0.7)",
      transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  const goLiveVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 15px rgba(124, 58, 237, 0.2)" },
    hover: { 
      scale: 1.1, 
      boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.8)",
      transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }
  };
  
  const toolTipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 5, 
      scale: 0.9,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };

  // Expanded controls panel animation
  const expandedPanelVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { 
        opacity: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 }
      }
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-x-0 bottom-0 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Blurred backdrop effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Expanded controls panel */}
      <AnimatePresence>
        {expandedControls && (
          <motion.div 
            className="glassmorphism border-t border-white/10 px-4 py-3 flex items-center justify-between"
            variants={expandedPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Volume/Audio controls */}
            <div className="flex items-center space-x-4">
              <motion.div 
                className="bg-indigo-900/40 rounded-full p-2 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 size={16} className="text-indigo-300" />
              </motion.div>
              
              {/* Volume slider */}
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                  initial={{ width: "65%" }}
                  whileHover={{ width: ["65%", "70%", "65%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <motion.button
                className="glassmorphism border border-indigo-400/30 rounded-full px-3 py-1.5 flex items-center space-x-1"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Music size={14} className="text-indigo-300" />
                <span className="text-xs font-semibold text-indigo-200">Add Background Music</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main navigation bar */}
      <div className="glassmorphism px-4 pt-3 pb-5 border-t border-white/10 relative z-10">
        {/* Expand handle */}
        <motion.div 
          className="absolute -top-3 inset-x-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="bg-indigo-900/80 backdrop-blur-sm rounded-full w-12 h-6 flex items-center justify-center border border-indigo-600/30"
            onClick={toggleExpandControls}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <motion.div
              animate={{ rotate: expandedControls ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp size={14} className="text-indigo-300" />
            </motion.div>
          </motion.button>
        </motion.div>
        
        {/* Navigation buttons */}
        <div className="flex items-center justify-around">
          {/* Chat button */}
          <motion.button 
            className="flex flex-col items-center space-y-1.5 group relative"
            onClick={onToggleChat}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setShowTooltip('chat')}
            onHoverEnd={() => setShowTooltip(null)}
          >
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${isChatOpen ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-indigo-700'} shadow-lg`}
              variants={buttonVariants}
            >
              <motion.div variants={iconVariants}>
                <MessageSquare className="text-white" size={20} />
              </motion.div>
              
              {/* Notification indicator */}
              {!isChatOpen && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 15,
                    delay: 1 
                  }}
                >
                  <span className="text-[9px] font-bold">2</span>
                </motion.div>
              )}
            </motion.div>
            
            <motion.span 
              className="text-xs font-medium"
              animate={isChatOpen ? { color: "#d946ef" } : { color: "#ffffff" }}
            >
              Chat
            </motion.span>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'chat' && (
                <motion.div
                  className="absolute bottom-full mb-2 px-2 py-1 bg-indigo-900/90 backdrop-blur-sm rounded text-xs whitespace-nowrap"
                  variants={toolTipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {isChatOpen ? 'Close chat panel' : 'Open chat panel'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Go Live Button */}
          <motion.button 
            className="flex flex-col items-center space-y-1.5 group -mt-5 relative"
            onClick={onGoLiveClick}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setShowTooltip('golive')}
            onHoverEnd={() => setShowTooltip(null)}
          >
            <motion.div 
              className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl relative overflow-hidden"
              variants={goLiveVariants}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              
              <motion.div 
                className="relative z-10"
                variants={iconVariants}
              >
                <Radio className="text-white" size={28} />
              </motion.div>
            </motion.div>
            
            <motion.span 
              className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
              whileHover={{ scale: 1.05 }}
            >
              Go Live
            </motion.span>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'golive' && (
                <motion.div
                  className="absolute bottom-full mb-2 px-2 py-1 bg-indigo-900/90 backdrop-blur-sm rounded text-xs whitespace-nowrap"
                  variants={toolTipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Start broadcasting
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Mic button */}
          <motion.button 
            className="flex flex-col items-center space-y-1.5 group relative"
            onClick={onToggleMute}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setShowTooltip('mic')}
            onHoverEnd={() => setShowTooltip(null)}
          >
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-gradient-to-r from-purple-600 to-purple-800'} shadow-lg`}
              variants={buttonVariants}
            >
              <motion.div variants={iconVariants}>
                {isMuted ? 
                  <MicOff className="text-white" size={20} /> : 
                  <Mic className="text-white" size={20} />
                }
              </motion.div>
            </motion.div>
            
            <motion.span 
              className="text-xs font-medium"
              animate={isMuted ? { color: "#ef4444" } : { color: "#ffffff" }}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </motion.span>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'mic' && (
                <motion.div
                  className="absolute bottom-full mb-2 px-2 py-1 bg-indigo-900/90 backdrop-blur-sm rounded text-xs whitespace-nowrap"
                  variants={toolTipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {isMuted ? 'Turn microphone on' : 'Turn microphone off'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Settings button */}
          <motion.button 
            className="flex flex-col items-center space-y-1.5 group relative"
            onClick={onSettingsClick}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setShowTooltip('settings')}
            onHoverEnd={() => setShowTooltip(null)}
          >
            <motion.div 
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-lg"
              variants={buttonVariants}
            >
              <motion.div 
                variants={iconVariants}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="text-white" size={20} />
              </motion.div>
            </motion.div>
            
            <span className="text-xs font-medium">Settings</span>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'settings' && (
                <motion.div
                  className="absolute bottom-full mb-2 px-2 py-1 bg-indigo-900/90 backdrop-blur-sm rounded text-xs whitespace-nowrap"
                  variants={toolTipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Open settings menu
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
