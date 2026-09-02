import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Feather,
  Sparkles,
  ShoppingBag,
  Heart,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
  Flame,
  Coffee,
  Bookmark,
  Download,
  FileText
} from 'lucide-react';

export const HomeView = () => {
  const {
    authorInfo,
    books,
    poems,
    blogs,
    setActiveTab,
    setSelectedBookForReading,
    setSelectedPoemForView,
    setSelectedBlogForView,
    setActiveModal
  } = useApp();

  const featuredBook = books.find(b => b.isFeatured) || books[0];
  const latestPoem = poems[0];
  const latestBlog = blogs[0];
  const shopBooks = books.filter(b => b.type === 'paid');

  const handleOpenFreeBook = (book) => {
    setSelectedBookForReading(book);
  };

  const handleOpenPoem = (poem) => {
    setSelectedPoemForView(poem);
    setActiveTab('poems');
  };

  const handleOpenBlog = (blog) => {
    setSelectedBlogForView(blog);
    setActiveTab('blog');
  };

  return (
    <div className="space-y-20 sm:space-y-24 font-sans animate-fadeIn">
      
      {/* 1. Sanctuary Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:py-24 border-b border-parchment-200 dark:border-ink-800">
        
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Literary Introduction */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-600/20 text-xs font-serif font-medium">
                <Feather className="w-3.5 h-3.5 text-amber-600" />
                <span>{authorInfo.tagline} &bull; {authorInfo.shortName}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-parchment-950 dark:text-parchment-50 leading-[1.15]">
                শব্দ ও অনুভূতির এক স্নিগ্ধ নিভৃত সাহিত্য ভুবন
              </h1>

              <p className="text-base sm:text-lg font-serif text-parchment-700 dark:text-parchment-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {authorInfo.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('bookshelf')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-serif font-bold text-sm shadow-xl transition-all flex items-center gap-2 group hover:scale-105"
                >
                  <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                  <span>মুক্ত পাঠাগারে পড়ুন</span>
                </button>

                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-ink-900 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-parchment-900 dark:text-parchment-100 border border-parchment-300 dark:border-ink-700 font-serif font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>ডিজিটাল ই-বুক ও PDF সংগ্রহ</span>
                </button>
              </div>

              {/* Highlights Micro-stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-parchment-200 dark:border-ink-800 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="block text-2xl font-serif font-bold text-amber-700 dark:text-amber-400">
                    {books.length}+
                  </span>
                  <span className="text-[11px] font-sans text-parchment-500">অনলাইন ও PDF বই</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-amber-700 dark:text-amber-400">
                    {poems.length}+
                  </span>
                  <span className="text-[11px] font-sans text-parchment-500">কাব্য ও খেরোখাতা</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-amber-700 dark:text-amber-400">
                    PDF
                  </span>
                  <span className="text-[11px] font-sans text-parchment-500">ডাউনলোড সুবিধা</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Showcase Book Feature */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              {featuredBook && (
                <div className="relative group cursor-pointer" onClick={() => handleOpenFreeBook(featuredBook)}>
                  
                  {/* Decorative backdrop aura */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-rose-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

                  <div className="relative w-64 sm:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-book-lg border-2 border-stone-800 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500">
                    <img src={featuredBook.cover} alt={featuredBook.title} className="w-full h-full object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-amber-600 w-fit mb-2 font-bold shadow">
                        ফিচার্ড কাব্যগ্রন্থ
                      </span>
                      <h3 className="font-serif font-bold text-xl">{featuredBook.title}</h3>
                      <p className="text-xs font-serif text-amber-200 mt-1">{featuredBook.author || 'রিফাত হোসেন'}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs font-serif text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center gap-1.5 group-hover:underline">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>অনলাইন রিডারে বইটি পড়ুন</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Free Bookshelf Showcase Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>রিফাত হোসেনের মুক্ত পাঠাগার</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mt-1">
              অনলাইনে সম্পূর্ণ পড়ার উপযোগী গ্রন্থসমূহ
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('bookshelf')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-serif font-bold text-amber-700 dark:text-amber-400 hover:underline group"
          >
            <span>সকল বই দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.slice(0, 3).map((book) => (
            <div
              key={book.id}
              onClick={() => handleOpenFreeBook(book)}
              className="bg-white dark:bg-ink-900 rounded-3xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-20 sm:w-24 aspect-[2/3] rounded-lg overflow-hidden shadow-md shrink-0 border border-stone-800 relative">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <div className="min-w-0 space-y-1.5 flex-1">
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                  {book.type === 'free' ? 'বিনামূল্যে পাঠ্য' : 'ডিজিটাল ই-বুক'}
                </span>
                <h3 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-50 truncate group-hover:text-amber-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs font-serif text-parchment-500 line-clamp-2 leading-relaxed">
                  {book.shortDescription || book.description}
                </p>
                <span className="text-xs font-serif text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 pt-1">
                  পড়ুন <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Poetic Fragments & Reader Advice Section */}
      <section className="bg-parchment-100/70 dark:bg-ink-950/70 border-y border-parchment-200 dark:border-ink-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/10 text-amber-800 dark:text-amber-300 text-xs font-serif font-medium">
                <Feather className="w-3.5 h-3.5" />
                <span>কবিতার খেরোখাতা ও পাঠকদের পরামর্শ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-parchment-950 dark:text-parchment-50 leading-tight">
                আপনার পরামর্শে পূর্ণ হোক কবির অসমাপ্ত পঙ্‌ক্তি
              </h2>
              <p className="text-sm font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
                রিফাত হোসেনের কিছু কবিতা ইচ্ছাকৃতভাবে অসমাপ্ত রাখা হয়েছে। পাঠক হিসেবে আপনি আপনার অনুভূতি, পরামর্শ বা নতুন লাইন দিয়ে কবিকে সহায়তা করতে পারেন।
              </p>
              <button
                onClick={() => setActiveTab('poems')}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>পরামর্শ দিতে খেরোখাতায় যান</span>
              </button>
            </div>

            {/* Featured Poem Fragment Card */}
            {latestPoem && (
              <div className="lg:col-span-7">
                <div
                  onClick={() => handleOpenPoem(latestPoem)}
                  className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-xl space-y-4 cursor-pointer hover:border-amber-600 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400">
                      {latestPoem.category}
                    </span>
                    <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-bold">
                      পরামর্শ প্রত্যাশিত
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 transition-colors">
                    {latestPoem.title}
                  </h3>

                  <div className="font-serif text-base sm:text-lg text-parchment-800 dark:text-parchment-200 italic leading-loose pl-4 border-l-2 border-amber-600/50 space-y-1">
                    {latestPoem.stanzas?.[0]?.lines?.slice(0, 3).map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    <p className="text-amber-600 text-sm font-sans font-bold pt-2">
                      ✍️ {latestPoem.incompleteVersePrompt || 'পাঠকদের কাছে পরবর্তী চরণ প্রত্যাশিত...'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-parchment-100 dark:border-ink-800 flex items-center justify-between text-xs font-serif text-parchment-500">
                    <span>{latestPoem.likes} জন পাঠক ভালোবেসেছেন</span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      পরামর্শ ও সম্পূর্ণ কবিতা দেখুন &rarr;
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 4. Book Shop / The Book Vault Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>বই সম্ভার ও ডিজিটাল সংগ্রহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mt-1">
              রিফাত হোসেনের প্রকাশিত গ্রন্থমালা (ই-বুক ও PDF)
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('shop')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-serif font-bold text-amber-700 dark:text-amber-400 hover:underline group"
          >
            <span>সকল বই দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopBooks.slice(0, 3).map((book) => (
            <div
              key={book.id}
              onClick={() => setActiveTab('shop')}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex gap-4">
                <img src={book.cover} alt={book.title} className="w-24 aspect-[2/3] object-cover rounded-xl shadow-md shrink-0 border border-stone-800" />
                <div className="min-w-0 space-y-1">
                  <span className="text-[10px] font-sans font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    {book.badge || 'ডিজিটাল ই-বুক ও PDF'}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 transition-colors truncate">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{book.rating || 5.0}</span>
                  </div>
                  <p className="text-lg font-sans font-extrabold text-amber-700 dark:text-amber-400 pt-1">
                    ৳{book.discountPrice || book.price}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-parchment-100 dark:border-ink-800 flex items-center justify-between">
                <span className="text-xs font-serif text-parchment-500">ইনস্ট্যান্ট ডিজিটাল কপি ও PDF</span>
                <span className="text-xs font-serif font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>অর্ডার করুন &rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Literary Blog Snippet */}
      {latestBlog && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-rose-600/10 dark:from-amber-950/40 dark:via-ink-900 dark:to-rose-950/30 rounded-3xl p-8 sm:p-12 border border-amber-600/20 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-700 dark:text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>চিন্তার জলছবি &bull; {latestBlog.category}</span>
                </div>
                <h3
                  onClick={() => handleOpenBlog(latestBlog)}
                  className="text-2xl sm:text-3xl font-serif font-bold text-parchment-950 dark:text-parchment-50 hover:text-amber-700 cursor-pointer transition-colors"
                >
                  {latestBlog.title}
                </h3>
                <p className="text-sm font-serif text-parchment-600 dark:text-parchment-400 line-clamp-2 leading-relaxed">
                  {latestBlog.excerpt}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => handleOpenBlog(latestBlog)}
                  className="px-6 py-3 rounded-2xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 text-parchment-900 dark:text-parchment-100 hover:bg-amber-50 font-serif font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2"
                >
                  <span>প্রবন্ধটি পড়ুন</span>
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
