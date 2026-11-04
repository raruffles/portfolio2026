const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /<div\s+id="(rec\d+)"[^>]*class="([^"]*)"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const id = m[1];
  const cls = m[2];
  // find first heading or some text in this block
  const blockIdx = m.index;
  const blockSnippet = html.substring(blockIdx, blockIdx + 4000);
  const textMatches = blockSnippet.match(/<div[^>]*class="[^"]*tn-atom[^"]*"[^>]*>([\s\S]*?)<\/div>/g) || [];
  const texts = textMatches.slice(0, 3).map(t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
  console.log(`${id} | Text: ${texts.join(' // ')}`);
}
