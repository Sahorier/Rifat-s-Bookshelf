import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PoemDetail } from './PoemDetail';
import {
  Feather,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  Filter,
  Flame,
  Clock
} from 'lucide-react';

export const PoemsView = () => {
  const {
    poems,
    selectedPoemForView,
    setSelectedPoemForView,
    toggleLikePoem,
    setActiveModal
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState('All');

  if (selectedPoemForView) {
    return (
      <PoemDetail
        poem={selectedPoemForView}
        onBack={() => setSelectedPoemForView(null)}
      />
    );
  }

  const categories = ['All', 'seeking_advice', 'Philosophical (দার্শনিক)', 'Romantic (প্রেম ও বিরহ)', 'Contemporary (আধুনিক কবিতা)'];

  const filteredPoems = selectedFilter === 'All'
    ? poems
    : selectedFilter === 'seeking_advice'
    ? poems.filter(p => p.status === 'seeking_advice')
    : poems.filter(p => p.category.includes(selectedFilter) || p.category === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-600/20 text-xs font-serif font-medium">
          <Feather className="w-3.5 h-3.5" />
          <span>পঙ্‌ক্তি, ছন্দ ও অনুভূতির খেরোখাতা</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-parchment-950 dark:text-parchment-50">
          কবিতার খেরোখাতা (Verses & Stanzas)
        </h2>
        <p className="text-sm sm:text-base font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
          রিফাত রহমানের প্রকাশিত ও অসমাপ্ত কবিতার সংকলন। এখানে কিছু কবিতা পাঠকদের পরামর্শ ও ভাবনার অপেক্ষায় রাখা হয়েছে— আপনার ভালোবাসার রঙে সেগুলোকে পূর্ণ করুন।
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif transition-all ${
              selectedFilter === cat
                ? 'bg-amber-600 text-white shadow-md font-semibold'
                : 'bg-white/80 dark:bg-ink-900/80 text-parchment-700 dark:text-parchment-300 border border-parchment-200 dark:border-ink-800 hover:bg-amber-100 dark:hover:bg-amber-950/40'
            }`}
          >
            {cat === 'All'
              ? 'সকল কবিতা'
              : cat === 'seeking_advice'
              ? '✍️ পাঠকদের পরামর্শ চাওয়া হচ্ছে'
              : cat}
          </button>
        ))}
      </div>

      {/* Poems Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPoems.map((poem) => (
          <div
            key={poem.id}
            className={`bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
              poem.status === 'seeking_advice'
                ? 'border-amber-500/50 dark:border-amber-500/40 bg-gradient-to-b from-amber-500/5 via-white to-white dark:from-amber-950/20 dark:via-ink-900 dark:to-ink-900'
                : 'border-parchment-200 dark:border-ink-800'
            }`}
          >
            <div className="space-y-4">
              
              {/* Top Tags */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif px-2.5 py-1 rounded-lg bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300">
                  {poem.category}
                </span>
                {poem.status === 'seeking_advice' && (
                  <span className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-amber-600 text-white font-medium shadow-sm animate-pulse">
                    পরামর্শ প্রত্যাশিত
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                onClick={() => setSelectedPoemForView(poem)}
                className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 cursor-pointer transition-colors"
              >
                {poem.title}
              </h3>

              {/* Excerpt / Stanza preview */}
              <div
                onClick={() => setSelectedPoemForView(poem)}
                className="font-serif text-base text-parchment-700 dark:text-parchment-300 italic leading-relaxed cursor-pointer line-clamp-4 pl-3 border-l-2 border-amber-600/40"
              >
                {poem.excerpt || poem.stanzas?.[0]?.lines?.join('\n')}
              </div>

              {/* Incomplete prompt callout */}
              {poem.status === 'seeking_advice' && poem.incompleteVersePrompt && (
                <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-950/40 text-[11px] font-serif text-amber-900 dark:text-amber-200">
                  ✍️ {poem.incompleteVersePrompt}
                </div>
              )}

            </div>

            {/* Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-parchment-200 dark:border-ink-800 flex items-center justify-between text-xs font-serif">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLikePoem(poem.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    poem.isLiked ? 'text-rose-500 font-bold' : 'text-parchment-500 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${poem.isLiked ? 'fill-current' : ''}`} />
                  <span>{poem.likes || 0}</span>
                </button>

                {poem.readerAdvices && poem.readerAdvices.length > 0 && (
                  <span className="flex items-center gap-1 text-parchment-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{poem.readerAdvices.length} পরামর্শ</span>
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedPoemForView(poem)}
                className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform"
              >
                <span>সম্পূর্ণ পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
