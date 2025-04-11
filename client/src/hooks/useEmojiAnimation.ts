import { useRef, useCallback, useEffect } from 'react';
import { emojis } from '@/data/mockData';

interface EmojiElement {
  element: HTMLDivElement;
  timeoutId: NodeJS.Timeout;
}

export function useEmojiAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const emojisRef = useRef<EmojiElement[]>([]);

  const createRandomEmoji = useCallback(() => {
    if (!containerRef.current) return;
    
    const emoji = document.createElement('div');
    emoji.className = 'absolute pointer-events-none z-50 animate-emoji-float';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${30 + Math.random() * 40}%`;
    emoji.style.transform = `scale(${0.5 + Math.random()})`;
    
    containerRef.current.appendChild(emoji);
    
    // Remove emoji after animation completes
    const timeoutId = setTimeout(() => {
      if (emoji.parentNode === containerRef.current) {
        containerRef.current.removeChild(emoji);
      }
      
      // Remove from tracking array
      emojisRef.current = emojisRef.current.filter(item => item.element !== emoji);
    }, 3000);
    
    // Track emoji and its timeout
    emojisRef.current.push({ element: emoji, timeoutId });
  }, []);

  const createEmojiAtPosition = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    
    const emoji = document.createElement('div');
    emoji.className = 'absolute pointer-events-none z-50 animate-emoji-float';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${relativeX}px`;
    emoji.style.top = `${relativeY}px`;
    
    containerRef.current.appendChild(emoji);
    
    // Remove emoji after animation completes
    const timeoutId = setTimeout(() => {
      if (emoji.parentNode === containerRef.current) {
        containerRef.current.removeChild(emoji);
      }
      
      // Remove from tracking array
      emojisRef.current = emojisRef.current.filter(item => item.element !== emoji);
    }, 3000);
    
    // Track emoji and its timeout
    emojisRef.current.push({ element: emoji, timeoutId });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      emojisRef.current.forEach(({ timeoutId }) => {
        clearTimeout(timeoutId);
      });
      emojisRef.current = [];
    };
  }, []);

  return { containerRef, createRandomEmoji, createEmojiAtPosition };
}
