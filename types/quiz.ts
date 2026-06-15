export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number;
  question: string;
  options: Partial<Record<OptionKey, string>>;
  correctAnswer: OptionKey;
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
  selectedAnswer: OptionKey | null;
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
