const fs = require('fs');
const h = fs.readFileSync('clones/odontologia/dra-fabiana-borges/index.html', 'utf8');

const idx = h.indexOf('intro__media-img');
if (idx > -1) {
  console.log(h.slice(idx - 150, idx + 450));
}
