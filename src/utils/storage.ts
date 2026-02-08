import type { QuizResult, UserProgress } from '../types';

const STORAGE_KEY = 'aws-cert-party-progress';

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        ...data,
        flaggedQuestions: data.flaggedQuestions || [],
        questionsAttempted: data.questionsAttempted || {},
      };
    }
  } catch {
    // corrupted — start fresh
  }
  return { results: [], flaggedQuestions: [], questionsAttempted: {} };
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addResult(result: QuizResult): void {
  const progress = loadProgress();
  progress.results.push(result);
  saveProgress(progress);
}

export function toggleFlagged(questionId: string): void {
  const progress = loadProgress();
  const idx = progress.flaggedQuestions.indexOf(questionId);
  if (idx >= 0) {
    progress.flaggedQuestions.splice(idx, 1);
  } else {
    progress.flaggedQuestions.push(questionId);
  }
  saveProgress(progress);
}

export function recordAttempt(questionId: string): void {
  const progress = loadProgress();
  progress.questionsAttempted[questionId] =
    (progress.questionsAttempted[questionId] || 0) + 1;
  saveProgress(progress);
}

export function clearAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
