import React, { useState } from 'react';
import { Room } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Users, 
  ArrowLeft, 
  Radio, 
  Share2, 
  Info, 
  Music, 
  Heart 
} from 'lucide-react';

interface RoomHeaderProps {
  room: Room;
  onBackClick: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ room, onBackClick }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [heartCount, setHeartCount] = useState(Math.floor(Math.random() * 100) + 42);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  const handleLike = () => {
    setHeartCount(prev => prev + 1);
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
  };
  
  // Flying hearts animation
  const heartVariants = {
    initial: { scale: 0, y: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.2, 1],
      y: -80,
      opacity: [0, 1, 0],
      transition: { duration: 1, ease: "easeOut" }
    }
  };
  
  // Info panel animation
  const infoVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const infoItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.header 
      className="glassmorphism relative z-10 px-4 py-5 border-b border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar with logo and controls */}
      <div className="flex items-center justify-between">
        <motion.button 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          onClick={onBackClick}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="h-4 w-4" />
        </motion.button>
        
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            TalkSphere
          </span>
        </motion.h1>
        
        <div className="flex space-x-2">
          {room.isLive && (
            <motion.span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-indigo-100 backdrop-blur-sm border border-indigo-500/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.span 
                className="w-2 h-2 mr-1 bg-red-400 rounded-full"
                animate={{ 
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              LIVE
            </motion.span>
          )}
          <motion.span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 border border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.15)"
            }}
          >
            <Users className="h-3 w-3 mr-1" /> 
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                color: ["#ffffff", "#a78bfa", "#ffffff"]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              {room.participants}
            </motion.span>
          </motion.span>
        </div>
      </div>
      
      {/* Main room info row */}
      <div className="mt-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.h2 
            className="text-xl font-medium flex items-center"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Radio className="h-4 w-4 mr-2 text-indigo-400" />
            {room.name}
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-300"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {room.description}
          </motion.p>
        </motion.div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Like button with heart animation */}
          <motion.div className="relative">
            <motion.button
              className="p-2 rounded-full bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 transition-all border border-pink-500/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
            >
              <Heart className="h-4 w-4" fill="#ec4899" />
            </motion.button>
            
            {/* Heart count */}
            <motion.span 
              className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              {heartCount}
            </motion.span>
            
            {/* Flying heart animation */}
            <AnimatePresence>
              {showHeartAnimation && (
                <motion.div
                  className="absolute z-10 pointer-events-none"
                  variants={heartVariants}
                  initial="initial"
                  animate="animate"
                  style={{ 
                    bottom: 0, 
                    left: '40%', 
                    width: '100%', 
                    height: '100%' 
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ 
                        scale: 0,
                        x: (i - 1) * 20,
                        rotate: (i - 1) * 30
                      }}
                      animate={{ 
                        scale: [0, 1, 0],
                        y: [0, -60 - i * 20],
                        opacity: [0, 1, 0],
                        rotate: [(i - 1) * 30, (i - 1) * 30 + (Math.random() > 0.5 ? 20 : -20)]
                      }}
                      transition={{ 
                        duration: 1 + i * 0.2,
                        ease: "easeOut" 
                      }}
                    >
                      <Heart className="h-5 w-5 text-pink-500" fill="#ec4899" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Info toggle button */}
          <motion.button
            className={`p-2 rounded-full ${showInfo ? 'bg-indigo-600/40 text-indigo-300' : 'bg-white/10 text-white'} hover:bg-indigo-600/30 transition-all border border-indigo-500/30`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleInfo}
          >
            <Info className="h-4 w-4" />
          </motion.button>
          
          {/* Share button */}
          <motion.button
            className="p-2 rounded-full bg-white/10 hover:bg-indigo-600/30 text-white transition-all border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
          
          {/* Exit Room Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onBackClick}
              className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:bg-red-600 text-white shadow-md"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Exit Room
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Expandable info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="mt-3 py-3 bg-indigo-950/30 rounded-md backdrop-blur-sm border border-indigo-500/20 px-4"
            variants={infoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={infoItemVariants} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center">
                  <Music className="h-4 w-4 text-indigo-300" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-indigo-200">Now Playing</h4>
                  <p className="text-xs text-gray-400">Ambient Lofi Beats - Volume 3</p>
                </div>
              </motion.div>
              
              <motion.div variants={infoItemVariants} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-indigo-300" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-indigo-200">Top Contributors</h4>
                  <p className="text-xs text-gray-400">Alex, Jamie, Jordan</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default RoomHeader;
