/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CURRICULUM_DATA,
  TOPPER_EXAM_STRATEGIES,
  TopicItem,
  SubjectItem,
} from './data/mbbsData';
import { PWAInstallButton } from './components/PWAInstallButton';
import { VercelDeployModal } from './components/VercelDeployModal';
import { AnswerBlueprintModal } from './components/AnswerBlueprintModal';
import { QuestionPaperModal } from './components/QuestionPaperModal';
import { MockQuizModal } from './components/MockQuizModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  Search,
  Bookmark,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText,
  HelpCircle,
  GraduationCap,
  Flame,
  Lightbulb,
  ExternalLink,
  Clock,
  Layers,
  Filter,
  Download,
} from 'lucide-react';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<'1' | '2' | '3' | '4'>(() => {
    const saved = localStorage.getItem('vk_mbbs_year');
    return (saved as '1' | '2' | '3' | '4') || '1';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'papers' | 'strategy' | 'saved'>('papers');
  const [weightFilter, setWeightFilter] = useState<'all' | '10-Mark Essay' | '5-Mark Short Essay' | '2-Mark Short Note'>('all');

  // Bookmarks & Mastered storage
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>(() => {
    try {
      const data = localStorage.getItem('vk_mbbs_bookmarks');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  const [masteredItems, setMasteredItems] = useState<Record<string, boolean>>(() => {
    try {
      const data = localStorage.getItem('vk_mbbs_mastered');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  // Modal states
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [paperModalData, setPaperModalData] = useState<{
    subject: SubjectItem;
    mode: 'paper' | 'answers';
  } | null>(null);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vk_mbbs_year', selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    localStorage.setItem('vk_mbbs_bookmarks', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem('vk_mbbs_mastered', JSON.stringify(masteredItems));
  }, [masteredItems]);

  const toggleBookmark = (id: string) => {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string) => {
    setMasteredItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentYearData = CURRICULUM_DATA[selectedYear];

  // Filter subjects and topics based on search & filter
  const filteredSubjects = currentYearData.subjects
    .map((sub) => {
      const matchingTopics = sub.topics.filter((topic) => {
        const matchesSearch =
          topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.answers.mark2.definition.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesWeight = weightFilter === 'all' || topic.examWeight === weightFilter;
        const matchesSaved = activeTab !== 'saved' || savedItems[topic.id];

        return matchesSearch && matchesWeight && matchesSaved;
      });

      return {
        ...sub,
        topics: matchingTopics,
      };
    })
    .filter((sub) => sub.topics.length > 0 || searchTerm === '');

  // Calculate stats
  const totalBookmarked = Object.values(savedItems).filter(Boolean).length;
  const totalMastered = Object.values(masteredItems).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#13141b]/95 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-purple-600/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#121319] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                  VK
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm md:text-base leading-none text-white">
                  VK MBBS Question Bank
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                  Topper Edition
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5 hidden xs:block">
                All 4 Years University Papers • Blueprints • Multi-Platform PWA
              </p>
            </div>
          </div>

          {/* Action Buttons: Deploy Vercel + Install App */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-700/50 text-purple-200 text-xs font-semibold hover:bg-purple-900/70 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Rapid Quiz</span>
            </button>

            <a
              href="/vk-mbbs-app.zip"
              download="vk-MBBS-Question-Bank.zip"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-700/60 text-purple-200 text-xs font-semibold hover:bg-purple-900/60 transition cursor-pointer"
              title="Download entire project ZIP to your computer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Project ZIP</span>
            </a>

            <button
              onClick={() => setIsVercelModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b1d28] hover:bg-[#252837] text-white text-xs font-semibold border border-emerald-500/40 transition shadow-sm cursor-pointer"
              title="Vercel & GitHub Deployment Status"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 76 65">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              <span className="hidden sm:inline">Vercel Live</span>
            </button>

            <PWAInstallButton />
          </div>
        </div>

        {/* MBBS Year Selector Tabs */}
        <div className="border-t border-gray-800/80 bg-[#101117] overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center space-x-2">
            {(['1', '2', '3', '4'] as const).map((yr) => {
              const info = CURRICULUM_DATA[yr];
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-[#181922] text-gray-400 border border-gray-800 hover:text-gray-200 hover:bg-[#1f202b]'
                  }`}
                >
                  <GraduationCap className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                  <span>{info.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-purple-800/80 text-purple-200' : 'bg-gray-800 text-gray-400'}`}>
                    {info.subjects.length} Subjects
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex-1 w-full space-y-5">
        {/* Phase Info Banner & Quick Stats */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#181924] to-[#14151e] border border-purple-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-purple-400">
                {currentYearData.phase}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-400">{currentYearData.duration}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {currentYearData.name} University Question Bank & Answer Blueprints
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e202c] border border-gray-700/80 text-gray-300">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Saved: <strong className="text-white">{totalBookmarked}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e202c] border border-gray-700/80 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mastered: <strong className="text-white">{totalMastered}</strong></span>
            </div>
          </div>
        </div>

        {/* Search & Navigation Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search subjects or topics in ${currentYearData.name}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#15161e] text-gray-200 placeholder-gray-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 border border-gray-700/80 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center gap-1.5 bg-[#15161e] p-1 rounded-xl border border-gray-700/80 shrink-0">
              <button
                onClick={() => setActiveTab('papers')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'papers'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Question Bank
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'strategy'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Topper Strategy</span>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'saved'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Saved ({totalBookmarked})</span>
              </button>
            </div>
          </div>

          {/* Filter Chips when in Question Bank */}
          {activeTab !== 'strategy' && (
            <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
              <span className="text-gray-500 flex items-center gap-1 shrink-0 text-[11px] font-semibold">
                <Filter className="w-3 h-3" /> Filter By:
              </span>
              {[
                { label: 'All Questions', value: 'all' },
                { label: '10-Mark Essays', value: '10-Mark Essay' },
                { label: '5-Mark Short Essays', value: '5-Mark Short Essay' },
                { label: '2-Mark Short Notes', value: '2-Mark Short Note' },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setWeightFilter(f.value as any)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                    weightFilter === f.value
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-700/80'
                      : 'bg-[#15161e] text-gray-400 border border-gray-800 hover:text-gray-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        {activeTab === 'strategy' ? (
          /* Topper Strategy View */
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#15161e] border border-purple-800/40 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">University Gold Medalist Exam Playbook</h3>
                  <p className="text-xs text-gray-400">Written by Top Rankers for Rajiv Gandhi, TN Dr MGR, KUHS, WBUHS, AIIMS & MUHS</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {TOPPER_EXAM_STRATEGIES.map((strat, i) => (
                  <div key={i} className="bg-[#1b1c26] p-4 rounded-xl border border-gray-800 space-y-2.5">
                    <h4 className="text-sm font-bold text-purple-300">{strat.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{strat.summary}</p>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-300 pt-1">
                      {strat.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Rapid Quiz Launch Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-[#14151e] border border-indigo-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Test Your High-Yield Knowledge Now
                </h4>
                <p className="text-xs text-gray-400">
                  Interactive MCQ & Spotter simulation with explanations, score badges, and confetti rewards.
                </p>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-purple-600/30 transition cursor-pointer shrink-0"
              >
                Launch Mock Exam Quiz
              </button>
            </div>
          </div>
        ) : (
          /* Question Bank Subjects Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSubjects.length === 0 ? (
              <div className="col-span-full py-12 text-center space-y-3 bg-[#15161e] rounded-2xl border border-gray-800">
                <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />
                <h4 className="text-sm font-bold text-gray-300">No matching questions found</h4>
                <p className="text-xs text-gray-500">Try broadening your search term or reset the filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setWeightFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-[#15161e] border border-gray-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between shadow-xl hover:border-gray-700 transition"
                >
                  <div className="space-y-4">
                    {/* Subject Header */}
                    <div className="flex items-start justify-between border-b border-gray-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-800 font-bold">
                            {subject.code}
                          </span>
                          <h3 className="font-bold text-base text-white">{subject.name}</h3>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1">{subject.paperTitle}</p>
                      </div>

                      <div className="text-right text-[11px] text-gray-400 font-mono">
                        <div>Max: {subject.totalMarks} Marks</div>
                        <div>{subject.examDuration}</div>
                      </div>
                    </div>

                    {/* High Yield Topics List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          High-Yield University Topics ({subject.topics.length})
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {subject.topics.map((topic) => {
                          const isBookmarked = !!savedItems[topic.id];
                          const isMastered = !!masteredItems[topic.id];

                          return (
                            <div
                              key={topic.id}
                              className="bg-[#101117] p-3 rounded-xl border border-gray-800/80 space-y-2.5 hover:border-purple-800/60 transition"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                      {topic.frequency}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                                      {topic.examWeight}
                                    </span>
                                    {isMastered && (
                                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                        Mastered
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-gray-200">
                                    {topic.title}
                                  </h4>
                                </div>

                                <button
                                  onClick={() => toggleBookmark(topic.id)}
                                  className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 ${
                                    isBookmarked
                                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                      : 'bg-gray-800 text-gray-500 border-gray-700 hover:text-white'
                                  }`}
                                  title="Bookmark topic"
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Blueprint Action Buttons */}
                              <div className="grid grid-cols-4 gap-1.5 pt-1">
                                <button
                                  onClick={() => setSelectedTopic(topic)}
                                  className="py-1 px-2 rounded-lg bg-[#1b1c26] text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 hover:border-purple-700/60 text-[11px] font-semibold border border-gray-800 transition cursor-pointer text-center"
                                >
                                  2-Mark
                                </button>
                                <button
                                  onClick={() => setSelectedTopic(topic)}
                                  className="py-1 px-2 rounded-lg bg-[#1b1c26] text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 hover:border-purple-700/60 text-[11px] font-semibold border border-gray-800 transition cursor-pointer text-center"
                                >
                                  5-Mark
                                </button>
                                <button
                                  onClick={() => setSelectedTopic(topic)}
                                  className="py-1 px-2 rounded-lg bg-[#1b1c26] text-gray-300 hover:bg-purple-900/40 hover:text-purple-200 hover:border-purple-700/60 text-[11px] font-semibold border border-gray-800 transition cursor-pointer text-center"
                                >
                                  10-Mark
                                </button>
                                <button
                                  onClick={() => setSelectedTopic(topic)}
                                  className="py-1 px-2 rounded-lg bg-blue-950/40 text-blue-300 hover:bg-blue-900/60 text-[11px] font-semibold border border-blue-800/60 transition cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <Lightbulb className="w-3 h-3 text-amber-400" />
                                  <span>Tips</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Subject Card Footer: View Q-Paper & Answers */}
                  <div className="pt-4 mt-4 border-t border-gray-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaperModalData({ subject, mode: 'paper' })}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1e202b] hover:bg-[#252836] text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>Q-Paper ({subject.qSize})</span>
                    </button>
                    <button
                      onClick={() => setPaperModalData({ subject, mode: 'answers' })}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1e202b] hover:bg-[#252836] text-gray-200 text-xs font-semibold border border-gray-700 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Answer Key ({subject.aSize})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800 bg-[#101117] py-6 px-4 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-300">VK MBBS Question Bank</span>
            <span>•</span>
            <span>Ultimate Topper Edition</span>
            <span>•</span>
            <span className="text-purple-400">PWA Enabled</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button
              onClick={() => setIsVercelModalOpen(true)}
              className="hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              <span>Vercel Deploy Guide</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="hover:text-white transition cursor-pointer"
            >
              Mock Exam Quiz
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selectedTopic && (
        <AnswerBlueprintModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          isBookmarked={!!savedItems[selectedTopic.id]}
          onToggleBookmark={toggleBookmark}
          isMastered={!!masteredItems[selectedTopic.id]}
          onToggleMastered={toggleMastered}
        />
      )}

      {paperModalData && (
        <QuestionPaperModal
          subject={paperModalData.subject}
          mode={paperModalData.mode}
          yearName={currentYearData.name}
          onClose={() => setPaperModalData(null)}
          onOpenTopic={(topicId) => {
            const found = paperModalData.subject.topics.find((t) => t.id === topicId);
            if (found) {
              setPaperModalData(null);
              setSelectedTopic(found);
            }
          }}
        />
      )}

      <VercelDeployModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />

      <MockQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        selectedYear={selectedYear}
      />

      <OfflineIndicator />
    </div>
  );
}
