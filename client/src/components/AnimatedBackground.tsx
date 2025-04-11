import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the image from attached assets
const speakerImage = '/attached_assets/45853bfa-7aee-4f8a-8d59-3f4be1417348.jpeg';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate floating particles
  useEffect(() => {
    const particlesCount = 15;
    const newParticles = Array.from({ length: particlesCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      opacity: Math.random() * 0.15 + 0.05,
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15
    }));
    
    setParticles(newParticles);
  }, []);

  // Animated waveform effect
  const waveformBars = 40;
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient blobs */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`, 
            width: particle.size, 
            height: particle.size,
            opacity: 0
          }}
          animate={{ 
            x: [`${particle.x}vw`, `${(particle.x + 15) % 100}vw`, `${particle.x}vw`],
            y: [`${particle.y}vh`, `${(particle.y + 10) % 100}vh`, `${particle.y}vh`],
            opacity: [0, particle.opacity, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{ 
            background: `radial-gradient(circle at center, rgba(139, 92, 246, ${particle.opacity}), rgba(79, 70, 229, ${particle.opacity * 0.8})`,
            filter: 'blur(40px)'
          }}
        />
      ))}
      
      {/* Music waveform animation (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center h-16 opacity-30 overflow-hidden">
        {Array.from({ length: waveformBars }).map((_, i) => {
          const height = 15 + Math.sin(i * 0.5) * 10;
          const delay = i * 0.05;
          
          return (
            <motion.div
              key={i}
              className="w-1 mx-0.5 bg-indigo-400"
              initial={{ height: 2 }}
              animate={{ 
                height: [height, height + 15, height - 5, height],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Subtle moving gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-indigo-900/10 to-purple-900/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "linear"
        }}
      />
      
      {/* Concert/Speaker image with overlay */}
      <motion.div 
        className="absolute bottom-0 right-0 opacity-15 pointer-events-none h-96 w-96 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.img 
          src={speakerImage} 
          alt="Speaker" 
          className="object-cover w-full h-full"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"  
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </motion.div>

      {/* Glowing dots */}
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 40 }).map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const size = Math.random() * 2 + 1;
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 2;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ 
                top: `${top}%`, 
                left: `${left}%`, 
                width: size, 
                height: size 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                repeat: Infinity,
                duration,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBackground;
