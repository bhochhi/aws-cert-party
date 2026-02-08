import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Play, AlertTriangle } from 'lucide-react';
import { getActiveQuestions } from '../data/questions';
import { DOMAINS, EXAM_CONFIG } from '../data/domains';
import { getMockTestQuestions, calculateResult } from '../utils/quiz';
import { addResult, recordAttempt, loadActivePackIds } from '../utils/storage';
import QuizEngine from '../components/QuizEngine';
import ResultsView from '../components/ResultsView';
import type { QuizResult } from '../types';

export default function MockTestPage() {
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const activeQuestions = getActiveQuestions(loadActivePackIds());
  const [questions] = useState(() => getMockTestQuestions(activeQuestions));
  const lowPool = activeQuestions.length < EXAM_CONFIG.totalQuestions;

  function handleComplete(answers: Record<string, number[]>, timeTaken: number) {
    const quizResult = calculateResult(questions, answers, 'mock', Date.now() - timeTaken);
    addResult(quizResult);
    questions.forEach((q) => recordAttempt(q.id));
    setResult(quizResult);
  }

  if (result) {
    return (
      <ResultsView
        result={result}
        questions={questions}
        onRetry={() => {
          setResult(null);
          setTestStarted(false);
        }}
        onHome={() => navigate('/')}
      />
    );
  }

  if (testStarted) {
    return (
      <div>
        <div className="mb-4 text-center">
          <span className="text-xs font-medium text-white bg-red-500 px-3 py-1 rounded-full">
            🎯 Mock Exam in Progress
          </span>
        </div>
        <QuizEngine
          questions={questions}
          mode="mock"
          timeLimit={EXAM_CONFIG.timeLimit}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="text-aws-orange" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-aws-squid-ink">Mock Exam</h1>
          <p className="text-sm text-gray-500">Simulate the real AIF-C01 exam</p>
        </div>
      </div>

      {/* Exam info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-aws-squid-ink">Exam Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500">Questions</span>
            <p className="font-bold text-aws-squid-ink text-lg">{EXAM_CONFIG.totalQuestions}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500">Time Limit</span>
            <p className="font-bold text-aws-squid-ink text-lg">{EXAM_CONFIG.timeLimit / 60000} min</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500">Passing Score</span>
            <p className="font-bold text-aws-squid-ink text-lg">{EXAM_CONFIG.passingScore}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500">Format</span>
            <p className="font-bold text-aws-squid-ink text-lg">Multiple Choice</p>
          </div>
        </div>

        <h4 className="font-semibold text-aws-squid-ink text-sm mt-4">Domain Distribution</h4>
        <div className="space-y-2">
          {DOMAINS.map((d) => (
            <div key={d.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {d.icon} D{d.id}: {d.title}
              </span>
              <span className="text-gray-500 font-medium">
                {EXAM_CONFIG.domainWeights[d.id]} Qs ({d.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Before you start:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>The timer starts immediately — you have {EXAM_CONFIG.timeLimit / 60000} minutes</li>
            <li>You cannot pause the timer once started</li>
            <li>You can navigate between questions and flag them for review</li>
            <li>Answers are NOT revealed until you submit the test</li>
            <li>The test auto-submits when time expires</li>
          </ul>
        </div>
      </div>

      {lowPool && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-red-800">
            <p className="font-semibold">Low question pool</p>
            <p className="text-xs mt-1">
              Your active packs only have {activeQuestions.length} questions, but the mock
              exam needs {EXAM_CONFIG.totalQuestions}. Some domains may have fewer
              questions than the target weight. Consider enabling more packs.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setTestStarted(true)}
        className="w-full flex items-center justify-center gap-2 bg-aws-orange hover:bg-aws-orange-dark text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors cursor-pointer"
      >
        <Play size={22} />
        Start Mock Exam
      </button>
    </div>
  );
}
