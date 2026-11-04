const fs = require('fs');

const orig = fs.readFileSync('clones/arquitetura/decor-dani-melo/source.html', 'utf8');
const clone = fs.readFileSync('clones/arquitetura/decor-dani-melo/index.html', 'utf8');

console.log('Orig length:', orig.length);
console.log('Clone length:', clone.length);

// Compare all headings
function getHeadings(html) {
  const m = html.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
  return m.map(x => x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

const origH = getHeadings(orig);
const cloneH = getHeadings(clone);

console.log('\nOrig headings count:', origH.length);
console.log('Clone headings count:', cloneH.length);

origH.forEach((h, i) => {
  if (origH[i] !== cloneH[i]) {
    console.log(`Mismatch at heading ${i}: Orig="${origH[i]}" vs Clone="${cloneH[i]}"`);
  }
});

// Compare all sections
function getSections(html) {
  const m = html.match(/<(section|header|footer)[^>]*>/gi) || [];
  return m.map(x => x.replace(/\s+/g, ' '));
}

console.log('\nOrig sections:', getSections(orig));
console.log('Clone sections:', getSections(clone));
