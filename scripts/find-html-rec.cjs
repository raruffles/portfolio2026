const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
console.log('Pos of HTML rec630539366:', pos);
console.log(html.substring(pos, pos + 800));
