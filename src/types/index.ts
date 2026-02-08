export interface Question {
  id: string;
  domain: Domain;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices — supports multi-select
  explanation: string;
  tags?: string[];
}

export type Domain = 1 | 2 | 3 | 4 | 5;

export interface DomainInfo {
  id: Domain;
  title: string;
  subtitle: string;
  percentage: number;
  color: string;
  icon: string;
  topics: string[];
}

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
  domain?: Domain;
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
