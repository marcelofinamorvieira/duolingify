import { useCallback } from 'react';

export type FeedbackType = 'success' | 'error' | 'click';

export function useVisualFeedback() {
  const showFeedback = useCallback((type: FeedbackType) => {
    // Create a visual pulse effect element
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'fixed inset-0 pointer-events-none z-50';
    
    // Different colors for different feedback types
    const colors = {
      success: 'rgba(88, 204, 2, 0.15)', // Green
      error: 'rgba(255, 75, 75, 0.15)',   // Red
      click: 'rgba(28, 176, 246, 0.1)'   // Blue
    };
    
    feedbackEl.style.backgroundColor = colors[type];
    feedbackEl.style.transition = 'opacity 0.3s ease-out';
    
    document.body.appendChild(feedbackEl);
    
    // Trigger the fade out
    requestAnimationFrame(() => {
      feedbackEl.style.opacity = '0';
    });
    
    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(feedbackEl);
    }, 300);
  }, []);

  return { showFeedback };
}