const fs = require('fs');

const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/index.html', 'utf8');

const regex = /<img[^>]+>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
