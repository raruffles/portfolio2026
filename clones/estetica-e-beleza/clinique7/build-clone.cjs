const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'source.html');
const assetMapPath = path.join(__dirname, 'asset-map.json');
const outputPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(sourcePath, 'utf8');
const assetMap = JSON.parse(fs.readFileSync(assetMapPath, 'utf8'));

console.log('Building index.html from source.html. Initial length:', html.length);

// 1. Remove 3rd party trackers / analytics safely (without greedy matching across script tags)
const gtmRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?(?:gtm\.js|GTM-KSCLNWBW)[\s\S]*?<\/script>/gi;
html = html.replace(gtmRegex, '<!-- GTM removed -->');
html = html.replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/gi, '<!-- GTM removed -->');
html = html.replace(/<noscript><iframe[^>]*googletagmanager\.com[\s\S]*?<\/noscript>/gi, '');

const clarityRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?clarity\.ms[\s\S]*?<\/script>/gi;
html = html.replace(clarityRegex, '');

const callrailRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?callrail\.com[\s\S]*?<\/script>/gi;
html = html.replace(callrailRegex, '');

const tildastatRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?tildastatscript[\s\S]*?<\/script>/gi;
html = html.replace(tildastatRegex, '<!-- tilda-stat removed -->');

// 2. Video URL replacement
html = html.replace(/https:\/\/cdnv\.boomstream\.com\/balancer\/OE9bEB0D-S30LPKak\.mp4(#t=[0-9.]+)?/g, 'assets/OE9bEB0D-S30LPKak.mp4');

// 3. Replace all mapped assets
// Sort URLs by length descending so more specific URLs are replaced before prefixes
const sortedUrls = Object.keys(assetMap).sort((a, b) => b.length - a.length);

let replaceCount = 0;
for (const originalUrl of sortedUrls) {
  const localPath = assetMap[originalUrl];
  if (html.includes(originalUrl)) {
    // Escape for global regex
    const escaped = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    html = html.replace(regex, localPath);
    replaceCount++;
  }
}
console.log(`Replaced ${replaceCount} unique mapped URLs throughout the document.`);

// 4. Inject explicit Font Face & Google Font fallback in head
const fontInjection = `
  <!-- Custom Font Definition -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Cormor';
      src: url('assets/Cormorant-SemiBoldIt.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Cormor';
      src: local('Cormorant Garamond SemiBold Italic'), local('CormorantGaramond-SemiBoldItalic');
      font-weight: 600;
      font-style: italic;
      font-display: swap;
    }
    /* Smooth scroll and video fit */
    html {
      scroll-behavior: smooth;
    }
    video {
      object-fit: cover;
    }
  </style>
`;

html = html.replace('</head>', `${fontInjection}\n</head>`);

// 5. Ensure images have fallback src so they render even before lazyload triggers
html = html.replace(/<img([^>]+)data-original=["']([^"']+)["']([^>]*)>/gi, (match, p1, original, p2) => {
  if (!match.includes('src=') || match.includes('src=""')) {
    return `<img${p1}src="${original}" data-original="${original}"${p2}>`;
  }
  return match;
});

// 6. Write final index.html
fs.writeFileSync(outputPath, html, 'utf8');
console.log('Successfully written index.html. Final length:', html.length);
