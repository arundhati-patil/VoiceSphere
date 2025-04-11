import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { activeRoom } from '@/data/mockData';

const Home: React.FC = () => {
  const [, setLocation] = useLocation();

  // Auto-redirect to room page after 1 second (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation('/room');
    }, 1000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex items-center justify-center min-h-screen p-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="glassmorphism bg-white/5">
            <CardContent className="p-6">
              <motion.div 
                className="text-center mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold gradient-text mb-2">TalkSphere</h1>
                <p className="text-white/70">Connect through voice with the community</p>
              </motion.div>
              
              <motion.div
                className="space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="glassmorphism bg-white/5 p-4 rounded-lg">
                  <h2 className="font-medium text-lg mb-2">{activeRoom.name}</h2>
                  <p className="text-sm text-white/70 mb-3">{activeRoom.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center">
                      <i className="fas fa-user mr-2 text-xs"></i>
                      {activeRoom.participants} Participants
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/30 text-indigo-100">
                      <span className="w-1.5 h-1.5 mr-1 bg-indigo-300 rounded-full animate-pulse-soft"></span>
                      LIVE
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setLocation('/room')}
                  className="w-full py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all rounded-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center"
                  >
                    <i className="fas fa-podcast mr-2 text-lg"></i>
                    Join Room
                  </motion.div>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
