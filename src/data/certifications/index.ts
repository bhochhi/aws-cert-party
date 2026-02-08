import type { CertificationConfig, QuestionPack, Question } from '../../types';
import aifC01 from './aif-c01/config';

/* ── Registry ────────────────────────────────────────────────── */

export const CERTIFICATIONS: CertificationConfig[] = [aifC01];

export function getCertification(id: string): CertificationConfig | undefined {
  return CERTIFICATIONS.find((c) => c.id === id);
}

/* ── Question loading (cert-scoped via Vite glob) ────────────── */

/**
 * All JSON question packs across ALL certifications, discovered at build time.
 * Path convention: ./{certId}/questions/domain{N}/packFile.json
 */
const modules = import.meta.glob<{
  name: string;
  description?: string;
  questions: Omit<Question, 'packId'>[];
}>('./**/questions/domain*/**/*.json', { eager: true });

interface ParsedPath {
  certId: string;
  domain: number;
  packId: string;
}

function parsePath(path: string): ParsedPath | null {
  // e.g. "./aif-c01/questions/domain1/core-fundamentals.json"
  const match = path.match(/^\.\/([^/]+)\/questions\/domain(\d+)\/(.+)\.json$/);
  if (!match) return null;
  return {
    certId: match[1],
    domain: Number(match[2]),
    packId: `${match[1]}/domain${match[2]}/${match[3]}`,
  };
}

/** All packs grouped by certification id. */
const packsByCert: Record<string, QuestionPack[]> = {};

for (const [path, mod] of Object.entries(modules)) {
  const parsed = parsePath(path);
  if (!parsed) continue;

  const questions: Question[] = mod.questions.map((q) => ({
    ...q,
    packId: parsed.packId,
  }));

  const pack: QuestionPack = {
    id: parsed.packId,
    name: mod.name,
    domain: parsed.domain,
    description: mod.description,
    questions,
  };

  if (!packsByCert[parsed.certId]) packsByCert[parsed.certId] = [];
  packsByCert[parsed.certId].push(pack);
}

// sort each cert's packs by domain then name
for (const packs of Object.values(packsByCert)) {
  packs.sort((a, b) => a.domain - b.domain || a.name.localeCompare(b.name));
}

/** Get all question packs for a given certification. */
export function getPacksForCert(certId: string): QuestionPack[] {
  return packsByCert[certId] ?? [];
}

/** Get packs for a specific domain within a certification. */
export function getPacksByDomain(certId: string, domain: number): QuestionPack[] {
  return getPacksForCert(certId).filter((p) => p.domain === domain);
}

/** Flat list of all questions for a certification. */
export function getAllQuestions(certId: string): Question[] {
  return getPacksForCert(certId).flatMap((p) => p.questions);
}

/** Get only questions from currently active packs for a certification. */
export function getActiveQuestions(
  certId: string,
  activePackIds: string[],
): Question[] {
  const packs = getPacksForCert(certId);
  if (activePackIds.length === 0) return packs.flatMap((p) => p.questions);
  const ids = new Set(activePackIds);
  return packs.filter((p) => ids.has(p.id)).flatMap((p) => p.questions);
}
