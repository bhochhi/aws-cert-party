import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  CertificationConfig,
  DomainInfo,
  ExamConfig,
  Question,
  QuestionPack,
} from '../types';
import {
  CERTIFICATIONS,
  getCertification,
  getPacksForCert,
  getPacksByDomain as getPacksByDomainForCert,
  getAllQuestions,
  getActiveQuestions as getActiveQuestionsForCert,
} from '../data/certifications';
import { loadActiveCertId, saveActiveCertId, loadActivePackIds } from '../utils/storage';

/* ── Context value shape ─────────────────────────────────────── */

interface CertificationContextValue {
  /** Currently active certification (never undefined once provided). */
  cert: CertificationConfig;
  /** Shorthand accessors */
  certId: string;
  domains: DomainInfo[];
  examConfig: ExamConfig;
  /** All available certifications */
  certifications: CertificationConfig[];
  /** Switch to a different certification */
  switchCert: (id: string) => void;
  /** Question data for the active cert */
  allPacks: QuestionPack[];
  getPacksByDomain: (domain: number) => QuestionPack[];
  allQuestions: Question[];
  activeQuestions: Question[];
  /** Refresh active questions (call after pack selection changes) */
  refreshQuestions: () => void;
}

const CertificationContext = createContext<CertificationContextValue | null>(null);

/* ── Provider ────────────────────────────────────────────────── */

export function CertificationProvider({ children }: { children: ReactNode }) {
  const [certId, setCertId] = useState<string>(() => {
    const saved = loadActiveCertId();
    // validate that saved id still exists
    if (saved && getCertification(saved)) return saved;
    return CERTIFICATIONS[0].id;
  });

  const [questionVersion, setQuestionVersion] = useState(0);

  const cert = getCertification(certId)!;

  const switchCert = useCallback((id: string) => {
    if (getCertification(id)) {
      setCertId(id);
      saveActiveCertId(id);
      setQuestionVersion((v) => v + 1);
    }
  }, []);

  const refreshQuestions = useCallback(() => {
    setQuestionVersion((v) => v + 1);
  }, []);

  const value = useMemo<CertificationContextValue>(() => {
    // read pack selection fresh each time questionVersion changes
    void questionVersion;
    const activePackIds = loadActivePackIds(certId);
    return {
      cert,
      certId,
      domains: cert.domains,
      examConfig: cert.examConfig,
      certifications: CERTIFICATIONS,
      switchCert,
      allPacks: getPacksForCert(certId),
      getPacksByDomain: (domain: number) => getPacksByDomainForCert(certId, domain),
      allQuestions: getAllQuestions(certId),
      activeQuestions: getActiveQuestionsForCert(certId, activePackIds),
      refreshQuestions,
    };
  }, [certId, cert, switchCert, refreshQuestions, questionVersion]);

  return (
    <CertificationContext.Provider value={value}>
      {children}
    </CertificationContext.Provider>
  );
}

/* ── Hook ────────────────────────────────────────────────────── */

export function useCertification(): CertificationContextValue {
  const ctx = useContext(CertificationContext);
  if (!ctx) {
    throw new Error('useCertification must be used within a <CertificationProvider>');
  }
  return ctx;
}
