import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogDetail } from './BlogDetail';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  MessageSquare,
  Heart,
  Coffee,
  Bookmark
} from 'lucide-react';

export const BlogView = () => {
  const {
    blogs,
    selectedBlogForView,
    setSelectedBlogForView
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');

  if (selectedBlogForView) {
    return (
      <BlogDetail
        blog={selectedBlogForView}
        onBack={() => setSelectedBlogForView(null)}
      />
    );
  }

  const categories = ['All', 'Literary Craft (সাহিত্য ও ভাবনা)', 'Musings (স্মৃতিকথা ও আড্ডা)'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category.includes(selectedCategory) || b.category === selectedCategory);

  const featuredBlog = filteredBlogs[0] || blogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-600/20 text-xs font-serif font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>সাহিত্য ভাবনা, স্মৃতি ও দর্শন</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-parchment-950 dark:text-parchment-50">
          চিন্তার জলছবি (Ink & Musings)
        </h2>
        <p className="text-sm sm:text-base font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed">
          কবিতার অন্তরালের গল্প, সাহিত্যের দর্শন এবং জীবন ও একাকীত্বের স্নিগ্ধ বয়ান নিয়ে রিফাত রহমানের নিয়মিত সাহিত্য ব্লগ।
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif transition-all ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-md font-semibold'
                : 'bg-white/80 dark:bg-ink-900/80 text-parchment-700 dark:text-parchment-300 border border-parchment-200 dark:border-ink-800 hover:bg-amber-100 dark:hover:bg-amber-950/40'
            }`}
          >
            {cat === 'All' ? 'সকল ব্লগ ও প্রবন্ধ' : cat}
          </button>
        ))}
      </div>

      {/* Featured Big Blog Article */}
      {featuredBlog && (
        <div
          onClick={() => setSelectedBlogForView(featuredBlog)}
          className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-parchment-200 dark:border-ink-800 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer mb-12 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative overflow-hidden">
              <img
                src={featuredBlog.cover}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-serif font-semibold px-3 py-1 rounded-full shadow-md">
                ফিচার্ড প্রবন্ধ
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-serif text-parchment-500">
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{featuredBlog.category}</span>
                  <span>&bull;</span>
                  <span>{featuredBlog.readTime}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-tight">
                  {featuredBlog.title}
                </h3>

                <p className="text-sm font-serif text-parchment-600 dark:text-parchment-400 leading-relaxed line-clamp-4">
                  {featuredBlog.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-parchment-200 dark:border-ink-800 flex items-center justify-between text-xs font-serif text-parchment-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>{featuredBlog.reactions?.love || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>{featuredBlog.comments?.length || 0} মন্তব্য</span>
                  </span>
                </div>

                <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  সম্পূর্ণ পড়ুন <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      {remainingBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remainingBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setSelectedBlogForView(blog)}
              className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-parchment-200 dark:border-ink-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
                    <span className="text-amber-700 dark:text-amber-400 font-semibold">{blog.category}</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {blog.title}
                  </h4>

                  <p className="text-xs sm:text-sm font-serif text-parchment-600 dark:text-parchment-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-serif text-parchment-500 border-t border-parchment-100 dark:border-ink-800/60 mt-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>{blog.reactions?.love || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>{blog.comments?.length || 0}</span>
                  </span>
                </div>

                <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
