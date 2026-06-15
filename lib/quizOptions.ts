import { OptionKey, Question } from '@/types/quiz';

export const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

type PopulatedOption = {
  key: OptionKey;
  value: string;
};

export function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function shuffleQuestionOptions(question: Question): Question {
  const populatedOptions = OPTION_KEYS
    .map((key) => ({ key, value: question.options[key] }))
    .filter((option): option is PopulatedOption => typeof option.value === 'string' && option.value.length > 0);

  const shuffledOptions = shuffleArray(populatedOptions);
  const remappedOptions: Question['options'] = {};
  let remappedCorrectAnswer = question.correctAnswer;

  shuffledOptions.forEach((option, index) => {
    const remappedKey = OPTION_KEYS[index];
    remappedOptions[remappedKey] = option.value;

    if (option.key === question.correctAnswer) {
      remappedCorrectAnswer = remappedKey;
    }
  });

  return {
    ...question,
    options: remappedOptions,
    correctAnswer: remappedCorrectAnswer,
  };
}
