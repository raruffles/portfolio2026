const fs = require('fs');
const css = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/07p.y134brcee.css', 'utf8');

const queries = ['menu-button', 'nav', 'aria-expanded'];
queries.forEach(q => {
  let idx = 0;
  while ((idx = css.indexOf(q, idx)) > -1) {
    const start = Math.max(0, idx - 40);
    console.log(`[${q}]:`, css.slice(start, idx + 120));
    idx += q.length;
    if (idx > css.indexOf(q) + 500) break; // just first few
  }
});
