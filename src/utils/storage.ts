import type { QuizResult, UserProgress } from '../types';

const STORAGE_KEY = 'aws-cert-party-progress';
const PACKS_KEY = 'aws-cert-party-active-packs';

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

/* ── Pack Selection ──────────────────────────────────────────── */

/** Load active pack IDs. Empty array means "all packs active". */
export function loadActivePackIds(): string[] {
  try {
    const raw = localStorage.getItem(PACKS_KEY);
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    // corrupted
  }
  return []; // default: all active
}

export function saveActivePackIds(ids: string[]): void {
  localStorage.setItem(PACKS_KEY, JSON.stringify(ids));
}

/** How many questions in a pack has the user seen (attempted ≥ 1 time). */
export function getPackCompletionCount(
  packQuestionIds: string[],
  attempted: Record<string, number>,
): number {
  return packQuestionIds.filter((id) => (attempted[id] || 0) > 0).length;
}
