const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const docs = [];
const regex = /<label[^>]*class="[^"]*booking-doctor-card[^"]*"[^>]*>[\s\S]*?<\/label>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  docs.push(m[0]);
}

console.log('Total booking doctor cards:', docs.length);
docs.forEach((d, i) => console.log(`${i+1}: ${d.replace(/\s+/g, ' ')}`));
