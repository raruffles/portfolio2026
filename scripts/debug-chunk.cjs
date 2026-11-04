const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
const endPos = html.indexOf('<!-- /T396 -->', pos);
const chunk = html.substring(pos, endPos);
console.log('Chunk length:', chunk.length);

const elemMatches = chunk.match(/data-elem-id="[^"]+"/g);
console.log('Elem matches:', elemMatches);
