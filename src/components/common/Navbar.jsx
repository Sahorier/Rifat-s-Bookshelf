import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Feather,
  ShoppingBag,
  Sparkles,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Compass,
  Bookmark
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    setTheme,
    setActiveModal,
    unlockedBookIds,
    events
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active promo banner check
  const activePromo = events.find(e => e.isActive);

  const navLinks = [
    { id: 'home', label: 'প্রচ্ছদ', english: 'Home', icon: Compass },
    { id: 'bookshelf', label: 'মুক্ত পাঠাগার', english: 'Bookshelf', icon: BookOpen },
    { id: 'poems', label: 'কবিতার খেরোখাতা', english: 'Verses', icon: Feather },
    { id: 'blog', label: 'চিন্তার জলছবি', english: 'Musings', icon: Sparkles },
    { id: 'shop', label: 'বই সম্ভার', english: 'Book Vault', icon: ShoppingBag, badge: 'অর্ডার' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Active Promotion Announcement Bar */}
      {activePromo && (
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-serif tracking-wide shadow-inner flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>{activePromo.bannerText}</span>
        </div>
      )}

      {/* Main Glassmorphic Navigation */}
      <nav className="bg-parchment-50/95 dark:bg-ink-950/95 backdrop-blur-md border-b border-parchment-200 dark:border-ink-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Redesigned Premium Logo / Brand Highlighting "Rifat's Bookshelf" */}
            <div
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Artistic Vector Emblem */}
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-0.5 shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <div className="w-full h-full bg-parchment-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  
                  {/* Subtle golden ring aura */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-amber-300/20 opacity-60" />
                  
                  {/* Custom SVG Literary Nib & Open Book Icon */}
                  <svg
                    className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors relative z-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Open Book Wings */}
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    {/* Golden Quill Nib Rising from Spine */}
                    <path d="M12 2v8" stroke="#FDE68A" strokeWidth="2" />
                    <circle cx="12" cy="5" r="1.5" fill="#FDE68A" />
                  </svg>
                </div>
              </div>

              {/* Brand Typography */}
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-extrabold tracking-tight text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Rifat's Bookshelf</span>
                </h1>
                <p className="text-[11px] font-sans font-medium text-parchment-600 dark:text-parchment-400 -mt-0.5 flex items-center gap-1.5">
                  <span className="text-amber-700 dark:text-amber-400 font-bold">রিফাত হোসেন</span>
                  <span className="opacity-40">&bull;</span>
                  <span>Literature & Poetry</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleTabClick(link.id)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-serif font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/50 shadow-sm font-semibold'
                        : 'text-parchment-700 dark:text-parchment-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-parchment-200/50 dark:hover:bg-ink-900/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700 dark:text-amber-400' : 'opacity-70'}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-sans bg-amber-600 text-white rounded-full leading-none animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action Tools for Readers (No visible Admin button on landing) */}
            <div className="flex items-center gap-2">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setActiveModal({ type: 'search' })}
                className="p-2.5 rounded-xl text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200/60 dark:hover:bg-ink-900/60 transition-colors"
                title="অনুসন্ধান (Search)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* VIP Library Access Button */}
              <button
                onClick={() => setActiveModal({ type: 'myLibrary' })}
                className="relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-600/20 text-xs font-serif font-medium border border-amber-600/20 transition-all"
                title="আমার অর্জিত বই (VIP Library)"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>আমার বুকশেলফ</span>
                {unlockedBookIds.length > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-sans font-bold">
                    {unlockedBookIds.length}
                  </span>
                )}
              </button>

              {/* Light / Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200/60 dark:hover:bg-ink-900/60 transition-colors"
                title={theme === 'dark' ? 'উজ্জ্বল মোড' : 'অন্ধকার মোড'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile menu hamburger toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-parchment-700 dark:text-parchment-300 hover:bg-parchment-200/60 dark:hover:bg-ink-900/60"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-parchment-200 dark:border-ink-800 bg-parchment-50/98 dark:bg-ink-950/98 px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-base font-serif transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-parchment-800 dark:text-parchment-200 hover:bg-parchment-200/60 dark:hover:bg-ink-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-parchment-200 dark:border-ink-800">
              <button
                onClick={() => {
                  setActiveModal({ type: 'myLibrary' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-600/10 text-amber-800 dark:text-amber-300 text-sm font-serif font-medium border border-amber-600/20"
              >
                <Bookmark className="w-4 h-4 text-amber-600" />
                <span>আমার বুকশেলফ (VIP Library)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
