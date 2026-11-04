const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const idx = html.indexOf('Sophia');
console.log('Index of Sophia:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 150, idx + 250));
}
