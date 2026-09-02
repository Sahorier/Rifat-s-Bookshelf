import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Feather,
  Heart,
  Send,
  MessageCircle,
  Facebook,
  Mail,
  ShieldCheck,
  Sparkles,
  Lock
} from 'lucide-react';

export const Footer = () => {
  const { authorInfo, setActiveTab, setActiveModal, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('ইমেল ত্রুটি', 'অনুগ্রহ করে একটি সঠিক ইমেল অ্যাড্রেস লিখুন।', 'error');
      return;
    }
    showToast('ধন্যবাদ!', 'রিফাত হোসেনের নতুন কবিতা ও বই প্রকাশের খবর আপনার ইমেলে পৌঁছে যাবে।', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-parchment-100 dark:bg-ink-950 border-t border-parchment-200 dark:border-ink-800 pt-16 pb-12 mt-20 text-parchment-800 dark:text-parchment-200 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quote of the Day Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-amber-500/10 dark:from-amber-500/5 dark:via-amber-600/10 dark:to-amber-500/5 p-8 rounded-3xl border border-amber-600/20 mb-16 text-center relative overflow-hidden">
          <div className="absolute top-2 left-6 text-6xl text-amber-600/20 font-serif select-none">“</div>
          <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-parchment-900 dark:text-parchment-100 max-w-3xl mx-auto leading-relaxed">
            {authorInfo.quoteOfTheDay?.verse || "কিছু কথা ধুলোমাখা বইয়ের পাতায় ঘুমায়, কিছু কথা সন্ধ্যার মেঘ হয়ে একা হেঁটে যায়।"}
          </p>
          <p className="text-sm font-serif text-amber-700 dark:text-amber-400 mt-3 font-medium">
            {authorInfo.quoteOfTheDay?.source || "— রিফাত হোসেন"}
          </p>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-parchment-200 dark:border-ink-800">
          
          {/* Col 1: Author Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
                Rifat's Bookshelf
              </h3>
            </div>
            <p className="text-sm text-parchment-600 dark:text-parchment-400 leading-relaxed font-serif">
              {authorInfo.bio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={authorInfo.facebookPageUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-parchment-200 dark:bg-ink-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={authorInfo.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-parchment-200 dark:bg-ink-800 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Messenger Inbox"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${authorInfo.email}`}
                className="w-9 h-9 rounded-full bg-parchment-200 dark:bg-ink-800 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                title="Email Author"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-parchment-900 dark:text-parchment-100">
              সাহিত্য অঙ্গন
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('bookshelf'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-parchment-600 dark:text-parchment-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  &bull; মুক্ত অনলাইন পাঠাগার (Free Books)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('poems'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-parchment-600 dark:text-parchment-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  &bull; কবিতার খেরোখাতা ও পাঠকদের পরামর্শ
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-parchment-600 dark:text-parchment-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  &bull; চিন্তার জলছবি (সাহিত্য ব্লগ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-parchment-600 dark:text-parchment-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-amber-700 dark:text-amber-400"
                >
                  &bull; বই সম্ভার (ডিজিটাল ই-বুক ও PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Digital License Notice */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-parchment-900 dark:text-parchment-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>ডিজিটাল প্রকাশনা ও স্বত্বাধিকার</span>
            </h4>
            <p className="text-xs text-parchment-600 dark:text-parchment-400 leading-relaxed font-serif">
              এই প্ল্যাটফর্মের সমস্ত কবিতা, গল্প, প্রবন্ধ ও বইয়ের একক কপিরাইট লেখক রিফাত হোসেনের। অনুমোদিত পাঠকরা ডিজিটাল রিডারে পাঠ ও ব্যক্তিগত ব্যবহারের জন্য PDF কপি সংরক্ষণ করতে পারবেন।
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digital Licensed & PDF Ready</span>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-lg text-parchment-900 dark:text-parchment-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>কাব্যিক বার্তা</span>
            </h4>
            <p className="text-xs text-parchment-600 dark:text-parchment-400 font-serif">
              রিফাত হোসেনের নতুন কবিতা, ডিজিটাল বই প্রকাশ এবং পাঠকদের মতামত বিনিময়ে যুক্ত থাকতে সাবস্ক্রাইব করুন।
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="আপনার ইমেল লিখুন..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom credits & discrete Admin Entrance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-500 dark:text-parchment-400 gap-4">
          <p>© {new Date().getFullYear()} রিফাত হোসেন (Rifat Hossain). সর্বস্বত্ব সংরক্ষিত।</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>শব্দ ও অনুভূতির একাত্মতায় নির্মিত</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current mx-0.5" />
              <span>সাহিত্যপ্রেমীদের জন্য</span>
            </div>

            {/* Discrete author access link */}
            <button
              onClick={() => setActiveModal({ type: 'adminPin' })}
              className="opacity-30 hover:opacity-100 transition-opacity p-1 text-parchment-500 hover:text-amber-600 flex items-center gap-1 text-[11px]"
              title="লেখক কন্ট্রোল স্টুডিও (PIN: 1234)"
            >
              <Lock className="w-3 h-3" />
              <span>লেখক প্যানেল</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
