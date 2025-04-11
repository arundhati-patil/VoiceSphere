import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { rooms } from '@/data/mockData';
import { Mic, MessageSquare, Settings, PlusCircle } from 'lucide-react';

const RoomsList: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <header className="glassmorphism relative z-10 px-6 py-5 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">TalkSphere</h1>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 hover:bg-white/10"
              onClick={() => setLocation('/contact')}
            >
              Contact
            </Button>
            <Button 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              onClick={() => setLocation('/create-room')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Room
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Available Rooms</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                All Rooms
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                Live Now
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="glassmorphism bg-white/5 border-white/10 h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-xl">{room.name}</h3>
                      {room.isLive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/30 text-indigo-100">
                          <span className="w-2 h-2 mr-1 bg-indigo-300 rounded-full animate-pulse-soft"></span>
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mb-6 flex-1">{room.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                        {room.participants} Listeners
                      </span>
                      <div className="flex space-x-4">
                        <div className="flex -space-x-2">
                          {[0, 1, 2].map((i) => (
                            <div 
                              key={i} 
                              className="w-6 h-6 rounded-full overflow-hidden border-2 border-background flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            >
                              <span className="text-xs font-bold text-white">
                                {String.fromCharCode(65 + i)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-full px-4"
                          onClick={() => setLocation(`/room/${room.id}`)}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="glassmorphism relative z-10 px-6 py-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white/50 mb-2 sm:mb-0">© 2025 TalkSphere. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-white/50">
            <div className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              <span className="text-sm">Chat</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="text-sm">Message</span>
            </div>
            <div className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-sm">Settings</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoomsList;