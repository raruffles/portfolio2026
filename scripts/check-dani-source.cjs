const fs = require('fs');
const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/source.html', 'utf8');

console.log('source.html length:', html.length);
console.log('Starts with:\n', html.slice(0, 500));
console.log('Ends with:\n', html.slice(-500));
