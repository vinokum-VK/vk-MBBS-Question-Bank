import React, { useState } from 'react';
import { Rocket, Copy, Check, ExternalLink, X, Download, Terminal, Layers, AlertCircle, Github, Globe } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `git remote add origin https://github.com/vinokum-VK/vk-MBBS-Question-Bank.git\ngit branch -M main\ngit push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#16171d] border border-gray-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-gray-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black shadow-lg shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 76 65">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Deploy to Vercel (vk-MBBS-Question-Bank)
              </h3>
              <p className="text-xs text-gray-400">Account: <span className="font-semibold text-purple-300">vinokum-VK</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live App Notice */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#15231c] to-[#121b16] border border-emerald-500/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Important: Your app is ALREADY LIVE right now!</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Google AI Studio has already deployed and is hosting this exact app live at:
          </p>
          <div className="p-2 bg-black/60 rounded-lg border border-emerald-500/30 flex items-center justify-between text-[11px] font-mono text-emerald-300 break-all">
            <span>https://ais-pre-dndnmvmpa7krkagxcnphky-560571871685.asia-southeast1.run.app</span>
          </div>
          <p className="text-[11px] text-gray-400">
            You can open this URL right now on your iPhone, Android phone, or Windows PC and click <strong>"Install App"</strong> to use it immediately offline without waiting for Vercel!
          </p>
        </div>

        {/* Why the AI can't log into Vercel/GitHub */}
        <div className="mt-4 p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-1">
          <span className="font-bold text-purple-300">Why I cannot log in for you:</span>
          <p className="text-gray-300 leading-relaxed">
            Because of standard security rules, the AI assistant cannot access your personal GitHub password or Vercel account. But I have prepared a <strong>1-Click Download (.ZIP)</strong> package below so you can put it on GitHub with zero terminal commands!
          </p>
        </div>

        {/* Simple 2-Step Drag & Drop Path */}
        <div className="mt-4 bg-[#1a1b24] p-4 rounded-xl border border-gray-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Download className="w-4 h-4 text-purple-400" />
            <span>Easiest Way: 1-Click ZIP Upload (No Terminal Needed)</span>
          </div>

          <ol className="list-decimal pl-5 space-y-2.5 text-gray-300">
            <li>
              Click below to download the complete pre-built project ZIP:
              <div className="pt-1">
                <a
                  href="/vk-mbbs-app.zip"
                  download="vk-MBBS-Question-Bank.zip"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download vk-MBBS-Question-Bank.zip (168 KB)</span>
                </a>
              </div>
            </li>
            <li>
              Unzip the folder on your computer.
            </li>
            <li>
              Open your GitHub repository:{' '}
              <a
                href="https://github.com/vinokum-VK/vk-MBBS-Question-Bank"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-300 underline hover:text-purple-200"
              >
                github.com/vinokum-VK/vk-MBBS-Question-Bank
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
            </li>
            <li>
              Click <strong>"uploading an existing file"</strong>, drag the unzipped project files in, and click <strong>"Commit changes"</strong>!
            </li>
            <li>
              Now open your Vercel tab, refresh, click <strong>Import</strong> next to <strong>vk-MBBS-Question-Bank</strong>, and click <strong>Deploy</strong>!
            </li>
          </ol>
        </div>

        {/* Alternative: Terminal Command */}
        <div className="mt-4 bg-[#14151c] p-3.5 rounded-xl border border-gray-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Or if you have terminal/command prompt:
            </span>
            <button
              onClick={() => handleCopy(gitCommands, 1)}
              className="text-[10px] text-purple-300 hover:text-white px-2 py-0.5 rounded bg-purple-900/40 border border-purple-800 transition cursor-pointer"
            >
              {copiedIndex === 1 ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-black/90 p-2.5 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto border border-gray-800/80">
            {gitCommands}
          </pre>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-800 flex items-center justify-between">
          <div className="text-[11px] text-gray-500">
            Pre-configured with vercel.json, Vite build, & PWA service workers.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
