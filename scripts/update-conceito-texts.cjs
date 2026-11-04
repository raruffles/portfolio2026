const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'conceito-saude', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ============================================================
// AJUSTES DE TEXTO BASEADOS NA BIO DO INSTAGRAM
// Bio: "✨A sua melhor versão, com saúde | 🩺Saúde integrativa | Soroterapia | Emagrecimento | 🌱Reposição hormonal | Consultas e exames"
// ============================================================

// 1. TITLE TAG
html = html.replace(
  '<title>Conceito Saúde | Clínica &amp; Laboratório — Saúde Integrativa e Emagrecimento</title>',
  '<title>Conceito Saúde | Clínica &amp; Laboratório — Saúde Integrativa, Soroterapia e Emagrecimento</title>'
);

// 2. META DESCRIPTION
html = html.replace(
  'Clínica médica integrativa em Redenção - PA. Soroterapia, emagrecimento, reposição hormonal, tratamento de lipedema e consultas médicas com suporte a Mounjaro. Exames laboratoriais integrados.',
  'A sua melhor versão, com saúde. Saúde integrativa, soroterapia, emagrecimento e reposição hormonal em Redenção - PA. Consultas médicas e exames laboratoriais integrados na Conceito Saúde Clínica &amp; Laboratório.'
);

// 3. HERO — Tagline principal (3 linhas do h1 do hero)
html = html.replace(
  'Sua Saúde <span class="h1-serif">Integrada,</span> com Ciência e Resultados',
  'A Sua Melhor <span class="h1-serif">Versão,</span> com Saúde'
);

// 4. HERO — Subtítulo abaixo do h1
html = html.replace(
  'Saúde integrativa, soroterapia, emagrecimento e reposição hormonal. Consultas e exames no mesmo local, com médicos especializados em Redenção - PA.',
  'Saúde integrativa | Soroterapia | Emagrecimento. Reposição hormonal | Consultas e exames integrados na Conceito Saúde Clínica &amp; Laboratório em Redenção - PA.'
);

// 5. ABOUT — Caption
html = html.replace(
  'Na Conceito Saúde, nossa missão é investigar a raiz dos seus sintomas com ciência, acolhimento e medicina integrativa, devolvendo sua energia, disposição e qualidade de vida.',
  'Na Conceito Saúde, nossa missão é cuidar de você com ciência, acolhimento e medicina integrativa — devolvendo sua energia, disposição e qualidade de vida para que você viva a sua melhor versão.'
);

// 6. ABOUT — Parágrafo principal da clínica
html = html.replace(
  'Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais. Na Conceito Saúde Clínica &amp; Laboratório, unimos médicos especializados, exames laboratoriais de alta precisão e protocolos integrativos para você viver a sua melhor versão.',
  'Seu corpo fala com você. Cansaço constante, dificuldade para emagrecer, alterações hormonais e queda de cabelo não são normais. Na Conceito Saúde Clínica &amp; Laboratório, unimos saúde integrativa, soroterapia, emagrecimento médico, reposição hormonal e laboratório próprio para você mudar de vida de verdade.'
);

// 7. SERVICES — Caption
html = html.replace(
  'Medicina Personalizada focada em Resultados',
  'Saúde Integrativa, Soroterapia e Emagrecimento'
);

// 8. SERVICES — Subtitle
html = html.replace(
  'Entenda por que a Conceito Saúde é referência em saúde integrativa, emagrecimento e bem-estar em Redenção e região.',
  'Saúde integrativa, soroterapia, emagrecimento, reposição hormonal, consultas e exames — tudo integrado em um só lugar para você conquistar sua melhor versão.'
);

// 9. WHY-US — Caption
html = html.replace(
  'Superação e Coragem: Histórias Reais',
  'Histórias Reais de Transformação'
);

// 10. FOOTER — Tagline
html = html.replace(
  'A sua melhor versão, com saúde. Clínica médica integrativa e laboratório de exames em Redenção - PA.',
  'A sua melhor versão, com saúde. Saúde integrativa | Soroterapia | Emagrecimento | Reposição hormonal | Consultas e exames.'
);

// 11. CTA SECTION — Tagline antes do botão final
html = html.replace(
  'Pronto para Conquistar a sua Melhor Versão?',
  'Mude de Vida Agora!'
);
html = html.replace(
  'Dê o primeiro passo em direção à sua saúde integrativa. Agende sua consulta e seus exames na Conceito Saúde Clínica &amp; Laboratório pelo WhatsApp.',
  'Dê o primeiro passo. Saúde integrativa, soroterapia, emagrecimento e reposição hormonal. Agende sua consulta e exames na Conceito Saúde pelo WhatsApp.'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Conceito Saúde texts updated from Instagram bio reference!');
