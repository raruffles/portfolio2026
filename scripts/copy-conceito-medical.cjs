const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'conceito-saude', 'assets');
const destDir = path.join(__dirname, '..', 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'assets');

const files = fs.readdirSync(srcDir).filter(f => f.startsWith('conceito-'));
files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  console.log(`Copied ${f}`);
});
