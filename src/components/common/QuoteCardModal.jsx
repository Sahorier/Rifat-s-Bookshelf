import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Copy, Share2, Sparkles, Check } from 'lucide-react';

export const QuoteCardModal = () => {
  const { activeModal, setActiveModal, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [cardTheme, setCardTheme] = useState('parchment'); // 'parchment', 'midnight', 'crimson', 'emerald'
  const cardRef = useRef(null);

  if (activeModal?.type !== 'quoteCard') return null;

  const { quote, author, source, title } = activeModal.data || {
    quote: "কিছু কথা ধুলোমাখা বইয়ের পাতায় ঘুমায়, কিছু কথা সন্ধ্যার মেঘ হয়ে একা হেঁটে যায়।",
    author: "রিফাত রহমান",
    source: "কবিতার খেরোখাতা",
    title: "সাহিত্য স্মৃতি"
  };

  const themes = {
    parchment: 'bg-[#FAF6EE] text-[#2C221E] border-[#D8C7B5]',
    midnight: 'bg-[#0E131F] text-[#F3EFE0] border-[#2A344D]',
    crimson: 'bg-[#2A0812] text-[#FCE7F3] border-[#701A33]',
    emerald: 'bg-[#0B1E16] text-[#D1FAE5] border-[#134E3B]'
  };

  const handleCopyText = () => {
    const fullText = `"${quote}"\n— ${author} (${source || 'রিফাতের বুকশেলফ'})`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('কপি সম্পন্ন', 'উদ্ধৃতিটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-ink-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-parchment-200 dark:border-ink-700 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-parchment-200 dark:border-ink-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-parchment-900 dark:text-parchment-100">
              কাব্যিক কার্ড জেনারেটর
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-full text-parchment-500 hover:text-parchment-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview Body */}
        <div className="p-6 flex flex-col items-center gap-5">
          
          {/* Theme Palette Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans text-parchment-600 dark:text-parchment-400">থিম নির্বাচন:</span>
            <button
              onClick={() => setCardTheme('parchment')}
              className={`w-6 h-6 rounded-full bg-[#FAF6EE] border-2 ${cardTheme === 'parchment' ? 'border-amber-600 scale-110' : 'border-gray-300'}`}
              title="Parchment Paper"
            />
            <button
              onClick={() => setCardTheme('midnight')}
              className={`w-6 h-6 rounded-full bg-[#0E131F] border-2 ${cardTheme === 'midnight' ? 'border-amber-400 scale-110' : 'border-gray-500'}`}
              title="Midnight Ink"
            />
            <button
              onClick={() => setCardTheme('crimson')}
              className={`w-6 h-6 rounded-full bg-[#2A0812] border-2 ${cardTheme === 'crimson' ? 'border-rose-400 scale-110' : 'border-gray-500'}`}
              title="Crimson Love"
            />
            <button
              onClick={() => setCardTheme('emerald')}
              className={`w-6 h-6 rounded-full bg-[#0B1E16] border-2 ${cardTheme === 'emerald' ? 'border-emerald-400 scale-110' : 'border-gray-500'}`}
              title="Emerald Serenade"
            />
          </div>

          {/* The Visual Card */}
          <div
            ref={cardRef}
            className={`w-full max-w-sm aspect-[4/5] p-8 rounded-2xl border-2 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${themes[cardTheme]}`}
          >
            {/* Vintage Ornamental Borders */}
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-current opacity-20 pointer-events-none rounded-xl" />
            <div className="absolute top-2 left-2 text-3xl opacity-30 font-serif">“</div>

            {/* Top Title Tag */}
            <div className="text-center pt-2">
              <span className="text-[11px] tracking-widest uppercase opacity-70 font-sans border-b border-current pb-0.5">
                {title || "শব্দের অনুরণন"}
              </span>
            </div>

            {/* Quote Body */}
            <div className="my-auto text-center px-2 py-4">
              <p className="font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-line">
                {quote}
              </p>
            </div>

            {/* Author Attribution */}
            <div className="text-center pb-2">
              <p className="font-serif font-bold text-base tracking-wide">
                — {author || "রিফাত রহমান"}
              </p>
              <p className="text-[11px] opacity-60 font-sans mt-0.5">
                {source || "রিফাতের বুকশেলফ • Rifat's Bookshelf"}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-parchment-200 dark:border-ink-800 bg-parchment-50 dark:bg-ink-950/60 flex items-center justify-between gap-3">
          <p className="text-xs text-parchment-500 font-sans">
            স্টোরি বা সোশ্যাল মিডিয়ায় শেয়ারের উপযোগী
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-medium shadow-md transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'উদ্ধৃতি কপি করুন'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
