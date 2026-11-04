const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const pos = html.indexOf('id="rec630539366"');
const endPos = html.indexOf('<!-- /T396 -->', pos);
const chunk = html.substring(pos, endPos);

const htmlStart = chunk.indexOf('<div class="t396__artboard');
const artboardHtml = chunk.substring(htmlStart);

const regex = /<div class=['"]t396__elem tn-elem[^'"]*['"]\s+data-elem-id=['"]([^'"]+)['"]\s+data-elem-type=['"]([^'"]+)['"]/g;
let m;
while ((m = regex.exec(artboardHtml)) !== null) {
  const elemId = m[1];
  const type = m[2];
  // find the content inside tn-atom
  const elemSub = artboardHtml.substring(m.index, m.index + 1200);
  const atomMatch = elemSub.match(/<div class=['"]tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/);
  const content = atomMatch ? atomMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 60) : '';
  console.log(`Elem: ${elemId} | Type: ${type} | Text: ${content}`);
}
