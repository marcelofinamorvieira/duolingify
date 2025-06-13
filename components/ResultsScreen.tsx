"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ResultsScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number;
  score: number;
  message: string;
  onReview: () => void;
  onPlayAgain: () => void;
}

const ResultsScreen = React.memo(function ResultsScreen({
  correctAnswers,
  totalQuestions,
  accuracy,
  timeSpent,
  score,
  message,
  onReview,
  onPlayAgain
}: ResultsScreenProps) {
  const xpEarned = Math.round(score / 10);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-lg lg:max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center"
    >
      {/* Duolingo-style celebration */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center space-y-8 w-full"
      >
        {/* Trophy/Celebration Icon */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ willChange: 'transform' }}
          className="inline-block"
        >
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[#ffc800] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-6xl lg:text-7xl">🏆</span>
          </div>
        </motion.div>

        {/* Completion message */}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#3c3c3c]">
            Lesson Complete!
          </h1>
          <p className="text-[#afafaf] text-lg lg:text-xl">
            {message}
          </p>
        </div>

        {/* XP Earned */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#fff3d0] rounded-2xl p-6 lg:p-8 space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffc800">
              <path d="M12 2l2.5 7.5H22l-6.25 4.5L18.25 22 12 17.5 5.75 22l2.5-8L2 9.5h7.5z"/>
            </svg>
            <span className="text-4xl lg:text-5xl font-bold text-[#ffc800]">+{xpEarned} XP</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#3c3c3c]">{accuracy}%</p>
              <p className="text-sm text-[#afafaf]">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3c3c3c]">{correctAnswers}/{totalQuestions}</p>
              <p className="text-sm text-[#afafaf]">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3c3c3c]">{Math.floor(timeSpent / totalQuestions)}s</p>
              <p className="text-sm text-[#afafaf]">Avg time</p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
            onClick={onPlayAgain}
            className="w-full bg-[#58cc02] hover:bg-[#58a700] text-white px-8 py-4 lg:py-5 rounded-2xl font-bold uppercase tracking-wide shadow-[0_4px_0_#46a302] active:shadow-[0_2px_0_#46a302] active:translate-y-[2px] transition-all lg:text-lg"
          >
            CONTINUE
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
            onClick={onReview}
            className="w-full text-[#1cb0f6] font-bold px-6 py-3"
          >
            REVIEW MISTAKES
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default ResultsScreen;