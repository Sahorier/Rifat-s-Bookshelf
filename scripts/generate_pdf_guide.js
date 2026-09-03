import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  let executablePath = edgePaths.find(p => fs.existsSync(p));
  console.log(`🚀 Using browser engine at: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const htmlPath = path.resolve(__dirname, '../guide.html');
  const outputPath = path.resolve(__dirname, '../Rifat_Bookshelf_Complete_Website_Guide.pdf');

  console.log(`📄 Loading HTML guide: ${htmlPath}`);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Wait for Google Fonts to load
  await page.evaluateHandle('document.fonts.ready');

  console.log('🖨️ Rendering vector A4 PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm'
    }
  });

  await browser.close();
  console.log(`✨ PDF successfully created at: ${outputPath}`);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
