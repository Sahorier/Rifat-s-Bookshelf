import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageUploadBox } from '../common/ImageUploadBox';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Star,
  Tag,
  Sparkles,
  Layers,
  ShieldCheck,
  Check,
  FileText
} from 'lucide-react';

export const BookManager = () => {
  const { books, saveBook, deleteBook, showToast } = useApp();
  const [editingBook, setEditingBook] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    englishTitle: '',
    author: 'রিফাত হোসেন',
    category: 'Poetry (কবিতা)',
    type: 'paid', // 'free' or 'paid'
    format: 'digital_only', // 'digital_only', 'physical_only', 'both'
    price: 350,
    originalPrice: 450,
    discountPercent: 20,
    pdfAvailable: true,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    edition: 'ডিজিটাল সংস্করণ ও PDF',
    publisher: 'অনন্যা প্রকাশনী',
    isbn: '978-984-9543-12-8',
    stockCount: 50,
    badge: 'ডিজিটাল ই-বুক ও PDF',
    shortDescription: '',
    description: '',
    previewExcerpt: '',
    pages: []
  });

  const handleStartCreate = () => {
    setFormData({
      title: '',
      englishTitle: '',
      author: 'রিফাত হোসেন',
      category: 'Poetry (কবিতা)',
      type: 'paid',
      format: 'digital_only',
      price: 350,
      originalPrice: 450,
      discountPercent: 20,
      pdfAvailable: true,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      edition: 'ডিজিটাল সংস্করণ ও PDF',
      publisher: 'অনন্যা প্রকাশনী',
      isbn: '978-984-XXXX-XX',
      stockCount: 50,
      badge: 'ডিজিটাল ই-বুক ও PDF',
      shortDescription: '',
      description: '',
      previewExcerpt: '',
      pages: [
        { pageNumber: 1, title: 'সূচিপত্র ও ভূমিকা', content: 'বইয়ের প্রথম পাতা...' },
        { pageNumber: 2, title: 'অধ্যায় ১', content: 'গল্প বা কবিতার শুরু...' }
      ]
    });
    setEditingBook(null);
    setIsCreating(true);
  };

  const handleStartEdit = (book) => {
    setFormData({
      ...book,
      author: book.author || 'রিফাত হোসেন',
      format: book.format || 'digital_only',
      pages: book.pages || book.fullBookPages || [
        { pageNumber: 1, title: 'সূচিপত্র ও ভূমিকা', content: 'বইয়ের বিবরণ...' }
      ]
    });
    setEditingBook(book);
    setIsCreating(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('ত্রুটি', 'বইয়ের শিরোনাম আবশ্যক।', 'error');
      return;
    }

    saveBook({
      ...formData,
      id: editingBook ? editingBook.id : undefined,
      pagesCount: formData.pages?.length || 5
    });

    setIsCreating(false);
    setEditingBook(null);
  };

  const handleDelete = (book) => {
    if (window.confirm(`আপনি কি নিশ্চিত '${book.title}' বইটি মুছে ফেলতে চান?`)) {
      deleteBook(book.id);
    }
  };

  const handleAddPage = () => {
    const nextNum = (formData.pages?.length || 0) + 1;
    setFormData(prev => ({
      ...prev,
      pages: [...(prev.pages || []), { pageNumber: nextNum, title: `পাতা ${nextNum}`, content: '' }]
    }));
  };

  const handleUpdatePage = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.pages];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, pages: updated };
    });
  };

  const handleRemovePage = (idx) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <span>বই ও ডিজিটাল ক্যাটালগ ব্যবস্থাপনা</span>
          </h3>
          <p className="text-xs text-parchment-500 font-sans mt-0.5">
            বইয়ের ছবি আপলোড, ফরম্যাট (ডিজিটাল / ফিজিক্যাল / উভয়), মূল্য এবং পৃষ্ঠাসমূহ সম্পাদনা করুন।
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন বই যুক্ত করুন</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Drawer */}
      {isCreating && (
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/40 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-4">
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
              {editingBook ? `'${editingBook.title}' সম্পাদনা` : 'নতুন বইয়ের তথ্য পূরণ করুন'}
            </h4>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 rounded-full text-parchment-400 hover:text-parchment-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Book Cover Photo Upload (Device Upload Support) */}
            <div className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800">
              <ImageUploadBox
                value={formData.cover}
                onChange={(coverUrl) => setFormData({ ...formData, cover: coverUrl })}
                label="বইয়ের কভার ছবি নির্বাচন বা আপলোড করুন *"
                aspectRatio="aspect-[2/3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  বইয়ের নাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: কুয়াশায় ভেজা পদচিহ্ন"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  লেখকের নাম
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="রিফাত হোসেন"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                >
                  <option value="Poetry (কবিতা)">Poetry (কবিতা)</option>
                  <option value="Poetry Anthology (কাব্যসংকলন)">Poetry Anthology (কাব্যসংকলন)</option>
                  <option value="Short Story (ছোটগল্প)">Short Story (ছোটগল্প)</option>
                  <option value="Novel (উপন্যাস)">Novel (উপন্যাস)</option>
                  <option value="Essays (প্রবন্ধ ও ভাবনা)">Essays (প্রবন্ধ ও ভাবনা)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  বইয়ের ধরন ও লাইব্রেরি অ্যাক্সেস
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                >
                  <option value="paid">বিক্রয়যোগ্য বই (Shop Vault - এক্সেস অনুমোদনে PDF)</option>
                  <option value="free">সম্পূর্ণ ফ্রি অনলাইন বই (Free Bookshelf - শুধুমাত্র অনলাইন পাঠ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  প্রোডাক্ট ফরম্যাট (Format Availability)
                </label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif font-bold text-amber-700 dark:text-amber-400"
                >
                  <option value="digital_only">শুধুমাত্র ডিজিটাল ই-বুক ও PDF</option>
                  <option value="physical_only">শুধুমাত্র মুদ্রিত কপি (Physical Only)</option>
                  <option value="both">ডিজিটাল + মুদ্রিত উভয় (Both)</option>
                </select>
              </div>

              {formData.type === 'paid' && (
                <>
                  <div>
                    <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                      মূল্য (টাকা)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                      মূল্য ছাড় % (Discount)
                    </label>
                    <input
                      type="number"
                      value={formData.discountPercent}
                      onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  বইয়ের ব্যাজ / লেবেল
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="যেমন: ডিজিটাল ই-বুক ও PDF"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                সংক্ষিপ্ত বিবরণ (Short Description)
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            {/* Book Pages Editor */}
            <div className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>ই-বুক রিডার ও PDF পৃষ্ঠাসমূহ ({formData.pages?.length || 0} পৃষ্ঠা)</span>
                  </h5>
                  <p className="text-[11px] text-parchment-500 font-sans">
                    এখানে পৃষ্ঠা যুক্ত করলে পাঠকরা 3D রিডার ও অনুমোদিত PDF ডাউনলোডে এই লেখাগুলো পাবেন।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPage}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-serif font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>পৃষ্ঠা যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {formData.pages?.map((page, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-ink-900 rounded-xl border border-parchment-200 dark:border-ink-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={page.title}
                        onChange={(e) => handleUpdatePage(idx, 'title', e.target.value)}
                        placeholder="পৃষ্ঠার শিরোনাম (যেমন: অধ্যায় ১)"
                        className="text-xs font-bold font-serif px-2.5 py-1 bg-parchment-50 dark:bg-ink-950 border rounded-lg flex-1"
                      />
                      <span className="text-[11px] font-mono text-parchment-400">পাতা {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePage(idx)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={page.content}
                      onChange={(e) => handleUpdatePage(idx, 'content', e.target.value)}
                      placeholder="এই পৃষ্ঠার টেক্সট / কবিতা / অনুচ্ছেদ লিখুন..."
                      className="w-full text-xs p-2 bg-parchment-50 dark:bg-ink-950 border rounded-lg font-serif"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-parchment-200 dark:border-ink-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-xl bg-parchment-100 dark:bg-ink-800 text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Book List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white dark:bg-ink-900 rounded-3xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col justify-between"
          >
            <div className="flex gap-4">
              <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow shrink-0" />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                    {book.type === 'free' ? 'অনলাইন পাঠাগার (ফ্রি)' : 'বিক্রয়যোগ্য'}
                  </span>
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold">
                    {book.format === 'digital_only' ? 'ডিজিটাল ও PDF' : book.format === 'physical_only' ? 'মুদ্রিত' : 'উভয়'}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-50 truncate">
                  {book.title}
                </h4>
                <p className="text-xs text-parchment-500 font-sans">{book.category}</p>
                <p className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                  {book.type === 'free' ? 'বিনামূল্যে পাঠ্য' : `৳${book.discountPrice || book.price}`}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-parchment-100 dark:border-ink-800 flex items-center justify-between text-xs">
              <span className="text-parchment-400 font-serif">
                {(book.pages?.length || book.fullBookPages?.length || 5)} পৃষ্ঠা
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartEdit(book)}
                  className="p-2 rounded-xl bg-parchment-100 dark:bg-ink-800 hover:bg-amber-100 text-parchment-700 dark:text-parchment-300 transition-colors"
                  title="সম্পাদনা"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(book)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
