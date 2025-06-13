import { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/quiz';

interface BookmarkedQuestion extends Question {
  bookmarkedAt: string;
  category: string;
  difficulty: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('quiz-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quiz-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback((question: Question) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.id === question.id);
      
      if (isBookmarked) {
        // Remove bookmark
        return prev.filter((b) => b.id !== question.id);
      } else {
        // Add bookmark
        const bookmarkedQuestion: BookmarkedQuestion = {
          ...question,
          bookmarkedAt: new Date().toISOString(),
        };
        return [...prev, bookmarkedQuestion];
      }
    });
  }, []);

  const isBookmarked = useCallback((questionId: number) => {
    return bookmarks.some((b) => b.id === questionId);
  }, [bookmarks]);

  const removeBookmark = useCallback((questionId: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== questionId));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  const getBookmarksByCategory = useCallback(() => {
    const categories: Record<string, BookmarkedQuestion[]> = {};
    
    bookmarks.forEach((bookmark) => {
      if (!categories[bookmark.category]) {
        categories[bookmark.category] = [];
      }
      categories[bookmark.category].push(bookmark);
    });
    
    return categories;
  }, [bookmarks]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    clearAllBookmarks,
    getBookmarksByCategory,
    bookmarkCount: bookmarks.length,
  };
}