const fs = require('fs');
const path = require('path');

const dir = 'clones/odontologia/dra-fabiana-borges';
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Find all img tags and what they point to
const imgs = [];
const regex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  imgs.push({ src: match[1], alt: match[2], full: match[0] });
}

console.log(`Total images found: ${imgs.length}`);
imgs.slice(0, 20).forEach((img, i) => {
  console.log(`${i + 1}: ${img.src} | alt: "${img.alt}"`);
});

// Specifically check for team or about or hero image
const teamImgs = imgs.filter(i => i.src.includes('team') || i.alt.toLowerCase().includes('fabiana') || i.alt.toLowerCase().includes('adrieli'));
console.log('\nDoctor/Team images:');
console.dir(teamImgs);
