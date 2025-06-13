"use client";

import React from 'react';
import { Score } from '@/types/quiz';
import { motion } from 'framer-motion';
import { useBookmarks } from '@/hooks/useBookmarks';
import BookmarkedQuestions from './BookmarkedQuestions';
import { useXPSystem } from '@/hooks/useXPSystem';
import XPBar from './XPBar';

interface StartScreenProps {
  onStart: () => void;
  scores: Score[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalQuestions: number;
  unseenQuestionsCount: number;
  onResetProgress?: () => void;
}

const StartScreen = React.memo(function StartScreen({ onStart, scores, soundEnabled, onToggleSound, totalQuestions, unseenQuestionsCount, onResetProgress }: StartScreenProps) {
  const [mounted, setMounted] = React.useState(false);
  const [showBookmarks, setShowBookmarks] = React.useState(false);
  const { bookmarkCount } = useBookmarks();
  const { xpData, levelUpAnimation, getNextMilestone } = useXPSystem();
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const lessonsCompleted = mounted ? scores.length : 0;
  
  if (showBookmarks) {
    return <BookmarkedQuestions onClose={() => setShowBookmarks(false)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ willChange: 'opacity' }}
      className="w-full max-w-lg lg:max-w-2xl mx-auto px-4 py-8 flex flex-col h-full"
    >
      {/* Duolingo-style header */}
      <div className="flex justify-between items-center mb-8 lg:mb-0">
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
          onClick={onToggleSound}
          className="p-2 -m-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#afafaf" strokeWidth="2">
            {soundEnabled ? (
              <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M23 9l-6 6m0-6l6 6" />
              </>
            )}
          </svg>
        </motion.div>
        
        <div className="flex items-center gap-3">
          {/* Bookmarks button */}
          {mounted && bookmarkCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookmarks(true)}
              className="relative p-2 -m-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            </motion.button>
          )}
          {/* XP Display moved to XPBar component */}
        </div>
      </div>

      {/* XP Progress Bar */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 lg:mb-12 px-4"
        >
          <XPBar 
            xpData={xpData} 
            levelUpAnimation={levelUpAnimation}
            showMilestone={true}
            nextMilestone={getNextMilestone()}
          />
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 lg:space-y-12">
        {/* Lesson icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
          style={{ willChange: 'transform' }}
          className="relative"
        >
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[#1cb0f6] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-6xl lg:text-7xl">🌐</span>
          </div>
          {mounted && lessonsCompleted > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-2 -right-2 bg-[#ffc800] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg"
            >
              {lessonsCompleted}
            </motion.div>
          )}
        </motion.div>

        {/* Title and description */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#3c3c3c]">
            Network Basics
          </h1>
          <p className="text-[#afafaf] text-lg lg:text-xl">
            Master computer networking concepts
          </p>
          <div className="flex items-center justify-center gap-4 text-sm lg:text-base text-[#afafaf]">
            <span className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4b4b">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              3 lives
            </span>
            <span>•</span>
            <span>{totalQuestions} questions</span>
            {unseenQuestionsCount > 0 && (
              <>
                <span>•</span>
                <span className="text-[#58cc02] font-medium">{unseenQuestionsCount} new</span>
              </>
            )}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
          onClick={onStart}
          className="bg-[#58cc02] hover:bg-[#58a700] text-white px-12 lg:px-16 py-4 lg:py-5 rounded-2xl font-bold uppercase tracking-wide shadow-[0_4px_0_#46a302] active:shadow-[0_2px_0_#46a302] active:translate-y-[2px] transition-all text-lg lg:text-xl"
        >
          START
        </motion.button>
        
        {/* Reset progress button - only show if there are seen questions */}
        {mounted && unseenQuestionsCount < totalQuestions && onResetProgress && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
            onClick={onResetProgress}
            className="text-[#afafaf] hover:text-[#3c3c3c] text-sm font-medium transition-colors"
          >
            Reset question progress
          </motion.button>
        )}
      </div>
    </motion.div>
  );
});

export default StartScreen;