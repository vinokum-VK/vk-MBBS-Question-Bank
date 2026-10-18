import React from 'react';
import { TopicItem } from '../data/mbbsData';
import { Layers, CheckCircle2, AlertTriangle, ArrowRight, Activity, GitBranch } from 'lucide-react';

interface MedicalVisualDiagramProps {
  topic: TopicItem;
}

export const MedicalVisualDiagram: React.FC<MedicalVisualDiagramProps> = ({ topic }) => {
  const topicId = topic.id;

  return (
    <div className="space-y-6 text-gray-200">
      {/* Visual Medical Illustration Box */}
      <div className="bg-[#12131a] rounded-2xl border border-purple-800/40 p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Interactive Medical Illustration</h4>
              <p className="text-[11px] text-gray-400">Color-coded for University Answer Sheet Submission</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/50">
            Examiner Standard
          </span>
        </div>

        {/* Dynamic SVG Diagram depending on Topic */}
        <div className="w-full bg-[#0a0b0e] p-4 rounded-xl border border-gray-800 flex items-center justify-center overflow-x-auto min-h-[220px]">
          {topicId === 'anat-bp' && (
            <svg viewBox="0 0 700 240" className="w-full max-w-2xl h-auto font-sans">
              <defs>
                <linearGradient id="nerveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
              {/* Columns labels */}
              <text x="50" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">5 ROOTS</text>
              <text x="200" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">3 TRUNKS</text>
              <text x="350" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">6 DIVISIONS</text>
              <text x="490" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">3 CORDS</text>
              <text x="610" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">BRANCHES</text>

              {/* Roots */}
              <circle cx="50" cy="50" r="12" fill="#7c3aed" />
              <text x="50" y="54" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">C5</text>
              
              <circle cx="50" cy="85" r="12" fill="#7c3aed" />
              <text x="50" y="89" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">C6</text>
              
              <circle cx="50" cy="120" r="12" fill="#7c3aed" />
              <text x="50" y="124" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">C7</text>
              
              <circle cx="50" cy="155" r="12" fill="#7c3aed" />
              <text x="50" y="159" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">C8</text>
              
              <circle cx="50" cy="190" r="12" fill="#7c3aed" />
              <text x="50" y="194" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">T1</text>

              {/* Trunks & Erb's Point */}
              <path d="M 62 50 L 160 65 L 210 65" stroke="url(#nerveGrad)" strokeWidth="4" fill="none" />
              <path d="M 62 85 L 160 65" stroke="url(#nerveGrad)" strokeWidth="4" fill="none" />
              
              {/* Erb's Point Beacon */}
              <circle cx="160" cy="65" r="14" fill="#ef4444" opacity="0.3" />
              <circle cx="160" cy="65" r="7" fill="#ef4444" />
              <text x="160" y="45" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">ERB'S POINT</text>
              <text x="210" y="60" fill="#fde047" fontSize="11" fontWeight="bold">Upper Trunk (C5-C6)</text>

              <path d="M 62 120 L 210 120" stroke="url(#nerveGrad)" strokeWidth="4" fill="none" />
              <text x="210" y="115" fill="#fde047" fontSize="11" fontWeight="bold">Middle Trunk (C7)</text>

              <path d="M 62 155 L 160 175 L 210 175" stroke="url(#nerveGrad)" strokeWidth="4" fill="none" />
              <path d="M 62 190 L 160 175" stroke="url(#nerveGrad)" strokeWidth="4" fill="none" />
              <text x="210" y="195" fill="#fde047" fontSize="11" fontWeight="bold">Lower Trunk (C8-T1)</text>

              {/* Cords */}
              <path d="M 280 65 L 480 75" stroke="#3b82f6" strokeWidth="4" fill="none" />
              <text x="490" y="70" fill="#60a5fa" fontSize="11" fontWeight="bold">Lateral Cord</text>
              
              <path d="M 280 120 L 480 120" stroke="#10b981" strokeWidth="4" fill="none" />
              <text x="490" y="115" fill="#34d399" fontSize="11" fontWeight="bold">Posterior Cord</text>
              
              <path d="M 280 175 L 480 165" stroke="#ec4899" strokeWidth="4" fill="none" />
              <text x="490" y="170" fill="#f472b6" fontSize="11" fontWeight="bold">Medial Cord</text>

              {/* Terminal nerves */}
              <text x="610" y="65" fill="#e2e8f0" fontSize="10">Musculocutaneous</text>
              <text x="610" y="95" fill="#e2e8f0" fontSize="10">Axillary & Radial</text>
              <text x="610" y="135" fill="#e2e8f0" fontSize="10">Median (Lat+Med)</text>
              <text x="610" y="170" fill="#e2e8f0" fontSize="10">Ulnar Nerve</text>
            </svg>
          )}

          {topicId === 'anat-stomach' && (
            <svg viewBox="0 0 600 240" className="w-full max-w-xl h-auto font-sans">
              <rect x="20" y="20" width="560" height="200" rx="16" fill="#14151f" stroke="#333" />
              <text x="40" y="45" fill="#c084fc" fontSize="12" fontWeight="bold">STOMACH BED STRUCTURES (POSTERIOR RELATIONS)</text>

              {/* Central stomach outline */}
              <path d="M 160 70 C 220 50, 320 60, 330 110 C 340 160, 280 190, 200 180 C 140 175, 120 130, 160 70 Z" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6 4" />
              <text x="220" y="125" fill="#fef08a" fontSize="12" fontWeight="bold">Stomach Contour</text>

              {/* Bed organs */}
              <g>
                <rect x="50" y="70" width="90" height="40" rx="8" fill="#374151" stroke="#4b5563" />
                <text x="60" y="95" fill="#93c5fd" fontSize="10" fontWeight="bold">Left Dome</text>
                <text x="60" y="105" fill="#cbd5e1" fontSize="9">Diaphragm</text>

                <rect x="360" y="60" width="90" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                <text x="375" y="85" fill="#a5b4fc" fontSize="11" fontWeight="bold">Spleen</text>
                <text x="370" y="98" fill="#c7d2fe" fontSize="8">& Splenic Artery</text>

                <rect x="200" y="140" width="160" height="35" rx="8" fill="#3b0764" stroke="#a855f7" />
                <text x="215" y="162" fill="#e9d5ff" fontSize="11" fontWeight="bold">Pancreas (Body & Tail)</text>

                <rect x="220" y="60" width="110" height="35" rx="8" fill="#064e3b" stroke="#10b981" />
                <text x="230" y="82" fill="#6ee7b7" fontSize="10" fontWeight="bold">Left Kidney &</text>
                <text x="230" y="92" fill="#a7f3d0" fontSize="8">Left Suprarenal</text>

                <rect x="180" y="185" width="200" height="25" rx="6" fill="#1e293b" stroke="#64748b" />
                <text x="220" y="202" fill="#94a3b8" fontSize="10">Transverse Mesocolon</text>
              </g>
            </svg>
          )}

          {topicId === 'physio-ap' && (
            <svg viewBox="0 0 600 240" className="w-full max-w-xl h-auto font-sans">
              <line x1="50" y1="200" x2="550" y2="200" stroke="#475569" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
              
              <text x="15" y="40" fill="#94a3b8" fontSize="10">+20 mV</text>
              <text x="20" y="120" fill="#94a3b8" fontSize="10">0 mV</text>
              <text x="10" y="200" fill="#94a3b8" fontSize="10">-90 mV</text>

              {/* Ventricular Action Potential Curve */}
              <path d="M 60 200 L 130 200 L 135 35 L 160 55 L 320 65 L 420 200 L 530 200" fill="none" stroke="#a855f7" strokeWidth="4" />

              {/* Phase tags */}
              <text x="110" y="110" fill="#f43f5e" fontSize="11" fontWeight="bold">Phase 0 (Na+ Influx)</text>
              <text x="165" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold">Phase 1 (Transient K+)</text>
              <text x="220" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">Phase 2 Plateau (Ca2+ Influx / K+ Efflux)</text>
              <text x="380" y="140" fill="#34d399" fontSize="11" fontWeight="bold">Phase 3 (K+ Efflux)</text>
              <text x="460" y="190" fill="#94a3b8" fontSize="11" fontWeight="bold">Phase 4 (RMP)</text>

              {/* Refractory zone */}
              <rect x="130" y="210" width="220" height="15" rx="4" fill="#ef4444" opacity="0.3" />
              <text x="180" y="222" fill="#fca5a5" fontSize="9" fontWeight="bold">Absolute Refractory Period (ARP)</text>

              <rect x="350" y="210" width="80" height="15" rx="4" fill="#f59e0b" opacity="0.3" />
              <text x="360" y="222" fill="#fde68a" fontSize="9" fontWeight="bold">RRP</text>
            </svg>
          )}

          {/* Default diagram renderer for any other topic */}
          {!['anat-bp', 'anat-stomach', 'physio-ap'].includes(topicId) && (
            <div className="w-full py-4 text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-700/60 text-purple-300 text-xs font-bold">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>{topic.subject} Anatomical & Pathological Layout</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs">
                <div className="p-3 bg-[#171822] rounded-xl border border-red-800/40 text-red-200">
                  <span className="font-bold block text-red-400">Vascular & Arterial</span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">Draw with Red Pen (leader lines straight)</span>
                </div>
                <div className="p-3 bg-[#171822] rounded-xl border border-blue-800/40 text-blue-200">
                  <span className="font-bold block text-blue-400">Venous & Structural</span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">Draw with Blue Pen & clear borders</span>
                </div>
                <div className="p-3 bg-[#171822] rounded-xl border border-amber-800/40 text-amber-200">
                  <span className="font-bold block text-amber-400">Nerves & Lymphatics</span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">Draw with Yellow / Green highlights</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Examiner Diagram Checklist */}
        <div className="space-y-2 pt-1">
          <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Diagram Labeling Requirements for Full Marks:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {topic.answers.mark10.diagramChecklist.map((diag, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#181924] border border-gray-800 text-gray-300">
                <span className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{diag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Flowchart Box */}
      <div className="bg-[#12131a] rounded-2xl border border-purple-800/40 p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Clinical Decision & Pathogenesis Flowchart</h4>
              <p className="text-[11px] text-gray-400">Stepwise University Evaluator Grading Path</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-700/50">
            Flowchart Sequence
          </span>
        </div>

        {/* Node Flowchart Component */}
        <div className="p-4 bg-[#0a0b0e] rounded-xl border border-gray-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs flex-wrap">
            <div className="p-3 bg-[#1e202e] border border-purple-600/60 rounded-xl text-center flex-1 min-w-[140px] shadow">
              <span className="text-[10px] uppercase font-bold text-purple-400 block">Step 1: Onset / Cause</span>
              <span className="font-semibold text-white mt-1 block">Clinical Presentation</span>
            </div>

            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden sm:block" />

            <div className="p-3 bg-[#1e202e] border border-amber-600/60 rounded-xl text-center flex-1 min-w-[140px] shadow">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Step 2: Gold Standard</span>
              <span className="font-semibold text-white mt-1 block">Diagnostic Workup</span>
            </div>

            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden sm:block" />

            <div className="p-3 bg-[#1e202e] border border-blue-600/60 rounded-xl text-center flex-1 min-w-[140px] shadow">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Step 3: Staging</span>
              <span className="font-semibold text-white mt-1 block">Risk Stratification</span>
            </div>

            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden sm:block" />

            <div className="p-3 bg-[#1e202e] border border-emerald-600/60 rounded-xl text-center flex-1 min-w-[140px] shadow">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Step 4: Definitive</span>
              <span className="font-semibold text-white mt-1 block">Medical & Surgical Rx</span>
            </div>
          </div>

          {/* Flowchart Text Schema */}
          <div className="mt-3 p-3 bg-[#13141f] rounded-lg border border-purple-900/60 font-mono text-xs text-purple-200 leading-relaxed overflow-x-auto">
            {topic.answers.mark10.topperFlowchart}
          </div>
        </div>

        <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 text-[11px] text-gray-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Exam Presentation Rule:</strong> Always draw this flowchart in the right-hand margin of your 10-mark essay. Examiners award up to 2 bonus marks for clear linear logic!
          </span>
        </div>
      </div>
    </div>
  );
};
