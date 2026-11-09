/**
 * STUDIO OTTO FELIX — INTERATIVIDADE DO CLONE
 * - Filtro de projetos em tempo real com animação fluida
 * - Menu mobile responsivo acessível
 * - Header adaptativo no scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL EFFECT
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu(forceClose = false) {
    const isOpen = mobileMenuBtn.classList.contains('open');
    if (forceClose || isOpen) {
      mobileMenuBtn.classList.remove('open');
      mobileDrawer.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    } else {
      mobileMenuBtn.classList.add('open');
      mobileDrawer.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu(true);
      }
    });
  }

  // 3. FILTRO DE PROJETOS EM TEMPO REAL
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter').toLowerCase();

      // Atualiza botões
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filtra os cards
      projectCards.forEach(card => {
        const cardCategories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        
        if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});
