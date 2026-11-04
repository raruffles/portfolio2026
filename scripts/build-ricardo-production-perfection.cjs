const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

let html = fs.readFileSync(clonePath, 'utf8');

// 1. CLEAN UP YOUTUBE SECTION MARKUP & INLINE STYLES
html = html.replace(
  '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;" class="youtube-grid">',
  '<div class="youtube-grid">'
);

html = html.replace(
  '<div style="position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); border: 1px solid rgba(212,175,55,0.3);">',
  '<div class="youtube-media-wrapper">'
);

// 2. CLEAN UP AGENDAMENTO CTA BOX
html = html.replace(
  '<div style="background: linear-gradient(145deg, #24221f 0%, #191816 100%); border: 1px solid rgba(212,175,55,0.25); border-radius: 32px; padding: 60px 40px; box-shadow: 0 30px 60px rgba(0,0,0,0.4); position: relative; overflow: hidden;">',
  '<div class="agendamento-cta-box">'
);

// 3. REPLACE ALL 9 BOOKING MODAL DENTAL TREATMENTS WITH PLASTIC SURGERY TREATMENTS
const oldTreatmentsBlockRegex = /<div class="booking-treatments__list">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div data-tab-content="2"/i;
const newTreatmentsList = `<div class="booking-treatments__list">
  <input id="treatment-rinoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="rinoplastia" checked/>
  <label for="treatment-rinoplastia" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Rinoplastia" src="assets/11_KE_After_Side_Pro.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Rinoplastia Estruturada</div>
  </label>

  <input id="treatment-protese-mama" type="radio" name="treatment" required="" class="booking-treatments__input" value="protese-mama"/>
  <label for="treatment-protese-mama" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Prótese de Mama R24R" src="assets/procedimento-mamoplastia.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Prótese de Mama R24R</div>
  </label>

  <input id="treatment-blefaroplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="blefaroplastia"/>
  <label for="treatment-blefaroplastia" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Blefaroplastia" src="assets/blefaroplastia-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Blefaroplastia (Pálpebras)</div>
  </label>

  <input id="treatment-mastopexia" type="radio" name="treatment" required="" class="booking-treatments__input" value="mastopexia"/>
  <label for="treatment-mastopexia" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Mastopexia" src="assets/contorno-corporal.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Mastopexia</div>
  </label>

  <input id="treatment-frontoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="frontoplastia"/>
  <label for="treatment-frontoplastia" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Frontoplastia" src="assets/7_CR_Side_Profile_Af.png" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Frontoplastia &amp; Lifting</div>
  </label>

  <input id="treatment-abdominoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="abdominoplastia"/>
  <label for="treatment-abdominoplastia" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Abdominoplastia" src="assets/contorno-corporal.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Abdominoplastia</div>
  </label>

  <input id="treatment-mini-lipo" type="radio" name="treatment" required="" class="booking-treatments__input" value="mini-lipo"/>
  <label for="treatment-mini-lipo" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Mini Lipo a Laser" src="assets/cirurgia-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Mini Lipo a Laser</div>
  </label>

  <input id="treatment-harmonizacao" type="radio" name="treatment" required="" class="booking-treatments__input" value="harmonizacao"/>
  <label for="treatment-harmonizacao" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Harmonização Facial" src="assets/doutor-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Harmonização Facial</div>
  </label>

  <input id="treatment-consulta" type="radio" name="treatment" required="" class="booking-treatments__input" value="consulta"/>
  <label for="treatment-consulta" data-modal-anim="card" class="booking-treatment-card">
    <div class="booking-treatment-card__icon-wrap">
      <img width="52" height="52" alt="Consulta Médica de Avaliação" src="assets/consulta-medica.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
    </div>
    <div class="booking-treatment-card__label">Consulta de Avaliação</div>
  </label>
</div></div></div><div data-tab-content="2"`;

if (oldTreatmentsBlockRegex.test(html)) {
  html = html.replace(oldTreatmentsBlockRegex, newTreatmentsList);
  console.log('Successfully replaced booking treatments with Plastic Surgery procedures!');
}

// 4. INJECT COMPREHENSIVE RESPONSIVE AND LUXURY POLISH CSS
const masterResponsiveCSS = `
<style id="ricardo-responsive-master">
/* ==========================================================================
   DR. RICARDO ANDRADE — RESPONSIVE & SURGICAL ART DIRECTION MASTER
   ========================================================================== */

/* 1. Global Box Model & Zero Overflow */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *:before, *:after {
  box-sizing: border-box;
}

.main-wrapper {
  overflow-x: clip !important;
  max-width: 100vw !important;
  position: relative;
}

/* 2. Fluid Typography & Headlines */
.hero__title h1 {
  font-size: clamp(2rem, 5.2vw, 4.4rem) !important;
  line-height: 1.12 !important;
  letter-spacing: -0.02em;
}

.intro__title h2, h2.text-h2 {
  font-size: clamp(1.8rem, 4.2vw, 3.2rem) !important;
  line-height: 1.18 !important;
  letter-spacing: -0.015em;
}

/* 3. Anti-Overflow for Background Decorative Text */
.why-us-card__bg-text {
  max-width: 100% !important;
  overflow: hidden !important;
  text-overflow: clip !important;
  white-space: nowrap !important;
  font-size: clamp(2rem, 7.5vw, 5.5rem) !important;
  pointer-events: none;
  opacity: 0.12 !important;
}

/* 4. YouTube Section Grid & Media (Fully Responsive) */
.section-youtube {
  padding: clamp(60px, 8vw, 110px) 0 !important;
}

.youtube-grid {
  display: grid !important;
  grid-template-columns: 1.1fr 0.9fr !important;
  gap: clamp(28px, 4vw, 56px) !important;
  align-items: center !important;
  width: 100%;
}

.youtube-media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  border: 1px solid rgba(212,175,55,0.3);
}

.youtube-media-wrapper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block;
  transition: transform 0.4s ease;
}

.youtube-media-wrapper:hover img {
  transform: scale(1.025);
}

@media screen and (max-width: 991px) {
  .youtube-grid {
    grid-template-columns: 1fr !important;
    gap: 36px !important;
    text-align: center;
  }
  .youtube-grid .caption {
    justify-content: center !important;
  }
  .youtube-media-wrapper {
    max-width: 580px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 479px) {
  .youtube-media-wrapper {
    border-radius: 14px;
  }
}

/* 5. Agendamento CTA Box (Fully Responsive) */
.section-contato-cta {
  padding: clamp(50px, 7vw, 90px) 0 !important;
}

.agendamento-cta-box {
  background: linear-gradient(145deg, #24221f 0%, #191816 100%);
  border: 1px solid rgba(212,175,55,0.25);
  border-radius: clamp(20px, 3vw, 32px);
  padding: clamp(32px, 5vw, 60px) clamp(20px, 4vw, 40px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.agendamento-cta-box h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem) !important;
  line-height: 1.25 !important;
}

.agendamento-cta-box p {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem) !important;
}

@media screen and (max-width: 767px) {
  .agendamento-cta-box .button-group {
    flex-direction: column !important;
    width: 100% !important;
  }
  .agendamento-cta-box .text-btn {
    width: 100% !important;
    justify-content: center !important;
  }
}

/* 6. Other Procedures Grid */
.other-procedures-wrapper {
  margin-top: clamp(32px, 5vw, 56px);
  padding: clamp(24px, 4vw, 40px);
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

@media screen and (max-width: 640px) {
  .other-procedures-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}

@media screen and (max-width: 420px) {
  .other-procedures-grid {
    grid-template-columns: 1fr;
  }
}

/* 7. Booking Modal Responsive */
.booking-modal__inner {
  max-height: 90vh;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .booking-modal__box {
    width: 95vw !important;
    padding: 20px 16px !important;
  }
  .booking-treatment-card {
    padding: 12px 14px !important;
  }
}

/* 8. Touch Targets Accessible (min 44px) */
a, button, .button, input, select, label.booking-treatment-card, label.booking-doctor-card {
  min-height: 44px;
}

/* 9. Header Navigation Mobile */
.header__logo-img {
  max-height: 48px !important;
  width: auto !important;
  object-fit: contain;
}

@media screen and (max-width: 767px) {
  .header__logo-img {
    max-height: 38px !important;
  }
}
</style>
`;

if (html.includes('ricardo-responsive-master')) {
  html = html.replace(/<style id="ricardo-responsive-master">[\s\S]*?<\/style>/, masterResponsiveCSS);
} else {
  html = html.replace('</head>', `${masterResponsiveCSS}\n</head>`);
}

// Write to clone and preview
fs.writeFileSync(clonePath, html, 'utf8');
fs.writeFileSync(previaPath, html, 'utf8');

console.log('Production refactor complete for Dr. Ricardo Andrade!');
