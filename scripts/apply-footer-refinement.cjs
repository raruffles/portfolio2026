const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

function updateFooter(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Atualizar o bloco customStyles para que o logo branco seja apenas no header e o rodapé tenha layout impecável
  const customStylesMatch = html.match(/<style id="dr-ricardo-master-custom-styles">([\s\S]*?)<\/style>/i);
  if (customStylesMatch) {
    let styles = customStylesMatch[1];

    // Remove referências de .footer__logo do filtro branco
    styles = styles.replace(/\.footer__logo img,?\s*/g, '');
    styles = styles.replace(/\.footer__logo-link img,?\s*/g, '');

    // Adiciona o bloco refinado do rodapé se ainda não estiver presente
    if (!styles.includes('/* 8. Rodapé Refinado & Impecável */')) {
      const footerStyles = `
  /* 8. Rodapé Refinado & Impecável */
  .footer {
    background-color: #ffffff !important;
    border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
    padding-top: 4.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .footer__wrap {
    display: grid !important;
    grid-template-columns: 1.2fr 1fr 1.3fr !important;
    gap: 3rem !important;
    align-items: start !important;
    width: 100% !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  @media (max-width: 991px) {
    .footer__wrap {
      grid-template-columns: 1fr 1fr !important;
      gap: 2.5rem !important;
    }
  }
  @media (max-width: 640px) {
    .footer__wrap {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
  }
  .footer__logo-box {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1.25rem !important;
  }
  .footer__logo {
    height: auto !important;
    max-width: 240px !important;
  }
  .footer__logo img,
  .footer__logo-link img {
    filter: none !important;
    opacity: 1 !important;
    height: 48px !important;
    width: auto !important;
    display: block !important;
    object-fit: contain !important;
  }
  .footer__logo-box p {
    color: #666660 !important;
    font-size: 0.95rem !important;
    line-height: 1.55 !important;
    margin: 0 !important;
    max-width: 320px !important;
  }
  .footer__nav {
    display: contents !important;
  }
  .footer__nav-col {
    display: flex !important;
    flex-direction: column !important;
    gap: 1.25rem !important;
    width: 100% !important;
    min-width: 160px !important;
  }
  .footer__nav-col .text-b1--medium {
    font-size: 0.95rem !important;
    font-weight: 700 !important;
    color: #1a1a18 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    margin-bottom: 0.25rem !important;
  }
  .footer__nav-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.75rem !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }
  .footer__nav-item {
    display: block !important;
  }
  .footer__link {
    font-size: 0.95rem !important;
    color: #444440 !important;
    text-decoration: none !important;
    white-space: nowrap !important;
    word-break: keep-all !important;
    transition: color 0.2s ease !important;
    display: inline-block !important;
  }
  .footer__link:hover {
    color: #d4af37 !important;
  }
  .footer__bottom {
    grid-column: 1 / -1 !important;
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
    padding-top: 2rem !important;
    margin-top: 3.5rem !important;
    width: 100% !important;
    flex-wrap: wrap !important;
    gap: 1.5rem !important;
  }
  .footer__rights {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 0.85rem !important;
    flex-wrap: wrap !important;
    color: #777770 !important;
    font-size: 0.85rem !important;
  }
  .footer__rights .text-b1--book {
    color: #777770 !important;
    font-size: 0.85rem !important;
  }
  .footer__rights .dot-divider {
    width: 4px !important;
    height: 4px !important;
    border-radius: 50% !important;
    background: #bbb !important;
    display: inline-block !important;
  }
  .footer__rights .made-by {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.35rem !important;
  }
  .footer__legal {
    display: flex !important;
    gap: 1.5rem !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }
  .footer__legal .footer__link {
    color: #888880 !important;
    font-size: 0.85rem !important;
  }
  .footer__legal .footer__link:hover {
    color: #111 !important;
  }
`;
      styles = styles + footerStyles;
    }

    html = html.replace(/<style id="dr-ricardo-master-custom-styles">[\s\S]*?<\/style>/i, `<style id="dr-ricardo-master-custom-styles">${styles}</style>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated footer in ${filePath}`);
}

updateFooter(clonePath);
updateFooter(previaPath);

console.log('Footer update complete!');
