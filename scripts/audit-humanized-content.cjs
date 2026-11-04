const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const aiBuzzwords = [
  'não apenas',
  'não só',
  'tapeçaria',
  'cenário',
  'vibrante',
  'potencializa',
  'crucial',
  'ecossistema',
  'revolucionário',
  'transformador',
  'prestigiado',
  'busca incansável',
  'equilíbrio perfeito',
  'esculpir',
  'visando',
  'no que tange a',
  'cabe ressaltar',
  'é importante destacar',
  'nesse contexto',
  'sob essa ótica'
];

console.log('--- Scanning for AI buzzwords in dr-ricardo/index.html ---');
let foundAny = false;
aiBuzzwords.forEach(word => {
  const count = (html.toLowerCase().match(new RegExp(word, 'g')) || []).length;
  if (count > 0) {
    foundAny = true;
    console.log(`[ALERT] "${word}": found ${count} time(s)`);
    // print snippet around occurrence
    const idx = html.toLowerCase().indexOf(word);
    console.log('Snippet:', html.substring(Math.max(0, idx - 60), Math.min(html.length, idx + 100)).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  }
});

if (!foundAny) {
  console.log('✓ 100% CLEAN! Zero AI buzzwords found in the page!');
}
