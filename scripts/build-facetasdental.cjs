const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)');
const indexPath = path.join(TARGET_DIR, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');
console.log('Original index.html size:', html.length);

// 1. Update Title and Meta Tags
html = html.replace(/<title>[^<]*<\/title>/i, '<title>Dra. Adrieli Pereira | Lentes em Resina e Facetas Dentais em Campinas</title>');

// Remove old meta description / og tags if present, and inject SEO & Schema.org
const seoMeta = `
  <meta name="description" content="Especialista em Lentes em Resina Estratificada em Campinas - SP. Mais de 10 anos transformando sorrisos com máxima naturalidade e sem desgastes agressivos. Agende sua consulta com a Dra. Adrieli Pereira.">
  <meta property="og:title" content="Dra. Adrieli Pereira | Lentes em Resina e Odontologia Estética">
  <meta property="og:description" content="Sorrisos naturais e harmônicos com Lentes em Resina Estratificada. Conheça a técnica da Dra. Adrieli Pereira em Campinas - SP.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.facetasdental.com.br/">
  <meta property="og:image" content="assets/client/img/corpo/DSC01351.jpg">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Dra. Adrieli Pereira - Martins Clinic Odontologia",
    "image": "assets/client/img/corpo/DSC01351.jpg",
    "telephone": "+55-19-98196-3061",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Barbosa da Cunha, 754",
      "addressLocality": "Campinas",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dra.adrielipereira/",
      "https://www.facetasdental.com.br/"
    ]
  }
  </script>
`;

html = html.replace('</head>', `${seoMeta}\n</head>`);

// 2. Add Custom Styling for WhatsApp Button, FAQ Accordion, Gallery, and Custom Details
const customStyles = `
  <style>
    /* Styling adjustments for Dra. Adrieli Pereira */
    .brand-logo-custom {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }
    .brand-logo-img {
      max-height: 38px;
      width: auto;
      object-fit: contain;
    }
    .brand-logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .brand-logo-name {
      font-family: var(--_fonts---heading--family, inherit);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
      color: #1a1a1a;
      text-transform: uppercase;
    }
    .brand-logo-sub {
      font-size: 0.68rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #666;
    }

    /* Floating WhatsApp Button */
    .whatsapp-float {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #25D366;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 50px;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
      text-decoration: none;
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .whatsapp-float:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
      color: #ffffff;
    }
    .whatsapp-float svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    @media (max-width: 479px) {
      .whatsapp-float span {
        display: none;
      }
      .whatsapp-float {
        padding: 14px;
        bottom: 20px;
        right: 20px;
        border-radius: 50%;
      }
    }

    /* FAQ Accordion Styling in harmony with Nova Dental */
    .faq-section {
      padding: clamp(60px, 8vw, 120px) 0;
      background-color: var(--_colors---background-white, #fafafa);
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }
    .faq-accordion {
      max-width: 860px;
      margin: 40px auto 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .faq-item {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .faq-item:hover {
      border-color: rgba(0, 0, 0, 0.18);
    }
    .faq-item.is-active {
      border-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
    }
    .faq-question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 28px;
      background: none;
      border: none;
      text-align: left;
      font-size: 1.15rem;
      font-weight: 500;
      color: #111111;
      cursor: pointer;
      gap: 16px;
    }
    .faq-icon {
      width: 24px;
      height: 24px;
      min-width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, background 0.3s ease;
    }
    .faq-item.is-active .faq-icon {
      transform: rotate(45deg);
      background: #111111;
      color: #ffffff;
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
      padding: 0 28px;
      color: #555555;
      font-size: 0.98rem;
      line-height: 1.65;
    }
    .faq-item.is-active .faq-answer {
      max-height: 400px;
      padding: 0 28px 24px;
    }

    /* Cases Gallery Styling */
    .gallery-section {
      padding: clamp(60px, 8vw, 120px) 0;
      background: #ffffff;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 48px;
    }
    .gallery-card {
      border-radius: 20px;
      overflow: hidden;
      background: #f7f7f7;
      border: 1px solid rgba(0,0,0,0.06);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
      display: flex;
      flex-direction: column;
    }
    .gallery-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.08);
    }
    .gallery-card img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      display: block;
    }
    .gallery-card-info {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .gallery-card-badge {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
      color: #888;
    }
    .gallery-card-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111;
      margin: 0;
    }
    .gallery-disclaimer {
      margin-top: 36px;
      font-size: 0.8rem;
      color: #777;
      text-align: center;
      line-height: 1.5;
      max-width: 720px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Polish for Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      .whatsapp-float, .gallery-card, .faq-answer, .faq-icon {
        transition: none !important;
        animation: none !important;
      }
    }
  </style>
`;

html = html.replace('</head>', `${customStyles}\n</head>`);

fs.writeFileSync(indexPath, html);
console.log('Appended custom styles & SEO.');
