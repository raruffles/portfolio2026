const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');
const start = html.indexOf('id="rec638094695"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);
console.log(block);
