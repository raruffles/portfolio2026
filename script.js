document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. O PONTEIRO DO FIGMA SEGUINDO O MOUSE
    // =========================================
    const customCursor = document.getElementById('custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        if (customCursor) {
            // translate3d garante que o cursor não fique lento
            customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
    });

    // =========================================
    // 2. SEU MODO DARK/LIGHT 
    // =========================================
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentBg = document.body.style.backgroundColor;
            if(currentBg === 'rgb(249, 249, 249)') {
                document.body.style.backgroundColor = '#ffffff';
            } else {
                document.body.style.backgroundColor = '#f9f9f9';
            }
        });
    }
});