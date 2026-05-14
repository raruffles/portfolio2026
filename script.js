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

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
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
    // 3. SISTEMA DE TRADUÇÃO AUTOMÁTICA
    // =========================================
    
    // Dicionário Completo do Site
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

    let currentLang = 'en'; // Padrão é inglês

    // Detecta localização do Navegador: Se for Brasil ou Portugal, define para Português
    const userLang = navigator.language || navigator.userLanguage; 
    if (userLang === 'pt-BR' || userLang === 'pt-PT' || userLang.startsWith('pt')) {
        currentLang = 'pt';
    }

    // Elementos visuais do botão de status de idioma
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');

    // Função que aplica os textos e atualiza a interface do botão
    const applyTranslations = (lang) => {
        // Altera os textos
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Atualiza o "Status" visual do botão Toggle
        if (lang === 'pt') {
            langPt.classList.add('active-lang');
            langEn.classList.remove('active-lang');
        } else {
            langEn.classList.add('active-lang');
            langPt.classList.remove('active-lang');
        }
    };

    // Aplica o idioma detectado imediatamente ao carregar a página
    applyTranslations(currentLang);

    // Lógica de clique para o botão de idioma no menu
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Inverte o idioma
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            // Reaplica a tradução e o visual do botão
            applyTranslations(currentLang);
        });
    }
});