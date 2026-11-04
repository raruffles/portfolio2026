const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CLONE_DIR = path.join(__dirname, '..', 'clones', 'nova-dental');
const ASSETS_DIR = path.join(CLONE_DIR, 'assets');
fs.mkdirSync(ASSETS_DIR, { recursive: true });

const sourceHtml = fs.readFileSync(path.join(CLONE_DIR, 'source.html'), 'utf8');

// Collect all URLs to download
const urlSet = new Set();

// 1. External scripts & CSS
const externalUrls = [
  'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/css/nova-dental-dev.webflow.shared.a3248dd12.min.css',
  'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6a42c6bb158437a90659a312',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/js/webflow.e9e3e43c.216a05fc91a6acd3.js',
  'https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js',
  'https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js',
  'https://cdn.prod.website-files.com/gsap/3.15.0/SplitText.min.js',
  'https://cdn.jsdelivr.net/npm/inputmask@5.0.9/dist/inputmask.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.1/jquery.validate.min.js',
  'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js'
];
externalUrls.forEach(u => urlSet.add(u));

// 2. Favicons
const faviconMatches = [...sourceHtml.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["'](?:icon|apple-touch-icon)["']/gi)].map(m => m[1]);
faviconMatches.forEach(u => urlSet.add(u));

// 3. Img src and srcset
const imgSrcMatches = [...sourceHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
imgSrcMatches.forEach(u => urlSet.add(u));

const srcsetMatches = [...sourceHtml.matchAll(/srcset=["']([^"']+)["']/gi)];
for (const m of srcsetMatches) {
  const parts = m[1].split(',');
  for (const part of parts) {
    const trimmed = part.trim().split(/\s+/)[0];
    if (trimmed && trimmed.startsWith('http')) {
      urlSet.add(trimmed);
    }
  }
}

// 4. Any other cdn.prod.website-files.com URLs
const allWfUrls = [...sourceHtml.matchAll(/https:\/\/cdn\.prod\.website-files\.com\/[^\s"'<>\)]+/gi)].map(m => m[0]);
allWfUrls.forEach(u => {
  let clean = u.replace(/[>'",]+$/, '');
  urlSet.add(clean);
});

// 5. Neue Montreal Fonts from CSS
const fontUrls = [
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b497fd6810a6239c45_neuemontreal-regular-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b494d865580575a6e7_neuemontreal-italic-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b497fd6810a6239c74_neuemontreal-bolditalic-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b4b113369300738a51_neuemontreal-bold-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b473eb650df8cd62fe_neuemontreal-medium-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b473eb650df8cd6304_neuemontreal-mediumitalic-english.woff2',
  'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/6a47d4b4ec1c6d36e8db925b_neuemontreal-semibolditalic-english.woff2'
];
fontUrls.forEach(u => urlSet.add(u));

console.log(`Found ${urlSet.size} unique URLs to download for nova-dental.`);

function getLocalFilename(urlStr) {
  const parsed = new URL(urlStr);
  let baseName = path.basename(parsed.pathname);
  if (!baseName || baseName.includes('?')) {
    baseName = baseName.split('?')[0];
  }
  // Decode percent encoding
  try {
    baseName = decodeURIComponent(baseName);
  } catch (e) {}

  // Clean filename for Windows
  baseName = baseName.replace(/[:*?"<>|]/g, '_');

  // If specific well-known
  if (urlStr.includes('splide.min.css')) return 'splide.min.css';
  if (urlStr.includes('splide.min.js')) return 'splide.min.js';
  if (urlStr.includes('nova-dental-dev.webflow.shared')) return 'nova-dental-dev.webflow.shared.min.css';
  if (urlStr.includes('webflow.e9e3e43c')) return 'webflow.min.js';
  if (urlStr.includes('jquery-3.5.1')) return 'jquery-3.5.1.min.js';
  if (urlStr.includes('gsap.min.js')) return 'gsap.min.js';
  if (urlStr.includes('ScrollTrigger.min.js')) return 'ScrollTrigger.min.js';
  if (urlStr.includes('SplitText.min.js')) return 'SplitText.min.js';
  if (urlStr.includes('inputmask.min.js')) return 'inputmask.min.js';
  if (urlStr.includes('jquery.validate.min.js')) return 'jquery.validate.min.js';

  return baseName;
}

const assetMap = {};

function downloadFile(urlStr, targetPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
      return resolve(true);
    }
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlStr).href;
        }
        return downloadFile(redirectUrl, targetPath).then(resolve);
      }
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(targetPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        console.warn(`Failed (${res.statusCode}): ${urlStr}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${urlStr}: ${err.message}`);
      resolve(false);
    });
  });
}

async function start() {
  for (const urlStr of urlSet) {
    const filename = getLocalFilename(urlStr);
    const targetPath = path.join(ASSETS_DIR, filename);
    assetMap[urlStr] = `assets/${filename}`;
    await downloadFile(urlStr, targetPath);
  }

  fs.writeFileSync(path.join(CLONE_DIR, 'asset-map.json'), JSON.stringify(assetMap, null, 2));
  console.log('Saved asset-map.json');

  // Fix font paths inside CSS
  const cssFile = path.join(ASSETS_DIR, 'nova-dental-dev.webflow.shared.min.css');
  if (fs.existsSync(cssFile)) {
    let cssContent = fs.readFileSync(cssFile, 'utf8');
    for (const fontUrl of fontUrls) {
      const fName = getLocalFilename(fontUrl);
      cssContent = cssContent.split(fontUrl).join(fName);
    }
    fs.writeFileSync(cssFile, cssContent);
    console.log('Updated font references in CSS');
  }

  // Now build index.html
  let html = sourceHtml;

  // Remove integrity attributes because we modified or localized files
  html = html.replace(/\sintegrity="[^"]*"/gi, '');
  html = html.replace(/\scrossorigin="[^"]*"/gi, '');

  // Remove Google Analytics / Webflow badge or trackers if present
  html = html.replace(/<script[^>]*google-analytics\.com[^>]*><\/script>/gi, '');
  html = html.replace(/<script[^>]*googletagmanager\.com[^>]*><\/script>/gi, '');

  // Replace all mapped URLs
  const sortedUrls = Object.keys(assetMap).sort((a, b) => b.length - a.length);
  for (const origUrl of sortedUrls) {
    const localRel = assetMap[origUrl];
    html = html.split(origUrl).join(localRel);
  }

  // Remove Webflow badge container if present (.w-webflow-badge)
  html = html.replace(/<a class="w-webflow-badge"[\s\S]*?<\/a>/gi, '');

  // Make sure smooth scroll and proper font display are present
  const headEnhancement = `
  <style>
    html {
      scroll-behavior: smooth;
    }
    /* Hide Webflow badge */
    .w-webflow-badge {
      display: none !important;
    }
  </style>
  `;
  html = html.replace('</head>', `${headEnhancement}\n</head>`);

  fs.writeFileSync(path.join(CLONE_DIR, 'index.html'), html);
  console.log('Built clones/nova-dental/index.html! Length:', html.length);
}

start();
