const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /<div id="(rec\d+)"[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const recId = match[1];
  const start = match.index;
  const next = html.indexOf('<div id="rec', start + 1);
  const block = html.substring(start, next !== -1 ? next : start + 30000);
  
  console.log(`\n=================== ${recId} ===================`);
  const atomRegex = /<div class=['"][^'"]*tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/gi;
  let atomMatch;
  let count = 0;
  while ((atomMatch = atomRegex.exec(block)) !== null) {
    const text = atomMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) {
      console.log(`  [Atom ${count++}]: ${text.slice(0, 140)}`);
    }
  }
}
