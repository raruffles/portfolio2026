const fs = require('fs');
const path = require('path');

function findImages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  try {
    const list = fs.readdirSync(dir);
    for (const f of list) {
      if (f.startsWith('.') || f === 'node_modules') continue;
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        findImages(full, results);
      } else if (/\.(jpe?g|png|webp|avif)$/i.test(f) && stat.size > 15000) {
        results.push({
          path: full.replace(/\\/g, '/'),
          name: f,
          size: stat.size
        });
      }
    }
  } catch(e) {}
  return results;
}

const drRicardoImgs = findImages('clones/medicina-e-saude/dr-ricardo');
console.log('Images in clones/medicina-e-saude/dr-ricardo:', drRicardoImgs.length);
drRicardoImgs.forEach(img => console.log(`  ${img.name} (${Math.round(img.size/1024)}KB) -> ${img.path}`));

const esteticaImgs = findImages('clones/estetica-e-beleza');
console.log('Images in clones/estetica-e-beleza:', esteticaImgs.length);
esteticaImgs.filter(i => !i.path.includes('dr.ricardo-andrade')).slice(0, 30).forEach(img => console.log(`  ${img.name} (${Math.round(img.size/1024)}KB) -> ${img.path}`));
