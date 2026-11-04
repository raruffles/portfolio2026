const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const idx = html.indexOf('Aesthetic');
console.log('Index of Aesthetic:', idx);
if (idx !== -1) {
  console.log('Surrounding HTML:\n', html.slice(idx - 100, idx + 200));
}
