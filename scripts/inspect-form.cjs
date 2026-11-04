const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const start = html.indexOf('id="rec630539366"');
const next = html.indexOf('<div id="rec', start + 1);
const block = html.substring(start, next);

// Extract form
const formMatch = block.match(/<form[\s\S]*?<\/form>/i);
if (formMatch) {
  console.log('Form HTML:');
  console.log(formMatch[0]);
} else {
  console.log('No form tag found, searching for inputs:');
  const inputs = block.match(/<(?:input|textarea|select|label)[\s\S]*?>/gi);
  console.log(inputs);
}
