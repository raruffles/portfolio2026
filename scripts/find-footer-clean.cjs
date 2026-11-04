const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const footerIdx = html.indexOf('Excelência e naturalidade');
console.log('Footer links snippet:\n', html.slice(footerIdx, footerIdx + 2000));
