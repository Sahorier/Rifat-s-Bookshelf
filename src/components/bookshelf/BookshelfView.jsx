import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Star,
  Eye,
  BookMarked,
  Filter,
  Grid,
  Layers
} from 'lucide-react';

export const BookshelfView = () => {
  const { books, setSelectedBookForReading } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('shelf'); // 'shelf' (3D wooden shelf) or 'grid'

  // Filter only free reading books or all online readable books
  const readableBooks = books.filter(b => b.type === 'free' || b.pages?.length > 0);

  const categories = ['All', 'Poetry (কবিতা)', 'Short Story (ছোটগল্প)', 'Essays (প্রবন্ধ ও ভাবনা)'];

  const filteredBooks = selectedCategory === 'All'
    ? readableBooks
    : readableBooks.filter(b => b.category.includes(selectedCategory) || b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-600/20 text-xs font-serif font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>বিনামূল্যে সম্পূর্ণ অনলাইন পাঠাগার</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-parchment-950 dark:text-parchment-50">
          মুক্ত পাঠাগার (The Free Bookshelf)
        </h2>
        <p className="text-sm sm:text-base font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
          রিফাত হোসেনের প্রকাশিত সাহিত্যকর্ম, কাব্য সংকলন ও অপ্রকাশিত পান্ডুলিপি অনলাইনে উপভোগ করুন। পেজ-ফ্লিপ অভিজ্ঞতায় যেন সত্যিই একটি বইয়ের পাতা উল্টে পড়ছেন (অনলাইন পাঠযোগ্য)।
        </p>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 dark:bg-ink-900/70 backdrop-blur-md border border-parchment-200 dark:border-ink-800 shadow-sm mb-10">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md font-semibold'
                  : 'bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 hover:bg-amber-100 dark:hover:bg-amber-950/40'
              }`}
            >
              {cat === 'All' ? 'সকল বই' : cat}
            </button>
          ))}
        </div>

        {/* View Switcher: 3D Shelf / Card Grid */}
        <div className="flex items-center gap-1 bg-parchment-100 dark:bg-ink-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('shelf')}
            className={`p-2 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-all ${
              viewMode === 'shelf'
                ? 'bg-white dark:bg-ink-900 text-amber-700 dark:text-amber-400 shadow-sm font-medium'
                : 'text-parchment-600 dark:text-parchment-400'
            }`}
            title="থ্রিডি বুকশেলফ ভিউ"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">বুকশেলফ ভিউ</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-serif flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-ink-900 text-amber-700 dark:text-amber-400 shadow-sm font-medium'
                : 'text-parchment-600 dark:text-parchment-400'
            }`}
            title="গ্রিড ভিউ"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">গ্রিড ভিউ</span>
          </button>
        </div>

      </div>

      {/* 3D Wooden Shelf View */}
      {viewMode === 'shelf' ? (
        <div className="space-y-16">
          <div className="relative pt-6 pb-2 px-6 sm:px-12 bg-parchment-100/60 dark:bg-ink-950/60 rounded-3xl border border-parchment-200 dark:border-ink-800 shadow-inner overflow-hidden">
            
            {/* Shelf Row of Books */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-end justify-center pb-2 z-10 relative">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookForReading(book)}
                  className="group cursor-pointer flex flex-col items-center transition-all duration-300 transform hover:-translate-y-4"
                >
                  {/* The Standing 3D Book on the Shelf */}
                  <div className="relative w-32 sm:w-36 md:w-40 aspect-[2/3] rounded-r-lg rounded-l-sm shadow-book group-hover:shadow-book-lg transition-all duration-300 overflow-hidden border-r-2 border-stone-800">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Spine Effect on Left */}
                    <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                    
                    {/* Gloss / Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Free Badge */}
                    <div className="absolute top-2 right-2 bg-amber-600/90 backdrop-blur-sm text-white text-[10px] font-sans px-2 py-0.5 rounded-full shadow">
                      ফ্রি পাঠ্য
                    </div>

                    {/* Quick Read Overlay Icon on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
                      <BookOpen className="w-8 h-8 text-amber-400 animate-bounce" />
                      <span className="text-xs font-serif font-bold tracking-wide">পড়তে ক্লিক করুন</span>
                    </div>
                  </div>

                  {/* Book Label beneath shelf */}
                  <div className="text-center mt-4 space-y-0.5">
                    <h4 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-parchment-500 font-sans">{book.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Wooden Shelf Base Planks */}
            <div className="w-full h-8 wooden-shelf relative rounded-b-xl -mx-6 sm:-mx-12 px-6 sm:px-12 mt-2" />
          </div>
        </div>
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex gap-5">
                <div
                  onClick={() => setSelectedBookForReading(book)}
                  className="w-28 sm:w-32 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-md cursor-pointer group-hover:scale-105 transition-transform duration-300 relative"
                >
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <BookOpen className="w-6 h-6 text-amber-300" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-sans font-medium">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{book.rating || 5.0} ({book.ratingCount || 10})</span>
                  </div>

                  <h3
                    onClick={() => setSelectedBookForReading(book)}
                    className="font-serif font-bold text-lg text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {book.title}
                  </h3>

                  <p className="text-xs text-parchment-500 font-sans">
                    {book.category} &bull; {book.year || '২০২৪'}
                  </p>

                  <p className="text-xs text-parchment-600 dark:text-parchment-400 font-serif line-clamp-3 leading-relaxed">
                    {book.shortDescription || book.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-parchment-200 dark:border-ink-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-sans">
                  <ShieldCheck className="w-4 h-4" />
                  <span>বিনামূল্যে অনলাইন রিডার</span>
                </div>
                <button
                  onClick={() => setSelectedBookForReading(book)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-semibold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>বইটি পড়ুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom DRM & License Notice */}
      <div className="mt-16 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-parchment-700 dark:text-parchment-300">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-parchment-900 dark:text-parchment-100">
              ডিজিটাল বুকশেলফ নিরাপত্তা ও কপিরাইট লাইসেন্স
            </h5>
            <p className="text-parchment-600 dark:text-parchment-400 mt-0.5">
              মুক্ত পাঠাগারের বইসমূহ শুধুমাত্র অনলাইন রিডারে পড়ার জন্য উন্মুক্ত। লেখকের অনুমতি ছাড়া কোনো বই ডাউনলোড, অনুলিপি বা স্ক্রিনশট নেওয়া সম্পূর্ণভাবে সংরক্ষিত ও নিষিদ্ধ।
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
