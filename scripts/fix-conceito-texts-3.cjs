const fs = require('fs');

const filePath = 'clones/medicina-e-saude/conceito-saude/index.html';
let html = fs.readFileSync(filePath, 'utf8');
let changes = 0;

function replace(from, to, label) {
  if (html.includes(from)) {
    html = html.split(from).join(to);
    changes++;
    console.log(`✅ ${label}`);
  } else {
    console.log(`❌ NOT FOUND: ${label}`);
  }
}

// ABOUT text paragraph - literal & in source
replace(
  'Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais. Na Conceito Saúde Clínica & Laboratório, unimos médicos especializados, exames laboratoriais de alta precisão e protocolos integrativos para você viver a sua melhor versão.',
  'Você merece sentir-se bem todos os dias. Na Conceito Saúde Clínica & Laboratório, unimos soroterapia, reposição hormonal, emagrecimento avançado e medicina integrativa para devolver sua energia, disposição e qualidade de vida. Cuide do seu corpo de dentro para fora com protocolos médicos personalizados e exames laboratoriais de alta precisão.',
  'About text paragraph'
);

// ABOUT mission title — fix remainder of the sentence cut off in previous script
// The about title was partially replaced but let's check
const aboutTitleIdx = html.indexOf('cuidar das pessoas com');
if (aboutTitleIdx > -1) {
  console.log('\nAbout mission current state:', html.slice(aboutTitleIdx, aboutTitleIdx + 300));
} else {
  const aboutOldIdx = html.indexOf('investigar a raiz dos seus sintomas');
  if (aboutOldIdx > -1) {
    console.log('\nAbout mission OLD still present:', html.slice(aboutOldIdx, aboutOldIdx + 300));
  } else {
    console.log('\nAbout mission: neither old nor new found — checking via data-about=title');
    const daIdx = html.indexOf('data-about="title"');
    if (daIdx > -1) console.log(html.slice(daIdx, daIdx + 400));
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log(`\n✅ ${changes} replacements applied.`);
