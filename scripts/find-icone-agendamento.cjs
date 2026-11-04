const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const idx = html.indexOf('01-home-dr-ricardo-andrade-icone-agendamento.png');
console.log(html.substring(idx - 400, idx + 200));
