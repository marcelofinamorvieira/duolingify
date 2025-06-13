import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XPData, LevelUpData } from '@/hooks/useXPSystem';
import Confetti from './Confetti';

interface XPBarProps {
  xpData: XPData;
  levelUpAnimation: LevelUpData | null;
  showMilestone?: boolean;
  nextMilestone?: { level: number; xpNeeded: number };
}

export default function XPBar({ xpData, levelUpAnimation, showMilestone = false, nextMilestone }: XPBarProps) {
  const [previousXP, setPreviousXP] = useState(xpData.progressPercentage);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Trigger animations when XP increases
    if (xpData.progressPercentage > previousXP || (xpData.progressPercentage < previousXP && xpData.currentLevel > 1)) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 600);
    }
    setPreviousXP(xpData.progressPercentage);
  }, [xpData.progressPercentage, previousXP, xpData.currentLevel]);

  useEffect(() => {
    if (levelUpAnimation) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  }, [levelUpAnimation]);

  return (
    <>
      <Confetti trigger={showConfetti} />
      
      <div className="w-full max-w-lg mx-auto">
        {/* Level indicator */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div
              animate={pulseAnimation ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-[#58cc02]">Level {xpData.currentLevel}</span>
            </motion.div>
            {showMilestone && nextMilestone && (
              <span className="text-sm text-gray-500">
                ({nextMilestone.xpNeeded} XP to level {nextMilestone.level})
              </span>
            )}
          </div>
          <motion.div
            animate={pulseAnimation ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1"
          >
            <span className="text-lg">⭐</span>
            <span className="font-bold text-[#ffc800]">{xpData.totalXP} XP</span>
          </motion.div>
        </div>

        {/* XP Progress Bar */}
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
            }} />
          </div>

          {/* Progress fill */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#58cc02] to-[#7dd43f] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${xpData.progressPercentage}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
                backgroundSize: '200% 100%'
              }}
            />
          </motion.div>

          {/* XP text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={pulseAnimation ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="font-bold text-white text-sm drop-shadow-md"
            >
              {xpData.xpInCurrentLevel} / {xpData.xpForNextLevel} XP
            </motion.span>
          </div>

          {/* Milestone markers */}
          {[25, 50, 75].map((percentage) => (
            <div
              key={percentage}
              className="absolute top-0 bottom-0 w-0.5 bg-white opacity-20"
              style={{ left: `${percentage}%` }}
            />
          ))}
        </div>

        {/* Level up animation */}
        <AnimatePresence>
          {levelUpAnimation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-3xl font-bold text-[#ffc800] mb-2"
              >
                🎉 LEVEL UP! 🎉
              </motion.div>
              <div className="text-xl font-semibold text-[#58cc02]">
                Welcome to Level {levelUpAnimation.newLevel}!
              </div>
              {levelUpAnimation.reward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-lg text-gray-700"
                >
                  Reward Unlocked: {levelUpAnimation.reward}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}