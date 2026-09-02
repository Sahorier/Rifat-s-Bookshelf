import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShoppingBag,
  BookOpen,
  Feather,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  DollarSign,
  Heart,
  MessageSquare
} from 'lucide-react';

export const AdminDashboard = ({ onNavigateTab }) => {
  const { orders, books, poems, blogs, members, grantAccess } = useApp();

  // Calculations
  const verifiedOrders = orders.filter(o => o.paymentStatus === 'Verified Paid' || o.accessStatus === 'granted');
  const totalRevenue = verifiedOrders.reduce((sum, o) => sum + (o.price || 0), 0);
  const pendingOrders = orders.filter(o => o.accessStatus === 'pending');
  const totalLikes = poems.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = blogs.reduce((sum, b) => sum + (b.comments?.length || 0), 0);

  return (
    <div className="space-y-8 font-sans">
      
      {/* 4 Big Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-parchment-200 dark:border-ink-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-serif font-bold uppercase tracking-wider">মোট বিক্রয় মূল্য</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-sans font-extrabold text-parchment-950 dark:text-parchment-50">
            ৳{totalRevenue.toLocaleString()}
          </h3>
          <p className="text-[11px] text-emerald-600 font-sans flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>{verifiedOrders.length} টি সফল বই বিক্রয়</span>
          </p>
        </div>

        {/* Pending Access Requests */}
        <div
          onClick={() => onNavigateTab('access')}
          className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-amber-500/40 shadow-sm space-y-2 cursor-pointer hover:border-amber-600 transition-colors group"
        >
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-serif font-bold uppercase tracking-wider">এক্সেস রিকোয়েস্ট</span>
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
              <Clock className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <h3 className="text-3xl font-sans font-extrabold text-amber-700 dark:text-amber-400">
            {pendingOrders.length}
          </h3>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-serif flex items-center justify-between">
            <span>অনুমোদনের অপেক্ষায়</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </p>
        </div>

        {/* Total Catalog Items */}
        <div
          onClick={() => onNavigateTab('books')}
          className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-parchment-200 dark:border-ink-800 shadow-sm space-y-2 cursor-pointer hover:border-amber-500 transition-colors group"
        >
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-serif font-bold uppercase tracking-wider">প্রকাশিত বই</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-sans font-extrabold text-parchment-950 dark:text-parchment-50">
            {books.length}
          </h3>
          <p className="text-[11px] text-parchment-500 font-serif flex items-center justify-between">
            <span>ক্যাটালগে অন্তর্ভুক্ত বইসমূহ</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </p>
        </div>

        {/* Reader Engagement */}
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-parchment-200 dark:border-ink-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-rose-500">
            <span className="text-xs font-serif font-bold uppercase tracking-wider">পাঠক ভালোবাসা ও সাড়া</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-500">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
          <h3 className="text-3xl font-sans font-extrabold text-parchment-950 dark:text-parchment-50">
            {totalLikes}
          </h3>
          <p className="text-[11px] text-parchment-500 font-serif">
            {totalComments} টি ব্লগ ও কবিতা আলোচনা
          </p>
        </div>

      </div>

      {/* Quick Action Pending Orders Verification Queue */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-4">
          <div>
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>সাম্প্রতিক ফেসবুক অর্ডার ও এক্সেস পেন্ডিং কিউ ({pendingOrders.length})</span>
            </h4>
            <p className="text-xs text-parchment-500 font-sans mt-0.5">
              ফেসবুক ইনবক্সে নিশ্চিত হওয়া অর্ডারের পাশে 'এক্সেস দিন' বাটন চাপুন।
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('access')}
            className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400 hover:underline"
          >
            সকল অর্ডার দেখুন &rarr;
          </button>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="p-8 text-center text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-500/20 font-serif text-sm">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
            <p>চমৎকার! কোনো অর্ডার পেন্ডিং নেই। সব পাঠকের এক্সেস অনুমোদিত।</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                      {order.id}
                    </span>
                    <span className="font-serif font-bold text-sm text-parchment-950 dark:text-parchment-50">
                      {order.bookTitle} (৳{order.price})
                    </span>
                  </div>
                  <p className="text-xs font-serif text-parchment-600 dark:text-parchment-400">
                    ক্রেতা: {order.customerName} &bull; ফোন: {order.customerContact} &bull; {order.orderDate}
                  </p>
                  {order.notes && (
                    <p className="text-xs font-serif italic text-parchment-500">
                      নোট: "{order.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => grantAccess(order.id)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-serif font-bold shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>এক্সেস অনুমোদন করুন</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Two-Column Analytics: Top Selling Books & Recent Musings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Books Catalog */}
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>বইয়ের তালিকা ও স্টক স্ট্যাটাস</span>
          </h4>

          <div className="space-y-3">
            {books.slice(0, 4).map((book) => (
              <div key={book.id} className="flex items-center justify-between p-3 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={book.cover} alt={book.title} className="w-8 h-12 object-cover rounded shadow shrink-0" />
                  <div className="min-w-0">
                    <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 truncate">{book.title}</h5>
                    <p className="text-[11px] text-parchment-500 font-sans">{book.category} &bull; {book.type === 'free' ? 'ফ্রি' : `৳${book.price}`}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 shrink-0">
                  {book.type === 'free' ? 'অনলাইন' : `মজুদ: ${book.stockCount || 10}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Member Directory */}
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-4">
          <h4 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>সক্রিয় ভিআইপি পাঠক ও সদস্য ({members.length})</span>
          </h4>

          <div className="space-y-3">
            {members.map((mem) => (
              <div key={mem.id} className="flex items-center justify-between p-3 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 text-xs font-serif">
                <div>
                  <h5 className="font-bold text-parchment-900 dark:text-parchment-100">{mem.name}</h5>
                  <p className="text-parchment-500 font-sans">{mem.email} &bull; {mem.phone}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold font-sans text-[10px]">
                  {mem.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
