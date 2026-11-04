const fs = require('fs');
const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/source.html', 'utf8');

const b = html.match(/<button[\s\S]*?<\/button>/gi);
console.log('Buttons:', b);
