"use client";

import Quiz from '@/components/Quiz';
import { questions } from '@/data/questions';

export default function Home() {
  return <Quiz questions={questions} />;
}