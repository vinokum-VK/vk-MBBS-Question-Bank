import React, { useState } from 'react';
import { TopicItem } from '../data/mbbsData';
import { X, Copy, Check, Printer, Bookmark, BookmarkCheck, Lightbulb, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'10mark' | '5mark' | '2mark' | 'diagram' | 'mnemonic'>('10mark');
  const [copied, setCopied] = useState(false);

  if (!topic) return null;

  const handleCopy = () => {
    let textToCopy = `=== ${topic.title} (${topic.subject}) ===\n\n`;

    if (activeTab === '10mark') {
      const a = topic.answers.mark10;
      textToCopy += `[10-MARK GOLD STANDARD ESSAY]\n\n`;
      textToCopy += `1. DEFINITION:\n${a.introAndDefinition}\n\n`;
      textToCopy += `2. CLASSIFICATION / ANATOMY:\n${a.classificationOrAnatomy.join('\n')}\n\n`;
      textToCopy += `3. PATHOPHYSIOLOGY:\n${a.pathophysiologySteps.join('\n')}\n\n`;
      textToCopy += `4. CLINICAL FEATURES:\n${a.clinicalManifestations.join('\n')}\n\n`;
      textToCopy += `5. DIAGNOSIS (Gold Standard: ${a.diagnosticWorkup.goldStandard}):\nLabs: ${a.diagnosticWorkup.routineLabs.join(', ')}\nImaging: ${a.diagnosticWorkup.imaging.join(', ')}\n\n`;
      textToCopy += `6. MANAGEMENT:\nEmergency: ${a.comprehensiveManagement.emergency}\nMedical: ${a.comprehensiveManagement.medicalTherapy.join('\n')}\nSurgical: ${a.comprehensiveManagement.surgicalOrDefinitive.join('\n')}\n\n`;
      textToCopy += `7. FLOWCHART:\n${a.topperFlowchart}\n`;
    } else if (activeTab === '5mark') {
      const a = topic.answers.mark5;
      textToCopy += `[5-MARK BRIEF ANSWER]\n\n`;
      textToCopy += `Heading: ${a.heading}\n\n`;
      textToCopy += `Intro: ${a.introduction}\n\n`;
      textToCopy += `Pathology: ${a.etiologyOrPathology}\n\n`;
      textToCopy += `Features:\n${a.clinicalFeatures.join('\n')}\n\n`;
      textToCopy += `Management: ${a.treatmentSummary}\n`;
    } else if (activeTab === '2mark') {
      const a = topic.answers.mark2;
      textToCopy += `[2-MARK SHORT NOTE]\n\n`;
      textToCopy += `Definition: ${a.definition}\n\n`;
      textToCopy += `Points:\n${a.keyPoints.join('\n')}\n\n`;
      textToCopy += `Clinical Pearl: ${a.clinicalPearls}\n`;
    } else if (activeTab === 'mnemonic') {
      const m = topic.answers.mnemonic;
      textToCopy += `[MNEMONIC: ${m.title}]\n\n`;
      textToCopy += m.letters.map((l) => `${l.letter}: ${l.description}`).join('\n');
      textToCopy += `\n\nExplanation: ${m.explanation}\n`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-[#14151b] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header (No-Print) */}
        <div className="no-print p-4 md:px-6 md:py-4 bg-[#191b24] border-b border-gray-800 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-700/60 text-[11px] font-bold">
                {topic.subject}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                {topic.frequency}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px]">
                {topic.examWeight}
              </span>
            </div>
            <h2 className="text-base md:text-lg font-bold text-white line-clamp-2">
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

        {/* Blueprint Format Selector Tabs */}
        <div className="no-print flex items-center gap-1.5 px-4 md:px-6 py-2.5 bg-[#101116] border-b border-gray-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('10mark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === '10mark'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            10-Mark Essay (Gold Standard)
          </button>
          <button
            onClick={() => setActiveTab('5mark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === '5mark'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            5-Mark Brief
          </button>
          <button
            onClick={() => setActiveTab('2mark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === '2mark'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            2-Mark Note
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'diagram'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            Diagram Checklist
          </button>
          <button
            onClick={() => setActiveTab('mnemonic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'mnemonic'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 bg-[#181922]'
            }`}
          >
            Mnemonic
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 text-gray-200 text-sm">
          {/* Printable Header */}
          <div className="hidden print:block border-b-2 border-black pb-3 mb-4">
            <h1 className="text-xl font-bold text-black">{topic.title}</h1>
            <p className="text-xs text-gray-600">
              {topic.subject} • VK MBBS Question Bank Ultimate Topper Edition • Marks Scheme: {topic.examWeight}
            </p>
          </div>

          {/* 10-MARK VIEW */}
          {activeTab === '10mark' && (
            <div className="space-y-4">
              {/* Badge banner */}
              <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/40 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-purple-300">
                    {topic.answers.mark10.goldStandardTitle}
                  </h4>
                  <p className="text-xs text-purple-200/80 mt-1">
                    Structured according to university evaluator answer keys. Use flowcharts and clear subheadings.
                  </p>
                </div>
              </div>

              {/* Step 1: Definition */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">1</span>
                  Definition & Consensus Criteria
                </h5>
                <p className="text-gray-300 leading-relaxed">{topic.answers.mark10.introAndDefinition}</p>
              </div>

              {/* Step 2: Classification or Anatomy */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">2</span>
                  Anatomical Subdivisions / Classification Scheme
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                  {topic.answers.mark10.classificationOrAnatomy.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Step 3: Pathophysiology */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">3</span>
                  Stepwise Pathophysiological Cascade
                </h5>
                <ol className="list-decimal pl-5 space-y-1.5 text-gray-300">
                  {topic.answers.mark10.pathophysiologySteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Step 4: Clinical Manifestations */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">4</span>
                  Clinical Signs & Symptoms
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                  {topic.answers.mark10.clinicalManifestations.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Step 5: Diagnostic Workup */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-3">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">5</span>
                  Diagnostic Workup Protocol
                </h5>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Gold Standard Test:</strong> {topic.answers.mark10.diagnosticWorkup.goldStandard}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-[#121319] rounded-lg border border-gray-800">
                    <span className="font-bold text-gray-300">Essential Labs:</span>
                    <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-400">
                      {topic.answers.mark10.diagnosticWorkup.routineLabs.map((lab, i) => (
                        <li key={i}>{lab}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 bg-[#121319] rounded-lg border border-gray-800">
                    <span className="font-bold text-gray-300">Imaging & Modalities:</span>
                    <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-400">
                      {topic.answers.mark10.diagnosticWorkup.imaging.map((img, i) => (
                        <li key={i}>{img}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 6: Management */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-3">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">6</span>
                  Comprehensive Management Scheme
                </h5>
                <div className="text-xs space-y-2">
                  <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/40 text-red-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-red-400 block">Emergency Resuscitation</span>
                    <p className="mt-0.5">{topic.answers.mark10.comprehensiveManagement.emergency}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-blue-400 block">Medical Therapy</span>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      {topic.answers.mark10.comprehensiveManagement.medicalTherapy.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-400 block">Surgical / Definitive Procedure</span>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      {topic.answers.mark10.comprehensiveManagement.surgicalOrDefinitive.map((surg, i) => (
                        <li key={i}>{surg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 7: Topper Flowchart */}
              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px]">7</span>
                  Exam Flowchart (Draw in Right Margin)
                </h5>
                <div className="bg-black/60 p-3 rounded-lg font-mono text-xs text-purple-300 border border-gray-800/80 leading-relaxed overflow-x-auto">
                  {topic.answers.mark10.topperFlowchart}
                </div>
              </div>
            </div>
          )}

          {/* 5-MARK VIEW */}
          {activeTab === '5mark' && (
            <div className="space-y-4">
              <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  5-Mark Brief Answer Blueprint
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {topic.answers.mark5.heading}
                </h4>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">1. Core Definition & Background</h5>
                <p className="text-gray-300">{topic.answers.mark5.introduction}</p>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">2. Pathogenesis / Mechanism</h5>
                <p className="text-gray-300">{topic.answers.mark5.etiologyOrPathology}</p>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">3. Salient Clinical Findings</h5>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {topic.answers.mark5.clinicalFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">4. Treatment Summary</h5>
                <p className="text-gray-300">{topic.answers.mark5.treatmentSummary}</p>
              </div>

              <div className="bg-[#121319] p-3 rounded-xl border border-purple-800/40 flex items-center gap-2.5 text-xs text-purple-200">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Evaluator Tip:</strong> {topic.answers.mark5.diagramSuggestion}</span>
              </div>
            </div>
          )}

          {/* 2-MARK VIEW */}
          {activeTab === '2mark' && (
            <div className="space-y-4">
              <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  2-Mark Short Note Blueprint
                </span>
                <h4 className="text-sm font-bold text-white mt-1">High-Precision Answer Snippet</h4>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">Standard Definition:</h5>
                <p className="text-gray-200 font-medium">{topic.answers.mark2.definition}</p>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-2">
                <h5 className="text-xs font-bold text-purple-300">Crucial Bullet Points (1 Mark Each):</h5>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                  {topic.answers.mark2.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-300">Clinical Pearl:</span>
                  <p className="mt-0.5">{topic.answers.mark2.clinicalPearls}</p>
                </div>
              </div>
            </div>
          )}

          {/* DIAGRAM CHECKLIST */}
          {activeTab === 'diagram' && (
            <div className="space-y-4">
              <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  University Diagram Mastery
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Essential Visuals & Labeling Requirements
                </h4>
              </div>

              <div className="bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-3">
                <h5 className="text-xs font-bold text-purple-300">Checklist of Elements Required for Full Diagram Marks:</h5>
                <div className="space-y-2">
                  {topic.answers.mark10.diagramChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#121319] border border-gray-800 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 text-xs text-gray-400">
                <strong>University Evaluation Rule:</strong> Diagrams carry 30% to 40% of the essay marks. Never draw freehand arrows pointing into the text; use clean horizontal leader lines outside the illustration.
              </div>
            </div>
          )}

          {/* MNEMONIC TAB */}
          {activeTab === 'mnemonic' && (
            <div className="space-y-4">
              <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  High-Yield Memory Anchor
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{topic.answers.mnemonic.title}</h4>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {topic.answers.mnemonic.letters.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#1a1b24] rounded-xl border border-gray-800">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                      {item.letter}
                    </div>
                    <div className="text-xs text-gray-200 font-medium">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#121319] p-3 rounded-xl border border-purple-800/30 text-xs text-purple-200">
                <strong>How to remember:</strong> {topic.answers.mnemonic.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (No-Print) */}
        <div className="no-print p-4 bg-[#191b24] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Answer Blueprint'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
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
