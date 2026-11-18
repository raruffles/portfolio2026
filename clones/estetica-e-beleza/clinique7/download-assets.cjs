const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ASSETS_DIR = path.join(__dirname, 'assets');
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const sourceHtml = fs.readFileSync(path.join(__dirname, 'source.html'), 'utf8');

// Collect all URLs to download
const urlSet = new Set();

// 1. Explicit CSS files
const cssUrls = [
  'https://static.tildacdn.one/css/tilda-grid-3.0.min.css',
  'https://static.tildacdn.one/ws/project7721278/tilda-blocks-page38995148.min.css?t=1735599870',
  'https://static.tildacdn.one/css/tilda-animation-2.0.min.css',
  'https://static.tildacdn.one/css/tilda-popup-1.1.min.css',
  'https://static.tildacdn.one/css/tilda-forms-1.0.min.css',
  'https://static.tildacdn.one/css/tilda-zero-form-errorbox.min.css'
];
cssUrls.forEach(u => urlSet.add(u));

// 2. Explicit JS files
const jsUrls = [
  'https://neo.tildacdn.com/js/tilda-fallback-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-polyfill-1.0.min.js',
  'https://static.tildacdn.one/js/jquery-1.10.2.min.js',
  'https://static.tildacdn.one/js/tilda-scripts-3.0.min.js',
  'https://static.tildacdn.one/ws/project7721278/tilda-blocks-page38995148.min.js?t=1735599870',
  'https://static.tildacdn.one/js/tilda-lazyload-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-animation-2.0.min.js',
  'https://static.tildacdn.one/js/tilda-zero-1.1.min.js',
  'https://static.tildacdn.one/js/tilda-menu-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-popup-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-forms-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-zero-forms-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-animation-ext-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-animation-sbs-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-zero-scale-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-zero-fixed-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-skiplink-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-events-1.0.min.js',
  'https://static.tildacdn.one/js/tilda-forms-dict-1.0.min.js',
  'https://unpkg.com/scrollbooster@3/dist/scrollbooster.min.js',
  'https://unpkg.co/gsap@3/dist/gsap.min.js',
  'https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/gh/studio-freight/lenis@latest/bundled/lenis.js'
];
jsUrls.forEach(u => urlSet.add(u));

// 3. Fonts
const fontUrls = [
  'https://static.tildacdn.com/tild3766-6630-4863-b361-333561616230/Cormorant-SemiBoldIt.woff'
];
fontUrls.forEach(u => urlSet.add(u));

// 4. Video
const videoUrls = [
  'https://cdnv.boomstream.com/balancer/OE9bEB0D-S30LPKak.mp4'
];
videoUrls.forEach(u => urlSet.add(u));

// 5. Extract all URLs from source.html
// Match static.tildacdn.one, optim.tildacdn.one, static.tildacdn.com
const regex = /https:\/\/(?:static|optim|ws)\.tildacdn\.(?:one|com)\/[^"'\s\)\\,]+/gi;
let match;
while ((match = regex.exec(sourceHtml)) !== null) {
  let u = match[0].replace(/&amp;/g, '&');
  // strip trailing quote or bracket if captured
  u = u.replace(/[>'"]+$/, '');
  urlSet.add(u);
}

console.log(`Found ${urlSet.size} total unique URLs to download.`);

// Helper to determine clean local filename
function getLocalFilename(urlStr) {
  const parsed = new URL(urlStr);
  const cleanPath = parsed.pathname;
  let baseName = path.basename(cleanPath);
  
  if (!baseName || baseName.includes('?')) {
    baseName = baseName.split('?')[0];
  }

  // If URL has tilda query param like ?t=...
  if (baseName.endsWith('.min.css')) return baseName;
  if (baseName.endsWith('.min.js')) return baseName;
  
  // Format hash or prefix if common filename like 1.jpg, 2.jpg, 3.jpg
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length >= 2) {
    const parent = segments[segments.length - 2];
    if (['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', 'Frame_191.svg', 'Frame_191.png', 'Group_55.svg', 'arrow-right_2.svg'].includes(baseName)) {
      baseName = `${parent}_${baseName}`;
    }
  }
  
  // Strip any remaining special characters
  baseName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  return baseName;
}

// Download helper with redirects support
function downloadFile(urlStr, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve({ url: urlStr, dest: destPath, status: 'already_exists' });
    }

    const parsedUrl = new URL(urlStr);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const req = client.get(urlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://clinique7.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlStr).toString();
        }
        return downloadFile(redirectUrl, destPath, retries - 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${urlStr}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve({ url: urlStr, dest: destPath, status: 'downloaded' });
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', (err) => {
      if (retries > 0) {
        setTimeout(() => {
          downloadFile(urlStr, destPath, retries - 1).then(resolve).catch(reject);
        }, 1000);
      } else {
        reject(err);
      }
    });

    req.setTimeout(30000, () => {
      req.abort();
      if (retries > 0) {
        setTimeout(() => {
          downloadFile(urlStr, destPath, retries - 1).then(resolve).catch(reject);
        }, 1000);
      } else {
        reject(new Error(`Timeout downloading ${urlStr}`));
      }
    });
  });
}

// Queue downloads with concurrency
async function downloadAll() {
  const assetMap = {};
  const urls = Array.from(urlSet);
  const queue = [...urls];
  const CONCURRENCY = 6;
  let completed = 0;
  let failed = 0;

  async function worker() {
    while (queue.length > 0) {
      const urlStr = queue.shift();
      const filename = getLocalFilename(urlStr);
      const destPath = path.join(ASSETS_DIR, filename);

      try {
        await downloadFile(urlStr, destPath);
        assetMap[urlStr] = `assets/${filename}`;
        completed++;
        if (completed % 10 === 0 || completed === urls.length) {
          console.log(`[${completed}/${urls.length}] Downloaded ${filename}`);
        }
      } catch (err) {
        failed++;
        console.warn(`[FAILED] ${urlStr}: ${err.message}`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  console.log(`Finished downloading. Total: ${urls.length}, Completed: ${completed}, Failed: ${failed}`);
  fs.writeFileSync(path.join(__dirname, 'asset-map.json'), JSON.stringify(assetMap, null, 2));
  console.log('Saved asset-map.json');
}

downloadAll();
