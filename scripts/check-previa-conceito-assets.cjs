const fs = require('fs');
const html = fs.readFileSync('previas/conceito-saude/index.html', 'utf8');
const m = html.match(/src=["']([^"']+)["']/g);
console.log('Sample asset src in previas/conceito-saude/index.html:', m ? m.slice(0, 10) : 'none');
