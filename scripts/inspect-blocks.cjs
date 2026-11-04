const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

function inspectRec(recId) {
  const start = html.indexOf(`id="${recId}"`);
  if (start === -1) {
    console.log(`Record ${recId} not found`);
    return;
  }
  const next = html.indexOf('<div id="rec', start + 1);
  const block = html.substring(start, next !== -1 ? next : start + 15000);
  
  console.log(`\n=================== ${recId} ===================`);
  // Find all tn-atom elements
  const atomRegex = /<div class=['"][^'"]*tn-atom[^'"]*['"][^>]*>([\s\S]*?)<\/div>/gi;
  let atomMatch;
  while ((atomMatch = atomRegex.exec(block)) !== null) {
    console.log('--- ATOM: ---');
    console.log(atomMatch[1].trim());
  }
}

inspectRec('rec630419934');
inspectRec('rec630428990');
inspectRec('rec630435465');
