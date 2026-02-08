import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCertification } from '../context/CertificationContext';
import { getStudyQuestions, calculateResult } from '../utils/quiz';
import { addResult, recordAttempt } from '../utils/storage';
import QuizEngine from '../components/QuizEngine';
import ResultsView from '../components/ResultsView';
import { useState } from 'react';
import type { QuizResult } from '../types';

export default function StudyPage() {
  const { domain } = useParams<{ domain: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResult | null>(null);
  const { certId, domains, activeQuestions } = useCertification();

  const domainNum = Number(domain);
  const count = Number(searchParams.get('count')) || 10;
  const domainInfo = domains.find((d) => d.id === domainNum);

  if (!domainInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Invalid domain. Please select a domain from the study page.</p>
        <button
          onClick={() => navigate('/study')}
          className="mt-4 px-4 py-2 bg-aws-orange text-white rounded-lg cursor-pointer"
        >
          Go to Study
        </button>
      </div>
    );
  }

  const [questions] = useState(() => getStudyQuestions(activeQuestions, domainNum, count));

  function handleComplete(answers: Record<string, number[]>, timeTaken: number) {
    const quizResult = calculateResult(questions, answers, 'study', Date.now() - timeTaken, domainNum, certId);
    addResult(certId, quizResult);
    questions.forEach((q) => recordAttempt(certId, q.id));
    setResult(quizResult);
  }

  if (result) {
    return (
      <ResultsView
        result={result}
        questions={questions}
        onRetry={() => {
          setResult(null);
          navigate(`/study/${domain}?count=${count}`);
          window.location.reload();
        }}
        onHome={() => navigate('/')}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 text-center">
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Study Mode — Domain {domainNum}: {domainInfo.title}
        </span>
      </div>
      <QuizEngine
        questions={questions}
        mode="study"
        onComplete={handleComplete}
      />
    </div>
  );
}
