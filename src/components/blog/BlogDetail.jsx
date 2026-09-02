import React from 'react';
import { useApp } from '../../context/AppContext';
import { CommentSection } from './CommentSection';
import {
  ArrowLeft,
  Heart,
  Coffee,
  Lightbulb,
  Feather,
  Sparkles,
  Share2,
  Facebook,
  MessageCircle,
  Copy,
  Clock,
  Calendar,
  Check
} from 'lucide-react';

export const BlogDetail = ({ blog, onBack }) => {
  const { reactToBlog, setActiveModal, showToast } = useApp();

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('লিংক কপি হয়েছে', 'আর্টিকেলের লিংক ক্লিপবোর্ডে কপি করা হয়েছে।', 'success');
  };

  const handleOpenQuoteCard = () => {
    setActiveModal({
      type: 'quoteCard',
      data: {
        quote: blog.excerpt,
        author: blog.author,
        source: blog.title,
        title: "চিন্তার জলছবি"
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn font-sans">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-serif text-parchment-600 dark:text-parchment-400 hover:text-amber-700 dark:hover:text-amber-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>সকল ব্লগে ফিরে যান</span>
      </button>

      {/* Main Blog Article */}
      <article className="bg-white/90 dark:bg-ink-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 border border-parchment-200 dark:border-ink-800 shadow-xl space-y-8">
        
        {/* Category & Metadata */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/10 text-amber-800 dark:text-amber-300 text-xs font-serif font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{blog.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-parchment-950 dark:text-parchment-50 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs font-serif text-parchment-500 pt-1">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
            <span>&bull;</span>
            <span>লেখক: {blog.author}</span>
          </div>
        </div>

        {/* Cover Image */}
        {blog.cover && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
            <img src={blog.cover} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-stone dark:prose-invert max-w-none font-serif text-base sm:text-lg leading-relaxed text-parchment-800 dark:text-parchment-200 space-y-6 pt-4">
          {blog.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-bold text-xl sm:text-2xl text-parchment-950 dark:text-parchment-50 pt-4 font-serif">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-amber-600 text-amber-950 dark:text-amber-200 italic my-6 text-base sm:text-lg">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="leading-loose">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Reactions Section */}
        <div className="p-6 rounded-2xl bg-parchment-100/70 dark:bg-ink-950/70 border border-parchment-200 dark:border-ink-800 space-y-4">
          <div className="text-center">
            <h4 className="font-serif font-bold text-sm sm:text-base text-parchment-900 dark:text-parchment-100">
              লেখাটি আপনার কেমন লাগলো? প্রতিক্রিয়া দিন:
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { type: 'love', label: 'মুগ্ধ ❤️', count: blog.reactions?.love || 0 },
              { type: 'inspired', label: 'অনুপ্রাণিত 💡', count: blog.reactions?.inspired || 0 },
              { type: 'deep', label: 'গভীর ✍️', count: blog.reactions?.deep || 0 },
              { type: 'cozy', label: 'স্নিগ্ধ ☕', count: blog.reactions?.cozy || 0 },
              { type: 'bravo', label: 'দারুণ 👏', count: blog.reactions?.bravo || 0 },
            ].map(rx => (
              <button
                key={rx.type}
                onClick={() => reactToBlog(blog.id, rx.type)}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 hover:border-amber-500 hover:scale-105 active:scale-95 text-xs sm:text-sm font-serif font-medium transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{rx.label}</span>
                <span className="font-mono text-xs opacity-70">({rx.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Social Share & Quote Card Generator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-parchment-200 dark:border-ink-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-parchment-500">শেয়ার করুন:</span>
            <button
              onClick={handleShareFacebook}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-parchment-200 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 hover:bg-amber-600 hover:text-white transition-colors"
              title="Copy Article Link"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleOpenQuoteCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600/10 text-amber-800 dark:text-amber-300 hover:bg-amber-600/20 text-xs sm:text-sm font-serif border border-amber-600/20 transition-all font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>কাব্যিক উক্তি কার্ড তৈরি</span>
          </button>
        </div>

        {/* Comments Section */}
        <CommentSection blogId={blog.id} comments={blog.comments} />

      </article>

    </div>
  );
};
