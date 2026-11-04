const fs = require('fs');
const path = require('path');

const dir = 'clones/estetica-e-beleza/dr.ricardo-andrade';
const files = fs.readdirSync(dir);

files.forEach(f => {
  const full = path.join(dir, f);
  const stat = fs.statSync(full);
  console.log(`${f}: ${stat.size} bytes`);
});
