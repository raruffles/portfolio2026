const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const footerIdx = html.indexOf('Excellence in every smile');
console.log('Footer links snippet:\n', html.slice(footerIdx, footerIdx + 2000));
