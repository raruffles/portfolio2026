const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const modalStart = html.indexOf('class="booking-modal');
if (modalStart !== -1) {
  console.log('Modal snippet:\n', html.slice(modalStart, modalStart + 2500));
}
