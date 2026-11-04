const fs = require('fs');
const html = fs.readFileSync('scripts/facetasdental-ref/source.html', 'utf8');

const bgMatches = [...html.matchAll(/url\((?:'|"|)?([^)'"]+)(?:'|"|)?\)/gi)].map(m => m[1]);
console.log('Facetas bg matches:', bgMatches);
