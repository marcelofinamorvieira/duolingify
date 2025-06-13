"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { animationConfig, withGPUAcceleration } from '@/lib/animationConfig';

interface HeaderProps {
  lives: number;
  streak: number;
  score: number;
  progress: string;
  onClose?: () => void;
  title?: string;
  onBack?: () => void;
}

const Header = React.memo(function Header({ lives, streak, score, onClose, title, onBack }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-[#e5e5e5] z-50">
      <div className="max-w-xl lg:max-w-5xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Close/Back button (Duolingo style) */}
        <motion.button 
          whileHover={{ scale: 1.1, transition: { duration: animationConfig.duration.fast } }}
          whileTap={{ scale: 0.95, transition: { duration: animationConfig.duration.instant } }}
          style={withGPUAcceleration()}
          onClick={onBack || onClose}
          className="p-2 -m-2 text-[#afafaf] hover:text-[#3c3c3c] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {onBack ? (
              <path d="M15 18l-6-6 6-6" />
            ) : (
              <path d="M18 6L6 18M6 6l12 12" />
            )}
          </svg>
        </motion.button>
        
        {/* Title or Lives in center */}
        {title ? (
          <h1 className="text-xl lg:text-2xl font-bold text-[#3c3c3c]">{title}</h1>
        ) : (
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex items-center gap-1"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.05, ...animationConfig.springFast }}
                  style={withGPUAcceleration()}
                  className={`w-7 h-7 ${i < lives ? '' : 'opacity-30'}`}
                >
                  <svg viewBox="0 0 24 24" fill={i < lives ? "#ff4b4b" : "#e5e5e5"}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        
        {/* Streak and XP */}
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 bg-[#fff3d0] px-3 py-1 rounded-full"
            >
              <span className="text-[#ffc800] font-bold">🔥 {streak}</span>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 text-[#ffc800] font-bold"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0l2.5 7.5H20l-6.25 4.5L16.25 20 10 15.5 3.75 20l2.5-8L0 7.5h7.5z"/>
            </svg>
            <span>{score}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
});

export default Header;