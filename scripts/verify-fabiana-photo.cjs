const fs = require('fs');

const h1 = fs.readFileSync('clones/odontologia/dra-fabiana-borges/index.html', 'utf8');
const h2 = fs.readFileSync('previas/dra-fabiana-borges/index.html', 'utf8');

console.log('In clones/dra-fabiana-borges:', h1.includes('dra-fabiana-borges.png'));
console.log('In previas/dra-fabiana-borges:', h2.includes('dra-fabiana-borges.png'));

// Check exact tag in clones
const m1 = h1.match(/<img[^>]+dra-fabiana-borges\.png[^>]*>/);
console.log('Tag in clone:', m1 ? m1[0] : 'Not found');

// Check exact tag in previas
const m2 = h2.match(/<img[^>]+dra-fabiana-borges\.png[^>]*>/);
console.log('Tag in previa:', m2 ? m2[0] : 'Not found');
