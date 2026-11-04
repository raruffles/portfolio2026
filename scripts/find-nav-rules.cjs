const fs = require('fs');
const css = fs.readFileSync('clones/arquitetura/decor-dani-melo/_next/static/chunks/07p.y134brcee.css', 'utf8');

// Find all rules starting with .site-header or nav
const matches = css.match(/(\.site-header[^{]*\{[^}]*\})/g) || [];
console.log('site-header rules:\n', matches.join('\n\n'));

const mediaMatches = css.match(/@media[^{]*\{[\s\S]*?site-header[\s\S]*?\}/g) || [];
console.log('media matches:\n', mediaMatches.join('\n\n'));
