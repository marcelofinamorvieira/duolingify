import { useCallback, useEffect, useRef } from 'react';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

export function useHapticFeedback() {
  const isIOSRef = useRef(false);
  const hasHapticEngineRef = useRef(false);

  useEffect(() => {
    // Detect iOS devices
    isIOSRef.current = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Check for Haptic Engine support (iOS 13+)
    if (isIOSRef.current && 'ontouchstart' in window) {
      // iOS 13+ has haptic feedback through Taptic Engine
      // We can't directly access it, but we can provide visual feedback
      hasHapticEngineRef.current = true;
    }
  }, []);

  const vibrate = useCallback((type: HapticType) => {
    // Try standard Vibration API (works on Android)
    if ('vibrate' in navigator) {
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

      try {
        navigator.vibrate(patterns[type]);
      } catch (error) {
        console.debug('Vibration failed:', error);
      }
    }
    
    // For iOS devices, we could trigger visual feedback instead
    // Since iOS doesn't support the Vibration API
    if (isIOSRef.current && hasHapticEngineRef.current) {
      // You could dispatch a custom event here for visual feedback
      // For example: window.dispatchEvent(new CustomEvent('haptic-feedback', { detail: type }));
      // Then listen to this event in your components to show visual feedback
      
      // For now, we'll just log that haptic was attempted on iOS
      console.debug('Haptic feedback attempted on iOS:', type);
    }
  }, []);

  return { vibrate, isIOS: isIOSRef.current };
}