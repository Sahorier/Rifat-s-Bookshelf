import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, Link2, RefreshCw } from 'lucide-react';

export const ImageUploadBox = ({
  value,
  onChange,
  label = "বইয়ের কভার ছবি আপলোড করুন",
  aspectRatio = "aspect-[2/3]",
  className = ""
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('অনুগ্রহ করে একটি ছবি ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleUrlApply = () => {
    if (urlValue.trim()) {
      onChange(urlValue.trim());
      setShowUrlInput(false);
      setUrlValue('');
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-serif font-medium text-parchment-700 dark:text-parchment-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-sans text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'ফাইল আপলোড মোড' : 'ইন্টারনেট লিঙ্ক দিয়ে যুক্ত করুন'}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-parchment-50 dark:bg-ink-950 border border-parchment-300 dark:border-ink-700 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-serif font-bold transition-colors"
          >
            যোগ করুন
          </button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          {value ? (
            /* Uploaded Preview Container */
            <div className="relative group border-2 border-amber-600/30 rounded-2xl overflow-hidden bg-parchment-100 dark:bg-ink-950 p-2 flex items-center gap-4">
              <div className={`w-20 ${aspectRatio} rounded-lg overflow-hidden bg-black/10 border border-parchment-300 dark:border-ink-800 shrink-0 shadow-md`}>
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-xs font-serif font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>ছবি সফলভাবে আপলোড হয়েছে</span>
                </span>
                <p className="text-[11px] text-parchment-500 font-sans truncate">
                  কভার ইমেজ সক্রিয় রয়েছে
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 rounded-lg bg-amber-600/10 text-amber-800 dark:text-amber-300 hover:bg-amber-600/20 text-xs font-serif flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>ছবি পরিবর্তন করুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemove}
                    className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="ছবি মুছুন"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Drag and Drop Zone */
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 scale-101'
                  : 'border-parchment-300 dark:border-ink-700 hover:border-amber-500 bg-parchment-50/70 dark:bg-ink-950/70'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-600/10 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-serif font-bold text-parchment-900 dark:text-parchment-100 mb-1">
                ডিভাইস থেকে ছবি আপলোড করতে ক্লিক করুন অথবা টেনে এনে ছেড়ে দিন
              </p>
              <p className="text-[11px] font-sans text-parchment-500">
                JPG, PNG, WebP ফরম্যাট সমর্থিত
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
