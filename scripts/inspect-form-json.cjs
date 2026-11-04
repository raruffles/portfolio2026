const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /<textarea class="tn-atom__inputs-textarea">([\s\S]*?)<\/textarea>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  console.log(`\n=== FORM [${i++}] ===`);
  try {
    const json = JSON.parse(m[1]);
    console.log(JSON.stringify(json, null, 2));
  } catch(e) {
    console.log('Raw:', m[1]);
  }
}
