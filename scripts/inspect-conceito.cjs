const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const imgs = [];
const imgMatches = html.match(/<img[^>]+>/g) || [];
for (const tag of imgMatches) {
  const src = (tag.match(/src=["']([^"']+)["']/) || [])[1];
  const alt = (tag.match(/alt=["']([^"']*)["']/) || [])[1];
  const cls = (tag.match(/class=["']([^"']*)["']/) || [])[1];
  imgs.push({ src, alt, cls });
}

console.log('Total images in conceito-saude:', imgs.length);
console.log('Images:', JSON.stringify(imgs.slice(0, 20), null, 2));

// Check if dra-daynith.png is used
console.log('Has dra-daynith.png in index.html?:', html.includes('dra-daynith.png'));
// Check if dra-fabiana-borges or similar is used
console.log('Any dra- or doctor in index.html?:', html.match(/assets\/[^"'\s]+(dra|doutor|fabiana|medica|team)[^"'\s]*/gi));
