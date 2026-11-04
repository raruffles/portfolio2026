const fs = require('fs');

const c = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/0tuze1pbf5c31.js', 'utf8');

const matches = c.match(/.{0,50}\/images\/.{0,50}/g);
console.log('Matches in 0tu:\n', matches);
