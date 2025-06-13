"use client";

import React, { useState, useEffect } from 'react';
import { Question, GameState, UserAnswer, Score } from '@/types/quiz';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSound } from '@/hooks/useSound';
import Header from './Header';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import ReviewScreen from './ReviewScreen';

interface QuizProps {
  questions: Question[];
}

type Screen = 'start' | 'quiz' | 'results' | 'review';


export default function Quiz({ questions }: QuizProps) {
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
    timer: null,
    timeLimit: 60,
    soundEnabled: true,
    lives: 3,
    maxLives: 3,
    questionsAnswered: 0
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [scores, setScores] = useLocalStorage<Score[]>('networkQuizScores', []);
  const soundEffects = useSound(gameState.soundEnabled);

  // Enable sounds on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundEffects.enableSounds();
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [soundEffects]);

  // Timer effect
  useEffect(() => {
    if (currentScreen === 'quiz' && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentScreen, showFeedback]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !showFeedback && currentScreen === 'quiz') {
      handleAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showFeedback, currentScreen]);


  const startQuiz = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setGameState(prev => ({
      ...prev,
      questions: shuffledQuestions,
      totalQuestions: shuffledQuestions.length,
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
    setTimeLeft(60);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
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
    const timeSpent = 60 - timeLeft;
    
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
    } else {
      newStreak = 0;
      newLives -= 1;
      soundEffects.playFailure();
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
  };

  const nextQuestion = () => {
    if (gameState.lives <= 0 || gameState.currentQuestionIndex >= gameState.questions.length - 1) {
      endQuiz();
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      setTimeLeft(60);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      }
    soundEffects.playClick();
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
    } else {
      soundEffects.playLevelComplete();
    }

    setCurrentScreen('results');
  };

  const toggleSound = () => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    soundEffects.playClick();
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progress = `${gameState.questionsAnswered}/${gameState.totalQuestions}`;

  return (
    <div className="min-h-screen bg-white flex flex-col lg:max-w-6xl lg:mx-auto lg:shadow-xl">
      {currentScreen !== 'start' && (
        <Header
          lives={gameState.lives}
          streak={gameState.streak}
          score={gameState.score}
          progress={progress}
          onClose={() => setCurrentScreen('start')}
        />
      )}

      <main className={`flex-1 ${currentScreen === 'quiz' ? '' : 'flex items-center justify-center'} ${currentScreen !== 'start' ? 'pt-16' : ''} lg:pt-20`}>
          {currentScreen === 'start' && (
            <StartScreen
              onStart={startQuiz}
              scores={scores}
              soundEnabled={gameState.soundEnabled}
              onToggleSound={toggleSound}
            />
          )}

          {currentScreen === 'quiz' && currentQuestion && (
            <QuizScreen
              question={currentQuestion}
              questionNumber={gameState.currentQuestionIndex + 1}
              totalQuestions={gameState.totalQuestions}
              timeLeft={timeLeft}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              selectedAnswer={selectedAnswer}
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
              score={gameState.score}
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