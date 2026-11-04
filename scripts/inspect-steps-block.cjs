const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630580488"');
const end = html.indexOf('<!-- /T396 -->', start);
const block = html.substring(start, end);

const regex = /<div class=['"]t396__elem tn-elem[^'"]*['"]\s+data-elem-id=['"]([^'"]+)['"][\s\S]*?<div class=['"]tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/g;
let m;
while ((m = regex.exec(block)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 0) {
    console.log(`[Elem ${m[1]}] -> "${text}"`);
  }
}
