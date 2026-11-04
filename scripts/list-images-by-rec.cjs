const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /<div id="(rec\d+)"[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const recId = match[1];
  const start = match.index;
  const next = html.indexOf('<div id="rec', start + 1);
  const block = html.substring(start, next !== -1 ? next : start + 30000);
  const assets = block.match(/assets\/[^\s"'()]+/g) || [];
  if (assets.length > 0) {
    console.log(`[${recId}]:`, [...new Set(assets)]);
  }
}
