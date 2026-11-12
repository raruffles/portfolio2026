(() => {
  'use strict';

  const catalogData = window.ORIGEM_DO_VALE_DATA;
  if (!catalogData || !Array.isArray(catalogData.sections)) return;

  const sectionsRoot = document.getElementById('catalog-sections');
  const statusEl = document.getElementById('catalog-status');
  const searchInput = document.getElementById('catalog-search');
  const searchClearBtn = document.getElementById('catalog-search-clear');
  const filterChips = Array.from(document.querySelectorAll('.filter-chip'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));

  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = Array.from(document.querySelectorAll('[data-drawer-link]'));
  const pageLandmarks = Array.from(document.querySelectorAll('.skip-link, .site-header, main, .site-footer'));

  // Botões de alternância de modo (com preço / sem preço para vendedores)
  const modeToggleButtons = Array.from(document.querySelectorAll('.view-toggle-btn'));
  const vendorBanner = document.getElementById('vendor-mode-banner');

  // Detecta se a página ou a URL solicita modo vendedor
  function detectInitialMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramMode = urlParams.get('modo');
    if (paramMode === 'vendedor') return 'vendedor';
    if (paramMode === 'precos') return 'precos';
    if (document.body.dataset.defaultMode === 'vendedor') return 'vendedor';
    if (window.location.pathname.toLowerCase().includes('vendedor')) return 'vendedor';

    const saved = localStorage.getItem('odv_catalog_mode');
    if (saved === 'vendedor' || saved === 'precos') return saved;
    return 'precos';
  }

  const totalProductsCount = catalogData.sections.reduce(
    (sum, section) => sum + (Array.isArray(section.items) ? section.items.length : 0),
    0
  );
  const countAllEl = document.getElementById('count-all');
  if (countAllEl) {
    countAllEl.textContent = String(totalProductsCount);
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function getScrollBehavior() {
    return prefersReducedMotion() ? 'auto' : 'smooth';
  }

  const state = {
    filter: 'all',
    query: '',
    mode: detectInitialMode() // 'precos' ou 'vendedor'
  };

  const WHATSAPP_SVG = `
    <svg class="icon-wa" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.4.366 2.76 1.057 3.965L0 16.001l4.204-1.103a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.607M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.506c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.64-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.1-.133.196-.513.645-.627.774-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.05c.098.132 1.394 2.131 3.383 2.991.47.205.84.326 1.129.418.475.152.904.13 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
  `;

  function normalizeText(value) {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildWhatsAppUrl(productTitle, packaging = '', isVendorMode = false) {
    const extra = packaging ? ` (${packaging})` : '';
    const message = isVendorMode
      ? `Olá! Tenho interesse no produto: ${productTitle}${extra}. Gostaria de solicitar cotação e condições para meu estabelecimento.`
      : `Olá! Tenho interesse em pedir o produto: ${productTitle}${extra} pelo catálogo Origem do Vale.`;
    return `https://wa.me/${catalogData.whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  function formatPriceHtml(label, value, extraClass = '') {
    if (!value) {
      return `
        <div class="price-col">
          <span class="price-label">${label}</span>
          <span class="price-value price-value--empty">Sob consulta</span>
        </div>
      `;
    }
    const valueClass = extraClass ? `price-value ${extraClass}` : 'price-value';
    return `
      <div class="price-col">
        <span class="price-label">${label}</span>
        <span class="${valueClass}">R$&nbsp;${escapeHtml(value)}</span>
      </div>
    `;
  }

  const PLACEHOLDER_ICON_SVG = `
    <svg class="card-placeholder-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M18 9h12" />
      <path d="M16 14h16a3 3 0 0 1 3 3v18a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5V17a3 3 0 0 1 3-3Z" />
      <path d="M24 22c-3.5 0-6 2.5-6 5.5 0 3.2 2.7 5.5 6 5.5s6-2.3 6-5.5c0-3-2.5-5.5-6-5.5Z" />
      <path d="M24 22v11" />
    </svg>
  `;

  function renderProductCard(item, sectionIndex, itemIndex, isFiltering) {
    const isVendor = state.mode === 'vendedor';
    const imgClass = item.imageMode === 'cover' ? 'card-img card-img--cover' : 'card-img card-img--contain';
    const waHref = buildWhatsAppUrl(item.title, item.embalagem, isVendor);
    const safeTitle = escapeHtml(item.title);
    const loadingAttr = sectionIndex === 0 && itemIndex < 4 ? 'eager' : 'lazy';
    const shouldAnimate = (sectionIndex === 0 || isFiltering) && itemIndex < 6;
    const enterClass = shouldAnimate ? ' card-enter' : '';
    const enterStyle = shouldAnimate ? ` style="--enter-index: ${itemIndex}"` : '';

    const mediaHtml = item.image
      ? `
        <div class="card-media">
          <img
            src="${escapeHtml(item.image)}"
            alt="${safeTitle}"
            class="${imgClass}"
            width="400"
            height="500"
            loading="${loadingAttr}"
            decoding="async"
            draggable="false"
          />
        </div>
      `
      : `
        <div class="card-media card-media--placeholder" role="img" aria-label="Imagem em breve para ${safeTitle}">
          ${PLACEHOLDER_ICON_SVG}
          <span class="card-placeholder-label">Foto em breve</span>
        </div>
      `;

    const embalagemHtml = item.embalagem
      ? `<span class="card-spec">${escapeHtml(item.embalagem)}</span>`
      : '';

    // No modo vendedor: NENHUM preço é exibido!
    const priceBlockHtml = isVendor
      ? `
        <div class="card-vendor-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          <span>Catálogo de Representação &bull; Cotação Direta</span>
        </div>
      `
      : `
        <div class="card-prices">
          ${formatPriceHtml('VAREJO', item.varejo)}
          ${formatPriceHtml('ATACADO', item.atacado, 'price-value--atacado')}
        </div>
      `;

    const btnText = isVendor ? 'Solicitar Cotação' : 'Pedir no WhatsApp';

    return `
      <article class="product-card${enterClass}${isVendor ? ' is-vendor-card' : ''}"${enterStyle}>
        ${mediaHtml}
        ${embalagemHtml}
        <h3 class="card-title">${safeTitle}</h3>
        <div class="card-bottom">
          <hr class="card-divider" aria-hidden="true" />
          ${priceBlockHtml}
          <a
            href="${waHref}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-whatsapp card-btn"
            aria-label="${btnText} para ${safeTitle}"
          >
            ${WHATSAPP_SVG}
            <span>${btnText}</span>
          </a>
        </div>
      </article>
    `;
  }

  function setMode(newMode) {
    if (newMode !== 'precos' && newMode !== 'vendedor') return;
    state.mode = newMode;
    try {
      localStorage.setItem('odv_catalog_mode', newMode);
    } catch {
      // Ignora restrição de storage
    }

    // Atualiza botões
    modeToggleButtons.forEach((btn) => {
      const match = btn.dataset.mode === newMode;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    if (vendorBanner) {
      vendorBanner.hidden = newMode !== 'vendedor';
    }

    renderCatalog();
  }

  modeToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });

  function updateCarouselState(sec) {
    if (!sec) return;
    const viewport = sec.querySelector('.carousel-viewport');
    const track = sec.querySelector('.product-track');
    const controls = sec.querySelector('.carousel-controls');
    const hint = sec.querySelector('.carousel-hint');
    const prevBtn = sec.querySelector('[data-dir="-1"]');
    const nextBtn = sec.querySelector('[data-dir="1"]');
    const progressTrack = sec.querySelector('.carousel-progress-track');
    const progressThumb = sec.querySelector('.carousel-progress-thumb');
    if (!track || !prevBtn || !nextBtn) return;

    if (track.classList.contains('is-grid')) {
      track.removeAttribute('data-scrollable');
      if (viewport) {
        viewport.classList.remove('has-scroll-left', 'has-scroll-right');
      }
      if (controls) controls.hidden = true;
      if (hint) hint.hidden = true;
      if (progressTrack) progressTrack.hidden = true;
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      return;
    }

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const hasOverflow = maxScroll > 8;

    track.dataset.scrollable = hasOverflow ? 'true' : 'false';
    if (controls) controls.hidden = !hasOverflow;
    if (hint) hint.hidden = !hasOverflow;
    if (progressTrack) progressTrack.hidden = !hasOverflow;
    prevBtn.hidden = !hasOverflow;
    nextBtn.hidden = !hasOverflow;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 4;

    if (viewport) {
      viewport.classList.toggle('has-scroll-left', hasOverflow && track.scrollLeft > 4);
      viewport.classList.toggle('has-scroll-right', hasOverflow && track.scrollLeft < maxScroll - 4);
    }

    if (progressThumb && hasOverflow && track.scrollWidth > 0) {
      const visibleRatio = Math.min(1, track.clientWidth / track.scrollWidth);
      const scrollRatio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
      const scaleX = Math.min(1, Math.max(0.08, visibleRatio + (1 - visibleRatio) * scrollRatio));
      progressThumb.style.transform = `scaleX(${scaleX.toFixed(4)})`;
    }
  }

  let scrollObserver = null;

  function syncAllCarousels() {
    const sections = Array.from(sectionsRoot.querySelectorAll('.catalog-section'));
    sections.forEach((sec) => updateCarouselState(sec));
  }

  window.addEventListener('resize', syncAllCarousels, { passive: true });

  function updateSearchClearButton() {
    if (!searchClearBtn) return;
    searchClearBtn.hidden = state.query.trim().length === 0;
  }

  function renderCatalog() {
    const normalizedQuery = normalizeText(state.query.trim());
    const isFiltering = state.filter !== 'all' || normalizedQuery.length > 0;
    let totalShown = 0;
    let visibleSectionIndex = 0;

    updateSearchClearButton();

    const fragment = document.createDocumentFragment();

    catalogData.sections.forEach((section) => {
      if (state.filter !== 'all' && section.id !== state.filter) return;

      const filteredItems = section.items.filter((item) => {
        if (!normalizedQuery) return true;
        const inTitle = normalizeText(item.title).includes(normalizedQuery);
        const inEmbalagem = normalizeText(item.embalagem || '').includes(normalizedQuery);
        return inTitle || inEmbalagem;
      });

      if (filteredItems.length === 0) return;

      const currentSectionIndex = visibleSectionIndex;
      visibleSectionIndex += 1;
      totalShown += filteredItems.length;

      const sectionEl = document.createElement('section');
      sectionEl.className = 'catalog-section';
      sectionEl.id = section.id;
      sectionEl.setAttribute('aria-labelledby', `heading-${section.id}`);

      const countLabel = filteredItems.length === 1 ? 'item' : 'itens';
      const subtitleHtml = section.subtitle
        ? `<p class="section-subtitle">${escapeHtml(section.subtitle)}</p>`
        : '';

      const headerHtml = `
        <div class="container">
          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-heading" id="heading-${section.id}">${escapeHtml(section.title)}</h2>
              ${subtitleHtml}
              <span class="section-count">${filteredItems.length} ${countLabel}</span>
            </div>
            ${
              isFiltering
                ? ''
                : `
                  <div class="carousel-controls" aria-label="Navegar pelos produtos de ${escapeHtml(section.title)}">
                    <button
                      type="button"
                      class="carousel-nav-btn carousel-nav-btn--prev"
                      data-dir="-1"
                      aria-label="Ver produtos anteriores de ${escapeHtml(section.title)}"
                      disabled
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="carousel-nav-btn carousel-nav-btn--next"
                      data-dir="1"
                      aria-label="Ver próximos produtos de ${escapeHtml(section.title)}"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                `
            }
          </div>
        </div>
      `;

      const trackClass = isFiltering ? 'product-track is-grid' : 'product-track';
      const cardsHtml = filteredItems
        .map((item, index) => renderProductCard(item, currentSectionIndex, index, isFiltering))
        .join('');

      const bodyHtml = `
        <div class="container">
          <div class="carousel-viewport">
            <div
              class="${trackClass}"
              tabindex="0"
              role="region"
              aria-label="Produtos da seção ${escapeHtml(section.title)}"
            >
              ${cardsHtml}
            </div>
          </div>
          ${
            isFiltering
              ? ''
              : `
                <div class="carousel-footer" aria-hidden="true">
                  <div class="carousel-progress-track">
                    <span class="carousel-progress-thumb"></span>
                  </div>
                  <span class="carousel-hint">Arraste para o lado para explorar mais</span>
                </div>
              `
          }
        </div>
      `;

      sectionEl.innerHTML = headerHtml + bodyHtml;
      fragment.appendChild(sectionEl);
    });

    if (totalShown === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'container';
      emptyEl.innerHTML = `
        <div class="catalog-empty" role="status">
          <svg class="empty-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <circle cx="24" cy="24" r="20" />
            <path d="M16 16l16 16M32 16L16 32" />
          </svg>
          <h3 class="empty-title">Nenhum produto encontrado</h3>
          <p class="empty-text">Não encontramos itens para "<strong>${escapeHtml(state.query)}</strong>". Tente outro termo ou limpe os filtros.</p>
          <button type="button" class="btn-clear-filter" id="btn-reset-filters">Limpar busca e filtros</button>
        </div>
      `;
      fragment.appendChild(emptyEl);
    }

    sectionsRoot.replaceChildren(fragment);

    // Atualiza status acessível
    if (statusEl) {
      if (totalShown === 0) {
        statusEl.textContent = 'Nenhum produto encontrado.';
      } else if (isFiltering) {
        statusEl.textContent = `${totalShown} produto${totalShown === 1 ? '' : 's'} encontrado${totalShown === 1 ? '' : 's'}.`;
      } else {
        statusEl.textContent = '';
      }
    }

    wireCarousels();
    initScrollSpy();

    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        setFilter('all');
        if (searchInput) searchInput.value = '';
        state.query = '';
        renderCatalog();
        if (searchInput) searchInput.focus();
      });
    }
  }

  function wireCarousels() {
    const sections = Array.from(sectionsRoot.querySelectorAll('.catalog-section'));
    sections.forEach((sec) => {
      const track = sec.querySelector('.product-track');
      if (!track || track.classList.contains('is-grid')) return;

      const prevBtn = sec.querySelector('[data-dir="-1"]');
      const nextBtn = sec.querySelector('[data-dir="1"]');

      const scrollByDirection = (dir) => {
        const firstCard = track.querySelector('.product-card');
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 280;
        const gap = 20;
        const scrollAmount = (cardWidth + gap) * 2;
        track.scrollBy({
          left: dir * scrollAmount,
          behavior: getScrollBehavior()
        });
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollByDirection(-1));
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollByDirection(1));
      }

      let ticking = false;
      track.addEventListener(
        'scroll',
        () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              updateCarouselState(sec);
              ticking = false;
            });
            ticking = true;
          }
        },
        { passive: true }
      );

      attachTrackDrag(track);
      updateCarouselState(sec);
    });
  }

  function attachTrackDrag(track) {
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let pointerId = null;
    let isDragging = false;
    let suppressClick = false;
    let clearSuppressTimer = 0;
    const samples = [];
    const glideState = { rafId: 0 };

    const stopGlide = () => {
      if (glideState.rafId) {
        window.cancelAnimationFrame(glideState.rafId);
        glideState.rafId = 0;
      }
      track.classList.remove('is-gliding');
    };

    track.addEventListener(
      'click',
      (e) => {
        if (!suppressClick) return;
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
        clearTimeout(clearSuppressTimer);
      },
      true
    );

    const endDrag = (e) => {
      if (!isDown || (e && e.pointerId !== pointerId)) return;
      isDown = false;
      const wasDragging = isDragging;
      isDragging = false;
      track.classList.remove('is-dragging');

      if (pointerId !== null) {
        try {
          if (track.hasPointerCapture && track.hasPointerCapture(pointerId)) {
            track.releasePointerCapture(pointerId);
          }
        } catch {
          // Fallback silencioso
        }
        pointerId = null;
      }

      if (!wasDragging) return;

      suppressClick = true;
      clearTimeout(clearSuppressTimer);
      clearSuppressTimer = window.setTimeout(() => {
        suppressClick = false;
      }, 90);

      if (prefersReducedMotion() || samples.length < 2) return;

      const newest = samples[samples.length - 1];
      const oldest = samples[0];
      if (performance.now() - newest.t > 70) return;

      const dt = Math.max(8, newest.t - oldest.t);
      const rawVelocity = (oldest.x - newest.x) / dt;
      if (Math.abs(rawVelocity) < 0.15) return;

      let velocity = Math.max(-3.2, Math.min(3.2, rawVelocity));
      let virtualScroll = track.scrollLeft;
      let prevTime = performance.now();
      track.classList.add('is-gliding');

      const stepGlide = (now) => {
        if (!track.isConnected) {
          glideState.rafId = 0;
          return;
        }
        const frameDt = Math.min(32, Math.max(4, now - prevTime));
        prevTime = now;
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        virtualScroll = Math.max(0, Math.min(maxScroll, virtualScroll + velocity * frameDt));
        track.scrollLeft = virtualScroll;
        velocity *= Math.pow(0.92, frameDt / 16);

        const hitEdge = virtualScroll <= 0 || virtualScroll >= maxScroll;
        if (hitEdge || Math.abs(velocity) < 0.06) {
          track.classList.remove('is-gliding');
          glideState.rafId = 0;
          return;
        }
        glideState.rafId = window.requestAnimationFrame(stepGlide);
      };

      glideState.rafId = window.requestAnimationFrame(stepGlide);
    };

    track.addEventListener('pointerdown', (e) => {
      if (track.classList.contains('is-grid')) return;
      if (e.pointerType === 'touch' || e.button !== 0) return;
      if (track.scrollWidth - track.clientWidth <= 8) return;

      stopGlide();
      isDown = true;
      isDragging = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
      samples.length = 0;
      samples.push({ x: e.clientX, t: performance.now() });
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDown || e.pointerId !== pointerId) return;
      if (e.pointerType === 'mouse' && (e.buttons & 1) === 0) {
        endDrag(e);
        return;
      }

      const now = performance.now();
      samples.push({ x: e.clientX, t: now });
      while (samples.length > 1 && now - samples[0].t > 90) {
        samples.shift();
      }

      const dx = e.clientX - startX;
      if (!isDragging && Math.abs(dx) > 6) {
        isDragging = true;
        track.classList.add('is-dragging');
        try {
          if (track.setPointerCapture) track.setPointerCapture(pointerId);
        } catch {
          // Fallback silencioso
        }
      }

      if (isDragging) {
        track.scrollLeft = startScrollLeft - dx;
      }
    });

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    track.addEventListener('keydown', (e) => {
      if (track.classList.contains('is-grid')) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        track.scrollBy({ left: 300, behavior: getScrollBehavior() });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        track.scrollBy({ left: -300, behavior: getScrollBehavior() });
      }
    });
  }

  function setFilter(filterId) {
    state.filter = filterId;
    filterChips.forEach((chip) => {
      const match = chip.dataset.filter === filterId;
      chip.classList.toggle('is-active', match);
      chip.setAttribute('aria-pressed', match ? 'true' : 'false');
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetFilter = chip.dataset.filter || 'all';
      setFilter(targetFilter);
      renderCatalog();
    });
  });

  if (searchInput) {
    let debounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.query = e.target.value || '';
        renderCatalog();
      }, 160);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.query = '';
      renderCatalog();
      if (searchInput) searchInput.focus();
    });
  }

  function navigateToSection(targetId, moveFocus = false) {
    if (state.filter !== 'all' || state.query.trim() !== '') {
      setFilter('all');
      if (searchInput) searchInput.value = '';
      state.query = '';
      renderCatalog();
    }
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
      if (moveFocus) {
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
      }
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.dataset.nav;
      if (!id) return;
      e.preventDefault();
      navigateToSection(id);
      setActiveNav(id);
    });
  });

  function setActiveNav(activeId) {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.nav === activeId);
    });
  }

  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    if (scrollObserver) scrollObserver.disconnect();
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = navLinks.some((link) => link.dataset.nav === id);
            setActiveNav(match ? id : null);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    const introSection = document.getElementById('catalogo');
    if (introSection) scrollObserver.observe(introSection);

    ['palmitos', 'conservas', 'frios', 'doces', 'bebidas', 'temperos'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) scrollObserver.observe(el);
    });
  }

  let lastFocusedEl = null;
  let drawerCloseTimer = 0;

  function getDrawerFocusable() {
    if (!drawer) return [];
    return Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'));
  }

  function openDrawer() {
    if (!drawer || !drawerBackdrop || !menuToggle) return;
    window.clearTimeout(drawerCloseTimer);
    lastFocusedEl = document.activeElement;
    pageLandmarks.forEach((el) => el.setAttribute('inert', ''));
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion()) {
      drawer.classList.add('is-open');
      drawerBackdrop.classList.add('is-open');
    } else {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          drawer.classList.add('is-open');
          drawerBackdrop.classList.add('is-open');
        });
      });
    }

    const focusables = getDrawerFocusable();
    const firstFocusable = focusables[0] || drawerClose;
    if (firstFocusable) {
      window.setTimeout(() => firstFocusable.focus(), 60);
    }
  }

  function closeDrawer() {
    if (!drawer || !drawerBackdrop || !menuToggle) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    pageLandmarks.forEach((el) => el.removeAttribute('inert'));

    const finishClosing = () => {
      drawer.hidden = true;
      drawerBackdrop.hidden = true;
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    };

    if (prefersReducedMotion()) {
      finishClosing();
    } else {
      drawerCloseTimer = window.setTimeout(finishClosing, 260);
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        closeDrawer();
        setTimeout(() => {
          navigateToSection(targetId, true);
        }, 180);
      } else {
        closeDrawer();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    if (e.key === 'Tab' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
      const focusables = getDrawerFocusable();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Inicialização com modo detectado
  setMode(state.mode);
})();
