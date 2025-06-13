"use client";

import React from 'react';
import { Question } from '@/types/quiz';
import { motion, AnimatePresence } from 'framer-motion';

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
}

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  showFeedback,
  isCorrect,
  selectedAnswer
}: QuizScreenProps) {
  const options = Object.entries(question.options).filter(([, value]) => value);

  return (
    <div className="min-h-screen bg-white">
      {/* Duolingo-style progress bar */}
      <div className="w-full h-4 bg-[#e5e5e5] relative">
        <motion.div 
          className="h-full bg-[#58cc02] relative"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#58cc02] rounded-full shadow-md" />
        </motion.div>
      </div>

      <div className="max-w-xl lg:max-w-3xl mx-auto px-4 lg:px-8 pt-12 pb-32">
        {/* Question with Duolingo styling */}
        <motion.h1 
          key={question.question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-[#3c3c3c] mb-8 lg:mb-12 leading-tight"
        >
          {question.question}
        </motion.h1>

        {/* Options with Duolingo card style */}
        <div className="space-y-3 lg:space-y-4">
          {options.map(([letter, text]) => (
            <motion.button
              key={letter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              onClick={() => !showFeedback && onAnswer(letter)}
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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 ${
              isCorrect ? 'bg-[#d7ffb8]' : 'bg-[#ffdfe0]'
            } border-t-4 ${
              isCorrect ? 'border-[#58cc02]' : 'border-[#ff4b4b]'
            } px-4 py-6`}
          >
            <div className="max-w-xl lg:max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex-1">
                <h2 className={`text-2xl lg:text-3xl font-bold mb-1 ${
                  isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                }`}>
                  {isCorrect ? 'Great job!' : 'Oops, that\'s not right'}
                </h2>
                <p className={`text-sm lg:text-base ${
                  isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                } opacity-90`}>
                  {question.explanation}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className={`ml-4 px-8 lg:px-10 py-3 lg:py-4 rounded-2xl font-bold text-white uppercase tracking-wide shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-[2px] transition-all lg:text-lg ${
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
}