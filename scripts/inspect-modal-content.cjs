const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const start = html.indexOf('<div data-booking-modal=""');
const end = html.indexOf('</form>', start);
console.log(html.slice(start, end + 7).slice(0, 2000));
