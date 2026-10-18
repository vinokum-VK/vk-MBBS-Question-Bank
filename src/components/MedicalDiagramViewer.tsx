import React from 'react';
import { Palette, Layers, Info } from 'lucide-react';

interface MedicalDiagramViewerProps {
  type: string;
  title: string;
}

export const MedicalDiagramViewer: React.FC<MedicalDiagramViewerProps> = ({ type, title }) => {
  // Render high-fidelity, accurate vector SVG diagrams based on topic
  const renderSvg = () => {
    switch (type) {
      case 'brachial-plexus':
        return (
          <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-[#0e1017] rounded-xl p-2">
            <defs>
              <linearGradient id="nerveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            {/* Headers */}
            <text x="50" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">ROOTS</text>
            <text x="160" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">TRUNKS</text>
            <text x="270" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">DIVISIONS</text>
            <text x="390" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">CORDS</text>
            <text x="520" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">BRANCHES</text>

            <line x1="20" y1="35" x2="580" y2="35" stroke="#374151" strokeDasharray="4 4" />

            {/* Roots (C5, C6, C7, C8, T1) */}
            <circle cx="50" cy="65" r="7" fill="#f59e0b" />
            <text x="30" y="69" fill="#e5e7eb" fontSize="11" fontWeight="bold">C5</text>

            <circle cx="50" cy="115" r="7" fill="#f59e0b" />
            <text x="30" y="119" fill="#e5e7eb" fontSize="11" fontWeight="bold">C6</text>

            <circle cx="50" cy="165" r="7" fill="#f59e0b" />
            <text x="30" y="169" fill="#e5e7eb" fontSize="11" fontWeight="bold">C7</text>

            <circle cx="50" cy="215" r="7" fill="#f59e0b" />
            <text x="30" y="219" fill="#e5e7eb" fontSize="11" fontWeight="bold">C8</text>

            <circle cx="50" cy="265" r="7" fill="#f59e0b" />
            <text x="30" y="269" fill="#e5e7eb" fontSize="11" fontWeight="bold">T1</text>

            {/* Upper Trunk Formation & Erb's Point */}
            <path d="M 50 65 L 140 90" stroke="#f59e0b" strokeWidth="4" fill="none" />
            <path d="M 50 115 L 140 90" stroke="#f59e0b" strokeWidth="4" fill="none" />
            <circle cx="140" cy="90" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="140" y="70" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Erb's Point ★</text>

            {/* Middle Trunk */}
            <path d="M 50 165 L 160 165" stroke="#f59e0b" strokeWidth="4" fill="none" />

            {/* Lower Trunk */}
            <path d="M 50 215 L 140 240" stroke="#f59e0b" strokeWidth="4" fill="none" />
            <path d="M 50 265 L 140 240" stroke="#f59e0b" strokeWidth="4" fill="none" />
            <circle cx="140" cy="240" r="7" fill="#f59e0b" />

            {/* Divisions and Cords */}
            <path d="M 140 90 L 370 90" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <text x="390" y="85" fill="#3b82f6" fontSize="10" fontWeight="bold">Lateral Cord</text>
            <path d="M 370 90 L 490 60" stroke="#3b82f6" strokeWidth="3" fill="none" />
            <text x="500" y="64" fill="#93c5fd" fontSize="10">Musculocutaneous N.</text>

            {/* Posterior Cord */}
            <path d="M 140 90 L 260 165 L 370 165" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3" fill="none" />
            <path d="M 160 165 L 370 165" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3" fill="none" />
            <path d="M 140 240 L 260 165 L 370 165" stroke="#10b981" strokeWidth="3" strokeDasharray="3 3" fill="none" />
            <text x="390" y="160" fill="#10b981" fontSize="10" fontWeight="bold">Posterior Cord</text>
            <path d="M 370 165 L 490 145" stroke="#10b981" strokeWidth="3" fill="none" />
            <text x="500" y="149" fill="#a7f3d0" fontSize="10">Axillary N.</text>
            <path d="M 370 165 L 490 175" stroke="#10b981" strokeWidth="3" fill="none" />
            <text x="500" y="179" fill="#a7f3d0" fontSize="10">Radial N.</text>

            {/* Medial Cord */}
            <path d="M 140 240 L 370 240" stroke="#ec4899" strokeWidth="3" fill="none" />
            <text x="390" y="245" fill="#ec4899" fontSize="10" fontWeight="bold">Medial Cord</text>
            <path d="M 370 240 L 490 260" stroke="#ec4899" strokeWidth="3" fill="none" />
            <text x="500" y="264" fill="#fbcfe8" fontSize="10">Ulnar N.</text>

            {/* Median Nerve Union (M shape) */}
            <path d="M 370 90 L 440 120 L 490 120" stroke="#8b5cf6" strokeWidth="3" fill="none" />
            <path d="M 370 240 L 440 120" stroke="#8b5cf6" strokeWidth="3" fill="none" />
            <text x="500" y="124" fill="#c4b5fd" fontSize="10" fontWeight="bold">Median N. (M-Loop)</text>
          </svg>
        );

      case 'stomach-bed':
        return (
          <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-[#0e1017] rounded-xl p-2">
            <rect width="600" height="320" rx="12" fill="#0f1118" />
            {/* Outline of Stomach (dashed overlay) */}
            <path
              d="M 210 60 C 130 90, 110 200, 200 260 C 290 310, 390 260, 420 200 C 440 160, 400 90, 310 80 C 270 75, 230 50, 210 60 Z"
              fill="rgba(168, 85, 247, 0.08)"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text x="180" y="110" fill="#c084fc" fontSize="12" fontWeight="bold" opacity="0.6">
              [Stomach Silhouette (Reflected Anteriorly)]
            </text>

            {/* Stomach Bed Organs */}
            {/* 1. Left Dome of Diaphragm */}
            <path d="M 120 70 Q 230 30 350 70" stroke="#94a3b8" strokeWidth="6" fill="none" />
            <text x="235" y="45" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">1. Left Dome of Diaphragm</text>

            {/* 2. Spleen */}
            <ellipse cx="140" cy="140" rx="40" ry="25" fill="#831843" stroke="#f43f5e" strokeWidth="2" transform="rotate(-25 140 140)" />
            <text x="140" y="144" fill="#ffe4e6" fontSize="10" fontWeight="bold" textAnchor="middle">2. Spleen</text>

            {/* 3. Left Kidney & Suprarenal */}
            <path d="M 200 130 C 180 130, 175 200, 210 210 C 235 210, 240 130, 200 130 Z" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="195,115 215,115 205,95" fill="#ca8a04" stroke="#facc15" strokeWidth="1.5" />
            <text x="205" y="170" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Left Kidney</text>
            <text x="205" y="108" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle">Suprarenal</text>

            {/* 4. Pancreas Body & Tail */}
            <path d="M 230 180 C 270 170, 320 160, 390 180 C 370 205, 300 205, 230 180 Z" fill="#713f12" stroke="#eab308" strokeWidth="2" />
            <text x="310" y="195" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">4. Pancreas (Body & Tail)</text>

            {/* 5. Tortuous Splenic Artery */}
            <path d="M 240 165 Q 260 145 280 165 T 320 165 T 360 155 L 175 135" stroke="#ef4444" strokeWidth="3" fill="none" />
            <text x="320" y="148" fill="#f87171" fontSize="10" fontWeight="bold">5. Splenic Artery (Tortuous)</text>

            {/* 6. Transverse Mesocolon */}
            <rect x="240" y="225" width="160" height="24" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
            <text x="320" y="241" fill="#bbf7d0" fontSize="10" fontWeight="bold" textAnchor="middle">6. Transverse Mesocolon</text>

            {/* 7. Splenic Flexure of Colon */}
            <circle cx="160" cy="240" r="18" fill="#166534" stroke="#4ade80" strokeWidth="1.5" />
            <text x="160" y="244" fill="#dcfce7" fontSize="8" fontWeight="bold" textAnchor="middle">Colon</text>
          </svg>
        );

      case 'action-potential':
        return (
          <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-[#0e1017] rounded-xl p-2">
            <rect width="600" height="320" rx="12" fill="#0f1118" />
            {/* Grid & Axis */}
            <line x1="60" y1="40" x2="60" y2="280" stroke="#475569" strokeWidth="2" />
            <line x1="60" y1="230" x2="570" y2="230" stroke="#475569" strokeWidth="2" />
            <text x="50" y="60" fill="#94a3b8" fontSize="10" textAnchor="end">+30 mV</text>
            <text x="50" y="130" fill="#94a3b8" fontSize="10" textAnchor="end">0 mV</text>
            <text x="50" y="190" fill="#f59e0b" fontSize="10" textAnchor="end">-55 mV</text>
            <text x="50" y="235" fill="#94a3b8" fontSize="10" textAnchor="end">-90 mV</text>

            {/* Threshold dashed */}
            <line x1="60" y1="185" x2="570" y2="185" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="550" y="180" fill="#f59e0b" fontSize="9" textAnchor="end">Threshold</text>

            {/* Ventricular Curve (Purple) */}
            <path
              d="M 60 230 L 110 230 L 130 55 L 160 90 L 320 100 L 420 230 L 520 230"
              stroke="#a855f7"
              strokeWidth="4"
              fill="none"
            />

            {/* Phase Callouts */}
            <circle cx="120" cy="140" r="14" fill="#3b82f6" />
            <text x="120" y="144" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">0</text>
            <text x="145" y="135" fill="#60a5fa" fontSize="10">Fast Na+ Influx</text>

            <circle cx="160" cy="90" r="12" fill="#ec4899" />
            <text x="160" y="94" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>
            <text x="180" y="80" fill="#f472b6" fontSize="10">Transient Ito K+</text>

            <circle cx="240" cy="95" r="14" fill="#ef4444" />
            <text x="240" y="99" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
            <text x="240" y="75" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              Plateau (L-type Ca2+ Influx)
            </text>

            <circle cx="370" cy="165" r="14" fill="#10b981" />
            <text x="370" y="169" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">3</text>
            <text x="395" y="170" fill="#34d399" fontSize="10">Rapid K+ Efflux</text>

            <circle cx="480" cy="230" r="12" fill="#64748b" />
            <text x="480" y="234" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">4</text>
            <text x="480" y="255" fill="#94a3b8" fontSize="10" textAnchor="middle">Na+/K+ ATPase</text>

            {/* Refractory Period shading */}
            <rect x="120" y="270" width="220" height="18" rx="4" fill="#dc2626" opacity="0.8" />
            <text x="230" y="283" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              Absolute Refractory Period (ARP)
            </text>
            <rect x="340" y="270" width="80" height="18" rx="4" fill="#d97706" opacity="0.8" />
            <text x="380" y="283" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              RRP
            </text>
          </svg>
        );

      case 'inguinal-hernia':
        return (
          <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-[#0e1017] rounded-xl p-2">
            <rect width="600" height="320" rx="12" fill="#0f1118" />
            {/* Rectus Abdominis Muscle (Medial) */}
            <rect x="80" y="50" width="70" height="230" rx="8" fill="#881337" stroke="#e11d48" strokeWidth="2" />
            <text x="115" y="170" fill="#ffe4e6" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 115 170)">
              Rectus Abdominis (Medial)
            </text>

            {/* Inguinal Ligament (Inferior) */}
            <line x1="80" y1="270" x2="520" y2="180" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <text x="310" y="260" fill="#fcd34d" fontSize="11" fontWeight="bold">Inguinal Ligament (Poupart's)</text>

            {/* Inferior Epigastric Artery (Lateral boundary of Hesselbach's) */}
            <path d="M 330 220 L 260 50" stroke="#ef4444" strokeWidth="4" />
            <text x="310" y="110" fill="#f87171" fontSize="11" fontWeight="bold">
              Inferior Epigastric Vessels
            </text>

            {/* Hesselbach Triangle Highlight */}
            <polygon points="150,250 150,75 270,75 330,220" fill="rgba(234, 179, 8, 0.15)" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="210" cy="180" r="30" fill="#b91c1c" opacity="0.8" />
            <text x="210" y="175" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">DIRECT</text>
            <text x="210" y="190" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">HERNIA</text>
            <text x="210" y="130" fill="#fef08a" fontSize="12" fontWeight="black" textAnchor="middle">
              Hesselbach's Triangle
            </text>

            {/* Deep Inguinal Ring & Indirect Hernia */}
            <ellipse cx="400" cy="160" rx="20" ry="32" fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" />
            <circle cx="400" cy="160" r="14" fill="#3b82f6" />
            <text x="400" y="155" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">INDIRECT</text>
            <text x="400" y="170" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">HERNIA</text>
            <text x="400" y="110" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
              Deep Inguinal Ring
            </text>
            <text x="400" y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">
              (Lateral to vessels)
            </text>
          </svg>
        );

      case 'dka-protocol':
      default:
        return (
          <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-[#0e1017] rounded-xl p-2">
            <rect width="600" height="320" rx="12" fill="#0f1118" />
            {/* Triad Box */}
            <rect x="30" y="30" width="540" height="70" rx="12" fill="#1f152d" stroke="#7c3aed" strokeWidth="2" />
            <text x="300" y="55" fill="#c084fc" fontSize="12" fontWeight="black" textAnchor="middle">
              DIABETIC KETOACIDOSIS (DKA) PATHOPHYSIOLOGIC TRIAD
            </text>
            <text x="110" y="80" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">1. Hyperglycemia (&gt;200 mg/dL)</text>
            <text x="300" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">2. Ketosis (Beta-OHB &gt;3 mmol/L)</text>
            <text x="490" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. Acidosis (pH &lt;7.30, AG &gt;12)</text>

            {/* Protocol Columns */}
            {/* Fluids */}
            <rect x="30" y="120" width="165" height="160" rx="10" fill="#111827" stroke="#3b82f6" strokeWidth="2" />
            <text x="112" y="145" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">1. FLUID RESUSCITATION</text>
            <text x="45" y="175" fill="#e5e7eb" fontSize="10">Hour 1: 0.9% NS 1-1.5 L/hr</text>
            <text x="45" y="200" fill="#e5e7eb" fontSize="10">Hours 2-4: 250-500 mL/hr</text>
            <text x="45" y="225" fill="#fcd34d" fontSize="10">When BG &le; 250 mg/dL:</text>
            <text x="45" y="245" fill="#93c5fd" fontSize="10">Add 5% Dextrose in 0.45% NS</text>

            {/* Potassium */}
            <rect x="215" y="120" width="170" height="160" rx="10" fill="#111827" stroke="#eab308" strokeWidth="2" />
            <text x="300" y="145" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">2. POTASSIUM (K+)</text>
            <text x="225" y="175" fill="#ef4444" fontSize="10" fontWeight="bold">If K+ &lt; 3.3: HOLD INSULIN!</text>
            <text x="225" y="195" fill="#e5e7eb" fontSize="10">Give 20-30 mEq K+/hr IV</text>
            <text x="225" y="225" fill="#e5e7eb" fontSize="10">If K+ 3.3 - 5.2:</text>
            <text x="225" y="245" fill="#a7f3d0" fontSize="10">Maintain K+ 4.0 - 5.0 mEq/L</text>

            {/* Insulin */}
            <rect x="405" y="120" width="165" height="160" rx="10" fill="#111827" stroke="#10b981" strokeWidth="2" />
            <text x="487" y="145" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. INSULIN PROTOCOL</text>
            <text x="415" y="175" fill="#e5e7eb" fontSize="10">Regular Insulin IV infusion:</text>
            <text x="415" y="195" fill="#6ee7b7" fontSize="10">0.14 U/kg/hr IV</text>
            <text x="415" y="225" fill="#e5e7eb" fontSize="10">Target BG fall:</text>
            <text x="415" y="245" fill="#fcd34d" fontSize="10">50 - 75 mg/dL per hour</text>
          </svg>
        );
    }
  };

  return (
    <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs sm:text-sm font-bold text-white">
            High-Yield University Diagram: {title}
          </h4>
        </div>
        <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded border border-purple-700/60">
          Evaluator Checklist Included
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="overflow-x-auto flex justify-center">
        {renderSvg()}
      </div>

      {/* Examiner Drawing Technique */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px]">
        <div className="p-2.5 bg-[#171923] rounded-xl border border-gray-800 flex items-start gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-red-300">Red Pen / Colored:</span>
            <p className="text-gray-400 text-[10px]">Arteries, active sites, acute inflammation, or pathology zones</p>
          </div>
        </div>
        <div className="p-2.5 bg-[#171923] rounded-xl border border-gray-800 flex items-start gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-300">Blue Pen:</span>
            <p className="text-gray-400 text-[10px]">Venous systems, baseline anatomy contours, standard notes</p>
          </div>
        </div>
        <div className="p-2.5 bg-[#171923] rounded-xl border border-gray-800 flex items-start gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-yellow-300">Yellow / Ochre:</span>
            <p className="text-gray-400 text-[10px]">Nerves, lymphatics, metabolic enzymes, or boundaries</p>
          </div>
        </div>
      </div>
    </div>
  );
};
