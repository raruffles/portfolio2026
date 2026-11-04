const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, i) => {
  console.log(`Script ${i}:`, s[0].slice(0, 150));
  if (s[1].trim().length > 0) {
    console.log(`Body ${i} preview:`, s[1].trim().slice(0, 300));
  }
});
