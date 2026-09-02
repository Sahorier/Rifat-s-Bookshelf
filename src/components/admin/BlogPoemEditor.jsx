import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageUploadBox } from '../common/ImageUploadBox';
import {
  Feather,
  Sparkles,
  Plus,
  Trash2,
  Save,
  Edit2,
  X,
  FileText,
  HelpCircle
} from 'lucide-react';

export const BlogPoemEditor = () => {
  const {
    blogs,
    poems,
    saveBlog,
    deleteBlog,
    savePoem,
    deletePoem,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'poems'
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Blog Form State
  const [blogData, setBlogData] = useState({
    title: '',
    category: 'Literary Craft (সাহিত্য ও ভাবনা)',
    readTime: '৫ মিনিট পাঠ',
    cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200',
    excerpt: '',
    content: ''
  });

  // Poem Form State
  const [poemData, setPoemData] = useState({
    title: '',
    category: 'Philosophical (দার্শনিক)',
    status: 'published', // 'published' or 'seeking_advice'
    incompleteVersePrompt: '',
    excerpt: '',
    stanzas: [
      { id: 's1', lines: ['স্তবক ১ লাইন ১...', 'স্তবক ১ লাইন ২...'] }
    ]
  });

  const handleStartCreateBlog = () => {
    setBlogData({
      title: '',
      category: 'Literary Craft (সাহিত্য ও ভাবনা)',
      readTime: '৪ মিনিট পাঠ',
      cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200',
      excerpt: '',
      content: ''
    });
    setEditingItem(null);
    setIsCreating(true);
  };

  const handleStartEditBlog = (b) => {
    setBlogData({ ...b });
    setEditingItem(b);
    setIsCreating(true);
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogData.title.trim()) return;

    saveBlog({
      ...blogData,
      author: 'রিফাত হোসেন',
      id: editingItem ? editingItem.id : undefined
    });
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleStartCreatePoem = () => {
    setPoemData({
      title: '',
      category: 'Romantic (প্রেম ও বিরহ)',
      status: 'seeking_advice',
      incompleteVersePrompt: 'প্রিয় পাঠক, এই কবিতার শেষ স্তবকটি কেমন হওয়া উচিত? আপনার পঙ্‌ক্তি লিখে জানান!',
      excerpt: '',
      stanzas: [
        { id: 's1', lines: ['প্রথম স্তবকের লাইন ১', 'প্রথম স্তবকের লাইন ২'] },
        { id: 's2', isIncomplete: true, lines: ['অসমাপ্ত স্তবকের লাইন...', '[পাঠকদের পরামর্শের জন্য ফাঁকা]'] }
      ]
    });
    setEditingItem(null);
    setIsCreating(true);
  };

  const handleStartEditPoem = (p) => {
    setPoemData({ ...p });
    setEditingItem(p);
    setIsCreating(true);
  };

  const handleSavePoem = (e) => {
    e.preventDefault();
    if (!poemData.title.trim()) return;

    savePoem({
      ...poemData,
      author: 'রিফাত রহমান',
      id: editingItem ? editingItem.id : undefined
    });
    setIsCreating(false);
    setEditingItem(null);
  };

  // Stanza helpers
  const handleAddStanza = () => {
    setPoemData(prev => ({
      ...prev,
      stanzas: [
        ...(prev.stanzas || []),
        { id: `s_${Date.now()}`, lines: ['নতুন স্তবকের লাইন ১', 'নতুন স্তবকের লাইন ২'] }
      ]
    }));
  };

  const handleUpdateStanzaLines = (idx, text) => {
    const lines = text.split('\n');
    setPoemData(prev => {
      const updated = [...prev.stanzas];
      updated[idx] = { ...updated[idx], lines };
      return { ...prev, stanzas: updated };
    });
  };

  const handleRemoveStanza = (idx) => {
    setPoemData(prev => ({
      ...prev,
      stanzas: prev.stanzas.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner & Tab Switcher */}
      <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-parchment-200 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveTab('blogs'); setIsCreating(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center gap-2 ${
              activeTab === 'blogs'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>ব্লগ ও প্রবন্ধ ({blogs.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('poems'); setIsCreating(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center gap-2 ${
              activeTab === 'poems'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>কবিতা ও খেরোখাতা ({poems.length})</span>
          </button>
        </div>

        {!isCreating && (
          <button
            onClick={activeTab === 'blogs' ? handleStartCreateBlog : handleStartCreatePoem}
            className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'blogs' ? 'নতুন ব্লগ পোস্ট' : 'নতুন কবিতা পোস্ট'}</span>
          </button>
        )}
      </div>

      {/* Blog Creation / Edit Form */}
      {isCreating && activeTab === 'blogs' && (
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/40 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-4">
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
              {editingItem ? 'ব্লগ সম্পাদনা' : 'নতুন সাহিত্য ব্লগ রচনা'}
            </h4>
            <button onClick={() => setIsCreating(false)} className="p-1 rounded-full text-parchment-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveBlog} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ব্লগের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={blogData.title}
                  onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                  placeholder="যেমন: কবিতা কেন লিখি? একজন শব্দের কারিগরের আত্মানুসন্ধান"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ক্যাটাগরি
                </label>
                <input
                  type="text"
                  value={blogData.category}
                  onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                  placeholder="Literary Craft (সাহিত্য ও ভাবনা)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>
            </div>

            {/* Blog Cover Image Upload */}
            <div className="p-4 rounded-2xl bg-parchment-50 dark:bg-ink-950 border border-parchment-200 dark:border-ink-800">
              <ImageUploadBox
                value={blogData.cover}
                onChange={(coverUrl) => setBlogData({ ...blogData, cover: coverUrl })}
                label="ব্লগের কভার ছবি নির্বাচন বা আপলোড করুন"
                aspectRatio="aspect-[16/9]"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                পড়ার সময় (Read time)
              </label>
              <input
                type="text"
                value={blogData.readTime}
                onChange={(e) => setBlogData({ ...blogData, readTime: e.target.value })}
                placeholder="৫ মিনিট পাঠ"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                সংক্ষিপ্ত উক্তি বা ভূমিকা (Excerpt)
              </label>
              <textarea
                rows={2}
                value={blogData.excerpt}
                onChange={(e) => setBlogData({ ...blogData, excerpt: e.target.value })}
                placeholder="পাঠকদের মনোযোগ আকর্ষণকারী সারাংশ..."
                className="w-full text-xs px-3.5 py-2 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                ব্লগের পূর্ণ লেখা (Markdown সমর্থিত - ### হেডিং, &gt; কোট)
              </label>
              <textarea
                rows={8}
                required
                value={blogData.content}
                onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                placeholder="এখানে প্রবন্ধের সম্পূর্ণ টেক্সট লিখুন..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-parchment-200 dark:border-ink-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-xl bg-parchment-100 dark:bg-ink-800 text-xs font-serif"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-serif font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Poem Creation / Edit Form */}
      {isCreating && activeTab === 'poems' && (
        <div className="bg-white dark:bg-ink-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/40 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-parchment-200 dark:border-ink-800 pb-4">
            <h4 className="font-serif font-bold text-xl text-parchment-950 dark:text-parchment-50">
              {editingItem ? 'কবিতা সম্পাদনা' : 'নতুন কবিতা বা অসমাপ্ত পঙ্‌ক্তি প্রকাশ'}
            </h4>
            <button onClick={() => setIsCreating(false)} className="p-1 rounded-full text-parchment-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSavePoem} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  কবিতার শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={poemData.title}
                  onChange={(e) => setPoemData({ ...poemData, title: e.target.value })}
                  placeholder="যেমন: অগ্নিকুন্ডের সন্ধ্যা"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  ক্যাটাগরি
                </label>
                <input
                  type="text"
                  value={poemData.category}
                  onChange={(e) => setPoemData({ ...poemData, category: e.target.value })}
                  placeholder="Philosophical (দার্শনিক)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300 mb-1">
                  স্ট্যাটাস
                </label>
                <select
                  value={poemData.status}
                  onChange={(e) => setPoemData({ ...poemData, status: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-serif"
                >
                  <option value="published">সম্পূর্ণ কবিতা (Published)</option>
                  <option value="seeking_advice">অসমাপ্ত কবিতা • পাঠকদের পরামর্শ চাই (Seeking Advice)</option>
                </select>
              </div>
            </div>

            {poemData.status === 'seeking_advice' && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-600/30">
                <label className="block text-xs font-serif font-bold text-amber-900 dark:text-amber-200 mb-1">
                  পাঠকদের কাছে পরামর্শের বার্তা / প্রম্পট
                </label>
                <input
                  type="text"
                  value={poemData.incompleteVersePrompt}
                  onChange={(e) => setPoemData({ ...poemData, incompleteVersePrompt: e.target.value })}
                  placeholder="প্রিয় পাঠক, এই কবিতার শেষ স্তবকটি কেমন হওয়া উচিত? আপনার পঙ্‌ক্তি লিখে জানান!"
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-ink-900 border border-amber-300 dark:border-amber-700 font-serif"
                />
              </div>
            )}

            {/* Stanzas Editor */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-parchment-800 dark:text-parchment-200">
                  কবিতার স্তবকসমূহ (Stanzas):
                </label>
                <button
                  type="button"
                  onClick={handleAddStanza}
                  className="px-3 py-1 rounded-lg bg-amber-600 text-white text-xs font-serif flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>স্তবক যোগ করুন</span>
                </button>
              </div>

              {poemData.stanzas?.map((stanza, sIdx) => (
                <div key={stanza.id || sIdx} className="p-4 bg-parchment-50 dark:bg-ink-950 rounded-2xl border border-parchment-200 dark:border-ink-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-amber-700 dark:text-amber-400">
                      স্তবক {sIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStanza(sIdx)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={stanza.lines?.join('\n')}
                    onChange={(e) => handleUpdateStanzaLines(sIdx, e.target.value)}
                    placeholder="প্রতিটি লাইনের পর Enter দিয়ে নতুন পঙ্‌ক্তি লিখুন..."
                    className="w-full text-xs p-2.5 bg-white dark:bg-ink-900 border rounded-xl font-serif"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-parchment-200 dark:border-ink-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-xl bg-parchment-100 dark:bg-ink-800 text-xs font-serif"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-serif font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>কবিতা পোস্ট করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      {activeTab === 'blogs' && (
        <div className="space-y-4">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-ink-900 rounded-3xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img src={b.cover} alt={b.title} className="w-16 h-16 object-cover rounded-2xl shadow-sm shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-parchment-100 dark:bg-ink-800 text-amber-700 dark:text-amber-400 font-bold">
                    {b.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-50 truncate mt-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-parchment-500 font-sans">{b.date} &bull; {b.comments?.length || 0} টি মন্তব্য</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleStartEditBlog(b)}
                  className="p-2 rounded-xl bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 hover:bg-amber-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBlog(b.id)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Poems List */}
      {activeTab === 'poems' && (
        <div className="space-y-4">
          {poems.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-ink-900 rounded-3xl p-5 border border-parchment-200 dark:border-ink-800 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-parchment-100 dark:bg-ink-800 text-amber-700 dark:text-amber-400 font-bold">
                    {p.category}
                  </span>
                  {p.status === 'seeking_advice' && (
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-600 text-white font-bold">
                      পরামর্শ প্রত্যাশিত
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-base text-parchment-950 dark:text-parchment-50 truncate">
                  {p.title}
                </h4>
                <p className="text-xs text-parchment-500 font-sans">
                  {p.likes || 0} লাইক &bull; {p.readerAdvices?.length || 0} টি পাঠকের পরামর্শ
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleStartEditPoem(p)}
                  className="p-2 rounded-xl bg-parchment-100 dark:bg-ink-800 text-parchment-700 dark:text-parchment-300 hover:bg-amber-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deletePoem(p.id)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
