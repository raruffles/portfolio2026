const fs = require('fs');
const path = require('path');

const dir = 'clones/estetica-e-beleza/dr.ricardo-andrade';
const files = fs.readdirSync(dir);

console.log('Files in', dir, ':');
files.forEach(f => {
  const p = path.join(dir, f);
  console.log(f, fs.statSync(p).size, 'bytes');
});
