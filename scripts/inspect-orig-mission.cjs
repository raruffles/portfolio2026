const fs = require('fs');
const html = fs.readFileSync('clones/clinique7/index.html', 'utf8');
const start = html.indexOf('id="rec630428990"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);
const elemRegex = /<div class=['"]t396__elem tn-elem ([^'"]*)['"][^>]*data-elem-id=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
let match;
while ((match = elemRegex.exec(block)) !== null) {
  const atom = match[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (atom) console.log(match[2] + ': ' + atom);
}
