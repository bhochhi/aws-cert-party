import { useState, useEffect, useCallback } from 'react';
import {
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Grid3x3,
} from 'lucide-react';
import type { Question } from '../types';
import { formatTime, isCorrect } from '../utils/quiz';

interface QuizEngineProps {
  questions: Question[];
  mode: 'study' | 'mock';
  timeLimit?: number; // ms
  onComplete: (answers: Record<string, number[]>, timeTaken: number) => void;
}

export default function QuizEngine({
  questions,
  mode,
  timeLimit,
  onComplete,
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isMultiSelect = currentQuestion.correctAnswers.length > 1;
  const currentAnswer = answers[currentQuestion.id] || [];
  const isRevealed = revealed.has(currentQuestion.id);
  const isCurrentCorrect = isRevealed && isCorrect(currentAnswer, currentQuestion.correctAnswers);

  // Timer for mock mode
  useEffect(() => {
    if (mode !== 'mock' || !timeLimit) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timeLimit]);

  const handleFinish = useCallback(() => {
    if (isFinished) return;
    setIsFinished(true);
    onComplete(answers, Date.now() - startTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, startTime, onComplete, isFinished]);

  function selectOption(optionIndex: number) {
    if (mode === 'study' && isRevealed) return;

    setAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];
      if (isMultiSelect) {
        const idx = current.indexOf(optionIndex);
        if (idx >= 0) {
          return { ...prev, [currentQuestion.id]: current.filter((i) => i !== optionIndex) };
        }
        return { ...prev, [currentQuestion.id]: [...current, optionIndex] };
      }
      return { ...prev, [currentQuestion.id]: [optionIndex] };
    });
  }

  function revealAnswer() {
    setRevealed((prev) => new Set(prev).add(currentQuestion.id));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  }

  function goTo(index: number) {
    setCurrentIndex(index);
    setShowNavigator(false);
  }

  function goNext() {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  const answeredCount = Object.keys(answers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-gray-400">
            ({answeredCount} answered)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {mode === 'mock' && timeLimit && (
            <span
              className={`flex items-center gap-1 text-sm font-mono font-medium px-2 py-1 rounded ${
                timeRemaining < 300000 ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'
              }`}
            >
              <Clock size={14} />
              {formatTime(timeRemaining)}
            </span>
          )}
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Question navigator"
          >
            <Grid3x3 size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-aws-orange transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Navigator Modal */}
      {showNavigator && (
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-1.5">
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id];
              const isFlagged = flagged.has(q.id);
              const isCurrent = i === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => goTo(i)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-aws-orange text-white'
                      : isAnswered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${isFlagged ? 'ring-2 ring-amber-400' : ''}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-aws-orange inline-block" /> Current
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-100 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-100 ring-2 ring-amber-400 inline-block" /> Flagged
            </span>
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Question header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {isMultiSelect && (
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded mb-2">
                  Select {currentQuestion.correctAnswers.length} answers
                </span>
              )}
              <p className="text-gray-900 font-medium leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
            <button
              onClick={toggleFlag}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                flagged.has(currentQuestion.id)
                  ? 'bg-amber-50 text-amber-500'
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
              title="Flag for review"
            >
              <Flag size={18} />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="p-5 space-y-2.5">
          {currentQuestion.options.map((option, i) => {
            const isSelected = currentAnswer.includes(i);
            const isCorrectOption = currentQuestion.correctAnswers.includes(i);
            const letter = String.fromCharCode(65 + i);

            let optionStyle = 'border-gray-200 hover:border-gray-400 hover:bg-gray-50';
            if (isSelected && !isRevealed) {
              optionStyle = 'border-aws-orange bg-aws-orange/5 ring-1 ring-aws-orange/30';
            }
            if (isRevealed) {
              if (isCorrectOption) {
                optionStyle = 'border-correct bg-green-50';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-incorrect bg-red-50';
              } else {
                optionStyle = 'border-gray-200 opacity-60';
              }
            }

            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                disabled={mode === 'study' && isRevealed}
                className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 text-left transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected && !isRevealed
                      ? 'bg-aws-orange text-white'
                      : isRevealed && isCorrectOption
                      ? 'bg-correct text-white'
                      : isRevealed && isSelected && !isCorrectOption
                      ? 'bg-incorrect text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isRevealed && isCorrectOption ? (
                    <CheckCircle2 size={16} />
                  ) : isRevealed && isSelected && !isCorrectOption ? (
                    <XCircle size={16} />
                  ) : (
                    letter
                  )}
                </span>
                <span className="text-sm text-gray-800">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation (study mode) */}
        {mode === 'study' && isRevealed && (
          <div
            className={`mx-5 mb-5 p-4 rounded-lg border ${
              isCurrentCorrect
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCurrentCorrect ? (
                <CheckCircle2 className="text-correct" size={18} />
              ) : (
                <XCircle className="text-incorrect" size={18} />
              )}
              <span
                className={`font-semibold text-sm ${
                  isCurrentCorrect ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {isCurrentCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-aws-squid-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {mode === 'study' && !isRevealed && (
            <button
              onClick={revealAnswer}
              disabled={currentAnswer.length === 0}
              className="flex items-center gap-1.5 px-5 py-2 bg-aws-orange hover:bg-aws-orange-dark text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <AlertCircle size={15} />
              Check Answer
            </button>
          )}

          {mode === 'mock' && currentIndex === questions.length - 1 && (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-5 py-2 bg-correct hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <CheckCircle2 size={15} />
              Submit Test
            </button>
          )}
        </div>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-aws-squid-ink transition-colors cursor-pointer"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : mode === 'study' ? (
          <button
            onClick={handleFinish}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-correct hover:text-green-700 transition-colors cursor-pointer"
          >
            Finish
            <CheckCircle2 size={16} />
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>
    </div>
  );
}
