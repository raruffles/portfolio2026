const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const whyUsSection = html.slice(html.indexOf('data-why-us=""'), html.indexOf('</section>', html.indexOf('data-why-us=""')));
console.log('Why Us section snippet:\n', whyUsSection.slice(0, 2000));
