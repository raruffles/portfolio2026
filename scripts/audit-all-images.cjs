const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const imgRegex = /(?:src|data-original|background-image:\s*url\()=['"]?([^'"\)\s>]+)/gi;
let match;
const found = new Set();
while ((match = imgRegex.exec(html)) !== null) {
  const url = match[1];
  if (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg') || url.includes('.webp') || url.includes('.gif') || url.includes('.svg')) {
    found.add(url);
  }
}

console.log('Total unique images in index.html:', found.size);
Array.from(found).sort().forEach(img => {
  console.log(img);
});
