const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630539366"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const pos = block.indexOf('tn-atom__inputs-textarea');
if (pos !== -1) {
  console.log(block.substring(Math.max(0, pos - 200), Math.min(block.length, pos + 2500)));
}
