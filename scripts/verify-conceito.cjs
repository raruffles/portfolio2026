const fs = require('fs');
const h = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const checks = [
  '<h1',
  'data-hero="cta-text"',
  'data-hero="cta-btn"',
  'data-about="title"',
  'data-about="text"',
  'data-services="title"',
  'data-services="subtitle"',
  'data-why-us="title"',
  'data-why-us="subtitle"',
  'data-testimonials="title"',
  'data-cta="title"',
  'data-cta="text"'
];

checks.forEach(c => {
  const i = h.lastIndexOf(c);
  if (i > -1) {
    const raw = h.slice(i, i + 350).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`[HTML ELEM] ${c} -> ${raw}\n`);
  }
});
