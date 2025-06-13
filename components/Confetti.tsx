import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

interface ConfettiProps {
  trigger: boolean;
  duration?: number;
  particleCount?: number;
}

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#85c1e9', '#f8b500', '#6c5ce7'];

export default function Confetti({ trigger, duration = 3000, particleCount = 50 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newPieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newPieces.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        velocity: {
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * 5 + 10,
          rotation: (Math.random() - 0.5) * 10
        }
      });
    }
    
    setPieces(newPieces);
    
    const timeout = setTimeout(() => {
      setPieces([]);
    }, duration);
    
    return () => clearTimeout(timeout);
  }, [trigger, duration, particleCount]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            opacity: 1
          }}
          animate={{
            x: piece.x + piece.velocity.x * 100,
            y: window.innerHeight + 50,
            rotate: piece.rotation + piece.velocity.rotation * 100,
            opacity: 0
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: duration / 1000,
            ease: 'easeOut'
          }}
          className="fixed pointer-events-none z-50"
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
    </AnimatePresence>
  );
}