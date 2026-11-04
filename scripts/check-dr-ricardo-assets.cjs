const fs = require('fs');
const path = require('path');

const dir = 'clones/medicina-e-saude/dr-ricardo/assets';
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log('Files in clones/medicina-e-saude/dr-ricardo/assets:', files.length);
  files.slice(0, 30).forEach(f => console.log(f));
} else {
  console.log('Not found');
}
