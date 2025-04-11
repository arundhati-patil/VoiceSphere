import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import RoomHeader from '@/components/RoomHeader';
import AvatarGrid from '@/components/AvatarGrid';
import ChatPanel from '@/components/ChatPanel';
import BottomNavigation from '@/components/BottomNavigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import { users, messages as initialMessages, activeRoom, currentUser } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { User, ChatMessage } from '@/data/mockData';
import { useEmojiAnimation } from '@/hooks/useEmojiAnimation';

const Room: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [isMuted, setIsMuted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLive, setIsLive] = useState(activeRoom.isLive);
  const { createEmojiAtPosition } = useEmojiAnimation();

  // Update current user mute status
  useEffect(() => {
    setAllUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === currentUser.id ? { ...user, isMuted } : user
      )
    );
  }, [isMuted]);

  const handleBackClick = useCallback(() => {
    setLocation('/');
  }, [setLocation]);

  const handleUserClick = useCallback((user: User) => {
    // Get the user's position for emoji animation
    const element = document.getElementById(`user-${user.id}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      createEmojiAtPosition(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    toast({
      title: user.name,
      description: user.isSpeaker 
        ? (user.isMuted ? "Currently muted" : "Currently speaking") 
        : "Listening",
      duration: 2000,
    });
  }, [toast, createEmojiAtPosition]);

  const handleSendMessage = useCallback((text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      text,
      timestamp: Date.now(),
      isCurrentUser: true,
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    toast({
      title: isMuted ? "Microphone Enabled" : "Microphone Muted",
      description: isMuted ? "Others can hear you now" : "You are now muted",
      duration: 2000,
    });
  }, [isMuted, toast]);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  const handleGoLiveClick = useCallback(() => {
    setIsLive(prev => !prev);
    toast({
      title: isLive ? "Left Room" : "Joined Room",
      description: isLive ? "You are no longer live" : "You are now broadcasting",
      duration: 2000,
    });
  }, [isLive, toast]);

  const handleSettingsClick = useCallback(() => {
    toast({
      title: "Settings",
      description: "Settings panel would open here",
      duration: 2000,
    });
  }, [toast]);

  // Add random messages periodically if chat is open
  useEffect(() => {
    if (!isChatOpen) return;
    
    const speakerIds = users
      .filter(user => user.isSpeaker && user.id !== currentUser.id)
      .map(user => user.id);
    
    if (speakerIds.length === 0) return;
    
    const interval = setInterval(() => {
      const randomMessages = [
        "This beat is amazing! 🎵",
        "Who's the artist again?",
        "I'm loving the vibe here tonight",
        "The audio quality is perfect 👌",
        "Can we get more bass? 🔊",
        "This reminds me of that concert last month",
        "Should we take this discussion deeper?",
        "I could listen to this all day",
        "Perfect for late night coding sessions",
        "Anyone else feeling the energy? ✨"
      ];
      
      const randomSpeakerId = speakerIds[Math.floor(Math.random() * speakerIds.length)];
      const randomMessageText = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId: randomSpeakerId,
        text: randomMessageText,
        timestamp: Date.now(),
        isCurrentUser: false,
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 12000); // Add a message every 12 seconds
    
    return () => clearInterval(interval);
  }, [isChatOpen]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <RoomHeader 
        room={{...activeRoom, isLive}}
        onBackClick={handleBackClick}
      />
      
      <AvatarGrid 
        users={allUsers}
        onUserClick={handleUserClick}
      />
      
      <ChatPanel 
        messages={messages}
        users={allUsers}
        onSendMessage={handleSendMessage}
        isOpen={isChatOpen}
        onToggleChat={handleToggleChat}
      />
      
      <BottomNavigation 
        onGoLiveClick={handleGoLiveClick}
        onToggleMute={handleToggleMute}
        onToggleChat={handleToggleChat}
        onSettingsClick={handleSettingsClick}
        isMuted={isMuted}
        isChatOpen={isChatOpen}
      />
    </div>
  );
};

export default Room;
