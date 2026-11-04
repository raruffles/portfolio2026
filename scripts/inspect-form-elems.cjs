const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const blockIndex = html.indexOf('id="rec630539366"');
const block = html.substring(blockIndex, blockIndex + 6000);

const elemRegex = /data-elem-id="([^"]+)"[\s\S]*?(?:<div class="tn-atom[^>]*>([\s\S]*?)<\/div>)/g;
let m;
while ((m = elemRegex.exec(block)) !== null) {
  const text = m[2] ? m[2].replace(/<[^>]+>/g, '').trim().substring(0, 60) : '[image/other]';
  console.log(`Elem: ${m[1]} -> ${text}`);
}
