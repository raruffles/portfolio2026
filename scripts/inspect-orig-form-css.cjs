const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const regex = /@media[^{]+\{(?:[^{}]*\{[^{}]*\})*#rec630539366[\s\S]*?\n\}/g;
// or let's search for rec630539366 in all @media blocks
const allBlocks = html.match(/@media[^{]+\{[\s\S]*?rec630539366[\s\S]*?\n\}/g);
if (allBlocks) {
  allBlocks.forEach(b => {
    // only print lines mentioning rec630539366
    console.log('--- MEDIA BLOCK ---');
    console.log(b.substring(0, 150));
  });
}

// Also let's extract all CSS rules mentioning rec630539366
const cssChunk = html.match(/<style[^>]*>[\s\S]*?#rec630539366[\s\S]*?<\/style>/g);
if (cssChunk) {
  console.log('Found style chunks:', cssChunk.length);
  fs.writeFileSync('scripts/rec630539366-orig-css.txt', cssChunk.join('\n'));
}
