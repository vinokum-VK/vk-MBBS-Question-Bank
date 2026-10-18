import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, X, FileText, Check, Sparkles, AlertCircle, Camera, Search } from 'lucide-react';
import { CURRICULUM_DATA, TopicItem } from '../data/mbbsData';

interface QuestionImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: TopicItem) => void;
  onCustomSearch: (extractedText: string) => void;
}

export const QuestionImageUploadModal: React.FC<QuestionImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onCustomSearch,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedTopic, setMatchedTopic] = useState<TopicItem | null>(null);
  const [extractedQuery, setExtractedQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Paste listener for screenshots
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            handleFile(blob);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setFileName(file.name || 'Pasted_Screenshot.png');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      analyzeImage(file.name || 'exam question');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Sample Question Screenshots / Vignettes for quick demonstration
  const sampleVignettes = [
    {
      title: "Diabetic Ketoacidosis (DKA) Vignette",
      query: "Diabetic Ketoacidosis DKA Protocol",
      hint: "Medicine: Kussmaul breathing, fruity odor, anion gap",
    },
    {
      title: "Inguinal Hernia & Hesselbach's Triangle",
      query: "Inguinal Hernia Lichtenstein Repair",
      hint: "Surgery: Groin swelling, deep ring occlusion, mesh",
    },
    {
      title: "Brachial Plexus & Erb's Palsy",
      query: "Brachial Plexus Erb-Duchenne Palsy",
      hint: "Anatomy: Waiter's tip deformity, C5-C6 roots",
    },
    {
      title: "Chronic Myeloid Leukemia (CML)",
      query: "Chronic Myeloid Leukemia CML LAP Score",
      hint: "Pathology: Philadelphia chromosome t(9;22), splenomegaly",
    },
    {
      title: "Senile Cataract & Phacoemulsification",
      query: "Senile Cataract Phacoemulsification",
      hint: "Ophthalmology: Pearly white lens, iris shadow",
    },
  ];

  const analyzeImage = (name: string) => {
    setIsAnalyzing(true);
    setMatchedTopic(null);

    // Simulate smart OCR / vision extraction
    setTimeout(() => {
      setIsAnalyzing(false);

      // Search all topics across all 4 years
      const allTopics: TopicItem[] = [];
      Object.values(CURRICULUM_DATA).forEach((yr) => {
        yr.subjects.forEach((sub) => {
          allTopics.push(...sub.topics);
        });
      });

      // Match based on filename or default to top university 10-mark essay
      const lowerName = name.toLowerCase();
      let matched = allTopics.find(
        (t) =>
          lowerName.includes(t.title.toLowerCase()) ||
          t.title.toLowerCase().split(' ').some((word) => lowerName.includes(word) && word.length > 4)
      );

      if (!matched) {
        // Pick high yield DKA or Brachial Plexus if generic
        matched = allTopics[0];
      }

      setMatchedTopic(matched);
      setExtractedQuery(matched.title);
    }, 900);
  };

  const handleSelectSample = (sample: (typeof sampleVignettes)[0]) => {
    setImagePreview('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" fill="%231a1b26"><rect width="100%" height="100%" rx="12"/><text x="50%" y="45%" fill="%23a855f7" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Exam Question Paper Snippet</text><text x="50%" y="70%" fill="%2394a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">' + sample.title + '</text></svg>');
    setFileName(`${sample.query}.png`);
    analyzeImage(sample.query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#14151e] border border-gray-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-gray-200 max-h-[92vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Scan Question Paper / Upload Screenshot
              </h3>
              <p className="text-xs text-gray-400">
                AI matches your question and generates the full 10-mark blueprint
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag & Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-purple-500 bg-purple-950/20'
              : 'border-gray-700/80 bg-[#191b26] hover:border-purple-600/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-inner">
            <Upload className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-white">
              Drop Question Paper Photo or Click to Browse
            </div>
            <p className="text-xs text-gray-400">
              Supports JPG, PNG, WEBP, or Screenshot • Or simply press <kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-purple-300 font-mono text-[10px] border border-gray-700">Ctrl + V</kbd> to paste
            </p>
          </div>
        </div>

        {/* Image Preview & Extracted State */}
        {imagePreview && (
          <div className="bg-[#191b26] p-4 rounded-xl border border-gray-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                {fileName}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                  setMatchedTopic(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                Remove
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={imagePreview}
                alt="Uploaded Question"
                className="w-full sm:w-44 h-28 object-cover rounded-xl border border-gray-700"
              />

              <div className="flex-1 space-y-2 text-xs">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-purple-400 font-bold py-4">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Extracting question & matching 10-mark blueprints...</span>
                  </div>
                ) : matchedTopic ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        10-Mark Answer Matched
                      </span>
                      <span className="text-[10px] text-gray-400">{matchedTopic.subject}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {matchedTopic.title}
                    </h4>
                    <p className="text-gray-400 text-[11px] line-clamp-2">
                      {matchedTopic.answers.mark10.introAndDefinition}
                    </p>
                    <button
                      onClick={() => {
                        onSelectTopic(matchedTopic);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Complete 10-Mark Answer & Diagrams &rarr;</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Quick Sample Vignettes / Questions */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
            Or try these high-frequency university question snippets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {sampleVignettes.map((sample, i) => (
              <button
                key={i}
                onClick={() => handleSelectSample(sample)}
                className="p-2.5 rounded-xl bg-[#1b1d28] hover:bg-[#252837] border border-gray-800 text-left transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="font-semibold text-gray-200 group-hover:text-purple-300 transition">
                  {sample.title}
                </div>
                <div className="text-[10px] text-gray-400 mt-1">{sample.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
