const fs = require('fs');

const tp = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/turbopack-0kroxf~4lmog9.js', 'utf8');

const matches = tp.match(/.{0,50}\/_next\/.{0,50}/g);
console.log('Matches in turbopack:\n', matches);

const c10 = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/10u3y4bw1ayzs.js', 'utf8');
const matches10 = c10.match(/.{0,50}\/_next\/.{0,50}/g);
console.log('Matches in 10u3:\n', matches10);
