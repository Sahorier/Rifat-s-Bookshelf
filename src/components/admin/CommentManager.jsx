import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Feather,
  Sparkles,
  Send,
  CornerDownRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Clock
} from 'lucide-react';

export const CommentManager = () => {
  const {
    blogs,
    poems,
    replyToBlogComment,
    replyPoemAdvice,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState('blogs'); // 'blogs' or 'poems'
  const [replyTextMap, setReplyTextMap] = useState({});

  const handleReplyBlog = (blogId, commentId) => {
    const text = replyTextMap[`blog_${commentId}`];
    if (!text || !text.trim()) {
      showToast('তথ্য দিন', 'উত্তরের টেক্সট লিখুন।', 'warning');
      return;
    }

    replyToBlogComment(blogId, commentId, text.trim());
    setReplyTextMap(prev => ({ ...prev, [`blog_${commentId}`]: '' }));
  };

  const handleReplyPoem = (poemId, adviceId) => {
    const text = replyTextMap[`poem_${adviceId}`];
    if (!text || !text.trim()) {
      showToast('তথ্য দিন', 'পরামর্শের উত্তরের টেক্সট লিখুন।', 'warning');
      return;
    }

    replyPoemAdvice(poemId, adviceId, text.trim());
    setReplyTextMap(prev => ({ ...prev, [`poem_${adviceId}`]: '' }));
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-2xl text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-600" />
            <span>মন্তব্য ও পাঠকের পরামর্শ মডারেশন</span>
          </h3>
          <p className="text-xs text-parchment-500 font-sans mt-0.5">
            পাঠকদের মতামতের উত্তর দিন। আপনার উত্তরটি গোল্ডেন 'লেখক (Author)' ব্যাজে প্রদর্শিত হবে।
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('blogs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSection === 'blogs'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300'
            }`}
          >
            ব্লগ মন্তব্য
          </button>
          <button
            onClick={() => setActiveSection('poems')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSection === 'poems'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300'
            }`}
          >
            কবিতার পরামর্শ
          </button>
        </div>
      </div>

      {/* Blogs Comments Thread */}
      {activeSection === 'blogs' && (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-4"
            >
              <div className="border-b border-parchment-100 dark:border-ink-800 pb-3">
                <span className="text-xs font-sans text-amber-600 font-bold">{blog.category}</span>
                <h4 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50">
                  {blog.title}
                </h4>
              </div>

              {blog.comments && blog.comments.length > 0 ? (
                <div className="space-y-4">
                  {blog.comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
                        <span className="font-bold text-sm text-parchment-900 dark:text-parchment-100">{c.authorName} ({c.authorEmail || 'n/a'})</span>
                        <span>{c.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm font-serif text-parchment-800 dark:text-parchment-200 leading-relaxed">
                        "{c.content}"
                      </p>

                      {/* Existing Replies */}
                      {c.replies?.map((rep) => (
                        <div
                          key={rep.id}
                          className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-xs font-serif space-y-1 ml-4"
                        >
                          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>{rep.authorName}</span>
                          </div>
                          <p className="text-parchment-700 dark:text-parchment-300">{rep.content}</p>
                        </div>
                      ))}

                      {/* Reply Input Box */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          value={replyTextMap[`blog_${c.id}`] || ''}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [`blog_${c.id}`]: e.target.value })}
                          placeholder="লেখক হিসেবে উত্তর লিখুন..."
                          className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif"
                        />
                        <button
                          onClick={() => handleReplyBlog(blog.id, c.id)}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-semibold shadow-sm flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>উত্তর দিন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-serif text-parchment-400">এই ব্লগে এখনো কোনো পাঠক মন্তব্য করেননি।</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Poems Advice Moderation */}
      {activeSection === 'poems' && (
        <div className="space-y-6">
          {poems.map((poem) => (
            <div
              key={poem.id}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm space-y-4"
            >
              <div className="border-b border-parchment-100 dark:border-ink-800 pb-3">
                <span className="text-xs font-sans text-amber-600 font-bold">{poem.category}</span>
                <h4 className="font-serif font-bold text-lg text-parchment-950 dark:text-parchment-50">
                  {poem.title}
                </h4>
              </div>

              {poem.readerAdvices && poem.readerAdvices.length > 0 ? (
                <div className="space-y-4">
                  {poem.readerAdvices.map((adv) => (
                    <div
                      key={adv.id}
                      className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-serif text-parchment-500">
                        <span className="font-bold text-sm text-parchment-900 dark:text-parchment-100">
                          {adv.readerName} ({adv.readerEmail || 'n/a'})
                        </span>
                        <span>{adv.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm font-serif text-parchment-800 dark:text-parchment-200 leading-relaxed italic">
                        "{adv.adviceText}"
                      </p>

                      {/* Author Reply */}
                      {adv.authorReply && (
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-xs font-serif space-y-1 ml-4">
                          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>কবি রিফাতের উত্তর:</span>
                          </div>
                          <p className="text-parchment-700 dark:text-parchment-300">{adv.authorReply}</p>
                        </div>
                      )}

                      {/* Reply Input Box */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          value={replyTextMap[`poem_${adv.id}`] || ''}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [`poem_${adv.id}`]: e.target.value })}
                          placeholder="কবি হিসেবে পরামর্শের উত্তর দিন..."
                          className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-ink-900 border border-parchment-300 dark:border-ink-700 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif"
                        />
                        <button
                          onClick={() => handleReplyPoem(poem.id, adv.id)}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-semibold shadow-sm flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>উত্তর পাঠান</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-serif text-parchment-400">এই কবিতায় এখনো কোনো পাঠক পরামর্শ দেননি।</p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
