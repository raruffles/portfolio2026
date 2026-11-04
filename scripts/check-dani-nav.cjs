const fs = require('fs');
const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/source.html', 'utf8');

const navIdx = html.indexOf('<nav');
if (navIdx > -1) {
  console.log(html.slice(navIdx - 100, navIdx + 1200));
}
