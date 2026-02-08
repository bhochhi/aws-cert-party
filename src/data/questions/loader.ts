import type { Domain, Question, QuestionPack } from '../../types';

/**
 * Auto-discover all JSON question packs via Vite's import.meta.glob.
 * Any .json file inside domain1/, domain2/, … domain5/ folders is loaded.
 */
const modules = import.meta.glob<{
  name: string;
  description?: string;
  questions: Omit<Question, 'packId'>[];
}>('./domain*/**/*.json', { eager: true });

function domainFromPath(path: string): Domain | null {
  const match = path.match(/\/domain(\d)\//);
  if (!match) return null;
  const n = Number(match[1]);
  if (n >= 1 && n <= 5) return n as Domain;
  return null;
}

function packIdFromPath(path: string): string {
  // "./domain1/core-fundamentals.json" → "domain1/core-fundamentals"
  return path
    .replace(/^\.\//, '')
    .replace(/\.json$/, '');
}

/** All discovered question packs, sorted by domain then name. */
export const allQuestionPacks: QuestionPack[] = Object.entries(modules)
  .reduce<QuestionPack[]>((acc, [path, mod]) => {
    const domain = domainFromPath(path);
    if (!domain) return acc;

    const id = packIdFromPath(path);
    const questions: Question[] = mod.questions.map((q) => ({
      ...q,
      packId: id,
    }));

    acc.push({
      id,
      name: mod.name,
      domain,
      description: mod.description,
      questions,
    });
    return acc;
  }, [])
  .sort((a, b) => a.domain - b.domain || a.name.localeCompare(b.name));

/** Get packs for a specific domain. */
export function getPacksByDomain(domain: Domain): QuestionPack[] {
  return allQuestionPacks.filter((p) => p.domain === domain);
}

/** Flat list of ALL questions across all packs (backward-compatible). */
export const allQuestions: Question[] = allQuestionPacks.flatMap((p) => p.questions);

/** Get only questions from the currently active packs. */
export function getActiveQuestions(activePackIds: string[]): Question[] {
  if (activePackIds.length === 0) return allQuestions; // nothing selected → all
  const ids = new Set(activePackIds);
  return allQuestionPacks
    .filter((p) => ids.has(p.id))
    .flatMap((p) => p.questions);
}
