const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// Read the extracted texts JSON
const texts = JSON.parse(fs.readFileSync('scripts/all-extracted-texts.json', 'utf8'));

console.log('Sample texts to humanize:');
texts.slice(0, 30).forEach((t, i) => {
  console.log(`--- [${t.index}] ---`);
  console.log('Text:', t.text);
});
