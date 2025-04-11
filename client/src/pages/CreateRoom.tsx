import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import { Mic, Users, BellRing, ArrowLeft } from 'lucide-react';

const CreateRoom: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Room Created!",
      description: "Your room has been created successfully.",
      duration: 3000,
    });
    
    // Navigate to rooms page after a brief delay
    setTimeout(() => {
      setLocation('/rooms');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <header className="glassmorphism relative z-10 px-6 py-5 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => setLocation('/rooms')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold gradient-text">Create New Room</h1>
        </div>
      </header>
      
      <main className="flex-1 p-6 z-10 relative">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glassmorphism bg-white/5 border-white/10">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="roomName">Room Name</Label>
                    <Input 
                      id="roomName" 
                      placeholder="Enter a name for your room"
                      className="bg-white/5 border-white/10 focus:border-purple-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="What's this room about?"
                      className="bg-white/5 border-white/10 focus:border-purple-500 min-h-[120px]" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Room Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mic className="h-5 w-5 text-indigo-400" />
                        <div>
                          <p className="font-medium">Go Live Immediately</p>
                          <p className="text-sm text-white/70">Start your room as soon as it's created</p>
                        </div>
                      </div>
                      <Switch id="goLive" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-indigo-400" />
                        <div>
                          <p className="font-medium">Public Room</p>
                          <p className="text-sm text-white/70">Anyone can join your room</p>
                        </div>
                      </div>
                      <Switch id="public" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <BellRing className="h-5 w-5 text-indigo-400" />
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-white/70">Notify when users join your room</p>
                        </div>
                      </div>
                      <Switch id="notifications" />
                    </div>
                  </div>
                  
                  <div className="flex items-center pt-4">
                    <Button 
                      type="submit"
                      className="w-full py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all rounded-xl"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center"
                      >
                        Create Room
                      </motion.div>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CreateRoom;