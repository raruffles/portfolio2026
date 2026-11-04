const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const m = html.match(/<div[^>]+id="contato"[^>]*>[\s\S]{1,1500}/i) || html.match(/Seriedade e excelência[\s\S]{1,1500}/i);
if (m) {
  console.log(m[0].substring(0, 1000));
}
