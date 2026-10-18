import React from 'react';
import { SubjectItem } from '../data/mbbsData';
import { X, Printer, Download, CheckCircle, FileText, Clock, Award } from 'lucide-react';

interface QuestionPaperModalProps {
  subject: SubjectItem | null;
  mode: 'paper' | 'answers';
  yearName: string;
  onClose: () => void;
  onOpenTopic: (topicId: string) => void;
}

export const QuestionPaperModal: React.FC<QuestionPaperModalProps> = ({
  subject,
  mode,
  yearName,
  onClose,
  onOpenTopic,
}) => {
  if (!subject) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#14151b] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-gray-200">
        {/* Header */}
        <div className="no-print p-4 md:px-6 md:py-4 bg-[#191b24] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {mode === 'paper' ? 'University Question Paper' : 'Model Answer Key & Marking Scheme'}
              </h3>
              <p className="text-xs text-gray-400">
                {subject.name} • {subject.code} • {yearName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-gray-800 text-gray-300 border border-gray-700 hover:text-white transition cursor-pointer"
              title="Print Exam Paper"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 border border-gray-700 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 text-sm">
          {/* Official Exam Paper Banner */}
          <div className="border-2 border-purple-800/40 bg-[#171822] p-5 rounded-2xl text-center space-y-2">
            <div className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">
              State Health University MBBS Degree Examination
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">{subject.paperTitle}</h2>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap pt-1 border-t border-gray-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Time: {subject.examDuration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Maximum Marks: {subject.totalMarks}
              </span>
              <span>•</span>
              <span>Subject Code: {subject.code}</span>
            </div>
          </div>

          {/* General Instructions */}
          <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 text-xs space-y-1.5 text-gray-300">
            <span className="font-bold text-white block">General Instructions:</span>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Your answers should be specific to the questions asked.</li>
              <li>Draw neat, labeled diagrams wherever necessary. Diagrams carry proportional marks.</li>
              <li>Write Section A, Section B, and Section C in sequential order.</li>
            </ul>
          </div>

          {/* Section A: Long Essays */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
              <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">
                SECTION A — LONG ESSAYS (2 x 10 = 20 Marks)
              </h4>
              <span className="text-xs text-gray-400 font-semibold">Answer ALL Questions</span>
            </div>

            {subject.topics.slice(0, 2).map((topic, index) => (
              <div
                key={topic.id}
                className="p-4 bg-[#1a1b24] rounded-xl border border-gray-800/80 hover:border-purple-600/50 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-purple-300">Question {index + 1}:</span>
                    <p className="text-sm font-semibold text-gray-200">
                      Describe in detail: {topic.title}. Discuss the anatomical/pathological basis, clinical presentation, and definitive management plan.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 shrink-0">
                    [10 Marks]
                  </span>
                </div>

                {mode === 'answers' ? (
                  <div className="mt-2 pt-2 border-t border-gray-800 text-xs space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Evaluation Key Breakdown:</span>
                    <p className="text-gray-400">1. Definition & Classification (2M)</p>
                    <p className="text-gray-400">2. Pathogenesis / Surgical Anatomy (3M)</p>
                    <p className="text-gray-400">3. Diagnostic Investigation (2M)</p>
                    <p className="text-gray-400">4. Medical & Surgical Management (3M)</p>
                    <button
                      onClick={() => onOpenTopic(topic.id)}
                      className="mt-2 text-xs font-bold text-purple-300 hover:text-purple-200 underline cursor-pointer"
                    >
                      View Complete 10-Mark Model Blueprint &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onOpenTopic(topic.id)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium underline cursor-pointer"
                    >
                      Read Topper Solution &rarr;
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section B: Short Essays */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
              <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">
                SECTION B — SHORT ESSAYS (6 x 5 = 30 Marks)
              </h4>
              <span className="text-xs text-gray-400 font-semibold">Answer Any Six</span>
            </div>

            <div className="space-y-2.5">
              {subject.topics.map((t, idx) => (
                <div key={idx} className="p-3 bg-[#1a1b24] rounded-xl border border-gray-800 flex items-center justify-between">
                  <div className="text-xs text-gray-300 pr-2">
                    <span className="font-bold text-purple-300 mr-2">{idx + 3}.</span>
                    {t.answers.mark5.heading}
                  </div>
                  <span className="text-xs font-mono text-gray-400 shrink-0">[5 Marks]</span>
                </div>
              ))}
              <div className="p-3 bg-[#1a1b24] rounded-xl border border-gray-800 flex items-center justify-between">
                <div className="text-xs text-gray-300 pr-2">
                  <span className="font-bold text-purple-300 mr-2">5.</span>
                  Clinical manifestations and laboratory diagnostic algorithm.
                </div>
                <span className="text-xs font-mono text-gray-400 shrink-0">[5 Marks]</span>
              </div>
            </div>
          </div>

          {/* Section C: Short Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
              <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">
                SECTION C — SHORT ANSWERS (10 x 2 = 20 Marks)
              </h4>
              <span className="text-xs text-gray-400 font-semibold">Answer ALL Questions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#1a1b24] rounded-lg border border-gray-800 text-gray-300">
                <span className="font-bold text-purple-300 mr-1.5">a.</span> Mention 2 characteristic signs of the disease.
              </div>
              <div className="p-2.5 bg-[#1a1b24] rounded-lg border border-gray-800 text-gray-300">
                <span className="font-bold text-purple-300 mr-1.5">b.</span> Enumerate 2 gold standard drugs with dosage.
              </div>
              <div className="p-2.5 bg-[#1a1b24] rounded-lg border border-gray-800 text-gray-300">
                <span className="font-bold text-purple-300 mr-1.5">c.</span> State the anatomical boundaries of the canal.
              </div>
              <div className="p-2.5 bg-[#1a1b24] rounded-lg border border-gray-800 text-gray-300">
                <span className="font-bold text-purple-300 mr-1.5">d.</span> Give the biochemical energetic yield per mole.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="no-print p-4 bg-[#191b24] border-t border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {mode === 'paper' ? `File Size: ${subject.qSize}` : `File Size: ${subject.aSize}`}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-lg transition cursor-pointer"
          >
            Close Examination Paper
          </button>
        </div>
      </div>
    </div>
  );
};
