const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const ytIdx = html.indexOf('youtube-section');
if (ytIdx !== -1) {
  console.log('--- YOUTUBE SECTION ---');
  console.log(html.substring(ytIdx - 100, ytIdx + 1200));
}

const agIdx = html.indexOf('agendamento-featured-card');
if (agIdx !== -1) {
  console.log('--- AGENDAMENTO CARD ---');
  console.log(html.substring(agIdx - 100, agIdx + 1200));
}
