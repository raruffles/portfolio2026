const fs = require('fs');
const html = fs.readFileSync('clones/clinique7/index.html', 'utf8');

const regex = /<style[^>]*>([\s\S]*?rec630539366[\s\S]*?)<\/style>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Match length:', m[1].length);
  // let's print lines matching rec630539366
  const lines = m[1].split('\n').filter(l => l.includes('rec630539366'));
  console.log(lines.join('\n'));
}
