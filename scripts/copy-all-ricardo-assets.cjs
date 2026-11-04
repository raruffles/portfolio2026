const fs = require('fs');
const path = require('path');

const srcDir = 'clones/medicina-e-saude/dr-ricardo/assets';
const dest1 = 'clones/estetica-e-beleza/dr.ricardo-andrade/assets';
const dest2 = 'previas/dr-ricardo-andrade/assets';

[dest1, dest2].forEach(dest => {
  fs.mkdirSync(dest, { recursive: true });
});

const filesToCopy = [
  'clinica-foto-01.jpg',
  'clinica-foto-02.jpg',
  'clinica-foto-03.jpg',
  'Clinique_Zahi_vue_1_.jpg',
  'Cover-Clinique7.jpg',
  'contato-doutor.png',
  'doutor-interna.jpg',
  'dr-ricardo-principal.jpg',
  'dr-ricardo-secundaria.jpg',
  'dr-ricardo-youtube.png',
  'logo-dr-ricardo-menu.png',
  'logo-dr-ricardo-rodape.png',
  'blefaroplastia-interna.jpg',
  'cirurgia-interna.jpg',
  'procedimento-mamas.jpg',
  // All before/after cases
  '1_JB_Before_Front_Vi.jpg',
  '1_JB_After_Front_Vie.jpg',
  '3_EK_Side_Profile_Be.jpg',
  '3_EK_Side_Profile_Af.jpg',
  '5_DS_Front_View_Befo.jpg',
  '5_DS_Front_View_Afte.png',
  '5_DS_Side_Profile_Vi.jpg',
  '5_DS_Side_View_After.png',
  '6_CR_Front_View_Befo.jpg',
  '6_CR_Front_View_Afte.png',
  '7_CR_Side_Profile_Be.jpg',
  '7_CR_Side_Profile_Af.png',
  '8_AA_Before_Front_Vi.jpg',
  '8_AA_Front_View_Afte.png',
  '9_AA_Side_Profile_Vi.jpg',
  '9_AA_Side_Profile_Af.jpg',
  '10_KE_Front_View_Bef.jpg',
  '10_KE_Front_View_Aft.png',
  '11_KE_Before_Side_Pr.jpg',
  '11_KE_After_Side_Pro.jpg',
  '12_SB_Front_View_Bef.jpg',
  '12_SB_Front_View_Aft.jpg',
  '13_SZ_Side_View_Befo.jpg',
  '13_SZ_Side_View_Afte.jpg'
];

let copied = 0;
filesToCopy.forEach(f => {
  const src = path.join(srcDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dest1, f));
    fs.copyFileSync(src, path.join(dest2, f));
    copied++;
  } else {
    console.warn(`File not found: ${src}`);
  }
});

console.log(`Copied ${copied} assets to both destinations.`);
