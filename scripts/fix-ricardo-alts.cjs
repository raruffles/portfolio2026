const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade');
const previaDir = path.join(__dirname, '..', 'previas', 'dr-ricardo-andrade');

let html = fs.readFileSync(path.join(destDir, 'index.html'), 'utf8');

// Fix alt attributes
html = html.replace('alt="Aesthetic dentistry"', 'alt="Rinoplastia Estruturada e Preservadora — Dr. Ricardo Andrade"');
html = html.replace('alt="Veneers"', 'alt="Perfilometria e Harmonia Nasal — Dr. Ricardo Andrade"');
html = html.replace('alt="Wisdom \u2028tooth extraction"', 'alt="Blefaroplastia e Rejuvenescimento do Olhar"');
html = html.replace('alt="Implantation"', 'alt="Prótese de Mama R24R — Recuperação Rápida"');
html = html.replace('alt="Orthodontic treatment "', 'alt="Mastopexia e Cirurgia da Mama"');
html = html.replace('alt="Professional hygiene "', 'alt="Ambiente Cirúrgico Hospitalar em Campinas"');
html = html.replace('alt="Teeth whitening "', 'alt="Contorno Corporal e Mini Lipo a Laser"');
html = html.replace('alt="Surgical dentistry"', 'alt="Harmonização Facial e Cirurgia Plástica"');
html = html.replace('alt="Braces"', 'alt="Frontoplastia e Lifting Facial"');
html = html.replace('alt="Two smiling women standing side by side, one wearing a white chef coat and the other a white blouse."', 'alt="Dr. Ricardo Andrade — Cirurgião Plástico formado pela Unicamp"');
html = html.replace('alt="Dentist showing dental X-ray on tablet to a patient in a clinic."', 'alt="Planejamento Cirúrgico Digital e Avaliação Anatômica"');
html = html.replace('alt="Dentist wearing gloves and mask examines patient’s teeth using a dental microscope with teeth image on screen."', 'alt="Centro Cirúrgico Hospitalar de Alta Complexidade"');
html = html.replace('alt="Smiling woman being examined with a dental shade guide by a gloved hand in a clinic."', 'alt="Consulta Médica Individualizada e Ética"');
html = html.replace('alt="Dentist wearing gloves and mask examining a young boy&#x27;s teeth while a woman watches closely."', 'alt="Resultado de Rinoplastia e Harmonia Facial"');
html = html.replace('alt="Close-up of a smiling young woman with braces and light freckles on her face."', 'alt="Pós-operatório e Acompanhamento de Rinoplastia"');

// Fix team slides:
// Slide 2: Equipe Cirúrgica & Anestesiologia
html = html.replace('Dr. Lucas Marin', 'Equipe Cirúrgica Hospitalar');
html = html.replace('Orthodontist', 'Anestesiologia &amp; Suporte Cirúrgico');
// Slide 3: Atendimento & Enfermagem
html = html.replace('Dr. Olivia Hartman', 'Enfermagem &amp; Pós-Operatório');
html = html.replace('Periodontist', 'Acompanhamento Contínuo');
// Slide 4: Fisioterapia Dermatofuncional
html = html.replace('Dr. Marcus Bennett', 'Fisioterapia Dermatofuncional');
html = html.replace('Oral surgeon', 'Recuperação &amp; Drenagem Linfática');
// Slide 5: Consultoria & Planejamento
html = html.replace('Dr. Liam Brooks', 'Concierge &amp; Atendimento');
html = html.replace('Endodontist', 'Acolhimento ao Paciente');

// Replace team stock photos with clinical photos
html = html.replace('assets/6aa228373e2d920388efaa1d_team-img-2.avif', 'assets/03.jpg');
html = html.replace('assets/6aa22836d6f726e3d41b7430_team-img-3.avif', 'assets/04.jpg');
html = html.replace('assets/6aa22836a8abaa52db92537a_team-img-4.avif', 'assets/01.jpg');
html = html.replace('assets/6aa22836b551af74c20227e1_team-img-5.avif', 'assets/55.jpg');

// Save to clone and previa
fs.writeFileSync(path.join(destDir, 'index.html'), html, 'utf8');
fs.cpSync(destDir, previaDir, { recursive: true, force: true });
console.log('✅ Updated alt tags and team slides in clones and previas!');
