import { useCallback, useEffect, useRef } from 'react';

interface SoundEffects {
  playClick: () => void;
  playSuccess: () => void;
  playFailure: () => void;
  playLevelComplete: () => void;
  playGameOver: () => void;
  playStreak: () => void;
  playPerfect: () => void;
  playBookmark: () => void;
  enableSounds: () => void;
}

export function useSound(enabled: boolean): SoundEffects {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsEnabledRef = useRef(false);
  const hasUserInteracted = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.error('Failed to create AudioContext:', error);
      }
    }
  }, []);

  const playToneInternal = (context: AudioContext, frequency: number, duration: number, type: OscillatorType, volume: number) => {
    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      
      // Improved envelope with attack and decay
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.02); // Slower attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
      
      // Clean up after playing
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    if (!enabled) return;
    
    // Don't play sound if user hasn't interacted yet
    if (!hasUserInteracted.current) {
      return;
    }
    
    if (!soundsEnabledRef.current && enabled) {
      // Auto-enable sounds if not yet enabled
      soundsEnabledRef.current = true;
    }
    
    initAudioContext();
    const context = audioContextRef.current;
    if (!context) return;
    
    // Resume context if suspended (common on mobile)
    if (context.state === 'suspended') {
      context.resume().then(() => {
        // Retry playing the tone after resuming
        playToneInternal(context, frequency, duration, type, volume);
      }).catch(console.error);
      return;
    }
    
    playToneInternal(context, frequency, duration, type, volume);
  }, [enabled, initAudioContext]);

  const playSequence = useCallback((notes: Array<{frequency: number, duration: number, delay: number}>) => {
    notes.forEach(note => {
      setTimeout(() => playTone(note.frequency, note.duration), note.delay * 1000);
    });
  }, [playTone]);

  const enableSounds = useCallback(async () => {
    soundsEnabledRef.current = true;
    hasUserInteracted.current = true;
    initAudioContext();
    
    const context = audioContextRef.current;
    if (!context) return;
    
    // Create and play a silent buffer to unlock audio on mobile
    try {
      // Create an empty buffer
      const buffer = context.createBuffer(1, 1, 22050);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
      
      // Resume context if suspended
      if (context.state === 'suspended') {
        await context.resume();
      }
      
      // Play a tiny click to confirm audio is working
      setTimeout(() => {
        if (enabled) {
          playTone(1000, 0.03, 'sine', 0.1);
        }
      }, 100);
    } catch (error) {
      console.error('Failed to enable sounds:', error);
    }
  }, [initAudioContext, playTone, enabled]);

  // Simple, pleasant sounds
  const playClick = useCallback(() => {
    playTone(1000, 0.05, 'sine', 0.2);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playSequence([
      { frequency: 523, duration: 0.1, delay: 0 },    // C5
      { frequency: 659, duration: 0.1, delay: 0.1 },  // E5
      { frequency: 784, duration: 0.1, delay: 0.2 },  // G5
      { frequency: 1047, duration: 0.2, delay: 0.3 }  // C6
    ]);
  }, [playSequence]);

  const playFailure = useCallback(() => {
    playSequence([
      { frequency: 440, duration: 0.15, delay: 0 },   // A4
      { frequency: 392, duration: 0.15, delay: 0.1 }, // G4
      { frequency: 349, duration: 0.2, delay: 0.2 }   // F4
    ]);
  }, [playSequence]);

  const playLevelComplete = useCallback(() => {
    playSequence([
      { frequency: 523, duration: 0.1, delay: 0 },     // C5
      { frequency: 523, duration: 0.1, delay: 0.1 },   // C5
      { frequency: 523, duration: 0.1, delay: 0.2 },   // C5
      { frequency: 659, duration: 0.15, delay: 0.3 },  // E5
      { frequency: 784, duration: 0.15, delay: 0.45 }, // G5
      { frequency: 1047, duration: 0.3, delay: 0.6 }   // C6
    ]);
  }, [playSequence]);

  const playGameOver = useCallback(() => {
    playSequence([
      { frequency: 392, duration: 0.2, delay: 0 },    // G4
      { frequency: 349, duration: 0.2, delay: 0.2 },  // F4
      { frequency: 330, duration: 0.2, delay: 0.4 },  // E4
      { frequency: 294, duration: 0.3, delay: 0.6 }   // D4
    ]);
  }, [playSequence]);

  const playStreak = useCallback(() => {
    playSequence([
      { frequency: 880, duration: 0.08, delay: 0 },     // A5
      { frequency: 1174, duration: 0.08, delay: 0.08 }, // D6
      { frequency: 1397, duration: 0.1, delay: 0.16 },  // F6
      { frequency: 1760, duration: 0.15, delay: 0.24 }  // A6
    ]);
  }, [playSequence]);

  const playPerfect = useCallback(() => {
    playSequence([
      { frequency: 1047, duration: 0.08, delay: 0 },    // C6
      { frequency: 1319, duration: 0.08, delay: 0.05 }, // E6
      { frequency: 1568, duration: 0.08, delay: 0.1 },  // G6
      { frequency: 2093, duration: 0.08, delay: 0.15 }, // C7
      { frequency: 2637, duration: 0.08, delay: 0.2 },  // E7
      { frequency: 3136, duration: 0.2, delay: 0.25 }   // G7
    ]);
  }, [playSequence]);

  const playBookmark = useCallback(() => {
    playSequence([
      { frequency: 659, duration: 0.08, delay: 0 },     // E5
      { frequency: 988, duration: 0.08, delay: 0.08 },  // B5
      { frequency: 1319, duration: 0.12, delay: 0.16 }  // E6
    ]);
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
    playStreak,
    playPerfect,
    playBookmark,
    enableSounds
  };
}