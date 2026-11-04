const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// 1. Inspect Hero rec630419934
console.log('=== HERO ATOMS IN rec630419934 ===');
const heroStart = html.indexOf('id="rec630419934"');
const heroEnd = html.indexOf('<div id="rec', heroStart + 1);
const heroBlock = html.substring(heroStart, heroEnd);
const heroAtoms = heroBlock.match(/<div class=['"][^'"]*tn-elem[^'"]*['"][^>]*data-elem-id=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi) || [];
heroAtoms.forEach(a => {
  const id = a.match(/data-elem-id=['"]([^'"]*)['"]/)[1];
  const txt = a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (txt) console.log(`[${id}] "${txt}"`);
});

// 2. Inspect Mission rec630428990
console.log('\n=== MISSION rec630428990 ===');
const misStart = html.indexOf('id="rec630428990"');
const misEnd = html.indexOf('<div id="rec', misStart + 1);
const misBlock = html.substring(misStart, misEnd);
const misAtoms = misBlock.match(/<div class=['"][^'"]*tn-elem[^'"]*['"][^>]*data-elem-id=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi) || [];
misAtoms.forEach(a => {
  const id = a.match(/data-elem-id=['"]([^'"]*)['"]/)[1];
  const txt = a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (txt) console.log(`[${id}] "${txt}"`);
});

// 3. Inspect Purpose / Form rec630539366
console.log('\n=== FORM rec630539366 ===');
const formStart = html.indexOf('id="rec630539366"');
const formEnd = html.indexOf('<div id="rec', formStart + 1);
const formBlock = html.substring(formStart, formEnd);
console.log(formBlock.slice(0, 2000));
