const fs = require('fs');

function restoreCss(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('07p.y134brcee.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="_next/static/chunks/07p.y134brcee.css">\n</head>');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Restored CSS to ${filePath}!`);
  }
}

restoreCss('clones/arquitetura/decor-dani-melo/index.html');
restoreCss('previas/decor-dani-melo/index.html');
