const fs = require('fs');

const f1 = 'clones/medicina-e-saude/conceito-saude/index.html';
const f2 = 'previas/conceito-saude/index.html';

[f1, f2].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace Daynith with Clarissa Oliveira
    content = content.replace(/Daynith Oliveira/g, 'Clarissa Oliveira');
    content = content.replace(/Daynith/g, 'Clarissa');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated Daynith -> Clarissa in ${file}`);
  }
});
