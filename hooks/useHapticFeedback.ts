import { useCallback } from 'react';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

export function useHapticFeedback() {
  const vibrate = useCallback((type: HapticType) => {
    // Check if the Vibration API is supported
    if (!('vibrate' in navigator)) {
      return;
    }

    // Different vibration patterns for different feedback types
    const patterns: Record<HapticType, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10], // Short-pause-short (like Duolingo's success)
      warning: [20, 20, 20], // Three quick pulses
      error: [50, 100, 50], // Longer pattern for errors
      selection: 5, // Very light tap for selections
    };

    navigator.vibrate(patterns[type]);
  }, []);

  return { vibrate };
}