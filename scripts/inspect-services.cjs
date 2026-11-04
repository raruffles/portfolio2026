const fs = require('fs');
const h = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const sIdx = h.indexOf('class="services__col-wrap');
if (sIdx > -1) {
  const snippet = h.slice(sIdx, sIdx + 4000);
  const titles = snippet.match(/class="service-card__title[^"]*"[^>]*>([\s\S]*?)<\/div>/g) ||
                 snippet.match(/<h3[^>]*>([\s\S]*?)<\/h3>/g) ||
                 snippet.match(/class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/g);
  console.log('Matches:', titles ? titles.slice(0, 15) : 'None');
  
  // also extract service names if they use data attributes or specific classes
  const m = snippet.match(/<div data-dropdown=""[\s\S]*?<\/article>/g);
  if (m) {
    m.forEach((card, idx) => {
      const clean = card.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`Service ${idx + 1}: ${clean.slice(0, 120)}`);
    });
  } else {
    console.log('No data-dropdown cards found, checking raw text');
    console.log(snippet.slice(0, 800));
  }
}
