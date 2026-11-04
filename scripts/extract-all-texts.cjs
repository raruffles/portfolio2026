const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// Find all tn-atom text contents
const regex = /<div class=['"][^'"]*tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/g;
let m;
const textBlocks = [];
let i = 0;
while ((m = regex.exec(html)) !== null) {
  let text = m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 10 && !text.includes('function') && !text.includes('var ') && !text.includes('{') && !text.includes('t_')) {
    textBlocks.push({ index: i++, raw: m[1], text });
  }
}

console.log(`Found ${textBlocks.length} text blocks.`);
textBlocks.forEach(t => {
  console.log(`[${t.index}] ${t.text.substring(0, 100)}`);
});

fs.writeFileSync('scripts/all-extracted-texts.json', JSON.stringify(textBlocks, null, 2), 'utf8');
