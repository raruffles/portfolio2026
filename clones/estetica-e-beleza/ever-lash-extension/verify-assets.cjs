const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cdnMatches = [...html.matchAll(/(https:\/\/[^"'`\s>]+(?:\.avif|\.jpg|\.png|\.webp|\.otf|\.ttf|\.woff2|\.js|\.css))/gi)].map(m => m[1]);
console.log('Remaining external asset URLs count:', cdnMatches.length);
if (cdnMatches.length > 0) {
  console.log('Unique remaining:', Array.from(new Set(cdnMatches)));
}
