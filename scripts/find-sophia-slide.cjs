const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const idx = html.indexOf('Sophia');
console.log('Sophia slide:\n', html.slice(idx - 600, idx + 100));
