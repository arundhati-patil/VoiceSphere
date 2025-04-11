import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { rooms } from '@/data/mockData';
import { 
  Mic, 
  MessageSquare, 
  Settings, 
  PlusCircle,
  Users,
  Phone
} from 'lucide-react';

const Home: React.FC = () => {
  const [, setLocation] = useLocation();

  // Take the first 3 rooms for display on home
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
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
              onClick={() => setLocation('/rooms')}
            >
              <Users className="mr-2 h-4 w-4" />
              All Rooms
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">TalkSphere</h1>
            <p className="text-xl mb-10 text-white/70">
              Join live audio conversations in virtual rooms with people from around the world
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setLocation('/rooms')}
                  className="text-lg w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all rounded-xl"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Join a Room
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  onClick={() => setLocation('/create-room')}
                  className="text-lg w-full sm:w-auto px-8 py-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all rounded-xl"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Room
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Rooms Section */}
      <section className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Rooms</h2>
            <Button 
              variant="link" 
              onClick={() => setLocation('/rooms')}
              className="text-indigo-300 hover:text-indigo-200"
            >
              View All Rooms
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
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
                      <Button 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-full px-4"
                        onClick={() => setLocation(`/room/${room.id}`)}
                      >
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-10 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10 text-center">TalkSphere Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism bg-white/5 p-6 rounded-xl border border-white/10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Live Voice Chat</h3>
              <p className="text-white/70">Join live conversations with speakers from around the world in real-time.</p>
            </div>
            
            <div className="glassmorphism bg-white/5 p-6 rounded-xl border border-white/10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Text Chat</h3>
              <p className="text-white/70">Participate in the conversation via text chat while listening to speakers.</p>
            </div>
            
            <div className="glassmorphism bg-white/5 p-6 rounded-xl border border-white/10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Room Settings</h3>
              <p className="text-white/70">Create custom rooms with your own topics and invite friends to join.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative z-10 py-16 mb-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glassmorphism bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the conversation?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Connect with others in real-time voice conversations. Create your own room or join existing discussions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => setLocation('/rooms')}
                className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              >
                <Users className="mr-2 h-5 w-5" />
                Browse Rooms
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setLocation('/contact')}
                className="w-full sm:w-auto px-8 py-6 bg-white/5 border-white/10 hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="glassmorphism relative z-10 px-6 py-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white/50 mb-2 sm:mb-0">© 2025 TalkSphere. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-white/50">
            <div className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              <span className="text-sm">Live Chat</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="text-sm">Text Chat</span>
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

export default Home;
