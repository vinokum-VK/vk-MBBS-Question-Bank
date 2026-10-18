import React from 'react';
import { ExternalLink, X, CheckCircle, Github, Globe } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#16171d] border border-emerald-500/50 rounded-2xl shadow-2xl p-5 sm:p-6 text-gray-200 max-h-[92vh] overflow-y-auto cursor-default space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black shadow-lg shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Deployment Completed!
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Live
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                vk-MBBS-Question-Bank is active on GitHub & Vercel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition cursor-pointer"
            title="Close this popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Your Project is Successfully Published!</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            All question papers, blueprints, and offline PWA assets have been committed to GitHub and deployed on Vercel. You do not need to do any further setup!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <a
            href="https://github.com/vinokum-VK/vk-MBBS-Question-Bank"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#1e202b] rounded-xl border border-gray-700/80 hover:border-purple-500 flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-2 text-gray-200 font-semibold">
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub Repository</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
          </a>

          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#1e202b] rounded-xl border border-gray-700/80 hover:border-purple-500 flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-2 text-gray-200 font-semibold">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Vercel Dashboard</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
          </a>
        </div>

        {/* Instructions to Close */}
        <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Click anywhere outside or the button to dismiss.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-md"
          >
            Close & Go to App
          </button>
        </div>
      </div>
    </div>
  );
};
