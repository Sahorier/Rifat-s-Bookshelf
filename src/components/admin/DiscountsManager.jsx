import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Tag,
  Calendar,
  Save,
  X
} from 'lucide-react';

export const DiscountsManager = () => {
  const { events, saveEvent, toggleEventActive, deleteEvent, showToast } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    discountPercent: 20,
    bannerText: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '২০২৫-০৩-৩১'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim()) {
      showToast('তথ্য অসম্পূর্ণ', 'ইভেন্টের নাম ও কুপন কোড প্রদান করুন।', 'warning');
      return;
    }

    saveEvent({
      ...formData,
      code: formData.code.toUpperCase().trim()
    });

    setIsCreating(false);
    setFormData({
      title: '',
      code: '',
      discountPercent: 20,
      bannerText: '',
      startDate: new Date().toISOString().substring(0, 10),
      endDate: '২০২৫-০৩-৩১'
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <span>ইভেন্টস, অফার ও কুপন ডিসকাউন্ট</span>
          </h3>
          <p className="text-xs text-parchment-500 font-sans mt-0.5">
            বইমেলা বা উৎসব উপলক্ষ্যে ডিসকাউন্ট কুপন ও ওয়েবসাইটের টপ ব্যানার নোটিশ তৈরি করুন।
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ইভেন্ট তৈরি করুন</span>
          </button>
        )}
      </div>

      {/* Creation Modal / Drawer */}
      {isCreating && (
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/40 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-4">
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
              নতুন ডিসকাউন্ট ক্যাম্পেইন
            </h4>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 rounded-full text-parchment-400 hover:text-parchment-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ইভেন্টের নাম *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: একুশে বইমেলা উৎসব"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  কুপন কোড (Promo Code) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="EKUSHEY25"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ডিসকাউন্ট % (ছাড়)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                ওয়েবসাইটের টপ ব্যানার টেক্সট
              </label>
              <input
                type="text"
                value={formData.bannerText}
                onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
                placeholder="📖 একুশে বইমেলা উপলক্ষ্যে সকল বইয়ে ২৫% ছাড়! কুপন: EKUSHEY25"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-parchment-200 dark:border-ink-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-xl bg-parchment-100 dark:bg-ink-800 text-xs font-serif"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-serif font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>ইভেন্ট শুরু করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-white dark:bg-ink-900 rounded-3xl p-6 border shadow-sm transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              event.isActive ? 'border-amber-500/50 bg-amber-500/5' : 'border-parchment-200 dark:border-ink-800 opacity-60'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-600 text-white">
                  {event.code}
                </span>
                <span className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50">
                  {event.title}
                </span>
                <span className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                  ({event.discountPercent}% ছাড়)
                </span>
              </div>
              <p className="text-xs font-serif text-parchment-600 dark:text-parchment-400">
                {event.bannerText}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleEventActive(event.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-colors ${
                  event.isActive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-parchment-100 dark:bg-ink-800 text-parchment-500'
                }`}
              >
                {event.isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
                <span>{event.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয়'}</span>
              </button>

              <button
                onClick={() => deleteEvent(event.id)}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                title="মুছে ফেলুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
