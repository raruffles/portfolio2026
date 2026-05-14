document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FORÇAR IMAGENS A NÃO USAREM O ARRASTO NATIVO DO NAVEGADOR
    document.querySelectorAll('img, a').forEach(el => {
        el.setAttribute('draggable', 'false');
    });

    // =========================================
    // 2. O PONTEIRO DO FIGMA SEGUINDO O MOUSE
    // =========================================
    const customCursor = document.getElementById('custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        if (customCursor) {
            customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
    });

    // =========================================
    // 3. MODO "DESMONTAR O SITE" (AGORA PUXA IMAGENS TAMBÉM)
    // =========================================
    let activeElement = null;
    let initialX = 0;
    let initialY = 0;

    document.addEventListener('mousedown', (e) => {
        // Ignora se for o botão direito, fundo branco ou o próprio cursor falso
        if (e.button !== 0 || e.target === document.body || e.target === document.documentElement || e.target.id === 'custom-cursor') {
            return;
        }

        // O SEGREDO ESTÁ AQUI: Isso bloqueia a tentativa do navegador de salvar/arrastar imagens!
        e.preventDefault(); 

        activeElement = e.target;
        
        // Pega a posição atual salva ou começa do zero
        const currentX = parseFloat(activeElement.getAttribute('data-x')) || 0;
        const currentY = parseFloat(activeElement.getAttribute('data-y')) || 0;

        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        
        document.body.classList.add('is-dragging-element');
        activeElement.classList.add('dragging-now');
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeElement) return;

        const currentX = e.clientX - initialX;
        const currentY = e.clientY - initialY;

        activeElement.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        
        activeElement.setAttribute('data-x', currentX);
        activeElement.setAttribute('data-y', currentY);
    });

    document.addEventListener('mouseup', () => {
        if (activeElement) {
            document.body.classList.remove('is-dragging-element');
            activeElement.classList.remove('dragging-now');
            activeElement = null;
        }
    });

    // =========================================
    // 4. SEU MODO DARK/LIGHT (Lógica Existente)
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