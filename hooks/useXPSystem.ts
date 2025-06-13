import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface XPData {
  totalXP: number;
  currentLevel: number;
  xpInCurrentLevel: number;
  xpForNextLevel: number;
  totalXPForCurrentLevel: number;
  progressPercentage: number;
}

export interface LevelUpData {
  newLevel: number;
  reward?: string;
}

// XP required for each level (exponential growth)
const getXPForLevel = (level: number): number => {
  if (level === 1) return 0;
  // Base XP requirement with exponential growth
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const getTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += getXPForLevel(i);
  }
  return total;
};

export function useXPSystem() {
  const [totalXP, setTotalXP] = useLocalStorage<number>('networkQuizTotalXP', 0);
  const [currentLevel, setCurrentLevel] = useLocalStorage<number>('networkQuizLevel', 1);
  const [xpData, setXPData] = useState<XPData>({
    totalXP: 0,
    currentLevel: 1,
    xpInCurrentLevel: 0,
    xpForNextLevel: 100,
    totalXPForCurrentLevel: 0,
    progressPercentage: 0
  });
  const [levelUpAnimation, setLevelUpAnimation] = useState<LevelUpData | null>(null);

  // Calculate current level and progress
  const calculateXPData = useCallback((xp: number): XPData => {
    let level = 1;
    let remainingXP = xp;
    
    // Find current level
    while (true) {
      const xpForNext = getXPForLevel(level + 1);
      if (remainingXP >= xpForNext) {
        remainingXP -= xpForNext;
        level++;
      } else {
        break;
      }
    }
    
    const xpForNextLevel = getXPForLevel(level + 1);
    const totalXPForCurrentLevel = getTotalXPForLevel(level);
    const progressPercentage = (remainingXP / xpForNextLevel) * 100;
    
    return {
      totalXP: xp,
      currentLevel: level,
      xpInCurrentLevel: remainingXP,
      xpForNextLevel,
      totalXPForCurrentLevel,
      progressPercentage
    };
  }, []);

  // Update XP data when totalXP changes
  useEffect(() => {
    const data = calculateXPData(totalXP);
    setXPData(data);
    
    // Check for level up
    if (data.currentLevel > currentLevel) {
      setCurrentLevel(data.currentLevel);
      setLevelUpAnimation({
        newLevel: data.currentLevel,
        reward: getLevelReward(data.currentLevel)
      });
      
      // Clear animation after delay
      setTimeout(() => setLevelUpAnimation(null), 5000);
    }
  }, [totalXP, currentLevel, calculateXPData, setCurrentLevel]);

  const addXP = useCallback((amount: number) => {
    setTotalXP(prev => prev + amount);
  }, [setTotalXP]);

  const getLevelReward = (level: number): string | undefined => {
    const rewards: Record<number, string> = {
      5: "Speed Demon Badge 🏃",
      10: "Network Novice Title 🌟",
      15: "Protocol Pro Badge 📡",
      20: "Master Networker Title 🏆",
      25: "Elite Hacker Badge 💻",
      30: "Network Guru Title 🧙",
    };
    return rewards[level];
  };

  const getNextMilestone = (): { level: number; xpNeeded: number } => {
    const milestones = [5, 10, 15, 20, 25, 30, 40, 50];
    const nextMilestone = milestones.find(m => m > xpData.currentLevel) || 100;
    
    let xpNeeded = 0;
    for (let i = xpData.currentLevel + 1; i <= nextMilestone; i++) {
      xpNeeded += getXPForLevel(i);
    }
    xpNeeded -= xpData.xpInCurrentLevel;
    
    return { level: nextMilestone, xpNeeded };
  };

  return {
    xpData,
    addXP,
    levelUpAnimation,
    getNextMilestone
  };
}