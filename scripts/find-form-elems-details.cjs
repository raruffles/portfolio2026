const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const ids = [
  '1692631697352',
  '1692631697348',
  '1692631697355',
  '1692631818228',
  '1692633807038',
  '1692633930431',
  '1692631697159',
  '1692631697346',
  '1692631764064'
];

ids.forEach(id => {
  const idx = html.indexOf(`data-elem-id="${id}"`);
  if (idx !== -1) {
    const chunk = html.substring(idx, idx + 400);
    const clean = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 100);
    console.log(`${id}: ${clean}`);
  } else {
    console.log(`${id}: not found in html`);
  }
});
