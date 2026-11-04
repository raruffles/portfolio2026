const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const testSection = html.slice(html.indexOf('data-testimonials=""'), html.indexOf('</section>', html.indexOf('data-testimonials=""')));
const authors = [...testSection.matchAll(/<div class="testimonials-card__author-name"><div class="text-b2--medium">([\s\S]*?)<\/div><\/div>/gi)].map(m => m[1].trim());
console.log('Testimonials authors:\n', authors);

const jobs = [...testSection.matchAll(/<div class="testimonials-card__bottom">[\s\S]*?<div class="text-caption">([\s\S]*?)<\/div><\/div>/gi)].map(m => m[1].trim());
console.log('Testimonials jobs:\n', jobs);
