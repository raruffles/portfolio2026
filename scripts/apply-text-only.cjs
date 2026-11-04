const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html');
let html = fs.readFileSync(targetFile, 'utf8');

console.log('Initial file length:', html.length);

// 1. Title
html = html.replace(/<title>Nova Dental<\/title>/gi, '<title>Dra. Adrieli Pereira | Lentes em Resina • Martins Clinic</title>');

// 2. Navigation & Header
// Menu links in Overlay
html = html.replace('<div class="nav-menu__link-text">About</div>', '<div class="nav-menu__link-text">Sobre a Dra. Adrieli</div>');
html = html.replace('<div class="nav-menu__link-text">Services</div>', '<div class="nav-menu__link-text">Procedimentos</div>');
html = html.replace('<div class="nav-menu__link-text">Why Us?</div>', '<div class="nav-menu__link-text">Diferenciais</div>');
html = html.replace('<div class="nav-menu__link-text">Testimonials</div>', '<div class="nav-menu__link-text">Avaliações</div>');
html = html.replace('<div class="nav-menu__link-text">Team</div>', '<div class="nav-menu__link-text">Corpo Clínico</div>');

// Menu contact block
html = html.replace('<div class="text-caption">Contact Us</div>', '<div class="text-caption">Atendimento WhatsApp</div>');
html = html.replace('hello@novadental.com', 'contato@facetasdental.com.br');
html = html.replace('mailto:hello@novadental.com', 'mailto:contato@facetasdental.com.br');
html = html.replace('+1 (555) 123-4567', '+55 (19) 98196-3061');
html = html.replace('tel:+15551234567', 'https://wa.me/5519981963061');
html = html.replace('123 Smile Avenue, NY 10001', 'Rua Barbosa da Cunha, 754 — Jardim Guanabara, Campinas SP');

// 3. Hero Section
html = html.replace(
  '<h1 data-hero="title" class="text-display">Your Smile, <br/>Our Commitment <span class="text-display-serif">to Excellence</span></h1>',
  '<h1 data-hero="title" class="text-display">Seu Sorriso Renovado, <br/>com Naturalidade <span class="text-display-serif">e Excelência</span></h1>'
);
html = html.replace(
  'Professional dental care that ensures your comfort and well-being. Schedule an appointment with us today!',
  'Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.'
);

// 4. About / Intro Section
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">About</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Sobre a Dra. Adrieli</div>'
);
html = html.replace(
  '<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">At Nova Dental, we are dedicated to</span> providin exceptional <span class="h2-serif">dental care in a warm,</span> welcoming environment. Our experienced team uses the latest technology <span class="h2-serif">to offer a range of treatments.</span> </h2>',
  '<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">Na Martins Clinic, nossa missão é</span> cuidar das pessoas com <span class="h2-serif">ética, zelo e arte,</span> transformando vidas através de sorrisos únicos e <span class="h2-serif">de máxima naturalidade.</span> </h2>'
);
html = html.replace(
  'We offer top-tier dental care in a welcoming space, using advanced technology for tailored treatments that prioritize your smile.',
  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.'
);

// 5. Services Section
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Services</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Procedimentos</div>'
);
html = html.replace(
  '<h2 data-services="title" class="h1-grotesk">Transforming Smiles with <span class="h1-serif">Modern Treatments</span></h2>',
  '<h2 data-services="title" class="h1-grotesk">Transformando Sorrisos com <span class="h1-serif">Técnicas Modernas</span></h2>'
);
html = html.replace(
  'Whether you&#x27;re in need of a routine check-up, a cosmetic enhancement, or emergency care, we have the expertise and technology to give you the best possible care.',
  'Temos uma equipe pronta para te atender com tecnologia de ponta, tratamentos personalizados e foco total na naturalidade do seu sorriso.'
);

// Services Card titles
html = html.replace(
  '<h3 class="h3-grotesk">Aesthetic <strong class="h3-serif">dentistry</strong></h3>',
  '<h3 class="h3-grotesk">Lentes em <strong class="h3-serif">Resina</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Veneers</h3>',
  '<h3 class="h3-grotesk">Facetas em <strong class="h3-serif">Resina</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Wisdom tooth <strong class="h3-serif">extraction</strong></h3>',
  '<h3 class="h3-grotesk">Clareamento <strong class="h3-serif">Dental</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Implantation</h3>',
  '<h3 class="h3-grotesk">Alinhadores <strong class="h3-serif">Invisíveis</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Orthodontic <strong class="h3-serif">treatment</strong></h3>',
  '<h3 class="h3-grotesk">Harmonização <strong class="h3-serif">Facial</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Professional <strong class="h3-serif">hygiene</strong></h3>',
  '<h3 class="h3-grotesk">Limpeza & <strong class="h3-serif">Profilaxia</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Teeth <strong class="h3-serif">whitening</strong></h3>',
  '<h3 class="h3-grotesk">Ortodontia <strong class="h3-serif">Estética</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Surgical <strong class="h3-serif">dentistry</strong></h3>',
  '<h3 class="h3-grotesk">Odontologia <strong class="h3-serif">Cirúrgica</strong></h3>'
);
html = html.replace(
  '<h3 class="h3-grotesk">Braces</h3>',
  '<h3 class="h3-grotesk">Aparelhos <strong class="h3-serif">Dentários</strong></h3>'
);

// Translate the card button text (keeping exact DOM structure for stagger anim)
html = html.replaceAll(
  '<div data-stagger-link-text="" class="service-card__top-text">Book an Appointment</div>',
  '<div data-stagger-link-text="" class="service-card__top-text">Agendar Consulta</div>'
);

// 6. Why Us Section
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Why us?</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Diferenciais</div>'
);
html = html.replace(
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Expert Solutions</span> <br/>with a Touch of Innovation</h2>',
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Excelência e Cuidado</span> <br/>em Cada Detalhe</h2>'
);
html = html.replace(
  'Choosing the right dental clinic is important.  <br/>These are the reasons we stand out.',
  'Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.'
);

// Card 1
html = html.replace('<div class="why-us-card__bg-text">Experienced Professionals</div>', '<div class="why-us-card__bg-text">Experiência</div>');
html = html.replace('<h3 class="text-p1">Experienced Professionals</h3>', '<h3 class="text-p1">Mais de 10 Anos de Experiência</h3>');
html = html.replace(
  'Our skilled team brings years of experience and the latest advancements to deliver effective, innovative dental care for a confident smile.',
  'Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.'
);
html = html.replace('(Precision &amp; Trust)', '(Confiança &amp; Ética)');
html = html.replace('(Precision & Trust)', '(Confiança & Ética)');

// Card 2
html = html.replace('<div class="why-us-card__bg-text">State-of-the-Art Technology</div>', '<div class="why-us-card__bg-text">Técnica Estratificada</div>');
html = html.replace('<h3 class="text-p1">State-of-the-Art Technology</h3>', '<h3 class="text-p1">Técnica Sem Desgastes Agressivos</h3>');
html = html.replace(
  '<p class="text-b2--book">We utilize the latest advancements and state-of-the-art technology to ensure accurate diagnostics and effective treatments for optimal patient care.</p>',
  '<p class="text-b2--book">Preservamos a integridade biológica do seu dente natural. Aplicamos resinas em camadas estratificadas que reproduzem com perfeição o esmalte e a dentina.</p>'
);
html = html.replace('(Cutting-Edge Perfection)', '(Preservação Natural)');

// Card 3
html = html.replace('<div class="why-us-card__bg-text">Comfort-Focused Care</div>', '<div class="why-us-card__bg-text">Ambiente Acolhedor</div>');
html = html.replace('<h3 class="text-p1">Comfort-Focused Care</h3>', '<h3 class="text-p1">Ambiente Acolhedor & Tranquilo</h3>');
// Card 3 text was identical in English template, replace second occurrence
html = html.replace(
  '<p class="text-b2--book">We utilize the latest advancements and state-of-the-art technology to ensure accurate diagnostics and effective treatments for optimal patient care.</p>',
  '<p class="text-b2--book">Consultório estruturado para oferecer uma experiência confortável, sem estresse, com horários pontuais e biossegurança em conformidade com as normas mais rigorosas.</p>'
);
html = html.replace('(Smiles with Ease)', '(Conforto & Calma)');

// Card 4
html = html.replace('<div class="why-us-card__bg-text">Patient-Centered Approach</div>', '<div class="why-us-card__bg-text">Planejamento Exclusivo</div>');
html = html.replace('<h3 class="text-p1">Patient-Centered Approach</h3>', '<h3 class="text-p1">Planejamento 100% Personalizado</h3>');
html = html.replace(
  'Your health and satisfaction are our top priority. We take the time to listen to your concerns and tailor our treatments to your needs.',
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.'
);
html = html.replace('(Focused on You)', '(Exclusividade)');

// 7. Testimonials Section
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Testimonials</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Avaliações dos Pacientes</div>'
);
html = html.replace(
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Behind Every Smile <span class="h1-serif">There’s a Story</span></h2>',
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Por Trás de Cada <span class="h1-serif">Sorriso, Uma Nova História</span></h2>'
);
html = html.replace(
  'Comfort. Trust. Results. That’s what our patients talk about — and we’re honored to share their words.',
  'Estamos com nota máxima 5.0 no Google! Veja a experiência de quem já renovou a autoestima conosco.'
);

// Testimonial 1
html = html.replace(
  '“The implantation process was much easier than I expected. The result feels just like a real tooth — I can finally eat and smile without hesitation.”',
  '“Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!”'
);
html = html.replace('<div data-testimonials="author-name" class="text-p1">Sophia</div>', '<div data-testimonials="author-name" class="text-p1">Mariana S.</div>');
html = html.replace('<div data-testimonials="author-job" class="text-b1--medium">Implantation</div>', '<div data-testimonials="author-job" class="text-b1--medium">Lentes em Resina</div>');

// Testimonial 2
html = html.replace(
  '“The surgical procedure was complex, but the doctors’ care made it smooth. Recovery was faster than expected, and the results are great.”',
  '“O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!”'
);
html = html.replace('<div data-testimonials="author-name" class="text-p1">Jessica</div>', '<div data-testimonials="author-name" class="text-p1">Camila R.</div>');
html = html.replace('<div data-testimonials="author-job" class="text-b1--medium">Surgical dentistry</div>', '<div data-testimonials="author-job" class="text-b1--medium">Estética Dental</div>');

// Testimonial 3
html = html.replace(
  '“I was dreading my wisdom tooth extraction, but the entire procedure was quick and painless. I couldn’t believe how smooth everything went.”',
  '“Tinha muito receio de mexer nos meus dentes anteriores, mas o planejamento da doutora me passou total segurança. O resultado foi uma harmonia facial espetacular.”'
);
html = html.replace('<div data-testimonials="author-name" class="text-p1">Samantha</div>', '<div data-testimonials="author-name" class="text-p1">Beatriz L.</div>');
html = html.replace('<div data-testimonials="author-job" class="text-b1--medium">Wisdom tooth extraction</div>', '<div data-testimonials="author-job" class="text-b1--medium">Facetas em Resina</div>');

// Testimonial 4
html = html.replace(
  '“My veneers look incredibly natural and completely transformed my smile. The whole process was comfortable, and I couldn’t be happier with the result.”',
  '“Minhas lentes em resina ficaram perfeitas e absolutamente naturais. A técnica dela é de artista! Mudou completamente a minha autoestima e segurança profissional.”'
);
html = html.replace('<div data-testimonials="author-name" class="text-p1">Amelia</div>', '<div data-testimonials="author-name" class="text-p1">Juliana M.</div>');
html = html.replace('<div data-testimonials="author-job" class="text-b1--medium">Veneers</div>', '<div data-testimonials="author-job" class="text-b1--medium">Lentes de Resina</div>');

// Testimonial 5
html = html.replace(
  '“Getting implantation was tough at first, but the support from the team made all the difference. After months of dedication, my smile is perfect, and I couldn’t be happier with the results.”',
  '“Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!”'
);
html = html.replace('<div data-testimonials="author-name" class="text-p1">Amanda</div>', '<div data-testimonials="author-name" class="text-p1">Fernanda C.</div>');
html = html.replace('<div data-testimonials="author-job" class="text-b1--medium">Braces</div>', '<div data-testimonials="author-job" class="text-b1--medium">Lentes em Resina</div>');

// 8. Team Section
html = html.replace(
  '<div class="caption__dot"></div><div class="text-b2--medium">Team</div>',
  '<div class="caption__dot"></div><div class="text-b2--medium">Responsabilidade Técnica</div>'
);
html = html.replace(
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Our team</span> of <span class="h2-serif">skilled professionals</span> is committed to providing you with <span class="h2-serif">personalized, high-quality</span> dental care.</h2>',
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Nosso corpo clínico</span> é liderado por <span class="h2-serif">profissionais dedicados</span> à sua autoestima, conforto <span class="h2-serif">e saúde bucal.</span></h2>'
);

// Card 1: Emily Peterson -> Adrieli Pereira
html = html.replace('Emily Peterson', 'Adrieli Pereira');
html = html.replace('Senior General Dentist', 'Responsável Técnica • CROSP 106703');
html = html.replaceAll('(Specialization)', '(Especialidades)');
html = html.replace(
  'Dr. Emily Peterson has over 10 years of experience, specializing in personalized care. She focuses on individualized treatment in a calm environment and emphasizes prevention and oral hygiene.',
  'Dra. Adrieli Pereira é cirurgiã-dentista há mais de 10 anos, especialista em Lentes em Resina Estratificada e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Focada em devolver a autoestima de sorrir através de um trabalho detalhista, ético e de alta naturalidade.'
);
html = html.replace('<div class="text-b2--medium">Cavity Treatment</div>', '<div class="text-b2--medium">Lentes em Resina</div>');
html = html.replace('<div class="text-b2--medium">Endodontics</div>', '<div class="text-b2--medium">Facetas Diretas</div>');
html = html.replace('<div class="text-b2--medium">Tooth Restoration</div>', '<div class="text-b2--medium">Estética Dental</div>');

// Card 2: Lucas Marin -> Equipe Martins Clinic
html = html.replace('Dr. Lucas Marin', 'Equipe Martins Clinic');
html = html.replace('<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr.</span>  <br/>Lucas Marin</h3>', '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Equipe</span> <br/>Martins Clinic</h3>');
html = html.replace('Senior General Dentist', 'Clínica Odontológica • CROSP 028690');
html = html.replace(
  'Dr. Lucas Peterson has over 10 years of experience, specializing in personalized care. He focuses on individualized treatment in a calm environment and emphasizes prevention and oral hygiene.',
  'Equipe multidisciplinar em Campinas especializada em estética, ortodontia e profilaxia. Atendimento humanizado em consultório equipado com alta tecnologia para o seu conforto.'
);

// 9. CTA Section
html = html.replace(
  '<h2 data-cta="title" class="text-display">Experience Dental Care, <span class="text-display-serif">Redefined.</span></h2>',
  '<h2 data-cta="title" class="text-display">Deseja Transformar seu Sorriso <span class="text-display-serif">com Naturalidade?</span></h2>'
);
html = html.replace(
  'Take the first step towards a healthier, more confident you. Schedule your consultation today.',
  'Dê o primeiro passo rumo à sua melhor versão. Agende sua consulta com a Dra. Adrieli Pereira e venha construir um sorriso com excelência e segurança.'
);

// All stagger link CTA button texts:
// "Book an Appointment" -> "Agende sua Consulta"
html = html.replaceAll(
  '<div data-stagger-link-text="">Book an Appointment</div>',
  '<div data-stagger-link-text="">Agende sua Consulta</div>'
);

// 10. Footer Section
html = html.replace('Excellence in every smile.', 'Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.');
html = html.replace('<div class="text-caption">Menu</div>', '<div class="text-caption">Navegação</div>');
html = html.replace('<a href="#about" class="footer__link">About</a>', '<a href="#about" class="footer__link">Sobre a Dra. Adrieli</a>');
html = html.replace('<a href="#services" class="footer__link">Services</a>', '<a href="#services" class="footer__link">Procedimentos</a>');
html = html.replace('<a href="#why-us" class="footer__link">Why Us?</a>', '<a href="#why-us" class="footer__link">Diferenciais</a>');
html = html.replace('<a href="#testimonials" class="footer__link">Testimonials</a>', '<a href="#testimonials" class="footer__link">Avaliações</a>');
html = html.replace('<a href="#team" class="footer__link">Team</a>', '<a href="#team" class="footer__link">Corpo Clínico</a>');

html = html.replace('<div class="text-caption">Contact Us</div>', '<div class="text-caption">Contato & Localização</div>');
html = html.replace('© 2026 Nova Dental. All rights reserved.', '© 2026 Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.');
html = html.replace(
  '<div class="footer__made-by"><div class="text-b3--book">Made with love by </div><a href="https://phenomenonstudio.com/" target="_blank" class="footer__made-link w-inline-block"><div class="text-b3--book in-link">Phenomenon Studio</div></a></div>',
  '<div class="footer__made-by"><div class="text-b3--book">Campinas — SP</div></div>'
);
html = html.replace('Terms', 'Termos');
html = html.replace('Privacy', 'Privacidade');

// 11. Booking Modal (Text only)
html = html.replace('<div class="booking-step__label">Service</div>', '<div class="booking-step__label">Procedimento</div>');
html = html.replace('<div class="booking-step__label">Contact details</div>', '<div class="booking-step__label">Seus Dados</div>');
html = html.replace('<div class="booking-step__label">Confirmation</div>', '<div class="booking-step__label">Confirmação</div>');
html = html.replace(
  '<h1 data-modal-anim="title" class="booking-form__title">Book an <span class="h1-serif">Appointment</span></h1>',
  '<h1 data-modal-anim="title" class="booking-form__title">Agendar <span class="h1-serif">Avaliação</span></h1>'
);
html = html.replace('Select service', 'Selecione o procedimento desejado');
html = html.replace('<div>Treatment*</div>', '<div>Procedimento de Interesse*</div>');
html = html.replaceAll('<div>Next Step</div>', '<div>Próximo Passo</div>');
html = html.replaceAll('<div>Back</div>', '<div>Voltar</div>');
html = html.replaceAll('<div>Submit</div>', '<div>Confirmar Agendamento</div>');
html = html.replaceAll('placeholder="Full Name"', 'placeholder="Seu Nome Completo"');
html = html.replaceAll('placeholder="Phone Number"', 'placeholder="(19) 99999-9999"');
html = html.replaceAll('placeholder="Email Address"', 'placeholder="seu@email.com"');

// Treatments in Modal:
html = html.replace('<span class="booking-treatment-card__title">Aesthetic dentistry</span>', '<span class="booking-treatment-card__title">Lentes em Resina</span>');
html = html.replace('<span class="booking-treatment-card__title">Veneers</span>', '<span class="booking-treatment-card__title">Facetas em Resina</span>');
html = html.replace('<span class="booking-treatment-card__title">Wisdom tooth extraction</span>', '<span class="booking-treatment-card__title">Clareamento Dental</span>');
html = html.replace('<span class="booking-treatment-card__title">Implantation</span>', '<span class="booking-treatment-card__title">Alinhadores Invisíveis</span>');
html = html.replace('<span class="booking-treatment-card__title">Orthodontic treatment</span>', '<span class="booking-treatment-card__title">Harmonização Facial</span>');
html = html.replace('<span class="booking-treatment-card__title">Professional hygiene</span>', '<span class="booking-treatment-card__title">Limpeza e Profilaxia</span>');
html = html.replace('<span class="booking-treatment-card__title">Teeth whitening</span>', '<span class="booking-treatment-card__title">Ortodontia Estética</span>');
html = html.replace('<span class="booking-treatment-card__title">Surgical dentistry</span>', '<span class="booking-treatment-card__title">Odontologia Cirúrgica</span>');
html = html.replace('<span class="booking-treatment-card__title">Braces</span>', '<span class="booking-treatment-card__title">Aparelhos Dentários</span>');

fs.writeFileSync(targetFile, html);
console.log('Finished text-only translation! New length:', html.length);
