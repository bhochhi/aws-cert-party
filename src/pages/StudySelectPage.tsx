import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';
import { DOMAINS } from '../data/domains';
import { getActiveQuestions } from '../data/questions';
import { loadActivePackIds } from '../utils/storage';
import type { Domain } from '../types';

export default function StudySelectPage() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const activeQuestions = getActiveQuestions(loadActivePackIds());

  const domainColors: Record<number, string> = {
    1: 'border-domain1 ring-domain1',
    2: 'border-domain2 ring-domain2',
    3: 'border-domain3 ring-domain3',
    4: 'border-domain4 ring-domain4',
    5: 'border-domain5 ring-domain5',
  };

  const selectedDomainInfo = DOMAINS.find((d) => d.id === selectedDomain);
  const availableQuestions = selectedDomain
    ? activeQuestions.filter((q) => q.domain === selectedDomain).length
    : 0;

  function handleStart() {
    if (!selectedDomain) return;
    navigate(`/study/${selectedDomain}?count=${questionCount}`);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="text-domain1" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-aws-squid-ink">Study Mode</h1>
          <p className="text-sm text-gray-500">Select a domain to practice</p>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="space-y-3">
        {DOMAINS.map((domain) => {
          const count = activeQuestions.filter((q) => q.domain === domain.id).length;
          const isSelected = selectedDomain === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`w-full text-left bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer ${
                isSelected
                  ? `${domainColors[domain.id]} ring-2`
                  : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{domain.icon}</span>
                  <div>
                    <h3 className="font-semibold text-aws-squid-ink">
                      Domain {domain.id}: {domain.title}
                    </h3>
                    <p className="text-xs text-gray-500">{domain.subtitle} — {domain.percentage}% of exam</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-medium">{count} Qs</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Question Count & Start */}
      {selectedDomain && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-aws-squid-ink">
            {selectedDomainInfo?.icon} {selectedDomainInfo?.title}
          </h3>

          <div>
            <label className="text-sm text-gray-600 block mb-2">
              Number of questions (max {availableQuestions})
            </label>
            <div className="flex gap-2">
              {[10, 20, availableQuestions].filter((v, i, a) => a.indexOf(v) === i).map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    questionCount === n
                      ? 'bg-aws-orange text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {n === availableQuestions ? `All (${n})` : n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 bg-aws-orange hover:bg-aws-orange-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer"
          >
            <Play size={18} />
            Start Studying
          </button>

          <div className="text-xs text-gray-400 space-y-1">
            <p>• Immediate feedback after each question</p>
            <p>• Detailed explanations for every answer</p>
            <p>• Flag questions for review</p>
          </div>
        </div>
      )}
    </div>
  );
}
