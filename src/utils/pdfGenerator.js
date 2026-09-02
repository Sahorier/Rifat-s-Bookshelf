// Utility to generate clean, beautifully formatted printable PDF for books

export const downloadBookAsPDF = (book) => {
  const pages = book.pages || book.fullBookPages || book.previewPages || [];
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("পপ-আপ উইন্ডো ব্লক করা আছে। অনুগ্রহ করে ব্রাউজারের পপ-আপ অনুমতি দিন।");
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>${book.title} — ${book.author || 'রিফাত হোসেন'} (PDF Edition)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Noto+Serif+Bengali:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: 'Noto Serif Bengali', 'Cormorant Garamond', serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.8;
      margin: 0;
      padding: 0;
    }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 90vh;
      border: 3px double #8c6d46;
      padding: 40px;
      margin: 20px;
    }
    .cover-title {
      font-size: 38px;
      font-weight: 700;
      color: #3b2314;
      margin-bottom: 12px;
    }
    .cover-subtitle {
      font-size: 20px;
      font-style: italic;
      color: #6d543f;
      margin-bottom: 40px;
    }
    .cover-author {
      font-size: 24px;
      font-weight: 600;
      color: #8c4a16;
      margin-top: 60px;
      border-top: 2px solid #8c6d46;
      padding-top: 15px;
      display: inline-block;
    }
    .cover-meta {
      font-size: 13px;
      color: #777;
      margin-top: 20px;
    }
    .page-container {
      page-break-after: always;
      padding: 30px 20px;
      min-height: 80vh;
      position: relative;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d4c2aa;
      padding-bottom: 8px;
      font-size: 12px;
      color: #8c6d46;
      margin-bottom: 30px;
    }
    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #3b2314;
      margin-bottom: 20px;
    }
    .page-body {
      font-size: 16px;
      white-space: pre-line;
      line-height: 2;
      text-align: justify;
    }
    .page-footer {
      position: absolute;
      bottom: 10px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e8dec8;
      padding-top: 6px;
      font-size: 11px;
      color: #999;
    }
    .no-print-bar {
      background: #3b2314;
      color: #fff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      font-family: sans-serif;
    }
    .print-btn {
      background: #d97706;
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }
    @media print {
      .no-print-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong>${book.title}</strong> — PDF ই-বুক সংস্করণ (${book.author || 'রিফাত হোসেন'})
    </div>
    <button class="print-btn" onclick="window.print()">📥 PDF সংরক্ষণ বা প্রিন্ট করুন</button>
  </div>

  <!-- Book Cover Page -->
  <div class="cover-page">
    <div style="font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: #8c6d46; margin-bottom: 20px;">
      Rifat's Bookshelf &bull; প্রকাশনা
    </div>
    <div class="cover-title">${book.title}</div>
    ${book.englishTitle ? `<div class="cover-subtitle">${book.englishTitle}</div>` : ''}
    <div style="max-width: 500px; font-size: 15px; color: #555; margin: 20px auto; font-style: italic;">
      "${book.shortDescription || book.description || ''}"
    </div>
    <div class="cover-author">${book.author || 'রিফাত হোসেন'}</div>
    <div class="cover-meta">
      ক্যাটাগরি: ${book.category || 'সাহিত্য'} &bull; বছর: ${book.year || '২০২৪'} &bull; ডিজিটাল কপি
    </div>
  </div>

  <!-- Book Pages -->
  ${pages.map((p, idx) => `
    <div class="page-container">
      <div class="page-header">
        <span>${book.title}</span>
        <span>${book.author || 'রিফাত হোসেন'}</span>
      </div>
      <div class="page-title">${p.title || `পৃষ্ঠা ${idx + 1}`}</div>
      <div class="page-body">${p.content || ''}</div>
      <div class="page-footer">
        <span>Rifat's Bookshelf &bull; Digital Edition</span>
        <span>— পৃষ্ঠা ${idx + 1} / ${pages.length} —</span>
      </div>
    </div>
  `).join('')}

</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
