"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserAnswer } from '@/types/quiz';

interface ReviewScreenProps {
  userAnswers: UserAnswer[];
  onBack: () => void;
}

export default function ReviewScreen({ userAnswers, onBack }: ReviewScreenProps) {
  const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect);
  
  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl lg:max-w-3xl mx-auto px-4 lg:px-8 py-6">
        {/* Summary stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f7f7f7] rounded-2xl p-4 mb-6 flex items-center justify-around"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-[#58cc02]">{userAnswers.filter(a => a.isCorrect).length}</p>
            <p className="text-sm text-[#afafaf]">Correct</p>
          </div>
          <div className="w-px h-12 bg-[#e5e5e5]" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ff4b4b]">{incorrectAnswers.length}</p>
            <p className="text-sm text-[#afafaf]">Incorrect</p>
          </div>
        </motion.div>

        {/* Questions list */}
        <div className="space-y-4">
          {userAnswers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-2 border-[#e5e5e5] rounded-2xl overflow-hidden"
            >
              {/* Question header */}
              <div className={`px-4 py-3 flex items-center justify-between ${
                answer.isCorrect ? 'bg-[#d7ffb8]' : 'bg-[#ffdfe0]'
              }`}>
                <span className="text-sm font-bold text-[#3c3c3c]">
                  Question {index + 1}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  answer.isCorrect ? 'bg-[#58cc02]' : 'bg-[#ff4b4b]'
                }`}>
                  <span className="text-white font-bold">
                    {answer.isCorrect ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {/* Question content */}
              <div className="p-4 space-y-4">
                <p className="text-[#3c3c3c] font-medium lg:text-lg">
                  {answer.question.question}
                </p>

                {/* Answer options */}
                <div className="space-y-2">
                  {/* Your answer */}
                  {answer.selectedAnswer && (
                    <div className={`p-3 rounded-xl border-2 ${
                      answer.isCorrect 
                        ? 'border-[#58cc02] bg-[#d7ffb8]' 
                        : 'border-[#ff4b4b] bg-[#ffdfe0]'
                    }`}>
                      <p className="text-sm text-[#afafaf] mb-1">Your answer:</p>
                      <p className={`font-medium ${
                        answer.isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                      }`}>
                        {answer.selectedAnswer}. {answer.question.options[answer.selectedAnswer as keyof typeof answer.question.options]}
                      </p>
                    </div>
                  )}

                  {/* Correct answer (only show if different) */}
                  {!answer.isCorrect && (
                    <div className="p-3 rounded-xl border-2 border-[#58cc02] bg-[#d7ffb8]">
                      <p className="text-sm text-[#afafaf] mb-1">Correct answer:</p>
                      <p className="font-medium text-[#58a700]">
                        {answer.question.correctAnswer}. {answer.question.options[answer.question.correctAnswer as keyof typeof answer.question.options]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-[#f7f7f7] rounded-xl">
                  <p className="text-sm text-[#3c3c3c]">
                    <span className="font-bold">Explanation:</span> {answer.question.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        </div>
      </div>
      
      {/* Fixed bottom action */}
      <div className="border-t-2 border-[#e5e5e5] bg-white p-4">
        <div className="max-w-xl lg:max-w-3xl mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-full bg-[#58cc02] hover:bg-[#58a700] text-white px-8 py-4 lg:py-5 rounded-2xl font-bold uppercase tracking-wide shadow-[0_4px_0_#46a302] active:shadow-[0_2px_0_#46a302] active:translate-y-[2px] transition-all lg:text-lg"
          >
            DONE
          </motion.button>
        </div>
      </div>
    </div>
  );
}