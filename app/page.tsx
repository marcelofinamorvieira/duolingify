"use client";

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import { Question } from '@/types/quiz';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);

  return <Quiz questions={questions} onQuestionsChange={setQuestions} />;
}