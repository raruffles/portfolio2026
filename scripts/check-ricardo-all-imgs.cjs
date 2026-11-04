const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const imgs = [];
const imgRegex = /<img[^>]+>/g;
let m;
while ((m = imgRegex.exec(html)) !== null) {
  const src = (m[0].match(/src=["']([^"']+)["']/) || [])[1];
  const alt = (m[0].match(/alt=["']([^"']*)["']/) || [])[1];
  const cls = (m[0].match(/class=["']([^"']*)["']/) || [])[1];
  imgs.push({ src, alt, cls });
}

console.log('Total img tags in Dr. Ricardo index.html:', imgs.length);
imgs.forEach((img, i) => {
  console.log(`${i+1}: src="${img.src}" | alt="${img.alt}"`);
});

// Also check background images
const bgMatches = html.match(/background(?:-image)?:\s*url\([^)]+\)/gi) || [];
console.log('Background images:', bgMatches);
