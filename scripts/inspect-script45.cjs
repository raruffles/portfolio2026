const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec632254742"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next !== -1 ? next : start + 5000);
console.log(block);
