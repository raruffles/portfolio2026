const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

let html = fs.readFileSync(clonePath, 'utf8');

// 1. REPLACES OF OLD ASSETS WITH NEW HIGH-RES SURGICAL & FREE STOCK ASSETS
const assetReplacements = [
  // Old placeholder 01.jpg, 03.jpg, etc.
  { from: 'assets/01.jpg', to: 'assets/clinica-foto-01.jpg' },
  { from: 'assets/03.jpg', to: 'assets/procedimento-mamoplastia.jpg' },
  { from: 'assets/04.jpg', to: 'assets/centro-cirurgico.jpg' },
  { from: 'assets/05.jpg', to: 'assets/contorno-corporal.jpg' },
  { from: 'assets/55.jpg', to: 'assets/doutor-interna.jpg' },

  // Testimonial avatars
  { from: 'assets/6a4c2730354c2eebb44a58fe_testimonials-mini-img-1.avif', to: 'assets/paciente-avatar-1.jpg' },
  { from: 'assets/6a4c27306fd224473187678f_testimonials-mini-img-2.avif', to: 'assets/paciente-avatar-2.jpg' },
  { from: 'assets/6a4c273039f82e57e3eec96b_testimonials-mini-img-3.avif', to: 'assets/paciente-avatar-3.jpg' },
  { from: 'assets/6a4c2730c1be52cf30101a22_testimonials-mini-img-4.avif', to: 'assets/paciente-avatar-4.jpg' },
  { from: 'assets/6a4c27307a20e8c9603bef34_testimonials-mini-img-5.avif', to: 'assets/paciente-avatar-5.jpg' },

  // Booking modal doctor avatars
  { from: 'assets/6aa229a0982135698a8b2683_Emily_Peterson_min.avif', to: 'assets/dr-ricardo-principal.jpg' },
  { from: 'assets/6aa229a0664cbae0a18b4923_Lucas_Marin_min.avif', to: 'assets/doutor-interna.jpg' },
  { from: 'assets/6aa229a0b8d93f71a9b6c08f_Olivia_Hartman_min.avif', to: 'assets/consulta-medica.jpg' },
  { from: 'assets/6aa229a088aa8876c22fbe1e_Marcus_Bennett_min.avif', to: 'assets/centro-cirurgico.jpg' },
  { from: 'assets/6aa2299f085baf5a96f7a936_Liam_Brooks_min.avif', to: 'assets/clinica-foto-01.jpg' }
];

assetReplacements.forEach(({ from, to }) => {
  html = html.split(from).join(to);
});

// Update booking modal texts to plastic surgery procedures
html = html.replace(/Dr\. Emily Peterson/g, 'Dr. Ricardo Andrade (Cirurgião Principal)');
html = html.replace(/Dr\. Lucas Marin/g, 'Equipe Cirúrgica Hospitalar');
html = html.replace(/Dr\. Olivia Hartman/g, 'Enfermagem & Pós-Operatório R24R');
html = html.replace(/Dr\. Marcus Bennett/g, 'Anestesiologia & Centro Cirúrgico');
html = html.replace(/Dr\. Liam Brooks/g, 'Concierge & Atendimento VIP');

// 2. ADD COMPREHENSIVE RESPONSIVE CSS IN HEAD
const responsiveCSS = `
<style id="ricardo-responsive-master">
/* === RESPONSIVE MASTER STYLES - DR. RICARDO ANDRADE === */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
}

.main-wrapper {
  overflow-x: clip !important;
  max-width: 100vw !important;
}

/* Evitar estouro de texto decorativo de fundo */
.why-us-card__bg-text {
  max-width: 100% !important;
  overflow: hidden !important;
  text-overflow: clip !important;
  white-space: nowrap !important;
  font-size: clamp(2.5rem, 8vw, 6rem) !important;
  pointer-events: none;
}

/* Header & Logo responsivo */
.header__logo-img {
  max-height: 48px !important;
  width: auto !important;
  object-fit: contain !important;
}

@media screen and (max-width: 767px) {
  .header__logo-img {
    max-height: 38px !important;
  }
}

/* Bloco YouTube Responsivo */
.youtube-featured-block {
  display: grid !important;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  background: linear-gradient(135deg, rgba(20, 24, 30, 0.96) 0%, rgba(12, 14, 18, 0.98) 100%);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  margin-top: 40px;
  box-sizing: border-box;
  width: 100%;
}

.youtube-featured-block__media {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  aspect-ratio: 16 / 9;
}

.youtube-featured-block__img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block;
  transition: transform 0.4s ease;
}

.youtube-featured-block__media:hover .youtube-featured-block__img {
  transform: scale(1.03);
}

@media screen and (max-width: 991px) {
  .youtube-featured-block {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    padding: 36px 24px !important;
    text-align: center;
  }
  .youtube-featured-block__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .youtube-featured-block__media {
    max-width: 560px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 479px) {
  .youtube-featured-block {
    padding: 24px 16px !important;
    border-radius: 18px;
  }
  .youtube-featured-block h3 {
    font-size: 1.5rem !important;
  }
  .youtube-featured-block p {
    font-size: 0.95rem !important;
  }
}

/* Card Agende sua Consulta Responsivo */
.agendamento-featured-card {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 32px;
  background: linear-gradient(135deg, rgba(26, 30, 36, 0.95) 0%, rgba(16, 18, 22, 0.98) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 24px;
  padding: 40px 48px;
  box-shadow: 0 20px 45px rgba(0,0,0,0.35);
  box-sizing: border-box;
  width: 100%;
}

.agendamento-featured-card__left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.agendamento-featured-card__icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 14px;
  background: rgba(212, 175, 55, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid rgba(212, 175, 55, 0.25);
}

.agendamento-featured-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.agendamento-featured-card__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

@media screen and (max-width: 991px) {
  .agendamento-featured-card {
    flex-direction: column !important;
    align-items: stretch !important;
    text-align: center !important;
    padding: 32px 24px !important;
    gap: 24px !important;
  }
  .agendamento-featured-card__left {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 16px !important;
  }
  .agendamento-featured-card__actions {
    flex-direction: column !important;
    width: 100% !important;
    gap: 12px !important;
  }
  .agendamento-featured-card__actions .button {
    width: 100% !important;
    justify-content: center !important;
    min-height: 48px !important;
  }
}

/* Grid de Outros Procedimentos Realizados */
.other-procedures-wrapper {
  margin-top: 48px;
  padding: 36px 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

.other-procedures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

@media screen and (max-width: 767px) {
  .other-procedures-wrapper {
    padding: 24px 18px !important;
  }
  .other-procedures-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 10px !important;
  }
}

@media screen and (max-width: 479px) {
  .other-procedures-grid {
    grid-template-columns: 1fr !important;
  }
}

/* Hero Title e Tipografia Responsiva */
.hero__title h1 {
  font-size: clamp(2rem, 5.5vw, 4.2rem) !important;
  line-height: 1.15 !important;
}

.intro__title h2 {
  font-size: clamp(1.8rem, 4.5vw, 3.2rem) !important;
  line-height: 1.2 !important;
}

.section-title, h2.text-h2 {
  font-size: clamp(1.8rem, 4.5vw, 3rem) !important;
}

/* Touch Targets acessíveis para celular (mínimo 44px) */
a, button, .button, input, select {
  min-height: 44px;
}

/* Ajuste nos cards da galeria Antes e Depois */
.results-card__media, .before-after-img-wrap {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.results-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Ajuste do Footer em Telas Menores */
@media screen and (max-width: 767px) {
  .footer__wrap {
    gap: 32px !important;
  }
  .footer__contacts-item {
    font-size: 0.95rem;
  }
}
</style>
`;

if (!html.includes('ricardo-responsive-master')) {
  html = html.replace('</head>', `${responsiveCSS}\n</head>`);
} else {
  html = html.replace(/<style id="ricardo-responsive-master">[\s\S]*?<\/style>/, responsiveCSS);
}

// Write to clone and preview
fs.writeFileSync(clonePath, html, 'utf8');
fs.writeFileSync(previaPath, html, 'utf8');

console.log('Successfully updated Dr. Ricardo index.html in both clone and previa!');
