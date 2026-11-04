const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const navStart = html.indexOf('id="rec638094189"');
const navEnd = html.indexOf('<div id="rec', navStart + 1);
const navBlock = html.substring(navStart, navEnd);

console.log('=== NAVBAR rec638094189 ===');
const imgMatches = navBlock.match(/<img[^>]+>/gi) || [];
console.log('Images in nav:', imgMatches);

const atomMatches = navBlock.match(/<div class=['"][^'"]*tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/gi) || [];
atomMatches.forEach(a => console.log('Atom:', a.slice(0, 100)));
