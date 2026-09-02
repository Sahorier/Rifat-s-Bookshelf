# 📖 Rifat's Bookshelf (রিফাত হোসেন — সাহিত্য ও কাব্য ভুবন)

An aesthetic, literature-focused web platform for author & poet **Rifat Hossain (রিফাত হোসেন)**, featuring a 3D page-flipping realistic online reader, poetry advice lounge, literary blog with reactions & comments, book vault with Facebook Messenger ordering, and an author control studio.

---

## ✨ Features

- **📖 Free Online Bookshelf ("মুক্ত পাঠাগার")**:
  - Realistic 3D Page-Flip Reader with paper sounds and multiple paper themes (Parchment, Sepia, Cream, Dark).
  - **Pad Mode / Vertical Sheet Reading** optimized for Android, mobile phones, and tablets.
  - **Strict DRM Copyright Protection**: Text selection disabled, right-click blocked, print blocked via CSS, dynamic watermark overlays, and anti-screenshot shield.
- **📜 Verses & Stanzas ("কবিতার খেরোখাতা")**:
  - Incomplete verses with reader advice submission lounge.
  - 1-Click Aesthetic Social Quote Card Generator.
- **✍️ Literary Blog ("চিন্তার জলছবি")**:
  - Reaction buttons (❤️ Love, ☕ Cozy, 💡 Inspired, ✍️ Deep, 👏 Bravo).
  - Threaded comment section with verified author badge replies (`কবি রিফাত হোসেন (লেখক)`).
- **🛍️ The Book Vault & Facebook Order Flow ("বই সম্ভার")**:
  - 1-Click Facebook order template generator (`m.me/rifats.bookshelf`).
  - Access Request management and VIP Reader digital unlocking.
  - High-resolution printable/downloadable **PDF Books** for unlocked purchases.
- **👑 Author Control Studio (Admin Panel)**:
  - Real-time sales analytics and VIP access approval.
  - Book catalog manager with drag-and-drop local image uploading (`JPG`, `PNG`, `WebP`).
  - Blog and poem publisher.
  - Campaign promotions, discount coupons, and banner announcements.
  - Admin access via `#admin` or footer link (PIN: `1234`).

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/Sahorier/Rifat-s-Bookshelf.git
cd Rifat-s-Bookshelf

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173/` or `http://localhost:5174/` in your browser.

---

## 🌐 Deploy to Render (Static Site)

This project is pre-configured for instant deployment on [Render](https://render.com).

### Option 1: Automatic Blueprint Deployment
1. Log in to your Render Dashboard.
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository `https://github.com/Sahorier/Rifat-s-Bookshelf`.
4. Render will automatically detect `render.yaml` and configure the build settings.

### Option 2: Manual Static Site Setup
1. On Render, click **New +** -> **Static Site**.
2. Connect `https://github.com/Sahorier/Rifat-s-Bookshelf`.
3. Configure settings:
   - **Name**: `rifats-bookshelf`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**.

---

## 🔒 Security & Admin Access

- **Admin Login**: Navigate to `/#admin` or click **"লেখক প্যানেল"** at the bottom of the footer.
- **Default PIN**: `1234`
- **Keyboard Shortcut**: Press `Ctrl + Shift + A` anywhere on the site to trigger the PIN modal.

---

## 📄 License
© 2024-2026 Rifat Hossain (রিফাত হোসেন). All rights reserved.
