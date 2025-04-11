import React from 'react';
import { Room } from '@/data/mockData';
import { motion } from 'framer-motion';

interface RoomHeaderProps {
  room: Room;
  onBackClick: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ room, onBackClick }) => {
  return (
    <motion.header 
      className="glassmorphism relative z-10 px-4 py-5 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <button 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          onClick={onBackClick}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h1 className="text-2xl font-bold gradient-text">TalkSphere</h1>
        <div className="flex space-x-2">
          {room.isLive && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/30 text-indigo-100">
              <span className="w-2 h-2 mr-1 bg-indigo-300 rounded-full animate-pulse-soft"></span>
              LIVE
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10">
            <i className="fas fa-user mr-1 text-xs"></i> {room.participants}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-xl font-medium">{room.name}</h2>
        <p className="text-sm text-gray-300">{room.description}</p>
      </div>
    </motion.header>
  );
};

export default RoomHeader;
