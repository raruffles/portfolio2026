const fs = require('fs');

const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const regex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*>/gi;
let m;
const imgs = [];
while ((m = regex.exec(html)) !== null) {
  imgs.push({ src: m[1], alt: m[2], full: m[0] });
}

console.log('Total images in dr.ricardo-andrade:', imgs.length);
imgs.forEach((img, i) => {
  console.log(`${i + 1}: ${img.src} | alt: "${img.alt}"`);
});
