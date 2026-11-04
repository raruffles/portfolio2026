const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630435465"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

console.log('--- rec630435465 length:', block.length);

// Extract style tag inside block
const styleMatch = block.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  console.log('Style:');
  console.log(styleMatch[1]);
}

// Extract all elements
const elemRegex = /<div class=['"]t396__elem tn-elem ([^'"]*)['"][^>]*data-elem-id=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
let match;
while ((match = elemRegex.exec(block)) !== null) {
  console.log(`\nElem [${match[2]}] class: ${match[1]}`);
  console.log(`Content: ${match[3]}`);
}
