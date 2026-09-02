import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DRMProtection } from './DRMProtection';
import { downloadBookAsPDF } from '../../utils/pdfGenerator';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Download,
  Bookmark,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Smartphone,
  Monitor,
  Columns,
  FileText,
  Lock
} from 'lucide-react';

export const BookFlipReader = () => {
  const {
    selectedBookForReading,
    setSelectedBookForReading,
    readerTheme,
    setReaderTheme,
    readerFontSize,
    setReaderFontSize,
    unlockedBookIds,
    isAdmin,
    showToast
  } = useApp();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageSound, setPageSound] = useState(true);
  const [bookmarkedPages, setBookmarkedPages] = useState([]);
  
  // Layout mode: 'flip' (3D dual spread) or 'pad' (Vertical Pad / Sheet Mode)
  const [readingMode, setReadingMode] = useState(() => {
    return window.innerWidth < 768 ? 'pad' : 'flip';
  });

  const readerContainerRef = useRef(null);
  const padContainerRef = useRef(null);

  // Sound synthesizer for page turns
  const playPageTurnSound = () => {
    if (!pageSound) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedBookForReading) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        setSelectedBookForReading(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!selectedBookForReading) return null;

  const book = selectedBookForReading;
  const pages = book.pages || book.fullBookPages || book.previewPages || [
    { pageNumber: 1, title: 'প্রচ্ছদ', content: book.description || 'বইয়ের বিবরণ উপলব্ধ নেই।' }
  ];
  const totalPages = pages.length;

  // Strict Rule: Free books CANNOT be downloaded. Only purchased & unlocked books allow PDF download.
  const isPaidBook = book.type === 'paid' || book.price > 0;
  const isUnlocked = unlockedBookIds.includes(book.id) || isAdmin;
  const canDownloadPDF = isPaidBook && isUnlocked;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPageIndex(prev => prev + 1);
        setIsFlipping(false);
        if (readingMode === 'pad' && padContainerRef.current) {
          padContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPageIndex(prev => prev - 1);
        setIsFlipping(false);
        if (readingMode === 'pad' && padContainerRef.current) {
          padContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const toggleBookmark = () => {
    if (bookmarkedPages.includes(currentPageIndex)) {
      setBookmarkedPages(prev => prev.filter(p => p !== currentPageIndex));
      showToast('বুকমার্ক মোছা হয়েছে', `পৃষ্ঠা ${currentPageIndex + 1} বুকমার্ক থেকে সরানো হয়েছে।`, 'info');
    } else {
      setBookmarkedPages(prev => [...prev, currentPageIndex]);
      showToast('বুকমার্ক যুক্ত হয়েছে', `পৃষ্ঠা ${currentPageIndex + 1} সফলভাবে বুকমার্কে সংরক্ষিত হয়েছে।`, 'success');
    }
  };

  const handleDownloadPDF = () => {
    if (!canDownloadPDF) {
      showToast(
        'ডাউনলোড সীমাবদ্ধ',
        'মুক্ত পাঠাগারের বই শুধুমাত্র অনলাইনে পড়ার জন্য। ক্রয়কৃত ও অনুমোদিত বইয়ের ক্ষেত্রে PDF ডাউনলোড সুবিধা প্রযোজ্য।',
        'warning'
      );
      return;
    }
    downloadBookAsPDF(book);
    showToast('PDF প্রস্তুত হচ্ছে', `'${book.title}' এর প্রিন্টেবল PDF উইন্ডো খোলা হয়েছে।`, 'success');
  };

  // Theme styles
  const themeClasses = {
    parchment: {
      bg: 'paper-texture text-parchment-950 border-parchment-300',
      padBg: 'bg-[#FAF8F5] text-[#231C15]',
      spine: 'bg-parchment-800 text-parchment-100',
      badge: 'bg-amber-100 text-amber-900',
      border: 'border-parchment-300'
    },
    sepia: {
      bg: 'paper-texture-sepia text-[#382b1d] border-[#d8c7a8]',
      padBg: 'bg-[#F4ECD8] text-[#382b1d]',
      spine: 'bg-[#5c4731] text-[#f4ecd8]',
      badge: 'bg-[#e5d4b5] text-[#4a3924]',
      border: 'border-[#d8c7a8]'
    },
    dark: {
      bg: 'paper-texture-dark text-parchment-100 border-ink-700',
      padBg: 'bg-[#141A2B] text-[#FAF8F5]',
      spine: 'bg-ink-950 text-amber-400',
      badge: 'bg-ink-800 text-amber-300',
      border: 'border-ink-700'
    },
    cream: {
      bg: 'bg-[#FAF8F0] text-[#1E2022] border-[#E8E4D5]',
      padBg: 'bg-[#FAF8F0] text-[#1E2022]',
      spine: 'bg-[#3A3F47] text-white',
      badge: 'bg-[#EAE5D4] text-[#2C3038]',
      border: 'border-[#E8E4D5]'
    }
  };

  const currentTheme = themeClasses[readerTheme] || themeClasses.parchment;

  // Font size styles
  const fontSizeClasses = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg md:text-xl leading-loose',
    large: 'text-lg sm:text-xl md:text-2xl leading-loose font-medium'
  };

  const currentPage = pages[currentPageIndex] || pages[0];
  const progressPercent = Math.round(((currentPageIndex + 1) / totalPages) * 100);

  return (
    <div
      ref={readerContainerRef}
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/98 backdrop-blur-2xl animate-fadeIn text-parchment-100 overflow-hidden"
    >
      {/* Top Controls Bar */}
      <div className="h-14 sm:h-16 border-b border-stone-800 bg-stone-900/95 px-3 sm:px-6 flex items-center justify-between z-30 shrink-0">
        
        {/* Book Title & Badges */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif font-bold text-xs sm:text-base text-parchment-50 truncate">
              {book.title}
            </h3>
            <p className="text-[10px] sm:text-xs text-parchment-400 font-sans truncate">
              {book.author || 'রিফাত হোসেন'} &bull; {book.type === 'free' ? 'অনলাইন পাঠাগার (ফ্রি)' : 'ডিজিটাল ই-বুক'}
            </p>
          </div>
        </div>

        {/* Reader Customization Tools */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* PDF Download Button - Only for Purchased / Unlocked Books */}
          {canDownloadPDF ? (
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-[11px] sm:text-xs font-serif font-bold shadow-md transition-all shrink-0"
              title="সম্পূর্ণ বইটি PDF হিসেবে ডাউনলোড / প্রিন্ট করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF ডাউনলোড</span>
              <span className="sm:hidden">PDF</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-800 text-stone-400 text-[11px] font-serif border border-stone-700">
              <Lock className="w-3 h-3 text-amber-500" />
              <span>অনলাইন পাঠযোগ্য</span>
            </div>
          )}

          {/* Reading Mode Switcher (Pad vs Dual Spread) */}
          <div className="hidden md:flex items-center bg-stone-800 rounded-xl p-1 border border-stone-700">
            <button
              onClick={() => setReadingMode('flip')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif flex items-center gap-1 transition-all ${
                readingMode === 'flip' ? 'bg-amber-600 text-white font-bold' : 'text-stone-300'
              }`}
              title="বুক স্প্রেড (3D Spread Mode)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>বুক মোড</span>
            </button>
            <button
              onClick={() => setReadingMode('pad')}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif flex items-center gap-1 transition-all ${
                readingMode === 'pad' ? 'bg-amber-600 text-white font-bold' : 'text-stone-300'
              }`}
              title="প্যাড রিডার (Pad Mode for Tablets & Mobile)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>প্যাড মোড</span>
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors ${
              bookmarkedPages.includes(currentPageIndex)
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            title="বুকমার্ক করুন"
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center bg-stone-800 rounded-xl p-0.5 sm:p-1 border border-stone-700">
            <button
              onClick={() => setReaderFontSize('small')}
              className={`px-1.5 sm:px-2 py-0.5 text-xs font-serif ${readerFontSize === 'small' ? 'bg-amber-600 text-white rounded' : 'text-stone-300'}`}
              title="ছোট ফন্ট"
            >
              A
            </button>
            <button
              onClick={() => setReaderFontSize('medium')}
              className={`px-1.5 sm:px-2 py-0.5 text-xs font-serif ${readerFontSize === 'medium' ? 'bg-amber-600 text-white rounded' : 'text-stone-300'}`}
              title="মাঝারি ফন্ট"
            >
              A+
            </button>
          </div>

          {/* Theme Palette */}
          <div className="flex items-center gap-1 bg-stone-800 p-1 sm:p-1.5 rounded-xl border border-stone-700">
            <button
              onClick={() => setReaderTheme('parchment')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FAF8F5] border ${readerTheme === 'parchment' ? 'ring-2 ring-amber-500' : 'opacity-70'}`}
              title="Parchment"
            />
            <button
              onClick={() => setReaderTheme('sepia')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#F4ECD8] border ${readerTheme === 'sepia' ? 'ring-2 ring-amber-500' : 'opacity-70'}`}
              title="Sepia"
            />
            <button
              onClick={() => setReaderTheme('dark')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#141A2B] border ${readerTheme === 'dark' ? 'ring-2 ring-amber-500' : 'opacity-70'}`}
              title="Midnight"
            />
          </div>

          {/* Close Reader */}
          <button
            onClick={() => setSelectedBookForReading(null)}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 text-rose-400 border border-stone-700 hover:bg-rose-950/50 transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>

      {/* Main Reading Workspace */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 perspective-2000 overflow-hidden relative">
        
        {readingMode === 'flip' ? (
          <>
            {/* Navigation Arrow Left */}
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0 || isFlipping}
              className={`absolute left-2 sm:left-4 lg:left-8 z-40 p-3 sm:p-4 rounded-full bg-stone-900/90 hover:bg-amber-700 text-white border border-stone-700 shadow-2xl transition-all ${
                currentPageIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
              }`}
              title="পূর্ববর্তী পাতা (Previous Page)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Expansive 2-Page Book Spread Container */}
            <div className="w-full max-w-6xl h-[82vh] flex rounded-3xl shadow-book-lg preserve-3d relative overflow-hidden transition-all duration-300">
              <DRMProtection watermarkText={`RIFAT'S BOOKSHELF • RIFAT HOSSAIN • READ ONLY DIGITAL COPY`}>
                <div className={`w-full h-full flex border-4 ${currentTheme.bg} ${currentTheme.border} rounded-3xl overflow-hidden shadow-2xl relative select-none`}>
                  
                  {/* Left Page (Desktop Spread) */}
                  <div className="hidden md:flex flex-1 p-8 lg:p-14 flex-col justify-between border-r border-black/10 page-shadow-left relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs opacity-60 font-serif border-b border-current pb-2">
                      <span>{book.title}</span>
                      <span>{book.author || 'রিফাত হোসেন'}</span>
                    </div>

                    <div className="my-auto py-6 overflow-y-auto max-h-[60vh] pr-2">
                      {currentPageIndex > 0 ? (
                        <div>
                          <h4 className="font-serif font-bold text-xl mb-3 opacity-85 text-amber-800 dark:text-amber-400">
                            {pages[currentPageIndex - 1]?.title || `পৃষ্ঠা ${currentPageIndex}`}
                          </h4>
                          <p className={`font-serif whitespace-pre-line ${fontSizeClasses[readerFontSize]}`}>
                            {pages[currentPageIndex - 1]?.content}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center my-auto space-y-4">
                          <div className="w-28 h-40 mx-auto rounded-xl shadow-lg overflow-hidden border">
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                          </div>
                          <h2 className="font-serif font-bold text-2xl lg:text-3xl tracking-tight">
                            {book.title}
                          </h2>
                          <p className="font-serif text-base text-amber-700 dark:text-amber-400 font-semibold">
                            {book.author || 'রিফাত হোসেন'}
                          </p>
                          <p className="text-xs font-serif opacity-70 max-w-sm mx-auto leading-relaxed">
                            {book.shortDescription || book.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-xs font-serif opacity-60 pt-2 border-t border-current/10">
                      — {currentPageIndex > 0 ? currentPageIndex : 'প্রচ্ছদ'} —
                    </div>
                  </div>

                  {/* Center Book Spine Crease & Shadow */}
                  <div className="hidden md:block w-3 bg-gradient-to-r from-black/30 via-black/10 to-black/30 z-20 book-spine-crease shadow-inner" />

                  {/* Right Page (Active Page) */}
                  <div
                    className={`flex-1 p-6 sm:p-10 lg:p-14 flex flex-col justify-between page-shadow-right relative ${
                      isFlipping ? 'transition-all duration-300 opacity-40 scale-98' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs opacity-60 font-serif border-b border-current pb-2">
                      <span>{currentPage?.title || `পৃষ্ঠা ${currentPageIndex + 1}`}</span>
                      <span>{progressPercent}% পাঠ সম্পন্ন</span>
                    </div>

                    <div className="my-auto py-6 overflow-y-auto max-h-[60vh] pr-2">
                      <h3 className="font-serif font-bold text-2xl lg:text-3xl mb-4 text-amber-800 dark:text-amber-400">
                        {currentPage?.title}
                      </h3>
                      <p className={`font-serif whitespace-pre-line ${fontSizeClasses[readerFontSize]}`}>
                        {currentPage?.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-serif opacity-60 pt-2 border-t border-current/20">
                      <span>{book.genre || 'সাহিত্য'}</span>
                      <span className="font-bold">— {currentPageIndex + 1} / {totalPages} —</span>
                      {bookmarkedPages.includes(currentPageIndex) && (
                        <span className="text-amber-600 font-sans flex items-center gap-1 font-semibold">
                          <Bookmark className="w-3 h-3 fill-current" /> বুকমার্কড
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </DRMProtection>
            </div>

            {/* Navigation Arrow Right */}
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex >= totalPages - 1 || isFlipping}
              className={`absolute right-2 sm:right-4 lg:right-8 z-40 p-3 sm:p-4 rounded-full bg-stone-900/90 hover:bg-amber-700 text-white border border-stone-700 shadow-2xl transition-all ${
                currentPageIndex >= totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
              }`}
              title="পরবর্তী পাতা (Next Page)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        ) : (
          /* OPTION B: PAD / VERTICAL UP-DOWN SWITCHING (Optimized for Android & Tablets) */
          <div className="w-full h-full max-w-2xl flex flex-col justify-between relative animate-fadeIn">
            
            <DRMProtection watermarkText={`RIFAT'S BOOKSHELF • RIFAT HOSSAIN • PAD READER`}>
              <div
                ref={padContainerRef}
                className={`w-full h-[78vh] sm:h-[82vh] rounded-2xl sm:rounded-3xl border-2 ${currentTheme.border} ${currentTheme.padBg} shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto relative select-none`}
              >
                {/* Pad Top Info */}
                <div className="flex items-center justify-between text-xs opacity-70 font-serif border-b border-current/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{book.title}</span>
                    <span>&bull;</span>
                    <span>{currentPage?.title}</span>
                  </div>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                    {currentPageIndex + 1} / {totalPages}
                  </span>
                </div>

                {/* Pad Main Content Area */}
                <div className="my-auto py-4">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-amber-800 dark:text-amber-400">
                    {currentPage?.title}
                  </h3>
                  <div className={`font-serif whitespace-pre-line leading-relaxed ${fontSizeClasses[readerFontSize]}`}>
                    {currentPage?.content}
                  </div>
                </div>

                {/* Pad Bottom Actions with Up/Down Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-current/20 text-xs font-serif">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPageIndex === 0}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/10 dark:bg-white/10 text-current font-bold disabled:opacity-30 active:scale-95 transition-all"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>আগের পাতা (Up)</span>
                  </button>

                  <span className="font-bold opacity-60">
                    {progressPercent}% পাঠ সম্পন্ন
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPageIndex >= totalPages - 1}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 text-white font-bold disabled:opacity-30 active:scale-95 transition-all shadow"
                  >
                    <span>পরের পাতা (Down)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </DRMProtection>

          </div>
        )}

      </div>

      {/* Bottom Navigation & Progress Slider Bar */}
      <div className="h-14 sm:h-16 border-t border-stone-800 bg-stone-900/95 px-3 sm:px-8 flex items-center justify-between gap-3 z-30 shrink-0">
        
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-serif disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">পূর্ববর্তী</span>
        </button>

        <div className="flex-1 max-w-md flex items-center gap-2 sm:gap-3">
          <input
            type="range"
            min="0"
            max={totalPages - 1}
            value={currentPageIndex}
            onChange={(e) => setCurrentPageIndex(parseInt(e.target.value))}
            className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-400 whitespace-nowrap">
            {currentPageIndex + 1} / {totalPages}
          </span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPageIndex >= totalPages - 1}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-serif disabled:opacity-30"
        >
          <span className="hidden sm:inline">পরবর্তী</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
