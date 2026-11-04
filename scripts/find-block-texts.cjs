const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec630576135"');
const end = html.indexOf('<!-- /T396 -->', start);
const block = html.substring(start, end);
const textMatches = [...block.matchAll(/>([^<]{2,50})</g)].map(m => m[1].trim()).filter(Boolean);
console.log('Texts in rec630576135:', Array.from(new Set(textMatches)));
