import { useState } from 'react';
import { Package, CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { DOMAINS } from '../data/domains';
import { allQuestionPacks, getPacksByDomain } from '../data/questions';
import {
  loadActivePackIds,
  saveActivePackIds,
  loadProgress,
  getPackCompletionCount,
} from '../utils/storage';
import type { Domain } from '../types';

export default function QuestionPacksPage() {
  const [activeIds, setActiveIds] = useState<string[]>(loadActivePackIds);
  const [expandedDomain, setExpandedDomain] = useState<Domain | null>(null);
  const progress = loadProgress();

  const allPackIds = allQuestionPacks.map((p) => p.id);
  const isAllActive = activeIds.length === 0; // empty = all

  function toggle(packId: string) {
    let next: string[];

    if (isAllActive) {
      // switching from "all" → deselect this one pack
      next = allPackIds.filter((id) => id !== packId);
    } else if (activeIds.includes(packId)) {
      next = activeIds.filter((id) => id !== packId);
    } else {
      next = [...activeIds, packId];
    }

    // if every pack is selected, normalize to []
    if (next.length === allPackIds.length) next = [];
    setActiveIds(next);
    saveActivePackIds(next);
  }

  function selectAllForDomain(domain: Domain) {
    const domainPackIds = getPacksByDomain(domain).map((p) => p.id);
    let current = isAllActive ? [...allPackIds] : [...activeIds];

    // add all domain packs
    for (const id of domainPackIds) {
      if (!current.includes(id)) current.push(id);
    }

    if (current.length === allPackIds.length) current = [];
    setActiveIds(current);
    saveActivePackIds(current);
  }

  function deselectAllForDomain(domain: Domain) {
    const domainPackIds = new Set(getPacksByDomain(domain).map((p) => p.id));
    let current = isAllActive ? [...allPackIds] : [...activeIds];

    current = current.filter((id) => !domainPackIds.has(id));
    setActiveIds(current);
    saveActivePackIds(current);
  }

  function isPackActive(packId: string): boolean {
    return isAllActive || activeIds.includes(packId);
  }

  function isDomainAllSelected(domain: Domain): boolean {
    const domainPacks = getPacksByDomain(domain);
    return domainPacks.every((p) => isPackActive(p.id));
  }

  function selectAll() {
    setActiveIds([]);
    saveActivePackIds([]);
  }

  function deselectAll() {
    setActiveIds(['__none__']); // sentinel — nothing matches
    saveActivePackIds(['__none__']);
  }

  // count active questions
  const activeQuestionCount = isAllActive
    ? allQuestionPacks.reduce((s, p) => s + p.questions.length, 0)
    : allQuestionPacks
        .filter((p) => activeIds.includes(p.id))
        .reduce((s, p) => s + p.questions.length, 0);

  const domainColors: Record<number, string> = {
    1: 'border-domain1',
    2: 'border-domain2',
    3: 'border-domain3',
    4: 'border-domain4',
    5: 'border-domain5',
  };

  const domainBgColors: Record<number, string> = {
    1: 'bg-domain1/10',
    2: 'bg-domain2/10',
    3: 'bg-domain3/10',
    4: 'bg-domain4/10',
    5: 'bg-domain5/10',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="text-aws-orange" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-aws-squid-ink">Question Packs</h1>
            <p className="text-sm text-gray-500">
              {activeQuestionCount} questions active across{' '}
              {allQuestionPacks.filter((p) => isPackActive(p.id)).length} packs
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-aws-orange/10 text-aws-orange font-medium hover:bg-aws-orange/20 transition-colors cursor-pointer"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Deselect All
          </button>
        </div>
      </div>

      {/* Domain Groups */}
      {DOMAINS.map((domain) => {
        const packs = getPacksByDomain(domain.id);
        if (packs.length === 0) return null;
        const isExpanded = expandedDomain === domain.id;
        const allSelected = isDomainAllSelected(domain.id);
        const domainQuestionCount = packs.reduce((s, p) => s + p.questions.length, 0);
        const domainActiveCount = packs
          .filter((p) => isPackActive(p.id))
          .reduce((s, p) => s + p.questions.length, 0);

        return (
          <div
            key={domain.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 ${domainColors[domain.id]} overflow-hidden`}
          >
            {/* Domain Header */}
            <button
              onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
              className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{domain.icon}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-aws-squid-ink text-sm">
                    Domain {domain.id}: {domain.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {packs.length} pack{packs.length > 1 ? 's' : ''} ·{' '}
                    {domainActiveCount}/{domainQuestionCount} questions active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded Packs */}
            {isExpanded && (
              <div className="border-t border-gray-100 px-4 pb-4">
                {/* Domain select/deselect all */}
                <div className="flex gap-2 justify-end py-2">
                  <button
                    onClick={() => selectAllForDomain(domain.id)}
                    disabled={allSelected}
                    className="text-xs px-2 py-1 rounded text-aws-orange hover:bg-aws-orange/10 disabled:opacity-40 cursor-pointer disabled:cursor-default transition-colors"
                  >
                    Select all
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => deselectAllForDomain(domain.id)}
                    disabled={!packs.some((p) => isPackActive(p.id))}
                    className="text-xs px-2 py-1 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-default transition-colors"
                  >
                    Deselect all
                  </button>
                </div>

                {/* Pack Cards */}
                <div className="space-y-2">
                  {packs.map((pack) => {
                    const active = isPackActive(pack.id);
                    const seen = getPackCompletionCount(
                      pack.questions.map((q) => q.id),
                      progress.questionsAttempted,
                    );
                    const total = pack.questions.length;
                    const pct = total > 0 ? Math.round((seen / total) * 100) : 0;

                    return (
                      <button
                        key={pack.id}
                        onClick={() => toggle(pack.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer text-left ${
                          active
                            ? `border-gray-200 ${domainBgColors[domain.id]}`
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        {active ? (
                          <CheckSquare size={18} className="text-aws-orange flex-shrink-0" />
                        ) : (
                          <Square size={18} className="text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-aws-squid-ink truncate">
                              {pack.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                              {total} Qs
                            </span>
                          </div>
                          {pack.description && (
                            <p className="text-xs text-gray-500 mb-1.5 truncate">
                              {pack.description}
                            </p>
                          )}
                          {/* Completion bar */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-correct transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {seen}/{total}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Tip:</strong> Drop new <code>.json</code> pack files into any{' '}
        <code>src/data/questions/domainN/</code> folder and they'll appear here
        automatically after a rebuild.
      </div>
    </div>
  );
}
