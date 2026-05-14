document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. CURSOR DO FIGMA
    // =========================================
    const customCursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        if (customCursor) {
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

    const applyAccent = (config) => {
        const isBlackAccent = activeAccentKey === 'black';
        const accentColor = isBlackAccent && document.body.classList.contains('dark-mode') ? '#ffffff' : config.hex;
        const logoFilter = document.body.classList.contains('dark-mode')
            ? config.logoFilterDark
            : config.logoFilterLight;

        document.documentElement.style.setProperty('--current-accent', accentColor);
        document.documentElement.style.setProperty('--davinci-hue', config.hue);
        document.documentElement.style.setProperty('--davinci-sat', config.sat);
        document.documentElement.style.setProperty('--davinci-bri', config.bri);
        document.documentElement.style.setProperty('--logo-filter', logoFilter);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (swatches.length > 0) {
                const config = colorSettings.find((item) => item.key === activeAccentKey) || colorSettings[0];
                applyAccent(config);
            }
            
            if (document.body.classList.contains('dark-mode')) {
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
            hue: '0deg',
            sat: '0%',
            bri: '100%',
            logoFilterLight: 'none',
            logoFilterDark: 'brightness(0) saturate(100%) invert(1)'
        },
        {
            key: 'rose',
            hex: '#C0005A',
            hue: '0deg',
            sat: '100%',
            bri: '100%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(18%) sepia(94%) saturate(4019%) hue-rotate(318deg) brightness(90%) contrast(110%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(18%) sepia(94%) saturate(4019%) hue-rotate(318deg) brightness(90%) contrast(110%)'
        },
        {
            key: 'blue',
            hex: '#1700A0',
            hue: '230deg',
            sat: '110%',
            bri: '100%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(11%) sepia(91%) saturate(7365%) hue-rotate(243deg) brightness(72%) contrast(124%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(11%) sepia(91%) saturate(7365%) hue-rotate(243deg) brightness(72%) contrast(124%)'
        },
        {
            key: 'green',
            hex: '#1E6B2C',
            hue: '140deg',
            sat: '130%',
            bri: '90%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(496%) hue-rotate(84deg) brightness(86%) contrast(88%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(496%) hue-rotate(84deg) brightness(86%) contrast(88%)'
        },
        {
            key: 'wine',
            hex: '#550917',
            hue: '35deg',
            sat: '90%',
            bri: '70%',
            logoFilterLight: 'brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(2871%) hue-rotate(323deg) brightness(71%) contrast(106%)',
            logoFilterDark: 'brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(2871%) hue-rotate(323deg) brightness(71%) contrast(106%)'
        }
    ];

    if(swatches.length > 0) {
        swatches[0].classList.add('active');
    }

    swatches.forEach((swatch, index) => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            const config = colorSettings[index];
            activeAccentKey = config.key || 'rose';
            applyAccent(config);
        });
    });

    if (swatches.length > 0) {
        const initialConfig = colorSettings[0];
        activeAccentKey = initialConfig.key;
        applyAccent(initialConfig);
    }

    // =========================================
    // 4. SISTEMA DE TRADUÇÃO AUTOMÁTICA
    // =========================================
    const translations = {
        pt: {
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
            "works-tag-3": "CULTURA",
            "contact-label": "// 03 — CONTATO",
            "contact-title": "ENTRE EM CONTATO",
            "contact-call": "Vamos transformar uma ideia em uma experiência digital memorável.",
            "contact-loc-title": "LOCALIZAÇÃO",
            "contact-loc-desc": "São José dos Campos<br>São Paulo, Brasil",
            "contact-phone-title": "TELEFONE",
            "contact-role": "DESIGNER DE PRODUTO · UX/UI"
        },
        en: {
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
            "contact-role": "PRODUCT DESIGNER · UX/UI"
        }
    };

    let currentLang = 'en'; 

    const userLang = navigator.language || navigator.userLanguage; 
    if (userLang === 'pt-BR' || userLang === 'pt-PT' || userLang.startsWith('pt')) {
        currentLang = 'pt';
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
            langPt.classList.add('active-lang');
            langEn.classList.remove('active-lang');
        } else {
            langEn.classList.add('active-lang');
            langPt.classList.remove('active-lang');
        }
    };

    applyTranslations(currentLang);

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            applyTranslations(currentLang);
        });
    }

    // =========================================
    // 5. SCROLL SPY (CORRIGIDO PARA O CONTATO)
    // =========================================
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // O valor de tolerância foi aumentado para pegar a seção antes
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        // Força a marcação do "CONTATO" se o usuário rolar até o final absoluto da página
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
});