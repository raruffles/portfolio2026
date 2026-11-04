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
    const partial = from.slice(0, 50);
    const idx = html.indexOf(partial);
    if (idx > -1) {
      console.log(`   Actual at ${idx}: ...${html.slice(idx, idx + 120)}...`);
    }
  }
}

// =========================================================
// ABOUT text paragraph — fix the "Seu corpo" paragraph
// =========================================================
// First let's find exact text
const aboutTextIdx = html.indexOf('Seu corpo fala com você: cansaço');
if (aboutTextIdx > -1) {
  const snippet = html.slice(aboutTextIdx, aboutTextIdx + 500);
  console.log('=== ABOUT TEXT EXACT SNIPPET ===');
  console.log(snippet);
  console.log('=================================\n');
}

// Find the closing of that paragraph  
const ctaTextIdx = html.indexOf('"Dê o primeiro');
if (ctaTextIdx > -1) {
  const snippet = html.slice(ctaTextIdx, ctaTextIdx + 300);
  console.log('=== CTA TEXT EXACT SNIPPET ===');
  console.log(snippet);
  console.log('==============================\n');
}

// =========================================================
// Apply about text fix using regex since it spans encodings
// =========================================================
const aboutRegex = /Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais\. Na Conceito Saúde Clínica &amp; Laborat[^<]*/;
const aboutMatch = html.match(aboutRegex);
if (aboutMatch) {
  console.log('Found about text via regex:', aboutMatch[0].slice(0, 100));
  html = html.replace(aboutRegex, 'Você merece sentir-se bem todos os dias. Na Conceito Saúde Clínica &amp; Laboratório, unimos soroterapia, reposição hormonal, emagrecimento avançado e medicina integrativa para devolver sua energia, disposição e qualidade de vida. Cuide do seu corpo de dentro para fora com protocolos médicos personalizados e exames laboratoriais de alta precisão.');
  changes++;
  console.log('✅ About text via regex');
} else {
  console.log('❌ About text regex did not match');
}

// =========================================================
// CTA text paragraph
// =========================================================
const ctaRegex = /<p data-cta="text" class="text-b1--book">[^<]+<\/p>/;
const ctaMatch = html.match(ctaRegex);
if (ctaMatch) {
  console.log('\nCTA text match:', ctaMatch[0]);
  html = html.replace(ctaRegex, '<p data-cta="text" class="text-b1--book">Dê o primeiro passo em direção à sua saúde integrativa. Agende sua consulta e descubra como soroterapia, reposição hormonal, emagrecimento e medicina preventiva podem transformar sua vida.</p>');
  changes++;
  console.log('✅ CTA text');
} else {
  console.log('❌ CTA text regex not found');
  // Try to find it manually
  const ctaP = html.indexOf('data-cta="text"');
  if (ctaP > -1) {
    console.log('CTA text area:', html.slice(ctaP - 10, ctaP + 300));
  }
}

// Write
fs.writeFileSync(filePath, html, 'utf8');
console.log(`\n✅ ${changes} additional replacements applied. File saved.`);
