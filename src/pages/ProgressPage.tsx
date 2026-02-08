import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Trophy,
  XCircle,
  Trash2,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { DOMAINS, EXAM_CONFIG } from '../data/domains';
import { loadProgress, clearAllProgress } from '../utils/storage';
import { allQuestions } from '../data/questions';
import { formatTime } from '../utils/quiz';
import { useState } from 'react';

export default function ProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(loadProgress);
  const results = progress.results;

  const domainColorMap: Record<number, string> = {
    1: 'text-domain1',
    2: 'text-domain2',
    3: 'text-domain3',
    4: 'text-domain4',
    5: 'text-domain5',
  };

  // Calculate per-domain accuracy from all results
  const domainStats: Record<number, { total: number; correct: number }> = {};
  results.forEach((r) => {
    for (const [d, bd] of Object.entries(r.domainBreakdown)) {
      const did = Number(d);
      if (!domainStats[did]) domainStats[did] = { total: 0, correct: 0 };
      domainStats[did].total += bd.total;
      domainStats[did].correct += bd.correct;
    }
  });

  const mockResults = results.filter((r) => r.mode === 'mock');
  const avgMockScore =
    mockResults.length > 0
      ? Math.round(mockResults.reduce((a, r) => a + r.score, 0) / mockResults.length)
      : null;

  function handleClear() {
    if (window.confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      clearAllProgress();
      setProgress(loadProgress());
    }
  }

  if (results.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <BarChart3 className="mx-auto text-gray-300" size={48} />
        <h2 className="text-xl font-bold text-aws-squid-ink">No Progress Yet</h2>
        <p className="text-gray-500">
          Complete some study sessions or mock tests to see your progress here.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => navigate('/study')}
            className="flex items-center gap-2 px-5 py-2.5 bg-domain1 text-white font-medium rounded-lg cursor-pointer"
          >
            <BookOpen size={16} />
            Start Studying
          </button>
          <button
            onClick={() => navigate('/mock-test')}
            className="flex items-center gap-2 px-5 py-2.5 bg-aws-orange text-white font-medium rounded-lg cursor-pointer"
          >
            <Trophy size={16} />
            Take Mock Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-domain2" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-aws-squid-ink">Progress</h1>
            <p className="text-sm text-gray-500">{results.length} sessions completed</p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded cursor-pointer"
        >
          <Trash2 size={12} />
          Clear All
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-aws-squid-ink">{results.length}</div>
          <div className="text-xs text-gray-500">Sessions</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-aws-squid-ink">
            {Object.keys(progress.questionsAttempted).length} / {allQuestions.length}
          </div>
          <div className="text-xs text-gray-500">Questions Seen</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-aws-squid-ink">{mockResults.length}</div>
          <div className="text-xs text-gray-500">Mock Tests</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-aws-squid-ink">
            {avgMockScore !== null ? `${avgMockScore}%` : '—'}
          </div>
          <div className="text-xs text-gray-500">Avg Mock Score</div>
        </div>
      </div>

      {/* Domain Performance */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-aws-squid-ink mb-4 flex items-center gap-2">
          <TrendingUp size={18} />
          Domain Performance
        </h3>
        <div className="space-y-3">
          {DOMAINS.map((d) => {
            const stats = domainStats[d.id];
            const pct = stats && stats.total > 0
              ? Math.round((stats.correct / stats.total) * 100)
              : null;
            return (
              <div key={d.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={`font-medium ${domainColorMap[d.id]}`}>
                    {d.icon} D{d.id}: {d.title}
                  </span>
                  <span className="text-gray-600">
                    {pct !== null
                      ? `${stats!.correct}/${stats!.total} (${pct}%)`
                      : 'No data'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  {pct !== null && (
                    <div
                      className={`h-2 rounded-full transition-all ${
                        pct >= EXAM_CONFIG.passingScore ? 'bg-correct' : 'bg-incorrect'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-aws-squid-ink mb-4">Recent Sessions</h3>
        <div className="space-y-2">
          {[...results].reverse().slice(0, 20).map((r) => {
            const date = new Date(r.date);
            const domainInfo = r.domain ? DOMAINS.find((d) => d.id === r.domain) : null;
            return (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {r.score >= EXAM_CONFIG.passingScore ? (
                    <Trophy className="text-correct" size={16} />
                  ) : (
                    <XCircle className="text-incorrect" size={16} />
                  )}
                  <div>
                    <span className="text-sm font-medium text-aws-squid-ink">
                      {r.mode === 'mock' ? '🎯 Mock Exam' : `📖 Study${domainInfo ? ` — D${domainInfo.id}` : ''}`}
                    </span>
                    <p className="text-xs text-gray-400">
                      {date.toLocaleDateString()} — {formatTime(r.timeTaken)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-bold ${
                      r.score >= EXAM_CONFIG.passingScore ? 'text-correct' : 'text-incorrect'
                    }`}
                  >
                    {r.score}%
                  </span>
                  <p className="text-xs text-gray-400">
                    {r.correctCount}/{r.totalQuestions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
