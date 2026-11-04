const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const titles = [...html.matchAll(/<div class="service-card__title">([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('Service titles found:\n', titles);
