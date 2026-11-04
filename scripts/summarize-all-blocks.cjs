const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /<div\s+id="(rec\d+)"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const id = m[1];
  const blockIdx = m.index;
  const nextDiv = html.indexOf('id="rec', blockIdx + 10);
  const endIdx = nextDiv !== -1 ? nextDiv : blockIdx + 10000;
  const blockSnippet = html.substring(blockIdx, endIdx);
  // find any text inside paragraph, headers, or atom
  const textMatches = [...blockSnippet.matchAll(/>([^<]{4,80})</g)]
    .map(x => x[1].trim())
    .filter(t => t.length > 5 && !t.includes('{') && !t.includes('function') && !t.includes('var ') && !t.includes('window.') && !t.includes('t_'));
  const uniqueTexts = Array.from(new Set(textMatches)).slice(0, 4);
  console.log(`[${id}] -> ${uniqueTexts.join(' | ')}`);
}
