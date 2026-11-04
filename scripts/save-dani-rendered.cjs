const fs = require('fs');

const raw = fs.readFileSync('C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.system_generated/steps/930/output.txt', 'utf8');

const firstQuote = raw.indexOf('"<html');
const lastQuote = raw.lastIndexOf('</html>"');

if (firstQuote > -1 && lastQuote > -1) {
  const jsonSub = raw.slice(firstQuote, lastQuote + '</html>"'.length);
  const html = JSON.parse(jsonSub);
  fs.writeFileSync('clones/arquitetura/decor-dani-melo/rendered.html', html, 'utf8');
  console.log('Saved rendered.html! Length:', html.length);
} else {
  console.log('Quotes not found');
}
