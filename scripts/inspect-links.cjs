const fs = require('fs');
const html = fs.readFileSync('clones/nova-dental/source.html', 'utf8');

const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
console.log('All links:\n', links.join('\n'));
