const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630435465"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

const ids = ['1692620175875', '1692620175878', '1692620175880', '1692620175861'];

ids.forEach(id => {
  console.log(`\n=================== ID ${id} ===================`);
  const regex = new RegExp(`(#rec630435465 [^{]*${id}[^{]*\\{[^}]*\\})`, 'g');
  let m;
  while ((m = regex.exec(block)) !== null) {
    console.log(m[1]);
  }
});
