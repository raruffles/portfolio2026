const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const footerIdx = html.indexOf('<footer');
console.log('Footer snippet:\n', html.slice(footerIdx, footerIdx + 3000));
