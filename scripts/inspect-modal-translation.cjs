const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const modal = html.match(/<div class="booking-modal"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*<\/div>/i);
if (modal) {
  console.log('Modal text preview:\n', modal[0].slice(0, 1000));
}
