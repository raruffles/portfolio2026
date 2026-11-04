const fs = require('fs');
const path = require('path');

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
    // Print a snippet to help debug
    // Try to find partial match
    const partial = from.slice(0, 40);
    const idx = html.indexOf(partial);
    if (idx > -1) {
      console.log(`   Partial match at ${idx}: ${html.slice(idx, idx + 100)}`);
    }
  }
}

// =========================================================
// HERO CTA text (the subtitle paragraph under the h1)
// =========================================================
replace(
  'Saúde integrativa, emagrecimento avançado, soroterapia, reposição hormonal e exames laboratoriais completos em um só lugar. Cuide do seu corpo de dentro para fora com medicina personalizada.',
  'Saúde integrativa | Soroterapia | Emagrecimento | Reposição hormonal | Consultas e exames. A sua melhor versão, com saúde — de dentro para fora.',
  'Hero CTA text'
);

// =========================================================
// Hero CTA button (Agende sua Consulta → Mude de Vida Agora)
// Keep the structure but change text
// =========================================================
replace(
  '<div data-stagger-link-text="">Agende sua Consulta</div>',
  '<div data-stagger-link-text="">Mude de Vida Agora</div>',
  'Hero CTA button text'
);

// =========================================================
// ABOUT title / mission
// =========================================================
replace(
  'Na Conceito Saúde, nossa missão é</span> investigar a raiz dos seus sintomas com <span class="h2-serif">ciência, acolhimento e medicina integrativa,</span> devolvendo sua energia, disposição e <span c',
  'Na Conceito Saúde, nossa missão é</span> cuidar das pessoas com <span class="h2-serif">ciência, acolhimento e saúde integrativa,</span> transformando vidas e devolvendo a sua melhor versão com <span c',
  'About title/mission'
);

// =========================================================
// ABOUT text paragraph
// =========================================================
replace(
  'Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais. Na Conceito Saúde Clínica &amp; Laborat',
  'Você merece sentir-se bem todos os dias. Na Conceito Saúde Clínica &amp; Laborat',
  'About text (partial — beginning)'
);

// =========================================================
// WHY-US title
// =========================================================
replace(
  '<span class="h1-serif">Medicina Personalizada</span> <br/>focada em Resultados',
  '<span class="h1-serif">Transformações Reais</span> <br/>com Saúde Integrativa',
  'Why-Us title'
);

// =========================================================
// WHY-US subtitle (already updated but verify)
// =========================================================
// Already correct from previous session per session summary

// =========================================================
// TESTIMONIALS caption
// =========================================================
replace(
  'Resultados &amp; Superação',
  'Resultados Reais',
  'Testimonials caption'
);

// =========================================================
// TESTIMONIALS title
// =========================================================
replace(
  'Superação e Coragem: <span class="h1-serif">Histórias Reais</span>',
  'Por Trás de Cada <span class="h1-serif">Transformação,</span> Uma Nova História',
  'Testimonials title'
);

// =========================================================
// CTA title
// =========================================================
replace(
  'Pronto para Conquistar a sua <span class="text-display-serif">Melhor Versão?</span>',
  'Mude de Vida <span class="text-display-serif">Agora!</span>',
  'CTA title'
);

// =========================================================
// CTA text paragraph — find and show it
// =========================================================
const ctaIdx = html.indexOf('data-cta="text"');
if (ctaIdx > -1) {
  const snippet = html.slice(ctaIdx, ctaIdx + 300);
  console.log('\nCTA text snippet:', snippet);
}

// =========================================================
// FOOTER tagline / copyright area - find it
// =========================================================
const footerIdx = html.indexOf('footer__rights');
if (footerIdx > -1) {
  const snippet = html.slice(footerIdx, footerIdx + 500);
  console.log('\nFooter rights snippet:', snippet);
}

// =========================================================
// SERVICES caption (look for it)
// =========================================================
const svcCaptionIdx = html.indexOf('data-services="caption"');
if (svcCaptionIdx > -1) {
  const snippet = html.slice(svcCaptionIdx, svcCaptionIdx + 200);
  console.log('\nServices caption snippet:', snippet);
}

// =========================================================
// ABOUT text - find the full paragraph
// =========================================================
const aboutPIdx = html.indexOf('data-about="text"');
if (aboutPIdx > -1) {
  const snippet = html.slice(aboutPIdx, aboutPIdx + 600);
  console.log('\nAbout text full snippet:', snippet);
}

// Write the file
fs.writeFileSync(filePath, html, 'utf8');
console.log(`\n✅ ${changes} replacements applied. File saved.`);
