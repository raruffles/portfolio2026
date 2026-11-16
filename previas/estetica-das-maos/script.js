/**
 * ESTÉTICA DAS MÃOS — NAIL STUDIO & ACADEMY
 * Interatividade, Agenda Inteligente & Conversão WhatsApp
 * Gonzaga, Santos - SP
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAgendaTabs();
  initBookingFlow();
  initCourseActions();
  initGalleryModal();
  initMinBookingDate();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const body = document.body;

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    body.classList.toggle('mobile-nav-active');
  });

  // Fechar menu ao clicar em qualquer link de navegação
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-nav-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   2. HUB DE AGENDAS: ALTERNÂNCIA DE ABAS
   -------------------------------------------------------------------------- */
function initAgendaTabs() {
  const tabBtns = document.querySelectorAll('.agenda-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Atualiza botões
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Alterna painéis
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. FLUXO DE AGENDAMENTO DE PROCEDIMENTO (COM CÁLCULO E WHATSAPP FORMATADO)
   -------------------------------------------------------------------------- */
function initBookingFlow() {
  const serviceInputs = document.querySelectorAll('input[name="service-choice"]');
  const dateInput = document.getElementById('booking-date');
  const turnInputs = document.querySelectorAll('input[name="turn-choice"]');
  const summaryService = document.getElementById('summary-service');
  const summaryTime = document.getElementById('summary-time');
  const summaryDate = document.getElementById('summary-date');
  const summaryTurn = document.getElementById('summary-turn');
  const sendBookingBtn = document.getElementById('send-booking-btn');

  if (!sendBookingBtn) return;

  function updateSummaryAndLink() {
    // 1. Serviço selecionado
    const selectedService = document.querySelector('input[name="service-choice"]:checked');
    const serviceName = selectedService ? selectedService.value : 'Alongamento em Acrílico';
    const serviceDuration = selectedService ? selectedService.getAttribute('data-duration') : '1h45';

    if (summaryService) summaryService.textContent = serviceName;
    if (summaryTime) summaryTime.textContent = serviceDuration;

    // 2. Data selecionada
    let dateVal = dateInput && dateInput.value ? dateInput.value : '';
    let formattedDate = 'A combinar no WhatsApp';
    if (dateVal) {
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    if (summaryDate) summaryDate.textContent = formattedDate;

    // 3. Turno selecionado (Salão abre às 14h)
    const selectedTurn = document.querySelector('input[name="turn-choice"]:checked');
    const turnVal = selectedTurn ? selectedTurn.value : 'Tarde (14h às 17h)';
    if (summaryTurn) summaryTurn.textContent = turnVal;

    // 4. Montagem da URL de WhatsApp Contextual (Frictionless & 100% à prova de falhas em emojis)
    const phone = '5513996641568';
    const message = `Olá! Gostaria de agendar um horário na *Estética das Mãos*:\n\n` +
      `• *Procedimento:* ${serviceName}\n` +
      `• *Tempo Estimado:* ${serviceDuration}\n` +
      `• *Data de Preferência:* ${formattedDate}\n` +
      `• *Turno:* ${turnVal}\n\n` +
      `Poderiam me confirmar os horários disponíveis? Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    sendBookingBtn.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  }

  // Event Listeners
  serviceInputs.forEach(input => input.addEventListener('change', updateSummaryAndLink));
  if (dateInput) dateInput.addEventListener('change', updateSummaryAndLink);
  turnInputs.forEach(input => input.addEventListener('change', updateSummaryAndLink));

  // Executa uma vez no carregamento para sincronizar o estado inicial
  updateSummaryAndLink();
}

/* --------------------------------------------------------------------------
   4. AÇÕES DA AGENDA DE CURSOS
   -------------------------------------------------------------------------- */
function initCourseActions() {
  const courseButtons = document.querySelectorAll('.btn-enroll-course');
  const phone = '5513996641568';

  courseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseName = btn.getAttribute('data-course-name') || 'Curso Profissionalizante';
      const courseDate = btn.getAttribute('data-course-date') || 'Próxima Turma';

      const message = `Olá! Gostaria de saber mais informações e garantir minha vaga no *${courseName}* da Estética das Mãos (Turma de ${courseDate}). Vocês ainda têm vagas disponíveis?`;
      
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/* --------------------------------------------------------------------------
   5. LIGHTBOX MODAL NATIVO (MODERN WEB GUIDANCE: DIALOG + LIGHT DISMISS)
   -------------------------------------------------------------------------- */
function initGalleryModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const dialog = document.getElementById('galleryDialog');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (!dialog) return;

  // Abrir modal ao clicar ou pressionar Enter/Espaço na imagem da galeria (Acessibilidade WCAG 2.1.1)
  galleryItems.forEach(item => {
    function openModal() {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || 'Design de Unhas';
      const tech = item.getAttribute('data-tech') || 'Técnica Estética das Mãos';

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = title;
      }
      if (modalCaption) {
        modalCaption.textContent = `${title} — ${tech}`;
      }

      // Abre usando API nativa moderna
      dialog.showModal();
    }

    item.addEventListener('click', openModal);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  // Fechar no botão X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      dialog.close();
    });
  }

  // Fallback obrigatório do Modern Web Guidance para navegadores sem suporte a closedby="any"
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isInside) {
        dialog.close();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. DEFINIR DATA MÍNIMA DO AGENDAMENTO (HOJE)
   -------------------------------------------------------------------------- */
function initMinBookingDate() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}
