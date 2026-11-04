const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const labels = [];
const regex = /<label[^>]*class="[^"]*booking-treatment-card[^"]*"[^>]*>[\s\S]*?<\/label>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  labels.push(m[0]);
}

console.log('Total booking treatment cards:', labels.length);
labels.forEach((l, i) => console.log(`${i+1}: ${l.replace(/\s+/g, ' ')}`));
