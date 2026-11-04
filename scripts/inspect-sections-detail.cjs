const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

function extractBlock(startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return 'NOT FOUND: ' + startTag;
  const end = html.indexOf(endTag, start);
  if (end === -1) return 'END NOT FOUND FOR: ' + startTag;
  return html.slice(start, end + endTag.length);
}

console.log('--- HEADER SNIPPET ---');
console.log(extractBlock('<header data-header=""', '</header>').slice(0, 1000));

console.log('--- HERO SNIPPET ---');
console.log(extractBlock('<section data-hero=""', '</section>').slice(0, 1500));

console.log('--- INTRO SNIPPET ---');
console.log(extractBlock('<section data-about=""', '</section>').slice(0, 1200));
