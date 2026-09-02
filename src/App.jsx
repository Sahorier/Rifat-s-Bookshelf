import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Soundscape } from './components/common/Soundscape';
import { Toast } from './components/common/Toast';
import { QuoteCardModal } from './components/common/QuoteCardModal';
import { SearchModal } from './components/common/SearchModal';
import { AdminPinModal } from './components/common/AdminPinModal';
import { BookFlipReader } from './components/reader/BookFlipReader';
import { FacebookOrderModal } from './components/shop/FacebookOrderModal';
import { MyLibraryModal } from './components/shop/MyLibraryModal';
import { HomeView } from './components/home/HomeView';
import { BookshelfView } from './components/bookshelf/BookshelfView';
import { PoemsView } from './components/poems/PoemsView';
import { BlogView } from './components/blog/BlogView';
import { ShopView } from './components/shop/ShopView';
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-parchment-50 dark:bg-ink-950 text-parchment-900 dark:text-parchment-100 transition-colors duration-300">
      
      {/* Literary Header */}
      <Navbar />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'bookshelf' && <BookshelfView />}
        {activeTab === 'poems' && <PoemsView />}
        {activeTab === 'blog' && <BlogView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'admin' && <AdminLayout />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Procedural Soundscape Controller */}
      <Soundscape />

      {/* System Modals & Overlays */}
      <BookFlipReader />
      <FacebookOrderModal />
      <MyLibraryModal />
      <QuoteCardModal />
      <SearchModal />
      <AdminPinModal />
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
