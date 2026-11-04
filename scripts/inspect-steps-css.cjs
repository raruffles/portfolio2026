const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const elems = ['1692638917591', '1692638917565', '1692638917542', '1692638917520', '1692638917487'];

elems.forEach(id => {
  const regex = new RegExp(`#rec630580488\\s+\\.tn-elem\\[data-elem-id="${id}"\\]\\s*\\{[^}]*\\}`, 'g');
  const matches = html.match(regex);
  console.log(`Elem ${id}:`, matches);
});
