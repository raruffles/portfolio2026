const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const tildaMatches = html.match(/https?:\/\/[^\s"'<>]*(?:tildacdn|boomstream)[^\s"'<>]*/gi) || [];
console.log('Remaining remote tilda / boomstream URLs in index.html:', tildaMatches.length);

if (tildaMatches.length > 0) {
  const sample = [...new Set(tildaMatches)];
  console.log('Sample of remaining URLs:', sample.slice(0, 15));
}
