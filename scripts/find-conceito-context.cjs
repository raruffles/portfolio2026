const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const regexes = [
  /assets\/conceito-about\.jpg/g,
  /assets\/conceito-team-1\.jpg/g,
  /Daynith/g
];

regexes.forEach(re => {
  let m;
  while ((m = re.exec(html)) !== null) {
    const start = Math.max(0, m.index - 100);
    const end = Math.min(html.length, m.index + 150);
    console.log('--- FOUND', re.source, '---');
    console.log(html.substring(start, end));
  }
});
