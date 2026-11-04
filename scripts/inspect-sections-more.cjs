const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

function extractBlock(startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return 'NOT FOUND: ' + startTag;
  const end = html.indexOf(endTag, start);
  if (end === -1) return 'END NOT FOUND FOR: ' + startTag;
  return html.slice(start, end + endTag.length);
}

console.log('--- SERVICES SNIPPET ---');
console.log(extractBlock('<section data-services=""', '</section>').slice(0, 1500));

console.log('--- WHY US SNIPPET ---');
console.log(extractBlock('<section data-why-us=""', '</section>').slice(0, 1500));

console.log('--- TESTIMONIALS SNIPPET ---');
console.log(extractBlock('<section data-testimonials=""', '</section>').slice(0, 1500));

console.log('--- TEAM SNIPPET ---');
console.log(extractBlock('<section data-team=""', '</section>').slice(0, 1500));

console.log('--- CTA SNIPPET ---');
console.log(extractBlock('<section data-cta=""', '</section>').slice(0, 1200));

console.log('--- FOOTER SNIPPET ---');
console.log(extractBlock('<footer class="footer">', '</footer>').slice(0, 1500));
