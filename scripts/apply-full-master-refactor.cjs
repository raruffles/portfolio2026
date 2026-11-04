const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const clonePath = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade', 'index.html');
const previaPath = path.join(rootDir, 'previas', 'dr-ricardo-andrade', 'index.html');

let html = fs.readFileSync(clonePath, 'utf8');

// =========================================================================
// 1. TOP NAVBAR: 100% PORTUGUESE & NO GHOST TEXT
// =========================================================================
const navMenuRegex = /<nav role="navigation" class="nav-menu-wrap w-nav-menu">[\s\S]*?<\/nav>/i;
const updatedNavMenu = `<nav role="navigation" class="nav-menu-wrap w-nav-menu">
  <div class="nav__menu-top"></div>
  <div class="nav-menu">
    <ul role="list" class="nav-list">
      <li data-header="nav-item" class="nav-list__item"><a href="#about" class="nav-list__link w-inline-block"><div>Dr. Ricardo</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#services" class="nav-list__link w-inline-block"><div>Cirurgias</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#why-us" class="nav-list__link w-inline-block"><div>Diferenciais</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#results" class="nav-list__link w-inline-block"><div>Resultados</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#youtube" class="nav-list__link w-inline-block"><div>Vídeos</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#team" class="nav-list__link w-inline-block"><div>Equipe</div></a></li>
      <li data-header="nav-item" class="nav-list__item"><a href="#contato" class="nav-list__link w-inline-block"><div>Contato</div></a></li>
    </ul>
    <a data-header="cta" data-book-trigger="" href="#" class="nav-cta-btn w-inline-block">
      <span>( Agendar Consulta )</span>
    </a>
  </div>
</nav>`;

if (navMenuRegex.test(html)) {
  html = html.replace(navMenuRegex, updatedNavMenu);
  console.log('1. Navbar updated and translated.');
}

// =========================================================================
// 2. SERVICES SECTION HEADING: THEMED FOR PLASTIC SURGERY
// =========================================================================
const servicesHeadingRegex = /<div data-services="heading" class="heading global-heading">[\s\S]*?<div class="services__col-wrap w-dyn-list">/i;
const newServicesHeading = `<div data-services="heading" class="heading global-heading">
  <div data-services="caption" class="caption">
    <div class="caption__dot"></div>
    <div class="text-b2--medium">Procedimentos Cirúrgicos</div>
  </div>
  <div class="g-title services__title">
    <h2 data-services="title" class="h1-grotesk">
      Excelência e Precisão em <span class="h1-serif">Cirurgia Plástica</span>
    </h2>
    <div class="g-title__subtitle">
      <p data-services="subtitle" class="text-b1--book">
        Abordagens cirúrgicas personalizadas com rigor ético, segurança hospitalar e recuperação otimizada em Campinas.
      </p>
    </div>
  </div>
</div>
<div class="services__col-wrap w-dyn-list">`;

if (servicesHeadingRegex.test(html)) {
  html = html.replace(servicesHeadingRegex, newServicesHeading);
  console.log('2. Services heading translated and themed.');
}

// =========================================================================
// 3. THE 9 CARDS GRID: 3x3 LAYOUT, LARGE IMAGES, NO AWKWARD WRAP
// =========================================================================
const surgicalCards = [
  {
    num: '(01)',
    id: 'rinoplastia',
    title: 'Rinoplastia <strong>Estruturada</strong>',
    tag: 'Harmonia Facial & Perfilometria',
    descr: 'Abordagem estruturada e preservadora que equilibra a estética do perfil nasal mantendo a função respiratória perfeita.',
    img: 'assets/11_KE_After_Side_Pro.jpg',
    alt: 'Rinoplastia Estruturada — Dr. Ricardo Andrade'
  },
  {
    num: '(02)',
    id: 'protese-r24r',
    title: 'Prótese de Mama <strong>R24R</strong>',
    tag: 'Recuperação Rápida em 24h',
    descr: 'Protocolo cirúrgico de alta precisão que permite retomar atividades habituais leves e movimentar os braços em até 24 horas.',
    img: 'assets/procedimento-mamoplastia.jpg',
    alt: 'Prótese de Recuperação Rápida R24R — Dr. Ricardo Andrade'
  },
  {
    num: '(03)',
    id: 'blefaroplastia',
    title: 'Blefaroplastia <strong>do Olhar</strong>',
    tag: 'Rejuvenescimento Palpebral',
    descr: 'Remoção precisa de excessos cutâneos e bolsas de gordura, restaurando a vivacidade, leveza e juventude dos olhos.',
    img: 'assets/blefaroplastia-interna.jpg',
    alt: 'Blefaroplastia — Dr. Ricardo Andrade'
  },
  {
    num: '(04)',
    id: 'mastopexia',
    title: 'Mastopexia <strong>com/sem Prótese</strong>',
    tag: 'Lifting e Firmeza Mamária',
    descr: 'Suspensão e remodelação dos tecidos mamários com preenchimento harmônico do colo e reposicionamento das aréolas.',
    img: 'assets/procedimento-mamas.jpg',
    alt: 'Mastopexia e Cirurgia das Mamas — Dr. Ricardo Andrade'
  },
  {
    num: '(05)',
    id: 'frontoplastia',
    title: 'Frontoplastia & <strong>Lifting</strong>',
    tag: 'Rejuvenescimento Facial Superior',
    descr: 'Elevação anatômica da fronte e sobrancelhas associada ao lifting cervicofacial para linhas naturais e duradouras.',
    img: 'assets/7_CR_Side_Profile_Af.png',
    alt: 'Frontoplastia e Lifting Facial — Dr. Ricardo Andrade'
  },
  {
    num: '(06)',
    id: 'abdominoplastia',
    title: 'Abdominoplastia <strong>Completa</strong>',
    tag: 'Contorno Abdominal & Diástase',
    descr: 'Correção cirúrgica da flacidez abdominal com plicatura da musculatura reto abdominal e restauração da cintura.',
    img: 'assets/contorno-corporal.jpg',
    alt: 'Abdominoplastia — Dr. Ricardo Andrade'
  },
  {
    num: '(07)',
    id: 'mini-lipo',
    title: 'Mini Lipo <strong>a Laser</strong>',
    tag: 'Definição e Retração de Pele',
    descr: 'Aspiração precisa de adiposidades localizadas com estímulo térmico de colágeno para retração dérmica superior.',
    img: 'assets/cirurgia-interna.jpg',
    alt: 'Mini Lipo a Laser — Dr. Ricardo Andrade'
  },
  {
    num: '(08)',
    id: 'harmonizacao',
    title: 'Harmonização <strong>Facial</strong>',
    tag: 'Preenchimento & Toxina Botulínica',
    descr: 'Mapeamento facial minucioso com preenchedores reabsorvíveis e neuromoduladores aplicados com precisão médica.',
    img: 'assets/doutor-interna.jpg',
    alt: 'Harmonização Facial Médica — Dr. Ricardo Andrade'
  },
  {
    num: '(09)',
    id: 'consulta-avaliacao',
    title: 'Consulta de <strong>Avaliação</strong>',
    tag: 'Planejamento Cirúrgico Digital',
    descr: 'Atendimento médico individualizado e ético no Jardim Chapadão em Campinas com avaliação física completa.',
    img: 'assets/consulta-medica.jpg',
    alt: 'Consulta Médica com o Dr. Ricardo Andrade'
  }
];

const cardsHTML = surgicalCards.map(c => `
  <div data-dropdown="" role="listitem" class="services__col-item w-dyn-item">
    <article data-service-card="" class="service-card">
      <div class="service-card__top">
        <button type="button" data-book-trigger="" data-book-treatment="${c.id}" class="service-card__top-caption">
          <span class="service-card__top-text">Agendar Consulta</span>
        </button>
        <div class="service-card__top-plus">
          <span>+</span>
        </div>
      </div>
      <div class="service-card__media">
        <img src="${c.img}" loading="lazy" alt="${c.alt}" class="service-card__media-img"/>
      </div>
      <div class="service-card__info">
        <p class="service-card__number">${c.num}</p>
        <div class="service-card__title">
          <h3>${c.title}</h3>
        </div>
        <div class="service-card__tag">
          <span>${c.tag}</span>
        </div>
        <div class="service-card__descr">
          <p class="text-b2--book">${c.descr}</p>
        </div>
      </div>
    </article>
  </div>
`).join('\n');

// =========================================================================
// 4. "CONHEÇA OUTROS PROCEDIMENTOS REALIZADOS" LUXURY DARK CONTAINER
// =========================================================================
const otherProceduresLuxuryHTML = `
<div class="other-procedures-luxury-box">
  <div class="other-proc-badge">
    <span class="badge-gold-dot"></span>
    <span class="badge-gold-text">AMPLO ESPECTRO CIRÚRGICO</span>
  </div>
  <h3 class="other-proc-title">Conheça Outros Procedimentos Realizados:</h3>
  <p class="other-proc-subtitle">
    Além da Rinoplastia Estruturada e da Mamoplastia de Aumento R24R, o Dr. Ricardo Andrade realiza procedimentos cirúrgicos faciais e corporais com rigor hospitalar:
  </p>
  
  <div class="other-proc-pills-wrap">
    <div class="other-proc-pill"><span>Frontoplastia</span></div>
    <div class="other-proc-pill"><span>Abdominoplastia</span></div>
    <div class="other-proc-pill"><span>Ginecomastia</span></div>
    <div class="other-proc-pill"><span>Ninfoplastia</span></div>
    <div class="other-proc-pill"><span>Otoplastia</span></div>
    <div class="other-proc-pill"><span>Lifting Facial (Ritidoplastia)</span></div>
    <div class="other-proc-pill"><span>Prótese de Glúteo</span></div>
    <div class="other-proc-pill"><span>Toxina Botulínica e Preenchimento</span></div>
    <div class="other-proc-pill"><span>Mini Lipo a Laser</span></div>
  </div>

  <div class="other-proc-cta-area">
    <a href="https://wa.me/5519989280809?text=Ol%C3%A1%20Dr.%20Ricardo,%20visitei%20o%20site%20e%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20procedimentos." target="_blank" rel="noopener noreferrer" class="other-proc-whatsapp-btn">
      <span>Fale Conosco no WhatsApp</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </div>
</div>
`;

// Replace services list and append the Other Procedures block inside the services container
const servicesColListRegex = /<div role="list" class="services__col-list w-dyn-items">[\s\S]*?<\/div>\s*<\/div>\s*<div id="services"/i;
const newServicesColWrap = `<div role="list" class="services__col-list w-dyn-items">
  ${cardsHTML}
</div>
</div>
${otherProceduresLuxuryHTML}
<div id="services"`;

if (servicesColListRegex.test(html)) {
  html = html.replace(servicesColListRegex, newServicesColWrap);
  console.log('3 & 4. 9 cards grid and luxury Other Procedures block integrated.');
}

// =========================================================================
// 5. BOOKING MODAL: SURGICAL OPTIONS & CAMPINAS STAFF
// =========================================================================
const modalOldRegex = /<div data-booking-modal=""[\s\S]*?<\/form><\/div><\/div><\/div><\/div><\/div>/i;

const surgicalModalHTML = `<div data-booking-modal="" class="booking-modal">
  <div data-booking-close="" class="booking-modal__overlay"></div>
  <div data-modal-anim="box" class="booking-modal__box">
    <div class="booking-modal__inner">
      <div data-modal-anim="item" class="booking-modal__close-wrap">
        <button type="button" data-booking-close="" aria-label="Fechar agendamento" class="booking-modal__close">
          <div class="booking-modal__close-icon w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentcolor" />
            </svg>
          </div>
        </button>
      </div>
      <div class="booking-modal__sidebar">
        <div data-modal-anim="item" class="booking-modal__steps">
          <div data-tab-step="1" class="booking-step is-active">
            <div class="booking-step__number-wrap"><div class="booking-step__number-icon"></div></div>
            <div class="booking-step__label-wrap"><div class="booking-step__label">Procedimento</div></div>
          </div>
          <div data-divider-after="1" class="booking-step__divider"></div>
          <div data-tab-step="2" class="booking-step">
            <div class="booking-step__number-wrap"><div class="booking-step__number-icon"></div></div>
            <div class="booking-step__label-wrap"><div class="booking-step__label">Seus Dados</div></div>
          </div>
          <div data-divider-after="2" class="booking-step__divider"></div>
          <div data-tab-step="3" class="booking-step">
            <div class="booking-step__number-wrap"><div class="booking-step__number-icon"></div></div>
            <div class="booking-step__label-wrap"><div class="booking-step__label">Confirmação</div></div>
          </div>
        </div>
      </div>
      <div class="booking-modal__content">
        <form id="booking-form" data-booking-form="" novalidate="" class="booking-form">
          <div data-step="1" class="booking-form__step">
            <h1 data-modal-anim="title" class="booking-form__title">Agende sua <span class="h1-serif">Consulta</span></h1>
            <div class="booking-form__group">
              <div data-modal-anim="item" class="booking-form__group-label">Selecione o procedimento de interesse</div>
              <div class="booking-form__field in-services">
                <label data-modal-anim="item" class="booking-form__field-label"><div>Cirurgia / Procedimento*</div></label>
                <div aria-label="Selecione o procedimento" data-radio-group="treatment" role="radiogroup" aria-required="true" class="booking-treatments">
                  
                  <input id="treatment-rinoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="rinoplastia" checked/>
                  <label for="treatment-rinoplastia" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Rinoplastia" src="assets/11_KE_After_Side_Pro.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Rinoplastia Estruturada</div>
                  </label>

                  <input id="treatment-protese-r24r" type="radio" name="treatment" required="" class="booking-treatments__input" value="protese-r24r"/>
                  <label for="treatment-protese-r24r" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Prótese R24R" src="assets/procedimento-mamoplastia.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Prótese de Mama R24R</div>
                  </label>

                  <input id="treatment-blefaroplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="blefaroplastia"/>
                  <label for="treatment-blefaroplastia" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Blefaroplastia" src="assets/blefaroplastia-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Blefaroplastia (Pálpebras)</div>
                  </label>

                  <input id="treatment-mastopexia" type="radio" name="treatment" required="" class="booking-treatments__input" value="mastopexia"/>
                  <label for="treatment-mastopexia" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Mastopexia" src="assets/procedimento-mamas.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Mastopexia</div>
                  </label>

                  <input id="treatment-frontoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="frontoplastia"/>
                  <label for="treatment-frontoplastia" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Frontoplastia" src="assets/7_CR_Side_Profile_Af.png" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Frontoplastia &amp; Lifting</div>
                  </label>

                  <input id="treatment-abdominoplastia" type="radio" name="treatment" required="" class="booking-treatments__input" value="abdominoplastia"/>
                  <label for="treatment-abdominoplastia" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Abdominoplastia" src="assets/contorno-corporal.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Abdominoplastia</div>
                  </label>

                  <input id="treatment-mini-lipo" type="radio" name="treatment" required="" class="booking-treatments__input" value="mini-lipo"/>
                  <label for="treatment-mini-lipo" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Mini Lipo a Laser" src="assets/cirurgia-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Mini Lipo a Laser</div>
                  </label>

                  <input id="treatment-harmonizacao" type="radio" name="treatment" required="" class="booking-treatments__input" value="harmonizacao"/>
                  <label for="treatment-harmonizacao" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Harmonização Facial" src="assets/doutor-interna.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Harmonização Facial</div>
                  </label>

                  <input id="treatment-consulta-avaliacao" type="radio" name="treatment" required="" class="booking-treatments__input" value="consulta-avaliacao"/>
                  <label for="treatment-consulta-avaliacao" data-modal-anim="card" class="booking-treatment-card">
                    <div class="booking-treatment-card__icon-wrap">
                      <img width="52" height="52" alt="Consulta Médica de Avaliação" src="assets/consulta-medica.jpg" style="object-fit:cover;border-radius:10px;" loading="lazy" class="booking-treatment-card__icon"/>
                    </div>
                    <div class="booking-treatment-card__label">Consulta de Avaliação</div>
                  </label>

                </div>
              </div>

              <div class="booking-form__field">
                <label data-modal-anim="item" class="booking-form__field-label"><div>Cirurgião / Atendimento*</div></label>
                <div aria-label="Selecione o profissional" data-radio-group="doctor" role="radiogroup" aria-required="true" class="booking-doctors">
                  
                  <input id="doctor-dr-ricardo" type="radio" name="doctor" required="" class="booking-doctors__input" value="dr-ricardo" checked/>
                  <label for="doctor-dr-ricardo" data-modal-anim="card" class="booking-doctor-card">
                    <div class="booking-doctor-card__avatar-wrap">
                      <img width="52" height="52" alt="Dr. Ricardo Andrade" src="assets/dr-ricardo-principal.jpg" loading="lazy" class="booking-doctor-card__avatar"/>
                    </div>
                    <div class="booking-doctor-card__label">Dr. Ricardo Andrade (Cirurgião Titular)</div>
                  </label>

                  <input id="doctor-equipe-hospitalar" type="radio" name="doctor" required="" class="booking-doctors__input" value="equipe-hospitalar"/>
                  <label for="doctor-equipe-hospitalar" data-modal-anim="card" class="booking-doctor-card">
                    <div class="booking-doctor-card__avatar-wrap">
                      <img width="52" height="52" alt="Equipe Cirúrgica Hospitalar" src="assets/centro-cirurgico.jpg" loading="lazy" class="booking-doctor-card__avatar"/>
                    </div>
                    <div class="booking-doctor-card__label">Equipe Cirúrgica &amp; Hospitalar</div>
                  </label>

                  <input id="doctor-enfermagem-r24r" type="radio" name="doctor" required="" class="booking-doctors__input" value="enfermagem-r24r"/>
                  <label for="doctor-enfermagem-r24r" data-modal-anim="card" class="booking-doctor-card">
                    <div class="booking-doctor-card__avatar-wrap">
                      <img width="52" height="52" alt="Enfermagem R24R" src="assets/consulta-medica.jpg" loading="lazy" class="booking-doctor-card__avatar"/>
                    </div>
                    <div class="booking-doctor-card__label">Enfermagem Especializada R24R</div>
                  </label>

                  <input id="doctor-concierge" type="radio" name="doctor" required="" class="booking-doctors__input" value="concierge"/>
                  <label for="doctor-concierge" data-modal-anim="card" class="booking-doctor-card">
                    <div class="booking-doctor-card__avatar-wrap">
                      <img width="52" height="52" alt="Concierge VIP" src="assets/clinica-foto-01.jpg" loading="lazy" class="booking-doctor-card__avatar"/>
                    </div>
                    <div class="booking-doctor-card__label">Concierge &amp; Atendimento VIP</div>
                  </label>

                </div>
              </div>
            </div>

            <div data-modal-anim="item" class="booking-form__btns">
              <button type="button" data-next-step="2" data-stagger-link="" class="btn">
                <div class="btn__text"><div>(</div><div data-stagger-link-text="">Avançar</div><div>)</div></div>
              </button>
            </div>
          </div>

          <div data-step="2" class="booking-form__step">
            <h2 class="booking-form__title">Seus Dados de <span class="h1-serif">Contato</span></h2>
            <div class="booking-form__group">
              <div class="booking-form__group-label">Informações para agendamento em Campinas</div>
              <div class="booking-form__grid">
                <div class="booking-form__field">
                  <label for="booking-name" class="booking-form__field-label is-bold"><div>Nome Completo*</div></label>
                  <input id="booking-name" type="text" name="Name" placeholder="Digite seu nome completo" required="" maxlength="256" class="booking-form__input"/>
                </div>
                <div class="booking-form__field">
                  <label for="booking-phone" class="booking-form__field-label is-bold"><div>WhatsApp / Telefone*</div></label>
                  <input id="booking-phone" type="tel" name="Phone" placeholder="(19) 99999-9999" required="" data-input-phone="" autocomplete="new-phone" class="booking-form__input"/>
                </div>
                <div class="booking-form__field">
                  <label for="booking-email" class="booking-form__field-label is-bold"><div>Seu E-mail*</div></label>
                  <input id="booking-email" type="email" name="Email" placeholder="seuemail@exemplo.com.br" required="" maxlength="256" class="booking-form__input"/>
                </div>
              </div>
              <div class="booking-form__field booking-form__field--comment">
                <label for="booking-comment" class="booking-form__field-label is-bold"><div>Procedimento de interesse ou dúvidas</div></label>
                <textarea id="booking-comment" placeholder="Conte-nos sobre a cirurgia que deseja avaliar..." class="booking-form__input booking-form__input--textarea"></textarea>
              </div>
            </div>
            <div class="booking-form__btns in-form">
              <button type="button" data-prev-step="1" data-stagger-link="" class="btn is-back-btn">
                <div class="btn__text"><div>(</div><div data-stagger-link-text="">Voltar</div><div>)</div></div>
              </button>
              <button type="submit" data-next-step="3" data-stagger-link="" class="btn">
                <div class="btn__text"><div>(</div><div data-stagger-link-text="">Confirmar Envio</div><div>)</div></div>
              </button>
            </div>
          </div>

          <div data-step="3" class="booking-form__step">
            <h2 class="booking-form__title in-step-3">Agendamento <span class="h1-serif">Enviado!</span></h2>
            <p class="booking-form__text">
              Agradecemos a sua solicitação.<br/>Nossa concierge em Campinas entrará em contato em breve para confirmar data e horário.
            </p>
            <div class="booking-form__footer">
              <div class="booking-form__contact">
                <div class="booking-form__contact-text">
                  <div class="booking-form__contact-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_4459_2987)">
                        <path d="M16.415 5.36963C16.5456 5.80139 16.6409 6.24492 16.7044 6.69786C17.0267 9.03433 16.4197 11.3567 14.9962 13.2379C13.5726 15.1179 11.502 16.3332 9.16675 16.6543C8.76086 16.712 8.35028 16.739 7.94439 16.739C7.6891 16.739 7.43263 16.7285 7.17969 16.7061C8.22557 17.639 9.5491 18.2814 11.0409 18.4873C12.2656 18.6567 13.462 18.5132 14.5479 18.1167L17.8303 19.3743C18.2679 19.5414 18.7209 19.1708 18.6444 18.7096L18.0891 15.3626C18.7067 14.4602 19.1303 13.4014 19.2915 12.2437C19.6679 9.5061 18.4832 6.91551 16.415 5.37198V5.36963Z" fill="currentcolor"/>
                        <path d="M8.95808 15.1529C12.9616 14.5999 15.7569 10.9058 15.204 6.90345C15.0722 5.95051 14.7616 5.06698 14.3134 4.27992C12.8734 1.75875 10.004 0.235218 6.95337 0.658747C2.95102 1.21286 0.154547 4.90581 0.708665 8.90934C0.867489 10.0682 1.29219 11.1258 1.90984 12.0282L1.35572 15.3752C1.27925 15.8364 1.73337 16.207 2.16984 16.0399L5.45337 14.7823C5.53219 14.8105 5.61102 14.8387 5.69102 14.8646C6.71102 15.1987 7.82396 15.3117 8.95808 15.154V15.1529ZM4.62514 5.63522H11.2875C11.7075 5.63522 12.0451 5.97287 12.0451 6.39286C12.0451 6.81286 11.7075 7.15051 11.2875 7.15051H4.62514C4.20749 7.15051 3.86749 6.81169 3.86749 6.39286C3.86749 5.97404 4.20631 5.63522 4.62514 5.63522ZM4.62514 10.1776C4.20749 10.1776 3.86749 9.83875 3.86749 9.41992C3.86749 9.0011 4.20631 8.66228 4.62514 8.66228H8.71337C9.13337 8.66228 9.47102 8.99992 9.47102 9.41992C9.47102 9.83992 9.13337 10.1776 8.71337 10.1776H4.62514Z" fill="currentcolor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_4459_2987">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p>Dúvidas?</p>
                </div>
                <div class="booking-form__support">
                  <p>Nossa equipe está à disposição:</p>
                  <a href="https://wa.me/5519989280809" target="_blank" rel="noopener noreferrer" class="booking-form__support-link">
                    <div>(19) 98928-0809 • (19) 3242-2777</div>
                  </a>
                </div>
              </div>
              <button type="button" data-booking-close="" data-booking-back-home="" data-stagger-link="" class="btn">
                <div class="btn__text"><div>(</div><div data-stagger-link-text="">Voltar ao Início</div><div>)</div></div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`;

if (modalOldRegex.test(html)) {
  html = html.replace(modalOldRegex, surgicalModalHTML);
  console.log('5. Booking modal fully converted to plastic surgery.');
}

// =========================================================================
// 6. FOOTER: 100% PORTUGUESE & CAMPINAS CLINIC INFORMATION
// =========================================================================
const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/i;
const surgicalFooterHTML = `<footer class="footer">
  <div class="page-padding">
    <div class="container">
      <div class="wrap footer__wrap">
        <div class="footer__logo-box">
          <a href="/" aria-current="page" class="footer__logo-link w-inline-block w--current">
            <div class="footer__logo">
              <img src="assets/01-home-ricardo-andrade-logo-menu.png" alt="Dr. Ricardo Andrade — Cirurgia Plástica" />
            </div>
          </a>
          <p class="text-b1--book">Excelência, precisão e ética em Cirurgia Plástica e Rinoplastia.</p>
        </div>
        <div class="footer__nav">
          <div class="footer__nav-col">
            <div class="text-b1--medium mob-18">Navegação</div>
            <ul role="list" class="footer__nav-list in-footer-menu w-list-unstyled">
              <li class="footer__nav-item"><a data-stagger-link="" href="#about" class="footer__link w-inline-block"><div data-stagger-link-text="">Dr. Ricardo</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="#services" class="footer__link w-inline-block"><div data-stagger-link-text="">Cirurgias</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="#why-us" class="footer__link w-inline-block"><div data-stagger-link-text="">Diferenciais</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="#results" class="footer__link w-inline-block"><div data-stagger-link-text="">Resultados</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="#youtube" class="footer__link w-inline-block"><div data-stagger-link-text="">Vídeos</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="#team" class="footer__link w-inline-block"><div data-stagger-link-text="">Equipe</div></a></li>
            </ul>
          </div>
          <div class="footer__nav-col">
            <div class="text-b1--medium mob-18">Atendimento &amp; Localização</div>
            <ul role="list" class="footer__nav-list w-list-unstyled">
              <li class="footer__nav-item"><a data-stagger-link="" href="https://wa.me/5519989280809" target="_blank" rel="noopener noreferrer" class="footer__link w-inline-block"><div data-stagger-link-text="">WhatsApp: (19) 98928-0809</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="tel:+551932422777" class="footer__link w-inline-block"><div data-stagger-link-text="">Telefone: (19) 3242-2777</div></a></li>
              <li class="footer__nav-item"><a data-stagger-link="" href="mailto:contato@drricardoandrade.com.br" class="footer__link w-inline-block"><div data-stagger-link-text="">contato@drricardoandrade.com.br</div></a></li>
              <li class="footer__nav-item"><div class="footer__link" style="opacity: 0.85;">Rua Dr. Barbosa de Andrade, 485<br/>Jd. Chapadão – Campinas/SP • CEP 13070-158</div></li>
            </ul>
          </div>
        </div>
        <div id="w-node-ba276a15-1236-2b85-a4ea-0030dcfeb07b-dcfeb055" class="footer__bottom">
          <div class="footer__rights">
            <div class="text-b1--book">
              © <span data-footer-year="">2026</span> Dr. Ricardo Andrade • Cirurgião Plástico CRM-SP 66.351 • RQE 14.201. Todos os direitos reservados.
            </div>
            <div class="dot-divider"></div>
            <div class="made-by">
              <div class="text-b1--book">Desenvolvido por</div>
              <a href="https://raphaelolima.com.br" target="_blank" class="simple-text-link w-inline-block">
                <div class="text-b1--book" style="color: #d4af37; font-weight: 600;">Raphael Lima</div>
              </a>
            </div>
          </div>
          <ul role="list" class="footer__legal">
            <li class="footer__legal-item"><a data-stagger-link="" href="#about" class="footer__link w-inline-block"><div data-stagger-link-text="">Termos</div></a></li>
            <li class="footer__legal-item"><a data-stagger-link="" href="#about" class="footer__link w-inline-block"><div data-stagger-link-text="">Privacidade</div></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>`;

if (footerRegex.test(html)) {
  html = html.replace(footerRegex, surgicalFooterHTML);
  console.log('6. Footer translated and updated with Campinas address.');
}

// =========================================================================
// 7. INJECT TARGETED CSS OVERRIDES: 3x3 GRID, LARGE IMAGES, KILL GHOST TEXT
// =========================================================================
const customStyles = `
<style id="dr-ricardo-master-custom-styles">
  /* 1. Services 3x3 Grid: Side by side without empty slots */
  .services__col-list {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    grid-column-gap: 1.5rem !important;
    grid-row-gap: 1.5rem !important;
    width: 100% !important;
  }

  @media screen and (max-width: 991px) {
    .services__col-list {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-column-gap: 1.25rem !important;
      grid-row-gap: 1.25rem !important;
    }
  }

  @media screen and (max-width: 640px) {
    .services__col-list {
      grid-template-columns: 1fr !important;
      grid-column-gap: 1rem !important;
      grid-row-gap: 1rem !important;
    }
  }

  /* 2. Service Cards: Prominent, larger images, elegant proportions, no text squeeze */
  .service-card {
    height: auto !important;
    min-height: 480px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: stretch !important;
    padding: 1.5rem !important;
    background: #ffffff !important;
    border-radius: 1.5rem !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
    position: relative !important;
    overflow: hidden !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
    pointer-events: auto !important;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease !important;
  }

  .service-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.09) !important;
  }

  .service-card__top {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin-bottom: 1.25rem !important;
    z-index: 5 !important;
  }

  .service-card__top-caption {
    cursor: pointer !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    text-shadow: none !important;
    font-family: inherit !important;
  }

  .service-card__top-text {
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    color: #1a1a18 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    text-shadow: none !important;
  }

  .service-card__top-plus {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50% !important;
    background: #f4f4f0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    color: #1a1a18 !important;
    transition: transform 0.3s ease, background-color 0.3s ease !important;
  }

  .service-card:hover .service-card__top-plus {
    transform: rotate(90deg) !important;
    background: #e2c054 !important;
    color: #000 !important;
  }

  /* Large Images on Cards */
  .service-card__media {
    width: 100% !important;
    height: 220px !important;
    border-radius: 1rem !important;
    overflow: hidden !important;
    margin-bottom: 1.25rem !important;
    background: #f8f8f6 !important;
    position: relative !important;
    flex-shrink: 0 !important;
  }

  .service-card__media-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    transition: transform 0.5s ease !important;
  }

  .service-card:hover .service-card__media-img {
    transform: scale(1.05) !important;
  }

  .service-card__info {
    display: flex !important;
    flex-direction: column !important;
    flex-grow: 1 !important;
    width: 100% !important;
    text-align: left !important;
  }

  .service-card__number {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: #999990 !important;
    margin-bottom: 0.4rem !important;
  }

  .service-card__title {
    margin-bottom: 0.6rem !important;
  }

  .service-card__title h3 {
    font-size: 1.35rem !important;
    font-weight: 700 !important;
    line-height: 1.28 !important;
    color: #111110 !important;
    white-space: normal !important;
  }

  .service-card__title h3 strong {
    font-family: inherit !important;
    font-style: italic !important;
    font-weight: 600 !important;
  }

  .service-card__tag {
    margin-bottom: 0.85rem !important;
  }

  .service-card__tag span {
    font-size: 0.8rem !important;
    font-weight: 600 !important;
    color: #92752e !important;
    background: rgba(212, 175, 55, 0.12) !important;
    padding: 5px 12px !important;
    border-radius: 6px !important;
    display: inline-block !important;
    white-space: nowrap !important;
  }

  .service-card__descr {
    margin-top: auto !important;
  }

  .service-card__descr p {
    font-size: 0.9rem !important;
    line-height: 1.55 !important;
    color: #555550 !important;
  }

  /* 3. Luxury Other Procedures Container (Image 3 Fixes) */
  .other-procedures-luxury-box {
    margin-top: clamp(40px, 6vw, 70px) !important;
    background: #181715 !important;
    border: 1px solid rgba(212, 175, 55, 0.4) !important;
    border-radius: 24px !important;
    padding: clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px) !important;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35) !important;
    text-align: left !important;
    position: relative !important;
    width: 100% !important;
  }

  .other-proc-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin-bottom: 14px !important;
  }

  .badge-gold-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: #d4af37 !important;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.8) !important;
    display: inline-block !important;
  }

  .badge-gold-text {
    font-size: 0.82rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    color: #d4af37 !important;
  }

  .other-proc-title {
    color: #ffffff !important;
    font-size: clamp(1.6rem, 3.2vw, 2.3rem) !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
    margin: 0 0 14px 0 !important;
  }

  .other-proc-subtitle {
    color: #d1d5db !important;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem) !important;
    line-height: 1.6 !important;
    margin: 0 0 32px 0 !important;
    max-width: 880px !important;
  }

  .other-proc-pills-wrap {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    margin-bottom: 36px !important;
  }

  .other-proc-pill {
    display: inline-flex !important;
    align-items: center !important;
    background: #23221f !important;
    border: 1px solid rgba(212, 175, 55, 0.35) !important;
    border-left: 4px solid #d4af37 !important;
    border-radius: 10px !important;
    padding: 10px 18px !important;
    color: #f3f4f6 !important;
    font-size: 0.95rem !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    transition: all 0.25s ease !important;
  }

  .other-proc-pill:hover {
    background: #2c2a26 !important;
    border-color: #d4af37 !important;
    transform: translateY(-2px) !important;
  }

  .other-proc-cta-area {
    margin-top: 10px !important;
  }

  .other-proc-whatsapp-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 10px !important;
    background: #d4af37 !important;
    color: #0d0c0a !important;
    font-weight: 700 !important;
    font-size: 1rem !important;
    padding: 15px 32px !important;
    border-radius: 999px !important;
    text-decoration: none !important;
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.35) !important;
    transition: all 0.3s ease !important;
    text-shadow: none !important;
    border: none !important;
    cursor: pointer !important;
  }

  .other-proc-whatsapp-btn:hover {
    background: #e2c054 !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.5) !important;
  }

  .other-proc-whatsapp-btn span,
  .other-proc-whatsapp-btn svg {
    text-shadow: none !important;
  }

  /* 4. ABSOLUTE KILL SWITCH FOR GHOST DUPLICATE TEXT SHADOWS */
  .btn,
  .btn__text,
  .text-btn,
  .service-card__top-text,
  .service-card__top-caption,
  .nav-list__link,
  .footer__link,
  .booking-form__support-link,
  .other-proc-whatsapp-btn,
  [data-stagger-link-text] {
    text-shadow: none !important;
  }
</style>
`;

if (!html.includes('id="dr-ricardo-master-custom-styles"')) {
  html = html.replace('</head>', `${customStyles}\n</head>`);
  console.log('7. Custom styles injected.');
} else {
  html = html.replace(/<style id="dr-ricardo-master-custom-styles">[\s\S]*?<\/style>/i, customStyles);
  console.log('7. Custom styles updated.');
}

// Global cleanup of any remaining text-shadows in inline styles
html = html.replace(/text-shadow:\s*currentcolor\s*0px\s*[0-9.]+rem\s*0px;?/gi, 'text-shadow: none !important;');

// =========================================================================
// 8. WRITE CLEANED CODE TO BOTH CLONE AND PREVIA
// =========================================================================
fs.writeFileSync(clonePath, html, 'utf8');
fs.writeFileSync(previaPath, html, 'utf8');

console.log('SUCCESS! All updates written to:');
console.log('1.', clonePath);
console.log('2.', previaPath);
