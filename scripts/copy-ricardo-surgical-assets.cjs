const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'dr-ricardo', 'assets');
const destDir = path.join(__dirname, '..', 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'assets');

// List of great surgical / clinical / before-after images in dr-ricardo
const imagesToCopy = [
  // Before & After Rhinoplasty & Facial
  '1_JB_Before_Front_Vi.jpg',
  '1_JB_After_Front_Vie.jpg',
  '3_EK_Side_Profile_Be.jpg',
  '3_EK_Side_Profile_Af.jpg',
  '5_DS_Side_Profile_Vi.jpg',
  '5_DS_Side_View_After.png',
  '7_CR_Side_Profile_Be.jpg',
  '7_CR_Side_Profile_Af.png',
  '10_KE_Front_View_Bef.jpg',
  '10_KE_Front_View_Aft.png',
  '11_KE_Before_Side_Pr.jpg',
  '11_KE_After_Side_Pro.jpg',
  '13_SZ_Side_View_Befo.jpg',
  '13_SZ_Side_View_Afte.jpg',
  // Surgery & Clinic images
  '01.jpg',
  '03.jpg',
  '04.jpg',
  '05.jpg',
  '55.jpg',
];

imagesToCopy.forEach(f => {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${f}`);
  } else {
    console.log(`Missing: ${f}`);
  }
});
