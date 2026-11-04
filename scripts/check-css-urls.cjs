const fs = require('fs');
const css = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/07p.y134brcee.css', 'utf8');

console.log('CSS length:', css.length);
const urls = css.match(/url\([^)]+\)/g);
console.log('URLs in CSS:', urls);
