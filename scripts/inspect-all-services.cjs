const fs = require('fs');
const h = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const sIdx = h.indexOf('class="services__col-wrap');
const endIdx = h.indexOf('</section>', sIdx);
const section = h.slice(sIdx, endIdx);

const items = section.split('<div data-dropdown=""');
console.log(`Found ${items.length - 1} items`);
items.slice(1).forEach((item, i) => {
  const num = (item.match(/\((\d{2})\)/) || [])[1] || 'no-num';
  const h3 = (item.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || 'EMPTY';
  const desc = (item.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1] || 'NO-DESC';
  console.log(`Item ${i + 1} [${num}]: ${h3.replace(/<[^>]+>/g, '')} | ${desc.slice(0, 60)}`);
});
