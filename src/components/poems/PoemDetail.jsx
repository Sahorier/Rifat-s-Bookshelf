import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReaderAdviceBox } from './ReaderAdviceBox';
import {
  ArrowLeft,
  Heart,
  Share2,
  Sparkles,
  MessageCircle,
  Copy,
  Feather,
  CheckCircle2,
  CornerDownRight,
  ShieldCheck
} from 'lucide-react';

export const PoemDetail = ({ poem, onBack }) => {
  const { toggleLikePoem, setActiveModal, showToast } = useApp();
  const [selectedStanzaIndex, setSelectedStanzaIndex] = useState(null);

  const handleOpenQuoteCard = (stanzaLines) => {
    setActiveModal({
      type: 'quoteCard',
      data: {
        quote: stanzaLines.join('\n'),
        author: poem.author,
        source: poem.title,
        title: "কবিতার খেরোখাতা"
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn font-sans">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-serif text-parchment-600 dark:text-parchment-400 hover:text-amber-700 dark:hover:text-amber-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>সকল কবিতায় ফিরে যান</span>
      </button>

      {/* Main Poem Article */}
      <article className="bg-white/80 dark:bg-ink-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 border border-parchment-200 dark:border-ink-800 shadow-xl space-y-8">
        
        {/* Poem Header */}
        <div className="text-center space-y-3 border-b border-parchment-200 dark:border-ink-800 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/10 text-amber-800 dark:text-amber-300 text-xs font-serif">
            <Feather className="w-3.5 h-3.5" />
            <span>{poem.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-parchment-950 dark:text-parchment-50 tracking-tight">
            {poem.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs font-serif text-parchment-500 pt-1">
            <span>কবি: {poem.author}</span>
            <span>&bull;</span>
            <span>তারিখ: {poem.date}</span>
            {poem.status === 'seeking_advice' && (
              <>
                <span>&bull;</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  ✍️ পাঠকদের পরামর্শ চাওয়া হচ্ছে
                </span>
              </>
            )}
          </div>
        </div>

        {/* Stanzas Body with Aesthetic Typography */}
        <div className="py-4 space-y-8 max-w-2xl mx-auto">
          {poem.stanzas?.map((stanza, idx) => (
            <div
              key={stanza.id || idx}
              onClick={() => setSelectedStanzaIndex(idx)}
              className={`p-6 rounded-2xl transition-all duration-300 relative group cursor-pointer ${
                stanza.isIncomplete
                  ? 'bg-amber-500/10 dark:bg-amber-950/30 border-2 border-dashed border-amber-500/40'
                  : selectedStanzaIndex === idx
                  ? 'bg-amber-500/5 dark:bg-amber-950/20 ring-1 ring-amber-600/30 shadow-sm'
                  : 'hover:bg-parchment-100/50 dark:hover:bg-ink-950/50'
              }`}
            >
              {/* Quick Quote Card Generator Tool on Hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenQuoteCard(stanza.lines);
                }}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-amber-600 text-white text-xs shadow-md flex items-center gap-1 font-serif"
                title="এই স্তবকের স্টোরি কার্ড তৈরি করুন"
              >
                <Sparkles className="w-3 h-3" />
                <span className="text-[11px]">কার্ড তৈরি করুন</span>
              </button>

              <div className="font-serif text-lg sm:text-xl md:text-2xl leading-loose text-parchment-900 dark:text-parchment-100 space-y-1">
                {stanza.lines?.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className={line.includes('[') ? 'text-sm font-sans italic text-amber-700 dark:text-amber-400 pt-2' : ''}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social / Reader Engagement Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-parchment-200 dark:border-ink-800">
          
          {/* Like / Love Button */}
          <button
            onClick={() => toggleLikePoem(poem.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-serif font-medium transition-all ${
              poem.isLiked
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-600 shadow-sm'
                : 'bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-700 text-parchment-700 dark:text-parchment-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${poem.isLiked ? 'fill-current text-rose-500' : ''}`} />
            <span>অনুভূতি প্রকাশ ({poem.likes || 0})</span>
          </button>

          {/* Share & Quote Card */}
          <button
            onClick={() => handleOpenQuoteCard(poem.stanzas?.[0]?.lines || [poem.excerpt])}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-600/10 text-amber-800 dark:text-amber-300 hover:bg-amber-600/20 text-xs sm:text-sm font-serif border border-amber-600/20 transition-all"
          >
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>সোশ্যাল শেয়ার কার্ড</span>
          </button>

        </div>

      </article>

      {/* Reader Advice Section */}
      <div className="mt-12 space-y-8">
        <ReaderAdviceBox
          poemId={poem.id}
          poemTitle={poem.title}
          incompletePrompt={poem.incompleteVersePrompt}
        />

        {/* List of Community Advices & Author Replies */}
        {poem.readerAdvices && poem.readerAdvices.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-amber-600" />
              <span>পাঠকদের পরামর্শ ও কবির উত্তর ({poem.readerAdvices.length})</span>
            </h4>

            <div className="space-y-4">
              {poem.readerAdvices.map((adv) => (
                <div
                  key={adv.id}
                  className="bg-white dark:bg-ink-900 rounded-2xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
                    <span className="font-bold text-parchment-900 dark:text-parchment-100">{adv.readerName}</span>
                    <span>{adv.date}</span>
                  </div>

                  <p className="text-sm font-serif text-parchment-800 dark:text-parchment-200 leading-relaxed italic">
                    "{adv.adviceText}"
                  </p>

                  {/* Author Golden Reply */}
                  {adv.authorReply && (
                    <div className="mt-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-600/20 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-800 dark:text-amber-300">
                        <CornerDownRight className="w-3.5 h-3.5 text-amber-600" />
                        <span>কবি রিফাত রহমান (লেখক):</span>
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-parchment-700 dark:text-parchment-300 pl-5">
                        {adv.authorReply}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
