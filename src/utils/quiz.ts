import type { ExamConfig, Question, QuizResult } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getStudyQuestions(
  allQuestions: Question[],
  domain: number,
  count?: number
): Question[] {
  const domainQs = allQuestions.filter((q) => q.domain === domain);
  const shuffled = shuffleArray(domainQs);
  return count ? shuffled.slice(0, count) : shuffled;
}

export function getMockTestQuestions(
  allQuestions: Question[],
  examConfig: ExamConfig,
): Question[] {
  const selected: Question[] = [];
  const weights = examConfig.domainWeights;

  for (const [domain, count] of Object.entries(weights)) {
    const domainQs = allQuestions.filter((q) => q.domain === Number(domain));
    const shuffled = shuffleArray(domainQs);
    selected.push(...shuffled.slice(0, count));
  }

  return shuffleArray(selected);
}

export function isCorrect(selected: number[], correct: number[]): boolean {
  if (selected.length !== correct.length) return false;
  const sortedA = [...selected].sort();
  const sortedB = [...correct].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

export function calculateResult(
  questions: Question[],
  answers: Record<string, number[]>,
  mode: 'study' | 'mock',
  startTime: number,
  domain?: number,
  certId?: string,
): QuizResult {
  let correctCount = 0;
  const domainBreakdown: Record<number, { total: number; correct: number }> = {};
  const answerDetails: QuizResult['answers'] = {};

  for (const q of questions) {
    if (!domainBreakdown[q.domain]) {
      domainBreakdown[q.domain] = { total: 0, correct: 0 };
    }
    domainBreakdown[q.domain].total++;

    const selected = answers[q.id] || [];
    const correct = isCorrect(selected, q.correctAnswers);
    if (correct) {
      correctCount++;
      domainBreakdown[q.domain].correct++;
    }

    answerDetails[q.id] = {
      selected,
      correct: q.correctAnswers,
      isCorrect: correct,
    };
  }

  return {
    id: crypto.randomUUID(),
    date: Date.now(),
    mode,
    domain,
    certId,
    totalQuestions: questions.length,
    correctCount,
    score: Math.round((correctCount / questions.length) * 100),
    timeTaken: Date.now() - startTime,
    domainBreakdown,
    answers: answerDetails,
  };
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
