const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const lastScriptIdx = html.lastIndexOf('<script');
console.log('Last script:\n', html.slice(lastScriptIdx));
