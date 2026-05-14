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
            // Adiciona ou remove a classe que muda as cores no CSS
            document.body.classList.toggle('dark-mode');
            
            // Alterna a exibição da Lua e do Sol
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
    const translations = {
        pt: {
            "nav-jornada": "JORNADA",
            "nav-trabalhos": "TRABALHOS",
            "nav-contato": "CONTATO",
            // Adicione os outros textos com data-i18n aqui
        },
        en: {
            "nav-jornada": "JOURNEY",
            "nav-trabalhos": "WORKS",
            "nav-contato": "CONTACT",
            // Adicione os outros textos com data-i18n aqui
        }
    };

    let currentLang = 'en'; // Padrão é inglês

    // Detecta localização: Se for Brasil ou Portugal, vira Português
    const userLang = navigator.language || navigator.userLanguage; 
    if (userLang === 'pt-BR' || userLang === 'pt-PT' || userLang.startsWith('pt')) {
        currentLang = 'pt';
    }

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    };

    // Aplica o idioma ao carregar a página
    applyTranslations(currentLang);

    // Lógica para o botão de idioma no menu
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Alterna o idioma atual
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            applyTranslations(currentLang);
        });
    }
});