const fs = require('fs');
const texts = JSON.parse(fs.readFileSync('scripts/all-extracted-texts.json', 'utf8'));

console.log('Texts 30-93:');
texts.slice(30).forEach(t => {
  console.log(`[${t.index}] ${t.text}`);
});
