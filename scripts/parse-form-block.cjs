const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630539366"');
const end = html.indexOf('<!-- /T396 -->', start);
const block = html.substring(start, end);

const regex = /<div\s+class="[^"]*tn-elem[^"]*"[^>]*data-elem-id="([^"]+)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
while ((m = regex.exec(block)) !== null) {
  const id = m[1];
  const inner = m[2];
  const tagType = inner.includes('<img') ? 'IMG' : (inner.includes('<form') ? 'FORM' : (inner.includes('<textarea') ? 'FORM-CONTAINER' : 'TEXT/DIV'));
  const sample = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 50);
  console.log(`ID: ${id} | Type: ${tagType} | Content: ${sample}`);
}
