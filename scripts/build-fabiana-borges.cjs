const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)');
const destDir = path.join(rootDir, 'clones', 'odontologia', 'dra-fabiana-borges');
const previasDir = path.join(rootDir, 'previas', 'dra-fabiana-borges');

// 1. Copy directory recursively
fs.cpSync(srcDir, destDir, { recursive: true, force: true });
fs.mkdirSync(previasDir, { recursive: true });

let html = fs.readFileSync(path.join(destDir, 'index.html'), 'utf8');

// Add noindex meta tag if not present
if (!html.includes('name="robots"')) {
  html = html.replace(
    '<meta charset="utf-8"/>',
    '<meta charset="utf-8"/><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"/>'
  );
}

// Hide webflow badge and fix empty dyn-bind src="assets/220"
html = html.replace('</style>', '\n  .w-webflow-badge { display: none !important; }\n</style>');
const emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
html = html.replaceAll('src="assets/220"', `src="${emptyGif}"`);

// 2. Replace Title & Meta descriptions
html = html.replaceAll(
  'Dra. Adrieli Pereira | Lentes em Resina • Martins Clinic',
  'Dra. Fabiana Borges | FG Odontologia Integrada • Vila Adyana — SJC'
);
html = html.replaceAll(
  'Especialista em Lentes em Resina Estratificada em Campinas. Transforme seu sorriso com naturalidade, harmonia e sem desgastes agressivos com a Dra. Adrieli Pereira (CROSP 106703).',
  'Odontologia Integrada, Prevenção e Estética Dental na Vila Adyana em São José dos Campos. Atendimento humanizado e personalizado com a Dra. Fabiana Borges (CRO-SP 99524).'
);

// 3. Replace Header & Footer SVG Logo
html = html.replace(
  /<div class="logo__img w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="logo__img w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 235 19" fill="none"><text x="0" y="15.5" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="16.5" font-weight="400" letter-spacing="1.2">DRA. FABIANA BORGES</text></svg></div>'
);
html = html.replace(
  /<div class="footer__logo w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="footer__logo w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 510 48" fill="none"><text x="0" y="38" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="38" font-weight="400" letter-spacing="2">DRA. FABIANA BORGES</text></svg></div>'
);

// 4. Replace Hero Texts
html = html.replace(
  'Seu Sorriso Renovado, <span class="h1-serif">com Naturalidade</span> e Excelência',
  'Odontologia Integrada, <span class="h1-serif">Prevenção e Estética</span> com Excelência'
);
html = html.replace(
  'Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.',
  'Cuidado odontológico completo na Vila Adyana em São José dos Campos. Unimos prevenção, reabilitação oral e estética dental com planejamento individualizado para a saúde e harmonia do seu sorriso.'
);

// 5. Replace About / Intro Section
html = html.replaceAll('Sobre a Dra. Adrieli', 'Sobre a Clínica');
html = html.replace(
  'Na Martins Clinic, nossa missão é <span class="h2-serif">cuidar das pessoas</span> com ética, zelo e arte, transformando vidas através de <span class="h2-serif">sorrisos únicos</span> e de máxima naturalidade.',
  'Na FG Odontologia Integrada, nossa missão é <span class="h2-serif">cuidar de cada paciente</span> com ética, prevenção e visão integrativa, promovendo <span class="h2-serif">saúde e estética</span> em perfeita harmonia.'
);
html = html.replace(
  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.',
  'Dra. Fabiana Borges (CRO-SP 99524) lidera a FG Odontologia Integrada no Edifício Med Center, na Vila Adyana em São José dos Campos. Com abordagem humanizada e foco na prevenção, reabilitação funcional e estética dental, nossa clínica oferece atendimento personalizado em um ambiente acolhedor, seguro e equipado com tecnologia moderna.'
);

// 6. Replace Why Us Section
html = html.replace(
  'Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.',
  'Entenda por que a FG Odontologia Integrada é referência em prevenção, reabilitação e estética dental na Vila Adyana em São José dos Campos.'
);
html = html.replace(
  'Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.',
  'Dra. Fabiana Borges dedica sua prática clínica ao cuidado integral do sorriso, unindo prevenção rigorosa, ética profissional, empatia e excelência técnica.'
);

// 7. Replace Testimonials
html = html.replaceAll(
  'Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!',
  'O atendimento da Dra. Fabiana Borges é impecável! Desde a avaliação preventiva até o tratamento estético, tudo foi explicado com muita clareza e delicadeza. Meu sorriso ficou super natural!'
);
html = html.replaceAll(
  'O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!',
  'O cuidado e a atenção de toda a equipe da FG Odontologia Integrada na Vila Adyana fazem toda a diferença. Ambiente acolhedor, pontual e tratamento totalmente sem dor. Recomendo de olhos fechados!'
);
html = html.replaceAll(
  'Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!',
  'Atendimento nota mil desde a recepção até o consultório. A Dra. Fabiana é extremamente atenciosa, ética e detalhista no acompanhamento preventivo e estético!'
);

// 8. Replace Team Section
html = html.replace(
  'src="assets/6aa2283692c5e78e6a921c8d_team-img-1.avif" loading="lazy" width="426" height="479" alt="Dr. Emily Peterson"',
  'src="assets/dra-fabiana-borges.png" loading="lazy" width="426" height="479" alt="Dra. Fabiana Borges (CRO-SP 99524)" style="object-fit:cover;object-position:top;"'
);
html = html.replace(
  'CROSP 106703',
  'CRO-SP 99524'
);
html = html.replace(
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Adrieli Pereira</h3>',
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Fabiana Borges</h3>'
);
html = html.replace(
  'Cirurgiã-Dentista (CROSP 106703) com mais de 10 anos de experiência e Responsável Técnica da Martins Clinic Odontologia. Especialista em transformar sorrisos com Lentes em Resina Estratificada de alta naturalidade.',
  'Cirurgiã-Dentista (CRO-SP 99524) e Responsável Técnica da FG Odontologia Integrada na Vila Adyana (SJC). Dedicada à odontologia preventiva, reabilitação oral e estética dental com foco na saúde integral e naturalidade.'
);
html = html.replace(
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Camila Martins</h3>',
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Carolina Mendes</h3>'
);

// 9. Replace Contact, Location, Footer & Booking Modal
html = html.replaceAll('+55 (19) 98196-3061', '(12) 99614-5888');
html = html.replaceAll('tel:+5519981963061', 'tel:+5512996145888');
html = html.replaceAll('contato@facetasdental.com.br', 'contato@fgodontologiaintegrada.com.br');
html = html.replaceAll(
  'Rua Barbosa da Cunha, 754<br/>Jardim Guanabara — Campinas SP',
  'Rua Esperança, 282 — Ed. Med Center, Salas 23/24<br/>Vila Adyana — São José dos Campos SP'
);
html = html.replaceAll(
  'Rua Barbosa da Cunha, 754 — Jardim Guanabara, Campinas SP',
  'Rua Esperança, 282 (Ed. Med Center) — Vila Adyana, SJC - SP'
);
html = html.replaceAll(
  'Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.',
  'Odontologia Integrada, Prevenção e Estética Dental na Vila Adyana em São José dos Campos.'
);
html = html.replaceAll(
  '© 2026 Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.',
  '© 2026 Clínica Integrada Dra. Fabiana Borges Odontologia Ltda • Dra. Fabiana Cristina Borges (CRO-SP 99524). Todos os direitos reservados.'
);
html = html.replaceAll('Dra. Adrieli Pereira', 'Dra. Fabiana Borges');
html = html.replaceAll('Dra. Adrieli', 'Dra. Fabiana');
html = html.replaceAll('Martins Clinic', 'FG Odontologia Integrada');
html = html.replaceAll('Campinas', 'São José dos Campos');

// Write to clones/odontologia/dra-fabiana-borges/index.html
fs.writeFileSync(path.join(destDir, 'index.html'), html, 'utf8');

// Write to previas/dra-fabiana-borges/index.html referencing ../../clones/odontologia/dra-fabiana-borges/assets/
const previasHtml = html.replace(/(["'(\s,])assets\//g, '$1../../clones/odontologia/dra-fabiana-borges/assets/');
fs.writeFileSync(path.join(previasDir, 'index.html'), previasHtml, 'utf8');

// Also create previas/drfabianaborges/index.html alias
const previasAliasDir = path.join(rootDir, 'previas', 'drfabianaborges');
fs.mkdirSync(previasAliasDir, { recursive: true });
fs.writeFileSync(path.join(previasAliasDir, 'index.html'), previasHtml, 'utf8');

// Also create previas/conceito-saude/index.html
const previasConceitoDir = path.join(rootDir, 'previas', 'conceito-saude');
fs.mkdirSync(previasConceitoDir, { recursive: true });
const conceitoHtml = fs.readFileSync(path.join(rootDir, 'clones', 'medicina-e-saude', 'conceito-saude', 'index.html'), 'utf8')
  .replace(/(["'(\s,])assets\//g, '$1../../clones/medicina-e-saude/conceito-saude/assets/');
fs.writeFileSync(path.join(previasConceitoDir, 'index.html'), conceitoHtml, 'utf8');

// Also create previas/dra-adrieli-pereira/index.html
const previasAdrieliDir = path.join(rootDir, 'previas', 'dra-adrieli-pereira');
fs.mkdirSync(previasAdrieliDir, { recursive: true });
const adrieliHtml = fs.readFileSync(path.join(rootDir, 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html'), 'utf8')
  .replace(/(["'(\s,])assets\//g, '$1../../clones/odontologia/facetasdental(dra.adrielipereira)/assets/');
fs.writeFileSync(path.join(previasAdrieliDir, 'index.html'), adrieliHtml, 'utf8');

// Write root shortcut previa-fabiana-borges.html
const shortcutHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0; url=previas/dra-fabiana-borges/">
  <title>Prévia Exclusiva — Dra. Fabiana Borges | FG Odontologia Integrada</title>
</head>
<body style="background:#1c1b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; color:#f5f3ef;">
  <div style="text-align:center; padding: 24px;">
    <h1 style="font-weight: 300; letter-spacing: 0.15em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 8px;">Dra. Fabiana Borges — FG Odontologia Integrada</h1>
    <p style="opacity: 0.7; font-size: 0.95rem;">Redirecionando para a prévia interativa... <a href="previas/dra-fabiana-borges/" style="color:#d4af37; font-weight:500;">Clique aqui se não carregar automaticamente</a>.</p>
  </div>
  <script>
    window.location.replace("previas/dra-fabiana-borges/");
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(rootDir, 'previa-fabiana-borges.html'), shortcutHtml, 'utf8');

console.log('Successfully built Dra. Fabiana Borges preview!');
