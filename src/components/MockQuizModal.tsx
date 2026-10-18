import React, { useState } from 'react';
import { MOCK_QUIZ_QUESTIONS, QuizQuestion } from '../data/mbbsData';
import { X, CheckCircle, XCircle, Award, RotateCcw, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
}

export const MockQuizModal: React.FC<MockQuizModalProps> = ({
  isOpen,
  onClose,
  selectedYear,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  // Filter questions for the selected year, or fallback to all questions
  const filteredQuestions = MOCK_QUIZ_QUESTIONS.filter((q) => q.year === selectedYear);
  const activeQuestions = filteredQuestions.length > 0 ? filteredQuestions : MOCK_QUIZ_QUESTIONS;
  const currentQ: QuizQuestion = activeQuestions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#14151b] border border-gray-700/80 rounded-2xl shadow-2xl p-5 md:p-6 text-gray-200">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Rapid Clinical Quiz & Spotter</h3>
              <p className="text-xs text-gray-400">High-Yield University MCQs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="mt-4 space-y-4">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                Question {currentIdx + 1} of {activeQuestions.length}
              </span>
              <span className="font-semibold text-purple-300">
                Score: {score}/{currentIdx + (isAnswered ? 1 : 0)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Subject badge */}
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/50 text-[11px] font-semibold">
              {currentQ.subject}
            </div>

            {/* Question Text */}
            <div className="text-sm md:text-base font-semibold text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-2 pt-1">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let btnStyle = 'bg-[#1b1c26] border-gray-800 text-gray-200 hover:border-gray-700';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-[#1b1c26] border-gray-800 text-gray-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm flex items-center justify-between transition ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & High Yield Tip after answering */}
            {isAnswered && (
              <div className="mt-4 p-4 rounded-xl bg-[#191b24] border border-gray-700/80 space-y-2 animate-in fade-in duration-200 text-xs">
                <div>
                  <span className="font-bold text-purple-300">Clinical Explanation:</span>
                  <p className="text-gray-300 mt-1 leading-relaxed">{currentQ.explanation}</p>
                </div>
                <div className="pt-2 border-t border-gray-800 text-amber-300 flex items-start gap-1.5">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    <strong>Exam Pearl:</strong> {currentQ.highYieldTip}
                  </span>
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                >
                  <span>{currentIdx + 1 === activeQuestions.length ? 'View Final Result' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Quiz Session Completed!</h4>
              <p className="text-xs text-gray-400 mt-1">
                You scored <span className="font-bold text-purple-400">{score}</span> out of{' '}
                <span className="font-bold text-white">{activeQuestions.length}</span> (
                {Math.round((score / activeQuestions.length) * 100)}%)
              </p>
            </div>

            <div className="p-3 bg-[#1a1b24] rounded-xl border border-gray-800 max-w-sm mx-auto text-xs text-gray-300">
              {score === activeQuestions.length
                ? '🌟 Outstanding! University Gold Medalist performance!'
                : score >= activeQuestions.length / 2
                ? '👍 Good score! Review the high-yield answer blueprints to reach 100% mastery.'
                : '📚 Keep revising! Review the 10-Mark and 5-Mark structured blueprints in the main tab.'}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold border border-gray-700 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Back to Question Bank
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
