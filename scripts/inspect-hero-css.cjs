const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec630419934"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const ids = ['1692618174824', '1692618174828', '1692618174831', '1692618174841', '1692618174845', '1692618174847'];

ids.forEach(id => {
  const reg = new RegExp(`(#rec630419934 \\.tn-elem\\[data-elem-id="${id}"\\][^{]*\\{[^}]*\\})`, 'g');
  const matches = block.match(reg);
  console.log(`\n=== ID ${id} ===`);
  if (matches) {
    matches.forEach(m => console.log(m));
  }
});
