"use client";

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Question } from '@/types/quiz';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useSound } from '@/hooks/useSound';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  selectedAnswer: string | null;
  soundEnabled: boolean;
}

const QuizScreen = React.memo(function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  showFeedback,
  isCorrect,
  selectedAnswer,
  soundEnabled
}: QuizScreenProps) {
  const options = useMemo(() => 
    Object.entries(question.options).filter(([, value]) => value),
    [question.options]
  );
  // const [isMobile, setIsMobile] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { playBookmark, enableSounds } = useSound(soundEnabled);
  const { vibrate } = useHapticFeedback();
  const [bookmarkAnimating, setBookmarkAnimating] = useState(false);
  const correctAnswerRef = useRef<HTMLButtonElement>(null);
  
  // Performance optimizations
  const springConfig = useMemo(() => ({ 
    type: "spring" as const, 
    damping: 25, 
    stiffness: 400,
    mass: 0.5
  }), []);

  // Auto-scroll to correct answer on mobile when wrong answer is selected
  useEffect(() => {
    if (showFeedback && !isCorrect && correctAnswerRef.current) {
      // Delay to allow animations to start
      setTimeout(() => {
        correctAnswerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [showFeedback, isCorrect]);
  
  const progressTransition = useMemo(() => ({ 
    duration: 0.3, 
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] // Custom cubic-bezier for smoother animation
  }), []);
  const [showParticles, setShowParticles] = useState(false);
  const [prevQuestionNumber, setPrevQuestionNumber] = useState(questionNumber);

  // Removed mobile check - not used after optimization

  // Detect when progress bar should grow and trigger particles
  useEffect(() => {
    if (questionNumber > prevQuestionNumber) {
      setShowParticles(true);
      setPrevQuestionNumber(questionNumber);
      // Hide particles after animation completes
      const timer = setTimeout(() => {
        setShowParticles(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [questionNumber, prevQuestionNumber]);

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Duolingo-style progress bar */}
      <div className="w-full px-6 lg:px-10 pt-4 pb-2">
        <div className="w-full h-5 md:h-4 bg-[#e5e5e5] rounded-full relative overflow-hidden">
          <motion.div 
            className="h-full bg-[#58cc02] relative rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={progressTransition}
            style={{ willChange: 'width' }}
          >
            {/* Particle burst effect when progress bar grows */}
            <AnimatePresence>
              {showParticles && (
                <div className="absolute right-0 top-0 h-full w-32 pointer-events-none overflow-visible">
                  {/* Create 20 particles for a more impressive burst */}
                  {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.5;
                    const velocity = 30 + Math.random() * 40;
                    const size = 2 + Math.random() * 3;
                    
                    return (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute bg-[#58cc02] rounded-full"
                        initial={{ 
                          x: 0, 
                          y: 10,
                          opacity: 1,
                          scale: 0
                        }}
                        animate={{ 
                          x: Math.cos(angle) * velocity,
                          y: Math.sin(angle) * velocity + 20,
                          opacity: [1, 1, 0],
                          scale: [0, 1.2, 0.8]
                        }}
                        exit={{
                          opacity: 0
                        }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.005,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          right: '2px',
                          willChange: 'transform, opacity',
                          transform: 'translateZ(0)', // Force GPU acceleration
                          backfaceVisibility: 'hidden',
                          perspective: 1000
                        }}
                      />
                    );
                  })}
                  {/* Additional sparkle particles */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute bg-white rounded-full"
                      initial={{ 
                        x: 0, 
                        y: 10,
                        opacity: 0.8,
                        scale: 0
                      }}
                      animate={{ 
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60,
                        opacity: [0.8, 1, 0],
                        scale: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.015,
                        ease: "easeOut"
                      }}
                      style={{
                        width: '3px',
                        height: '3px',
                        right: '2px',
                        willChange: 'transform, opacity',
                        transform: 'translateZ(0)'
                      }}
                    />
                  ))}
                  {/* Glow burst effect */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#58cc02] rounded-full"
                    initial={{
                      opacity: 0.8,
                      scale: 0
                    }}
                    animate={{
                      opacity: [0.8, 0],
                      scale: [0, 2.5]
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    style={{
                      filter: 'blur(10px)',
                      right: '-8px',
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)'
                    }}
                  />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-xl lg:max-w-3xl mx-auto px-4 lg:px-8 pt-8 pb-32 w-full">
        {/* Question with Duolingo styling and bookmark button */}
        <div className="relative">
          <motion.h1 
            key={question.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="text-2xl lg:text-3xl font-bold text-[#3c3c3c] mb-8 lg:mb-12 leading-tight pr-12"
          >
            {question.question}
          </motion.h1>
          
          {/* Bookmark button */}
          <motion.button
            onClick={() => {
              enableSounds(); // Ensure sounds are enabled
              toggleBookmark(question);
              if (soundEnabled) {
                playBookmark();
              }
              vibrate('light');
              setBookmarkAnimating(true);
              setTimeout(() => setBookmarkAnimating(false), 300);
            }}
            className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isBookmarked(question.id) ? "#fbbf24" : "none"}
              stroke={isBookmarked(question.id) ? "#fbbf24" : "#9ca3af"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={bookmarkAnimating ? {
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </motion.svg>
          </motion.button>
        </div>

        {/* Options with Duolingo card style */}
        <div className="space-y-3 lg:space-y-4">
          {options.map(([letter, text]) => (
            <motion.button
              ref={letter === question.correctAnswer ? correctAnswerRef : null}
              key={letter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={!showFeedback ? { scale: 1.02, transition: { duration: 0.1 } } : {}}
              whileTap={!showFeedback ? { scale: 0.98, transition: { duration: 0.05 } } : {}}
              onClick={(event) => {
                if (!showFeedback) {
                  onAnswer(letter);
                  vibrate('selection');
                  // Add visual pulse for devices without haptics
                  const button = event.currentTarget;
                  button.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    button.style.transform = '';
                  }, 100);
                }
              }}
              disabled={showFeedback}
              className={`w-full p-4 lg:p-5 rounded-2xl border-2 transition-all duration-200 text-left font-medium relative overflow-hidden ${
                showFeedback && letter === question.correctAnswer
                  ? 'bg-[#d7ffb8] border-[#58cc02] text-[#58a700]'
                  : showFeedback && letter === selectedAnswer && !isCorrect
                  ? 'bg-[#ffdfe0] border-[#ff4b4b] text-[#ea2b2b]'
                  : selectedAnswer === letter && !showFeedback
                  ? 'border-[#84d8ff] bg-[#ddf4ff] shadow-[0_0_0_2px_#84d8ff]'
                  : 'border-[#e5e5e5] hover:border-[#e5e5e5] bg-white hover:bg-[#f7f7f7]'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {showFeedback && letter === question.correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 w-10 h-10 bg-[#58cc02] rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
              {showFeedback && letter === selectedAnswer && !isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 w-10 h-10 bg-[#ff4b4b] rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✗</span>
                </motion.div>
              )}
              <span className="text-[#3c3c3c] text-lg lg:text-xl">{text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Duolingo-style feedback bottom sheet */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={springConfig}
            style={{ willChange: 'transform' }}
            className={`fixed bottom-0 left-0 right-0 ${
              isCorrect ? 'bg-[#d7ffb8]' : 'bg-[#ffdfe0]'
            } border-t-4 ${
              isCorrect ? 'border-[#58cc02]' : 'border-[#ff4b4b]'
            } px-4 py-4 lg:py-6 safe-area-inset-bottom`}
          >
            <div className="max-w-xl lg:max-w-3xl mx-auto flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 overflow-y-auto max-h-[30vh] lg:max-h-none">
                <h2 className={`text-xl lg:text-3xl font-bold mb-0.5 lg:mb-1 ${
                  isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                }`}>
                  {isCorrect ? 'Great job!' : 'Oops, that\'s not right'}
                </h2>
                <p className={`text-xs lg:text-base ${
                  isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                } opacity-90`}>
                  {question.explanation}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
                onClick={onNext}
                className={`ml-4 px-6 lg:px-10 py-2.5 lg:py-4 rounded-2xl font-bold text-white uppercase tracking-wide shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-[2px] transition-all text-sm lg:text-lg flex-shrink-0 ${
                  isCorrect 
                    ? 'bg-[#58cc02] hover:bg-[#58a700]' 
                    : 'bg-[#ff4b4b] hover:bg-[#ea2b2b]'
                }`}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default QuizScreen;