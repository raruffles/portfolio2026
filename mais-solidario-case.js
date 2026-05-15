const initMaisSolidarioCase = () => {
    // --- CURSOR CUSTOMIZADO ---
    const cursor = document.getElementById('custom-cursor');
    const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (cursor && !isCoarsePointer) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            iconMoon.style.display = 'none';
            iconSun.style.display = 'block';
        } else {
            document.body.classList.remove('dark-mode');
            iconMoon.style.display = 'block';
            iconSun.style.display = 'none';
        }
    }

    const savedTheme = localStorage.getItem('rl-theme') || 'light';
    applyTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('rl-theme', newTheme);
    });

    // --- PALETA DE CORES ---
    const swatches = document.querySelectorAll('.color-swatch');
    const colorMap = {
        black: { light: '#111111', dark: '#ffffff' },
        rose: { light: '#C0005A', dark: '#FF3B82' },
        blue: { light: '#1700A0', dark: '#5B47FF' },
        green: { light: '#1E6B2C', dark: '#3DB955' },
        wine: { light: '#550917', dark: '#B33850' }
    };

    function applyAccent(key) {
        const isDark = document.body.classList.contains('dark-mode');
        const color = colorMap[key] ? (isDark ? colorMap[key].dark : colorMap[key].light) : colorMap.black.light;
        document.documentElement.style.setProperty('--current-accent', color);
        document.body.classList.toggle('accent-white', key === 'black' && isDark);
    }

    const savedKey = localStorage.getItem('rl-accent') || 'black';
    swatches.forEach((sw) => {
        if (sw.dataset.key === savedKey) {
            sw.classList.add('active');
        } else {
            sw.classList.remove('active');
        }
    });
    applyAccent(savedKey);

    swatches.forEach((sw) => {
        sw.addEventListener('click', () => {
            const key = sw.dataset.key;
            swatches.forEach((s) => s.classList.remove('active'));
            sw.classList.add('active');
            applyAccent(key);
            localStorage.setItem('rl-accent', key);
        });
    });

    themeToggle?.addEventListener('click', () => {
        const currentKey = localStorage.getItem('rl-accent') || 'black';
        setTimeout(() => applyAccent(currentKey), 50);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaisSolidarioCase);
} else {
    initMaisSolidarioCase();
}