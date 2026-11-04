const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const ytMarkup = html.match(/<section[^>]+(?:youtube|video)[^>]*>[\s\S]*?<\/section>/i) || html.match(/class="[^"]*youtube[^"]*"[\s\S]*?<\/div>\s*<\/div>/i);
if (ytMarkup) {
  console.log('--- YOUTUBE MARKUP ---');
  console.log(ytMarkup[0].substring(0, 800));
}

const agMarkup = html.match(/<div[^>]+class="[^"]*agendamento-featured-card[^"]*"[\s\S]*?<\/div>\s*<\/div>/i);
if (agMarkup) {
  console.log('--- AGENDAMENTO MARKUP ---');
  console.log(agMarkup[0].substring(0, 800));
}
