const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630419934"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const imgRegex = /(?:src|data-original|background-image:\s*url\()=['"]?([^'"\)\s>]+)/gi;
let match;
while ((match = imgRegex.exec(block)) !== null) {
  console.log('Hero image:', match[1]);
}
