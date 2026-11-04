const fs = require('fs');

function checkFile(name, path) {
  const h = fs.readFileSync(path, 'utf8');
  console.log(`=== ${name} ===`);
  const aboutM = h.match(/<img[^>]+class="intro__media-img"[^>]*>/);
  console.log('About img:', aboutM ? aboutM[0] : 'NOT FOUND');
  const teamM = h.match(/<img[^>]+dra-fabiana-borges\.png[^>]*class="team-card__img"[^>]*>/);
  console.log('Team img:', teamM ? teamM[0] : 'NOT FOUND');
}

checkFile('CLONE', 'clones/odontologia/dra-fabiana-borges/index.html');
checkFile('PREVIA', 'previas/dra-fabiana-borges/index.html');
