const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Service Card Titles (Exact match of the 9 titles in w-richtext)
html = html.replace('<h3>Aesthetic <strong>dentistry</strong></h3>', '<h3>Lentes em <strong>Resina</strong></h3>');
html = html.replace('<h3>Veneers</h3>', '<h3>Facetas em <strong>Resina</strong></h3>');
html = html.replace('<h3>Wisdom tooth <strong>extraction</strong></h3>', '<h3>Clareamento <strong>Dental</strong></h3>');
html = html.replace('<h3>Implantation</h3>', '<h3>Alinhadores <strong>Invisíveis</strong></h3>');
html = html.replace('<h3>Orthodontic <strong>treatment</strong></h3>', '<h3>Harmonização <strong>Facial</strong></h3>');
html = html.replace('<h3>Professional <strong>hygiene</strong></h3>', '<h3>Limpeza & <strong>Profilaxia</strong></h3>');
html = html.replace('<h3>Teeth <strong>whitening</strong></h3>', '<h3>Ortodontia <strong>Estética</strong></h3>');
html = html.replace('<h3>Surgical <strong>dentistry</strong></h3>', '<h3>Odontologia <strong>Cirúrgica</strong></h3>');
html = html.replace('<h3>Braces</h3>', '<h3>Aparelhos <strong>Dentários</strong></h3>');

// 2. Why Us card labels with non-breaking spaces (\u00A0)
html = html.replace(/\(Precision &amp;[\s\u00A0]*Trust\)/gi, '(Confiança &amp; Ética)');
html = html.replace(/\(Cutting-Edge[\s\u00A0]*Perfection\)/gi, '(Preservação Natural)');
html = html.replace(/\(Smiles with[\s\u00A0]*Ease\)/gi, '(Conforto &amp; Calma)');
html = html.replace(/\(Focused on[\s\u00A0]*You\)/gi, '(Exclusividade)');

// 3. Testimonials authors and procedures
html = html.replace('<div class="text-b2--medium">Sophia</div>', '<div class="text-b2--medium">Mariana S.</div>');
html = html.replace('<div class="text-caption">Implantation</div>', '<div class="text-caption">Lentes em Resina</div>');

html = html.replace('<div class="text-b2--medium">Jessica</div>', '<div class="text-b2--medium">Camila R.</div>');
html = html.replace('<div class="text-caption">Surgical dentistry</div>', '<div class="text-caption">Estética Dental</div>');

html = html.replace('<div class="text-b2--medium">Samantha</div>', '<div class="text-b2--medium">Beatriz L.</div>');
html = html.replace('<div class="text-caption">Wisdom tooth extraction</div>', '<div class="text-caption">Facetas em Resina</div>');

html = html.replace('<div class="text-b2--medium">Amelia</div>', '<div class="text-b2--medium">Juliana M.</div>');
html = html.replace('<div class="text-caption">Veneers</div>', '<div class="text-caption">Lentes de Resina</div>');

html = html.replace('<div class="text-b2--medium">Amanda</div>', '<div class="text-b2--medium">Fernanda C.</div>');
html = html.replace('<div class="text-caption">Braces</div>', '<div class="text-caption">Lentes em Resina</div>');

// 4. Team Section: Dra. title and remaining jobs
html = html.replace(
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr.</span> \u2028<br/>Adrieli Pereira</h3>',
  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Adrieli Pereira</h3>'
);
html = html.replace('Aesthetic Dentistry Specialist', 'Especialista em Dentística Estética');
html = html.replace('Cosmetic Dentist', 'Cirurgião-Dentista Estético');
html = html.replace('Restorative &amp; Cosmetic Dentist', 'Reabilitação Oral &amp; Estética');

// 5. Hero CTA text inside stagger link
// Ensure both hero and nav buttons say "( Agende sua Consulta )"
html = html.replaceAll(
  '<div data-stagger-link-text="">Book an Appointment</div>',
  '<div data-stagger-link-text="">Agende sua Consulta</div>'
);

// 6. Navigation items in menu bar if desktop nav has them
html = html.replaceAll('<div class="nav-link__text">About</div>', '<div class="nav-link__text">Sobre a Dra. Adrieli</div>');
html = html.replaceAll('<div class="nav-link__text">Services</div>', '<div class="nav-link__text">Procedimentos</div>');
html = html.replaceAll('<div class="nav-link__text">Why Us?</div>', '<div class="nav-link__text">Diferenciais</div>');
html = html.replaceAll('<div class="nav-link__text">Testimonials</div>', '<div class="nav-link__text">Avaliações</div>');
html = html.replaceAll('<div class="nav-link__text">Team</div>', '<div class="nav-link__text">Corpo Clínico</div>');

fs.writeFileSync(targetFile, html);
console.log('Successfully polished all text cleanly! Length:', html.length);
