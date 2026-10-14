/**
 * THIAGO PAZ - AULAS DE MÚSICA (SOROCABA - SP)
 * Interatividade, Sintetizador Web Audio API, Lightbox e Integração WhatsApp
 * Desenvolvido por Raphael Lima
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  initMobileMenu();
  initScrollAnimations();
  initScrollSpy();
  initCounterStats();
  initLightbox();
  initFormBooking();
  initAudioSynthesizer();
});

/* ==========================================================================
   1. SINTETIZADOR WEB AUDIO API (Acordes Reais de Violão & Guitarra)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Frequências exatas para afinação padrão (E2, A2, D3, G3, B3, E4)
const FREQS = {
  E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25
};

const CHORD_PRESETS = {
  'em': {
    name: 'Mi Menor (Em)',
    type: 'acoustic',
    notes: [FREQS.E2, FREQS.B2, FREQS.E3, FREQS.G3, FREQS.B3, FREQS.E4]
  },
  'am': {
    name: 'Lá Menor (Am)',
    type: 'acoustic',
    notes: [FREQS.A2, FREQS.E3, FREQS.A3, FREQS.C4, FREQS.E4]
  },
  'c': {
    name: 'Dó Maior (C)',
    type: 'acoustic',
    notes: [FREQS.C3, FREQS.E3, FREQS.G3, FREQS.C4, FREQS.E4]
  },
  'g': {
    name: 'Sol Maior (G)',
    type: 'acoustic',
    notes: [FREQS.G2, FREQS.B2, FREQS.D3, FREQS.G3, FREQS.B3, FREQS.G4]
  },
  'd': {
    name: 'Ré Maior (D)',
    type: 'acoustic',
    notes: [FREQS.D3, FREQS.A3, FREQS.D4, FREQS.F3 ? 369.99 : 370] // F#4 ~ 369.99
  },
  'power': {
    name: 'Power Chord Rock (E5)',
    type: 'electric',
    notes: [FREQS.E2, FREQS.B2, FREQS.E3, FREQS.B3]
  },
  'blues': {
    name: 'Lick de Blues',
    type: 'blues-lick',
    notes: [FREQS.E3, FREQS.G3, FREQS.A3, 233.08, FREQS.B3, FREQS.D4, FREQS.E4] // E Pentatonic Blues
  },
  'bass': {
    name: 'Groove de Contrabaixo',
    type: 'bass',
    notes: [41.20, FREQS.E2, 49.00, FREQS.A2, FREQS.B2] // E1, E2, G1, A2, B2
  }
};

function playSingleNote(ctx, freq, startTime, duration = 2.2, isElectric = false, isBass = false) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  if (isBass) {
    osc.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, startTime);
    filter.frequency.exponentialRampToValueAtTime(100, startTime + duration);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.7, startTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  } else if (isElectric) {
    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.frequency.exponentialRampToValueAtTime(700, startTime + duration * 0.8);

    // Distortion wave shaper
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(35);
    distortion.oversample = '4x';

    osc.connect(distortion);
    distortion.connect(filter);
    filter.connect(gainNode);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.35, startTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 1.2);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration * 1.2);
    return;
  } else {
    // Violão Acústico / Nylon / Aço
    osc.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, startTime);
    filter.frequency.exponentialRampToValueAtTime(450, startTime + duration * 0.7);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.45, startTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  }

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function makeDistortionCurve(amount = 20) {
  const k = typeof amount === 'number' ? amount : 50;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function playChord(chordKey) {
  const ctx = getAudioContext();
  const preset = CHORD_PRESETS[chordKey];
  if (!preset) return;

  const now = ctx.currentTime;
  const visualizerBars = document.querySelectorAll('.audio-bar');
  visualizerBars.forEach(bar => bar.classList.add('playing'));

  const statusLabel = document.getElementById('audio-current-track');
  if (statusLabel) {
    statusLabel.textContent = `Tocando: ${preset.name}`;
  }

  if (preset.type === 'blues-lick' || preset.type === 'bass') {
    // Toca como lick melódico sequencial
    preset.notes.forEach((freq, idx) => {
      const noteTime = now + (idx * 0.22);
      playSingleNote(ctx, freq, noteTime, 0.45, false, preset.type === 'bass');
    });
    setTimeout(() => {
      visualizerBars.forEach(bar => bar.classList.remove('playing'));
      if (statusLabel) statusLabel.textContent = 'Clique para ouvir outro timbre';
    }, (preset.notes.length * 0.22 + 0.5) * 1000);
  } else {
    // Rasqueado / Strumming de violão ou guitarra com delay entre cordas
    const strumSpeed = preset.type === 'electric' ? 0.015 : 0.035;
    preset.notes.forEach((freq, idx) => {
      const stringTime = now + (idx * strumSpeed);
      playSingleNote(ctx, freq, stringTime, 2.4, preset.type === 'electric');
    });

    setTimeout(() => {
      visualizerBars.forEach(bar => bar.classList.remove('playing'));
      if (statusLabel) statusLabel.textContent = 'Clique para ouvir outro timbre';
    }, 2500);
  }
}

function initAudioSynthesizer() {
  const chordButtons = document.querySelectorAll('[data-chord]');
  chordButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const chordKey = btn.getAttribute('data-chord');
      chordButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playChord(chordKey);

      setTimeout(() => {
        btn.classList.remove('active');
      }, 400);
    });
  });
}

/* ==========================================================================
   2. FORMULÁRIO DE AGENDAMENTO COM DISPARO INTELIGENTE PARA O WHATSAPP
   ========================================================================== */
function initFormBooking() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name')?.value.trim() || '';
    const phone = document.getElementById('booking-phone')?.value.trim() || '';
    const instrument = document.getElementById('booking-instrument')?.value || 'Violão';
    const modality = document.getElementById('booking-modality')?.value || 'Presencial no Mangal';
    const level = document.getElementById('booking-level')?.value || 'Iniciante do zero';
    const notes = document.getElementById('booking-notes')?.value.trim() || '';

    // Número oficial do Thiago Paz: (15) 99815-3365 -> 5515998153365
    const thiagoPhone = '5515998153365';

    let message = `Olá, Thiago! Vim através do seu site oficial e gostaria de agendar uma Aula Experimental Gratuita!\n\n`;
    message += `🎸 *Instrumento:* ${instrument}\n`;
    message += `📍 *Modalidade:* ${modality}\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `📱 *Telefone/WhatsApp:* ${phone}\n`;
    message += `🎯 *Meu Nível:* ${level}\n`;
    if (notes) {
      message += `💬 *Músicas que quero tocar/observação:* ${notes}\n`;
    }
    message += `\nQual seria o melhor dia e horário para conversarmos?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${thiagoPhone}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Abre modal de confirmação no site
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.add('active');
    }
  });

  const closeSuccess = document.getElementById('close-success-btn');
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      const modal = document.getElementById('success-modal');
      if (modal) modal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   3. ANIMATED STAT COUNTERS (Bio & Credenciais)
   ========================================================================== */
function initCounterStats() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target') || '0');
          const isDecimal = counter.getAttribute('data-decimal') === 'true';
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';

          let current = 0;
          const duration = 1800;
          const steps = 40;
          const stepTime = duration / steps;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (isDecimal) {
              counter.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
            } else {
              counter.textContent = `${prefix}${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const bioSection = document.getElementById('bio');
  if (bioSection) {
    observer.observe(bioSection);
  }
}

/* ==========================================================================
   4. LIGHTBOX MODAL PARA FOTOS DO ESTÚDIO
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  const galleryItems = document.querySelectorAll('[data-lightbox-src]');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const caption = item.getAttribute('data-lightbox-caption') || 'Estúdio Thiago Paz';
      modalImg.src = src;
      if (modalCaption) modalCaption.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. MENU MOBILE & NAVEGAÇÃO
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !navDrawer) return;

  const toggle = () => {
    navDrawer.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  toggleBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY & REVEAL EM SCROLL
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#f59e0b]', 'border-b-2', 'border-[#f59e0b]');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#f59e0b]', 'border-b-2', 'border-[#f59e0b]');
      }
    });
  }, { passive: true });
}

function initScrollAnimations() {
  const sections = document.querySelectorAll('.fade-in-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '50px 0px 50px 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}
