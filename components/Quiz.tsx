"use client";

import React, { useState, useEffect } from 'react';
import { Question, GameState, UserAnswer, Score } from '@/types/quiz';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSound } from '@/hooks/useSound';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import Header from './Header';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import ReviewScreen from './ReviewScreen';

interface QuizProps {
  questions: Question[];
  onQuestionsChange?: (questions: Question[]) => void;
}

type Screen = 'start' | 'quiz' | 'results' | 'review';


export default function Quiz({ questions, onQuestionsChange }: QuizProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    allQuestions: questions,
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    userAnswers: [],
    startTime: null,
    questionStartTime: null,
    timeSpent: 0,
    soundEnabled: true,
    lives: 3,
    maxLives: 3,
    questionsAnswered: 0
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [scores, setScores] = useLocalStorage<Score[]>('networkQuizScores', []);
  const [seenQuestionIds, setSeenQuestionIds] = useLocalStorage<number[]>('networkQuizSeenQuestions', []);
  const soundEffects = useSound(gameState.soundEnabled);
  const { vibrate } = useHapticFeedback();

  // Enable sounds on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundEffects.enableSounds();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [soundEffects]);



  const startQuiz = () => {
    // Separate unseen and seen questions
    const unseenQuestions = questions.filter(q => !seenQuestionIds.includes(q.id));
    const seenQuestions = questions.filter(q => seenQuestionIds.includes(q.id));
    
    // Shuffle both arrays separately
    const shuffledUnseen = [...unseenQuestions].sort(() => Math.random() - 0.5);
    const shuffledSeen = [...seenQuestions].sort(() => Math.random() - 0.5);
    
    // Prioritize unseen questions first, then seen questions
    const prioritizedQuestions = [...shuffledUnseen, ...shuffledSeen];
    
    setGameState(prev => ({
      ...prev,
      questions: prioritizedQuestions,
      totalQuestions: prioritizedQuestions.length,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      correctAnswers: 0,
      userAnswers: [],
      startTime: Date.now(),
      lives: 3,
      questionsAnswered: 0
    }));
    setCurrentScreen('quiz');
    setShowFeedback(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    // Ensure sounds are enabled on start
    soundEffects.enableSounds();
    soundEffects.playClick();
  };

  const calculatePoints = (timeSpent: number) => {
    if (timeSpent <= 5) return 100;
    if (timeSpent <= 10) return 80;
    if (timeSpent <= 15) return 60;
    if (timeSpent <= 20) return 40;
    return 20;
  };

  const handleAnswer = (answer: string | null) => {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const correct = answer === question.correctAnswer;
    const timeSpent = gameState.questionStartTime 
      ? Math.floor((Date.now() - gameState.questionStartTime) / 1000)
      : 0;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);

    const userAnswer: UserAnswer = {
      questionIndex: gameState.currentQuestionIndex,
      question,
      selectedAnswer: answer,
      isCorrect: correct,
      timeSpent
    };

    let newScore = gameState.score;
    let newStreak = gameState.streak;
    let newLives = gameState.lives;
    let newCorrectAnswers = gameState.correctAnswers;

    if (correct) {
      const points = calculatePoints(timeSpent);
      newScore += points;
      newStreak += 1;
      newCorrectAnswers += 1;
      soundEffects.playSuccess();
      vibrate('success');
      
      // Play streak sound for streaks of 3 or more
      if (newStreak >= 3 && newStreak % 3 === 0) {
        setTimeout(() => {
          soundEffects.playStreak();
          vibrate('medium');
        }, 500);
      }
    } else {
      newStreak = 0;
      newLives -= 1;
      soundEffects.playFailure();
      vibrate('error');
    }

    setGameState(prev => ({
      ...prev,
      score: newScore,
      streak: newStreak,
      lives: newLives,
      correctAnswers: newCorrectAnswers,
      userAnswers: [...prev.userAnswers, userAnswer],
      questionsAnswered: prev.questionsAnswered + 1
    }));
    
    // Mark this question as seen
    if (!seenQuestionIds.includes(question.id)) {
      setSeenQuestionIds(prev => [...prev, question.id]);
    }
  };

  const nextQuestion = () => {
    if (gameState.lives <= 0 || gameState.currentQuestionIndex >= gameState.questions.length - 1) {
      endQuiz();
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        questionStartTime: Date.now()
      }));
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      }
    soundEffects.playClick();
    vibrate('light');
  };

  const endQuiz = () => {
    const totalTime = Math.floor((Date.now() - (gameState.startTime || 0)) / 1000);
    const accuracy = gameState.questionsAnswered > 0 
      ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100)
      : 0;

    // Add score
    const newScore: Score = {
      score: gameState.score,
      correctAnswers: gameState.correctAnswers,
      totalQuestions: gameState.questionsAnswered,
      accuracy,
      timeSpent: totalTime,
      date: new Date().toISOString()
    };

    const updatedScores = [...scores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setScores(updatedScores);
    
    setGameState(prev => ({
      ...prev,
      timeSpent: totalTime
    }));

    if (gameState.lives <= 0) {
      soundEffects.playGameOver();
      vibrate('heavy');
    } else {
      soundEffects.playLevelComplete();
      vibrate('success');
      
      // Play perfect score sound if they got all questions right
      if (gameState.correctAnswers === gameState.questionsAnswered) {
        setTimeout(() => {
          soundEffects.playPerfect();
          vibrate('success');
        }, 1000);
      }
    }

    setCurrentScreen('results');
  };

  const toggleSound = () => {
    const newSoundEnabled = !gameState.soundEnabled;
    setGameState(prev => ({ ...prev, soundEnabled: newSoundEnabled }));
    
    // Always enable the sound system when toggling
    soundEffects.enableSounds();
    
    if (newSoundEnabled) {
      // Play a click sound to confirm it's working
      setTimeout(() => soundEffects.playClick(), 100);
    }
    vibrate('light');
  };
  
  const resetQuestionProgress = () => {
    setSeenQuestionIds([]);
    soundEffects.playClick();
    vibrate('light');
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progress = `${gameState.questionsAnswered}/${gameState.totalQuestions}`;

  return (
    <div className="h-screen bg-white flex flex-col lg:max-w-5xl lg:mx-auto lg:shadow-xl overflow-hidden">
      {currentScreen !== 'start' && (
        <Header
          lives={gameState.lives}
          streak={gameState.streak}
          score={gameState.score}
          progress={progress}
          onClose={currentScreen === 'review' ? undefined : () => setCurrentScreen('start')}
          onBack={currentScreen === 'review' ? () => setCurrentScreen('results') : undefined}
          title={currentScreen === 'review' ? 'Review Answers' : undefined}
        />
      )}

      <main className={`flex-1 overflow-y-auto ${currentScreen === 'quiz' ? '' : 'flex items-center justify-center'} ${currentScreen !== 'start' ? 'pt-16 lg:pt-20' : ''}`}>
          {currentScreen === 'start' && (
            <StartScreen
              onStart={startQuiz}
              scores={scores}
              soundEnabled={gameState.soundEnabled}
              onToggleSound={toggleSound}
              totalQuestions={questions.length}
              unseenQuestionsCount={questions.filter(q => !seenQuestionIds.includes(q.id)).length}
              onResetProgress={resetQuestionProgress}
              onQuestionsChange={onQuestionsChange}
            />
          )}

          {currentScreen === 'quiz' && currentQuestion && (
            <QuizScreen
              question={currentQuestion}
              questionNumber={gameState.currentQuestionIndex + 1}
              totalQuestions={gameState.totalQuestions}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              selectedAnswer={selectedAnswer}
              soundEnabled={gameState.soundEnabled}
            />
          )}

          {currentScreen === 'results' && (
            <ResultsScreen
              correctAnswers={gameState.correctAnswers}
              totalQuestions={gameState.questionsAnswered}
              accuracy={gameState.questionsAnswered > 0 
                ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100)
                : 0}
              timeSpent={gameState.timeSpent}
              message={
                gameState.lives <= 0
                  ? `Game Over! You ran out of lives after ${gameState.questionsAnswered} questions.`
                  : gameState.questionsAnswered === gameState.totalQuestions
                  ? `Amazing! You completed all ${gameState.totalQuestions} questions!`
                  : `Great job! You answered ${gameState.questionsAnswered} questions.`
              }
              onReview={() => setCurrentScreen('review')}
              onPlayAgain={startQuiz}
            />
          )}

          {currentScreen === 'review' && (
            <ReviewScreen
              userAnswers={gameState.userAnswers}
              onBack={() => setCurrentScreen('results')}
            />
          )}
      </main>

    </div>
  );
}