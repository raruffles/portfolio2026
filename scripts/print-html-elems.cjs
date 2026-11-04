const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
const endPos = html.indexOf('<!-- /T396 -->', pos);
const chunk = html.substring(pos, endPos);

const htmlStart = chunk.indexOf('<div class="t396__artboard');
const htmlSection = chunk.substring(htmlStart);

const regex = /<div\s+class="t396__elem[^"]*"[^>]*data-elem-id="([^"]+)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
while ((m = regex.exec(htmlSection)) !== null) {
  const id = m[1];
  const inner = m[2];
  console.log(`Elem: ${id}`);
  console.log(inner.substring(0, 150));
  console.log('---');
}
