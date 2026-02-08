import {
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  RotateCcw,
  Home,
  Trophy,
} from 'lucide-react';
import type { Question, QuizResult } from '../types';
import { useCertification } from '../context/CertificationContext';
import { formatTime } from '../utils/quiz';

interface ResultsViewProps {
  result: QuizResult;
  questions: Question[];
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultsView({
  result,
  questions,
  onRetry,
  onHome,
}: ResultsViewProps) {
  const { domains, examConfig } = useCertification();
  const passed = result.score >= examConfig.passingScore;

  const domainColorMap: Record<number, string> = {
    1: 'text-domain1',
    2: 'text-domain2',
    3: 'text-domain3',
    4: 'text-domain4',
    5: 'text-domain5',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score Card */}
      <div
        className={`rounded-xl p-8 text-center ${
          passed
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
            : 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200'
        }`}
      >
        <div className="mb-4">
          {passed ? (
            <Trophy className="mx-auto text-correct" size={48} />
          ) : (
            <XCircle className="mx-auto text-incorrect" size={48} />
          )}
        </div>
        <h2 className="text-3xl font-bold mb-1">
          {result.score}%
        </h2>
        <p
          className={`text-lg font-semibold ${
            passed ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {passed ? '🎉 Passed!' : 'Not Yet — Keep Studying!'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {result.correctCount} of {result.totalQuestions} correct
          {result.mode === 'mock' && ` — Passing: ${examConfig.passingScore}%`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <CheckCircle2 className="mx-auto mb-1 text-correct" size={20} />
          <div className="text-xl font-bold text-aws-squid-ink">{result.correctCount}</div>
          <div className="text-xs text-gray-500">Correct</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <XCircle className="mx-auto mb-1 text-incorrect" size={20} />
          <div className="text-xl font-bold text-aws-squid-ink">
            {result.totalQuestions - result.correctCount}
          </div>
          <div className="text-xs text-gray-500">Incorrect</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Clock className="mx-auto mb-1 text-gray-400" size={20} />
          <div className="text-xl font-bold text-aws-squid-ink">
            {formatTime(result.timeTaken)}
          </div>
          <div className="text-xs text-gray-500">Time Taken</div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-aws-squid-ink mb-4 flex items-center gap-2">
          <BarChart3 size={18} />
          Domain Breakdown
        </h3>
        <div className="space-y-3">
          {domains.map((d) => {
            const breakdown = result.domainBreakdown[d.id];
            if (!breakdown) return null;
            const pct = breakdown.total > 0
              ? Math.round((breakdown.correct / breakdown.total) * 100)
              : 0;
            return (
              <div key={d.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={`font-medium ${domainColorMap[d.id]}`}>
                    {d.icon} D{d.id}: {d.title}
                  </span>
                  <span className="text-gray-600">
                    {breakdown.correct}/{breakdown.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      pct >= examConfig.passingScore ? 'bg-correct' : 'bg-incorrect'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-aws-squid-ink mb-4">
          Question Review
        </h3>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const answerData = result.answers[q.id];
            if (!answerData) return null;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-lg border ${
                  answerData.isCorrect
                    ? 'border-green-200 bg-green-50/50'
                    : 'border-red-200 bg-red-50/50'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {answerData.isCorrect ? (
                    <CheckCircle2 className="text-correct flex-shrink-0 mt-0.5" size={16} />
                  ) : (
                    <XCircle className="text-incorrect flex-shrink-0 mt-0.5" size={16} />
                  )}
                  <p className="text-sm text-gray-800 font-medium">
                    <span className="text-gray-400">Q{idx + 1}.</span> {q.question}
                  </p>
                </div>

                {!answerData.isCorrect && (
                  <div className="ml-6 space-y-1 text-xs">
                    <p className="text-red-700">
                      <strong>Your answer:</strong>{' '}
                      {answerData.selected.length > 0
                        ? answerData.selected
                            .map((i) => `${String.fromCharCode(65 + i)}. ${q.options[i]}`)
                            .join(', ')
                        : '(not answered)'}
                    </p>
                    <p className="text-green-700">
                      <strong>Correct:</strong>{' '}
                      {answerData.correct
                        .map((i) => `${String.fromCharCode(65 + i)}. ${q.options[i]}`)
                        .join(', ')}
                    </p>
                  </div>
                )}

                <p className="ml-6 mt-2 text-xs text-gray-600 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pb-8">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-aws-orange hover:bg-aws-orange-dark text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <Home size={16} />
          Home
        </button>
      </div>
    </div>
  );
}
