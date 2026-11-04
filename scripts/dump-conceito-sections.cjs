const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const markers = [
  'hero__title',
  'hero__subtitle',
  'hero__cta',
  'about__caption',
  'about__mission',
  'about__text',
  'services__caption',
  'services__title',
  'why-us__caption',
  'why-us__title',
  'cta__title',
  'cta__subtitle',
  'footer__tagline',
];

markers.forEach(marker => {
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.log(`\n=== ${marker} === NOT FOUND`);
    return;
  }
  // Go back to find opening tag
  const start = Math.max(0, idx - 50);
  const snippet = html.slice(start, idx + 500);
  console.log(`\n=== ${marker} ===`);
  console.log(snippet);
  console.log('---END---');
});
