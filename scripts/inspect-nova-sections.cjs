const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

// Find all section tags or main elements
const sections = [...html.matchAll(/<(?:section|header|footer|main|nav)\b[^>]*class=["']([^"']+)["'][^>]*>/gi)].map(m => m[0]);
console.log('Sections:\n', sections.join('\n'));
