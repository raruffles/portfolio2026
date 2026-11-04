const fs = require('fs');
const path = require('path');

const srcDir = 'clones/medicina-e-saude/dr-ricardo/assets';
const files = fs.readdirSync(srcDir);

const categories = {
  clinic: [],
  doctor: [],
  procedures: [],
  cases: [],
  other: []
};

files.forEach(f => {
  const stat = fs.statSync(path.join(srcDir, f));
  if (stat.size < 5000) return;
  const item = { file: f, size: stat.size };
  if (/clinica|clinique/i.test(f)) categories.clinic.push(item);
  else if (/doutor|ricardo|contato/i.test(f)) categories.doctor.push(item);
  else if (/cirurgia|blefaroplastia|mama|lipo/i.test(f)) categories.procedures.push(item);
  else if (/_\w\w_|^[0-9]+_[A-Z]/i.test(f)) categories.cases.push(item);
  else categories.other.push(item);
});

console.log('CLINIC ASSETS:', categories.clinic);
console.log('DOCTOR ASSETS:', categories.doctor);
console.log('PROCEDURES ASSETS:', categories.procedures);
console.log('CASES ASSETS:', categories.cases.slice(0, 15));
console.log('OTHER ASSETS:', categories.other.slice(0, 15));
