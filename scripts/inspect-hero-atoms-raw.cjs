const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630419934"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const ids = ['1692618174824', '1692618174828', '1692618174831', '1692618174841', '1692618174845', '1692618174847'];

ids.forEach(id => {
  const reg = new RegExp(`<div class=['"][^'"]*tn-elem__630419934${id}[^'"]*['"][^>]*>[\\s\\S]*?<\\/div>\\s*<\\/div>`, 'g');
  const m = block.match(reg);
  if (m) {
    console.log(`=== Elem ${id} ===`);
    console.log(m[0]);
  }
});
