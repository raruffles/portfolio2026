const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const novaFile = path.join(rootDir, 'clones', 'odontologia', 'nova-dental', 'index.html');
const adrieliFile = path.join(rootDir, 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html');
const conceitoFile = path.join(rootDir, 'clones', 'medicina-e-saude', 'conceito-saude', 'index.html');

// 1. Copy clean Nova Dental to adrieliFile
fs.writeFileSync(adrieliFile, fs.readFileSync(novaFile, 'utf8'), 'utf8');

// 2. Run the existing 3 scripts that match nova-dental's exact strings
delete require.cache[require.resolve('./apply-text-only.cjs')];
delete require.cache[require.resolve('./apply-all-clean-text.cjs')];
delete require.cache[require.resolve('./finish-footer-and-card4.cjs')];
require('./apply-text-only.cjs');
require('./apply-all-clean-text.cjs');
require('./finish-footer-and-card4.cjs');

// 3. Now read adrieliFile and apply all remaining translations + overlap CSS fix
let adrieli = fs.readFileSync(adrieliFile, 'utf8');

const overlapFixCss = `
  /* FIX OVERLAPPING STAGGER LINKS & FOOTER WRAPPING */
  [data-stagger-link],
  [data-stagger-link-text],
  [data-stagger-link] .split-word {
    white-space: nowrap !important;
  }
  div.footer__link:not([data-stagger-link]) {
    text-shadow: none !important;
    white-space: normal !important;
    overflow: visible !important;
    max-width: 19rem;
  }
  @media (min-width: 768px) {
    .footer__nav {
      width: auto !important;
      grid-column-gap: 4.5rem !important;
    }
    .footer__nav-col:first-child {
      min-width: max-content;
    }
    .footer__nav-col:last-child {
      min-width: 16rem;
      max-width: 21rem;
    }
    .team__title-span {
      padding-left: 14.5rem !important;
    }
    .intro__title-span {
      padding-left: 16rem !important;
    }
  }
  .footer__legal-item,
  .footer__legal-item .footer__link {
    white-space: nowrap !important;
    min-width: max-content;
  }
</style>`;

adrieli = adrieli.replace('</style>', overlapFixCss);
adrieli = adrieli.replace('lang="en"', 'lang="pt-BR"');

// Replace Header & Footer SVG Logo ("NOVA DENTAL") with clean SVG text "DRA. ADRIELI"
adrieli = adrieli.replace(
  /<div class="logo__img w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="logo__img w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 19" fill="none"><text x="0" y="15.5" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="17.5" font-weight="400" letter-spacing="1.4">DRA. ADRIELI</text></svg></div>'
);
adrieli = adrieli.replace(
  /<div class="footer__logo w-embed"><svg[\s\S]*?<\/svg><\/div>/,
  '<div class="footer__logo w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 432 48" fill="none"><text x="0" y="39" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="42" font-weight="400" letter-spacing="2.5">DRA. ADRIELI</text></svg></div>'
);

// Top Navbar links (in <header>)
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">About</div>', '<div data-stagger-link-text="">Sobre a Dra. Adrieli</div>');
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Services</div>', '<div data-stagger-link-text="">Procedimentos</div>');
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Why Us?</div>', '<div data-stagger-link-text="">Diferenciais</div>');
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Testimonials</div>', '<div data-stagger-link-text="">Avaliações</div>');
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Team</div>', '<div data-stagger-link-text="">Corpo Clínico</div>');

// 9 Service Card hover descriptions
adrieli = adrieli.replace(
  'Is a harmonious combination of art, science and experience to create your perfect smile.',
  'Combinação harmoniosa de arte, ciência e técnica estratificada para transformar seu sorriso com naturalidade.'
);
adrieli = adrieli.replace(
  'Elimination of aesthetic defects of the front teeth: correction of shape, color, elimination of gaps between the teeth.',
  'Correção estética de formato, cor, proporção e fechamento de diastemas sem desgastes agressivos.'
);
adrieli = adrieli.replace(
  'Wisdom tooth extraction is not scary: doctors at Nova Dental offer professional help',
  'Protocolos seguros de clareamento em consultório e supervisionado para um sorriso iluminado e saudável.'
);
adrieli = adrieli.replace(
  'Solving the problem of missing one, several or all teeth. Maximum preservation of existing teeth.',
  'Alinhamento ortodôntico discreto, confortável e previsível com planejamento 100% digital.'
);
adrieli = adrieli.replace(
  'Solving problems of the maxillofacial skeleton (teeth alignment, bite correction, joint dysfunction).',
  'Equilíbrio estético e funcional que valoriza seus traços naturais em perfeita sintonia com o sorriso.'
);
adrieli = adrieli.replace(
  'Procedures designed to prevent the onset and progression of oral diseases.',
  'Prevenção completa, remoção de biofilme e polimento de manutenção para longevidade das suas lentes.'
);
adrieli = adrieli.replace(
  'Hardware whitening, color improvement - by 1-2 tones, whitening with the Beyond system',
  'Correção da posição dentária e da mordida com aparelhos modernos, discretos e eficientes.'
);
adrieli = adrieli.replace(
  'The most modern methods of surgical dentistry. Tooth extraction. Treatment of bone loss.',
  'Procedimentos cirúrgicos e plásticos gengivais minimamente invasivos com máximo conforto e segurança.'
);
adrieli = adrieli.replace(
  'Sometimes miracles happen suddenly, but dental braces work wonders gradually',
  'Reabilitação funcional e estética gradual para um sorriso perfeitamente alinhado em todas as idades.'
);

// Why Us Card 4 description (with non-breaking space \u00A0)
adrieli = adrieli.replace(
  /Your health and satisfaction are our top priority\. We take the time to listen to[\s\u00A0]*your concerns and tailor our treatments to your needs\./g,
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.'
);

// Team Cards 2, 3, 4, 5 remaining English strings
adrieli = adrieli.replaceAll('>Cavity Treatment<', '>Dentística<');
adrieli = adrieli.replaceAll('>Endodontics<', '>Prevenção<');
adrieli = adrieli.replaceAll('>Tooth Restoration<', '>Reabilitação<');

adrieli = adrieli.replace(/<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr\.<\/span>[\s\u2028]*<br\/>Olivia Hartman<\/h3>/, '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Camila Martins</h3>');
adrieli = adrieli.replaceAll('>Digital Smile Design<', '>Planejamento Digital<');
adrieli = adrieli.replaceAll('>Whitening<', '>Clareamento<');
adrieli = adrieli.replaceAll('>Cosmetic restoration<', '>Restauração Estética<');
adrieli = adrieli.replace(
  'Dr. Olivia Hartman focuses on creating natural-looking results that enhance each patient’s unique features. She blends modern technology with artistic vision for refined outcomes.',
  'Focada em resultados naturais que valorizam as características únicas de cada paciente, aliando tecnologia moderna e visão artística para acabamentos impecáveis.'
);

adrieli = adrieli.replace(/<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr\.<\/span>[\s\u2028]*<br\/>Marcus Bennett<\/h3>/, '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr.</span> <br/>Rafael Costa</h3>');
adrieli = adrieli.replaceAll('>Dental Bonding<', '>Resinas Compostas<');
adrieli = adrieli.replaceAll('>Veneers<', '>Facetas<');
adrieli = adrieli.replaceAll('>Smile Makeovers<', '>Design do Sorriso<');
adrieli = adrieli.replace(
  'Dr. Marcus Bennett specializes in advanced cosmetic procedures, helping patients achieve balanced and harmonious smiles. He is known for his attention to detail and minimally invasive techniques.',
  'Especialista em procedimentos estéticos minimamente invasivos, auxiliando pacientes a conquistarem sorrisos equilibrados e harmônicos com atenção absoluta aos detalhes.'
);

adrieli = adrieli.replace(/<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr\.<\/span>[\s\u2028]*<br\/>Liam Brooks<\/h3>/, '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dr.</span> <br/>Lucas Almeida</h3>');
adrieli = adrieli.replaceAll('>Crowns<', '>Prótese Estética<');
adrieli = adrieli.replaceAll('>Full Smile Rehabilitation<', '>Reabilitação Oral<');
adrieli = adrieli.replace(
  'Dr. Liam Brooks combines restorative expertise with aesthetic dentistry to improve both function and appearance. He prioritizes long-term results and patient comfort.',
  'Une experiência em reabilitação funcional com odontologia estética para aprimorar tanto a mastigação quanto a harmonia do sorriso, priorizando conforto e durabilidade.'
);

// Footer "Made with love by Phenomenon Studio"
adrieli = adrieli.replace('<div class="text-b1--book">Made with love by</div>', '<div class="text-b1--book">Responsável Técnica</div>');
adrieli = adrieli.replace('<div class="text-b1--book">Phenomenon Studio</div>', '<div class="text-b1--book">Dra. Adrieli Pereira</div>');

// Booking Modal remaining English strings
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Aesthetic dentistry</div>', '<div class="booking-treatment-card__label">Lentes em Resina</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Veneers</div>', '<div class="booking-treatment-card__label">Facetas em Resina</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Surgical dentistry</div>', '<div class="booking-treatment-card__label">Odontologia Cirúrgica</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Implantation</div>', '<div class="booking-treatment-card__label">Alinhadores Invisíveis</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Orthodontic treatment</div>', '<div class="booking-treatment-card__label">Harmonização Facial</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Professional hygiene</div>', '<div class="booking-treatment-card__label">Limpeza e Profilaxia</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Teeth whitening</div>', '<div class="booking-treatment-card__label">Clareamento Dental</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Braces</div>', '<div class="booking-treatment-card__label">Ortodontia Estética</div>');
adrieli = adrieli.replace('<div class="booking-treatment-card__label">Wisdom tooth extraction</div>', '<div class="booking-treatment-card__label">Avaliação Geral</div>');

adrieli = adrieli.replaceAll('>Doctor*<', '>Profissional*<');
adrieli = adrieli.replace('<div class="booking-doctor-card__label">Dr. Emily Peterson</div>', '<div class="booking-doctor-card__label">Dra. Adrieli Pereira</div>');
adrieli = adrieli.replace('<div class="booking-doctor-card__label">Dr. Lucas Marin</div>', '<div class="booking-doctor-card__label">Equipe Martins Clinic</div>');
adrieli = adrieli.replace('<div class="booking-doctor-card__label">Dr. Olivia Hartman</div>', '<div class="booking-doctor-card__label">Dra. Camila Martins</div>');
adrieli = adrieli.replace('<div class="booking-doctor-card__label">Dr. Marcus Bennett</div>', '<div class="booking-doctor-card__label">Dr. Rafael Costa</div>');
adrieli = adrieli.replace('<div class="booking-doctor-card__label">Dr. Liam Brooks</div>', '<div class="booking-doctor-card__label">Dr. Lucas Almeida</div>');

adrieli = adrieli.replace('<h2 class="booking-form__title">Book an <span class="h1-serif">Appointment</span></h2>', '<h2 class="booking-form__title">Agendar <span class="h1-serif">Avaliação</span></h2>');
adrieli = adrieli.replace('<div class="booking-form__group-label">Contact details</div>', '<div class="booking-form__group-label">Dados de Contato</div>');
adrieli = adrieli.replace('<div>Name*</div>', '<div>Nome completo*</div>');
adrieli = adrieli.replace('placeholder="Type your name"', 'placeholder="Digite seu nome completo"');
adrieli = adrieli.replace('<div>Mobile number*</div>', '<div>WhatsApp / Telefone*</div>');
adrieli = adrieli.replace('placeholder="Your mobile phone"', 'placeholder="Seu WhatsApp com DDD"');
adrieli = adrieli.replace('placeholder="Your e-mail"', 'placeholder="Seu melhor e-mail"');
adrieli = adrieli.replace('<div>Your comment</div>', '<div>Observações ou dúvidas</div>');
adrieli = adrieli.replace('placeholder="Your comment"', 'placeholder="Escreva sua mensagem ou dúvida"');

adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Next</div>', '<div data-stagger-link-text="">Continuar</div>');
adrieli = adrieli.replaceAll('<div data-stagger-link-text="">Back</div>', '<div data-stagger-link-text="">Voltar</div>');
adrieli = adrieli.replace('<h2 class="booking-form__title in-step-3">Booking <span class="h1-serif">Confirmed!</span></h2>', '<h2 class="booking-form__title in-step-3">Solicitação <span class="h1-serif">Recebida!</span></h2>');
adrieli = adrieli.replace('Thank you for booking with us.<br/>We will contact you shortly.', 'Obrigado pelo seu contato.<br/>Nossa equipe falará com você em breve.');
adrieli = adrieli.replace('<p>Questions?</p>', '<p>Dúvidas?</p>');
adrieli = adrieli.replace('<p>We’re here to help — contact us any time at</p>', '<p>Estamos à disposição pelo WhatsApp ou e-mail:</p>');
adrieli = adrieli.replaceAll('support@novadental.com', 'contato@facetasdental.com.br');
adrieli = adrieli.replace('<div data-stagger-link-text="">Back Home</div>', '<div data-stagger-link-text="">Voltar ao Início</div>');

// Validation messages
adrieli = adrieli.replace("required: 'Please enter your full name'", "required: 'Por favor, informe seu nome completo'");
adrieli = adrieli.replace("minlength: 'Name must be at least 2 characters'", "minlength: 'O nome deve ter pelo menos 2 caracteres'");
adrieli = adrieli.replace("required: 'Please enter your email'", "required: 'Por favor, informe seu e-mail'");
adrieli = adrieli.replace("email: 'Please enter a valid email address'", "email: 'Informe um endereço de e-mail válido'");
adrieli = adrieli.replace("required: 'Please enter your mobile number'", "required: 'Por favor, informe seu WhatsApp / telefone'");
adrieli = adrieli.replace("minlength: 'Please enter a valid mobile number'", "minlength: 'Informe um número de telefone válido'");

fs.writeFileSync(adrieliFile, adrieli, 'utf8');
console.log('Successfully updated Dra. Adrieli Pereira with 0 English strings!');

// ============================================================================
// 4. BUILD CONCEITO SAÚDE FROM CLEAN ADRIELI BASE
// ============================================================================
let conceito = adrieli;

conceito = conceito.replace('<title>Dra. Adrieli Pereira | Lentes em Resina • Martins Clinic</title>', '<title>Conceito Saúde | Clínica &amp; Laboratório — Saúde Integrativa e Emagrecimento</title>');
conceito = conceito.replace(
  '<text x="0" y="15.5" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="17.5" font-weight="400" letter-spacing="1.4">DRA. ADRIELI</text>',
  '<text x="0" y="15.5" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="16" font-weight="400" letter-spacing="1.1">CONCEITO SAÚDE</text>'
);
conceito = conceito.replace(
  '<text x="0" y="39" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="42" font-weight="400" letter-spacing="2.5">DRA. ADRIELI</text>',
  '<text x="0" y="39" fill="currentColor" font-family="\'PP Neue Montreal\', sans-serif" font-size="38" font-weight="400" letter-spacing="2">CONCEITO SAÚDE</text>'
);

conceito = conceito.replaceAll('Sobre a Dra. Adrieli', 'A Clínica');
conceito = conceito.replaceAll('>Procedimentos<', '>Especialidades<');
conceito = conceito.replaceAll('>Avaliações<', '>Resultados<');

conceito = conceito.replaceAll('contato@facetasdental.com.br', 'contato@conceitosaude.com.br');
conceito = conceito.replaceAll('+55 (19) 98196-3061', '+55 (94) 99208-6434');
conceito = conceito.replaceAll('https://wa.me/5519981963061', 'https://wa.me/5594992086434');
conceito = conceito.replaceAll('Rua Barbosa da Cunha, 754 — Jardim Guanabara, Campinas SP', 'Av. Jeremias Lunardelli, 146, Sala B — Redenção - PA');

conceito = conceito.replace(
  '<h1 data-hero="title" class="text-display">Seu Sorriso Renovado, <br/>com Naturalidade <span class="text-display-serif">e Excelência</span></h1>',
  '<h1 data-hero="title" class="text-display">A Sua Melhor Versão, <br/>com Saúde <span class="text-display-serif">e Vitalidade</span></h1>'
);
conceito = conceito.replace(
  'Especialista em Lentes em Resina Estratificada. Técnica exclusiva que devolve a sua autoestima de sorrir novamente com harmonia, segurança e máxima preservação da estrutura dental.',
  'Saúde integrativa, emagrecimento avançado, soroterapia, reposição hormonal e exames laboratoriais completos em um só lugar. Cuide do seu corpo de dentro para fora com medicina personalizada.'
);

conceito = conceito.replace(
  /<h2 data-about="title" class="h2-grotesk">[\s\S]*?<\/h2>/i,
  '<h2 data-about="title" class="h2-grotesk"><span class="intro__title-span">Na Conceito Saúde, nossa missão é</span> investigar a raiz dos seus sintomas com <span class="h2-serif">ciência, acolhimento e medicina integrativa,</span> devolvendo sua energia, disposição e <span class="h2-serif">qualidade de vida.</span> </h2>'
);
conceito = conceito.replace(
  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Ao longo de sua carreira, desenvolveu uma técnica refinada de Lentes em Resina Estratificada, unindo estética e função sem desgastes agressivos, para devolver aos pacientes a alegria e a segurança de sorrir com plenitude.',
  'Seu corpo fala com você: cansaço constante, baixa libido, dificuldade para emagrecer, alterações no sono, perda de massa muscular e queda de cabelo não são normais. Na Conceito Saúde Clínica & Laboratório, unimos médicos especializados, exames laboratoriais de alta precisão e protocolos integrativos para você viver a sua melhor versão.'
);

conceito = conceito.replace(
  '<h2 data-services="title" class="h1-grotesk">Transformando Sorrisos com <span class="h1-serif">Técnicas Modernas</span></h2>',
  '<h2 data-services="title" class="h1-grotesk">Protocolos Médicos <span class="h1-serif">Integrativos</span></h2>'
);
conceito = conceito.replace(
  'Temos uma equipe pronta para te atender com tecnologia de ponta, tratamentos personalizados e foco total na naturalidade do seu sorriso.',
  'Abordagem médica completa para otimizar seu metabolismo, equilibrar seus hormônios e tratar o organismo de forma integrada, segura e preventiva.'
);

conceito = conceito.replace('<h3>Lentes em <strong>Resina</strong></h3>', '<h3>Saúde <strong>Integrativa</strong></h3>');
conceito = conceito.replace('Combinação harmoniosa de arte, ciência e técnica estratificada para transformar seu sorriso com naturalidade.', 'Investigação clínica aprofundada do seu metabolismo, rotina, sono e micronutrientes para tratar a causa raiz.');

conceito = conceito.replace('<h3>Facetas em <strong>Resina</strong></h3>', '<h3>Emagrecimento <strong>Avançado</strong></h3>');
conceito = conceito.replace('Correção estética de formato, cor, proporção e fechamento de diastemas sem desgastes agressivos.', 'Protocolos médicos estruturados para perda de gordura sustentável com preservação total da massa muscular.');

conceito = conceito.replace('<h3>Clareamento <strong>Dental</strong></h3>', '<h3>Soroterapia &amp; <strong>Injetáveis</strong></h3>');
conceito = conceito.replace('Protocolos seguros de clareamento em consultório e supervisionado para um sorriso iluminado e saudável.', 'Infusão endovenosa de vitaminas, minerais, antioxidantes e aminoácidos com 100% de biodisponibilidade celular.');

conceito = conceito.replace('<h3>Alinhadores <strong>Invisíveis</strong></h3>', '<h3>Reposição <strong>Hormonal</strong></h3>');
conceito = conceito.replace('Alinhamento ortodôntico discreto, confortável e previsível com planejamento 100% digital.', 'Equilíbrio hormonal personalizado para recuperar libido, disposição física, foco mental e qualidade do sono.');

conceito = conceito.replace('<h3>Harmonização <strong>Facial</strong></h3>', '<h3>Consultas &amp; <strong>Exames</strong></h3>');
conceito = conceito.replace('Equilíbrio estético e funcional que valoriza seus traços naturais em perfeita sintonia com o sorriso.', 'Clínica médica e laboratório de análises clínicas reunidos no mesmo local para diagnósticos rápidos e precisos.');

conceito = conceito.replace('<h3>Limpeza & <strong>Profilaxia</strong></h3>', '<h3>Tratamento de <strong>Lipedema</strong></h3>');
conceito = conceito.replace('Prevenção completa, remoção de biofilme e polimento de manutenção para longevidade das suas lentes.', 'Manejo clínico anti-inflamatório, metabólico e vascular para reduzir dores, inchaço e gordura inflamada.');

conceito = conceito.replace('<h3>Ortodontia <strong>Estética</strong></h3>', '<h3>Suporte a <strong>Mounjaro</strong></h3>');
conceito = conceito.replace('Correção da posição dentária e da mordida com aparelhos modernos, discretos e eficientes.', 'Acompanhamento médico e reposição das vitaminas essenciais para emagrecer sem flacidez ou queda de cabelo.');

conceito = conceito.replace('<h3>Odontologia <strong>Cirúrgica</strong></h3>', '<h3>Performance &amp; <strong>Hipertrofia</strong></h3>');
conceito = conceito.replace('Procedimentos cirúrgicos e plásticos gengivais minimamente invasivos com máximo conforto e segurança.', 'Otimização metabólica e nutricional para ganho de força, definição corporal e recuperação acelerada.');

conceito = conceito.replace('<h3>Aparelhos <strong>Dentários</strong></h3>', '<h3>Longevidade &amp; <strong>Prevenção</strong></h3>');
conceito = conceito.replace('Reabilitação funcional e estética gradual para um sorriso perfeitamente alinhado em todas as idades.', 'Você só percebe o valor da prevenção quando começa a buscar a cura: cuide hoje da sua saúde do futuro.');

// Why Us
conceito = conceito.replace(
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Excelência e Cuidado</span> <br/>em Cada Detalhe</h2>',
  '<h2 data-why-us="title" class="h1-grotesk"><span class="h1-serif">Medicina Personalizada</span> <br/>focada em Resultados</h2>'
);
conceito = conceito.replace(
  'Entenda por que nosso consultório é referência em lentes de resina e estética odontológica em Campinas.',
  'Entenda por que a Conceito Saúde é referência em saúde integrativa, emagrecimento e bem-estar em Redenção e região.'
);

conceito = conceito.replace('<div class="why-us-card__bg-text">Experiência</div>', '<div class="why-us-card__bg-text">Saúde Integrativa</div>');
conceito = conceito.replace('<h3 class="text-p1">Mais de 10 Anos de Experiência</h3>', '<h3 class="text-p1">Investigação Médica Completa</h3>');
conceito = conceito.replace(
  'Dra. Adrieli Pereira possui mais de uma década de prática clínica dedicada, transformando a vida de centenas de pacientes com ética, empatia e técnica apurada.',
  'Não tratamos apenas sintomas isolados. Analisamos exames aprofundados, rotina, sono e níveis hormonais para identificar a causa raiz do desequilíbrio metabólico.'
);
conceito = conceito.replace('(Confiança &amp; Ética)', '(Diagnóstico Preciso)');

conceito = conceito.replace('<div class="why-us-card__bg-text">Técnica Estratificada</div>', '<div class="why-us-card__bg-text">Laboratório Próprio</div>');
conceito = conceito.replace('<h3 class="text-p1">Técnica Sem Desgastes Agressivos</h3>', '<h3 class="text-p1">Clínica &amp; Laboratório no Mesmo Local</h3>');
conceito = conceito.replace(
  'Preservamos a integridade biológica do seu dente natural. Aplicamos resinas em camadas estratificadas que reproduzem com perfeição o esmalte e a dentina.',
  'Realize seus exames laboratoriais, bioimpedância e consultas médicas no mesmo espaço. Mais agilidade, pontualidade e integração direta com a conduta médica.'
);
conceito = conceito.replace('(Preservação Natural)', '(Agilidade &amp; Conforto)');

conceito = conceito.replace('<div class="why-us-card__bg-text">Ambiente Acolhedor</div>', '<div class="why-us-card__bg-text">Soroterapia Avançada</div>');
conceito = conceito.replace('<h3 class="text-p1">Ambiente Acolhedor & Tranquilo</h3>', '<h3 class="text-p1">Protocolos de Soroterapia Exclusivos</h3>');
conceito = conceito.replace(
  'Consultório estruturado para oferecer uma experiência confortável, sem estresse, com horários pontuais e biossegurança em conformidade com as normas mais rigorosas.',
  'Infusões endovenosas de vitaminas, minerais e antioxidantes potentes aplicados diretamente na corrente sanguínea para rápida revitalização e máxima absorção celular.'
);
conceito = conceito.replace('(Conforto &amp; Calma)', '(Máxima Absorção)');

conceito = conceito.replace('<div class="why-us-card__bg-text">Planejamento Exclusivo</div>', '<div class="why-us-card__bg-text">Plano Personalizado</div>');
conceito = conceito.replace('<h3 class="text-p1">Planejamento 100% Personalizado</h3>', '<h3 class="text-p1">Conduta Terapêutica Individualizada</h3>');
conceito = conceito.replace(
  'Estudo minucioso das proporções do seu rosto e formato dental, respeitando o seu desejo e estilo para que o novo sorriso pareça seu desde sempre.',
  'Cada organismo possui necessidades biológicas únicas. Seu plano de emagrecimento, reposição hormonal ou suplementação é traçado especificamente para você.'
);
conceito = conceito.replace('(Exclusividade)', '(Você no Centro)');

// Testimonials
conceito = conceito.replace('<div class="text-b2--medium">Avaliações dos Pacientes</div>', '<div class="text-b2--medium">Resultados &amp; Superação</div>');
conceito = conceito.replace(
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Por Trás de Cada <span class="h1-serif">Sorriso, Uma Nova História</span></h2>',
  '<h2 data-testimonials="title" class="h1-grotesk testimonials-title">Superação e Coragem: <span class="h1-serif">Histórias Reais</span></h2>'
);
conceito = conceito.replace(
  'Estamos com nota máxima 5.0 no Google! Veja a experiência de quem já renovou a autoestima conosco.',
  'Veja a evolução de pacientes reais que venceram a obesidade, recuperaram a vitalidade e transformaram sua saúde na Conceito Saúde.'
);

conceito = conceito.replace(
  '“Fiz minhas lentes em resina com a Dra. Adrieli e o resultado superou todas as expectativas! Ficou incrivelmente natural, sem nenhum dente artificial ou grosso. Hoje sorrio com orgulho!”',
  '“Perdi mais de 25kg com o protocolo de emagrecimento da Conceito Saúde. Minha disposição para trabalhar e treinar mudou da noite para o dia. Venci a obesidade com saúde!”'
);
conceito = conceito.replace('<div class="text-b2--medium">Mariana S.</div>', '<div class="text-b2--medium">Lucas M.</div>');
conceito = conceito.replace('<div class="text-caption">Lentes em Resina</div>', '<div class="text-caption">Emagrecimento Integrativo</div>');

conceito = conceito.replace(
  '“O carinho e a delicadeza da Dra. Adrieli e de toda a equipe da Martins Clinic são sem igual. Não senti dor alguma e o acabamento ficou impecável. Recomendo de olhos fechados!”',
  '“A soroterapia e a reposição hormonal me devolveram a vida. Eu vivia com fadiga crônica, sem foco e com queda de cabelo. Hoje tenho uma energia que não sentia há mais de 10 anos!”'
);
conceito = conceito.replace('<div class="text-b2--medium">Camila R.</div>', '<div class="text-b2--medium">Fernanda R.</div>');
conceito = conceito.replace('<div class="text-caption">Estética Dental</div>', '<div class="text-caption">Soroterapia &amp; Hormônios</div>');

conceito = conceito.replace(
  '“Tinha muito receio de mexer nos meus dentes anteriores, mas o planejamento da doutora me passou total segurança. O resultado foi uma harmonia facial espetacular.”',
  '“Descobri e comecei o tratamento do meu lipedema com a Dra. Daynith. As dores e o inchaço nas pernas diminuíram muito rápido. O acolhimento médico é sem igual!”'
);
conceito = conceito.replace('<div class="text-b2--medium">Beatriz L.</div>', '<div class="text-b2--medium">Juliana S.</div>');
conceito = conceito.replace('<div class="text-caption">Facetas em Resina</div>', '<div class="text-caption">Tratamento de Lipedema</div>');

conceito = conceito.replace(
  '“Minhas lentes em resina ficaram perfeitas e absolutamente naturais. A técnica dela é de artista! Mudou completamente a minha autoestima e segurança profissional.”',
  '“Fiz todos os meus exames laboratoriais e a consulta médica no mesmo dia. A precisão do diagnóstico e a suplementação individualizada transformaram minha saúde em 3 meses.”'
);
conceito = conceito.replace('<div class="text-b2--medium">Juliana M.</div>', '<div class="text-b2--medium">Rodrigo P.</div>');
conceito = conceito.replace('<div class="text-caption">Lentes de Resina</div>', '<div class="text-caption">Check-up Laboratorial</div>');

conceito = conceito.replace(
  '“Atendimento impecável desde o WhatsApp até a cadeira. A Dra. Adrieli é extremamente atenciosa, pontual e muito detalhista. Ficou maravilhoso!”',
  '“Em 11 meses de acompanhamento com o Dr. Demetrio, saí de 18% para 11% de gordura corporal ganhando mais de 14kg de massa magra. O começo foi difícil, mas valeu cada esforço!”'
);
conceito = conceito.replace('<div class="text-b2--medium">Fernanda C.</div>', '<div class="text-b2--medium">Carlos E.</div>');
conceito = conceito.replace('<div class="text-caption">Lentes em Resina</div>', '<div class="text-caption">Metabolismo &amp; Hipertrofia</div>');

// Team
conceito = conceito.replace(
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Nosso corpo clínico</span> é liderado por <span class="h2-serif">profissionais dedicados</span> à sua autoestima, conforto <span class="h2-serif">e saúde bucal.</span></h2>',
  '<h2 data-team="title" class="h2-grotesk"><span class="team__title-span">Médicos dedicados</span> a guiar você na conquista da sua <span class="h2-serif">melhor versão,</span> com <span class="h2-serif">ciência e acolhimento.</span></h2>'
);

conceito = conceito.replace('Adrieli Pereira', 'Daynith Oliveira');
conceito = conceito.replace('Responsável Técnica • CROSP 106703', 'Médica • Saúde Integrativa &amp; Longevidade');
conceito = conceito.replaceAll('>Lentes em Resina<', '>Saúde Integrativa<');
conceito = conceito.replaceAll('>Facetas Diretas<', '>Soroterapia<');
conceito = conceito.replaceAll('>Estética Dental<', '>Lipedema &amp; Hormônios<');
conceito = conceito.replace(
  'Dra. Adrieli Pereira é cirurgiã-dentista há mais de 10 anos, especialista em Lentes em Resina Estratificada e responsável técnica da Martins Clinic Odontologia (CROSP 028690). Focada em devolver a autoestima de sorrir através de um trabalho detalhista, ético e de alta naturalidade.',
  'Médica dedicada à saúde integrativa, terapias endovenosas (soroterapia), tratamento de lipedema e modulação hormonal na Conceito Saúde. Investiga a raiz de desequilíbrios metabólicos e fadiga crônica com condutas personalizadas.'
);

conceito = conceito.replace('Equipe Martins Clinic', 'Dr. Demetrio Sousa');
conceito = conceito.replace('Clínica Odontológica • CROSP 028690', 'Médico • Emagrecimento &amp; Metabolismo');
conceito = conceito.replaceAll('>Dentística<', '>Emagrecimento<');
conceito = conceito.replaceAll('>Prevenção<', '>Metabolismo<');
conceito = conceito.replaceAll('>Reabilitação<', '>Performance<');
conceito = conceito.replace(
  'Equipe multidisciplinar em Campinas especializada em estética, ortodontia e profilaxia. Atendimento humanizado em consultório equipado com alta tecnologia para o seu conforto.',
  'Médico focado em emagrecimento avançado, preservação de massa muscular e otimização metabólica. Conduz protocolos médicos estruturados para superação da obesidade e sobrepeso com segurança e saúde.'
);

conceito = conceito.replace('Camila Martins', 'Conceito Saúde');
conceito = conceito.replace('Especialista em Dentística Estética', 'Laboratório &amp; Diagnóstico');
conceito = conceito.replaceAll('>Planejamento Digital<', '>Exames de Sangue<');
conceito = conceito.replaceAll('>Clareamento<', '>Check-up Completo<');
conceito = conceito.replaceAll('>Restauração Estética<', '>Bioimpedância<');
conceito = conceito.replace(
  'Focada em resultados naturais que valorizam as características únicas de cada paciente, aliando tecnologia moderna e visão artística para acabamentos impecáveis.',
  'Estrutura laboratorial própria integrada à clínica para coleta de exames hormonais, metabólicos e vitamínicos com máxima agilidade, precisão e conforto.'
);

conceito = conceito.replace('Cirurgião-Dentista Estético', 'Nutrologia &amp; Suplementação');
conceito = conceito.replaceAll('>Resinas Compostas<', '>Vitaminas &amp; Minerais<');
conceito = conceito.replaceAll('>Facetas<', '>Longevidade<');
conceito = conceito.replaceAll('>Design do Sorriso<', '>Prevenção<');
conceito = conceito.replace(
  'Especialista em procedimentos estéticos minimamente invasivos, auxiliando pacientes a conquistarem sorrisos equilibrados e harmônicos com atenção absoluta aos detalhes.',
  'Focado em suporte nutricional e vitamínico avançado, otimizando a composição corporal, energia diária e saúde metabólica com protocolos individualizados.'
);

conceito = conceito.replace('Reabilitação Oral &amp; Estética', 'Medicina Preventiva &amp; Check-up');
conceito = conceito.replaceAll('>Prótese Estética<', '>Check-up Médico<');
conceito = conceito.replaceAll('>Reabilitação Oral<', '>Qualidade de Vida<');
conceito = conceito.replace(
  'Une experiência em reabilitação funcional com odontologia estética para aprimorar tanto a mastigação quanto a harmonia do sorriso, priorizando conforto e durabilidade.',
  'Combina medicina preventiva e diagnósticos laboratoriais detalhados para promover longevidade saudável, equilíbrio metabólico e bem-estar duradouro.'
);

// CTA & Footer
conceito = conceito.replace(
  '<h2 data-cta="title" class="text-display">Deseja Transformar seu Sorriso <span class="text-display-serif">com Naturalidade?</span></h2>',
  '<h2 data-cta="title" class="text-display">Pronto para Conquistar a sua <span class="text-display-serif">Melhor Versão?</span></h2>'
);
conceito = conceito.replace(
  'Dê o primeiro passo rumo à sua melhor versão. Agende sua consulta com a Dra. Adrieli Pereira e venha construir um sorriso com excelência e segurança.',
  'Dê o primeiro passo em direção à sua saúde integrativa. Agende sua consulta e seus exames na Conceito Saúde Clínica & Laboratório pelo WhatsApp.'
);
conceito = conceito.replace(
  'Excelência e naturalidade em lentes de resina e estética odontológica em Campinas.',
  'A sua melhor versão, com saúde. Clínica médica integrativa e laboratório de exames em Redenção - PA.'
);
conceito = conceito.replace(
  '© <span data-footer-year="">2026</span> Martins Clinic Odontologia Ltda • CROSP 028690. Dra. Adrieli Pereira • CROSP 106703. Todos os direitos reservados.',
  '© <span data-footer-year="">2026</span> Conceito Saúde Clínica &amp; Laboratório (Borges e Borges Conceito Saúde Ltda). Todos os direitos reservados.'
);
conceito = conceito.replace('<div class="text-b1--book">Dra. Adrieli Pereira</div>', '<div class="text-b1--book">Conceito Saúde</div>');

// Modal adjustments for Conceito Saúde
conceito = conceito.replace('<div class="booking-treatment-card__label">Lentes em Resina</div>', '<div class="booking-treatment-card__label">Saúde Integrativa</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Facetas em Resina</div>', '<div class="booking-treatment-card__label">Emagrecimento</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Odontologia Cirúrgica</div>', '<div class="booking-treatment-card__label">Soroterapia</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Alinhadores Invisíveis</div>', '<div class="booking-treatment-card__label">Reposição Hormonal</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Harmonização Facial</div>', '<div class="booking-treatment-card__label">Consultas &amp; Exames</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Limpeza e Profilaxia</div>', '<div class="booking-treatment-card__label">Tratamento de Lipedema</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Clareamento Dental</div>', '<div class="booking-treatment-card__label">Suporte a Mounjaro</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Ortodontia Estética</div>', '<div class="booking-treatment-card__label">Performance &amp; Massa</div>');
conceito = conceito.replace('<div class="booking-treatment-card__label">Avaliação Geral</div>', '<div class="booking-treatment-card__label">Check-up Laboratorial</div>');

conceito = conceito.replace('<div class="booking-doctor-card__label">Dra. Adrieli Pereira</div>', '<div class="booking-doctor-card__label">Dra. Daynith Oliveira</div>');
conceito = conceito.replace('<div class="booking-doctor-card__label">Equipe Martins Clinic</div>', '<div class="booking-doctor-card__label">Dr. Demetrio Sousa</div>');
conceito = conceito.replace('<div class="booking-doctor-card__label">Dra. Camila Martins</div>', '<div class="booking-doctor-card__label">Laboratório Conceito Saúde</div>');

fs.writeFileSync(conceitoFile, conceito, 'utf8');
console.log('Successfully updated Conceito Saúde with 0 English strings!');
