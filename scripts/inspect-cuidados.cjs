const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('Cuidados Além da');
console.log(html.substring(start - 80, start + 120));
