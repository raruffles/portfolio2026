const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const idx = html.indexOf('Seriedade e excelência');
console.log(html.substring(idx - 600, idx + 400));
