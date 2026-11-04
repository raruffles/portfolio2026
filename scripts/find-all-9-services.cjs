const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const matches = [...html.matchAll(/<div class="service-card__title w-richtext">([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('9 Services titles:\n', matches);
