// Global animation configuration for optimal performance
export const animationConfig = {
  // Spring animations for smooth, natural movement
  spring: {
    type: "spring" as const,
    damping: 25,
    stiffness: 400,
    mass: 0.5,
  },
  
  // Fast spring for quick interactions
  springFast: {
    type: "spring" as const,
    damping: 30,
    stiffness: 500,
    mass: 0.3,
  },
  
  // Easing curves optimized for 60fps+
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    snap: [0.36, 0.07, 0.19, 0.97],
  },
  
  // Duration presets
  duration: {
    instant: 0.05,
    fast: 0.1,
    normal: 0.3,
    slow: 0.5,
  },
  
  // GPU acceleration styles
  gpuAcceleration: {
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
  },
  
  // Reduced motion configuration
  reducedMotion: {
    type: "tween" as const,
    duration: 0.01,
  },
};

// Helper to apply GPU acceleration to any element
export const withGPUAcceleration = (styles: React.CSSProperties = {}): React.CSSProperties => ({
  ...styles,
  ...animationConfig.gpuAcceleration,
});

// Helper to get appropriate animation based on user preferences
export const getMotionPreference = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};