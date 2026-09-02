import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageUploadBox } from '../common/ImageUploadBox';
import { Settings, Save, Sparkles, Facebook, MessageCircle, Mail, Phone, MapPin, Feather } from 'lucide-react';

export const SettingsManager = () => {
  const { authorInfo, setAuthorInfo, showToast } = useApp();
  const [formData, setFormData] = useState({ ...authorInfo });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthorInfo(formData);
    showToast('সেটিংস সংরক্ষিত হয়েছে!', 'লেখকের তথ্য ও সোশ্যাল লিংক আপডেট করা হয়েছে।', 'success');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm">
        <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-600" />
          <span>লেখকের প্রোফাইল ও ফেসবুক ইন্টিগ্রেশন</span>
        </h3>
        <p className="text-xs text-parchment-500 font-sans mt-0.5">
          বই অর্ডার লিংক, মেসেঞ্জার আইডি, বায়োগ্রাফি এবং দৈনিক সাহিত্য উক্তি কাস্টমাইজ করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-6">
        
        {/* Section 1: Facebook Order Configuration */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-base text-amber-800 dark:text-amber-400 border-b border-parchment-200 dark:border-ink-800 pb-2 flex items-center gap-2">
            <Facebook className="w-4 h-4 text-blue-600" />
            <span>ফেসবুক পেজ ও মেসেঞ্জার লিংক সেটিংস</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                ফেসবুক পেজ নাম
              </label>
              <input
                type="text"
                value={formData.facebookPageName || ''}
                onChange={(e) => setFormData({ ...formData, facebookPageName: e.target.value })}
                placeholder="Rifat's Poetry (রিফাতের সাহিত্য পাতা)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                মেসেঞ্জার রিডাইরেক্ট লিংক (m.me/username) *
              </label>
              <input
                type="url"
                required
                value={formData.messengerUrl || ''}
                onChange={(e) => setFormData({ ...formData, messengerUrl: e.target.value })}
                placeholder="https://m.me/rifats.poetry"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                ফেসবুক পেজ URL
              </label>
              <input
                type="url"
                value={formData.facebookPageUrl || ''}
                onChange={(e) => setFormData({ ...formData, facebookPageUrl: e.target.value })}
                placeholder="https://facebook.com/rifats.poetry"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Author Bio & Quotes */}
        <div className="space-y-4 pt-4 border-t border-parchment-200 dark:border-ink-800">
          <h4 className="font-serif font-bold text-base text-amber-800 dark:text-amber-400 border-b border-parchment-200 dark:border-ink-800 pb-2 flex items-center gap-2">
            <Feather className="w-4 h-4 text-amber-600" />
            <span>লেখকের পরিচয় ও সাহিত্য মিশন</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                কবির পূর্ণ নাম
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                সংক্ষিপ্ত নাম / সম্বোধন
              </label>
              <input
                type="text"
                value={formData.shortName || ''}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
              লেখক পরিচিতি ও বায়োগ্রাফি (বাংলা)
            </label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif leading-relaxed"
            />
          </div>

          {/* Avatar & Cover Photo Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800">
            <ImageUploadBox
              value={formData.avatar}
              onChange={(img) => setFormData({ ...formData, avatar: img })}
              label="লেখকের প্রোফাইল ছবি (Avatar) আপলোড করুন"
              aspectRatio="aspect-square"
            />
            <ImageUploadBox
              value={formData.coverImage}
              onChange={(img) => setFormData({ ...formData, coverImage: img })}
              label="লেখকের ব্যানার ছবি (Cover) আপলোড করুন"
              aspectRatio="aspect-[16/9]"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
              দৈনিক সাহিত্য উক্তি (Quote of the Day)
            </label>
            <input
              type="text"
              value={formData.quoteOfTheDay?.verse || ''}
              onChange={(e) => setFormData({
                ...formData,
                quoteOfTheDay: { ...formData.quoteOfTheDay, verse: e.target.value }
              })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif italic"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-parchment-200 dark:border-ink-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>পরিবর্তন সংরক্ষণ করুন</span>
          </button>
        </div>

      </form>

    </div>
  );
};
