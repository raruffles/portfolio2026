const init = () => {
    // Forçar início da página no topo ao carregar/recarregar se não houver hash
    if (!window.location.hash) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }
    
   // =========================================
    // 1. CURSOR DO FIGMA
    // =========================================
    const customCursor = document.getElementById('custom-cursor');
    const customCursorPath = document.querySelector('#custom-cursor path');
    
    document.addEventListener('mousemove', (e) => {
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (customCursor && !isTouch) {
            customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
    });

    // =========================================
    // 2. MODO PRETO E BRANCO / ESCURO (LUA E SOL)
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');
    let activeAccentKey = 'black';

    // Initialize dark-mode from localStorage
    const savedTheme = localStorage.getItem('theme-dark-mode');
    const isDarkDefault = savedTheme === 'true';
    if (isDarkDefault) {
        document.body.classList.add('dark-mode');
        if (iconMoon) iconMoon.style.display = 'none';
        if (iconSun) iconSun.style.display = 'block';
    } else {
        document.body.classList.remove('dark-mode');
        if (iconMoon) iconMoon.style.display = 'block';
        if (iconSun) iconSun.style.display = 'none';
    }

    const applyAccent = (config) => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Verifica se existe uma cor específica pro dark mode, senão usa a padrão
        let targetHex = (isDarkMode && config.hexDark) ? config.hexDark : config.hex;
        
        // Se a cor for preta e o modo escuro estiver ativo, a cor de destaque vira branca.
        const isBlackAccent = config.key === 'black' || activeAccentKey === 'black';
        const accentColor = (isBlackAccent && isDarkMode) ? '#ffffff' : targetHex;
        
        const logoFilter = isDarkMode ? config.logoFilterDark : config.logoFilterLight;

        // Aplica o acento e as variáveis duotone do Da Vinci
        document.documentElement.style.setProperty('--current-accent', accentColor);
        document.documentElement.style.setProperty('--davinci-hue', config.hue);
        document.documentElement.style.setProperty('--davinci-sat', config.sat);
        document.documentElement.style.setProperty('--davinci-bri', config.bri);
        document.documentElement.style.setProperty('--logo-filter', logoFilter);

        // Toggle para classe auxiliar caso seja branco puro
        if (accentColor.toLowerCase() === '#ffffff') {
            document.body.classList.add('accent-white');
        } else {
            document.body.classList.remove('accent-white');
        }

        const nameTone = isDarkMode ? 'var(--text-color)' : `color-mix(in srgb, ${accentColor} 12%, #222 88%)`;
        document.documentElement.style.setProperty('--raphael-tone', nameTone);
        
        // Inverte a cor do cursor do Figma para garantir contraste
        if (customCursorPath) {
            customCursorPath.setAttribute('fill', isDarkMode ? '#1a1f1f' : '#ffffff');
            customCursorPath.setAttribute('stroke', isDarkMode ? '#ffffff' : '#1a1f1f');
        }

        // Lógica para a cor do texto EXPLORADA
        const figmaBox = document.querySelector('.figma-box');
        if (figmaBox) {
            const isBlackSwatch = config.key === 'black';
            if (isDarkMode && isBlackSwatch) {
                // No modo escuro com a cor "Preta", o texto fica na cor do fundo (preto)
                figmaBox.style.color = 'var(--bg-color)';
            } else {
                // Em todos os outros casos, o texto fica branco
                figmaBox.style.color = '#ffffff';
            }
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme-dark-mode', isDark);

            if (swatches.length > 0) {
                const config = colorSettings.find((item) => item.key === activeAccentKey) || colorSettings[0];
                applyAccent(config);
            }
            
            if (isDark) {
                iconMoon.style.display = 'none';
                iconSun.style.display = 'block';
            } else {
                iconMoon.style.display = 'block';
                iconSun.style.display = 'none';
            }
        });
    }

    // =========================================
    // 2.1 MENU MOBILE (HAMBURGUER)
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    const closeMobileMenu = () => {
        if (navLinksContainer) {
            navLinksContainer.classList.remove('mobile-open');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    };

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.toggle('mobile-open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinksContainer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 899) {
                    closeMobileMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 899) {
                closeMobileMenu();
            }
        });
    }

    // =========================================
    // 3. PALETA DE CORES DINÂMICA (DUOTONE + ACCENT)
    // =========================================
    const swatches = document.querySelectorAll('.color-swatch');
    
    const colorSettings = [
        {
            key: 'black',
            hex: '#111111',
            hue: '0deg', sat: '0%', bri: '100%',
            logoFilterLight: 'none',
            logoFilterDark: 'brightness(0) saturate(100%) invert(1)'
        },
        {
            key: 'rose',
            hex: '#C0005A',
            hexDark: '#C0005A', /* Mantém igual no dark mode */
            hue: '0deg', sat: '100%', bri: '100%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(18%) sepia(45%) saturate(220%) hue-rotate(318deg) brightness(92%) contrast(96%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(18%) sepia(45%) saturate(220%) hue-rotate(318deg) brightness(92%) contrast(96%)'
        },
        {
            key: 'blue',
            hex: '#1700A0',
            hexDark: '#5438F9', /* AZUL EXCLUSIVO DARK MODE */
            hue: '230deg', sat: '110%', bri: '100%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(11%) sepia(42%) saturate(240%) hue-rotate(243deg) brightness(78%) contrast(98%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(11%) sepia(42%) saturate(240%) hue-rotate(243deg) brightness(78%) contrast(98%)'
        },
        {
            key: 'green',
            hex: '#1E6B2C',
            hexDark: '#2C943F', /* VERDE EXCLUSIVO DARK MODE */
            hue: '140deg', sat: '130%', bri: '90%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(39%) sepia(32%) saturate(210%) hue-rotate(84deg) brightness(88%) contrast(92%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(39%) sepia(32%) saturate(210%) hue-rotate(84deg) brightness(88%) contrast(92%)'
        },
        {
            key: 'wine',
            hex: '#550917',
            hexDark: '#C41535', /* VINHO EXCLUSIVO DARK MODE */
            hue: '35deg', sat: '90%', bri: '70%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(230%) hue-rotate(323deg) brightness(74%) contrast(96%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(230%) hue-rotate(323deg) brightness(74%) contrast(96%)'
        }
    ];

    const savedAccentKey = localStorage.getItem('active-accent-key') || 'black';
    activeAccentKey = savedAccentKey;
    const initialConfig = colorSettings.find(c => c.key === savedAccentKey) || colorSettings[0];

    swatches.forEach((swatch, index) => {
        if (swatch.getAttribute('data-key') === savedAccentKey) {
            swatch.classList.add('active');
        } else {
            swatch.classList.remove('active');
        }

        swatch.addEventListener('click', (e) => {
            const key = swatch.getAttribute('data-key');
            let config = null;
            if (key) {
                config = colorSettings.find(c => c.key === key);
            }
            if (!config) {
                config = colorSettings[index] || colorSettings[0];
            }

            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            activeAccentKey = config.key || 'rose';
            localStorage.setItem('active-accent-key', activeAccentKey);
            applyAccent(config);
        });
    });

    if (swatches.length > 0) {
        applyAccent(initialConfig);
    }

    // =========================================
    // 4. SISTEMA DE TRADUÇÃO AUTOMÁTICA
    // =========================================
    const translations = {
        pt: {
            "nav-inicio": "INÍCIO",
            "nav-jornada": "JORNADA",
            "nav-trabalhos": "TRABALHOS",
            "nav-contato": "CONTATO",
            "hero-subtitle": "Raphael Lima Designer de Produtos Digitais",
            "hero-title1": "DESIGN É<br class='stack-break'> CRIATIVIDADE",
            "hero-title2": "EXPLORADA",
            "hero-desc": "Transformando experiências complexas em<br class='desktop-only'>experiências intuitivas que impulsionam negócios.",
            "journey-label": "// 01 — JORNADA",
            "journey-title": "JORNADA PROFISSIONAL",
            "journey-tools-title": "FERRAMENTAS",
            "journey-tools-desc": "Figma, Notion, Photoshop, Miro, Maze, Illustrator. Stack completa para todas as etapas do design.",
            "journey-ux-title": "PENSAMENTO UX",
            "journey-ux-desc": "Foco em usuário centrado. UX na Educação: mapeando e antecipando necessidades reais.",
            "journey-process-title": "PROCESSO",
            "journey-process-desc": "Centro em Negócios com foco em valor e resultado. Design Systems, prototipagem e padronização.",
            "journey-results-title": "RESULTADOS",
            "journey-results-desc": "Simplificação de processos e elevação na conclusão de cursos. Foco em impacto real e boas práticas.",
            "works-label": "// 02 — TRABALHOS",
            "works-title": "TRABALHOS SELECIONADOS",
            "works-tag-1": "UX/UI EDUCAÇÃO",
            "works-tag-2": "BRANDING DIREÇÃO",
            "works-tag-placeholder": "[IMAGEM]",
            "works-tag-3": "REDES",
            "contact-label": "// 03 — CONTATO",
            "contact-title": "ENTRE EM CONTATO",
            "contact-call": "Vamos transformar uma ideia em uma experiência digital memorável.",
            "contact-loc-title": "LOCALIZAÇÃO",
            "contact-loc-desc": "São José dos Campos<br>São Paulo, Brasil",
            "contact-phone-title": "TELEFONE",
            "contact-role": "DESIGNER DE PRODUTO · UX/UI",
            
            // Case study mais solidário
            "case-hero-subtitle": "Simplificando a candidatura a bolsas de estudo para estudantes de baixa renda.",
            "case-meta-time": "5 meses",
            "case-meta-role": "Lead Product Designer",
            "case-metrics-title": "// IMPACTO EM NÚMEROS",
            "case-metrics-1": "FINALIZAÇÃO DA INSCRIÇÃO",
            "case-metrics-2": "TEMPO DE BUSCA",
            "case-metrics-3": "CONFORMIDADE EM ACESSIBILIDADE",
            "case-problem-label": "// 01 — O PROBLEMA",
            "case-problem-title": "O PROBLEMA",
            "case-problem-subtitle": "NAVEGAÇÃO CONFUSA E FALTA DE CONFIANÇA",
            "case-problem-desc": "O site antigo apresentava problemas crônicos de arquitetura de informação, tornando a busca por bolsas um processo frustrante. A falta de hierarquia visual e design datado também geravam desconfiança nos usuários sobre a legitimidade da plataforma.",
            "case-solution-label": "// 02 — A SOLUÇÃO",
            "case-solution-title": "A SOLUÇÃO",
            "case-solution-subtitle": "BUSCA GUIADA E PROVA SOCIAL",
            "case-solution-desc": "Redesenhamos a experiência focando em uma busca guiada por intenção do usuário (intent-guided search), simplificando os formulários e incorporando elements de prova social através de cards de tendências e cursos mais buscados para aumentar a credibilidade e facilitar a tomada de decisão.",
            "case-process-label": "// 03 — O PROCESSO",
            "case-process-title": "Metodologia CSD",
            "case-process-desc": "Utilizamos a metodologia Matriz CSD (Certezas, Suposições e Dúvidas) para alinhar as expectativas em reuniões com stakeholders. Complementamos com pesquisa desk sobre o comportamento de estudantes.",
            "case-process-questions": "Perguntas Norteadoras",
            "case-process-q1": "Como os usuários avaliam a credibilidade de um programa de bolsas?",
            "case-process-q2": "Quais são as principais fricções no preenchimento de formulários extensos?",
            "case-old-label": "// A PLATAFORMA ANTIGA",
            "case-compare-label": "// 04 — ANTES E DEPOIS",
            "case-compare-title": "ANTES E DEPOIS",
            "case-compare-subtitle": "A Mudança na Tela",
            "case-compare-desc": "Refizemos a página do zero, estabelecendo uma hierarquia de informações mais clara, com uma barra de busca em destaque e menos cliques para o resultado final.",
            "case-compare-f1-title": "Filtros de busca direcionados",
            "case-compare-f1-desc": "Estudantes agora buscam por curso, cidade ou modalidade em uma interface simplificada, sem sobrecarregar com opções irrelevantes.",
            "case-compare-f2-title": "Prova social em destaque",
            "case-compare-f2-desc": "Depoimentos de bolsistas formados e logos de universidades parceiras visíveis logo na primeira dobra, reforçando credibilidade.",
            "case-identity-label": "// 05 — IDENTIDADE",
            "case-identity-title": "Cores & Identidade",
            "case-identity-desc": "As cores principais combinam a seriedade do azul com a energia do laranja, criando uma atmosfera que transmite confiança e vitalidade.",
            "case-typo-title": "Tipografia",
            "case-logo-title": "Variações de Logotipo",
            "case-features-label": "// 06 — COMPONENTES",
            "case-feat1-title": "Card Empregabilidade",
            "case-feat1-desc": "Seção de cursos com alta taxa de empregabilidade no mercado, com selo de garantia e percentual histórico de contratação de ex-alunos.",
            "case-feat2-title": "Card Mais Buscados",
            "case-feat2-desc": "Em destaque na home, este componente gera prova social ao listar os cursos mais populares da semana com indicadores de vagas restantes.",
            "case-feat3-title": "Faculdades Parceiras",
            "case-results-label": "// 07 — DADOS E RESULTADOS",
            "case-results-title": "REDUÇÃO DE 40% NO TEMPO MÉDIO DE INSCRIÇÃO",
            "case-results-btn-proto": "NAVEGUE NO PROTÓTIPO",
            "case-results-btn-next": "VER PRÓXIMO PROJETO",
            "case-footer-role": "DESIGNER DE PRODUTO • UX/UI",
            
            // Color descriptions
            "case-color-name-1": "Azul Celestial",
            "case-color-desc-1": "Escolhido por sua associação com confiança, segurança e estabilidade. Essa cor transmite seriedade e reforça a credibilidade da plataforma, garantindo que quem acessa tenha a sensação de segurança ao navegar e confiar nos serviços do Mais Solidário.",
            "case-color-name-2": "Verde Esmeralda",
            "case-color-desc-2": "Associado à esperança, crescimento e sucesso. O verde simboliza o impacto positivo que o Mais Solidário proporciona, ajudando usuários a visualizarem a realização de seus sonhos acadêmicos e profissionais.",
            "case-color-name-3": "Laranja Giz de Cera",
            "case-color-desc-3": "Representa dinamismo, criatividade e acessibilidade. Essa cor foi incluída para criar pontos de destaque na interface, guiando os usuários de forma visual e estimulando ações como a inscrição ou a navegação entre as bolsas disponíveis.",
            
            // Logo variations descriptions
            "case-logo-horizontal": "Horizontal - Completo (Grande)",
            "case-logo-vertical": "Vertical - Reduzido (Médio)",
            "case-logo-symbol": "Símbolo - Ícone (Pequeno)",
            
            // Submenu back button
            "submenu-back": "VOLTAR",
            
            // Logo legends & usage descriptions
            "case-logo-legend-1": "Símbolo (Pequeno)",
            "case-logo-desc-1": "Favicon e Ícone de Aplicativo",
            "case-logo-legend-2": "Logo Vertical (Médio)",
            "case-logo-desc-2": "Assinatura de Marca Vertical",
            "case-logo-legend-3": "Logo Horizontal (Grande)",
            "case-logo-desc-3": "Assinatura de Marca Principal"
        },
        en: {
            "nav-inicio": "HOME",
            "nav-jornada": "JOURNEY",
            "nav-trabalhos": "WORKS",
            "nav-contato": "CONTACT",
            "hero-subtitle": "Raphael Lima Digital Product Designer",
            "hero-title1": "DESIGN IS<br class='stack-break'> CREATIVITY",
            "hero-title2": "EXPLORED",
            "hero-desc": "Transforming complex experiences into<br class='desktop-only'>intuitive interfaces that drive business.",
            "journey-label": "// 01 — JOURNEY",
            "journey-title": "PROFESSIONAL JOURNEY",
            "journey-tools-title": "TOOLS",
            "journey-tools-desc": "Figma, Notion, Photoshop, Miro, Maze, Illustrator. Complete stack for all design stages.",
            "journey-ux-title": "UX THINKING",
            "journey-ux-desc": "User-centric approach. UX in Education: mapping and anticipating real needs.",
            "journey-process-title": "PROCESS",
            "journey-process-desc": "Business-focused with a value-driven mindset. Design Systems, prototyping, and standardization.",
            "journey-results-title": "RESULTS",
            "journey-results-desc": "Process simplification and increased course completion. Focus on real impact and best practices.",
            "works-label": "// 02 — WORKS",
            "works-title": "SELECTED WORKS",
            "works-tag-1": "UX/UI EDUCATION",
            "works-tag-2": "BRANDING DIRECTION",
            "works-tag-placeholder": "[IMAGE]",
            "works-tag-3": "CULTURE",
            "contact-label": "// 03 — CONTACT",
            "contact-title": "GET IN TOUCH",
            "contact-call": "Let's transform an idea into a memorable digital experience.",
            "contact-loc-title": "LOCATION",
            "contact-loc-desc": "São José dos Campos<br>São Paulo, Brazil",
            "contact-phone-title": "PHONE",
            "contact-role": "PRODUCT DESIGNER · UX/UI",
            
            // Case study mais solidário
            "case-hero-subtitle": "Simplifying scholarship applications for low-income students.",
            "case-meta-time": "5 months",
            "case-meta-role": "Lead Product Designer",
            "case-metrics-title": "// IMPACT IN NUMBERS",
            "case-metrics-1": "REGISTRATION COMPLETION",
            "case-metrics-2": "SEARCH TIME",
            "case-metrics-3": "ACCESSIBILITY COMPLIANCE",
            "case-problem-label": "// 01 — THE PROBLEM",
            "case-problem-title": "THE PROBLEM",
            "case-problem-subtitle": "CONFUSING NAVIGATION & LACK OF TRUST",
            "case-problem-desc": "The old website had chronic information architecture problems, making the search for scholarships a frustrating process. The lack of visual hierarchy and outdated design also generated distrust among users regarding the platform's legitimacy.",
            "case-solution-label": "// 02 — THE SOLUTION",
            "case-solution-title": "THE SOLUTION",
            "case-solution-subtitle": "GUIDED SEARCH & SOCIAL PROOF",
            "case-solution-desc": "We redesigned the experience focusing on an intent-guided search, simplifying forms and incorporating elements of social proof through trending cards and most searched courses to increase credibility and facilitate decision making.",
            "case-process-label": "// 03 — THE PROCESS",
            "case-process-title": "CSD Methodology",
            "case-process-desc": "We used the CSD Matrix (Certainties, Suppositions, and Doubts) methodology to align expectations in meetings with stakeholders. We complemented it with desk research on student behavior.",
            "case-process-questions": "Guiding Questions",
            "case-process-q1": "How do users evaluate the credibility of a scholarship program?",
            "case-process-q2": "What are the main frictions when filling out long forms?",
            "case-old-label": "// THE OLD PLATFORM",
            "case-compare-label": "// 04 — BEFORE & AFTER",
            "case-compare-title": "BEFORE & AFTER",
            "case-compare-subtitle": "The Change on Screen",
            "case-compare-desc": "We rebuilt the page from scratch, establishing a clearer hierarchy of information, with a highlighted search bar and fewer clicks to the final result.",
            "case-compare-f1-title": "Targeted search filters",
            "case-compare-f1-desc": "Students now search by course, city, or learning format in a simplified interface, without overwhelming them with irrelevant options.",
            "case-compare-f2-title": "Social proof highlighted",
            "case-compare-f2-desc": "Testimonials from graduated scholarship holders and partner university logos visible in the hero fold, reinforcing credibility.",
            "case-identity-label": "// 05 — IDENTITY",
            "case-identity-title": "Colors & Identity",
            "case-identity-desc": "The main colors combine the seriousness of blue with the energy of orange, creating an atmosphere that conveys trust and vitality.",
            "case-typo-title": "Typography",
            "case-logo-title": "Logotype Variations",
            "case-features-label": "// 06 — COMPONENTS",
            "case-feat1-title": "Employability Card",
            "case-feat1-desc": "Section of courses with high employability in the market, with a seal of guarantee and historical hiring rates of alumni.",
            "case-feat2-title": "Most Searched Card",
            "case-feat2-desc": "Highlighted on the home page, this component generates social proof by listing the week's most popular courses with indicators of remaining spots.",
            "case-feat3-title": "Partner Universities",
            "case-results-label": "// 07 — DATA AND RESULTS",
            "case-results-title": "40% REDUCTION IN AVERAGE REGISTRATION TIME",
            "case-results-btn-proto": "NAVIGATE THE PROTOTYPE",
            "case-results-btn-next": "VIEW NEXT PROJECT",
            "case-footer-role": "PRODUCT DESIGNER • UX/UI",
            
            // Color descriptions
            "case-color-name-1": "Celestial Blue",
            "case-color-desc-1": "Chosen for its association with trust, security, and stability. This color conveys seriousness and reinforces the platform's credibility, ensuring that those who access it feel safe navigating and trusting the services of Mais Solidário.",
            "case-color-name-2": "Emerald Green",
            "case-color-desc-2": "Associated with hope, growth, and success. Green symbolizes the positive impact that Mais Solidário provides, helping users visualize the realization of their academic and professional dreams.",
            "case-color-name-3": "Crayon Orange",
            "case-color-desc-3": "Represents dynamism, creativity, and accessibility. This color was included to create highlights in the interface, visually guiding users and stimulating actions such as registration or navigation among the available scholarships.",
            
            // Logo variations descriptions
            "case-logo-horizontal": "Horizontal - Full (Large)",
            "case-logo-vertical": "Vertical - Reduced (Medium)",
            "case-logo-symbol": "Symbol - Icon (Small)",
            
            // Submenu back button
            "submenu-back": "BACK",
            
            // Logo legends & usage descriptions
            "case-logo-legend-1": "Symbol (Small)",
            "case-logo-desc-1": "Favicon and App Icon",
            "case-logo-legend-2": "Vertical Logo (Medium)",
            "case-logo-desc-2": "Vertical Brand Signature",
            "case-logo-legend-3": "Horizontal Logo (Large)",
            "case-logo-desc-3": "Main Brand Signature"
        }
    };

    let currentLang = 'en'; 
    const savedLang = localStorage.getItem('user-language');
    if (savedLang === 'pt' || savedLang === 'en') {
        currentLang = savedLang;
    } else {
        const userLang = navigator.language || navigator.userLanguage; 
        if (userLang === 'pt-BR' || userLang === 'pt-PT' || userLang.startsWith('pt')) {
            currentLang = 'pt';
        }
    }

    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        if (lang === 'pt') {
            if (langPt) langPt.classList.add('active-lang');
            if (langEn) langEn.classList.remove('active-lang');
        } else {
            if (langEn) langEn.classList.add('active-lang');
            if (langPt) langPt.classList.remove('active-lang');
        }
    };

    applyTranslations(currentLang);

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            localStorage.setItem('user-language', currentLang);
            applyTranslations(currentLang);
        });
    }

    // =========================================
    // 5. SCROLL SPY
    // =========================================
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contato';
        }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}