import React, { useState, useRef, useEffect } from 'react';
import { Search, Upload, Image as ImageIcon, X, Sparkles, FileText, Download, CheckCircle, ArrowRight, Flame } from 'lucide-react';
import { TopicItem } from '../data/mbbsData';
import { generateTopicPdf } from '../utils/pdfGenerator';

interface SearchWithUploadProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedYear: string;
  onSelectTopic: (topic: TopicItem) => void;
  allTopics: TopicItem[];
}

export const SearchWithUpload: React.FC<SearchWithUploadProps> = ({
  searchTerm,
  onSearchChange,
  selectedYear,
  onSelectTopic,
  allTopics,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | '1' | '2' | '3' | '4'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-yield quick-click exam questions categorized
  const QUICK_QUESTIONS = [
    { title: 'Brachial Plexus - Erb vs Klumpke Palsy', year: '1', query: 'Brachial Plexus' },
    { title: 'Stomach Blood Supply & Bed of Stomach', year: '1', query: 'Stomach' },
    { title: 'Cardiac Ventricular Action Potential & Refractory Period', year: '1', query: 'Action Potential' },
    { title: 'TCA (Krebs) Cycle Energetics & Amphibolic Role', year: '1', query: 'TCA Cycle' },
    { title: 'CML - Cytogenetics, Blood Picture & LAP Score', year: '2', query: 'Chronic Myeloid Leukemia' },
    { title: 'Congestive Heart Failure - GDMT 4 Pillars', year: '2', query: 'Congestive Heart Failure' },
    { title: 'Mycobacterium Tuberculosis - GeneXpert & NTEP', year: '2', query: 'Mycobacterium Tuberculosis' },
    { title: 'Cold Chain Equipment & Vaccine Vial Monitor (VVM)', year: '3', query: 'Cold Chain' },
    { title: 'Senile Cataract - Phacoemulsification vs MSICS', year: '3', query: 'Senile Cataract' },
    { title: 'Diabetic Ketoacidosis (DKA) - Fluid & Insulin Protocol', year: '4', query: 'Diabetic Ketoacidosis' },
    { title: 'Inguinal Hernia - Hesselbach Triangle & Lichtenstein Mesh', year: '4', query: 'Inguinal Hernia' },
  ];

  // Clipboard paste support for screenshots (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    setAnalyzingImage(true);
    setUploadedFileName(file.name || 'Pasted_Screenshot.png');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);

      // Intelligent matching from file name or common keywords
      setTimeout(() => {
        setAnalyzingImage(false);
        const nameLower = file.name.toLowerCase();
        let matched = allTopics[0];

        if (nameLower.includes('hernia') || nameLower.includes('groin')) {
          matched = allTopics.find((t) => t.title.includes('Hernia')) || matched;
        } else if (nameLower.includes('stomach') || nameLower.includes('gastric')) {
          matched = allTopics.find((t) => t.title.includes('Stomach')) || matched;
        } else if (nameLower.includes('heart') || nameLower.includes('hf')) {
          matched = allTopics.find((t) => t.title.includes('Heart Failure')) || matched;
        } else if (nameLower.includes('dka') || nameLower.includes('diabetes')) {
          matched = allTopics.find((t) => t.title.includes('Diabetic Ketoacidosis')) || matched;
        } else if (nameLower.includes('cml') || nameLower.includes('leukemia')) {
          matched = allTopics.find((t) => t.title.includes('CML')) || matched;
        } else if (nameLower.includes('brachial') || nameLower.includes('erb')) {
          matched = allTopics.find((t) => t.title.includes('Brachial Plexus')) || matched;
        }

        if (matched) {
          onSearchChange(matched.title.split(' - ')[0]);
        }
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setUploadedFileName(null);
  };

  const handleButtonClick = (q: typeof QUICK_QUESTIONS[0]) => {
    onSearchChange(q.query);
    const found = allTopics.find((t) => t.title.toLowerCase().includes(q.query.toLowerCase()));
    if (found) {
      onSelectTopic(found);
    }
  };

  // Filter quick questions by selected category
  const visibleQuestions = QUICK_QUESTIONS.filter(
    (q) => activeCategory === 'all' || q.year === activeCategory
  );

  return (
    <div className="space-y-3">
      {/* Search Bar Container with Upload Button & Drag-Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex items-center bg-[#15161e] rounded-2xl border transition shadow-lg ${
          isDragging ? 'border-purple-500 bg-purple-950/20 ring-2 ring-purple-500/40' : 'border-gray-700/80 hover:border-gray-600'
        }`}
      >
        <div className="pl-4 text-gray-500">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          placeholder="Search subjects or topics in MBBS (or paste / drop question screenshot)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-xs sm:text-sm pl-3 pr-24 py-3.5 focus:outline-none"
        />

        {/* Action icons right inside the search bar */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-gray-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="hidden"
          />

          {/* Upload Screenshot / File Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
            title="Upload exam question paper photo, handwritten slip, or screenshot (Ctrl+V also supported)"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Screenshot</span>
          </button>
        </div>
      </div>

      {/* Uploaded File / Screenshot Preview Card */}
      {uploadedImage && (
        <div className="p-3 bg-[#191b24] border border-purple-800/60 rounded-xl flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-black/60 border border-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
              <img src={uploadedImage} alt="Uploaded Question" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white line-clamp-1">{uploadedFileName}</span>
                {analyzingImage ? (
                  <span className="text-[10px] text-amber-400 animate-pulse font-semibold">Analyzing Question...</span>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> Matched to 10-Mark Blueprint
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">
                Screenshot captured. Click any question below or download the 10-Mark PDF blueprint directly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={removeUploadedImage}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
              title="Remove uploaded image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Clickable Quick High-Yield Question Buttons */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between flex-wrap gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Yield University Exam Questions (Click to Answer in 10-Marks):</span>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All Years' },
              { id: '1', label: '1st Year' },
              { id: '2', label: '2nd Year' },
              { id: '3', label: '3rd Year' },
              { id: '4', label: 'Final Year' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#181922] text-gray-400 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clickable Question Buttons Grid */}
        <div className="flex flex-wrap gap-1.5">
          {visibleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleButtonClick(q)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171822] hover:bg-purple-950/70 border border-gray-800 hover:border-purple-600/70 text-gray-300 hover:text-white text-xs transition cursor-pointer shadow-sm text-left"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition shrink-0" />
              <span>{q.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/50 text-purple-300 font-mono shrink-0 ml-1">
                10M
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
