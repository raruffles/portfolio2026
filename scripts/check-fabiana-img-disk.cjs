const fs = require('fs');

console.log('Exists in clones:', fs.existsSync('clones/odontologia/dra-fabiana-borges/assets/dra-fabiana-borges.png'));
console.log('Exists in previas:', fs.existsSync('previas/dra-fabiana-borges/assets/dra-fabiana-borges.png'));
if (fs.existsSync('clones/odontologia/dra-fabiana-borges/assets/dra-fabiana-borges.png')) {
  console.log('Size:', fs.statSync('clones/odontologia/dra-fabiana-borges/assets/dra-fabiana-borges.png').size);
}
