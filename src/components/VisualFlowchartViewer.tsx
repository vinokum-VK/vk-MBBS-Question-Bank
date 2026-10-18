import React, { useState } from 'react';
import { GitBranch, ArrowDown, Copy, Check, ShieldAlert, Stethoscope, Pill, Scissors, CheckCircle } from 'lucide-react';

interface FlowchartNode {
  step: string;
  stage: 'Triage' | 'Diagnostic' | 'Emergency' | 'Medical' | 'Surgical' | 'Resolution';
  detail: string;
  pearl?: string;
}

interface VisualFlowchartViewerProps {
  title: string;
  flowchartString: string;
}

export const VisualFlowchartViewer: React.FC<VisualFlowchartViewerProps> = ({
  title,
  flowchartString,
}) => {
  const [copied, setCopied] = useState(false);

  // Parse flowchart string into structured nodes if formatted with -> or create standard topper nodes
  const steps = flowchartString.split('->').map((item) => item.trim());

  const getStageIcon = (idx: number, total: number) => {
    if (idx === 0) return <Stethoscope className="w-4 h-4 text-purple-400" />;
    if (idx === 1) return <ShieldAlert className="w-4 h-4 text-red-400" />;
    if (idx === total - 1) return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (idx % 2 === 0) return <Pill className="w-4 h-4 text-blue-400" />;
    return <Scissors className="w-4 h-4 text-amber-400" />;
  };

  const getBadgeColor = (idx: number, total: number) => {
    if (idx === 0) return 'bg-purple-900/60 text-purple-300 border-purple-700';
    if (idx === 1) return 'bg-red-900/60 text-red-300 border-red-700';
    if (idx === total - 1) return 'bg-emerald-900/60 text-emerald-300 border-emerald-700';
    return 'bg-blue-900/60 text-blue-300 border-blue-700';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Flowchart for ${title}:\n` + steps.join(' ->\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs sm:text-sm font-bold text-white">
            Clinical Decision & Pathogenesis Flowchart
          </h4>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-300 hover:text-white px-2.5 py-1 rounded-lg bg-gray-800 border border-gray-700 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Flowchart'}</span>
        </button>
      </div>

      {/* Connected Node Visualizer */}
      <div className="space-y-2 py-2">
        {steps.map((stepText, idx) => (
          <React.Fragment key={idx}>
            <div className="relative flex items-start gap-3 bg-[#181a24] p-3 rounded-xl border border-gray-800/80 hover:border-purple-600/50 transition">
              <div className="w-7 h-7 rounded-lg bg-[#222533] flex items-center justify-center shrink-0 mt-0.5 border border-gray-700">
                {getStageIcon(idx, steps.length)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold border ${getBadgeColor(idx, steps.length)}`}>
                    Stage {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-200">
                    {stepText}
                  </span>
                </div>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex justify-center my-0.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1b1c28] border border-gray-800 text-purple-400">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 text-[11px] text-purple-200 flex items-center justify-between">
        <span><strong>Examiner Rule:</strong> Drawing this flowchart in the margin of your 10-mark essay secures full marks for structure and clinical workflow.</span>
      </div>
    </div>
  );
};
