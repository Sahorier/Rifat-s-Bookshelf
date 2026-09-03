import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, X, Lock, KeyRound } from 'lucide-react';

export const AdminPinModal = () => {
  const { activeModal, setActiveModal, setIsAdmin, setActiveTab, showToast } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (activeModal?.type !== 'adminPin') return null;

  const configuredPin = import.meta.env.VITE_ADMIN_PIN || '1917';

  const handleLogin = (e) => {
    e?.preventDefault();
    if (pin.trim() === configuredPin.trim()) {
      setIsAdmin(true);
      setActiveModal(null);
      setActiveTab('admin');
      showToast('লেখক প্যানেলে স্বাগতম!', 'লেখক রিফাত হোসেন হিসেবে লগইন সফল হয়েছে।', 'success');
    } else {
      setError(true);
      showToast('ভুল পিন কোড', 'অনুগ্রহ করে সঠিক পিন কোড লিখুন।', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-ink-900 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-parchment-200 dark:border-ink-700 p-6 sm:p-8 flex flex-col items-center text-center">
        
        <div className="w-full flex justify-end">
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-full text-parchment-400 hover:text-parchment-800 dark:hover:text-parchment-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-md mb-4">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="font-serif font-bold text-xl text-parchment-900 dark:text-parchment-50">
          লেখক ও অ্যাডমিন স্টুডিও
        </h3>
        <p className="text-xs text-parchment-500 font-sans mt-1 leading-relaxed">
          বই তালিকা, বিক্রয় রিপোর্ট, পাঠকদের পরামর্শ, মন্তব্য মডারেশন এবং ফেসবুক অর্ডার এক্সেস প্রদানের কন্ট্রোল প্যানেল।
        </p>

        <form onSubmit={handleLogin} className="w-full mt-6 space-y-4">
          <div className="relative">
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              placeholder="গোপন পিন লিখুন"
              autoFocus
              className={`w-full text-center tracking-widest text-lg font-mono py-3 px-4 rounded-xl bg-parchment-50 dark:bg-ink-950 border ${
                error ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-parchment-300 dark:border-ink-700'
              } focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-serif font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>প্রবেশ করুন</span>
          </button>
        </form>

      </div>
    </div>
  );
};
