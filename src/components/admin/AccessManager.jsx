import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MessageCircle,
  KeyRound,
  ExternalLink,
  Search,
  UserCheck,
  Filter,
  Copy,
  Check
} from 'lucide-react';

export const AccessManager = () => {
  const { orders, grantAccess, revokeAccess, authorInfo, showToast } = useApp();
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'granted', 'revoked'
  const [search, setSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' ? true : order.accessStatus === filter;
    const matchesSearch = search.trim() === ''
      ? true
      : order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        (order.accessKey && order.accessKey.toLowerCase().includes(search.toLowerCase())) ||
        (order.customerContact && order.customerContact.includes(search));
    return matchesFilter && matchesSearch;
  });

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast('এক্সেস কী কপি হয়েছে', '', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const pendingCount = orders.filter(o => o.accessStatus === 'pending').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-600" />
            <span>অর্ডার ও ভিআইপি এক্সেস কন্ট্রোল</span>
          </h3>
          <p className="text-xs text-parchment-500 font-sans mt-0.5">
            ফেসবুক মেসেঞ্জার অর্ডারের সত্যতা যাচাই করে ১-ক্লিকে রিডার এক্সেস প্রদান বা বাতিল করুন।
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-serif font-semibold">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>{pendingCount} টি অর্ডার অনুমোদনের অপেক্ষায়</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'সকল অর্ডার', count: orders.length },
            { id: 'pending', label: 'অপেক্ষারত (Pending)', count: pendingCount },
            { id: 'granted', label: 'এক্সেস অনুমোদিত (Granted)', count: orders.filter(o => o.accessStatus === 'granted').length },
            { id: 'revoked', label: 'স্থগিত (Revoked)', count: orders.filter(o => o.accessStatus === 'revoked').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-amber-600 text-white font-bold shadow-md'
                  : 'bg-white dark:bg-ink-900 border border-parchment-200 dark:border-ink-800 text-parchment-700 dark:text-parchment-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম বা বই দিয়ে খুঁজুন..."
            className="w-full text-xs px-3.5 py-2.5 pl-9 rounded-xl bg-white dark:bg-ink-900 border border-parchment-200 dark:border-ink-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100"
          />
          <Search className="w-4 h-4 text-parchment-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Orders Table & Cards */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-12 text-center border border-parchment-200 dark:border-ink-800 text-parchment-400 font-serif">
          <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p>কোনো অর্ডার পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white dark:bg-ink-900 rounded-3xl p-6 border shadow-sm transition-all duration-300 ${
                order.accessStatus === 'pending'
                  ? 'border-amber-500/60 bg-amber-500/5 dark:bg-amber-950/20'
                  : order.accessStatus === 'granted'
                  ? 'border-emerald-500/40'
                  : 'border-parchment-200 dark:border-ink-800 opacity-75'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Customer & Book Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 font-bold">
                      {order.id}
                    </span>

                    {order.accessStatus === 'granted' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-serif font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        এক্সেস সক্রিয় (VIP Granted)
                      </span>
                    ) : order.accessStatus === 'pending' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-serif font-bold animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        অনুমোদনের অপেক্ষায় (Pending)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-serif font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        এক্সেস স্থগিত
                      </span>
                    )}

                    <span className="text-xs text-parchment-400 font-sans ml-auto lg:ml-0">
                      তারিখ: {order.orderDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2">
                    <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
                      {order.bookTitle}
                    </h4>
                    <span className="text-sm font-sans font-extrabold text-amber-700 dark:text-amber-400">
                      (৳{order.price})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-parchment-600 dark:text-parchment-400 pt-1">
                    <p>👤 <strong>ক্রেতা:</strong> {order.customerName}</p>
                    <p>📞 <strong>মোবাইল:</strong> {order.customerContact}</p>
                    <p>✉️ <strong>ইমেল:</strong> {order.customerEmail || 'n/a'}</p>
                    <p className="flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      <strong>Access Key:</strong>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{order.accessKey}</span>
                      <button
                        onClick={() => handleCopyKey(order.accessKey)}
                        className="p-1 hover:bg-parchment-100 rounded text-parchment-400"
                        title="Copy Key"
                      >
                        {copiedKey === order.accessKey ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </p>
                  </div>

                  {order.notes && (
                    <div className="p-3 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 text-xs font-serif text-parchment-700 dark:text-parchment-300 italic">
                      📝 <strong>অটোগ্রাফ / নোট:</strong> "{order.notes}"
                    </div>
                  )}
                </div>

                {/* Right: Action Buttons */}
                <div className="flex flex-row lg:flex-col items-center justify-end gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-parchment-100 dark:border-ink-800">
                  
                  {order.accessStatus === 'pending' || order.accessStatus === 'revoked' ? (
                    <button
                      onClick={() => grantAccess(order.id)}
                      className="flex-1 lg:flex-initial px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>এক্সেস অনুমোদন করুন (Grant)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => revokeAccess(order.id)}
                      className="flex-1 lg:flex-initial px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-300 text-xs font-serif transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>এক্সেস স্থগিত করুন</span>
                    </button>
                  )}

                  <a
                    href={authorInfo.messengerUrl || "https://m.me/rifats.poetry"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
                    title="ফেসবুক মেসেঞ্জারে চ্যাট দেখুন"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
