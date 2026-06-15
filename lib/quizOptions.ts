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

function getPopulatedOptions(question: Question): PopulatedOption[] {
  return OPTION_KEYS
    .map((key) => ({ key, value: question.options[key] }))
    .filter((option): option is PopulatedOption => typeof option.value === 'string' && option.value.length > 0);
}

function buildBalancedTargetKeys(questionCount: number, optionCount: number): OptionKey[] {
  const eligibleKeys = OPTION_KEYS.slice(0, optionCount);
  const balancedKeys: OptionKey[] = [];

  if (eligibleKeys.length === 0) {
    return balancedKeys;
  }

  while (balancedKeys.length < questionCount) {
    balancedKeys.push(...shuffleArray(eligibleKeys));
  }

  return shuffleArray(balancedKeys.slice(0, questionCount));
}

function shuffleQuestionOptions(question: Question, targetCorrectAnswer: OptionKey): Question {
  const populatedOptions = getPopulatedOptions(question);
  const correctOption = populatedOptions.find((option) => option.key === question.correctAnswer);

  if (!correctOption) {
    return {
      ...question,
      options: { ...question.options },
    };
  }

  const eligibleKeys = OPTION_KEYS.slice(0, populatedOptions.length);
  const wrongOptions = shuffleArray(populatedOptions.filter((option) => option.key !== question.correctAnswer));
  const remappedOptions: Question['options'] = {
    [targetCorrectAnswer]: correctOption.value,
  };
  const remainingKeys = shuffleArray(eligibleKeys.filter((key) => key !== targetCorrectAnswer));

  wrongOptions.forEach((option, index) => {
    remappedOptions[remainingKeys[index]] = option.value;
  });

  return {
    ...question,
    options: remappedOptions,
    correctAnswer: targetCorrectAnswer,
  };
}

export function shuffleQuestionsForPass(questions: Question[]): Question[] {
  const targetKeysByOptionCount = new Map<number, OptionKey[]>();
  const groupSizes = new Map<number, number>();

  questions.forEach((question) => {
    const optionCount = getPopulatedOptions(question).length;
    groupSizes.set(optionCount, (groupSizes.get(optionCount) ?? 0) + 1);
  });

  groupSizes.forEach((questionCount, optionCount) => {
    targetKeysByOptionCount.set(optionCount, buildBalancedTargetKeys(questionCount, optionCount));
  });

  return questions.map((question) => {
    const optionCount = getPopulatedOptions(question).length;
    const targetKeys = targetKeysByOptionCount.get(optionCount);
    const targetCorrectAnswer = targetKeys?.pop();

    if (!targetCorrectAnswer) {
      return {
        ...question,
        options: { ...question.options },
      };
    }

    return shuffleQuestionOptions(question, targetCorrectAnswer);
  });
}
