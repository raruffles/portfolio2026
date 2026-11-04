const fs = require('fs');

const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/rendered.html', 'utf8');

const heroIdx = html.indexOf('class="hero-content"');
console.log(html.slice(heroIdx, heroIdx + 1200));
