import React from 'react';
import { Room } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, Users, ArrowLeft } from 'lucide-react';

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
          <ArrowLeft className="h-4 w-4" />
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
            <Users className="h-3 w-3 mr-1" /> {room.participants}
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">{room.name}</h2>
          <p className="text-sm text-gray-300">{room.description}</p>
        </div>
        
        {/* Exit Room Button */}
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onBackClick}
          className="bg-red-500/80 hover:bg-red-600 text-white"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Exit Room
        </Button>
      </div>
    </motion.header>
  );
};

export default RoomHeader;
