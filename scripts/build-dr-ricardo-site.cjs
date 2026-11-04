const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const templateHtmlPath = path.join(rootDir, 'clones', 'odontologia', 'nova-dental', 'index.html');
const destDir = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade');
const destHtmlPath = path.join(destDir, 'index.html');

let html = fs.readFileSync(templateHtmlPath, 'utf8');

// 1. Meta & Title
html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Dr. Ricardo Andrade | Rinoplastia &amp; Cirurgia Plástica em Campinas-SP</title>');
html = html.replace(
  '<meta charset="utf-8"/>',
  '<meta charset="utf-8"/><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"/><meta name="description" content="Especialista em Rinoplastia Estruturada e Preservadora, Cirurgia Facial e Prótese R24R em Campinas-SP. Mais de 30 anos de experiência com formação Unicamp (CRM-SP 66.351 • RQE 14.201)."/>'
);

// 2. Hide Webflow badge
html = html.replace('</style>', '\n  .w-webflow-badge { display: none !important; }\n  .logo__img img { max-height: 48px; width: auto; object-fit: contain; }\n  .footer__logo img { max-height: 56px; width: auto; object-fit: contain; }\n</style>');

// 3. Fix empty 220 gif
const emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
html = html.replaceAll('src="assets/220"', `src="${emptyGif}"`);

// 4. Navbar Logo
html = html.replace(
  /<div class="logo__img w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="logo__img"><img src="assets/01-home-ricardo-andrade-logo-menu.png" alt="Dr. Ricardo Andrade — Cirurgia Plástica" /></div>'
);

// 5. Footer Logo
html = html.replace(
  /<div class="footer__logo w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="footer__logo"><img src="assets/01-home-ricardo-andrade-logo-menu.png" alt="Dr. Ricardo Andrade — Cirurgia Plástica" /></div>'
);

// 6. WhatsApp Link and Telephones throughout the page
const waLink = 'https://wa.me/5519989280809?text=Ol%C3%A1%20Dr.%20Ricardo,%20visitei%20o%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20Rinoplastia.';
html = html.replaceAll('https://wa.me/5519981963061', 'https://wa.me/5519989280809');
html = html.replaceAll('+55 (19) 98196-3061', '(19) 98928-0809');
html = html.replaceAll('tel:+5519981963061', 'tel:+5519989280809');
html = html.replaceAll('contato@facetasdental.com.br', 'contato@drricardoandrade.com.br');
html = html.replaceAll('Rua Barbosa da Cunha, 754', 'Rua Dr. Barbosa de Andrade, 485');
html = html.replaceAll('Jardim Guanabara', 'Jd. Chapadão');

// 7. Hero Section
html = html.replace(
  'Seu Sorriso Renovado, <span class="h1-serif">com Naturalidade</span> e Excelência',
  'Harmonia Facial e <span class="h1-serif">Naturalidade</span> na Rinoplastia'
);
html = html.replace(
  'Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.',
  'Cirurgião Plástico em Campinas-SP formado pela Unicamp com mais de 30 anos de prática cirúrgica de excelência. Rinoplastia Estruturada e Preservadora planejada sob medida para valorizar as proporções únicas do seu rosto com respiração saudável.'
);
html = html.replaceAll('Agende sua Avaliação', 'Agende sua Consulta');

// 8. About Section
html = html.replaceAll('Sobre a Dra. Adrieli', 'Sobre o Dr. Ricardo');
html = html.replace(
  'Na Martins Clinic, nossa missão é <span class="h2-serif">cuidar das pessoas</span> com ética, zelo e arte, transformando vidas através de <span class="h2-serif">sorrisos únicos</span> e de máxima naturalidade.',
  'Nossa missão é <span class="h2-serif">exaltar a beleza</span> e promover o aumento da autoestima com ética, buscando o bem-estar e a felicidade dos pacientes com <span class="h2-serif">tecnologias atualizadas</span> e excelência cirúrgica.'
);
html = html.replace(
  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.',
  'Dr. Ricardo Andrade (CRM-SP 66.351 • RQE 14.201) é cirurgião plástico formado pela Unicamp em 1989, com residências médicas em Cirurgia Geral e Cirurgia Plástica pelo Hospital de Clínicas da Unicamp (1990–1995), especialização em Medicina Estética pela Universidade de Buenos Aires e especialização em Medicina Laser pela Unicamp. Professor universitário por 5 anos, autor de mais de 70 artigos científicos e participante de mais de 200 cursos no Brasil e no exterior, une técnica apurada e senso estético refinado para entregar resultados harmônicos, elegantes e funcionais.'
);

// Replace About photo with Dr. Ricardo's photo
html = html.replace(
  /<img[^>]+class="intro__media-img"[^>]*\/?>/,
  '<img src="assets/ricardo-andrade-imagem-doutor-principal.jpg" alt="Dr. Ricardo Andrade — Cirurgião Plástico CRM-SP 66.351 • RQE 14.201" loading="lazy" width="306" height="326" style="object-fit:cover;object-position:center top;border-radius:18px;" class="intro__media-img"/>'
);

// 9. Procedures Section Heading
html = html.replace(
  '<h2 data-services="title" class="h1-grotesk">Transformando Sorrisos <span class="h1-serif">com Técnicas Modernas</span></h2>',
  '<h2 data-services="title" class="h1-grotesk">Rinoplastia &amp; Cirurgias <span class="h1-serif">de Alta Precisão</span></h2>'
);
html = html.replace(
  'Temos uma equipe pronta para te atender com tecnologia de ponta, tratamentos personalizados e foco total na naturalidade do seu sorriso.',
  'Cirurgias plásticas faciais e corporais executadas exclusivamente em ambiente cirúrgico hospitalar de ponta em Campinas, aliando rigor técnico, segurança biológica e resultados naturais.'
);

// Replace individual service items with Dr. Ricardo's procedures:
const serviceReplacements = [
  {
    oldTitle: 'Aesthetic dentistry',
    newTitle: 'Rinoplastia Estruturada &amp; Preservadora',
    newDesc: 'Correção estética e funcional do nariz (dorso, ponta e proporções) com preservação da estrutura cartilaginosa e garantia de fluxo respiratório perfeito.'
  },
  {
    oldTitle: 'Lentes de Resina',
    newTitle: 'Rinoplastia Secundária &amp; Revisional',
    newDesc: 'Cirurgia complexa de correção para pacientes com cirurgias prévias insatisfatórias, utilizando enxertos autólogos e reconstrução anatômica minuciosa.'
  },
  {
    oldTitle: 'Wisdom tooth extraction',
    newTitle: 'Blefaroplastia Superior &amp; Inferior',
    newDesc: 'Rejuvenescimento do olhar com remoção milimétrica do excesso de pele e tratamento das bolsas de gordura palpebrais sem alterar a expressão natural dos olhos.'
  },
  {
    oldTitle: 'Lentes em Resina',
    newTitle: 'Frontoplastia &amp; Lifting Facial',
    newDesc: 'Reposicionamento dos tecidos profundos da face e elevação da região frontal/sobrancelhas, restaurando o contorno jovem e descansado da face.'
  },
  {
    oldTitle: 'Orthodontic treatment',
    newTitle: 'Prótese de Mama R24R',
    newDesc: 'Protocolo de recuperação rápida em 24 horas para mamoplastia de aumento, permitindo elevar os braços no mesmo dia e retomar atividades cotidianas com segurança.'
  },
  {
    oldTitle: 'Professional hygiene',
    newTitle: 'Mastopexia com Prótese',
    newDesc: 'Elevação e sustentação das mamas com remoção da flacidez e inclusão de implantes de silicone para conferir colo desenhado, firmeza e simetria.'
  },
  {
    oldTitle: 'Teeth whitening',
    newTitle: 'Mini Lipo a Laser &amp; Contorno',
    newDesc: 'Tecnologia laser para quebra de adiposidades localizadas e retração térmica do colágeno, promovendo definição corporal com rápida recuperação.'
  },
  {
    oldTitle: 'Surgical dentistry',
    newTitle: 'Harmonização Facial &amp; Toxina Botulínica',
    newDesc: 'Procedimentos injetáveis de alta performance para refinamento facial, atenuação de linhas de expressão dinâmicas e volumetria sutil.'
  }
];

serviceReplacements.forEach(({ oldTitle, newTitle, newDesc }) => {
  html = html.replace(new RegExp(`<h3>${oldTitle}</h3>`, 'i'), `<h3>${newTitle}</h3>`);
  html = html.replace(new RegExp(`<h3><strong>${oldTitle}</strong></h3>`, 'i'), `<h3><strong>${newTitle}</strong></h3>`);
});

// 10. Differentials Section
html = html.replace(
  'Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.',
  'Entenda por que a clínica do Dr. Ricardo Andrade é referência em rinoplastia e cirurgia plástica de alto padrão em Campinas e região.'
);
html = html.replace(
  'Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.',
  'Dr. Ricardo Andrade possui mais de 30 anos de prática cirúrgica dedicada, formado pela Unicamp, com mais de 70 artigos científicos publicados e milhares de cirurgias realizadas com ética e excelência.'
);
html = html.replace(
  'Mais de 10 Anos de Experiência',
  'Mais de 30 Anos de Experiência Cirúrgica'
);
html = html.replace(
  'Técnica Sem Desgastes Agressivos',
  'Rinoplastia Estruturada &amp; Preservadora'
);
html = html.replace(
  'Preservamos a integridade biológica do seu dente natural. Aplicamos resinas em camadas estratificadas que reproduzem com perfeição o esmalte e a dentina.',
  'Priorizamos a harmonia facial preservando cartilagens e sustentação óssea nativas. O resultado une contorno nasal elegante e função respiratória plena.'
);
html = html.replace(
  'Ambiente Acolhedor &amp; Tranquilo',
  'Segurança Cirúrgica Hospitalar'
);
html = html.replace(
  'Consultório estruturado para oferecer uma experiência confortável, sem estresse, com horários pontuais e biossegurança em conformidade com as normas mais rigorosas.',
  'Procedimentos realizados nos melhores hospitais de Campinas, equipados com UTI, equipes de anestesiologia especializadas e protocolos de segurança máximos.'
);
html = html.replace(
  'Planejamento 100% Personalizado',
  'Avaliação &amp; Proporção Áurea Facial'
);
html = html.replace(
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.',
  'Estudo minucioso da angulação nasal, perfilometria facial e espessura da pele para que seu novo nariz pareça ter nascido com você, sem traços artificiais.'
);

// 11. YouTube Section insertion before Testimonials
const youtubeSection = `
<section id="youtube" class="section-youtube" style="background: #171614; color: #f5f3ef; padding: 110px 0; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
  <div class="page-padding">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;" class="youtube-grid">
        <div>
          <div class="caption" style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #e02424;"></div>
            <span style="text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; opacity: 0.8;">Conteúdo Educativo em Vídeo</span>
          </div>
          <h2 class="h1-grotesk" style="color: #fff; font-size: 2.5rem; line-height: 1.15; margin-bottom: 24px;">
            Veja Nosso Conteúdo <br/><span class="h1-serif" style="font-style: italic; color: #d4af37;">no YouTube</span>
          </h2>
          <p class="text-b1--book" style="color: rgba(245,243,239,0.78); font-size: 1.05rem; line-height: 1.6; margin-bottom: 32px;">
            Acompanhe explicações transparentes e aprofundadas com o Dr. Ricardo Andrade sobre detalhes cirúrgicos da Rinoplastia, prótese de recuperação rápida R24R, pós-operatório e cuidados com a saúde facial.
          </p>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="https://www.youtube.com/@ricardoandradecirurgiaplastica" target="_blank" rel="noopener" class="text-btn w-inline-block" style="background: #e02424; color: #fff; border-radius: 999px; padding: 14px 28px; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 10px;">
              <span>Assistir Vídeos no YouTube</span> &rarr;
            </a>
            <a href="${waLink}" target="_blank" rel="noopener" class="text-btn w-inline-block" style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 999px; padding: 14px 28px; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 8px;">
              <span>Tirar Dúvidas</span>
            </a>
          </div>
        </div>
        <div style="position: relative; text-align: center;">
          <a href="https://www.youtube.com/@ricardoandradecirurgiaplastica" target="_blank" rel="noopener" style="display: block; position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <img src="assets/01-home-dr-ricardo-andrade-imagem-youtube.png" alt="Canal do YouTube Dr. Ricardo Andrade" style="width: 100%; height: auto; display: block; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
<style>
  @media (max-width: 850px) {
    .youtube-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
  }
</style>
`;

html = html.replace('<section data-testimonials=""', `${youtubeSection}\n<section data-testimonials=""`);

// 12. Testimonials Section
html = html.replaceAll(
  'Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!',
  'Fiz minha rinoplastia com o Dr. Ricardo Andrade e foi a melhor decisão da minha vida. Meu nariz ficou delicado, harmônico e totalmente natural, sem aquele aspecto operado. Minha respiração também melhorou muito!'
);
html = html.replaceAll('Mariana S.', 'Camila V.');
html = html.replaceAll('Lentes em Resina', 'Rinoplastia Estruturada');

html = html.replaceAll(
  'O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!',
  'A seriedade e a experiência do Dr. Ricardo me passaram total tranquilidade. A consulta foi extremamente detalhada e o resultado da minha cirurgia facial superou tudo o que eu imaginava. Equipe impecável em Campinas!'
);
html = html.replaceAll('Camila R.', 'Juliana M.');
html = html.replaceAll('Estética Dental', 'Cirurgia Facial &amp; Rinoplastia');

html = html.replaceAll(
  'Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!',
  'Dr. Ricardo é um cirurgião de rara precisão e ética. Desde a primeira consulta no Jardim Chapadão até o pós-operatório hospitalar, o acolhimento foi exemplar. Recomendo com total segurança!'
);
html = html.replaceAll('Fernanda C.', 'Patrícia S.');

// 13. Team / Doctor Slide
html = html.replace(
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Adrieli Pereira</h3>',
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr.</span> <br/>Ricardo Andrade</h3>'
);
html = html.replace(
  'Responsável Técnica • CROSP 106703',
  'Cirurgião Plástico • CRM-SP 66.351 • RQE 14.201'
);
html = html.replace(
  'Cirurgiã-Dentista (CROSP 106703) com mais de 10 anos de experiência e Responsável Técnica da Martins Clinic Odontologia. Especialista em transformar sorrisos com Lentes em Resina Estratificada de alta naturalidade.',
  'Cirurgião Plástico formado pela Unicamp em 1989 com residências no HC da Unicamp e especializações na Argentina e Unicamp. Autor de mais de 70 artigos científicos, atua com foco primordial em Rinoplastia Estruturada, Preservadora e Cirurgia Facial.'
);
html = html.replace(
  'src="assets/6aa2283692c5e78e6a921c8d_team-img-1.avif" loading="lazy" width="426" height="479" alt="Dr. Emily Peterson"',
  'src="assets/ricardo-andrade-imagem-doutor-secundaria.jpg" loading="lazy" width="426" height="479" alt="Dr. Ricardo Andrade — Cirurgião Plástico" style="object-fit:cover;object-position:top;"'
);

// 14. CTA Section & Footer
html = html.replace(
  '<h2 data-cta="title" class="text-display">Seu Novo Sorriso <span class="text-display-serif">Começa Aqui</span></h2>',
  '<h2 data-cta="title" class="text-display">Harmonia e Beleza <span class="text-display-serif">com Segurança</span></h2>'
);
html = html.replace(
  'Agende sua avaliação com a Dra. Adrieli Pereira e descubra como as lentes em resina estratificada podem transformar sua autoestima.',
  'Agende sua consulta com o Dr. Ricardo Andrade e descubra o plano cirúrgico ideal para a harmonia do seu rosto e sua autoestima.'
);

// Footer details
html = html.replaceAll(
  'Rua Barbosa da Cunha, 754<br/>Jardim Guanabara — Campinas SP',
  'Rua Dr. Barbosa de Andrade, 485<br/>Jardim Chapadão — Campinas SP • CEP 13070-158'
);
html = html.replaceAll(
  'Rua Barbosa da Cunha, 754 — Jardim Guanabara, Campinas SP',
  'Rua Dr. Barbosa de Andrade, 485 — Jd. Chapadão, Campinas SP'
);
html = html.replaceAll(
  'Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.',
  'Rinoplastia Estruturada, Cirurgia Facial e Cirurgia Plástica de Alta Precisão em Campinas-SP.'
);
html = html.replaceAll(
  '© 2026 Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.',
  '© 2026 Dr. Ricardo Andrade • Cirurgia Plástica • CRM-SP 66.351 • RQE 14.201. Todos os direitos reservados.'
);
html = html.replaceAll('Dra. Adrieli Pereira', 'Dr. Ricardo Andrade');
html = html.replaceAll('Dra. Adrieli', 'Dr. Ricardo');
html = html.replaceAll('Martins Clinic', 'Clínica Dr. Ricardo Andrade');
html = html.replaceAll('instagram.com/dra.adrielipereira', 'instagram.com/ricardoandradecirurgiaplastica');
html = html.replaceAll('@dra.adrielipereira', '@ricardoandradecirurgiaplastica');

// Write index.html in clones/estetica-e-beleza/dr.ricardo-andrade/
fs.writeFileSync(destHtmlPath, html, 'utf8');
console.log('Successfully generated clones/estetica-e-beleza/dr.ricardo-andrade/index.html!');

// Also create previas/dr-ricardo-andrade/
const previaDir = path.join(rootDir, 'previas', 'dr-ricardo-andrade');
fs.mkdirSync(previaDir, { recursive: true });
fs.cpSync(destDir, previaDir, { recursive: true, force: true });
console.log('Successfully copied to previas/dr-ricardo-andrade!');

// Also create root shortcut previa-dr-ricardo-andrade.html
const shortcutHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0; url=previas/dr-ricardo-andrade/">
  <title>Prévia Exclusiva — Dr. Ricardo Andrade | Rinoplastia &amp; Cirurgia Plástica</title>
</head>
<body style="background:#1c1b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; color:#f5f3ef;">
  <div style="text-align:center; padding: 24px;">
    <h1 style="font-weight: 300; letter-spacing: 0.15em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 8px;">Dr. Ricardo Andrade — Rinoplastia &amp; Cirurgia Plástica</h1>
    <p style="opacity: 0.7; font-size: 0.95rem;">Redirecionando para a prévia interativa... <a href="previas/dr-ricardo-andrade/" style="color:#d4af37; font-weight:500;">Clique aqui se não carregar automaticamente</a>.</p>
  </div>
  <script>
    window.location.replace("previas/dr-ricardo-andrade/");
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(rootDir, 'previa-dr-ricardo-andrade.html'), shortcutHtml, 'utf8');
console.log('Successfully created previa-dr-ricardo-andrade.html root shortcut!');
