const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

function updateFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Atualizar alinhamento do rosto da modelo na Hero mais à direita
  html = html.replace(/background-position:\s*72%\s*center\s*!important;/g, 'background-position: 88% center !important;');
  
  // 2. Otimizar a altura da seção .why-us no CSS para rolagem ágil e fluida
  const customStylesMatch = html.match(/<style id="dr-ricardo-master-custom-styles">([\s\S]*?)<\/style>/i);
  if (customStylesMatch) {
    let styles = customStylesMatch[1];
    
    // Atualizar posição do hero se ainda não estiver 88%
    styles = styles.replace(/background-position:\s*72%\s*center\s*!important;/g, 'background-position: 88% center !important;');
    
    // Adicionar estilos específicos de fluidez de rolagem para why-us se não existirem
    if (!styles.includes('/* 7. Otimização de rolagem')) {
      const additionalStyles = `
  /* 7. Otimização de rolagem da seção Why-Us: transição imediata e fluida após o último card */
  .why-us {
    height: 200vh !important;
  }
  @media (max-width: 479px) {
    .why-us {
      height: 210vh !important;
    }
  }
  @media screen and (min-width: 1440px) {
    .hero__bg {
      background-position: 90% center !important;
    }
  }
  @media screen and (max-width: 991px) {
    .hero__bg {
      background-position: 84% center !important;
    }
  }
  /* Enquadramento da foto no Card 04 para exibir o rosto completo sem corte */
  .why-us__card-wrap.is-last .why-us-card__img,
  .why-us__card-wrap:nth-child(4) .why-us-card__img {
    object-position: center 12% !important;
  }
`;
      styles = styles + additionalStyles;
      html = html.replace(/<style id="dr-ricardo-master-custom-styles">[\s\S]*?<\/style>/i, `<style id="dr-ricardo-master-custom-styles">${styles}</style>`);
    }
  }

  // 3. Otimizar os cálculos de ScrollTrigger no script why-us-js:
  // Em vez de dividir por totalCards (4) que deixava os últimos 25% (675px) como rolagem morta/travada,
  // dividimos pelas transições ativas (3) com ratio de 0.92, permitindo que ao chegar no último card
  // a transição para a próxima seção seja imediata e sem espera.
  
  // Substituir no bloco desktop
  const oldDesktopPattern = /cardsContainer\.offsetHeight \/ totalCards/g;
  html = html.replace(oldDesktopPattern, 'cardsContainer.offsetHeight * 0.92 / (totalCards - 1)');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateFile(clonePath);
updateFile(previaPath);

console.log('All files updated successfully!');
