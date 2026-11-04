const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec630576135"');
const end = html.indexOf('<!-- /T396 -->', start);
const block = html.substring(start, end);

const artboardStart = block.indexOf('<div class="t396__artboard');
console.log(block.substring(artboardStart));
