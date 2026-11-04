const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
const endPos = html.indexOf('<!-- /T396 -->', pos);
const chunk = html.substring(pos, endPos);

const regex = /data-elem-id="([^"]+)"[\s\S]*?(?:<div class="tn-atom[^>]*>([\s\S]*?)<\/div>)/g;
let m;
while ((m = regex.exec(chunk)) !== null) {
  const id = m[1];
  const inner = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`Elem ID: ${id} | Preview: ${inner.substring(0, 80)}`);
}
