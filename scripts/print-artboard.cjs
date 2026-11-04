const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
const endPos = html.indexOf('<!-- /T396 -->', pos);
const chunk = html.substring(pos, endPos);

const htmlStart = chunk.indexOf('<div class="t396__artboard');
console.log(chunk.substring(htmlStart, htmlStart + 1500));
