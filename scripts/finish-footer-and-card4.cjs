const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Why Us Card 4 text
html = html.replace(
  'Your health and satisfaction are our top priority. We take the time to listen to your concerns and tailor our treatments to your needs.',
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.'
);

// 2. Footer Headings
html = html.replace('<div class="text-b1--medium mob-18">Menu</div>', '<div class="text-b1--medium mob-18">Navegação</div>');
html = html.replace('<div class="text-b1--medium mob-18">Contact Us</div>', '<div class="text-b1--medium mob-18">Contato &amp; Localização</div>');

// 3. Footer Links
html = html.replace(
  '<a data-stagger-link="" href="#about" class="footer__link w-inline-block"><div data-stagger-link-text="">About</div></a>',
  '<a data-stagger-link="" href="#about" class="footer__link w-inline-block"><div data-stagger-link-text="">Sobre a Dra. Adrieli</div></a>'
);
html = html.replace(
  '<a data-stagger-link="" href="#services" class="footer__link w-inline-block"><div data-stagger-link-text="">Services</div></a>',
  '<a data-stagger-link="" href="#services" class="footer__link w-inline-block"><div data-stagger-link-text="">Procedimentos</div></a>'
);
html = html.replace(
  '<a data-stagger-link="" href="#why-us" class="footer__link w-inline-block"><div data-stagger-link-text="">Why Us?</div></a>',
  '<a data-stagger-link="" href="#why-us" class="footer__link w-inline-block"><div data-stagger-link-text="">Diferenciais</div></a>'
);
html = html.replace(
  '<a data-stagger-link="" href="#testimonials" class="footer__link w-inline-block"><div data-stagger-link-text="">Testimonials</div></a>',
  '<a data-stagger-link="" href="#testimonials" class="footer__link w-inline-block"><div data-stagger-link-text="">Avaliações</div></a>'
);
html = html.replace(
  '<a data-stagger-link="" href="#team" class="footer__link w-inline-block"><div data-stagger-link-text="">Team</div></a>',
  '<a data-stagger-link="" href="#team" class="footer__link w-inline-block"><div data-stagger-link-text="">Corpo Clínico</div></a>'
);

// 4. Footer email text and copyright
html = html.replace('<div data-stagger-link-text="">hello@novadental.com</div>', '<div data-stagger-link-text="">contato@facetasdental.com.br</div>');
html = html.replace(
  '© <span data-footer-year="">2026</span> Nova Dental. All rights reserved.',
  '© <span data-footer-year="">2026</span> Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.'
);

// Also check top menu bar links for desktop
html = html.replaceAll(
  '<a data-stagger-link="" href="#about" class="nav-link w-inline-block"><div data-stagger-link-text="">About</div></a>',
  '<a data-stagger-link="" href="#about" class="nav-link w-inline-block"><div data-stagger-link-text="">Sobre a Dra. Adrieli</div></a>'
);
html = html.replaceAll(
  '<a data-stagger-link="" href="#services" class="nav-link w-inline-block"><div data-stagger-link-text="">Services</div></a>',
  '<a data-stagger-link="" href="#services" class="nav-link w-inline-block"><div data-stagger-link-text="">Procedimentos</div></a>'
);
html = html.replaceAll(
  '<a data-stagger-link="" href="#why-us" class="nav-link w-inline-block"><div data-stagger-link-text="">Why Us?</div></a>',
  '<a data-stagger-link="" href="#why-us" class="nav-link w-inline-block"><div data-stagger-link-text="">Diferenciais</div></a>'
);
html = html.replaceAll(
  '<a data-stagger-link="" href="#testimonials" class="nav-link w-inline-block"><div data-stagger-link-text="">Testimonials</div></a>',
  '<a data-stagger-link="" href="#testimonials" class="nav-link w-inline-block"><div data-stagger-link-text="">Avaliações</div></a>'
);
html = html.replaceAll(
  '<a data-stagger-link="" href="#team" class="nav-link w-inline-block"><div data-stagger-link-text="">Team</div></a>',
  '<a data-stagger-link="" href="#team" class="nav-link w-inline-block"><div data-stagger-link-text="">Corpo Clínico</div></a>'
);

fs.writeFileSync(targetFile, html);
console.log('Finished updating footer and card 4.');
