const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'conceito-saude', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Extract the hero section to see exact text
const heroMatch = html.match(/data-hero=""[\s\S]{0,10000}/);
if (heroMatch) {
  const raw = heroMatch[0].slice(0, 5000);
  // Show raw HTML of hero
  console.log(raw);
}
