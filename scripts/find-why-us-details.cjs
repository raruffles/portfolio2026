const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const whyUsSection = html.slice(html.indexOf('data-why-us=""'), html.indexOf('</section>', html.indexOf('data-why-us=""')));
const cardHeadings = [...whyUsSection.matchAll(/<div class="why-us-card__heading">([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('Why Us card headings:\n', cardHeadings);

const cardLabels = [...whyUsSection.matchAll(/<div[^>]*class="why-us-card__label"><p[^>]*>([\s\S]*?)<\/p><\/div>/gi)].map(m => m[1].trim());
console.log('Why Us card labels:\n', cardLabels);
