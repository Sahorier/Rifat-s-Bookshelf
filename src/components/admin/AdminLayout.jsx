import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { AccessManager } from './AccessManager';
import { BookManager } from './BookManager';
import { DiscountsManager } from './DiscountsManager';
import { BlogPoemEditor } from './BlogPoemEditor';
import { CommentManager } from './CommentManager';
import { SettingsManager } from './SettingsManager';
import {
  LayoutDashboard,
  KeyRound,
  BookOpen,
  Sparkles,
  Feather,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const { authorInfo, setIsAdmin, setActiveTab, orders } = useApp();
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'access', 'books', 'discounts', 'publish', 'comments', 'settings'

  const pendingOrdersCount = orders.filter(o => o.accessStatus === 'pending').length;

  const tabs = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড ও রিপোর্ট', icon: LayoutDashboard },
    { id: 'access', label: 'অর্ডার ও এক্সেস', icon: UserCheck, badge: pendingOrdersCount },
    { id: 'books', label: 'বই ব্যবস্থাপনা', icon: BookOpen },
    { id: 'discounts', label: 'অফার ও কুপন', icon: Sparkles },
    { id: 'publish', label: 'ব্লগ ও কবিতা প্রকাশ', icon: Feather },
    { id: 'comments', label: 'মন্তব্য ও পরামর্শ', icon: MessageSquare },
    { id: 'settings', label: 'লেখক সেটিংস', icon: Settings },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveTab('home');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans animate-fadeIn">
      
      {/* Top Admin Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-600/30">
        
        {/* Author Avatar & Status */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 border-2 border-amber-400 flex items-center justify-center text-white text-xl font-serif font-bold shadow-md">
              <Feather className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {authorInfo.shortName}’র কন্ট্রোল স্টুডিও
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold uppercase">
                Author & Admin
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              সাহিত্য, বিক্রয় ও পাঠকদের সাথে সরাসরি সংযোগের পূর্ণ নিয়ন্ত্রণ
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-serif text-stone-200 transition-colors border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>মূল ওয়েবসাইট দেখুন</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-xs font-serif text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>

      </div>

      {/* Main Admin Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-serif whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-600 text-white font-bold shadow-lg scale-105'
                  : 'bg-white dark:bg-ink-900 border border-parchment-200 dark:border-ink-800 text-parchment-700 dark:text-parchment-300 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-sans font-bold flex items-center justify-center animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel Rendering */}
      <div>
        {adminTab === 'dashboard' && <AdminDashboard onNavigateTab={(tab) => setAdminTab(tab)} />}
        {adminTab === 'access' && <AccessManager />}
        {adminTab === 'books' && <BookManager />}
        {adminTab === 'discounts' && <DiscountsManager />}
        {adminTab === 'publish' && <BlogPoemEditor />}
        {adminTab === 'comments' && <CommentManager />}
        {adminTab === 'settings' && <SettingsManager />}
      </div>

    </div>
  );
};
