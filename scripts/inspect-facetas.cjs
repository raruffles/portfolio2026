const fs = require('fs');
const html = fs.readFileSync('scripts/facetasdental-ref/source.html', 'utf8');

const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
console.log('FacetasDental links:\n', links.join('\n'));

const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(m => m[0]);
console.log('FacetasDental scripts:\n', scripts.join('\n'));

const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
console.log('FacetasDental imgs count:', imgs.length);
console.log('Sample imgs:\n', imgs.slice(0, 10).join('\n'));
