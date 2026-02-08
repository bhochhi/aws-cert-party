import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, BarChart3, Target } from 'lucide-react';
import { DOMAINS, EXAM_CONFIG } from '../data/domains';
import { allQuestions } from '../data/questions';
import { loadProgress } from '../utils/storage';

export default function HomePage() {
  const progress = loadProgress();
  const totalAttempted = Object.keys(progress.questionsAttempted).length;
  const totalQuestions = allQuestions.length;
  const lastResult = progress.results.length > 0
    ? progress.results[progress.results.length - 1]
    : null;

  const domainColors: Record<number, string> = {
    1: 'border-domain1 bg-domain1/10',
    2: 'border-domain2 bg-domain2/10',
    3: 'border-domain3 bg-domain3/10',
    4: 'border-domain4 bg-domain4/10',
    5: 'border-domain5 bg-domain5/10',
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-aws-squid-ink mb-2">
          AWS Certified AI Practitioner
        </h1>
        <p className="text-lg text-gray-500 mb-1">AIF-C01 Exam Preparation</p>
        <p className="text-sm text-gray-400">
          {totalQuestions} practice questions across {DOMAINS.length} domains
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <Target className="mx-auto mb-2 text-aws-orange" size={24} />
          <div className="text-2xl font-bold text-aws-squid-ink">{totalQuestions}</div>
          <div className="text-xs text-gray-500">Total Questions</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <BookOpen className="mx-auto mb-2 text-domain1" size={24} />
          <div className="text-2xl font-bold text-aws-squid-ink">{totalAttempted}</div>
          <div className="text-xs text-gray-500">Questions Attempted</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <GraduationCap className="mx-auto mb-2 text-domain2" size={24} />
          <div className="text-2xl font-bold text-aws-squid-ink">{progress.results.length}</div>
          <div className="text-xs text-gray-500">Tests Taken</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <BarChart3 className="mx-auto mb-2 text-correct" size={24} />
          <div className="text-2xl font-bold text-aws-squid-ink">
            {lastResult ? `${lastResult.score}%` : '—'}
          </div>
          <div className="text-xs text-gray-500">Last Score</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/study"
          className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border-2 border-domain1/30 hover:border-domain1 transition-colors no-underline group"
        >
          <div className="bg-domain1/10 rounded-lg p-3 group-hover:bg-domain1/20 transition-colors">
            <BookOpen className="text-domain1" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-aws-squid-ink">Study Mode</h3>
            <p className="text-sm text-gray-500">
              Practice by domain with instant feedback & explanations
            </p>
          </div>
        </Link>
        <Link
          to="/mock-test"
          className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border-2 border-aws-orange/30 hover:border-aws-orange transition-colors no-underline group"
        >
          <div className="bg-aws-orange/10 rounded-lg p-3 group-hover:bg-aws-orange/20 transition-colors">
            <GraduationCap className="text-aws-orange" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-aws-squid-ink">Mock Test</h3>
            <p className="text-sm text-gray-500">
              {EXAM_CONFIG.totalQuestions} questions, {EXAM_CONFIG.timeLimit / 60000} min timer — simulate the real exam
            </p>
          </div>
        </Link>
      </div>

      {/* Domain Overview */}
      <div>
        <h2 className="text-xl font-bold text-aws-squid-ink mb-4">Exam Domains</h2>
        <div className="space-y-3">
          {DOMAINS.map((domain) => {
            const domainQs = allQuestions.filter((q) => q.domain === domain.id);
            return (
              <div
                key={domain.id}
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${domainColors[domain.id]}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{domain.icon}</span>
                    <div>
                      <h3 className="font-semibold text-aws-squid-ink text-sm">
                        Domain {domain.id}: {domain.title}
                      </h3>
                      <p className="text-xs text-gray-500">{domain.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-aws-squid-ink">
                      {domain.percentage}%
                    </span>
                    <p className="text-xs text-gray-400">{domainQs.length} questions</p>
                  </div>
                </div>
                {/* Exam weight bar */}
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-current opacity-60"
                    style={{ width: `${domain.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Passing info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
        <p className="text-sm text-amber-800">
          <strong>Passing score:</strong> {EXAM_CONFIG.passingScore}% — 
          You need to answer at least {Math.ceil(EXAM_CONFIG.totalQuestions * EXAM_CONFIG.passingScore / 100)} out of {EXAM_CONFIG.totalQuestions} questions correctly.
          The exam duration is {EXAM_CONFIG.timeLimit / 60000} minutes.
        </p>
      </div>
    </div>
  );
}
