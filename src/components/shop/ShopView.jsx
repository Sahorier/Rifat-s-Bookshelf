import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookShopDetail } from './BookShopDetail';
import { downloadBookAsPDF } from '../../utils/pdfGenerator';
import {
  ShoppingBag,
  Sparkles,
  Star,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Tag,
  Download,
  FileText
} from 'lucide-react';

export const ShopView = () => {
  const {
    books,
    events,
    setActiveModal,
    setSelectedBookForReading,
    unlockedBookIds,
    showToast
  } = useApp();

  const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (selectedBookForDetail) {
    return (
      <BookShopDetail
        book={selectedBookForDetail}
        onBack={() => setSelectedBookForDetail(null)}
      />
    );
  }

  const shopBooks = books.filter(b => b.type === 'paid' || b.price > 0);
  const activePromo = events.find(e => e.isActive);

  const categories = ['All', 'Poetry Anthology (কাব্যসংকলন)', 'Novel (উপন্যাস)', 'Essays (প্রবন্ধ ও ভাবনা)'];

  const filteredBooks = selectedCategory === 'All'
    ? shopBooks
    : shopBooks.filter(b => b.category.includes(selectedCategory) || b.category === selectedCategory);

  const handleQuickOrder = (e, book) => {
    e.stopPropagation();
    setActiveModal({
      type: 'fbOrder',
      data: { book }
    });
  };

  const handleQuickPreview = (e, book) => {
    e.stopPropagation();
    setSelectedBookForReading({
      ...book,
      pages: book.previewPages || [
        { pageNumber: 1, title: 'নমুনা অধ্যায়', content: book.previewExcerpt || book.description }
      ]
    });
  };

  const handleQuickDownloadPDF = (e, book) => {
    e.stopPropagation();
    downloadBookAsPDF(book);
    showToast('PDF প্রস্তুত হচ্ছে', `'${book.title}' এর PDF ডাউনলোড উইন্ডো খোলা হয়েছে।`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-600/20 text-xs font-serif font-medium">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>ডিজিটাল প্রকাশনা ও PDF সংগ্রহশালা</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-parchment-950 dark:text-parchment-50">
          বই সম্ভার (The Book Vault)
        </h2>
        <p className="text-sm sm:text-base font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
          রিফাত হোসেনের প্রকাশিত গ্রন্থসমূহ ডিজিটাল ই-বুক রিডারে পড়ুন এবং হাই-কোয়ালিটি PDF কপি সংগ্রহ করুন। ফেসবুক মেসেঞ্জারে অর্ডার নিশ্চিত করে তাৎক্ষণিক এক্সেস পান।
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 text-xs font-serif text-amber-900 dark:text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>বর্তমানে সকল বই <strong>ডিজিটাল ই-বুক ও PDF সংস্করণ</strong> হিসেবে দ্রুত ডেলিভারিতে পাওয়া যাচ্ছে।</span>
        </div>
      </div>

      {/* Active Promotion Hero Banner */}
      {activePromo && (
        <div className="mb-12 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-serif font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>চলতি সাহিত্য অফার</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">{activePromo.title}</h3>
            <p className="text-xs sm:text-sm text-amber-100 font-serif max-w-xl">
              {activePromo.bannerText}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0 z-10">
            <span className="text-[11px] font-sans tracking-widest uppercase opacity-80 block">কুপন কোড</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-wider text-amber-200 block my-1">
              {activePromo.code}
            </span>
            <span className="text-xs font-serif text-white/90 font-medium">
              {activePromo.discountPercent}% তাৎক্ষণিক ছাড়
            </span>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif transition-all ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-md font-semibold'
                : 'bg-white/80 dark:bg-ink-900/80 text-parchment-700 dark:text-parchment-300 border border-parchment-200 dark:border-ink-800 hover:bg-amber-100 dark:hover:bg-amber-950/40'
            }`}
          >
            {cat === 'All' ? 'সকল বই' : cat}
          </button>
        ))}
      </div>

      {/* Books Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book) => {
          const effectivePrice = book.discountPrice || book.price;
          const isUnlocked = unlockedBookIds.includes(book.id);

          return (
            <div
              key={book.id}
              onClick={() => setSelectedBookForDetail(book)}
              className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-parchment-200 dark:border-ink-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                
                {/* Book Cover Header Container */}
                <div className="relative aspect-[16/11] bg-parchment-100/80 dark:bg-ink-950/80 flex items-center justify-center p-6 overflow-hidden">
                  <div className="w-28 sm:w-32 aspect-[2/3] rounded-r-lg shadow-book-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden border border-stone-800 relative">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-[11px] font-serif font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>ডিজিটাল + PDF</span>
                  </div>

                  {/* Discount percentage tag */}
                  {book.discountPercent && (
                    <div className="absolute top-4 right-4 bg-rose-600 text-white text-[11px] font-sans font-extrabold px-2 py-0.5 rounded-lg shadow-md">
                      {book.discountPercent}% OFF
                    </div>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
                    <span className="text-amber-700 dark:text-amber-400 font-semibold">{book.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold font-sans">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{book.rating || 5.0}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {book.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-serif text-parchment-600 dark:text-parchment-400 line-clamp-2 leading-relaxed">
                    {book.shortDescription || book.description}
                  </p>

                  {/* Price */}
                  <div className="pt-2 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-sans font-extrabold text-amber-700 dark:text-amber-400">
                        ৳{effectivePrice}
                      </span>
                      {book.originalPrice && (
                        <span className="text-xs font-sans text-parchment-400 line-through">
                          ৳{book.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-serif text-emerald-600 dark:text-emerald-400 font-bold">
                      ইনস্ট্যান্ট ডিজিটাল ডেলিভারি
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleQuickPreview(e, book)}
                    className="py-2.5 px-3 rounded-xl bg-parchment-100 dark:bg-ink-800 hover:bg-parchment-200 dark:hover:bg-ink-700 text-parchment-800 dark:text-parchment-200 text-xs font-serif font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>নমুনা পড়ুন</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickOrder(e, book)}
                    className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-serif font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>অর্ডার ও PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
