const fs = require('fs');

let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

console.log('Starting full adaptation and fixes...');

// 1. HERO (rec630419934)
// Replace English / fragmented atoms
html = html.replace(
  /<h1 class=['"]tn-atom['"]field=['"]tn_text_1692618174847['"]>[\s\S]*?<\/h1>/i,
  `<h1 class='tn-atom' field='tn_text_1692618174847'>Dr. Ricardo Andrade <br>Cirurgia Plástica em Campinas</h1>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692618174845['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692618174845'>Definição &amp;</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692618174841['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692618174841'>a arte da</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692618174831['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692618174831'>Beleza</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692618174828['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692618174828'>Natural</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692618174824['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692618174824'><strong>Mamoplastia de Aumento • Protocolo R24R • Rinoplastia • CRM-SP 66.351 | RQE 14.201</strong></div>`
);

// 2. DOCTOR CREDENTIALS COLLISION (rec630435465)
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692620175875['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692620175875'>Cirurgião Plástico em Campinas</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692620175878['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692620175878'>com mais de 30 anos</div>`
);

html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692620175880['"]>[\s\S]*?<\/div>/i,
  `<div class='tn-atom' field='tn_text_1692620175880'>de excelência e dedicação</div>`
);

// Update button text in rec630435465
html = html.replace(
  /<a class=['"]tn-atom['"] href="https:\/\/ricardoandrade\.com\.br\/dr-ricardo\/" target="_blank">Dr\. Ricardo Andrade<\/a>/i,
  `<a class='tn-atom' href="https://ricardoandrade.com.br/dr-ricardo/" target="_blank">Conheça o Dr. Ricardo</a>`
);

// Add CSS to rec630435465 style tag to prevent any collision
const doctorStyleTarget = '#rec630435465 .t396__artboard {height:520px;';
const doctorStyleReplacement = `#rec630435465 .tn-elem[data-elem-id="1692620175875"] .tn-atom,
#rec630435465 .tn-elem[data-elem-id="1692620175878"] .tn-atom,
#rec630435465 .tn-elem[data-elem-id="1692620175880"] .tn-atom {
  white-space: nowrap;
}
@media screen and (max-width: 959px) {
  #rec630435465 .tn-elem[data-elem-id="1692620175875"] .tn-atom,
  #rec630435465 .tn-elem[data-elem-id="1692620175878"] .tn-atom,
  #rec630435465 .tn-elem[data-elem-id="1692620175880"] .tn-atom {
    white-space: normal;
  }
}
#rec630435465 .t396__artboard {height:540px;`;

html = html.replace(doctorStyleTarget, doctorStyleReplacement);

// 3. MISSION SECTION (rec630428990)
// Replace English in atom 1
html = html.replace(
  /Dr\. Ricardo Andrade, a renowned rhinoplasty specialist in Campinas-SP Cirurgi[^<]*of training, experience, and skill\./gi,
  'Dr. Ricardo Andrade é cirurgião plástico especialista formado pela Unicamp, com mais de 30 anos de excelência, dedicação e aperfeiçoamento contínuo em Campinas e região.'
);

// 4. PHILOSOPHY / DARK SECTION (rec630503658)
html = html.replace(
  /Cuidados Além da \/div>/gi,
  'Cuidados Além da Beleza'
);

html = html.replace(
  /Dr\. Ricardo believes that plastic surgery/gi,
  'O Dr. Ricardo Andrade acredita que a cirurgia plástica'
);

html = html.replace(
  /rhinoplasty and plastic surgery nose reconstruction are not just medical procedures but an art that requires passion and precision\./gi,
  'não é apenas um procedimento cirúrgico, mas uma arte médica que exige paixão, precisão milimétrica e profundo respeito à individualidade de cada paciente.'
);

// 5. PURPOSE SECTION (rec630539366)
// In rec630539366: replace "We love" and "your face"
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692631777271['"]>We love<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692631777271'>Cuidamos da sua</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692631777267['"]>your face<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692631777267'>Autoestima</div>`
);

// Also in rec631092667 and rec642101398 (Contact and Popup):
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692801458920['"]>We love<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692801458920'>Agende sua</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692801458924['"]>your face<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692801458924'>Consulta</div>`
);

// 6. PROCEDURES SECTION (rec630547094 and rec658898876)
html = html.replace(
  /to Middle Eastern, to African and Afro-American and Hispanic/gi,
  'à sua individualidade, proporções e biotipo único com total harmonia'
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692635951888['"]>results<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692635951888'>Resultados</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692635965406['"]>Sob Medida<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692635965406'>Naturais</div>`
);

// 7. QUOTE BANNER (rec630579574)
// Replace English fragments in rec630579574
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692735763920['"]>the culmination<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692735763920'>a perfeita união</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692735763914['"]>applied skill and wonder,<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692735763914'>de ciência e harmonia,</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692735763911['"]>of Rhinoplasty<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692735763911'>na Cirurgia Plástica</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1692735763908['"]>As great work is<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1692735763908'>Um trabalho de excelência é</div>`
);

// 8. FOOTER (rec638094575)
html = html.replace(
  /Rua Dr\. Barbosa de Andrade, 485 Campinas-SP, QC\. H2V 0B2/gi,
  'Rua Dr. Barbosa de Andrade, 485 – Jd. Chapadão – Campinas/SP – CEP 13070-158'
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1693390858711['"]>Navigation<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1693390858711'>Navegação</div>`
);
html = html.replace(
  /<div class=['"]tn-atom['"]field=['"]tn_text_1693391097893['"]>Our Services<\/div>/gi,
  `<div class='tn-atom' field='tn_text_1693391097893'>Procedimentos</div>`
);

// 9. SWAP CLINIC IMAGES (Montreal clinic -> Campinas Clinic)
html = html.replace(
  /assets\/Clinique_Zahi_vue_1_\.jpeg/g,
  'assets/clinica-foto-02.jpg'
);
html = html.replace(
  /assets\/Clinique_Zahi_vue_1_\.jpg/g,
  'assets/clinica-foto-01.jpg'
);

// Swap dark section doctor image
html = html.replace(
  /assets\/Screenshot_2023-10-2\.png/g,
  'assets/doutor-interna.jpg'
);

// 10. SWAP PROCEDURE NOSE IMAGES in rec667671212 WITH REAL SURGERY PHOTOS
html = html.replace('assets/5_DS_Side_Profile_Vi.jpg', 'assets/mastopexia-interna.jpg');
html = html.replace('assets/5_DS_Side_View_After.png', 'assets/silicone-375ml.jpg');
html = html.replace('assets/6_CR_Front_View_Befo.jpg', 'assets/protocolo-r24r.jpg');
html = html.replace('assets/6_CR_Front_View_Afte.png', 'assets/cirurgia-interna.jpg');
html = html.replace('assets/7_CR_Side_Profile_Be.jpg', 'assets/rinoplastia-interna.png');
html = html.replace('assets/7_CR_Side_Profile_Af.png', 'assets/blefaroplastia-interna.jpg');
html = html.replace('assets/8_AA_Before_Front_Vi.jpg', 'assets/procedimento-mamas.jpg');
html = html.replace('assets/8_AA_Front_View_Afte.png', 'assets/procedimento-corporais.jpg');
html = html.replace('assets/9_AA_Side_Profile_Vi.jpg', 'assets/procedimento-faciais.jpg');
html = html.replace('assets/9_AA_Side_Profile_Af.jpg', 'assets/procedimento-laser.jpg');
html = html.replace('assets/10_KE_Front_View_Bef.jpg', 'assets/clinica-foto-01.jpg');
html = html.replace('assets/10_KE_Front_View_Aft.png', 'assets/clinica-foto-02.jpg');
html = html.replace('assets/11_KE_Before_Side_Pr.jpg', 'assets/clinica-foto-03.jpg');
html = html.replace('assets/11_KE_After_Side_Pro.jpg', 'assets/dr-ricardo-principal.jpg');
html = html.replace('assets/12_SB_Front_View_Bef.jpg', 'assets/dr-ricardo-secundaria.jpg');
html = html.replace('assets/12_SB_Front_View_Aft.jpg', 'assets/mastopexia-interna.jpg');
html = html.replace('assets/13_SZ_Side_View_Befo.jpg', 'assets/silicone-375ml.jpg');
html = html.replace('assets/13_SZ_Side_View_Afte.jpg', 'assets/protocolo-r24r.jpg');
html = html.replace('assets/JL_Before_Front_1.jpg', 'assets/cirurgia-interna.jpg');
html = html.replace('assets/JL_After_Front.jpg', 'assets/rinoplastia-interna.png');

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('ALL UPDATES AND REPLACEMENTS APPLIED SUCCESSFULLY!');
