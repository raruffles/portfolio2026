const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)', 'index.html');
let html = fs.readFileSync(targetFile, 'utf8');

console.log('Original length:', html.length);

// 1. Title
html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Conceito Saúde | Clínica &amp; Laboratório — Saúde Integrativa e Emagrecimento</title>');

// 2. Navigation & Header
// Menu links
html = html.replaceAll('<div class="nav-menu__link-text">Sobre a Dra. Adrieli</div>', '<div class="nav-menu__link-text">A Clínica</div>');
html = html.replaceAll('<div class="nav-menu__link-text">Procedimentos</div>', '<div class="nav-menu__link-text">Especialidades</div>');
html = html.replaceAll('<div class="nav-menu__link-text">Diferenciais</div>', '<div class="nav-menu__link-text">Diferenciais</div>');
html = html.replaceAll('<div class="nav-menu__link-text">Avaliações</div>', '<div class="nav-menu__link-text">Resultados</div>');
html = html.replaceAll('<div class="nav-menu__link-text">Corpo Clínico</div>', '<div class="nav-menu__link-text">Corpo Clínico</div>');

// Desktop nav bar links
html = html.replaceAll('<div data-stagger-link-text="">Sobre a Dra. Adrieli</div>', '<div data-stagger-link-text="">A Clínica</div>');
html = html.replaceAll('<div data-stagger-link-text="">Procedimentos</div>', '<div data-stagger-link-text="">Especialidades</div>');
html = html.replaceAll('<div data-stagger-link-text="">Avaliações</div>', '<div data-stagger-link-text="">Resultados</div>');

// Contact info in menu and footer
html = html.replaceAll('contato@facetasdental.com.br', 'contato@conceitosaude.com.br');
html = html.replaceAll('+55 (19) 98196-3061', '+55 (94) 99208-6434');
html = html.replaceAll('https://wa.me/5519981963061', 'https://wa.me/5594992086434');
html = html.replaceAll('Rua Barbosa da Cunha, 754 — Jardim Guanabara, Campinas SP', 'Av. Jeremias Lunardelli, 146, Sala B - Redenção - PA');
html = html.replaceAll('Campinas — SP', 'Redenção — PA');
html = html.replaceAll('Campinas SP', 'Redenção - PA');
html = html.replaceAll('Campinas', 'Redenção');

// 3. Hero Section
html = html.replace(
  /<h1 data-hero="title" class="text-display">[\s\S]*?<\/h1>/i,
  '<h1 data-hero="title" class="text-display">A Sua Melhor Versão, <br/>com Saúde <span class="text-display-serif">e Vitalidade</span></h1>'
);

html = html.replace(
  'Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.',
  'Saúde integrativa, emagrecimento avançado, soroterapia, reposição hormonal e exames laboratoriais completos em um só lugar. Cuide do seu corpo de dentro para fora com medicina personalizada.'
);

// 4. Intro / About Section ("A Clínica")
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Sobre a Dra. Adrieli</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">A Clínica</div>'
);

html = html.replace(
  /<h2 data-about="title" class="h2-grotesk">[\s\S]*?<\/h2>/i,
  '<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">Na Conceito Saúde, nossa missão é</span> investigar a raiz dos seus sintomas com <span class="h2-serif">ciência, acolhimento e medicina integrativa,</span> devolvendo sua energia, disposição e <span class="h2-serif">qualidade de vida.</span> </h2>'
);

html = html.replace(
  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.',
  'Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais. Na Conceito Saúde Clínica & Laboratório, unimos médicos especializados, exames laboratoriais de alta precisão e protocolos integrativos para você viver a sua melhor versão.'
);

// 5. Services Section ("Especialidades")
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Procedimentos</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Especialidades</div>'
);

html = html.replace(
  '<h2 data-services="title" class="h1-grotesk">Transformando Sorrisos com <span class="h1-serif">Técnicas Modernas</span></h2>',
  '<h2 data-services="title" class="h1-grotesk">Protocolos Médicos <span class="h1-serif">Integrativos</span></h2>'
);

html = html.replace(
  'Temos uma equipe pronta para te atender com tecnologia de ponta, tratamentos personalizados e foco total na naturalidade do seu sorriso.',
  'Abordagem médica completa para otimizar seu metabolismo, equilibrar seus hormônios e tratar o organismo de forma integrada, segura e preventiva.'
);

// 9 Service Titles
html = html.replace('<h3>Lentes em <strong>Resina</strong></h3>', '<h3>Saúde <strong>Integrativa</strong></h3>');
html = html.replace('<h3>Facetas em <strong>Resina</strong></h3>', '<h3>Emagrecimento <strong>Avançado</strong></h3>');
html = html.replace('<h3>Clareamento <strong>Dental</strong></h3>', '<h3>Soroterapia &amp; <strong>Injetáveis</strong></h3>');
html = html.replace('<h3>Alinhadores <strong>Invisíveis</strong></h3>', '<h3>Reposição <strong>Hormonal</strong></h3>');
html = html.replace('<h3>Harmonização <strong>Facial</strong></h3>', '<h3>Consultas &amp; <strong>Exames</strong></h3>');
html = html.replace('<h3>Limpeza & <strong>Profilaxia</strong></h3>', '<h3>Tratamento de <strong>Lipedema</strong></h3>');
html = html.replace('<h3>Ortodontia <strong>Estética</strong></h3>', '<h3>Suporte a <strong>Mounjaro</strong></h3>');
html = html.replace('<h3>Odontologia <strong>Cirúrgica</strong></h3>', '<h3>Performance &amp; <strong>Massa Muscular</strong></h3>');
html = html.replace('<h3>Aparelhos <strong>Dentários</strong></h3>', '<h3>Longevidade &amp; <strong>Check-up</strong></h3>');

// 6. Why Us Section ("Diferenciais")
html = html.replace(
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Excelência e Cuidado</span> <br/>em Cada Detalhe</h2>',
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Medicina Personalizada</span> <br/>focada em Resultados</h2>'
);

html = html.replace(
  'Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.',
  'Entenda por que a Conceito Saúde é referência em saúde integrativa, emagrecimento e bem-estar em Redenção e região.'
);

// Card 1
html = html.replace('<div class="why-us-card__bg-text">Experiência</div>', '<div class="why-us-card__bg-text">Saúde Integrativa</div>');
html = html.replace('<h3 class="text-p1">Mais de 10 Anos de Experiência</h3>', '<h3 class="text-p1">Investigação Médica Completa</h3>');
html = html.replace(
  'Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.',
  'Não tratamos apenas sintomas isolados. Analisamos exames aprofundados, rotina, sono e níveis hormonais para identificar a causa raiz do desequilíbrio metabólico.'
);
html = html.replace('(Confiança &amp; Ética)', '(Diagnóstico Preciso)');

// Card 2
html = html.replace('<div class="why-us-card__bg-text">Técnica Estratificada</div>', '<div class="why-us-card__bg-text">Laboratório Próprio</div>');
html = html.replace('<h3 class="text-p1">Técnica Sem Desgastes Agressivos</h3>', '<h3 class="text-p1">Clínica &amp; Laboratório no Mesmo Local</h3>');
html = html.replace(
  'Preservamos a integridade biológica do seu dente natural. Aplicamos resinas em camadas estratificadas que reproduzem com perfeição o esmalte e a dentina.',
  'Realize seus exames laboratoriais, bioimpedância e consultas médicas no mesmo espaço. Mais agilidade, pontualidade e integração direta com a conduta médica.'
);
html = html.replace('(Preservação Natural)', '(Agilidade &amp; Conforto)');

// Card 3
html = html.replace('<div class="why-us-card__bg-text">Ambiente Acolhedor</div>', '<div class="why-us-card__bg-text">Soroterapia Avançada</div>');
html = html.replace('<h3 class="text-p1">Ambiente Acolhedor & Tranquilo</h3>', '<h3 class="text-p1">Protocolos de Soroterapia Exclusivos</h3>');
html = html.replace(
  'Consultório estruturado para oferecer uma experiência confortável, sem estresse, com horários pontuais e biossegurança em conformidade com as normas mais rigorosas.',
  'Infusões endovenosas de vitaminas, minerais e antioxidantes potentes aplicados diretamente na corrente sanguínea para rápida revitalização e máxima absorção celular.'
);
html = html.replace('(Conforto &amp; Calma)', '(Máxima Absorção)');

// Card 4
html = html.replace('<div class="why-us-card__bg-text">Planejamento Exclusivo</div>', '<div class="why-us-card__bg-text">Plano Personalizado</div>');
html = html.replace('<h3 class="text-p1">Planejamento 100% Personalizado</h3>', '<h3 class="text-p1">Conduta Terapêutica Individualizada</h3>');
html = html.replace(
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.',
  'Cada organismo possui necessidades biológicas únicas. Seu plano de emagrecimento, reposição hormonal ou suplementação é traçado especificamente para você.'
);
html = html.replace('(Exclusividade)', '(Você no Centro)');

// 7. Testimonials Section ("Resultados Reais")
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Avaliações dos Pacientes</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Resultados &amp; Superação</div>'
);

html = html.replace(
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Por Trás de Cada <span class="h1-serif">Sorriso, Uma Nova História</span></h2>',
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Superação e Coragem: <span class="h1-serif">Histórias Reais</span></h2>'
);

html = html.replace(
  'Estamos com nota máxima 5.0 no Google! Veja a experiência de quem já renovou a autoestima conosco.',
  'Veja a evolução de pacientes reais que venceram a obesidade, recuperaram a vitalidade e transformaram sua saúde na Conceito Saúde.'
);

// Testimonial 1
html = html.replace(
  '“Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!”',
  '“Perdi mais de 25kg com o protocolo de emagrecimento da Conceito Saúde. Minha disposição para trabalhar e treinar mudou da noite para o dia. Venci a obesidade com saúde!”'
);
html = html.replace('<div class="text-b2--medium">Mariana S.</div>', '<div class="text-b2--medium">Lucas M.</div>');
html = html.replace('<div class="text-caption">Lentes em Resina</div>', '<div class="text-caption">Emagrecimento Integrativo</div>');

// Testimonial 2
html = html.replace(
  '“O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!”',
  '“A soroterapia e a reposição hormonal me devolveram a vida. Eu vivia com fadiga crônica, sem foco e com queda de cabelo. Hoje tenho uma energia que não sentia há mais de 10 anos!”'
);
html = html.replace('<div class="text-b2--medium">Camila R.</div>', '<div class="text-b2--medium">Fernanda R.</div>');
html = html.replace('<div class="text-caption">Estética Dental</div>', '<div class="text-caption">Soroterapia &amp; Hormônios</div>');

// Testimonial 3
html = html.replace(
  '“Tinha muito receio de mexer nos meus dentes anteriores, mas o planejamento da doutora me passou total segurança. O resultado foi uma harmonia facial espetacular.”',
  '“Descobri e comecei o tratamento do meu lipedema com a equipe da clínica. As dores e o inchaço nas pernas diminuíram muito rápido. O acolhimento médico é sem igual!”'
);
html = html.replace('<div class="text-b2--medium">Beatriz L.</div>', '<div class="text-b2--medium">Juliana S.</div>');
html = html.replace('<div class="text-caption">Facetas em Resina</div>', '<div class="text-caption">Tratamento de Lipedema</div>');

// Testimonial 4
html = html.replace(
  '“Minhas lentes em resina ficaram perfeitas e absolutamente naturais. A técnica dela é de artista! Mudou completamente a minha autoestima e segurança profissional.”',
  '“Fiz todos os meus exames laboratoriais e a consulta médica no mesmo dia. A precisão do diagnóstico e a suplementação individualizada transformaram minha saúde em 3 meses.”'
);
html = html.replace('<div class="text-b2--medium">Juliana M.</div>', '<div class="text-b2--medium">Rodrigo P.</div>');
html = html.replace('<div class="text-caption">Lentes de Resina</div>', '<div class="text-caption">Check-up Laboratorial</div>');

// Testimonial 5
html = html.replace(
  '“Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!”',
  '“Estou em acompanhamento com suporte da Conceito Saúde. Com o plano vitamínico correto, perdi gordura sem perder massa muscular e me sinto com energia total todos os dias!”'
);
html = html.replace('<div class="text-b2--medium">Fernanda C.</div>', '<div class="text-b2--medium">Carlos E.</div>');
// second occurrence of Lentes em Resina
html = html.replace('<div class="text-caption">Lentes em Resina</div>', '<div class="text-caption">Metabolismo &amp; Performance</div>');

// 8. Team Section ("Corpo Clínico")
html = html.replace(
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Nosso corpo clínico</span> é liderado por <span class="h2-serif">profissionais dedicados</span> à sua autoestima, conforto <span class="h2-serif">e saúde bucal.</span></h2>',
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Médicos dedicados</span> a guiar você na conquista da sua <span class="h2-serif">melhor versão,</span> com <span class="h2-serif">ciência e acolhimento.</span></h2>'
);

// Card 1: Dra. Daynith Oliveira
html = html.replace('Adrieli Pereira', 'Daynith Oliveira');
html = html.replace('Responsável Técnica • CROSP 106703', 'Médica • Saúde Integrativa &amp; Longevidade');
html = html.replace('Lentes em Resina', 'Saúde Integrativa');
html = html.replace('Facetas Diretas', 'Soroterapia');
html = html.replace('Estética Dental', 'Reposição Hormonal');
html = html.replace(
  'Dra. Adrieli Pereira é cirurgiã-dentista há mais de 10 anos, especialista em Lentes em Resina Estratificada e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Focada em devolver a autoestima de sorrir através de um trabalho detalhista, ético e de alta naturalidade.',
  'Médica com foco em saúde integrativa, terapias endovenosas (soroterapia) e modulação hormonal na Conceito Saúde. Dedica-se a investigar a raiz de desequilíbrios metabólicos, fadiga crônica e lipedema com condutas médicas personalizadas.'
);

// Card 2: Dr. Demetrio Sousa
html = html.replace('Equipe Martins Clinic', 'Dr. Demetrio Sousa');
html = html.replace('Clínica Odontológica • CROSP 028690', 'Médico • Emagrecimento &amp; Metabolismo');
html = html.replace('Cavity Treatment', 'Emagrecimento');
html = html.replace('Endodontics', 'Metabolismo');
html = html.replace('Tooth Restoration', 'Performance');
html = html.replace(
  'Equipe multidisciplinar em Campinas especializada em estética, ortodontia e profilaxia. Atendimento humanizado em consultório equipado com alta tecnologia para o seu conforto.',
  'Médico focado em emagrecimento avançado, preservação de massa muscular e otimização metabólica. Conduz protocolos médicos estruturados para superação da obesidade com segurança, saúde e durabilidade.'
);

// Card 3: Equipe Conceito Saúde
html = html.replace('Dr. Olivia Hartman', 'Equipe Conceito Saúde');
html = html.replace('Especialista em Dentística Estética', 'Clínica &amp; Laboratório Especializado');
html = html.replace('Digital Smile Design', 'Exames de Sangue');
html = html.replace('Whitening', 'Bioimpedância');
html = html.replace('Cosmetic restoration', 'Suplementação');
html = html.replace(
  'Dr. Olivia Hartman focuses on creating natural-looking results that enhance each patient’s unique features. She blends modern technology with artistic vision for refined outcomes.',
  'Equipe multidisciplinar integrada para cuidar de você em cada etapa: consultas médicas, exames laboratoriais no mesmo local, bioimpedância e acompanhamento contínuo da sua evolução.'
);

// 9. CTA Section
html = html.replace(
  '<h2 data-cta="title" class="text-display">Deseja Transformar seu Sorriso <span class="text-display-serif">com Naturalidade?</span></h2>',
  '<h2 data-cta="title" class="text-display">Pronto para Conquistar a sua <span class="text-display-serif">Melhor Versão?</span></h2>'
);

html = html.replace(
  'Dê o primeiro passo rumo à sua melhor versão. Agende sua consulta com a Dra. Adrieli Pereira e venha construir um sorriso com excelência e segurança.',
  'Dê o primeiro passo em direção à sua saúde integrativa. Agende sua consulta e seus exames na Conceito Saúde Clínica & Laboratório pelo WhatsApp.'
);

// 10. Footer Section
html = html.replace(
  'Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.',
  'A sua melhor versão, com saúde. Clínica médica integrativa e laboratório de exames em Redenção - PA.'
);

html = html.replace(
  '© <span data-footer-year="">2026</span> Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.',
  '© <span data-footer-year="">2026</span> Conceito Saúde Clínica &amp; Laboratório (Borges e Borges Conceito Saúde Ltda). Todos os direitos reservados.'
);

// 11. Booking Modal Translations (Text only)
html = html.replaceAll('Agendar Avaliação', 'Agendar Consulta');
html = html.replaceAll('Selecione o procedimento desejado', 'Selecione a especialidade de interesse');
html = html.replaceAll('Procedimento de Interesse*', 'Especialidade de Interesse*');
html = html.replace('Lentes em Resina', 'Saúde Integrativa');
html = html.replace('Facetas em Resina', 'Emagrecimento Avançado');
html = html.replace('Clareamento Dental', 'Soroterapia &amp; Injetáveis');
html = html.replace('Alinhadores Invisíveis', 'Reposição Hormonal');
html = html.replace('Harmonização Facial', 'Consultas &amp; Exames');
html = html.replace('Limpeza e Profilaxia', 'Tratamento de Lipedema');
html = html.replace('Ortodontia Estética', 'Suporte a Mounjaro');
html = html.replace('Odontologia Cirúrgica', 'Performance &amp; Massa Muscular');
html = html.replace('Aparelhos Dentários', 'Longevidade &amp; Check-up');

fs.writeFileSync(targetFile, html);
console.log('Successfully adapted site to Conceito Saúde! New length:', html.length);
