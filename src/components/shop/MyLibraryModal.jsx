import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadBookAsPDF } from '../../utils/pdfGenerator';
import { X, KeyRound, Bookmark, BookOpen, ShieldCheck, Sparkles, ArrowRight, Check, Download } from 'lucide-react';

export const MyLibraryModal = () => {
  const {
    activeModal,
    setActiveModal,
    books,
    unlockedBookIds,
    verifyAndUnlockWithKey,
    setSelectedBookForReading,
    showToast
  } = useApp();

  const [inputKey, setInputKey] = useState('');
  const [loading, setLoading] = useState(false);

  if (activeModal?.type !== 'myLibrary') return null;

  const unlockedBooks = books.filter(b => unlockedBookIds.includes(b.id) || b.type === 'free');

  const handleVerify = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    setLoading(true);
    setTimeout(() => {
      verifyAndUnlockWithKey(inputKey);
      setLoading(false);
      setInputKey('');
    }, 400);
  };

  const handleOpenBook = (book) => {
    setActiveModal(null);
    setSelectedBookForReading(book);
  };

  const handleDownloadPDF = (e, book) => {
    e.stopPropagation();
    if (book.type === 'free') {
      showToast('অনলাইন পাঠযোগ্য', 'মুক্ত পাঠাগারের বই শুধুমাত্র অনলাইনে পড়ার জন্য।', 'info');
      return;
    }
    downloadBookAsPDF(book);
    showToast('PDF প্রস্তুত', `'${book.title}' এর PDF উইন্ডো খোলা হয়েছে।`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-white dark:bg-ink-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-parchment-200 dark:border-ink-700 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-parchment-200 dark:border-ink-800 flex items-center justify-between bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50">
                আমার ভিআইপি বুকশেলফ (My Library)
              </h3>
              <p className="text-xs text-parchment-500 font-sans">
                অর্জিত ও আনলক করা বইসমূহের ডিজিটাল পাঠাগার
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-full text-parchment-400 hover:text-parchment-900 dark:hover:text-parchment-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Access Key Verification Form */}
          <form onSubmit={handleVerify} className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-3">
            <h4 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>নতুন বই আনলক করুন</span>
            </h4>
            <p className="text-xs font-serif text-parchment-500">
              ফেসবুক অর্ডারের সময় প্রাপ্ত <strong>Access Key</strong>, অর্ডার আইডি অথবা আপনার ইমেল লিখুন:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="যেমন: VIP-XXXXXX বা আপনার ইমেল"
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100"
              />
              <button
                type="submit"
                disabled={loading || !inputKey.trim()}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-semibold shadow-md transition-colors disabled:opacity-50"
              >
                {loading ? 'যাচাই হচ্ছে...' : 'আনলক করুন'}
              </button>
            </div>
          </form>

          {/* Unlocked Books Grid */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>আপনার জন্য উন্মুক্ত বইসমূহ ({unlockedBooks.length})</span>
            </h4>

            {unlockedBooks.length === 0 ? (
              <div className="text-center py-8 text-parchment-400 font-serif">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>এখনো কোনো বই আনলক করা হয়নি।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unlockedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleOpenBook(book)}
                    className="p-3 rounded-2xl bg-white dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 hover:border-amber-500 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded shadow shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                          {book.type === 'free' ? 'মুক্ত পাঠ্য' : 'ভিআইপি অর্জিত'}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 transition-colors truncate mt-0.5">
                          {book.title}
                        </h5>
                        <p className="text-[11px] text-parchment-500 font-sans">{book.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {book.type !== 'free' && (
                        <button
                          onClick={(e) => handleDownloadPDF(e, book)}
                          className="p-2 rounded-xl bg-amber-700/10 text-amber-800 dark:text-amber-300 hover:bg-amber-700 hover:text-white transition-colors"
                          title="PDF ডাউনলোড করুন"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenBook(book)}
                        className="p-2 rounded-xl bg-amber-600/10 text-amber-700 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors"
                        title="ই-বুক পড়ুন"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
