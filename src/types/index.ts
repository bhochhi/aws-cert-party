/* ── Core question types ─────────────────────────── */

export interface Question {
  id: string;
  domain: number;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices — supports multi-select
  explanation: string;
  tags?: string[];
  packId?: string; // injected by loader — which pack this question belongs to
}

export interface QuestionPack {
  id: string; // e.g. "domain1/core-fundamentals"
  name: string;
  domain: number;
  description?: string;
  questions: Question[];
}

/* ── Certification types ─────────────────────────── */

export interface DomainInfo {
  id: number;
  title: string;
  subtitle: string;
  percentage: number;
  color: string;
  icon: string;
  topics: string[];
}

export interface ExamConfig {
  totalQuestions: number;
  timeLimit: number; // ms
  passingScore: number; // percentage
  domainWeights: Record<number, number>;
}

export interface CertificationConfig {
  id: string;          // e.g. "aif-c01"
  name: string;        // e.g. "AWS Certified AI Practitioner"
  code: string;        // e.g. "AIF-C01"
  description: string;
  icon: string;        // emoji
  color: string;       // tailwind color class stem, e.g. "aws-orange"
  domains: DomainInfo[];
  examConfig: ExamConfig;
}

/* ── Quiz / progress types ───────────────────────── */

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number[]>; // questionId → selected option indices
  flagged: Set<string>;
  startTime: number;
  timeLimit?: number; // ms — only for mock tests
}

export interface QuizResult {
  id: string;
  date: number;
  mode: 'study' | 'mock';
  domain?: number;
  certId?: string; // which certification this result belongs to
  totalQuestions: number;
  correctCount: number;
  score: number; // percentage
  timeTaken: number; // ms
  domainBreakdown: Record<number, { total: number; correct: number }>;
  answers: Record<string, { selected: number[]; correct: number[]; isCorrect: boolean }>;
}

export interface UserProgress {
  results: QuizResult[];
  flaggedQuestions: string[];
  questionsAttempted: Record<string, number>; // questionId → times attempted
}
