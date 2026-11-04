const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)');
const indexPath = path.join(TARGET_DIR, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// Helper for WhatsApp URL
const WHATSAPP_URL = 'https://wa.me/5519981963061?text=Ol%C3%A1%20Dra.%20Adrieli,%20visitei%20o%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20Lentes%20em%20Resina.';
const INSTAGRAM_URL = 'https://www.instagram.com/dra.adrielipereira/';

console.log('Transforming facetasdental clone...');

// ==========================================
// 1. HEADER & LOGO & NAV
// ==========================================
// Replace header logo with Dra. Adrieli Pereira's brand logo
const brandLogoHtml = `
<a href="#" data-header="logo" aria-label="Dra. Adrieli Pereira - Martins Clinic" class="logo w-nav-brand w--current brand-logo-custom">
  <img src="assets/client/img/corpo/LOGOTIPO_mini.png" alt="Dra. Adrieli Pereira" class="brand-logo-img" />
  <div class="brand-logo-text">
    <span class="brand-logo-name">Dra. Adrieli Pereira</span>
    <span class="brand-logo-sub">Lentes em Resina • CROSP 106703</span>
  </div>
</a>
`;

// Replace <a href="/" data-header="logo" ... </a>
html = html.replace(/<a href="\/" data-header="logo"[\s\S]*?<\/a>/i, brandLogoHtml.trim());

// Update Nav Menu Overlay items
const navMenuOverlayRegex = /<nav role="navigation" class="nav-menu-wrap w-nav-menu">[\s\S]*?<\/nav>/i;
const newNavMenuHtml = `
<nav role="navigation" class="nav-menu-wrap w-nav-menu">
  <div class="nav-menu">
    <div class="container nav-menu-container">
      <div class="nav-menu__col-left">
        <ul role="list" class="nav-menu__list">
          <li class="nav-menu__item"><a href="#" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Início</div></a></li>
          <li class="nav-menu__item"><a href="#about" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Sobre a Dra. Adrieli</div></a></li>
          <li class="nav-menu__item"><a href="#services" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Procedimentos</div></a></li>
          <li class="nav-menu__item"><a href="#gallery" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Casos Clínicos</div></a></li>
          <li class="nav-menu__item"><a href="#why-us" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Diferenciais</div></a></li>
          <li class="nav-menu__item"><a href="#testimonials" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Avaliações</div></a></li>
          <li class="nav-menu__item"><a href="#faq" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Dúvidas Frequentes</div></a></li>
          <li class="nav-menu__item"><a href="#team" class="nav-menu__link w-inline-block"><div class="nav-menu__link-text">Corpo Clínico</div></a></li>
        </ul>
      </div>
      <div class="nav-menu__col-right">
        <div class="nav-menu__contacts">
          <div class="nav-menu__contacts-group">
            <div class="text-caption">Atendimento WhatsApp</div>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="nav-menu__contact-link">+55 (19) 98196-3061</a>
          </div>
          <div class="nav-menu__contacts-group">
            <div class="text-caption">Instagram</div>
            <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="nav-menu__contact-link">@dra.adrielipereira</a>
          </div>
          <div class="nav-menu__contacts-group">
            <div class="text-caption">Localização</div>
            <div class="nav-menu__contact-text">Rua Barbosa da Cunha, 754<br/>Jardim Guanabara — Campinas SP</div>
          </div>
          <div class="nav-menu__contacts-group">
            <div class="text-caption">Horário</div>
            <div class="nav-menu__contact-text">Seg - Sex: 8:30h às 18:30h<br/>Sáb: 8:00h às 14:00h</div>
          </div>
          <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-btn w-inline-block" style="margin-top: 16px;">
            <div>(</div><div>Agendar no WhatsApp</div><div>)</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
`;
html = html.replace(navMenuOverlayRegex, newNavMenuHtml.trim());

// ==========================================
// 2. HERO SECTION
// ==========================================
html = html.replace(
  /<h1 data-hero="title" class="text-display">[\s\S]*?<\/h1>/i,
  `<h1 data-hero="title" class="text-display">Seu Sorriso Renovado, <br/>com Naturalidade <span class="text-display-serif">e Excelência</span></h1>`
);

html = html.replace(
  /<p data-hero="cta-text" class="text-b1--book">[\s\S]*?<\/p>/i,
  `<p data-hero="cta-text" class="text-b1--book">Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.</p>`
);

html = html.replace(
  /<a data-stagger-link="" data-hero="cta-btn"[\s\S]*?<\/a>/i,
  `<a data-stagger-link="" data-hero="cta-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-btn w-inline-block"><div>(</div><div data-stagger-link-text="">Agende sua Avaliação</div><div>)</div></a>`
);

// ==========================================
// 3. INTRO / ABOUT SECTION
// ==========================================
html = html.replace(
  /<div data-about="caption" class="caption intro__caption"><div class="caption__dot"><\/div><div class="text-b2--medium">About<\/div><\/div>/i,
  `<div data-about="caption" class="caption intro__caption"><div class="caption__dot"></div><div class="text-b2--medium">Sobre a Dra. Adrieli</div></div>`
);

html = html.replace(
  /<h2 data-about="title" class="h2-grotesk">[\s\S]*?<\/h2>/i,
  `<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">Na Martins Clinic, nossa missão é</span> cuidar das pessoas com <span class="h2-serif">ética, zelo e arte,</span> transformando vidas através de sorrisos únicos e de <span class="h2-serif">máxima naturalidade.</span></h2>`
);

html = html.replace(
  /<div data-about="img" class="intro__media">[\s\S]*?<\/div>/i,
  `<div data-about="img" class="intro__media"><img src="assets/client/img/corpo/DSC01351.jpg" alt="Dra. Adrieli Pereira - Especialista em Lentes em Resina" loading="lazy" width="306" height="326" style="object-fit:cover; border-radius: 20px;" class="intro__media-img"/></div>`
);

html = html.replace(
  /<p data-about="text" class="text-b1--book">[\s\S]*?<\/p>/i,
  `<p data-about="text" class="text-b1--book">Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.</p>`
);

// ==========================================
// 4. SERVICES SECTION
// ==========================================
html = html.replace(
  /<div data-services="caption"[^>]*><div class="caption__dot"><\/div><div class="text-b2--medium">Services<\/div><\/div>/i,
  `<div data-services="caption" class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Procedimentos</div></div>`
);

html = html.replace(
  /<h2 data-services="title" class="h1-grotesk">[\s\S]*?<\/h2>/i,
  `<h2 data-services="title" class="h1-grotesk">Transformando Sorrisos com <span class="h1-serif">Técnicas Modernas</span></h2>`
);

html = html.replace(
  /<p data-services="subtitle" class="text-b1--book">[\s\S]*?<\/p>/i,
  `<p data-services="subtitle" class="text-b1--book">Temos uma equipe pronta para te atender com tecnologia de ponta, tratamentos personalizados e foco total na naturalidade do seu sorriso.</p>`
);

const servicesListRegex = /<div role="list" class="services__col-list w-dyn-items">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i;

const newServicesListHtml = `
<div role="list" class="services__col-list w-dyn-items">

  <!-- Service 1 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/client/img/galeria/ft01.jpg" alt="Lentes em Resina Estratificada" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(01)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Lentes em <strong class="h3-serif">Resina</strong></h3></div>
      </div>
    </article>
  </div>

  <!-- Service 2 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/6a4817387ce8bb849db0dd76_teeth_whitening.avif" alt="Clareamento Dental" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(02)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Clareamento <strong class="h3-serif">Dental</strong></h3></div>
      </div>
    </article>
  </div>

  <!-- Service 3 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/6a48169f0631537f48e2bdba_orthodontic_treatment.avif" alt="Alinhadores Invisíveis" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(03)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Alinhadores <strong class="h3-serif">Invisíveis</strong></h3></div>
      </div>
    </article>
  </div>

  <!-- Service 4 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/client/img/corpo/DSC01351.jpg" alt="Harmonização Facial" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(04)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Harmonização <strong class="h3-serif">Facial</strong></h3></div>
      </div>
    </article>
  </div>

  <!-- Service 5 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/6a4817187c1a18c185383f83_professional_hygiene.avif" alt="Limpeza e Profilaxia" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(05)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Limpeza & <strong class="h3-serif">Profilaxia</strong></h3></div>
      </div>
    </article>
  </div>

  <!-- Service 6 -->
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <a data-dropdown-toggle="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="service-link w-inline-block"></a>
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" data-stagger-link="" class="service-card__top-caption"><div data-stagger-link-text="" class="service-card__top-text">Agendar no WhatsApp</div></a>
        <div class="service-card__top-icon"><div>(</div><div>+</div><div>)</div></div>
      </div>
      <div class="service-card__media">
        <img src="assets/6a47e0ae3cab79d65d5ff97b_about--d.avif" alt="Ortodontia" loading="lazy" class="service-card__media-img" style="object-fit:cover;"/>
      </div>
      <div class="service-card__bottom">
        <p class="service-card__number">(06)</p>
        <div class="service-card__title"><h3 class="h3-grotesk">Ortodontia <strong class="h3-serif">Estética</strong></h3></div>
      </div>
    </article>
  </div>

</div>
</div></div></div></div></section>
`;
html = html.replace(servicesListRegex, newServicesListHtml.trim());

// ==========================================
// 5. CASES GALLERY SECTION
// ==========================================
const gallerySectionHtml = `
<!-- Gallery Section: Casos Clínicos -->
<section id="gallery" class="gallery-section">
  <div class="page-padding">
    <div class="container">
      <div class="wrap">
        <div class="heading global-heading">
          <div class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Casos Clínicos</div></div>
          <div class="g-title">
            <h2 class="h1-grotesk">Lentes em Resina <span class="h1-serif">Estratificada</span></h2>
            <div class="g-title__subtitle">
              <p class="text-b1--book">Resultados reais com harmonia, delicadeza e máxima naturalidade. Cada caso é planejado individualmente para realçar a sua beleza natural.</p>
            </div>
          </div>
        </div>

        <div class="gallery-grid">
          <div class="gallery-card">
            <img src="assets/client/img/galeria/fto05.jpg" alt="Caso Clínico Antes e Depois de Lentes em Resina" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Antes e Depois</span>
              <h4 class="gallery-card-title">Transformação com Lentes em Resina</h4>
            </div>
          </div>
          <div class="gallery-card">
            <img src="assets/client/img/galeria/fto06.jpg" alt="Caso Clínico Antes e Depois de Lentes em Resina" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Antes e Depois</span>
              <h4 class="gallery-card-title">Correção de Forma, Cor e Alinhamento</h4>
            </div>
          </div>
          <div class="gallery-card">
            <img src="assets/client/img/galeria/ft04.jpg" alt="Caso Clínico Antes e Depois de Lentes em Resina" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Antes e Depois</span>
              <h4 class="gallery-card-title">Fechamento de Diastemas e Harmonia</h4>
            </div>
          </div>
          <div class="gallery-card">
            <img src="assets/client/img/galeria/ft01.jpg" alt="Resultado Final de Lentes em Resina Estratificada" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Resultado Final</span>
              <h4 class="gallery-card-title">Naturalidade e Brilho das Camadas</h4>
            </div>
          </div>
          <div class="gallery-card">
            <img src="assets/client/img/galeria/ft02.jpg" alt="Resultado Final de Lentes em Resina Estratificada" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Resultado Final</span>
              <h4 class="gallery-card-title">Equilíbrio Estético e Funcional</h4>
            </div>
          </div>
          <div class="gallery-card">
            <img src="assets/client/img/galeria/ft03.jpg" alt="Resultado Final de Lentes em Resina Estratificada" loading="lazy" />
            <div class="gallery-card-info">
              <span class="gallery-card-badge">Resultado Final</span>
              <h4 class="gallery-card-title">Sorriso Iluminado e Confiante</h4>
            </div>
          </div>
        </div>

        <p class="gallery-disclaimer">
          *Atenção: Os casos acima foram planejados e executados pessoalmente pela Dra. Adrieli Pereira (CROSP 106703). Resultados variam conforme as particularidades biológicas de cada paciente. Conteúdo em conformidade com o Código de Ética Odontológica (CFO).
        </p>

        <div style="text-align: center; margin-top: 36px;">
          <a data-stagger-link="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-btn w-inline-block">
            <div>(</div><div data-stagger-link-text="">Quero Transformar Meu Sorriso</div><div>)</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// Insert Gallery right after Services section
html = html.replace('</section>', `</section>\n${gallerySectionHtml}`);

// ==========================================
// 6. WHY US SECTION
// ==========================================
html = html.replace(
  /<div data-why-us="caption"[^>]*><div class="caption__dot"><\/div><div class="text-b2--medium">Why us\?<\/div><\/div>/i,
  `<div data-why-us="caption" class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Diferenciais</div></div>`
);

html = html.replace(
  /<h2 data-why-us="title" class="h1-grotesk">[\s\S]*?<\/h2>/i,
  `<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Excelência e Cuidado</span> <br/>em Cada Detalhe</h2>`
);

html = html.replace(
  /<p data-why-us="subtitle" class="text-b1--book">[\s\S]*?<\/p>/i,
  `<p data-why-us="subtitle" class="text-b1--book">Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.</p>`
);

html = html.replace(
  /<div class="why-us-card__bg-text">Experienced Professionals<\/div>[\s\S]*?<h3 class="text-p1">Experienced Professionals<\/h3><\/div><p class="text-b2--book">[\s\S]*?<\/p>/i,
  `<div class="why-us-card__bg-text">Experiência</div></div><div class="why-us-card__heading"><div class="why-us-card__title"><h3 class="text-p1">Mais de 10 Anos de Experiência</h3></div><p class="text-b2--book">Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.</p>`
);
html = html.replace(/\(Precision & Trust\)/g, '(Confiança & Ética)');

html = html.replace(
  /<div class="why-us-card__bg-text">State-of-the-Art Technology<\/div>[\s\S]*?<h3 class="text-p1">State-of-the-Art Technology<\/h3><\/div><p class="text-b2--book">[\s\S]*?<\/p>/i,
  `<div class="why-us-card__bg-text">Técnica Estratificada</div></div><div class="why-us-card__heading"><div class="why-us-card__title"><h3 class="text-p1">Técnica Sem Desgastes Agressivos</h3></div><p class="text-b2--book">Preservamos a integridade biológica do seu dente natural. Aplicamos resinas em camadas estratificadas que reproduzem com perfeição o esmalte e a dentina.</p>`
);
html = html.replace(/\(Cutting-Edge Perfection\)/g, '(Preservação Natural)');

html = html.replace(
  /<div class="why-us-card__bg-text">Comfort-Focused Care<\/div>[\s\S]*?<h3 class="text-p1">Comfort-Focused Care<\/h3><\/div><p class="text-b2--book">[\s\S]*?<\/p>/i,
  `<div class="why-us-card__bg-text">Ambiente Acolhedor</div></div><div class="why-us-card__heading"><div class="why-us-card__title"><h3 class="text-p1">Ambiente Acolhedor & Tranquilo</h3></div><p class="text-b2--book">Consultório estruturado para oferecer uma experiência confortável, sem estresse, com horários pontuais e biossegurança em conformidade com as normas mais rigorosas.</p>`
);
html = html.replace(/\(Smiles with Ease\)/g, '(Conforto & Calma)');

html = html.replace(
  /<div class="why-us-card__bg-text">Patient-Centered Approach<\/div>[\s\S]*?<h3 class="text-p1">Patient-Centered Approach<\/h3><\/div><p class="text-b2--book">[\s\S]*?<\/p>/i,
  `<div class="why-us-card__bg-text">Planejamento Exclusivo</div></div><div class="why-us-card__heading"><div class="why-us-card__title"><h3 class="text-p1">Planejamento 100% Personalizado</h3></div><p class="text-b2--book">Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.</p>`
);
html = html.replace(/\(Focused on You\)/g, '(Exclusividade)');

// Update Why Us Card Images
html = html.replace('assets/6a4bf7d957f57e3e093e0c6c_Experienced_Professionals_Image.avif', 'assets/client/img/corpo/2022-09-26.jpg');
html = html.replace('assets/6a4bf7d9888ea9beabebec9a_State-of-the-Art_Technology_Image.avif', 'assets/client/img/galeria/ft01.jpg');
html = html.replace('assets/6a4bf7d9888ea9beabebecb0_Comfort-Focused_Care_Image.avif', 'assets/client/img/corpo/max-03.jpg');
html = html.replace('assets/6a4bf7dabdb50aff9fc42c75_Patient-Centered_Approach_Image.avif', 'assets/client/img/galeria/ft02.jpg');

// ==========================================
// 7. TESTIMONIALS SECTION
// ==========================================
html = html.replace(
  /<div data-testimonials="caption"[^>]*><div class="caption__dot"><\/div><div class="text-b2--medium">Testimonials<\/div><\/div>/i,
  `<div data-testimonials="caption" class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Avaliações dos Pacientes</div></div>`
);

html = html.replace(
  /<h2 data-testimonials="title" class="h1-grotesk testimonials-title">[\s\S]*?<\/h2>/i,
  `<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Por Trás de Cada Sorriso, <span class="h1-serif">Uma Nova História</span></h2>`
);

html = html.replace(
  /<p data-testimonials="subtitle" class="text-b1--book">[\s\S]*?<\/p>/i,
  `<p data-testimonials="subtitle" class="text-b1--book">Estamos com nota máxima 5.0 no Google! Veja a experiência de quem já renovou a autoestima conosco.</p>`
);

html = html.replace('assets/6a4c2730db9083e06c9901c5_testimonials-img-1.avif', 'assets/client/img/depoimentos/grade-xl.jpg');

html = html.replace(
  /“The implantation process was much easier than I expected[\s\S]*?without hesitation.”/i,
  `“Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!”`
);
html = html.replace(/Sophia/g, 'Mariana S.');
html = html.replace(/Implantation/g, 'Lentes em Resina');

html = html.replace(
  /“The surgical procedure was complex[\s\S]*?results are great.”/i,
  `“O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!”`
);
html = html.replace(/Jessica/g, 'Camila R.');
html = html.replace(/Surgical dentistry/g, 'Estética Dental');

html = html.replace(
  /“I was dreading my wisdom tooth extraction[\s\S]*?everything went.”/i,
  `“Tinha muito receio de mexer nos meus dentes anteriores, mas o planejamento da doutora me passou total segurança. O resultado foi uma harmonia facial espetacular.”`
);
html = html.replace(/Samantha/g, 'Beatriz L.');
html = html.replace(/Wisdom tooth extraction/g, 'Facetas em Resina');

html = html.replace(
  /“My veneers look incredibly natural[\s\S]*?with the result.”/i,
  `“Minhas lentes em resina ficaram perfeitas e absolutamente naturais. A técnica dela é de artista! Mudou completamente a minha autoestima e segurança profissional.”`
);
html = html.replace(/Amelia/g, 'Juliana M.');
html = html.replace(/Veneers/g, 'Lentes de Resina');

html = html.replace(
  /“Getting implantation was tough at first[\s\S]*?with the results.”/i,
  `“Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!”`
);
html = html.replace(/Amanda/g, 'Fernanda C.');
html = html.replace(/Braces/g, 'Lentes em Resina');

// ==========================================
// 8. TEAM SECTION (CORPO CLÍNICO)
// ==========================================
html = html.replace(
  /<div data-team="caption"[^>]*><div class="caption__dot"><\/div><div class="text-b2--medium">Team<\/div><\/div>/i,
  `<div data-team="caption" class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Responsabilidade Técnica</div></div>`
);

html = html.replace(
  /<h2 data-team="title" class="h2-grotesk">[\s\S]*?<\/h2>/i,
  `<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Nosso corpo clínico</span> é liderado por <span class="h2-serif">profissionais dedicados</span> à sua autoestima, conforto e <span class="h2-serif">saúde bucal.</span></h2>`
);

// Replace Emily Peterson safely
html = html.replace(/Emily Peterson/g, 'Adrieli Pereira');
html = html.replace(/Dr\.\s*Emily/g, 'Dra. Adrieli');
html = html.replace('Senior General Dentist', 'Responsável Técnica • CROSP 106703');
html = html.replace(
  /has over 10 years of experience, specializing in personalized care\. She focuses on individualized treatment in a calm environment and emphasizes prevention and oral hygiene\./i,
  'é cirurgiã-dentista há mais de 10 anos, especialista em Lentes em Resina Estratificada e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Focada em devolver a autoestima de sorrir através de um trabalho detalhista, ético e de alta naturalidade.'
);
html = html.replace('Cavity Treatment', 'Lentes em Resina');
html = html.replace('Endodontics', 'Facetas Diretas');
html = html.replace('Tooth Restoration', 'Estética Dental');
html = html.replace('assets/6aa229a0982135698a8b2683_Emily_Peterson_min.avif', 'assets/client/img/corpo/DSC01351.jpg');

// Replace Lucas Marin safely
html = html.replace(/Lucas Marin/g, 'Martins Clinic');
html = html.replace(/Dr\.\s*Lucas/g, 'Equipe');
html = html.replace(
  /Dr\. Lucas Peterson has over 10 years of experience[\s\S]*?oral hygiene\./i,
  'Equipe multidisciplinar em Campinas especializada em estética, ortodontia e profilaxia. Atendimento humanizado em consultório equipado com alta tecnologia para o seu conforto.'
);
html = html.replace('assets/6aa229a0664cbae0a18b4923_Lucas_Marin_min.avif', 'assets/client/img/corpo/2022-09-26.jpg');

// ==========================================
// 9. FAQ ACCORDION SECTION
// ==========================================
const faqSectionHtml = `
<!-- FAQ Section: Dúvidas Frequentes -->
<section id="faq" class="faq-section">
  <div class="page-padding">
    <div class="container">
      <div class="wrap">
        <div class="heading global-heading">
          <div class="caption"><div class="caption__dot"></div><div class="text-b2--medium">Dúvidas Frequentes</div></div>
          <div class="g-title">
            <h2 class="h1-grotesk">Perguntas <span class="h1-serif">Frequentes</span></h2>
            <div class="g-title__subtitle">
              <p class="text-b1--book">Esclareça as principais dúvidas sobre o tratamento de Lentes em Resina e agende sua consulta com total clareza.</p>
            </div>
          </div>
        </div>

        <div class="faq-accordion">
          <div class="faq-item is-active">
            <button class="faq-question" type="button" aria-expanded="true">
              <span>Para realizar as lentes de resina precisa fazer desgaste dental?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Na imensa maioria dos casos, a técnica de lentes em resina estratificada da Dra. Adrieli é aditiva e minimamente invasiva, preservando integralmente o esmalte natural dos dentes. Quando necessário, realizamos apenas micro-preparos conservadores para assentamento harmônico do material, sem jamais comprometer a estrutura saudável do dente.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>Quero fazer as lentes de resina, o procedimento dói?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Não dói! O procedimento é suave, rápido e indolor. Em pacientes com maior sensibilidade térmica ou gengival, utilizamos anestesia local indolor para garantir que você fique totalmente relaxado e confortável durante toda a sessão.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>Existe alguma restrição alimentar após colocar as lentes?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Após a sessão e o polimento de alto brilho, você pode se alimentar normalmente! As resinas atuais possuem alta resistência mastigatória. Orientamos apenas os mesmos cuidados que se deve ter com os dentes naturais: evitar morder objetos duros (como canetas, ossos ou gelo) e manter boa higiene diária.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>Vocês aceitam convênio odontológico?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Os procedimentos de alta estética odontológica e lentes de resina são realizados exclusivamente de forma particular. Isso garante o uso das melhores resinas do mundo (marcas importadas com carga de zircônia e nanopartículas) e tempo de dedicação clínica exclusiva. Entretanto, emitimos nota fiscal e documentação completa caso o seu plano ofereça modalidade de reembolso.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>Quais cuidados são necessários para manter as lentes impecáveis?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Escovação diária com escova de cerdas macias e pasta de dente não abrasiva, uso regular de fio dental e visitas periódicas semestrais para revisão e repolimento profissional. Com esses cuidados simples, suas lentes permanecerão com brilho, textura e translucidez espetaculares por muitos anos.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>Qual o valor do tratamento de lentes em resina?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>O investimento é calculado de acordo com o número de dentes envolvidos, o formato desejado e as particularidades anatômicas de cada sorriso. Por determinação do Conselho Regional de Odontologia (CRO), orçamentos só podem ser definidos após uma avaliação clínica minuciosa. Você pode agendar sua avaliação diretamente no WhatsApp clicando no botão abaixo.</p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <a data-stagger-link="" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-btn w-inline-block">
            <div>(</div><div data-stagger-link-text="">Tirar Dúvidas no WhatsApp</div><div>)</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

html = html.replace('<section data-cta="" class="cta">', `${faqSectionHtml}\n<section data-cta="" class="cta">`);

// ==========================================
// 10. CTA SECTION
// ==========================================
html = html.replace(
  /<h2 data-cta="title" class="text-display">Experience Dental Care, <span class="text-display-serif">Redefined\.<\/span><\/h2>/i,
  `<h2 data-cta="title" class="text-display">Deseja Transformar seu Sorriso <span class="text-display-serif">com Naturalidade?</span></h2>`
);

html = html.replace(
  /<p data-cta="text" class="text-b1--book">Take the first step towards a healthier[\s\S]*?Schedule your consultation today\.<\/p>/i,
  `<p data-cta="text" class="text-b1--book">Dê o primeiro passo rumo à sua melhor versão. Agende sua consulta com a Dra. Adrieli Pereira e venha construir um sorriso com excelência e segurança.</p>`
);

html = html.replace(
  /<a data-stagger-link="" data-cta="btn" data-book-trigger="" href="#" class="text-btn w-inline-block"><div>\(<\/div><div data-stagger-link-text="">Book an Appointment<\/div><div>\)<\/div><\/a>/i,
  `<a data-stagger-link="" data-cta="btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-btn w-inline-block"><div>(</div><div data-stagger-link-text="">Agendar Consulta no WhatsApp</div><div>)</div></a>`
);

// ==========================================
// 11. FOOTER
// ==========================================
const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/i;
const newFooterHtml = `
<footer id="contact" class="footer">
  <div class="page-padding">
    <div class="container">
      <div class="wrap footer__wrap">
        <div class="footer__logo-box">
          <a href="#" class="brand-logo-custom" style="display:inline-flex; align-items:center; gap:12px; text-decoration:none;">
            <img src="assets/client/img/corpo/LOGOTIPO_mini.png" alt="Dra. Adrieli Pereira" style="max-height:42px; width:auto; filter: brightness(0) invert(1);" />
          </a>
          <p class="footer__logo-caption" style="margin-top:12px; font-size:0.95rem; opacity:0.85;">Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.</p>
        </div>

        <div class="footer__info">
          <div class="footer__info-group">
            <div class="text-caption">Navegação</div>
            <ul role="list" class="footer__list">
              <li class="footer__item"><a href="#" class="footer__link">Início</a></li>
              <li class="footer__item"><a href="#about" class="footer__link">Sobre a Dra. Adrieli</a></li>
              <li class="footer__item"><a href="#services" class="footer__link">Procedimentos</a></li>
              <li class="footer__item"><a href="#gallery" class="footer__link">Casos Clínicos</a></li>
              <li class="footer__item"><a href="#why-us" class="footer__link">Diferenciais</a></li>
              <li class="footer__item"><a href="#testimonials" class="footer__link">Avaliações</a></li>
              <li class="footer__item"><a href="#faq" class="footer__link">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          <div class="footer__info-group">
            <div class="text-caption">Contato & Localização</div>
            <ul role="list" class="footer__list">
              <li class="footer__item"><a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="footer__link">+55 (19) 98196-3061 (WhatsApp)</a></li>
              <li class="footer__item"><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="footer__link">@dra.adrielipereira (Instagram)</a></li>
              <li class="footer__item"><span class="footer__link" style="opacity:0.85;">Rua Barbosa da Cunha, 754<br/>Jardim Guanabara — Campinas SP</span></li>
              <li class="footer__item"><span class="footer__link" style="opacity:0.85;">Seg - Sex: 8:30h às 18:30h<br/>Sáb: 8:00h às 14:00h</span></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="footer__bottom-left">
            <p class="text-b3--book">© 2026 Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.</p>
          </div>
          <div class="footer__bottom-right">
            <p class="text-b3--book">Campinas — SP</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
`;
html = html.replace(footerRegex, newFooterHtml.trim());

// ==========================================
// 12. FLOATING WHATSAPP BUTTON & FAQ JS SCRIPT
// ==========================================
const floatingWhatsappAndScripts = `
<!-- Floating WhatsApp Button -->
<a href="${WHATSAPP_URL}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Fale com a Dra. Adrieli no WhatsApp">
  <svg viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31"/>
  </svg>
  <span>Agendar no WhatsApp</span>
</a>

<script>
  // FAQ Accordion interactive logic
  document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
      q.addEventListener('click', function () {
        const item = this.parentElement;
        const isActive = item.classList.contains('is-active');
        
        // Close others
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('is-active');
          const btn = i.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add('is-active');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
</script>
`;

html = html.replace('</body>', `${floatingWhatsappAndScripts}\n</body>`);

fs.writeFileSync(indexPath, html);
console.log('Successfully updated facetasdental index.html! New length:', html.length);
