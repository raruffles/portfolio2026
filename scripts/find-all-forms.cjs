const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

let pos = 0;
let count = 0;
while ((pos = html.indexOf('tn-atom__inputs-textarea', pos)) !== -1) {
  const start = html.lastIndexOf('<div id="rec', pos);
  const recId = html.substring(start, start + 30).match(/id="(rec\d+)"/);
  console.log(`[${count++}] in ${recId ? recId[1] : 'unknown'}:`);
  const textarea = html.substring(pos, html.indexOf('</textarea>', pos));
  console.log(textarea.slice(0, 300) + '...\n');
  pos += 24;
}
