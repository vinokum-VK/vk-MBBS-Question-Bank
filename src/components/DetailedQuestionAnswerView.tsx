import React, { useState } from 'react';
import { TopicItem } from '../data/mbbsData';
import { MedicalVisualDiagram } from './MedicalVisualDiagram';
import { generateTopicPdf } from '../utils/pdfGenerator';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  GitBranch,
  Layers,
  Lightbulb,
  FileText,
  AlertCircle,
  HelpCircle,
  Activity,
} from 'lucide-react';

interface DetailedQuestionAnswerViewProps {
  topic: TopicItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
}

export const DetailedQuestionAnswerView: React.FC<DetailedQuestionAnswerViewProps> = ({
  topic,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isMastered,
  onToggleMastered,
}) => {
  const [activeResponseTab, setActiveResponseTab] = useState<
    'response10' | 'responseDiagram' | 'responseFlowchart' | 'responseShorts' | 'responseMnemonic'
  >('response10');
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!topic) return null;

  const a10 = topic.answers.mark10;
  const a5 = topic.answers.mark5;
  const a2 = topic.answers.mark2;
  const mnemonic = topic.answers.mnemonic;

  const handleCopy = () => {
    let fullText = `=== UNIVERSITY EXAM BLUEPRINT: ${topic.title} (${topic.subject}) ===\n\n`;
    fullText += `[RESPONSE 1: 10-MARK GOLD STANDARD ESSAY]\n`;
    fullText += `1. DEFINITION & CRITERIA:\n${a10.introAndDefinition}\n\n`;
    fullText += `2. CLASSIFICATION / SUBDIVISIONS:\n${a10.classificationOrAnatomy.join('\n')}\n\n`;
    fullText += `3. PATHOPHYSIOLOGICAL CASCADE:\n${a10.pathophysiologySteps.join('\n')}\n\n`;
    fullText += `4. CLINICAL MANIFESTATIONS:\n${a10.clinicalManifestations.join('\n')}\n\n`;
    fullText += `5. DIAGNOSTIC WORKUP:\nGold Standard: ${a10.diagnosticWorkup.goldStandard}\nLabs: ${a10.diagnosticWorkup.routineLabs.join(', ')}\nImaging: ${a10.diagnosticWorkup.imaging.join(', ')}\n\n`;
    fullText += `6. MANAGEMENT PROTOCOL:\nEmergency: ${a10.comprehensiveManagement.emergency}\nMedical: ${a10.comprehensiveManagement.medicalTherapy.join('\n')}\nSurgical: ${a10.comprehensiveManagement.surgicalOrDefinitive.join('\n')}\n\n`;
    fullText += `7. EXAM FLOWCHART:\n${a10.topperFlowchart}\n\n`;
    fullText += `[MNEMONIC]: ${mnemonic.title} (${mnemonic.explanation})\n`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    try {
      generateTopicPdf(topic);
    } finally {
      setTimeout(() => setDownloadingPdf(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#13141c] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden text-gray-200">
        {/* Header Bar (No-Print) */}
        <div className="no-print p-4 md:px-6 md:py-4 bg-[#181923] border-b border-gray-800 flex items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-700/60 text-xs font-bold">
                {topic.subject}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                {topic.frequency}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                10-Mark Detailed Answer
              </span>
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white line-clamp-2">
              {topic.title}
            </h2>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow cursor-pointer"
              title="Download 10-Mark Blueprint as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{downloadingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
              }`}
              title="Save to bookmarks"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleMastered(topic.id)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isMastered
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
              }`}
              title="Mark as Mastered"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-gray-800 text-gray-300 border border-gray-700 hover:text-white transition cursor-pointer hidden sm:flex"
              title="Print Blueprint"
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

        {/* 5 Distinct Separate Response Tabs (Requirement 5) */}
        <div className="no-print flex items-center gap-1.5 px-4 md:px-6 py-2.5 bg-[#0f1016] border-b border-gray-800 overflow-x-auto">
          <button
            onClick={() => setActiveResponseTab('response10')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeResponseTab === 'response10'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#181922] text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Response 1: 10-Mark Gold Standard Essay</span>
          </button>

          <button
            onClick={() => setActiveResponseTab('responseDiagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeResponseTab === 'responseDiagram'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#181922] text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Response 2: Visual Diagram & Checklist</span>
          </button>

          <button
            onClick={() => setActiveResponseTab('responseFlowchart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeResponseTab === 'responseFlowchart'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#181922] text-gray-400 hover:text-gray-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Response 3: Clinical Decision Flowchart</span>
          </button>

          <button
            onClick={() => setActiveResponseTab('responseShorts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeResponseTab === 'responseShorts'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#181922] text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Response 4: 5M & 2M Rapid Snippets</span>
          </button>

          <button
            onClick={() => setActiveResponseTab('responseMnemonic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeResponseTab === 'responseMnemonic'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-[#181922] text-gray-400 hover:text-gray-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Response 5: Mnemonics & Pearls</span>
          </button>
        </div>

        {/* Response Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-sm">
          {/* Printable Header for physical printing */}
          <div className="hidden print:block border-b-2 border-black pb-3 mb-4">
            <h1 className="text-xl font-bold text-black">{topic.title}</h1>
            <p className="text-xs text-gray-600">
              {topic.subject} • VK MBBS Question Bank Ultimate Topper Edition • Marks Scheme: 10 Marks
            </p>
          </div>

          {/* RESPONSE 1: 10-MARK DETAILED ESSAY */}
          {activeResponseTab === 'response10' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Evaluator Title Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-[#1d1b2e] to-[#161724] border border-purple-700/60 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-purple-300">
                    {a10.goldStandardTitle}
                  </div>
                  <p className="text-xs text-gray-300">
                    Follows Rajiv Gandhi, TN Dr MGR, KUHS, AIIMS & MUHS 10-Mark Essay Evaluation Guidelines.
                  </p>
                </div>
              </div>

              {/* 1. Definition */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    1
                  </span>
                  Clinical Definition & Consensus Criteria
                </h4>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base font-normal">
                  {a10.introAndDefinition}
                </p>
              </div>

              {/* 2. Classification or Anatomical Divisions */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    2
                  </span>
                  Anatomical Subdivisions / Classification Scheme
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {a10.classificationOrAnatomy.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Pathophysiology Steps */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    3
                  </span>
                  Step-by-Step Pathophysiological Cascade
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                  {a10.pathophysiologySteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* 4. Clinical Features */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    4
                  </span>
                  Cardinal Clinical Manifestations & Pathognomonic Signs
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {a10.clinicalManifestations.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Diagnostic Workup */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    5
                  </span>
                  Complete Diagnostic Workup
                </h4>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <strong>★ Gold Standard Investigation:</strong> {a10.diagnosticWorkup.goldStandard}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#111218] rounded-xl border border-gray-800 space-y-1">
                    <span className="font-bold text-gray-200">Mandatory Laboratory Tests:</span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-300 pt-1">
                      {a10.diagnosticWorkup.routineLabs.map((lab, i) => (
                        <li key={i}>{lab}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-[#111218] rounded-xl border border-gray-800 space-y-1">
                    <span className="font-bold text-gray-200">Radiological & Imaging Modalities:</span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-300 pt-1">
                      {a10.diagnosticWorkup.imaging.map((img, i) => (
                        <li key={i}>{img}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. Comprehensive Management Protocol */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    6
                  </span>
                  Comprehensive Management Protocol
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-rose-400 block">
                      Emergency Resuscitation & Triage (First 30 Mins)
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {a10.comprehensiveManagement.emergency}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-blue-400 block">
                      Definitive Medical Pharmacotherapy (Dosages & Routes)
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-300 pt-0.5">
                      {a10.comprehensiveManagement.medicalTherapy.map((med, i) => (
                        <li key={i} className="leading-relaxed">{med}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 block">
                      Surgical Interventions & Procedures
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-300 pt-0.5">
                      {a10.comprehensiveManagement.surgicalOrDefinitive.map((surg, i) => (
                        <li key={i} className="leading-relaxed">{surg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 7. Complications & Prognostic Pearls */}
              <div className="bg-[#181924] p-4 md:p-5 rounded-xl border border-gray-800 space-y-2 text-xs">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-black">
                    7
                  </span>
                  Complications & Clinical Pearls
                </h4>
                <div className="p-2.5 bg-[#111218] rounded-lg border border-gray-800">
                  <ul className="list-disc pl-4 space-y-1 text-gray-300">
                    {a10.complications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 2: VISUAL ANATOMY & PATHOLOGY DIAGRAM */}
          {activeResponseTab === 'responseDiagram' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <MedicalVisualDiagram topic={topic} />
            </div>
          )}

          {/* RESPONSE 3: CLINICAL DECISION FLOWCHART */}
          {activeResponseTab === 'responseFlowchart' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 via-[#181a2e] to-[#121320] border border-indigo-700/60 space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                  Full Linear Decision Path
                </span>
                <h4 className="text-sm font-bold text-white">University Evaluator Grading Flowchart</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Examiners check if you understand the clinical hierarchy: Symptom &rarr; Differential &rarr; Gold Standard Lab &rarr; Emergency Resuscitation &rarr; Definitive Therapy.
                </p>
              </div>

              <div className="bg-[#181924] p-5 rounded-xl border border-gray-800 space-y-4 font-mono text-xs">
                <div className="p-4 bg-black/60 rounded-xl border border-purple-800/60 text-purple-200 leading-loose overflow-x-auto text-center font-bold">
                  {a10.topperFlowchart}
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 4: 5M & 2M RAPID SNIPPETS */}
          {activeResponseTab === 'responseShorts' && (
            <div className="space-y-4 animate-in fade-in duration-150 text-xs">
              {/* 5-Mark Card */}
              <div className="p-4 md:p-5 bg-[#181924] rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h4 className="font-bold text-sm text-purple-300">5-Mark Brief Answer Blueprint</h4>
                  <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold">[5 Marks]</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-200 block">{a5.heading}</span>
                  <p className="text-gray-300 mt-1 leading-relaxed">{a5.introduction}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200 block">Pathogenesis:</span>
                  <p className="text-gray-300 mt-0.5 leading-relaxed">{a5.etiologyOrPathology}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200 block">Salient Clinical Signs:</span>
                  <ul className="list-disc pl-4 mt-0.5 space-y-1 text-gray-300">
                    {a5.clinicalFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-gray-800 text-amber-300">
                  <strong>Evaluator Drawing Tip:</strong> {a5.diagramSuggestion}
                </div>
              </div>

              {/* 2-Mark Card */}
              <div className="p-4 md:p-5 bg-[#181924] rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h4 className="font-bold text-sm text-purple-300">2-Mark Precision Answer</h4>
                  <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-bold">[2 Marks]</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-200 block">Exact Definition:</span>
                  <p className="text-gray-200 mt-0.5 font-medium leading-relaxed">{a2.definition}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-200 block">Key Points:</span>
                  <ul className="list-disc pl-4 mt-0.5 space-y-1 text-gray-300">
                    {a2.keyPoints.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <strong>Clinical Pearl:</strong> {a2.clinicalPearls}
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 5: MNEMONIC & CLINICAL PEARLS */}
          {activeResponseTab === 'responseMnemonic' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  High-Yield Memory Anchor
                </span>
                <h4 className="text-sm md:text-base font-bold text-white mt-1">{mnemonic.title}</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {mnemonic.letters.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#181924] rounded-xl border border-gray-800">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow shrink-0">
                      {item.letter}
                    </div>
                    <div className="text-xs text-gray-200 font-medium">{item.description}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#111218] rounded-xl border border-purple-800/30 text-xs text-purple-200 leading-relaxed">
                <strong>How to Apply in University Exam:</strong> {mnemonic.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar (No-Print) */}
        <div className="no-print p-4 bg-[#181923] border-t border-gray-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadingPdf ? 'Generating PDF...' : 'Download as PDF'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Blueprint!' : 'Copy Text'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-lg transition cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
