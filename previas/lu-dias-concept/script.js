/**
 * Lu Dias Concept — Editorial Couture Motion Runtime
 * Engineered with Emil Kowalski's animation discipline + WAAPI + IntersectionObserver
 */

const REDUCED_MOTION_MQ = window.matchMedia('(prefers-reduced-motion: reduce)');
const FINE_POINTER_MQ = window.matchMedia('(hover: hover) and (pointer: fine)');

/* ==========================================================================
   1. CHOREOGRAPHED HERO ENTRANCE (WAAPI — Off-Main-Thread Compositor)
   ========================================================================== */
function initHeroChoreography() {
  if (REDUCED_MOTION_MQ.matches) return;

  const panels = Array.from(document.querySelectorAll('.triptych-panel'));
  panels.forEach((panel, i) => {
    panel.animate(
      [
        { clipPath: 'inset(100% 0 0 0)', transform: 'scale(1.06)' },
        { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' },
      ],
      {
        duration: 760,
        delay: i * 85,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        fill: 'backwards',
      }
    );
  });

  const chars = Array.from(document.querySelectorAll('.wm-char, .wm-reg'));
  chars.forEach((ch, i) => {
    ch.animate(
      [
        { transform: 'translateY(108%)', opacity: 0 },
        { transform: 'translateY(0%)', opacity: 1 },
      ],
      {
        duration: 580,
        delay: 240 + i * 26,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'backwards',
      }
    );
  });
}

/* ==========================================================================
   2. HERO VIDEO SEAMLESS LOOP (Starts at 3.2s Luminous Hair Reveal)
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-video');
  const toggleBtn = document.getElementById('hero-video-toggle');
  if (!video || !toggleBtn) return;

  const iconPause = toggleBtn.querySelector('.icon-pause');
  const iconPlay = toggleBtn.querySelector('.icon-play');
  const REVEAL_START = 3.2;

  function syncIcon() {
    const paused = video.paused;
    toggleBtn.setAttribute('aria-label', paused ? 'Reproduzir vídeo do studio' : 'Pausar vídeo do studio');
    if (iconPause) iconPause.hidden = paused;
    if (iconPlay) iconPlay.hidden = !paused;
  }

  function seekToReveal() {
    if (video.currentTime < REVEAL_START) {
      try {
        video.currentTime = REVEAL_START;
      } catch {
        // Metadata not ready yet
      }
    }
  }

  video.addEventListener('loadedmetadata', seekToReveal);
  video.addEventListener('timeupdate', () => {
    if (video.currentTime < REVEAL_START - 0.1 || (video.duration && video.currentTime >= video.duration - 0.35)) {
      video.currentTime = REVEAL_START;
    }
  });
  video.addEventListener('ended', () => {
    video.currentTime = REVEAL_START;
    if (!REDUCED_MOTION_MQ.matches) video.play().catch(() => {});
  });
  if (video.readyState >= 1) seekToReveal();

  if (REDUCED_MOTION_MQ.matches) {
    video.pause();
  } else {
    video.play().catch(() => syncIcon());
  }

  toggleBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play().then(syncIcon).catch(syncIcon);
    } else {
      video.pause();
      syncIcon();
    }
  });

  video.addEventListener('play', syncIcon);
  video.addEventListener('pause', syncIcon);
  syncIcon();
}

/* ==========================================================================
   3. EDITORIAL OVERLAY HEADER + GLIDING PILL NAV + MOBILE DRAWER
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.getElementById('site-header');
  const nav = document.getElementById('header-nav');
  const glide = document.getElementById('nav-pill-glide');
  const links = Array.from(document.querySelectorAll('.header-nav .nav-link'));
  const floatingWa = document.getElementById('floating-wa');
  const scrollProgress = document.getElementById('scroll-progress');
  const supportsScrollTimeline = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  let activeLink = null;

  function moveGlide(target) {
    if (!glide || !nav || !target) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    if (!linkRect.width) return;
    glide.style.width = `${linkRect.width}px`;
    glide.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    glide.style.opacity = '1';
  }

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => moveGlide(link));
    link.addEventListener('focus', () => moveGlide(link));
  });

  if (nav) {
    nav.addEventListener('mouseleave', () => {
      if (activeLink) moveGlide(activeLink);
      else if (glide) glide.style.opacity = '0';
    });
  }

  const sections = links
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 80);
    if (floatingWa) floatingWa.classList.toggle('is-visible', y > 560);

    // Progress bar fallback if scroll-driven CSS timeline unsupported
    if (scrollProgress && !supportsScrollTimeline) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.style.transform = `scaleX(${Math.min(1, y / maxScroll)})`;
    }

    const probe = y + window.innerHeight * 0.35;
    let current = null;
    for (const sec of sections) {
      if (sec.offsetTop <= probe) current = sec;
    }

    activeLink = null;
    links.forEach((l) => {
      const match = Boolean(current && l.dataset.section === current.id);
      l.classList.toggle('is-active', match);
      if (match) activeLink = l;
    });

    if (activeLink && nav && !nav.matches(':hover')) {
      moveGlide(activeLink);
    } else if (!activeLink && glide && nav && !nav.matches(':hover')) {
      glide.style.opacity = '0';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (activeLink) moveGlide(activeLink);
  }, { passive: true });
  onScroll();

  // Mobile Drawer with smooth slide-in/out
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');
  const closeTargets = document.querySelectorAll('[data-drawer-link], [data-close-drawer]');

  function openDrawer() {
    if (!drawer || !toggleBtn) return;
    drawer.hidden = false;
    window.requestAnimationFrame(() => drawer.classList.add('is-open'));
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (!drawer || !toggleBtn || drawer.hidden) return;
    drawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const finish = () => {
      drawer.hidden = true;
    };
    if (REDUCED_MOTION_MQ.matches) {
      finish();
    } else {
      window.setTimeout(finish, 360);
    }
    toggleBtn.focus();
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  closeTargets.forEach((el) => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ==========================================================================
   4. INTERACTIVE SLOVIANKA SCOPE CARD (Blurry-Seam Crossfade Recipe)
   ========================================================================== */
function initScopeCard() {
  const pills = Array.from(document.querySelectorAll('.scope-pill'));
  const note = document.getElementById('scope-detail-note');
  if (!pills.length || !note) return;

  const DETAILS = [
    'Loiros manteiga, mel dourado e morena iluminada desenhados sob medida para crescer com naturalidade.',
    'Leitura de subtom de pele, contraste pessoal e desejo de imagem antes da escolha de qualquer nuance.',
    'Transição invisível entre a raiz natural e o comprimento iluminado — elegância com baixíssima manutenção.',
    'Diagnóstico da fibra e terapia capilar com protocolos profissionais TRUSS e Moroccanoil.',
    'Camadas de movimento e contorno frontal pensados para valorizar o formato do seu rosto.',
    'Acabamento sedoso e brilho espelhado que revela toda a dimensão da cor na luz natural.',
  ];

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = Number(pill.dataset.scope);
      const nextText = DETAILS[idx];
      if (!nextText) return;

      pills.forEach((p) => {
        const selected = p === pill;
        p.classList.toggle('is-selected', selected);
        p.setAttribute('aria-selected', String(selected));
      });

      if (REDUCED_MOTION_MQ.matches) {
        note.textContent = nextText;
        return;
      }

      note.classList.add('is-blur-swapping');
      window.setTimeout(() => {
        note.textContent = nextText;
        note.classList.remove('is-blur-swapping');
      }, 140);
    });
  });
}

/* ==========================================================================
   5. BEFORE / AFTER TRANSFORMATION ATELIER (Blurry-Seam Case Swap + Drag)
   ========================================================================== */
function initBeforeAfterAtelier() {
  const stage = document.getElementById('compare-stage');
  const range = document.getElementById('compare-range');
  const beforeImg = document.getElementById('compare-before-img');
  const afterImg = document.getElementById('compare-after-img');
  const titleEl = document.getElementById('compare-case-title');
  const descEl = document.getElementById('compare-case-desc');
  const ctaEl = document.getElementById('compare-case-cta');
  const cards = Array.from(document.querySelectorAll('.case-card'));

  if (!stage || !range || !beforeImg || !afterImg) return;

  const CASES = [
    {
      title: 'Loiro Manteiga Luminoso',
      desc: 'Correção de transição de raiz, esfumado invisível, contorno frontal para abrir o olhar e reconstrução lipídica de brilho espelhado.',
      before: './assets/transform-1-before.webp',
      after: './assets/transform-1-after.webp',
      beforeAlt: 'Antes: raiz escura crescida e comprimento opaco',
      afterAlt: 'Depois: loiro manteiga luminoso com raiz esfumada e brilho espelhado',
      wa: 'Olá, Lu Dias Concept! Amei o resultado do Loiro Manteiga Luminoso no site e queria agendar uma avaliação.',
    },
    {
      title: 'Mel Dourado Couture',
      desc: 'Iluminação dimensional quente sob medida para o subtom de pele, com suavização de contraste na raiz e camadas fluidas.',
      before: './assets/transform-2-before.webp',
      after: './assets/transform-2-after.webp',
      beforeAlt: 'Antes: fios com contraste marcado e pontas ressecadas',
      afterAlt: 'Depois: mel dourado luminoso com movimento e brilho sedoso',
      wa: 'Olá, Lu Dias Concept! Amei o Mel Dourado Couture no site e gostaria de agendar uma avaliação.',
    },
    {
      title: 'Morena Iluminada Caramelo',
      desc: 'Transição suave da base natural para reflexos caramelo-dourado de baixíssima manutenção, moldurando o rosto com sofisticação.',
      before: './assets/transform-3-before.webp',
      after: './assets/transform-3-after.webp',
      beforeAlt: 'Antes: raiz natural escura com comprimento desbotado sem dimensão',
      afterAlt: 'Depois: morena iluminada caramelo com contorno suave e fios tratados',
      wa: 'Olá, Lu Dias Concept! Adorei a Morena Iluminada Caramelo no site e quero agendar minha avaliação.',
    },
  ];

  function setSplit(val) {
    const clamped = Math.max(4, Math.min(96, Number(val)));
    stage.style.setProperty('--split', `${clamped}%`);
    range.value = String(clamped);
  }

  range.addEventListener('input', (e) => setSplit(e.target.value));

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.case);
      const item = CASES[idx];
      if (!item) return;

      cards.forEach((c) => {
        const active = c === card;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });

      const applySwap = () => {
        beforeImg.src = item.before;
        beforeImg.alt = item.beforeAlt;
        afterImg.src = item.after;
        afterImg.alt = item.afterAlt;
        if (titleEl) titleEl.textContent = item.title;
        if (descEl) descEl.textContent = item.desc;
        if (ctaEl) {
          ctaEl.href = `https://wa.me/5512982030344?text=${encodeURIComponent(item.wa)}`;
        }
        setSplit(50);
      };

      if (REDUCED_MOTION_MQ.matches) {
        applySwap();
      } else {
        stage.classList.add('is-blur-swapping');
        window.setTimeout(() => {
          applySwap();
          stage.classList.remove('is-blur-swapping');
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   6. ONE-SHOT CURTAIN REVEALS, STAGGER GROUPS & BRUSH UNDERLINE
   ========================================================================== */
function initScrollReveals() {
  if (REDUCED_MOTION_MQ.matches || !('IntersectionObserver' in window)) return;

  const curtains = document.querySelectorAll('.curtain-reveal');
  const staggerItems = document.querySelectorAll('.stagger-item');
  const brush = document.getElementById('brush-underline');

  curtains.forEach((el) => el.classList.add('is-armed'));
  staggerItems.forEach((el) => el.classList.add('is-armed'));
  if (brush) brush.classList.add('is-armed');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight) return;
        const target = entry.target;
        if (target.id === 'brush-underline') {
          target.classList.add('is-drawn');
        } else if (target.classList.contains('stagger-group')) {
          target.querySelectorAll('.stagger-item').forEach((item) => item.classList.add('is-visible'));
        } else {
          target.classList.add('is-visible');
        }
        obs.unobserve(target);
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 100px 0px' }
  );

  curtains.forEach((el) => observer.observe(el));
  document.querySelectorAll('.stagger-group').forEach((g) => observer.observe(g));
  if (brush) observer.observe(brush);
}

/* ==========================================================================
   7. MARQUEE PAUSE TOGGLE (WCAG 2.2.2)
   ========================================================================== */
function initMarquee() {
  const strip = document.querySelector('.marquee-strip');
  const btn = document.getElementById('marquee-toggle');
  if (!strip || !btn) return;

  const iconPause = btn.querySelector('.icon-pause');
  const iconPlay = btn.querySelector('.icon-play');

  btn.addEventListener('click', () => {
    const paused = strip.classList.toggle('is-paused');
    btn.setAttribute('aria-label', paused ? 'Retomar faixa contínua de marcas' : 'Pausar faixa contínua de marcas');
    if (iconPause) iconPause.hidden = paused;
    if (iconPlay) iconPlay.hidden = !paused;
  });
}

/* ==========================================================================
   8. MAGNETIC CTA SPOTLIGHT & SUBTLE PULL (Fine Pointer Only)
   ========================================================================== */
function initMagneticElements() {
  if (REDUCED_MOTION_MQ.matches || !FINE_POINTER_MQ.matches) return;

  document.querySelectorAll('.magnetic-el').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relX = x / rect.width - 0.5;
      const relY = y / rect.height - 0.5;
      el.style.setProperty('--mx', `${((x / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${((y / rect.height) * 100).toFixed(1)}%`);
      el.style.transform = `translate3d(${(relX * 7).toFixed(1)}px, ${(relY * 4.5).toFixed(1)}px, 0)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* ==========================================================================
   9. CONCIERGE WHATSAPP FORM
   ========================================================================== */
function initConciergeForm() {
  const form = document.getElementById('concierge-form');
  const feedback = document.getElementById('concierge-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const service = String(data.get('service') || 'Mechas & Iluminação').trim();
    const note = String(data.get('note') || '').trim();

    const greeting = name ? `Olá, Lu Dias Concept! Meu nome é ${name}.` : 'Olá, Lu Dias Concept!';
    const body = `Gostaria de agendar uma avaliação com foco em ${service}.`;
    const extra = note ? ` Objetivo: ${note}` : '';
    const url = `https://wa.me/5512982030344?text=${encodeURIComponent(`${greeting} ${body}${extra}`)}`;

    if (feedback) feedback.textContent = 'Abrindo conversa no WhatsApp com sua mensagem pronta...';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initHeroChoreography();
  initHeroVideo();
  initHeaderAndNav();
  initScopeCard();
  initBeforeAfterAtelier();
  initScrollReveals();
  initMarquee();
  initMagneticElements();
  initConciergeForm();
});
