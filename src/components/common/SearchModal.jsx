import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, BookOpen, Feather, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const {
    activeModal,
    setActiveModal,
    books,
    poems,
    blogs,
    setActiveTab,
    setSelectedBookForReading,
    setSelectedPoemForView,
    setSelectedBlogForView
  } = useApp();

  const [query, setQuery] = useState('');

  if (activeModal?.type !== 'search') return null;

  const cleanQuery = query.toLowerCase().trim();

  // Filter items
  const matchedBooks = cleanQuery
    ? books.filter(b => b.title.toLowerCase().includes(cleanQuery) || b.category.toLowerCase().includes(cleanQuery) || b.description.toLowerCase().includes(cleanQuery))
    : [];

  const matchedPoems = cleanQuery
    ? poems.filter(p => p.title.toLowerCase().includes(cleanQuery) || p.excerpt.toLowerCase().includes(cleanQuery) || p.category.toLowerCase().includes(cleanQuery))
    : [];

  const matchedBlogs = cleanQuery
    ? blogs.filter(b => b.title.toLowerCase().includes(cleanQuery) || b.excerpt.toLowerCase().includes(cleanQuery) || b.content.toLowerCase().includes(cleanQuery))
    : [];

  const hasResults = matchedBooks.length > 0 || matchedPoems.length > 0 || matchedBlogs.length > 0;

  const handleOpenBook = (book) => {
    setActiveModal(null);
    if (book.type === 'free') {
      setSelectedBookForReading(book);
    } else {
      setActiveTab('shop');
    }
  };

  const handleOpenPoem = (poem) => {
    setActiveModal(null);
    setSelectedPoemForView(poem);
    setActiveTab('poems');
  };

  const handleOpenBlog = (blog) => {
    setActiveModal(null);
    setSelectedBlogForView(blog);
    setActiveTab('blog');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-ink-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-parchment-200 dark:border-ink-700 flex flex-col max-h-[80vh]">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-parchment-200 dark:border-ink-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বই, কবিতা বা ব্লগ অনুসন্ধান করুন... (যেমন: কুয়াশা, প্রেম, সুরেন)"
            autoFocus
            className="flex-1 bg-transparent text-base font-serif text-parchment-900 dark:text-parchment-100 placeholder-parchment-400 dark:placeholder-ink-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-parchment-100 dark:hover:bg-ink-800 text-parchment-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1.5 text-xs rounded-xl bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 font-sans"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {!query ? (
            <div className="text-center py-10 text-parchment-400 dark:text-ink-400 font-serif">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-600" />
              <p>আপনার পছন্দের শব্দ লিখে খুঁজুন</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-sans">
                <span className="text-parchment-500">জনপ্রিয় সার্চ:</span>
                {['কুয়াশা', 'ক্যাফে', 'বৃষ্টির ডাকনাম', 'অসমাপ্ত', 'কবিতা'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-parchment-100 dark:bg-ink-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-parchment-700 dark:text-parchment-300 transition-colors"
                  >
                    #{term}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10 text-parchment-500 font-serif">
              <p>"{query}" সম্পর্কিত কোনো লেখা বা বই খুঁজে পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Books */}
              {matchedBooks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-sans font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>বইসমূহ ({matchedBooks.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedBooks.map(book => (
                      <div
                        key={book.id}
                        onClick={() => handleOpenBook(book)}
                        className="p-3 rounded-2xl bg-parchment-50 dark:bg-ink-950 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-parchment-200 dark:border-ink-800 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded shadow" />
                          <div>
                            <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 transition-colors">
                              {book.title}
                            </h5>
                            <p className="text-xs text-parchment-500 font-sans">{book.category} &bull; {book.type === 'free' ? 'বিনামূল্যে পাঠ্য' : `৳${book.price}`}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-parchment-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Poems */}
              {matchedPoems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-sans font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5" />
                    <span>কবিতা ({matchedPoems.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedPoems.map(poem => (
                      <div
                        key={poem.id}
                        onClick={() => handleOpenPoem(poem)}
                        className="p-3 rounded-2xl bg-parchment-50 dark:bg-ink-950 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-parchment-200 dark:border-ink-800 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 transition-colors">
                            {poem.title}
                          </h5>
                          <p className="text-xs text-parchment-500 font-serif italic line-clamp-1">{poem.excerpt}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-parchment-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {matchedBlogs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-sans font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>চিন্তার জলছবি / ব্লগ ({matchedBlogs.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedBlogs.map(blog => (
                      <div
                        key={blog.id}
                        onClick={() => handleOpenBlog(blog)}
                        className="p-3 rounded-2xl bg-parchment-50 dark:bg-ink-950 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-parchment-200 dark:border-ink-800 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <h5 className="font-serif font-bold text-sm text-parchment-900 dark:text-parchment-100 group-hover:text-amber-700 transition-colors">
                            {blog.title}
                          </h5>
                          <p className="text-xs text-parchment-500 font-sans">{blog.readTime} &bull; {blog.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-parchment-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
