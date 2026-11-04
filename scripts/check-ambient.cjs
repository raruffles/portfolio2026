const fs = require('fs');
const css = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/07p.y134brcee.css', 'utf8');

const idx = css.indexOf('.ambient-canvas');
if (idx > -1) {
  console.log(css.slice(idx, idx + 300));
}
