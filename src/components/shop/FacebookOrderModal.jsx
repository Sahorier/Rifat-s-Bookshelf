import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Download
} from 'lucide-react';

export const FacebookOrderModal = () => {
  const { activeModal, setActiveModal, createFacebookOrder, authorInfo, showToast } = useApp();
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [orderCreated, setOrderCreated] = useState(null);
  const [copied, setCopied] = useState(false);

  if (activeModal?.type !== 'fbOrder') return null;

  const book = activeModal.data?.book;
  if (!book) return null;

  const effectivePrice = book.discountPrice || book.price;

  const generateTemplateMessage = (name, contact, note) => {
    return `নমস্কার / আসসালামু আলাইকুম রিফাত ভাই!
আমি 'Rifat's Bookshelf' থেকে বইটি অর্ডার করতে আগ্রহী:

📖 বইয়ের নাম: ${book.title} (${book.englishTitle || ''})
🏷️ মূল্য: ৳${effectivePrice}
🔖 সংস্করণ: ডিজিটাল ই-বুক ও PDF কপি
👤 ক্রেতার নাম: ${name || 'নাম লিখুন'}
📞 মোবাইল / হোয়াটসঅ্যাপ: ${contact || 'নম্বর লিখুন'}
✉️ ইমেল (PDF ও রিডার এক্সেসের জন্য): ${customerEmail || 'n/a'}
📝 বিশেষ অনুরোধ / নোট: ${note || 'কোনো নোট নেই'}

আমি পেমেন্ট মাধ্যম ও ডিজিটাল ই-বুক/PDF এক্সেস নিশ্চিত করতে চাই। ধন্যবাদ!`;
  };

  const handleCreateAndOpenFacebook = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerContact.trim()) {
      showToast('তথ্য অসম্পূর্ণ', 'অনুগ্রহ করে আপনার নাম ও যোগাযোগ নম্বর প্রদান করুন।', 'warning');
      return;
    }

    // 1. Log order to Admin Panel database
    const newOrder = createFacebookOrder({
      bookId: book.id,
      bookTitle: book.title,
      customerName: customerName.trim(),
      customerContact: customerContact.trim(),
      customerEmail: customerEmail.trim(),
      price: effectivePrice,
      notes: notes.trim(),
      format: 'digital_only'
    });

    setOrderCreated(newOrder);

    // 2. Generate and copy message
    const msg = generateTemplateMessage(customerName, customerContact, notes);
    navigator.clipboard.writeText(msg);
    setCopied(true);

    // 3. Open Facebook Messenger link
    const messengerUrl = authorInfo.messengerUrl || `https://m.me/rifats.bookshelf`;
    window.open(messengerUrl, '_blank');
  };

  const handleDirectCopy = () => {
    const msg = generateTemplateMessage(customerName, customerContact, notes);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    showToast('অর্ডার বার্তা কপি হয়েছে', 'মেসেঞ্জারে পেস্ট করে পাঠিয়ে দিন।', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-white dark:bg-ink-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-parchment-200 dark:border-ink-700 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-parchment-200 dark:border-ink-800 flex items-center justify-between bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50">
                ফেসবুক ইনবক্সে বই ও PDF অর্ডার
              </h3>
              <p className="text-xs text-parchment-500 font-sans">
                অটো-মেসেজ টেমপ্লেট ও অ্যাডমিন এক্সেস রিকোয়েস্ট
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Book Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800">
            <img src={book.cover} alt={book.title} className="w-14 h-20 object-cover rounded-lg shadow-md shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400 font-sans">
                ডিজিটাল ই-বুক ও PDF সংস্করণ
              </span>
              <h4 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-100 truncate">
                {book.title}
              </h4>
              <p className="text-sm font-sans font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                ৳{effectivePrice} <span className="text-xs font-normal text-parchment-400 line-through">৳{book.originalPrice || effectivePrice + 100}</span>
              </p>
            </div>
          </div>

          {orderCreated ? (
            /* Order Success & Access Token Display */
            <div className="space-y-4 text-center py-2 animate-fadeIn">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-100">
                অর্ডার রিকোয়েস্ট সফলভাবে জমা হয়েছে!
              </h4>
              <p className="text-xs font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
                রিফাত হোসেনের ফেসবুক ইনবক্সে মেসেজটি কপি করে পাঠানো হয়েছে। অ্যাডমিন প্যানেলে এক্সেস অনুমোদনের সাথে সাথে আপনি <strong>ই-বুক রিডার ও PDF ডাউনলোড</strong> করতে পারবেন।
              </p>

              {/* Unique Access Token */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-left space-y-1.5">
                <span className="text-[11px] font-sans text-parchment-500">আপনার অর্ডার এক্সেস কোড (সংরক্ষণ করুন):</span>
                <p className="font-mono font-bold text-base text-amber-800 dark:text-amber-300">
                  {orderCreated.accessKey}
                </p>
                <p className="text-[11px] font-serif text-parchment-500">
                  'আমার বুকশেলফ' অপশনে এই কোড বা আপনার ইমেল দিলে বইটি অবিলম্বে আনলক হয়ে যাবে।
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={authorInfo.messengerUrl || "https://m.me/rifats.bookshelf"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-serif font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ফেসবুক মেসেঞ্জারে চ্যাট খুলুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 rounded-xl bg-parchment-100 dark:bg-ink-800 text-xs font-serif text-parchment-700 dark:text-parchment-300"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleCreateAndOpenFacebook} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মাহমুদুল হাসান"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                    মোবাইল নম্বর / হোয়াটসঅ্যাপ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    placeholder="01712-XXXXXX"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                    ইমেল (PDF ও ডিজিটাল এক্সেসের জন্য)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  কবির প্রতি বিশেষ অনুরোধ / নোট (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="কোনো বিশেষ বার্তা..."
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
                />
              </div>

              {/* Generated Template Preview */}
              <div className="p-3.5 rounded-2xl bg-parchment-100/70 dark:bg-ink-950/70 border border-parchment-200 dark:border-ink-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-serif text-parchment-500">
                  <span>মেসেঞ্জারে স্বয়ংক্রিয়ভাবে প্রেরিতব্য বার্তা:</span>
                  <button
                    type="button"
                    onClick={handleDirectCopy}
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'কপি হয়েছে' : 'বার্তা কপি'}</span>
                  </button>
                </div>
                <p className="text-xs font-serif text-parchment-700 dark:text-parchment-300 italic whitespace-pre-line bg-white/50 dark:bg-ink-900/50 p-2.5 rounded-xl border border-black/5">
                  {generateTemplateMessage(customerName, customerContact, notes)}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-serif font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>মেসেঞ্জারে অর্ডার পাঠান ও রিকোয়েস্ট তৈরি করুন</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
