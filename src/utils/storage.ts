import type { QuizResult, UserProgress } from '../types';

const PREFIX = 'aws-cert-party';
const CERT_KEY = `${PREFIX}-active-cert`;

function progressKey(certId: string): string {
  return `${PREFIX}-progress-${certId}`;
}

function packsKey(certId: string): string {
  return `${PREFIX}-active-packs-${certId}`;
}

/* ── Active Certification ────────────────────────────────────── */

export function loadActiveCertId(): string | null {
  return localStorage.getItem(CERT_KEY);
}

export function saveActiveCertId(certId: string): void {
  localStorage.setItem(CERT_KEY, certId);
}

/* ── Progress (cert-scoped) ──────────────────────────────────── */

export function loadProgress(certId: string): UserProgress {
  try {
    const raw = localStorage.getItem(progressKey(certId));
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

export function saveProgress(certId: string, progress: UserProgress): void {
  localStorage.setItem(progressKey(certId), JSON.stringify(progress));
}

export function addResult(certId: string, result: QuizResult): void {
  const progress = loadProgress(certId);
  progress.results.push(result);
  saveProgress(certId, progress);
}

export function toggleFlagged(certId: string, questionId: string): void {
  const progress = loadProgress(certId);
  const idx = progress.flaggedQuestions.indexOf(questionId);
  if (idx >= 0) {
    progress.flaggedQuestions.splice(idx, 1);
  } else {
    progress.flaggedQuestions.push(questionId);
  }
  saveProgress(certId, progress);
}

export function recordAttempt(certId: string, questionId: string): void {
  const progress = loadProgress(certId);
  progress.questionsAttempted[questionId] =
    (progress.questionsAttempted[questionId] || 0) + 1;
  saveProgress(certId, progress);
}

export function clearAllProgress(certId: string): void {
  localStorage.removeItem(progressKey(certId));
}

/* ── Pack Selection (cert-scoped) ────────────────────────────── */

/** Load active pack IDs. Empty array means "all packs active". */
export function loadActivePackIds(certId: string): string[] {
  try {
    const raw = localStorage.getItem(packsKey(certId));
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    // corrupted
  }
  return []; // default: all active
}

export function saveActivePackIds(certId: string, ids: string[]): void {
  localStorage.setItem(packsKey(certId), JSON.stringify(ids));
}

/** How many questions in a pack has the user seen (attempted ≥ 1 time). */
export function getPackCompletionCount(
  packQuestionIds: string[],
  attempted: Record<string, number>,
): number {
  return packQuestionIds.filter((id) => (attempted[id] || 0) > 0).length;
}
