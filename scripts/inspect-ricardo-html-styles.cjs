const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

console.log('HTML size:', html.length);
// Check head style tags
const styleMatches = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
console.log('Style tags in head:', styleMatches.length);
styleMatches.forEach((s, i) => console.log(`Style tag ${i+1} (${s.length} chars)`));
