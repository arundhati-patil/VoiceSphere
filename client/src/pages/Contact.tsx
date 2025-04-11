import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon!",
      duration: 3000,
    });
    
    // Clear form or navigate back after a brief delay
    setTimeout(() => {
      setLocation('/rooms');
    }, 1500);
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
          <h1 className="text-2xl font-bold gradient-text">Contact Us</h1>
        </div>
      </header>
      
      <main className="flex-1 p-6 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glassmorphism bg-white/5 border-white/10 h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter your name"
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="your@email.com"
                          className="bg-white/5 border-white/10 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        placeholder="How can we help you?"
                        className="bg-white/5 border-white/10 focus:border-purple-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Your message here..."
                        className="bg-white/5 border-white/10 focus:border-purple-500 min-h-[150px]" 
                        required
                      />
                    </div>
                    
                    <div>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glassmorphism bg-white/5 border-white/10 h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-white/70 mt-1">support@talksphere.com</p>
                        <p className="text-white/70">info@talksphere.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-white/70 mt-1">+1 (555) 123-4567</p>
                        <p className="text-white/70">Mon - Fri, 9am - 6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visit Us</h3>
                        <p className="text-white/70 mt-1">123 Tech Avenue</p>
                        <p className="text-white/70">San Francisco, CA 94107</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Connect With Us</h3>
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <i className="fab fa-twitter text-lg"></i>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <i className="fab fa-instagram text-lg"></i>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <i className="fab fa-discord text-lg"></i>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <i className="fab fa-github text-lg"></i>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;