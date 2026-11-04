const fs = require('fs');
const h = fs.readFileSync('clones/odontologia/dra-fabiana-borges/index.html', 'utf8');

const regex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*class="([^">]*)"[^>]*>/gi;
let m;
while ((m = regex.exec(h)) !== null) {
  console.log(`class: ${m[3]} | src: ${m[1]} | alt: ${m[2]}`);
}
