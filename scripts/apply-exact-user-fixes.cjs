const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

let html = fs.readFileSync(clonePath, 'utf8');

// 1. TROCA DA IMAGEM DO HOMEM DE OLHOS COBERTOS (KE)
// Card 01 - Rinoplastia
html = html.replace(/assets\/11_KE_After_Side_Pro\.jpg/g, 'assets/rinoplastia-interna.png');
// Depoimentos Slide 1
html = html.replace(/assets\/10_KE_Front_View_Aft\.png/g, 'assets/procedimento-faciais.jpg');
// Modal de agendamento
html = html.replace(/alt="Rinoplastia" src="[^"]*"/g, 'alt="Rinoplastia" src="assets/rinoplastia-interna.png"');

// Neutralizar scale(0) no CSS legado do Webflow
html = html.replace(/\.services__col-item\.active\s+\.service-card__media\s*\{\s*transform:\s*scale\(0\);?\s*\}/g, '.services__col-item.active .service-card__media { transform: none !important; }');

// 2. ATUALIZAÇÃO DO BLOCO DE ESTILOS PERSONALIZADOS
const customStyles = `
<style id="dr-ricardo-master-custom-styles">
  /* 1. Logo com filtro branco para contraste impecável em fundos escuros */
  .logo__img img,
  .nav-logo img,
  .footer__logo img,
  .nav-logo-link img,
  .footer__logo-link img,
  img[src*="01-home-ricardo-andrade-logo-menu.png"] {
    filter: brightness(0) invert(1) !important;
    opacity: 0.95 !important;
    transition: opacity 0.3s ease !important;
  }
  .logo__img img:hover,
  .footer__logo img:hover {
    opacity: 1 !important;
  }

  /* 2. Hero Section: Imagem cinematográfica de alta autoridade e estética */
  .hero {
    position: relative !important;
    background-color: #121316 !important;
    overflow: hidden !important;
  }
  .hero::before {
    content: '' !important;
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(90deg, rgba(15, 17, 23, 0.88) 0%, rgba(15, 17, 23, 0.55) 50%, rgba(15, 17, 23, 0.15) 80%, rgba(15, 17, 23, 0.6) 100%) !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }
  .hero .container {
    position: relative !important;
    z-index: 2 !important;
  }
  .hero__bg {
    background-image: url('assets/hero-ricardo-andrade.avif') !important;
    background-position: 88% center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    opacity: 0.92 !important;
  }
  @media screen and (max-width: 767px) {
    .hero::before {
      background: linear-gradient(180deg, rgba(15, 17, 23, 0.9) 0%, rgba(15, 17, 23, 0.65) 55%, rgba(15, 17, 23, 0.85) 100%) !important;
    }
    .hero__bg {
      background-position: 75% center !important;
      opacity: 0.85 !important;
    }
  }

  /* 3. Grid 3x3 de Serviços: Alinhamento perfeito lado a lado */
  .services__col-list {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    grid-column-gap: 1.5rem !important;
    grid-row-gap: 1.5rem !important;
    width: 100% !important;
  }
  @media screen and (max-width: 991px) {
    .services__col-list {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-column-gap: 1.25rem !important;
      grid-row-gap: 1.25rem !important;
    }
  }
  @media screen and (max-width: 640px) {
    .services__col-list {
      grid-template-columns: 1fr !important;
      grid-column-gap: 1rem !important;
      grid-row-gap: 1rem !important;
    }
  }

  /* 4. Imagens de Agendar Consulta: NUNCA SUMIR OU DIMINUIR, EFEITO HOVER SUAVE */
  .service-card .service-card__media,
  .service-card:hover .service-card__media,
  .services__col-item.active .service-card__media,
  .services__col-item:hover .service-card__media {
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }

  .service-card__active-bg {
    display: none !important;
  }

  .services__col-item.active .service-card__title,
  .service-card:hover .service-card__title {
    color: #111110 !important;
  }

  .services__col-item.active .service-card__number,
  .service-card:hover .service-card__number {
    color: #999990 !important;
  }

  .services__col-item.active .service-card__descr,
  .service-card:hover .service-card__descr {
    opacity: 1 !important;
  }

  .service-card {
    height: auto !important;
    min-height: 480px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: stretch !important;
    padding: 1.5rem !important;
    background: #ffffff !important;
    border-radius: 1.5rem !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
    position: relative !important;
    overflow: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
    pointer-events: auto !important;
    cursor: default !important;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
  }

  .service-card:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.1) !important;
    border-color: rgba(212, 175, 55, 0.5) !important;
  }

  .service-card__top {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin-bottom: 1.25rem !important;
    z-index: 5 !important;
  }

  .service-card__top-caption {
    cursor: pointer !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    text-shadow: none !important;
    font-family: inherit !important;
  }

  .service-card__top-text {
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    color: #1a1a18 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    text-shadow: none !important;
  }

  .service-card__top-plus {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50% !important;
    background: #f4f4f0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    color: #1a1a18 !important;
    transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease !important;
  }

  .service-card:hover .service-card__top-plus {
    transform: rotate(90deg) !important;
    background: #d4af37 !important;
    color: #000 !important;
  }

  .service-card__media {
    width: 100% !important;
    height: 220px !important;
    border-radius: 1rem !important;
    overflow: hidden !important;
    margin-bottom: 1.25rem !important;
    background: #f8f8f6 !important;
    position: relative !important;
    flex-shrink: 0 !important;
  }

  .service-card__media-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .service-card:hover .service-card__media-img {
    transform: scale(1.06) !important;
  }

  .service-card__info {
    display: flex !important;
    flex-direction: column !important;
    flex-grow: 1 !important;
    width: 100% !important;
    text-align: left !important;
  }

  .service-card__number {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: #999990 !important;
    margin-bottom: 0.4rem !important;
  }

  .service-card__title {
    margin-bottom: 0.6rem !important;
  }

  .service-card__title h3 {
    font-size: 1.35rem !important;
    font-weight: 700 !important;
    line-height: 1.28 !important;
    color: #111110 !important;
    white-space: normal !important;
  }

  .service-card__tag {
    margin-bottom: 0.85rem !important;
  }

  .service-card__tag span {
    font-size: 0.8rem !important;
    font-weight: 600 !important;
    color: #92752e !important;
    background: rgba(212, 175, 55, 0.12) !important;
    padding: 5px 12px !important;
    border-radius: 6px !important;
    display: inline-block !important;
    white-space: nowrap !important;
  }

  .service-card__descr {
    margin-top: auto !important;
  }

  .service-card__descr p {
    font-size: 0.9rem !important;
    line-height: 1.55 !important;
    color: #555550 !important;
  }

  /* 5. Bloco de Alto Contraste: Outros Procedimentos Realizados */
  .other-procedures-luxury-box {
    margin-top: clamp(40px, 6vw, 70px) !important;
    background: #181715 !important;
    border: 1px solid rgba(212, 175, 55, 0.4) !important;
    border-radius: 24px !important;
    padding: clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px) !important;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35) !important;
    text-align: left !important;
    position: relative !important;
    width: 100% !important;
  }
  .other-proc-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin-bottom: 14px !important;
  }
  .badge-gold-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: #d4af37 !important;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.8) !important;
    display: inline-block !important;
  }
  .badge-gold-text {
    font-size: 0.82rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    color: #d4af37 !important;
  }
  .other-proc-title {
    color: #ffffff !important;
    font-size: clamp(1.6rem, 3.2vw, 2.3rem) !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
    margin: 0 0 14px 0 !important;
  }
  .other-proc-subtitle {
    color: #d1d5db !important;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem) !important;
    line-height: 1.6 !important;
    margin: 0 0 32px 0 !important;
    max-width: 880px !important;
  }
  .other-proc-pills-wrap {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    margin-bottom: 36px !important;
  }
  .other-proc-pill {
    display: inline-flex !important;
    align-items: center !important;
    background: #23221f !important;
    border: 1px solid rgba(212, 175, 55, 0.35) !important;
    border-left: 4px solid #d4af37 !important;
    border-radius: 10px !important;
    padding: 10px 18px !important;
    color: #f3f4f6 !important;
    font-size: 0.95rem !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    transition: all 0.25s ease !important;
  }
  .other-proc-pill:hover {
    background: #2c2a26 !important;
    border-color: #d4af37 !important;
    transform: translateY(-2px) !important;
  }
  .other-proc-cta-area {
    margin-top: 10px !important;
  }
  .other-proc-whatsapp-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 10px !important;
    background: #d4af37 !important;
    color: #0d0c0a !important;
    font-weight: 700 !important;
    font-size: 1rem !important;
    padding: 15px 32px !important;
    border-radius: 999px !important;
    text-decoration: none !important;
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.35) !important;
    transition: all 0.3s ease !important;
    text-shadow: none !important;
    border: none !important;
    cursor: pointer !important;
  }
  .other-proc-whatsapp-btn:hover {
    background: #e2c054 !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.5) !important;
  }
  .other-proc-whatsapp-btn span,
  .other-proc-whatsapp-btn svg {
    text-shadow: none !important;
  }

  /* 6. Eliminar completamente duplicidade de texto por text-shadow */
  .btn,
  .btn__text,
  .text-btn,
  .service-card__top-text,
  .service-card__top-caption,
  .nav-list__link,
  .footer__link,
  .booking-form__support-link,
  .other-proc-whatsapp-btn,
  [data-stagger-link-text] {
    text-shadow: none !important;
  }
</style>
`;

if (html.includes('id="dr-ricardo-master-custom-styles"')) {
  html = html.replace(/<style id="dr-ricardo-master-custom-styles">[\s\S]*?<\/style>/i, customStyles);
} else {
  html = html.replace('</head>', `${customStyles}\n</head>`);
}

fs.writeFileSync(clonePath, html, 'utf8');
fs.writeFileSync(previaPath, html, 'utf8');

console.log('Applied exact user fixes to clone and previa!');
