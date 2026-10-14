/**
 * THE BARBER CLUB - BARBEARIA CLÁSSICA & CONTEMPORÂNEA
 * Interatividade, Sintetizador Web Audio API de Efeitos da Barbearia, Lightbox e Agendamento WhatsApp
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
  initBarberAudioSynthesizer();
});

/* ==========================================================================
   1. SINTETIZADOR WEB AUDIO API (Sons Autênticos de Barbearia: Máquina, Navalha, Tesoura e Vapor)
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

const BARBER_SOUNDS = {
  'fade': {
    name: 'Máquina de Fade (Clipper Buzz)',
    action: (ctx, dest) => {
      // Cria som de motor vibratório clipper
      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(118, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(124, ctx.currentTime + 0.6);
      osc.frequency.linearRampToValueAtTime(115, ctx.currentTime + 1.2);

      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(59, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(filter);
      oscSub.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start();
      oscSub.start();
      osc.stop(ctx.currentTime + 1.6);
      oscSub.stop(ctx.currentTime + 1.6);
    }
  },
  'navalha': {
    name: 'Fio da Navalha (Shave Strop & Steel Slide)',
    action: (ctx, dest) => {
      // Ruído branco filtrado simulando o raspar suave da lâmina afiada
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2400, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(4200, ctx.currentTime + 0.3);
      bandpass.Q.setValueAtTime(4, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(dest);

      noise.start();
      noise.stop(ctx.currentTime + 0.8);
    }
  },
  'tesoura': {
    name: 'Tesoura de Precisão (Snip-Snip)',
    action: (ctx, dest) => {
      // 2 cliques metálicos rápidos da tesoura cortando
      [0, 0.22].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'highpass';
        osc.frequency.setValueAtTime(3200, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + delay + 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.09);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.1);
      });
    }
  },
  'vapor': {
    name: 'Toalha Quente & Vapor Relaxante',
    action: (ctx, dest) => {
      // Ruído suave contínuo simulando o vaporizador térmico da barboterapia
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(900, ctx.currentTime + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      noise.start();
      noise.stop(ctx.currentTime + 1.5);
    }
  },
  'espuma': {
    name: 'Borrifador & Espuma Hidratante',
    action: (ctx, dest) => {
      // Borrifador de água e loção pós-barba
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4500, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      noise.start();
      noise.stop(ctx.currentTime + 0.6);
    }
  }
};

function initBarberAudioSynthesizer() {
  const soundButtons = document.querySelectorAll('[data-sound]');
  const trackLabel = document.getElementById('audio-current-track');
  const visualizer = document.querySelector('.audio-visualizer');

  if (!soundButtons.length) return;

  soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const soundKey = btn.getAttribute('data-sound');
      const soundData = BARBER_SOUNDS[soundKey];
      if (!soundData) return;

      const ctx = getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.85, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Executa o som síntese
      soundData.action(ctx, masterGain);

      // Atualiza interface
      soundButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (trackLabel) {
        trackLabel.textContent = soundData.name;
      }

      if (visualizer) {
        visualizer.classList.add('playing');
        setTimeout(() => {
          visualizer.classList.remove('playing');
        }, 1500);
      }
    });
  });
}

/* ==========================================================================
   2. AGENDAMENTO INTELIGENTE WHATSAPP
   ========================================================================== */
function initFormBooking() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name')?.value.trim() || 'Cliente';
    const phone = document.getElementById('booking-phone')?.value.trim() || '';
    const service = document.getElementById('booking-service')?.value || 'Corte + Barba';
    const barber = document.getElementById('booking-barber')?.value || 'Primeiro barbeiro disponível';
    const date = document.getElementById('booking-date')?.value || 'Hoje';
    const time = document.getElementById('booking-time')?.value || 'Horário flexível';
    const notes = document.getElementById('booking-notes')?.value.trim() || '';

    // WhatsApp da barbearia (Configurável para o cliente ou padrão Raphael)
    const barberPhone = '5512988801327';

    let message = `💈 *NOVO AGENDAMENTO - THE BARBER CLUB*\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `📱 *WhatsApp:* ${phone}\n`;
    message += `✂️ *Serviço Escolhido:* ${service}\n`;
    message += `🧔 *Barbeiro de Preferência:* ${barber}\n`;
    message += `📅 *Data Desejada:* ${date}\n`;
    message += `⏰ *Horário Preferido:* ${time}\n`;
    if (notes) {
      message += `💬 *Observações:* ${notes}\n`;
    }
    message += `\nOlá, gostaria de confirmar a disponibilidade desse horário para meu atendimento!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${barberPhone}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('active');
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
   3. CONTADOR DE ESTATÍSTICAS ANIMADO
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
  }, { threshold: 0.25 });

  const statsSection = document.getElementById('sobre');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   4. LIGHTBOX MODAL PARA FOTOS DA GALERIA
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      if (!img) return;
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Corte Barbershop';
      if (modalCaption) {
        modalCaption.textContent = trigger.getAttribute('data-caption') || img.alt || '';
      }
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
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
  const navLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !navDrawer) return;

  const toggle = () => {
    navDrawer.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  toggleBtn.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY & REVEAL
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
      link.classList.remove('text-[#f59e0b]', 'border-[#f59e0b]');
      link.classList.add('border-transparent');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('border-transparent');
        link.classList.add('text-[#f59e0b]', 'border-[#f59e0b]');
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
