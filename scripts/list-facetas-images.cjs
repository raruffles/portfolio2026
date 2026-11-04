const fs = require('fs');
const html = fs.readFileSync('scripts/facetasdental-ref/source.html', 'utf8');

const imgs = [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('All facetas images:\n', imgs.join('\n'));
