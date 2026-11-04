const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

function findSnippets(words) {
  words.forEach(w => {
    let pos = 0;
    while ((pos = html.indexOf(w, pos)) !== -1) {
      console.log(`\n=== Word: "${w}" ===`);
      console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 100)));
      pos += w.length;
    }
  });
}

findSnippets(['We love', 'your face', 'the culmination', 'H2V 0B2', 'Navigation', 'Our Services', 'results']);
