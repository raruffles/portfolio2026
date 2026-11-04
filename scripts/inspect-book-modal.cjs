const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const bookModal = html.match(/<div[^>]*class=["'][^"']*book[^"']*["'][\s\S]*?<\/form>/i);
if (bookModal) {
  console.log('Book modal found:', bookModal[0].slice(0, 800));
} else {
  // search for form
  const forms = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)].map(m => m[0]);
  console.log('Forms found:', forms.length);
  if (forms.length > 0) console.log(forms[0].slice(0, 800));
}
