const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const testSection = html.slice(html.indexOf('data-testimonials=""'), html.indexOf('</section>', html.indexOf('data-testimonials=""')));
const quotes = [...testSection.matchAll(/<p[^>]*class="[^"]*testimonials-card__quote[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].trim());
console.log('Quotes:\n', quotes);

const authors = [...testSection.matchAll(/<div data-testimonials="author-name"[^>]*>([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('Authors:\n', authors);

const jobs = [...testSection.matchAll(/<div data-testimonials="author-job"[^>]*>([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('Jobs:\n', jobs);
