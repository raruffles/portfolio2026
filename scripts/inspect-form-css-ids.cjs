const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /#rec630539366\s+\.tn-elem\[data-elem-id="([^"]+)"\]/g;
const ids = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  ids.add(match[1]);
}
console.log('Found elem IDs in CSS for rec630539366:', Array.from(ids));
