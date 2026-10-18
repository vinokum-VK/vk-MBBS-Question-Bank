import React, { useState } from 'react';
import { TopicItem } from '../data/mbbsData';
import { MedicalDiagramViewer } from './MedicalDiagramViewer';
import { VisualFlowchartViewer } from './VisualFlowchartViewer';
import {
  X,
  Copy,
  Check,
  Printer,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  Sparkles,
  FileText,
  CheckCircle2,
  GitBranch,
  Palette,
  Layers,
  ChevronRight,
  Award,
} from 'lucide-react';

interface AnswerBlueprintModalProps {
  topic: TopicItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
}

export const AnswerBlueprintModal: React.FC<AnswerBlueprintModalProps> = ({
  topic,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isMastered,
  onToggleMastered,
}) => {
  const [activeTab, setActiveTab] = useState<'10mark' | 'diagram' | 'flowchart' | 'rapid' | 'mnemonic' | 'all'>('10mark');
  const [copied, setCopied] = useState(false);

  if (!topic) return null;

  const handleCopy = () => {
    let textToCopy = `=== ${topic.title} (${topic.subject}) ===\n\n`;
    const a = topic.answers.mark10;

    textToCopy += `[RESPONSE 1: 10-MARK GOLD STANDARD ESSAY]\n\n`;
    textToCopy += `1. DEFINITION & CRITERIA:\n${a.introAndDefinition}\n\n`;
    textToCopy += `2. CLASSIFICATION / ANATOMY:\n${a.classificationOrAnatomy.join('\n')}\n\n`;
    textToCopy += `3. PATHOPHYSIOLOGY:\n${a.pathophysiologySteps.join('\n')}\n\n`;
    textToCopy += `4. CLINICAL FEATURES:\n${a.clinicalManifestations.join('\n')}\n\n`;
    textToCopy += `5. DIAGNOSIS (Gold Standard: ${a.diagnosticWorkup.goldStandard}):\nLabs: ${a.diagnosticWorkup.routineLabs.join(', ')}\nImaging: ${a.diagnosticWorkup.imaging.join(', ')}\n\n`;
    textToCopy += `6. STAGING / SCORING:\n${a.stagingOrScoring}\n\n`;
    textToCopy += `7. MANAGEMENT:\nEmergency: ${a.comprehensiveManagement.emergency}\nMedical: ${a.comprehensiveManagement.medicalTherapy.join('\n')}\nSurgical: ${a.comprehensiveManagement.surgicalOrDefinitive.join('\n')}\n\n`;
    textToCopy += `8. COMPLICATIONS:\n${a.complications.join(', ')}\n\n`;

    textToCopy += `[RESPONSE 2: EXAM FLOWCHART]\n${a.topperFlowchart}\n\n`;
    textToCopy += `[RESPONSE 3: 5-MARK & 2-MARK SNIPPETS]\n5-Mark: ${topic.answers.mark5.heading} - ${topic.answers.mark5.treatmentSummary}\n2-Mark: ${topic.answers.mark2.definition}\n`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const a = topic.answers.mark10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#14151b] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
        {/* Header (No-Print) */}
        <div className="no-print p-4 md:px-6 md:py-4 bg-[#191b24] border-b border-gray-800 flex items-center justify-between gap-3">
          <div className="space-y-1 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-700/60 text-[10px] font-bold">
                {topic.subject}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">
                {topic.frequency}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                10-Mark Question Blueprint
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
              }`}
              title="Bookmark Topic"
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
              className="p-2 rounded-xl bg-gray-800 text-gray-300 border border-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer"
              title="Print Exam Blueprint"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Separate Responses Selector Tabs */}
        <div className="no-print flex items-center gap-1.5 px-4 md:px-6 py-2.5 bg-[#101116] border-b border-gray-800 overflow-x-auto text-xs">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mr-1 hidden sm:inline">
            Responses:
          </span>
          <button
            onClick={() => setActiveTab('10mark')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === '10mark'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Response 1: 10-Mark Essay</span>
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'diagram'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-purple-300" />
            <span>Response 2: Medical Diagram</span>
          </button>
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flowchart'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>Response 3: Decision Flowchart</span>
          </button>
          <button
            onClick={() => setActiveTab('rapid')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rapid'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Response 4: 5M & 2M Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('mnemonic')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mnemonic'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Response 5: Mnemonics</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View All Responses</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-gray-200 text-sm">
          {/* Print Only Header */}
          <div className="hidden print:block border-b-2 border-black pb-3 mb-4">
            <h1 className="text-2xl font-black text-black">{topic.title}</h1>
            <p className="text-xs text-gray-600">
              {topic.subject} • Full 10-Mark University Answer Blueprint with Diagrams & Flowcharts
            </p>
          </div>

          {/* RESPONSE 1: 10-MARK DETAILED ESSAY */}
          {(activeTab === '10mark' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-purple-400">
                      Response 1 of 5
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-[10px] font-bold text-amber-400">
                      Standard 10-Mark Essay (18 Minutes Writing Time)
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {a.goldStandardTitle}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs shrink-0">
                  [10 Marks]
                </span>
              </div>

              {/* Step 1: Definition */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Clinical Definition & Diagnostic Hallmarks
                </h4>
                <p className="text-gray-300 leading-relaxed font-medium pl-7">
                  {a.introAndDefinition}
                </p>
              </div>

              {/* Step 2: Classification / Surgical Anatomy */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Classification & Anatomical / Morphological Subdivisions
                </h4>
                <ul className="list-disc pl-11 space-y-1.5 text-gray-300">
                  {a.classificationOrAnatomy.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 3: Pathophysiological Cascade */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  Stepwise Pathophysiological Cascade / Molecular Mechanism
                </h4>
                <ol className="list-decimal pl-11 space-y-1.5 text-gray-300">
                  {a.pathophysiologySteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Step 4: Clinical Manifestations */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  Clinical Features & Pathognomonic Physical Signs
                </h4>
                <ul className="list-disc pl-11 space-y-1.5 text-gray-300">
                  {a.clinicalManifestations.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 5: Diagnostic Workup */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  Laboratory & Radiological Diagnostic Workup
                </h4>
                <div className="pl-7 space-y-2">
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <strong className="text-amber-300">Gold Standard Investigation:</strong>{' '}
                    {a.diagnosticWorkup.goldStandard}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-[#13141c] rounded-lg border border-gray-800">
                      <span className="font-bold text-gray-300 block mb-1">Essential Labs:</span>
                      <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        {a.diagnosticWorkup.routineLabs.map((lab, i) => (
                          <li key={i}>{lab}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-[#13141c] rounded-lg border border-gray-800">
                      <span className="font-bold text-gray-300 block mb-1">Imaging & Modalities:</span>
                      <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        {a.diagnosticWorkup.imaging.map((img, i) => (
                          <li key={i}>{img}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6: Clinical Staging / Scoring */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    6
                  </span>
                  Clinical Staging, Severity Grading & Risk Scores
                </h4>
                <p className="text-gray-300 pl-7 leading-relaxed">{a.stagingOrScoring}</p>
              </div>

              {/* Step 7: Stepwise Management */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    7
                  </span>
                  Comprehensive Line of Management
                </h4>
                <div className="pl-7 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/40 text-red-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-red-400 block mb-1">
                      Phase 1: Emergency Resuscitation & Triage
                    </span>
                    <p>{a.comprehensiveManagement.emergency}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-blue-400 block mb-1">
                      Phase 2: Medical Therapy & Specific Pharmacotherapy
                    </span>
                    <ul className="list-disc pl-4 space-y-1">
                      {a.comprehensiveManagement.medicalTherapy.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block mb-1">
                      Phase 3: Definitive Surgical / Interventional Procedure
                    </span>
                    <ul className="list-disc pl-4 space-y-1">
                      {a.comprehensiveManagement.surgicalOrDefinitive.map((surg, i) => (
                        <li key={i}>{surg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 8: Complications */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-xs font-bold">
                    8
                  </span>
                  Potential Complications & Prognostic Pearl
                </h4>
                <div className="pl-7 flex flex-wrap gap-2 text-xs">
                  {a.complications.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-300"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 2: MEDICAL DIAGRAM & CHECKLIST */}
          {(activeTab === 'diagram' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-purple-400 block">
                    Response 2 of 5
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Medical Vector Diagram & Examiner Checklist
                  </h3>
                </div>
                <Palette className="w-5 h-5 text-purple-400" />
              </div>

              {/* Diagram Canvas */}
              <MedicalDiagramViewer
                type={topic.diagramType || 'dka-protocol'}
                title={topic.title}
              />

              {/* Checklist */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase">
                  Diagram Checklist for Scoring Full Marks:
                </h4>
                <div className="space-y-2 text-xs">
                  {a.diagramChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#121319] border border-gray-800 text-gray-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 3: DECISION FLOWCHART */}
          {(activeTab === 'flowchart' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-purple-400 block">
                    Response 3 of 5
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Clinical Decision & Pathogenesis Flowchart
                  </h3>
                </div>
                <GitBranch className="w-5 h-5 text-emerald-400" />
              </div>

              <VisualFlowchartViewer
                title={topic.title}
                flowchartString={a.topperFlowchart}
              />
            </div>
          )}

          {/* RESPONSE 4: 5-MARK & 2-MARK SNIPPETS */}
          {(activeTab === 'rapid' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-purple-400 block">
                    Response 4 of 5
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Rapid 5-Mark & 2-Mark University Snippets
                  </h3>
                </div>
                <Layers className="w-5 h-5 text-blue-400" />
              </div>

              {/* 5-Mark Card */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs font-bold text-blue-400 uppercase">
                    5-Mark Short Essay (9 Minutes)
                  </span>
                  <span className="text-xs font-mono text-gray-400">[5 Marks]</span>
                </div>
                <h4 className="text-sm font-bold text-white">{topic.answers.mark5.heading}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {topic.answers.mark5.introduction}
                </p>
                <div className="text-xs text-gray-300 space-y-1">
                  <span className="font-bold text-purple-300">Key Features:</span>
                  <ul className="list-disc pl-5 space-y-0.5 text-gray-400">
                    {topic.answers.mark5.clinicalFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
                  <strong>Management Summary:</strong> {topic.answers.mark5.treatmentSummary}
                </div>
              </div>

              {/* 2-Mark Card */}
              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">
                    2-Mark High-Precision Short Note (3.5 Minutes)
                  </span>
                  <span className="text-xs font-mono text-gray-400">[2 Marks]</span>
                </div>
                <p className="text-xs text-gray-200 font-semibold">
                  {topic.answers.mark2.definition}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  {topic.answers.mark2.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Clinical Pearl:</strong> {topic.answers.mark2.clinicalPearls}
                </div>
              </div>
            </div>
          )}

          {/* RESPONSE 5: MNEMONICS & PEARLS */}
          {(activeTab === 'mnemonic' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-purple-400 block">
                    Response 5 of 5
                  </span>
                  <h3 className="text-base font-bold text-white">
                    High-Yield Clinical Mnemonics & Exam Pearls
                  </h3>
                </div>
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>

              <div className="bg-[#181924] p-4 rounded-xl border border-gray-800 space-y-3">
                <h4 className="text-sm font-bold text-purple-300">
                  {topic.answers.mnemonic.title}
                </h4>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {topic.answers.mnemonic.letters.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#13141c] rounded-xl border border-gray-800"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                        {item.letter}
                      </div>
                      <div className="text-xs text-gray-200 font-medium">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-[#13141c] rounded-xl border border-purple-800/40 text-xs text-purple-200">
                  <strong>Explanation:</strong> {topic.answers.mnemonic.explanation}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (No-Print) */}
        <div className="no-print p-4 bg-[#191b24] border-t border-gray-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied All 5 Responses!' : 'Copy Detailed Responses'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
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
