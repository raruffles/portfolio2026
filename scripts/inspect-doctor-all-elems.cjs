const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630435465"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const elemRegex = /<div class=['"]t396__elem tn-elem ([^'"]*)['"][^>]*data-elem-id=['"]([^'"]*)['"][^>]*data-elem-type=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
let match;
while ((match = elemRegex.exec(block)) !== null) {
  const [full, cls, elemId, elemType, inner] = match;
  console.log(`Elem [${elemId}] type=${elemType}`);
  console.log('   Preview:', inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100));
}
