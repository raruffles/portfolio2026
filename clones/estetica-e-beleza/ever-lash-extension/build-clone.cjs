const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const sourceHtmlRaw = fs.readFileSync(path.join(baseDir, 'source.html'), 'utf8');
let html = JSON.parse(sourceHtmlRaw);

// 1. Load image map
const imageMap = JSON.parse(fs.readFileSync(path.join(baseDir, 'image-map.json'), 'utf8'));

// Add any missing image mappings
imageMap['https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg'] = 'assets/images/custom-checkbox-checkmark.svg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f28d1d69b4c6d58d1cd25e_chevron-down.svg'] = 'assets/images/chevron-down.svg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f28d1d69b4c6d58d1cd25d_chevron-down-white.svg'] = 'assets/images/chevron-down-white.svg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/6840889092a65794c132a637_search-icon-white.svg'] = 'assets/images/search-icon-white.svg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68e8de998f5eb7f2f4d4020f_logogram%20EVER%20(1)_32%20x%2032%20px%20brown.jpg'] = 'assets/images/favicon-32.jpg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68e8dea82f23eec5eb4c0a24_logogram%20EVER%20(1)_256%20x%20256%20px%20brown.jpg'] = 'assets/images/favicon-256.jpg';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f62e0d2deb47850ed1ec45_Up%20Right.json'] = 'assets/up-right.json';
imageMap['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/686f86f98cfd7b3f4091f97c_ever-logo.json'] = 'assets/ever-logo.json';

// Replace image URLs in HTML
for (const [remoteUrl, localPath] of Object.entries(imageMap)) {
  html = html.split(remoteUrl).join(localPath);
  const encoded = encodeURI(remoteUrl);
  if (encoded !== remoteUrl) {
    html = html.split(encoded).join(localPath);
  }
}

// 2. Patch CSS file for local fonts and assets
const cssPath = path.join(baseDir, 'assets', 'ever-april.webflow.shared.css');
let css = fs.readFileSync(cssPath, 'utf8');

const fontReplacements = [
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b25bbe52d7a0de1262_Maax-Light.ttf', 'fonts/Maax-Light.ttf'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b3ca772d10c7e877dc_Maax.otf', 'fonts/Maax.otf'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8bb90c68aa2f629c077_Maax-Medium.otf', 'fonts/Maax-Medium.otf'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b26e91cb7c99f35f75_BradfordLL-Medium.otf', 'fonts/BradfordLL-Medium.otf'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b32d31c88ef57d34f6_Maax-Bold.otf', 'fonts/Maax-Bold.otf'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67fc9d3fdadd41892ec65066_texture-paper.avif', 'images/67fc9d3fdadd41892ec65066_texture-paper.avif'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68039b9c0f8de0d527dfe942_pexel%20.avif', 'images/68039b9c0f8de0d527dfe942_pexel_.avif'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f28d1d69b4c6d58d1cd25e_chevron-down.svg', 'images/chevron-down.svg'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f28d1d69b4c6d58d1cd25d_chevron-down-white.svg', 'images/chevron-down-white.svg'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/6840889092a65794c132a637_search-icon-white.svg', 'images/search-icon-white.svg'],
  ['https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg', 'images/custom-checkbox-checkmark.svg']
];

for (const [from, to] of fontReplacements) {
  css = css.split(from).join(to);
}
fs.writeFileSync(cssPath, css);

// 3. Replace CSS link in HTML
html = html.replace(
  /https:\/\/cdn\.prod\.website-files\.com\/67f28d1d69b4c6d58d1cd1da\/css\/ever-april\.webflow\.shared\.[a-z0-9]+\.css/g,
  'assets/ever-april.webflow.shared.css'
);
html = html.replace(
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'assets/swiper-bundle.min.css'
);

// Strip SRI integrity and crossorigin attributes
html = html.replace(/\s+integrity="[^"]*"/gi, '');
html = html.replace(/\s+crossorigin="[^"]*"/gi, '');

// 4. Safely filter out only third-party tracking scripts without affecting HTML structure
const scriptRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?<\/script>/gi;
html = html.replace(scriptRegex, (match) => {
  if (
    match.includes('googletagmanager.com') ||
    match.includes('gtm.js') ||
    match.includes('connect.facebook.net') ||
    match.includes('fbevents.js') ||
    match.includes('fbq(')
  ) {
    return '<!-- tracking script removed -->';
  }
  return match;
});

// Remove noscript tracking pixels
const noscriptRegex = /<noscript\b[^>]*>(?:(?!<\/noscript>)[\s\S])*?<\/noscript>/gi;
html = html.replace(noscriptRegex, (match) => {
  if (match.includes('facebook') || match.includes('googletagmanager')) {
    return '<!-- tracking noscript removed -->';
  }
  return match;
});

// Point scripts to local assets
html = html.replace(
  /https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-[0-9\.]+\.min\.[a-z0-9]+\.js(\?site=[a-z0-9]+)?/gi,
  'assets/jquery-3.5.1.min.js'
);
html = html.replace(
  /https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@[0-9]+\/swiper-bundle\.min\.js/gi,
  'assets/swiper-bundle.min.js'
);
html = html.replace(
  /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/[0-9\.]+\/gsap\.min\.js/gi,
  'assets/gsap.min.js'
);
html = html.replace(
  /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/[0-9\.]+\/ScrollTrigger\.min\.js/gi,
  'assets/ScrollTrigger.min.js'
);
html = html.replace(
  /https:\/\/cdn\.jsdelivr\.net\/gh\/flowtricks\/scripts@v[0-9\.]+\/variables-color-scroll\.js/gi,
  'assets/variables-color-scroll.js'
);
html = html.replace(
  /https:\/\/cdn\.prod\.website-files\.com\/6330c0ebacf06abbc83b6eb3\/64103732523ba652052e0223_lenis-bundled\.txt/gi,
  'assets/lenis.js'
);

// Point Webflow bundles to local
html = html.replace(
  /https:\/\/cdn\.prod\.website-files\.com\/67f28d1d69b4c6d58d1cd1da\/js\/webflow\.schunk\.f2efb3c5440a81cf\.js/gi,
  'assets/webflow.chunk1.js'
);
html = html.replace(
  /https:\/\/cdn\.prod\.website-files\.com\/67f28d1d69b4c6d58d1cd1da\/js\/webflow\.schunk\.526e7e79ad011a41\.js/gi,
  'assets/webflow.chunk2.js'
);
html = html.replace(
  /https:\/\/cdn\.prod\.website-files\.com\/67f28d1d69b4c6d58d1cd1da\/js\/webflow\.[a-z0-9]+\.[a-z0-9]+\.js/gi,
  'assets/webflow.main.js'
);

// Ensure smooth reduced-motion compliance as required by project guidelines
const customEnhancementCss = `
<style id="ever-clone-enhancements">
  /* Reduced motion compliance */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Font faces local fallback safety */
  @font-face {
    font-family: 'Maax';
    src: url('assets/fonts/Maax-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Maax';
    src: url('assets/fonts/Maax.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Maax';
    src: url('assets/fonts/Maax-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Maax';
    src: url('assets/fonts/Maax-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Bradfordll';
    src: url('assets/fonts/BradfordLL-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  /* Interaction and tap target improvements */
  .button, .btn, a, button {
    touch-action: manipulation;
  }

  /* Ensure lash logo is clearly visible */
  .everlogo.lash {
    display: block !important;
  }
</style>
`;

if (html.includes('</head>')) {
  html = html.replace('</head>', `${customEnhancementCss}\n</head>`);
}

// Write the compiled index.html
fs.writeFileSync(path.join(baseDir, 'index.html'), html, 'utf8');
console.log('Successfully generated complete index.html! File length:', html.length);
