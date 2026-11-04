const fs = require('fs');

const css = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/07p.y134brcee.css', 'utf8');

const queries = ['data-nimg', 'hero-portrait', 'statement-image', 'project-card', 'project-image'];
queries.forEach(q => {
  let idx = css.indexOf(q);
  if (idx > -1) {
    console.log(`[${q}]:`, css.slice(Math.max(0, idx - 40), idx + 200));
  } else {
    console.log(`[${q}]: NOT FOUND`);
  }
});
