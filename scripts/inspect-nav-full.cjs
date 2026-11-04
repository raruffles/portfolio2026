const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const navStart = html.indexOf('id="rec638094189"');
const navEnd = html.indexOf('<div id="rec', navStart + 1);
const navBlock = html.substring(navStart, navEnd);

console.log(navBlock);
