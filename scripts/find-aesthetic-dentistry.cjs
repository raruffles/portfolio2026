const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const idx = html.indexOf('Aesthetic_dentistry_min');
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 600));
} else {
  console.log('Not found');
}
