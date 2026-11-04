const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec630419934"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);
const matches = block.match(/assets\/[^\s"'()]+/g) || [];
console.log('Assets in hero:', [...new Set(matches)]);
