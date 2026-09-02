import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

export const DRMProtection = ({ children, watermarkText = "RIFAT'S BOOKSHELF • DIGITAL LICENSE" }) => {
  const [showScreenshotShield, setShowScreenshotShield] = useState(false);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  useEffect(() => {
    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // 2. Prevent Keyboard Copy / Print / Save / DevTools / Screenshot combos
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        triggerScreenshotShield();
      }

      // Windows Snipping tool / Mac screenshot combos (Win+Shift+S, Cmd+Shift+3/4/5)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === '3' || e.key === '4' || e.key === '5')) {
        e.preventDefault();
        triggerScreenshotShield();
      }

      // Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (View Source), Ctrl+C (Copy)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        triggerScreenshotShield();
      }
    };

    const triggerScreenshotShield = () => {
      setShowScreenshotShield(true);
      try {
        navigator.clipboard?.writeText?.('');
      } catch (err) {}
      setTimeout(() => setShowScreenshotShield(false), 2500);
    };

    // 3. Prevent Drag and Drop of text / images
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // 4. Anti-Snipping Tool: Blur on window blur / loss of focus
    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
    };
    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  return (
    <div className="relative select-none w-full h-full">
      {/* Dynamic Watermark Background Pattern */}
      <div className="watermark-overlay z-10 pointer-events-none" />

      {/* Main Content with Blur protection on window blur */}
      <div
        className={`w-full h-full transition-all duration-200 ${
          isWindowBlurred ? 'filter blur-md opacity-40' : ''
        }`}
      >
        {children}
      </div>

      {/* Anti-Screenshot Overlay Shield */}
      {showScreenshotShield && (
        <div className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center text-white p-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-rose-600/20 text-rose-500 border border-rose-500/30 flex items-center justify-center mb-4 animate-bounce">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-rose-400 mb-2">
            স্ক্রিনশট ও অনুলিপি সংরক্ষিত
          </h3>
          <p className="text-sm font-serif text-stone-300 max-w-md leading-relaxed">
            রিফাত হোসেনের সাহিত্যকর্মের কপিরাইট সুরক্ষায় স্ক্রিনশট ও কপি সুবিধা নিষ্ক্রিয় করা হয়েছে।
          </p>
        </div>
      )}

      {/* When window is blurred notice */}
      {isWindowBlurred && (
        <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-stone-900/90 text-amber-300 text-xs font-serif border border-amber-500/30 flex items-center gap-2 shadow-2xl">
            <Lock className="w-3.5 h-3.5" />
            <span>সুরক্ষিত পড়ার জন্য উইন্ডোতে ক্লিক করুন</span>
          </div>
        </div>
      )}
    </div>
  );
};
