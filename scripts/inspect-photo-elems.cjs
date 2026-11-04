const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630435465"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const ids = ['1692620175865', '1692620175871'];
ids.forEach(id => {
  const reg = new RegExp(`data-elem-id=['"]${id}['"][^>]*>[\\s\\S]*?<\\/div>`, 'i');
  const m = block.match(reg);
  console.log(`ID ${id}:`, m ? m[0].slice(0, 300) : 'not found');
});
