import { useEffect, useRef, useCallback } from 'react';

interface UseAnimationTimerProps {
  duration: number;
  onUpdate: (timeLeft: number) => void;
  onComplete?: () => void;
  isRunning: boolean;
}

export function useAnimationTimer({ 
  duration, 
  onUpdate, 
  onComplete, 
  isRunning 
}: UseAnimationTimerProps) {
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(duration);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const timeLeft = Math.max(0, duration - Math.floor(elapsed / 1000));

    // Only update if the second has changed
    if (timeLeft !== lastUpdateRef.current) {
      lastUpdateRef.current = timeLeft;
      onUpdate(timeLeft);

      if (timeLeft === 0 && onComplete) {
        onComplete();
        return;
      }
    }

    if (isRunning && timeLeft > 0) {
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [duration, onUpdate, onComplete, isRunning]);

  useEffect(() => {
    if (isRunning) {
      // Reset refs when starting
      startTimeRef.current = null;
      lastUpdateRef.current = duration;
      rafIdRef.current = requestAnimationFrame(animate);
    } else if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isRunning, animate, duration]);

  const reset = useCallback(() => {
    startTimeRef.current = null;
    lastUpdateRef.current = duration;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, [duration]);

  return { reset };
}