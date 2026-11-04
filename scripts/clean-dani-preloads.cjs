const fs = require('fs');

function cleanHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // Remove preloaded Next.js chunk scripts
  html = html.replace(/<link[^>]+_next\/static\/chunks[^>]+>/gi, '');
  fs.writeFileSync(filePath, html, 'utf8');
}

cleanHtml('clones/arquitetura/decor-dani-melo/index.html');
cleanHtml('previas/decor-dani-melo/index.html');
console.log('Cleaned unused preloads!');
