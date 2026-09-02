import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Feather, Sparkles, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export const ReaderAdviceBox = ({ poemId, poemTitle, incompletePrompt }) => {
  const { addPoemAdvice, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adviceText, setAdviceText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !adviceText.trim()) {
      showToast('তথ্য অসম্পূর্ণ', 'অনুগ্রহ করে আপনার নাম এবং পরামর্শ লিখুন।', 'warning');
      return;
    }

    addPoemAdvice(poemId, {
      name: name.trim(),
      email: email.trim(),
      adviceText: adviceText.trim()
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setAdviceText('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-amber-700/10 dark:from-amber-950/40 dark:via-ink-900 dark:to-amber-950/30 rounded-3xl p-6 sm:p-8 border border-amber-600/30 shadow-lg relative overflow-hidden">
      
      {/* Background flourish */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        
        {/* Title Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg sm:text-xl text-parchment-950 dark:text-parchment-50">
              কবি রিফাতকে পরামর্শ ও ভাবনা জানান
            </h4>
            <p className="text-xs text-parchment-600 dark:text-parchment-400 font-sans">
              Reader's Poetic Advice & Critique Hub
            </p>
          </div>
        </div>

        {/* Prompt from Poet */}
        {incompletePrompt ? (
          <div className="p-4 rounded-2xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-serif italic">
            ✍️ <strong>কবির আহ্বান:</strong> "{incompletePrompt}"
          </div>
        ) : (
          <p className="text-xs sm:text-sm font-serif text-parchment-600 dark:text-parchment-400">
            এই কবিতার ভাব, ছন্দ কিংবা কোনো নির্দিষ্ট পঙ্‌ক্তি নিয়ে আপনার মতামত ও পরামর্শ কবিকে নতুন কবিতা রচনায় পথ দেখাবে।
          </p>
        )}

        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-center space-y-2 text-emerald-900 dark:text-emerald-200 animate-fadeIn">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
            <h5 className="font-serif font-bold text-base">আপনার পরামর্শ সফলভাবে কবির কাছে পৌঁছেছে!</h5>
            <p className="text-xs font-sans opacity-90">কবি রিফাত আপনার পরামর্শ পর্যালোচনা করে উত্তর প্রদান করবেন।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ইমেল (ঐচ্ছিক - লেখক উত্তরের জন্য)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                আপনার পরামর্শ, বিকল্প পঙ্‌ক্তি বা অনুভূতির বয়ান *
              </label>
              <textarea
                required
                rows={3}
                value={adviceText}
                onChange={(e) => setAdviceText(e.target.value)}
                placeholder="এখানে আপনার ভাবনা বিস্তারিত লিখুন..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-white dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-serif font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>পরামর্শ পাঠান</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
