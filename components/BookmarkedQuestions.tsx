"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Question } from '@/types/quiz';

interface BookmarkedQuestionsProps {
  onSelectQuestion?: (question: Question) => void;
  onClose: () => void;
}

export default function BookmarkedQuestions({ onSelectQuestion, onClose }: BookmarkedQuestionsProps) {
  const { bookmarks, removeBookmark, clearAllBookmarks, getBookmarksByCategory } = useBookmarks();
  const bookmarksByCategory = getBookmarksByCategory();

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">Bookmarked Questions</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="mb-4">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h2>
            <p className="text-gray-500">Bookmark questions during the quiz to review them later</p>
          </div>
        ) : (
          <>
            {/* Clear all button */}
            <div className="flex justify-between items-center mt-4 mb-6">
              <p className="text-sm text-gray-600">{bookmarks.length} bookmarked question{bookmarks.length !== 1 ? 's' : ''}</p>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all bookmarks?')) {
                    clearAllBookmarks();
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>

            {/* Questions by category */}
            {Object.entries(bookmarksByCategory).map(([category, questions]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
                <div className="space-y-3">
                  {questions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-base font-medium text-gray-900 flex-1 pr-4">
                          {question.question}
                        </h4>
                        <button
                          onClick={() => removeBookmark(question.id)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                          aria-label="Remove bookmark"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Correct Answer:</span> {question.correctAnswer} - {question.options[question.correctAnswer as keyof typeof question.options]}
                      </p>
                      <p className="text-sm text-gray-500 italic">{question.explanation}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                          {question.difficulty}
                        </span>
                        {onSelectQuestion && (
                          <button
                            onClick={() => onSelectQuestion(question)}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Practice this question
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}