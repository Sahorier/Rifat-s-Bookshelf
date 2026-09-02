import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, CornerDownRight, Heart, ShieldCheck } from 'lucide-react';

export const CommentSection = ({ blogId, comments }) => {
  const { addBlogComment, showToast, authorInfo } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      showToast('তথ্য দিন', 'অনুগ্রহ করে আপনার নাম ও মন্তব্য লিখুন।', 'warning');
      return;
    }

    addBlogComment(blogId, {
      name: name.trim(),
      email: email.trim(),
      content: content.trim()
    });

    setName('');
    setEmail('');
    setContent('');
  };

  return (
    <div className="space-y-8 pt-8 border-t border-parchment-200 dark:border-ink-800">
      
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-700 dark:text-amber-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50">
            পাঠক আলোচনা ও মন্তব্য ({comments?.length || 0})
          </h3>
          <p className="text-xs text-parchment-500 font-sans">
            আপনার মতামত ও চিন্তাভাবনা সাহিত্যকে সমৃদ্ধ করে
          </p>
        </div>
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-parchment-200 dark:border-ink-800 shadow-sm space-y-4">
        <h4 className="font-serif font-bold text-base text-parchment-900 dark:text-parchment-100">
          একটি মন্তব্য লিখুন
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম *"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ইমেল অ্যাড্রেস (ঐচ্ছিক)"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif"
          />
        </div>

        <textarea
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="আপনার সাহিত্য বিশ্লেষণ বা মতামত এখানে লিখুন..."
          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-parchment-900 dark:text-parchment-100 font-serif leading-relaxed"
        />

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>মন্তব্য পোস্ট করুন</span>
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="bg-white dark:bg-ink-900 rounded-2xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
              <span className="font-bold text-sm text-parchment-900 dark:text-parchment-100">
                {comment.authorName}
              </span>
              <span>{comment.date}</span>
            </div>

            <p className="text-sm font-serif text-parchment-800 dark:text-parchment-200 leading-relaxed">
              {comment.content}
            </p>

            {/* Author Official Reply */}
            {comment.replies?.map((rep) => (
              <div
                key={rep.id}
                className="mt-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-600/30 space-y-1.5 ml-4 sm:ml-6"
              >
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-800 dark:text-amber-300">
                  <CornerDownRight className="w-3.5 h-3.5 text-amber-600" />
                  <span className="flex items-center gap-1">
                    {rep.authorName}
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 inline" />
                  </span>
                  <span className="text-[10px] font-sans opacity-60 ml-auto">{rep.date}</span>
                </div>
                <p className="text-xs sm:text-sm font-serif text-parchment-700 dark:text-parchment-300 pl-5 leading-relaxed">
                  {rep.content}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};
