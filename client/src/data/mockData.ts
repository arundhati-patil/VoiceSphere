export interface User {
  id: string;
  name: string;
  avatar: string;
  isSpeaker: boolean;
  isTalking: boolean;
  isMuted: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
  isCurrentUser: boolean;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  isLive: boolean;
}

// Mock user data
export const users: User[] = [
  {
    id: "1",
    name: "Alex M.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    isSpeaker: true,
    isTalking: true,
    isMuted: false,
  },
  {
    id: "2",
    name: "Sophia R.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    isSpeaker: true,
    isTalking: false,
    isMuted: true,
  },
  {
    id: "3",
    name: "David T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isSpeaker: true,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "4",
    name: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    isSpeaker: true,
    isTalking: false,
    isMuted: true,
  },
  {
    id: "5",
    name: "Jamie",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "6",
    name: "Mike",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "7",
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "8",
    name: "John",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "9",
    name: "Lisa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
  {
    id: "10",
    name: "Ryan",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&h=150&fit=crop&crop=face",
    isSpeaker: false,
    isTalking: false,
    isMuted: false,
  },
];

// Current user (you)
export const currentUser: User = {
  id: "10",
  name: "You",
  avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&h=150&fit=crop&crop=face",
  isSpeaker: false,
  isTalking: false,
  isMuted: false,
};

// Mock chat messages
export const messages: ChatMessage[] = [
  {
    id: "1",
    userId: "1",
    text: "Love how this track transitions from low energy to high!",
    timestamp: Date.now() - 180000, // 3 minutes ago
    isCurrentUser: false,
  },
  {
    id: "2",
    userId: "10", // current user
    text: "Absolutely! The melody is so catchy",
    timestamp: Date.now() - 120000, // 2 minutes ago
    isCurrentUser: true,
  },
  {
    id: "3",
    userId: "2",
    text: "Can we talk about those vocals? 🔥",
    timestamp: Date.now() - 5000, // just now
    isCurrentUser: false,
  },
];

// Mock rooms
export const rooms: Room[] = [
  {
    id: "1",
    name: "Music & Discussion",
    description: "Late night vibes with the community",
    participants: 247,
    isLive: true,
  },
  {
    id: "2",
    name: "Tech Talk",
    description: "Discussing the latest in technology and coding",
    participants: 189,
    isLive: true,
  },
  {
    id: "3",
    name: "Business Networking",
    description: "Connect with professionals and entrepreneurs",
    participants: 142,
    isLive: true,
  },
  {
    id: "4",
    name: "Gaming Community",
    description: "Chat about your favorite games and strategies",
    participants: 285,
    isLive: false,
  },
  {
    id: "5",
    name: "Mindfulness & Wellness",
    description: "Share wellness tips and mindfulness practices",
    participants: 102,
    isLive: false,
  },
  {
    id: "6",
    name: "Creative Arts",
    description: "For artists, musicians, and creative minds",
    participants: 156,
    isLive: true,
  }
];

// Active room (the one currently being viewed)
export const activeRoom: Room = rooms[0];

// Mock emojis for reactions
export const emojis = ['❤️', '🔥', '👏', '✨', '🎵', '🎧', '🎉'];
