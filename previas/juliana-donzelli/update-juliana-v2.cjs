const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexPath = path.join(dir, 'index.html');
const resPath = path.join(dir, 'residencia-alphaville.html');

console.log('--- Aplicando Correções Solicitadas pelo Usuário (V2) ---');

// ==========================================
// 1. ATUALIZAR index.html
// ==========================================
let html = fs.readFileSync(indexPath, 'utf8');

// A. Substituir Imagens
// 1. Imagem de Bio no Estúdio (assets/3948634773405647722_2244675868_1.jpg -> juliana-donzelli-perfil-principal.jpg)
html = html.replace(
  /<div class="description-img"><img src="assets\/3948634773405647722_2244675868_1\.jpg" loading="lazy" alt="Arquitetura residencial de alto padrão por Juliana Donzelli" class="image-cover"\/><\/div>/,
  `<div class="description-img"><img src="assets/juliana-donzelli-perfil-principal.jpg" loading="lazy" alt="Juliana Donzelli - Arquiteta em São José dos Campos" class="image-cover" style="width:100%; height:100%; object-fit:cover; border-radius:12px;"/></div>`
);

// 2. Imagem da Metodologia (.approach-img -> juliana-donzelli-metodologia.jpg)
html = html.replace(
  /<div id="w-node-c5e11e0a-424c-d9f2-2664-08cc94308dbb-3ac774a5" class="approach-img">\s*<img src="assets\/4008136506011091686_2244675868_2\.jpg" loading="lazy" width="1063" alt="Metodologia Juliana Donzelli - Harmonia entre conceito e canteiro de obras" class="image-cover" style="width:100%; border-radius:12px; object-fit:cover; display:block;"\/>\s*<\/div>/,
  `<div id="w-node-c5e11e0a-424c-d9f2-2664-08cc94308dbb-3ac774a5" class="approach-img">
    <img src="assets/juliana-donzelli-metodologia.jpg" loading="lazy" width="1063" alt="Metodologia Juliana Donzelli - Harmonia entre conceito e canteiro de obras" class="image-cover" style="width:100%; border-radius:12px; object-fit:cover; display:block;"/>
  </div>`
);

// 3. Imagens do Slide 1 (Destaque Editorial / Revista)
// Thumbnail do slide 1:
html = html.replace(
  /<img src="assets\/juliana-destaque-revista\.png" loading="lazy" alt="Juliana Donzelli - Destaque em Arquitetura e Interiores" class="image-cover" style="width:100%; height:100%; object-fit:cover;"\/>/,
  `<img src="assets/juliana-donzelli-retrato.png" loading="lazy" alt="Juliana Donzelli - Arquiteta e Urbanista" class="image-cover" style="width:100%; height:100%; object-fit:cover;"/>`
);
// Big image do slide 1:
html = html.replace(
  /<img src="assets\/juliana-destaque-revista\.png" loading="lazy" alt="Juliana Donzelli - Destaque em Arquitetura e Interiores" class="image-cover" style="width:100%; height:100%; object-fit:cover;"\/>/,
  `<img src="assets/juliana-donzelli-perfil-principal.jpg" loading="lazy" alt="Juliana Donzelli - Destaque em Arquitetura e Interiores" class="image-cover" style="width:100%; height:100%; object-fit:cover;"/>`
);

// B. CORRIGIR CABEÇALHO: NOME GRANDE DA ARQUITETA & ZERO QUEBRAS DE TEXTO
// Substituição do bloco .nav-logo no HTML
const newNavLogoHTML = `<a aria-label="Página inicial Juliana Donzelli" id="w-node-b1c66881-d48d-0bc3-9724-d9edc5424dc6-c5424dc1" href="#hero" aria-current="page" class="nav-logo w-nav-brand w--current" style="width:auto !important; max-width:none !important; text-decoration:none !important;">
  <div class="nav-logo-el" style="display:flex; flex-direction:column; justify-content:center; width:auto !important; max-width:none !important;">
    <span class="nav-architect-name" style="font-family:'Cormorant Garamond', Georgia, serif !important; font-size:clamp(22px, 2.2vw, 30px) !important; font-weight:700 !important; letter-spacing:0.12em !important; text-transform:uppercase !important; color:#1f1a17 !important; line-height:1.05 !important; white-space:nowrap !important; display:block !important;">JULIANA DONZELLI</span>
    <span class="nav-architect-sub" style="font-size:9.5px !important; letter-spacing:0.24em !important; text-transform:uppercase !important; color:#6e6259 !important; font-weight:600 !important; display:block !important; margin-top:3px !important; white-space:nowrap !important;">Arquitetura + Interiores</span>
  </div>
</a>`;

html = html.replace(
  /<a aria-label="go to home page" id="w-node-b1c66881-d48d-0bc3-9724-d9edc5424dc6-c5424dc1"[\s\S]*?<\/a>/,
  newNavLogoHTML
);

// CSS de Alta Robustez para o Cabeçalho (Injetado nos estilos mestres)
const headerMasterCSS = `
<style id="juliana-header-fix-styles">
/* ==========================================================================
   CABEÇALHO PERFEITO: NOME GRANDE DA ARQUITETA & ANTI-QUEBRA DE TEXTO
   ========================================================================== */
.navbar {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  height: auto !important;
  min-height: 4.8rem !important;
  box-sizing: border-box !important;
  width: 100% !important;
  background: rgba(252, 251, 250, 0.94) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(85, 72, 63, 0.08) !important;
}

.navbar .padding-global {
  padding-left: clamp(1.25rem, 3vw, 3.5rem) !important;
  padding-right: clamp(1.25rem, 3vw, 3.5rem) !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.navbar .container {
  max-width: 100% !important;
  width: 100% !important;
}

.navbar-wrap {
  width: 100% !important;
}

.navbar .site-grid {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  flex-wrap: nowrap !important;
  gap: 1.5rem !important;
}

/* 1. NOME DA ARQUITETA EM DESTAQUE GRANDE E IMPONENTE */
.nav-logo,
.nav-logo.w-nav-brand,
.navbar .nav-logo {
  width: auto !important;
  max-width: none !important;
  min-width: 0 !important;
  overflow: visible !important;
  display: inline-flex !important;
  align-items: center !important;
  flex-shrink: 0 !important;
  text-decoration: none !important;
}

.nav-logo-el,
.navbar .nav-logo-el {
  width: auto !important;
  max-width: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  white-space: nowrap !important;
}

.nav-architect-name,
.nav-logo-el .nav-architect-name,
.navbar .nav-logo-el span:first-child {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(22px, 2.2vw, 30px) !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: #1f1a17 !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  display: block !important;
}

.nav-architect-sub,
.nav-logo-el .nav-architect-sub,
.navbar .nav-logo-el span:last-child {
  font-size: 9.5px !important;
  letter-spacing: 0.24em !important;
  text-transform: uppercase !important;
  color: #6e6259 !important;
  font-weight: 600 !important;
  display: block !important;
  margin-top: 3px !important;
  white-space: nowrap !important;
  line-height: 1 !important;
}

/* 2. RELÓGIO & CIDADE DISCRETO E COMPACTO (SJC · BR) */
.nav-time-loc {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin-left: clamp(1rem, 2vw, 2.5rem) !important;
  margin-right: auto !important;
  flex-shrink: 0 !important;
  white-space: nowrap !important;
}

.nav-time-loc div[d-time] {
  color: #1f1a17 !important;
  font-weight: 700 !important;
  font-size: 13.5px !important;
  line-height: 1.2 !important;
}

.nav-time-loc #clockTagline {
  color: #6e6259 !important;
  font-weight: 600 !important;
  font-size: 11.5px !important;
  letter-spacing: 0.08em !important;
  line-height: 1.2 !important;
}

/* 3. MENU & BOTÃO DE CONTATO SEM QUEBRAS */
.menu-wrap {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  flex-shrink: 0 !important;
  margin-left: auto !important;
}

.navbar_menu-wrap {
  display: flex !important;
  align-items: center !important;
  gap: clamp(1rem, 1.8vw, 2rem) !important;
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
}

.navbar_menu {
  display: flex !important;
  align-items: center !important;
  gap: clamp(1rem, 1.5vw, 1.75rem) !important;
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
}

.navbar-link-wrap,
.navbar-link-wrap a,
.navbar-link-wrap a div,
.navbar .nav-link-el,
.navbar .nav-link-el div,
.navbar .nav-link-el span {
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #1f1a17 !important;
}

.navbar .nav-link-el:hover,
.navbar .nav-link-el:hover div {
  color: #8c7b70 !important;
}

.contact-link-wrap {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.nav-contact-btn {
  white-space: nowrap !important;
  background: #1f1a17 !important;
  color: #ffffff !important;
  padding: 0.6rem 1.35rem !important;
  border-radius: 999px !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.12) !important;
  cursor: pointer !important;
  border: 1px solid #1f1a17 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.25s ease !important;
}

.nav-contact-btn span {
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 13.5px !important;
  letter-spacing: 0.04em !important;
  white-space: nowrap !important;
}

.nav-contact-btn:hover {
  background: #443b35 !important;
  border-color: #443b35 !important;
  transform: translateY(-1px) !important;
}

/* Responsividade de Tela Média (Notebooks 1024px a 1300px) */
@media (max-width: 1250px) {
  .nav-time-loc {
    display: none !important;
  }
}

@media (max-width: 991px) {
  .navbar_menu-wrap {
    display: none !important;
  }
  .navber_menu-button {
    display: flex !important;
  }
  .nav-architect-name {
    font-size: 20px !important;
  }
}
</style>
`;

// Inserir antes de </head>
html = html.replace('</head>', headerMasterCSS + '\n</head>');

// C. Refinar Hero Heading (Slogan de impacto sem quebras estranhas)
html = html.replace(
  /<h2 data-hero-split="" id="heroSplit" class="heading-style-h3">.*?<\/h2>/,
  `<h2 data-hero-split="" id="heroSplit" class="heading-style-h3" style="max-width:62rem; text-wrap:balance;">Projetos para viver melhor.<br><span style="font-size:0.82em; opacity:0.88; font-weight:400; display:block; margin-top:0.75rem;">Arquitetura residencial e interiores com alma e precisão técnica em São José dos Campos.</span></h2>`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ index.html atualizado com fotos da Juliana e Cabeçalho Imponente!');

// ==========================================
// 2. ATUALIZAR residencia-alphaville.html
// ==========================================
let resHtml = fs.readFileSync(resPath, 'utf8');

resHtml = resHtml.replace(
  /<a aria-label="go to home page" id="w-node-b1c66881-d48d-0bc3-9724-d9edc5424dc6-c5424dc1"[\s\S]*?<\/a>/,
  newNavLogoHTML
);

resHtml = resHtml.replace('</head>', headerMasterCSS + '\n</head>');

fs.writeFileSync(resPath, resHtml, 'utf8');
console.log('✅ residencia-alphaville.html atualizado.');

// ==========================================
// 3. SINCRONIZAR COM E:
// ==========================================
const targetDirE = 'E:/Portfólio-site/portfólio-raphael-codado-na-mão/clones/arquitetura/juliana-donzelli';
if (fs.existsSync(targetDirE)) {
  fs.copyFileSync(indexPath, path.join(targetDirE, 'index.html'));
  fs.copyFileSync(resPath, path.join(targetDirE, 'residencia-alphaville.html'));
  console.log('✅ Sincronizado com o drive E: com sucesso!');
}

console.log('--- Concluído com Sucesso! ---');
