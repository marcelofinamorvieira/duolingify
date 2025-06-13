import { useCallback, useEffect, useRef } from 'react';

interface SoundEffects {
  playClick: () => void;
  playSuccess: () => void;
  playFailure: () => void;
  playLevelComplete: () => void;
  playGameOver: () => void;
  enableSounds: () => void;
}

export function useSound(enabled: boolean): SoundEffects {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsEnabledRef = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    if (!enabled || !soundsEnabledRef.current || !audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      
      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [enabled]);

  const playSequence = useCallback((notes: Array<{frequency: number, duration: number, delay: number}>, type: OscillatorType = 'sine') => {
    notes.forEach(note => {
      setTimeout(() => playTone(note.frequency, note.duration, type), note.delay * 1000);
    });
  }, [playTone]);

  const enableSounds = useCallback(() => {
    initAudioContext();
    soundsEnabledRef.current = true;
  }, [initAudioContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.1, 'sine', 0.2);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playSequence([
      { frequency: 523, duration: 0.1, delay: 0 },    // C5
      { frequency: 659, duration: 0.1, delay: 0.1 },  // E5
      { frequency: 784, duration: 0.1, delay: 0.2 },  // G5
      { frequency: 1047, duration: 0.3, delay: 0.3 }  // C6
    ], 'sine');
  }, [playSequence]);

  const playFailure = useCallback(() => {
    playSequence([
      { frequency: 440, duration: 0.2, delay: 0 },    // A4
      { frequency: 415, duration: 0.2, delay: 0.1 },  // G#4
      { frequency: 392, duration: 0.2, delay: 0.2 },  // G4
      { frequency: 349, duration: 0.4, delay: 0.3 }   // F4
    ], 'sawtooth');
  }, [playSequence]);

  const playLevelComplete = useCallback(() => {
    playSequence([
      { frequency: 523, duration: 0.15, delay: 0 },    // C5
      { frequency: 587, duration: 0.15, delay: 0.15 }, // D5
      { frequency: 659, duration: 0.15, delay: 0.3 },  // E5
      { frequency: 698, duration: 0.15, delay: 0.45 }, // F5
      { frequency: 784, duration: 0.15, delay: 0.6 },  // G5
      { frequency: 880, duration: 0.15, delay: 0.75 }, // A5
      { frequency: 988, duration: 0.15, delay: 0.9 },  // B5
      { frequency: 1047, duration: 0.4, delay: 1.05 }  // C6
    ], 'triangle');
  }, [playSequence]);

  const playGameOver = useCallback(() => {
    playSequence([
      { frequency: 349, duration: 0.3, delay: 0 },    // F4
      { frequency: 330, duration: 0.3, delay: 0.3 },  // E4
      { frequency: 294, duration: 0.3, delay: 0.6 },  // D4
      { frequency: 262, duration: 0.6, delay: 0.9 }   // C4
    ], 'square');
  }, [playSequence]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playClick,
    playSuccess,
    playFailure,
    playLevelComplete,
    playGameOver,
    enableSounds
  };
}