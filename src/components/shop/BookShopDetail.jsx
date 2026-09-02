import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadBookAsPDF } from '../../utils/pdfGenerator';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Download,
  CheckCircle2,
  Share2,
  Feather,
  Send,
  FileText
} from 'lucide-react';

export const BookShopDetail = ({ book, onBack }) => {
  const {
    setActiveModal,
    setSelectedBookForReading,
    unlockedBookIds,
    rateBook,
    showToast
  } = useApp();

  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const isUnlocked = unlockedBookIds.includes(book.id) || book.type === 'free';
  const effectivePrice = book.discountPrice || book.price;

  const handleOpenOrder = () => {
    setActiveModal({
      type: 'fbOrder',
      data: {
        book: {
          ...book,
          edition: 'ডিজিটাল ই-বুক ও PDF সংস্করণ'
        }
      }
    });
  };

  const handleOpenSampleReader = () => {
    setSelectedBookForReading({
      ...book,
      pages: book.previewPages || [
        { pageNumber: 1, title: 'নমুনা অধ্যায়', content: book.previewExcerpt || book.description }
      ]
    });
  };

  const handleOpenFullReader = () => {
    setSelectedBookForReading({
      ...book,
      pages: book.fullBookPages || book.previewPages
    });
  };

  const handleDownloadPDF = () => {
    downloadBookAsPDF(book);
    showToast('PDF প্রস্তুত হচ্ছে', `'${book.title}' এর প্রিন্ট ও ডাউনলোড উইন্ডো খোলা হয়েছে।`, 'success');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('তথ্য দিন', 'অনুগ্রহ করে নাম এবং আপনার রিভিউ লিখুন।', 'warning');
      return;
    }

    rateBook(book.id, selectedRating, reviewComment.trim(), reviewName.trim());
    setReviewName('');
    setReviewComment('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn font-sans">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-serif text-parchment-600 dark:text-parchment-400 hover:text-amber-700 dark:hover:text-amber-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>সকল বইয়ের তালিকায় ফিরে যান</span>
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/90 dark:bg-ink-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-parchment-200 dark:border-ink-800 shadow-xl">
        
        {/* Left: Book Cover & Previews */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-6">
          <div className="relative w-56 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-book-lg border-2 border-stone-800 group">
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-serif px-3 py-1 rounded-full shadow font-bold">
              {book.badge || 'ডিজিটাল ই-বুক ও PDF'}
            </div>
          </div>

          {/* Sample Reader Preview Button */}
          <button
            onClick={handleOpenSampleReader}
            className="w-full max-w-xs py-3 rounded-2xl bg-amber-600/10 hover:bg-amber-600/20 text-amber-800 dark:text-amber-300 border border-amber-600/30 text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>নমুনা পাতা পড়ুন (Free Preview)</span>
          </button>

          {isUnlocked && (
            <div className="w-full max-w-xs space-y-2">
              <button
                onClick={handleOpenFullReader}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>সম্পূর্ণ ই-বুক রিডারে পড়ুন</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="w-full py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>📥 PDF ডাউনলোড করুন</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Book Details & Buying Section */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Category & Ratings */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-serif px-3 py-1 rounded-full bg-amber-600/10 text-amber-800 dark:text-amber-300 font-semibold">
                {book.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-600 text-sm font-sans font-bold">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>{book.rating || 5.0}</span>
                <span className="text-xs font-normal text-parchment-400">({book.ratingCount || 10} রিভিউ)</span>
              </div>
            </div>

            {/* Title & Author */}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-parchment-950 dark:text-parchment-50 leading-tight">
              {book.title}
            </h1>
            <p className="text-sm font-serif text-parchment-600 dark:text-parchment-400">
              লেখক: <span className="font-bold text-parchment-900 dark:text-parchment-100">{book.author || 'রিফাত হোসেন'}</span> &bull; প্রকাশক: {book.publisher || 'অনন্যা প্রকাশনী'}
            </p>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-parchment-100/70 dark:bg-ink-950/70 border border-parchment-200 dark:border-ink-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-sans text-parchment-500">ডিজিটাল সংস্করণ মূল্য:</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-sans font-extrabold text-amber-700 dark:text-amber-400">
                    ৳{effectivePrice}
                  </span>
                  {book.originalPrice && (
                    <span className="text-sm font-sans text-parchment-400 line-through">
                      ৳{book.originalPrice}
                    </span>
                  )}
                  {book.discountPercent && (
                    <span className="text-xs font-sans px-2 py-0.5 rounded-md bg-rose-500 text-white font-bold">
                      {book.discountPercent}% ছাড়
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right text-xs font-serif text-parchment-500">
                <p>ফরম্যাট: ডিজিটাল ই-বুক + PDF</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">তাৎক্ষণিক ডিজিটাল ডেলিভারি</p>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-600/30 text-xs font-serif text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                বর্তমানে শুধুমাত্র <strong>ডিজিটাল সংস্করণ ও PDF ডাউনলোড</strong> এক্সেস উপলব্ধ। মুদ্রিত কপির অর্ডার সাময়িকভাবে স্থগিত।
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-base text-parchment-900 dark:text-parchment-100">
                বইয়ের বিষয়বস্তু ও পর্যালোচনা:
              </h4>
              <p className="font-serif text-sm text-parchment-700 dark:text-parchment-300 leading-relaxed">
                {book.description}
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-parchment-200 dark:border-ink-800 space-y-3">
            <button
              onClick={handleOpenOrder}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-serif font-bold text-base shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>ফেসবুক ইনবক্সে ডিজিটাল কপি ও PDF অর্ডার করুন</span>
            </button>
            <p className="text-center text-[11px] font-serif text-parchment-500">
              * বাটনটিতে ক্লিক করলে মেসেঞ্জারে রিফাত হোসেনের কাছে বার্তা যাবে এবং অ্যাডমিন এক্সেস দিলে আপনি PDF ডাউনলোড করতে পারবেন।
            </p>
          </div>

        </div>

      </div>

      {/* Reader Reviews & 5-Star Ratings Section */}
      <div className="mt-12 bg-white/90 dark:bg-ink-900/90 rounded-3xl p-6 sm:p-10 border border-parchment-200 dark:border-ink-800 shadow-lg space-y-8">
        
        <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-6">
          <div>
            <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50">
              পাঠক প্রতিক্রিয়া ও ৫-স্টার রেটিং
            </h3>
            <p className="text-xs text-parchment-500 font-sans mt-0.5">
              বইটি পড়ে আপনার মতামত শেয়ার করুন
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 px-4 py-2 rounded-2xl border border-amber-600/20">
            <Star className="w-5 h-5 fill-current text-amber-500" />
            <span className="font-serif font-bold text-lg text-amber-900 dark:text-amber-200">{book.rating || 5.0}</span>
            <span className="text-xs font-sans text-parchment-500">/ ৫.০</span>
          </div>
        </div>

        {/* Write a Review Form */}
        <form onSubmit={handleReviewSubmit} className="p-6 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-4">
          <h4 className="font-serif font-bold text-base text-parchment-900 dark:text-parchment-100">
            আপনার রেটিং ও রিভিউ দিন
          </h4>

          {/* Star selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-parchment-600 dark:text-parchment-400">রেটিং:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                className="p-1 hover:scale-125 transition-transform"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= selectedRating
                      ? 'fill-current text-amber-500'
                      : 'text-parchment-300 dark:text-ink-700'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="আপনার নাম *"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
            />
          </div>

          <textarea
            required
            rows={2}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="বইটির কোন বিষয়টি আপনার সবচেয়ে ভালো লেগেছে? সংক্ষেপে লিখুন..."
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
          />

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>রিভিউ প্রকাশ করুন</span>
          </button>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100">
                    {rev.reviewerName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-serif text-parchment-700 dark:text-parchment-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] font-sans text-parchment-400">
                  {rev.date}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-parchment-400 font-serif text-sm">
              এখনো কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনি দিন!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
