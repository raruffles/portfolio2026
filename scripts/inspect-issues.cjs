const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

console.log('HTML total length:', html.length);

// 1. Search for revealSpans or heavy scripts
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts:', scripts.length);
scripts.forEach((s, i) => {
  if (s.includes('revealSpans') || s.includes('getBoundingClientRect') || s.includes('scroll') || s.includes('split')) {
    console.log(`Script #${i} (length ${s.length}):`);
    console.log(s.slice(0, 500));
    console.log('...\n-------------------------');
  }
});

// 2. Search for "the brand" or "qualidade" or "definição" in html
const matches = [];
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('the brand') || line.includes('qualidade') || line.includes('definição') || line.includes('behind') || line.includes('noses') || line.includes('closed doors')) {
    matches.push({ line: idx + 1, text: line.trim().slice(0, 150) });
  }
});
console.log('Matches for broken hero phrases:', matches);
