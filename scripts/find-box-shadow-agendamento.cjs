const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const idx = html.indexOf(': 60px 40px; box-shadow');
console.log(html.substring(idx - 300, idx + 200));
