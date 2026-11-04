const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// 1. Hero text element widths & positions
console.log('=== HERO CSS ===');
const heroCSS = html.substring(html.indexOf('id="rec630419934"'), html.indexOf('</style>', html.indexOf('id="rec630419934"')));
['1692618174845', '1692618174841', '1692618174831', '1692618174828', '1692618174824', '1692618174847'].forEach(id => {
  const reg = new RegExp(`(#rec630419934 [^{]*${id}[^{]*\\{[^}]*\\})`, 'g');
  let m;
  console.log(`\n--- Element ${id} ---`);
  while ((m = reg.exec(heroCSS)) !== null) {
    console.log(m[1]);
  }
});

// 2. Mission 1692621943726 CSS
console.log('\n=== MISSION CSS ===');
const misCSS = html.substring(html.indexOf('id="rec630428990"'), html.indexOf('</style>', html.indexOf('id="rec630428990"')));
['1692621943726'].forEach(id => {
  const reg = new RegExp(`(#rec630428990 [^{]*${id}[^{]*\\{[^}]*\\})`, 'g');
  let m;
  while ((m = reg.exec(misCSS)) !== null) {
    console.log(m[1]);
  }
});

// 3. Section rec630539366 CSS for elements 1692631697352 and 1692631697348
console.log('\n=== FORM SECTION CSS ===');
const formCSS = html.substring(html.indexOf('id="rec630539366"'), html.indexOf('</style>', html.indexOf('id="rec630539366"')));
['1692631697352', '1692631697348'].forEach(id => {
  const reg = new RegExp(`(#rec630539366 [^{]*${id}[^{]*\\{[^}]*\\})`, 'g');
  let m;
  console.log(`\n--- Element ${id} ---`);
  while ((m = reg.exec(formCSS)) !== null) {
    console.log(m[1]);
  }
});
