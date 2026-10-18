import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Monitor, Smartphone, Apple, CheckCircle2, X, Laptop, ShieldCheck } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, platform, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [activeDeviceTab, setActiveDeviceTab] = useState<'windows' | 'apple' | 'android'>(
    platform === 'apple' ? 'apple' : platform === 'android' ? 'android' : 'windows'
  );

  return (
    <>
      <div className="flex items-center gap-2">
        {isInstalled ? (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition cursor-pointer"
            title="App is installed on your device"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Installed</span>
          </button>
        ) : isInstallable ? (
          <button
            onClick={install}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-purple-600/30 transition cursor-pointer animate-pulse"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        ) : (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-700/60 text-purple-200 text-xs font-medium hover:bg-purple-900/60 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Install on Devices</span>
          </button>
        )}
      </div>

      {/* Multi-Platform Device Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#16171d] border border-gray-700/80 rounded-2xl shadow-2xl p-6 text-gray-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Install VK MBBS Question Bank</h3>
                  <p className="text-xs text-gray-400">Works 100% offline on Windows, Apple & Android</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Device Tabs */}
            <div className="grid grid-cols-3 gap-2 mt-4 p-1 bg-[#0f1015] rounded-xl border border-gray-800">
              <button
                onClick={() => setActiveDeviceTab('windows')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  activeDeviceTab === 'windows'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Windows PC</span>
              </button>
              <button
                onClick={() => setActiveDeviceTab('apple')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  activeDeviceTab === 'apple'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>Apple iOS/Mac</span>
              </button>
              <button
                onClick={() => setActiveDeviceTab('android')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                  activeDeviceTab === 'android'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
            </div>

            {/* Device-Specific Instructions */}
            <div className="mt-5 space-y-4 text-xs">
              {activeDeviceTab === 'windows' && (
                <div className="space-y-3 bg-[#1e2029] p-4 rounded-xl border border-gray-700/60">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Monitor className="w-4 h-4 text-purple-400" />
                    <span>Windows 10 / 11 (Desktop App)</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                    <li>
                      Open this URL in <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.
                    </li>
                    <li>
                      Look at the right end of the address bar for the{' '}
                      <span className="px-1.5 py-0.5 rounded bg-gray-800 text-purple-300 border border-gray-700 font-mono">
                        App available / Install
                      </span>{' '}
                      icon (a desktop monitor with down arrow).
                    </li>
                    <li>
                      Click <strong>Install</strong> or click the <strong>Install App</strong> button in this top bar.
                    </li>
                    <li>
                      A dedicated desktop window will launch and pin to your <strong>Windows Start Menu</strong> and <strong>Taskbar</strong> with zero browser bars!
                    </li>
                  </ol>
                  {isInstallable && (
                    <button
                      onClick={() => {
                        install();
                        setShowGuide(false);
                      }}
                      className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Trigger Windows Install Now
                    </button>
                  )}
                </div>
              )}

              {activeDeviceTab === 'apple' && (
                <div className="space-y-3 bg-[#1e2029] p-4 rounded-xl border border-gray-700/60">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Apple className="w-4 h-4 text-purple-400" />
                    <span>iPhone, iPad & Mac (Safari / Chrome)</span>
                  </div>
                  <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-lg text-purple-200">
                    <strong>On iPhone / iPad:</strong>
                    <ol className="list-decimal pl-5 mt-1.5 space-y-1.5 text-gray-300">
                      <li>
                        Tap the <strong>Share</strong> button (box with an upward arrow <span className="text-white font-mono">⎋ / [↑]</span>) at the bottom of Safari.
                      </li>
                      <li>
                        Scroll down and tap <strong>"Add to Home Screen"</strong> (➕).
                      </li>
                      <li>
                        Tap <strong>Add</strong> in the top-right corner. The VK MBBS icon will appear right on your home screen like an App Store app!
                      </li>
                    </ol>
                  </div>
                  <div className="p-3 bg-gray-800/60 border border-gray-700/60 rounded-lg text-gray-300">
                    <strong>On macOS Sonoma (14+) Safari:</strong>
                    <p className="mt-1">
                      Go to Safari menu bar &rarr; click <strong>File</strong> &rarr; click <strong>"Add to Dock..."</strong> to create a native macOS desktop app.
                    </p>
                  </div>
                </div>
              )}

              {activeDeviceTab === 'android' && (
                <div className="space-y-3 bg-[#1e2029] p-4 rounded-xl border border-gray-700/60">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Android Phones & Tablets (Chrome / Samsung Internet)</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                    <li>
                      Open this web application in <strong>Chrome on Android</strong>.
                    </li>
                    <li>
                      Tap the <strong>Install App</strong> button or tap the 3-dots menu (<span className="font-mono">⋮</span>) at the top right.
                    </li>
                    <li>
                      Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </li>
                    <li>
                      Confirm <strong>Install</strong>. The WebAPK will be registered in your Android App Drawer with notification support and offline caching!
                    </li>
                  </ol>
                  {isInstallable && (
                    <button
                      onClick={() => {
                        install();
                        setShowGuide(false);
                      }}
                      className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Install On This Android Device
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  All high-yield question papers and answer blueprints are cached locally in your browser storage for fast offline revision during hospital ward postings and exam halls.
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-xs transition"
              >
                Got It, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
