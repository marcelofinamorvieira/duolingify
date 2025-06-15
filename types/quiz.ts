export interface Question {
  id: number;
  question: string;
  options: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
}

export interface GameState {
  questions: Question[];
  allQuestions: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  correctAnswers: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
  startTime: number | null;
  questionStartTime: number | null;
  timeSpent: number;
  soundEnabled: boolean;
  lives: number;
  maxLives: number;
  questionsAnswered: number;
}

export interface UserAnswer {
  questionIndex: number;
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Score {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number;
  date: string;
}