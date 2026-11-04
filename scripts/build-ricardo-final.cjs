const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const destDir = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade');
const previaDir = path.join(rootDir, 'previas', 'dr-ricardo-andrade');

const waLink = 'https://wa.me/5519989280809?text=Ol%C3%A1%20Dr.%20Ricardo,%20visitei%20o%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.';

// Read the current index.html in dr.ricardo-andrade
let html = fs.readFileSync(path.join(destDir, 'index.html'), 'utf8');

// ==========================================
// 1. NAVIGATION
// ==========================================
// Replace nav items to match text:
// Dr. Ricardo | A Clínica | Resultados | Cirurgias | Contato | Agendar
html = html.replace(
  /<nav role="navigation" class="header__nav-list[^"]*">[\s\S]*?<\/nav>/,
  `<nav role="navigation" class="header__nav-list w-nav-menu">
    <a href="#about" class="header__nav-link w-nav-link">Dr. Ricardo</a>
    <a href="#why-us" class="header__nav-link w-nav-link">A Clínica</a>
    <a href="#gallery" class="header__nav-link w-nav-link">Resultados</a>
    <a href="#services" class="header__nav-link w-nav-link">Cirurgias</a>
    <a href="#youtube" class="header__nav-link w-nav-link">Vídeos</a>
    <a href="#contact" class="header__nav-link w-nav-link">Contato</a>
  </nav>`
);

// Navigation button text -> "Agendar"
html = html.replace(
  /<a data-stagger-link="" data-book-trigger="" href="#" class="text-btn is-header w-inline-block"><div>\(<\/div><div data-stagger-link-text="">[\s\S]*?<\/div><div>\)<\/div><\/a>/,
  `<a href="${waLink}" target="_blank" rel="noopener" class="text-btn is-header w-inline-block"><div>(</div><div>Agendar</div><div>)</div></a>`
);

// ==========================================
// 2. HERO SECTION
// ==========================================
// Text from user:
// Definição e qualidade na mamoplastia de aumento
// Dr. Ricardo Andrade - Cirurgia plástica em Campinas-SP e Região
html = html.replace(
  /<h1 data-hero="title" class="text-display">[\s\S]*?<\/h1>/,
  `<h1 data-hero="title" class="text-display">Definição e Qualidade <br/><span class="text-display-serif">na Mamoplastia e Rinoplastia</span></h1>`
);

html = html.replace(
  /<p data-hero="cta-text" class="text-b1--book">[\s\S]*?<\/p>/,
  `<p data-hero="cta-text" class="text-b1--book">Dr. Ricardo Andrade • Cirurgia plástica em Campinas-SP e Região (CRM-SP 66.351 • RQE 14.201). Formado pela Unicamp com mais de 30 anos de prática cirúrgica de excelência, dedicados à rinoplastia estruturada, mamoplastia de aumento R24R e cirurgia facial.</p>`
);

html = html.replace(
  /<a data-stagger-link="" data-hero="cta-btn" data-book-trigger="" href="#" class="text-btn w-inline-block"><div>\(<\/div><div data-stagger-link-text="">[\s\S]*?<\/div><div>\)<\/div><\/a>/,
  `<a href="${waLink}" target="_blank" rel="noopener" class="text-btn w-inline-block"><div>(</div><div>Agendar uma Consulta</div><div>)</div></a>`
);

// ==========================================
// 3. ABOUT SECTION (MISSÃO + BIOGRAFIA)
// ==========================================
// User text:
// Missão: Exaltar a beleza e promover o aumento da autoestima de forma ética, buscando o bem estar e felicidade dos pacientes com tecnologias atualizadas e otimização do conhecimento.
// Nosso foco é a busca contínua em atingir um nível elevado em excelência no atendimento e resultado.
html = html.replace(
  /<h2 data-about="title" class="h2-grotesk">[\s\S]*?<\/h2>/,
  `<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">Missão:</span> Exaltar a beleza e promover o aumento da autoestima de forma ética, buscando o bem-estar e felicidade dos pacientes com <span class="h2-serif">tecnologias atualizadas e otimização do conhecimento.</span> Nosso foco é a busca contínua em atingir um nível elevado em <span class="h2-serif">excelência no atendimento e resultado cirúrgico.</span></h2>`
);

// Biography paragraph
html = html.replace(
  /<p data-about="text" class="text-b1--book">[\s\S]*?<\/p>/,
  `<p data-about="text" class="text-b1--book"><strong>Dr. Ricardo Andrade (CRM-SP 66351 | RQE 14201)</strong><br/><br/>
• Formação acadêmica pela Unicamp em 1989;<br/>
• Residência em Cirurgia Geral no Hospital de Clínicas da Unicamp (1990/1995);<br/>
• Residência em Cirurgia Plástica no Hospital de Clínicas da Unicamp (1990/1995);<br/>
• Especialização em Medicina Estética pela Universidade de Buenos Aires (Argentina) em 1996;<br/>
• Especialização em Medicina Laser no Núcleo de Laser da Unicamp em 1995;<br/>
• Professor na Universidade de Alfenas/MG (1995/2000);<br/>
• Autor de mais de 70 artigos científicos publicados em periódicos da área e participante de mais de 200 cursos no Brasil e no exterior.<br/><br/>
<em>Cuidados além da beleza:</em> Atua na área de cirurgias de prótese de recuperação rápida R24R, mamas, rinoplastia, blefaroplastia, frontoplastia, abdominoplastia e harmonização facial.</p>`
);

// About photo
html = html.replace(
  /<img[^>]+class="intro__media-img"[^>]*\/?>/,
  `<img src="assets/ricardo-andrade-imagem-doutor-principal.jpg" alt="Dr. Ricardo Andrade — Cirurgião Plástico CRM-SP 66.351 • RQE 14.201" loading="lazy" width="306" height="326" style="object-fit:cover;object-position:center top;border-radius:18px;" class="intro__media-img"/>`
);

// ==========================================
// 4. PROCEDURES (CIRURGIAS) - REPLACE DENTAL IMAGES
// ==========================================
html = html.replace('assets/6a4816027ce8bb849db09621_aesthetic_dentistry.avif', 'assets/11_KE_After_Side_Pro.jpg');
html = html.replace('assets/6a48163bcf18ea5407e54f9c_veneers.avif', 'assets/3_EK_Side_Profile_Af.jpg');
html = html.replace('assets/6a48165a9c177132067c94a7_wisdom_tooth_extraction.avif', 'assets/13_SZ_Side_View_Afte.jpg');
html = html.replace('assets/6a481673546b582959317b6d_implantation.avif', 'assets/03.jpg');
html = html.replace('assets/6a48169f0631537f48e2bdba_orthodontic_treatment.avif', 'assets/04.jpg');
html = html.replace('assets/6a4817187c1a18c185383f83_professional_hygiene.avif', 'assets/01.jpg');
html = html.replace('assets/6a4817387ce8bb849db0dd76_teeth_whitening.avif', 'assets/05.jpg');
html = html.replace('assets/6a48175c7c1a18c185384a5c_surgical_dentistry.avif', 'assets/55.jpg');
html = html.replace('assets/6a4817790dee13993ef7dd77_braces.avif', 'assets/7_CR_Side_Profile_Af.png');

// Add the other procedures list explicitly
const extraProceduresBlock = `
<div class="other-procedures-block" style="margin-top: 60px; padding: 45px 35px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px;">
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
    <div style="width: 8px; height: 8px; border-radius: 50%; background: #d4af37;"></div>
    <span style="text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; opacity: 0.8; color: #d4af37;">Amplo Espectro Cirúrgico</span>
  </div>
  <h3 class="h2-grotesk" style="color: #fff; font-size: 1.8rem; margin-bottom: 14px;">Conheça Outros Procedimentos Realizados:</h3>
  <p class="text-b1--book" style="color: rgba(245,243,239,0.7); font-size: 1rem; margin-bottom: 28px;">
    Além da Rinoplastia e da Mamoplastia de Aumento R24R, o Dr. Ricardo Andrade realiza procedimentos cirúrgicos faciais e corporais com rigor hospitalar:
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; margin-bottom: 30px;">
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Frontoplastia</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Abdominoplastia</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Ginecomastia</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Ninfoplastia</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Otoplastia</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Lifting Facial (Ritidoplastia)</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Prótese de Glúteo</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Toxina Botulínica e Preenchimento</div>
    <div style="background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border-left: 3px solid #d4af37; font-size: 14.5px; font-weight: 500;">Mini Lipo a Laser</div>
  </div>
  <a href="${waLink}" target="_blank" rel="noopener" class="text-btn w-inline-block" style="background: #d4af37; color: #171614; padding: 14px 30px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
    <span>Fale Conosco no WhatsApp</span> &rarr;
  </a>
</div>
`;

if (!html.includes('other-procedures-block')) {
  html = html.replace('</div></div></div></div><div id="services" class="anchor is-services"></div>', `${extraProceduresBlock}</div></div></div></div><div id="services" class="anchor is-services"></div>`);
}

// ==========================================
// 5. WHY US / A CLÍNICA - REPLACE DENTAL IMAGES
// ==========================================
html = html.replace('assets/6a4bf7d957f57e3e093e0c6c_Experienced_Professionals_Image.avif', 'assets/ricardo-andrade-imagem-doutor-secundaria.jpg');
html = html.replace('assets/6a4bf7d9888ea9beabebec9a_State-of-the-Art_Technology_Image.avif', 'assets/03.jpg');
html = html.replace('assets/6a4bf7d9888ea9beabebecb0_Comfort-Focused_Care_Image.avif', 'assets/04.jpg');
html = html.replace('assets/6a4bf7dabdb50aff9fc42c75_Patient-Centered_Approach_Image.avif', 'assets/01.jpg');

// ==========================================
// 6. GALLERY / RESULTADOS (CASOS CLÍNICOS RINOPLASTIA)
// ==========================================
// Replace gallery teeth images with real Rhinoplasty Before & Afters
html = html.replace('Transformação com Lentes em Resina', 'Rinoplastia Estruturada (Perfil e Dorso)');
html = html.replace('Correção de Forma, Cor e Alinhamento', 'Rinoplastia Preservadora (Harmonia Facial)');
html = html.replace('Fechamento de Diastemas e Harmonia', 'Rinoplastia Revisional (Enxertos Autólogos)');
html = html.replace('Naturalidade e Brilho das Camadas', 'Refinamento de Ponta e Proporção Áurea');
html = html.replace('Equilíbrio Estético e Funcional', 'Equilíbrio Estético e Respiratório');
html = html.replace('Sorriso Iluminado e Confiante', 'Perfil Harmonizado e Confiante');

// ==========================================
// 7. TESTIMONIALS - REPLACE DENTAL IMAGES
// ==========================================
html = html.replace('assets/6a4c2730db9083e06c9901c5_testimonials-img-1.avif', 'assets/10_KE_Front_View_Aft.png');
html = html.replace('assets/6a4c27305b12fcf5c1a2cf5f_testimonials-img-2.avif', 'assets/7_CR_Side_Profile_Af.png');

// ==========================================
// 8. CARD AGENDAMENTO & EXCELÊNCIA
// User text:
// Seriedade e excelência. esse é o Dr. Ricardo Andrade.
// Imagem Agendamento
// Agende sua Consulta
// Me Acompanhe nas Redes Sociais
// ==========================================
const agendamentoCard = `
<section class="section-agendamento" style="background: #1c1b19; padding: 100px 0; border-top: 1px solid rgba(255,255,255,0.06);">
  <div class="page-padding">
    <div class="container" style="max-width: 1100px; margin: 0 auto; text-align: center;">
      <div style="background: linear-gradient(145deg, #24221f 0%, #191816 100%); border: 1px solid rgba(212,175,55,0.25); border-radius: 32px; padding: 60px 40px; box-shadow: 0 30px 60px rgba(0,0,0,0.4); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <div style="width: 76px; height: 76px; border-radius: 50%; background: rgba(212,175,55,0.12); border: 1px solid #d4af37; display: flex; align-items: center; justify-content: center;">
            <img src="assets/01-home-dr-ricardo-andrade-icone-agendamento.png" alt="Agendamento Dr. Ricardo Andrade" style="width: 44px; height: 44px; object-fit: contain;" />
          </div>
        </div>
        <div class="caption" style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 14px;">
          <span style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; color: #d4af37;">Dr. Ricardo Andrade</span>
        </div>
        <h2 class="h1-grotesk" style="color: #fff; font-size: 2.4rem; line-height: 1.2; margin-bottom: 16px;">
          Seriedade e excelência. <br/><span class="h1-serif" style="font-style: italic; color: #d4af37;">Esse é o Dr. Ricardo Andrade.</span>
        </h2>
        <p class="text-b1--book" style="max-width: 650px; margin: 0 auto 36px; color: rgba(245,243,239,0.75); font-size: 1.05rem; line-height: 1.6;">
          Agende sua consulta particular no Jardim Chapadão em Campinas e tenha um planejamento cirúrgico minucioso, ético e personalizado.
        </p>
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 36px;">
          <a href="${waLink}" target="_blank" rel="noopener" class="text-btn w-inline-block" style="background: #d4af37; color: #171614; padding: 16px 36px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px rgba(212,175,55,0.3);">
            <span>Agende sua Consulta</span> &rarr;
          </a>
          <a href="tel:1932422777" class="text-btn w-inline-block" style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.25); padding: 16px 28px; border-radius: 999px; text-decoration: none; font-weight: 500; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
            <span>Ligar (19) 3242-2777</span>
          </a>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.08); pt-4; padding-top: 28px; display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
          <span style="color: rgba(245,243,239,0.7); font-size: 14px;">Me acompanhe nas redes sociais:</span>
          <a href="https://www.instagram.com/ricardoandradecirurgiaplastica/" target="_blank" rel="noopener" style="color: #d4af37; text-decoration: none; font-weight: 500; font-size: 14px; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>@ricardoandradecirurgiaplastica</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

if (!html.includes('section-agendamento')) {
  html = html.replace('<footer', `${agendamentoCard}\n<footer`);
}

// ==========================================
// 9. FOOTER
// User text:
// Atendimento: Rua Dr Barbosa de Andrade, 485 – Jd Chapadão, Campinas/SP – CEP 13070-158
// Contato: (19) 3242-2777 • (19) 98928-0809
// Responsável técnico: Dr. Ricardo Andrade • Cirurgião Plástico CRM 66.351 • RQE 14.201
// Todos os direitos reservados | Desenvolvido por Design Kapital
// ==========================================
html = html.replace(
  'Todos os direitos reservados.',
  'Todos os direitos reservados | Desenvolvido por Design Kapital'
);
html = html.replaceAll('Responsável Técnica', 'Responsável Técnico');
html = html.replaceAll('Phenomenon Studio', 'Design Kapital');

// Save index.html
fs.writeFileSync(path.join(destDir, 'index.html'), html, 'utf8');
console.log('✅ Generated refined clones/estetica-e-beleza/dr.ricardo-andrade/index.html');

// Copy everything to previas/dr-ricardo-andrade/
fs.cpSync(destDir, previaDir, { recursive: true, force: true });
console.log('✅ Synced to previas/dr-ricardo-andrade!');
