import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialAuthorInfo,
  initialBooks,
  initialPoems,
  initialBlogs,
  initialDiscountsAndEvents,
  initialOrders,
  initialMembers
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Persistence Helpers
  const getStored = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`rifat_bookshelf_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error("Storage error:", e);
      return fallback;
    }
  };

  const setStored = (key, val) => {
    try {
      localStorage.setItem(`rifat_bookshelf_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  };

  // State
  const [authorInfo, setAuthorInfoState] = useState(() => getStored('authorInfo', initialAuthorInfo));
  const [books, setBooksState] = useState(() => getStored('books', initialBooks));
  const [poems, setPoemsState] = useState(() => getStored('poems', initialPoems));
  const [blogs, setBlogsState] = useState(() => getStored('blogs', initialBlogs));
  const [events, setEventsState] = useState(() => getStored('events', initialDiscountsAndEvents));
  const [orders, setOrdersState] = useState(() => getStored('orders', initialOrders));
  const [members, setMembersState] = useState(() => getStored('members', initialMembers));
  const [unlockedBookIds, setUnlockedBookIds] = useState(() => getStored('unlockedBookIds', ['shop-book-1'])); // default 1 sample unlocked

  // UI / App State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rifat_theme');
    return saved || 'light';
  });
  const [isAdmin, setIsAdmin] = useState(() => getStored('isAdmin', false));
  const [activeModal, setActiveModal] = useState(null); // { type, data }
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'bookshelf' | 'poems' | 'blog' | 'shop' | 'admin'
  const [selectedBookForReading, setSelectedBookForReading] = useState(null); // Book object for 3D flip reader
  const [selectedPoemForView, setSelectedPoemForView] = useState(null);
  const [selectedBlogForView, setSelectedBlogForView] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Reader Preferences
  const [readerTheme, setReaderTheme] = useState('parchment'); // 'parchment', 'sepia', 'dark', 'cream'
  const [readerFontSize, setReaderFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [soundscape, setSoundscape] = useState({
    mode: 'off', // 'off', 'rain', 'fireplace', 'library'
    volume: 0.4,
    isPlaying: false
  });

  // Sync to local storage
  useEffect(() => setStored('authorInfo', authorInfo), [authorInfo]);
  useEffect(() => setStored('books', books), [books]);
  useEffect(() => setStored('poems', poems), [poems]);
  useEffect(() => setStored('blogs', blogs), [blogs]);
  useEffect(() => setStored('events', events), [events]);
  useEffect(() => setStored('orders', orders), [orders]);
  useEffect(() => setStored('members', members), [members]);
  useEffect(() => setStored('unlockedBookIds', unlockedBookIds), [unlockedBookIds]);
  useEffect(() => setStored('isAdmin', isAdmin), [isAdmin]);

  // Dark mode class toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('rifat_theme', theme);
  }, [theme]);

  // URL Hash / Path routing for Admin (#admin or /admin) and keyboard shortcut
  useEffect(() => {
    const checkHashAndPath = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash.includes('admin') || path.includes('/admin')) {
        const loggedIn = getStored('isAdmin', false);
        if (loggedIn) {
          setIsAdmin(true);
          setActiveTab('admin');
        } else {
          setActiveModal({ type: 'adminPin' });
        }
      }
    };

    checkHashAndPath();
    window.addEventListener('hashchange', checkHashAndPath);

    const handleSecretKey = (e) => {
      // Ctrl + Shift + A to quickly open Admin login
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveModal({ type: 'adminPin' });
      }
    };
    window.addEventListener('keydown', handleSecretKey);

    return () => {
      window.removeEventListener('hashchange', checkHashAndPath);
      window.removeEventListener('keydown', handleSecretKey);
    };
  }, []);

  // Admin Auth Handlers
  const loginAdmin = (enteredPin) => {
    const configuredPin = (import.meta.env.VITE_ADMIN_PIN || '1917').toString().trim();
    if (enteredPin && enteredPin.toString().trim() === configuredPin) {
      setIsAdmin(true);
      setStored('isAdmin', true);
      setActiveModal(null);
      setActiveTab('admin');
      window.location.hash = 'admin';
      showToast('লেখক প্যানেলে স্বাগতম!', 'লেখক রিফাত হোসেন হিসেবে লগইন সফল হয়েছে।', 'success');
      return true;
    } else {
      showToast('ভুল পিন কোড', 'সঠিক পিন কোড লিখুন।', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setStored('isAdmin', false);
    setActiveTab('home');
    setActiveModal(null);
    if (window.location.hash.includes('admin')) {
      try {
        history.replaceState(null, null, window.location.pathname);
      } catch (err) {
        window.location.hash = '';
      }
    }
    showToast('লগআউট সম্পন্ন', 'লেখক প্যানেল থেকে সফলভাবে লগআউট করা হয়েছে।', 'info');
  };

  // Toast System (deduplicated)
  const showToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => {
      const filtered = prev.filter(t => t.title !== title);
      return [...filtered.slice(-1), { id, title, message, type }];
    });
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Soundscape toggle
  const toggleSoundscape = (mode) => {
    setSoundscape(prev => {
      if (prev.mode === mode && prev.isPlaying) {
        return { ...prev, isPlaying: false, mode: 'off' };
      }
      return { ...prev, mode, isPlaying: true };
    });
  };

  // Orders and Facebook Buying Flow
  const createFacebookOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const accessKey = `VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newOrder = {
      id: orderId,
      bookId: orderData.bookId,
      bookTitle: orderData.bookTitle,
      customerName: orderData.customerName,
      customerContact: orderData.customerContact,
      customerEmail: orderData.customerEmail,
      price: orderData.price,
      orderDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      paymentStatus: 'Pending Verification',
      accessStatus: 'pending',
      notes: orderData.notes || '',
      facebookThreadUrl: authorInfo.messengerUrl || 'https://m.me/rifats.poetry',
      accessKey: accessKey
    };

    setOrdersState(prev => [newOrder, ...prev]);
    showToast('অর্ডার রিকোয়েস্ট তৈরি হয়েছে!', 'ফেসবুক মেসেঞ্জারে আপনার অর্ডারের তথ্য পাঠানো হয়েছে। অ্যাডমিন ভেরিফাই করে এক্সেস প্রদান করবেন।', 'success');

    // Also fire a small celebration effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    return newOrder;
  };

  const grantAccess = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    setOrdersState(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, accessStatus: 'granted', paymentStatus: 'Verified Paid' };
      }
      return order;
    }));

    // Unlock on current client if it matches
    if (targetOrder.bookId && !unlockedBookIds.includes(targetOrder.bookId)) {
      setUnlockedBookIds(prev => [...prev, targetOrder.bookId]);
    }

    // Update or add member
    setMembersState(prev => {
      const exists = prev.find(m => m.email === targetOrder.customerEmail || m.phone === targetOrder.customerContact);
      if (exists) {
        return prev.map(m => {
          if (m.id === exists.id) {
            const updatedBooks = Array.from(new Set([...(m.purchasedBookIds || []), targetOrder.bookId]));
            return { ...m, purchasedBookIds: updatedBooks, role: 'VIP Reader (পৃষ্ঠপোষক)' };
          }
          return m;
        });
      } else {
        return [...prev, {
          id: `mem-${Date.now()}`,
          name: targetOrder.customerName,
          email: targetOrder.customerEmail || 'n/a',
          phone: targetOrder.customerContact,
          role: 'VIP Reader (পৃষ্ঠপোষক)',
          joinedDate: new Date().toISOString().substring(0, 10),
          purchasedBookIds: [targetOrder.bookId],
          status: 'Active'
        }];
      }
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast('এক্সেস অনুমোদিত!', `${targetOrder.customerName} কে '${targetOrder.bookTitle}' বইটির ভিআইপি রিডার এক্সেস প্রদান করা হয়েছে।`, 'success');
  };

  const revokeAccess = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    setOrdersState(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, accessStatus: 'revoked' };
      }
      return order;
    }));

    showToast('এক্সেস স্থগিত করা হয়েছে', `${targetOrder.bookTitle} বইটির এক্সেস বাতিল করা হয়েছে।`, 'warning');
  };

  const verifyAndUnlockWithKey = (accessKeyOrEmail) => {
    const cleaned = accessKeyOrEmail.trim().toLowerCase();
    const matchedOrder = orders.find(o => 
      (o.accessKey && o.accessKey.toLowerCase() === cleaned) ||
      (o.customerEmail && o.customerEmail.toLowerCase() === cleaned) ||
      (o.customerContact && o.customerContact.includes(cleaned)) ||
      (o.id && o.id.toLowerCase() === cleaned)
    );

    if (matchedOrder) {
      if (matchedOrder.accessStatus === 'granted') {
        if (!unlockedBookIds.includes(matchedOrder.bookId)) {
          setUnlockedBookIds(prev => [...prev, matchedOrder.bookId]);
        }
        showToast('অভিনন্দন!', `'${matchedOrder.bookTitle}' বইটি আনলক করা হয়েছে। এখন পূর্ণ ই-বুক পড়তে পারবেন।`, 'success');
        confetti({ particleCount: 70, spread: 60 });
        return { success: true, bookId: matchedOrder.bookId, order: matchedOrder };
      } else {
        showToast('এক্সেস অপেক্ষারত', 'আপনার অর্ডারটি এখনো অ্যাডমিন অনুমোদনের অপেক্ষায় আছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।', 'warning');
        return { success: false, reason: 'pending' };
      }
    }

    showToast('কোনো বই পাওয়া যায়নি', 'প্রদত্ত এক্সেস কী বা ইমেলের সাথে কোনো অনুমোদিত অর্ডার মেলেনি।', 'error');
    return { success: false, reason: 'not_found' };
  };

  // Blog Reactions & Comments
  const reactToBlog = (blogId, reactionType) => {
    setBlogsState(prev => prev.map(blog => {
      if (blog.id === blogId) {
        const reactions = { ...blog.reactions };
        reactions[reactionType] = (reactions[reactionType] || 0) + 1;
        return { ...blog, reactions };
      }
      return blog;
    }));
    showToast('প্রতিক্রিয়া জানানো হয়েছে', `আপনি '${reactionType}' প্রতিক্রিয়া দিয়েছেন!`, 'success');
  };

  const addBlogComment = (blogId, comment) => {
    const newComment = {
      id: `c_${Date.now()}`,
      authorName: comment.name,
      authorEmail: comment.email,
      date: new Date().toISOString().substring(0, 10),
      content: comment.content,
      likes: 0,
      replies: []
    };

    setBlogsState(prev => prev.map(blog => {
      if (blog.id === blogId) {
        return { ...blog, comments: [newComment, ...blog.comments] };
      }
      return blog;
    }));

    showToast('মন্তব্য যুক্ত হয়েছে', 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ।', 'success');
  };

  const replyToBlogComment = (blogId, commentId, replyContent) => {
    const newReply = {
      id: `rep_${Date.now()}`,
      authorName: `${authorInfo.shortName} (লেখক)`,
      isAuthor: true,
      date: new Date().toISOString().substring(0, 10),
      content: replyContent
    };

    setBlogsState(prev => prev.map(blog => {
      if (blog.id === blogId) {
        const updatedComments = blog.comments.map(c => {
          if (c.id === commentId) {
            return { ...c, replies: [...(c.replies || []), newReply] };
          }
          return c;
        });
        return { ...blog, comments: updatedComments };
      }
      return blog;
    }));

    showToast('লেখকের উত্তর প্রকাশিত হয়েছে', 'মন্তব্যের উত্তর সফলভাবে যুক্ত করা হয়েছে।', 'success');
  };

  // Poem Likes and Reader Advice
  const toggleLikePoem = (poemId) => {
    setPoemsState(prev => prev.map(poem => {
      if (poem.id === poemId) {
        const isLiked = !poem.isLiked;
        const likes = isLiked ? poem.likes + 1 : Math.max(0, poem.likes - 1);
        return { ...poem, isLiked, likes };
      }
      return poem;
    }));
  };

  const addPoemAdvice = (poemId, advice) => {
    const newAdvice = {
      id: `adv_${Date.now()}`,
      readerName: advice.name,
      readerEmail: advice.email,
      date: new Date().toISOString().substring(0, 10),
      adviceText: advice.adviceText,
      authorReply: null
    };

    setPoemsState(prev => prev.map(poem => {
      if (poem.id === poemId) {
        return { ...poem, readerAdvices: [newAdvice, ...(poem.readerAdvices || [])] };
      }
      return poem;
    }));

    showToast('পরামর্শ প্রেরিত হয়েছে!', 'কবি রিফাতকে আপনার সাহিত্য ভাবনা ও পরামর্শ পাঠানোর জন্য আন্তরিক কৃতজ্ঞতা।', 'success');
    confetti({ particleCount: 40, spread: 50 });
  };

  const replyPoemAdvice = (poemId, adviceId, replyText) => {
    setPoemsState(prev => prev.map(poem => {
      if (poem.id === poemId) {
        const updatedAdvices = (poem.readerAdvices || []).map(adv => {
          if (adv.id === adviceId) {
            return { ...adv, authorReply: replyText };
          }
          return adv;
        });
        return { ...poem, readerAdvices: updatedAdvices };
      }
      return poem;
    }));

    showToast('উত্তর প্রকাশিত হয়েছে', 'পরামর্শের উত্তর সফলভাবে প্রদান করা হয়েছে।', 'success');
  };

  // Book Management (Admin)
  const saveBook = (bookData) => {
    if (bookData.id) {
      // Update
      setBooksState(prev => prev.map(b => b.id === bookData.id ? { ...b, ...bookData } : b));
      showToast('বই আপডেট সম্পন্ন', `'${bookData.title}' তথ্য সফলভাবে সংরক্ষিত হয়েছে।`, 'success');
    } else {
      // Create
      const newBook = {
        ...bookData,
        id: `book-${Date.now()}`,
        rating: 5.0,
        ratingCount: 1,
        readCount: 0
      };
      setBooksState(prev => [newBook, ...prev]);
      showToast('নতুন বই যুক্ত হয়েছে', `'${newBook.title}' সফলভাবে লাইব্রেরিতে অন্তর্ভুক্ত হয়েছে।`, 'success');
    }
  };

  const deleteBook = (bookId) => {
    setBooksState(prev => prev.filter(b => b.id !== bookId));
    showToast('বই মুছে ফেলা হয়েছে', 'বইটি তালিকা থেকে সরিয়ে নেওয়া হয়েছে।', 'info');
  };

  // Blog Management (Admin)
  const saveBlog = (blogData) => {
    if (blogData.id) {
      setBlogsState(prev => prev.map(b => b.id === blogData.id ? { ...b, ...blogData } : b));
      showToast('ব্লগ আপডেট হয়েছে', `'${blogData.title}' সংরক্ষিত হয়েছে।`, 'success');
    } else {
      const newBlog = {
        ...blogData,
        id: `blog-${Date.now()}`,
        date: new Date().toISOString().substring(0, 10),
        reactions: { love: 0, inspired: 0, deep: 0, cozy: 0, bravo: 0 },
        comments: []
      };
      setBlogsState(prev => [newBlog, ...prev]);
      showToast('নতুন ব্লগ প্রকাশিত হয়েছে', `'${newBlog.title}' সফলভাবে পোস্ট করা হয়েছে।`, 'success');
    }
  };

  const deleteBlog = (blogId) => {
    setBlogsState(prev => prev.filter(b => b.id !== blogId));
    showToast('ব্লগ মুছে ফেলা হয়েছে', 'পোস্টটি ডিলিট করা হয়েছে।', 'info');
  };

  // Poem Management (Admin)
  const savePoem = (poemData) => {
    if (poemData.id) {
      setPoemsState(prev => prev.map(p => p.id === poemData.id ? { ...p, ...poemData } : p));
      showToast('কবিতা আপডেট হয়েছে', `'${poemData.title}' সংরক্ষিত হয়েছে।`, 'success');
    } else {
      const newPoem = {
        ...poemData,
        id: `poem-${Date.now()}`,
        date: new Date().toISOString().substring(0, 10),
        likes: 0,
        isLiked: false,
        readerAdvices: []
      };
      setPoemsState(prev => [newPoem, ...prev]);
      showToast('নতুন কবিতা প্রকাশিত হয়েছে', `'${newPoem.title}' যুক্ত করা হয়েছে।`, 'success');
    }
  };

  const deletePoem = (poemId) => {
    setPoemsState(prev => prev.filter(p => p.id !== poemId));
    showToast('কবিতা মুছে ফেলা হয়েছে', 'কবিতাটি তালিকা থেকে সরানো হয়েছে।', 'info');
  };

  // Event & Discount Management
  const saveEvent = (eventData) => {
    if (eventData.id) {
      setEventsState(prev => prev.map(e => e.id === eventData.id ? { ...e, ...eventData } : e));
      showToast('ইভেন্ট আপডেট হয়েছে', `'${eventData.title}' সংরক্ষিত হয়েছে।`, 'success');
    } else {
      const newEvent = {
        ...eventData,
        id: `promo-${Date.now()}`,
        isActive: true
      };
      setEventsState(prev => [newEvent, ...prev]);
      showToast('নতুন ডিসকাউন্ট ইভেন্ট তৈরি হয়েছে', `'${newEvent.title}' শুরু হয়েছে।`, 'success');
    }
  };

  const toggleEventActive = (eventId) => {
    setEventsState(prev => prev.map(e => e.id === eventId ? { ...e, isActive: !e.isActive } : e));
  };

  const deleteEvent = (eventId) => {
    setEventsState(prev => prev.filter(e => e.id !== eventId));
    showToast('ইভেন্ট মুছে ফেলা হয়েছে', '', 'info');
  };

  // Rate a book (Reader 5-star review)
  const rateBook = (bookId, ratingVal, reviewComment, reviewerName) => {
    setBooksState(prev => prev.map(b => {
      if (b.id === bookId) {
        const newCount = (b.ratingCount || 0) + 1;
        const currentSum = (b.rating || 5) * (b.ratingCount || 1);
        const newAverage = Number(((currentSum + ratingVal) / newCount).toFixed(1));
        const newReview = {
          id: `rev-${Date.now()}`,
          reviewerName: reviewerName || 'নামহীন পাঠক',
          rating: ratingVal,
          comment: reviewComment,
          date: new Date().toISOString().substring(0, 10)
        };
        return {
          ...b,
          rating: newAverage,
          ratingCount: newCount,
          reviews: [newReview, ...(b.reviews || [])]
        };
      }
      return b;
    }));
    showToast('রেটিং প্রদানের জন্য ধন্যবাদ!', 'আপনার রিভিউ সফলভাবে যুক্ত হয়েছে।', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        authorInfo,
        setAuthorInfo: setAuthorInfoState,
        books,
        poems,
        blogs,
        events,
        orders,
        members,
        unlockedBookIds,
        theme,
        setTheme,
        isAdmin,
        setIsAdmin,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedBookForReading,
        setSelectedBookForReading,
        selectedPoemForView,
        setSelectedPoemForView,
        selectedBlogForView,
        setSelectedBlogForView,
        readerTheme,
        setReaderTheme,
        readerFontSize,
        setReaderFontSize,
        soundscape,
        toggleSoundscape,
        setSoundscape,
        toasts,
        showToast,
        removeToast,
        createFacebookOrder,
        grantAccess,
        revokeAccess,
        verifyAndUnlockWithKey,
        reactToBlog,
        addBlogComment,
        replyToBlogComment,
        toggleLikePoem,
        addPoemAdvice,
        replyPoemAdvice,
        saveBook,
        deleteBook,
        saveBlog,
        deleteBlog,
        savePoem,
        deletePoem,
        saveEvent,
        toggleEventActive,
        deleteEvent,
        rateBook,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
