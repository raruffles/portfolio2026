const fs = require('fs');
const list = JSON.parse(fs.readFileSync('clones/dr-ricardo/ricardo-image-list.json', 'utf8'));
console.log('Total images found on official site:', list.length);
list.forEach((img, i) => {
  console.log(`[${i}] ${img}`);
});
