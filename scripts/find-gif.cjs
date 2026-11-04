const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const query = 'ezgifcom-gif-maker_1.gif';
let pos = 0;
while ((pos = html.indexOf(query, pos)) !== -1) {
  const lineNum = html.substring(0, pos).split('\n').length;
  console.log(`Found ${query} at line ${lineNum}:`);
  console.log(html.substring(Math.max(0, pos - 150), Math.min(html.length, pos + 150)));
  pos += query.length;
}
