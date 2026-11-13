(() => {
  'use strict';

  const catalogData = window.ORIGEM_DO_VALE_DATA;
  if (!catalogData || !Array.isArray(catalogData.sections)) return;

  // Elementos do DOM
  const sectionsRoot = document.getElementById('catalog-sections');
  const statusEl = document.getElementById('catalog-status');
  const searchInput = document.getElementById('catalog-search');
  const searchClearBtn = document.getElementById('catalog-search-clear');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));

  // Categorias Superiores Estilo iFood
  const ifoodCatBtns = Array.from(document.querySelectorAll('.ifood-cat-item[data-cat-filter]'));

  // Filtro Lateral Estilo Mercado Livre
  const catalogSidebar = document.getElementById('catalog-sidebar');
  const sidebarCatBtns = Array.from(document.querySelectorAll('.filter-cat-btn[data-sidebar-cat]'));
  const modalidadeRadios = Array.from(document.querySelectorAll('input[name="filter-modalidade"]'));
  const priceRangeBtns = Array.from(document.querySelectorAll('.filter-price-btn[data-price-range]'));
  const priceMinInput = document.getElementById('price-min-input');
  const priceMaxInput = document.getElementById('price-max-input');
  const btnPriceApply = document.getElementById('btn-price-apply');
  const packagingRadios = Array.from(document.querySelectorAll('input[name="filter-packaging"]'));
  const sortSelect = document.getElementById('sidebar-sort-select');
  const sidebarResetBtn = document.getElementById('sidebar-reset-btn');
  const catalogResultsCount = document.getElementById('catalog-results-count');
  const activeFilterTags = document.getElementById('active-filter-tags');

  // Drawer de Filtros Mobile Estilo Mercado Livre
  const btnMobileFilterToggle = document.getElementById('btn-mobile-filter-toggle');
  const mobileFilterBadge = document.getElementById('mobile-filter-badge');
  const mobileFilterDrawer = document.getElementById('mobile-filter-drawer');
  const mobileFilterBackdrop = document.getElementById('mobile-filter-backdrop');
  const mobileFilterClose = document.getElementById('mobile-filter-close');
  const mobileFilterBody = document.getElementById('mobile-filter-body');
  const btnMobileClear = document.getElementById('btn-mobile-clear');
  const btnMobileApply = document.getElementById('btn-mobile-apply');

  // Mobile Drawer de navegação
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = Array.from(document.querySelectorAll('[data-drawer-link]'));

  // Carrinho / Cotação DOM
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const headerCartBadge = document.getElementById('header-cart-badge');
  const floatingCartFab = document.getElementById('floating-cart-fab');
  const fabCartBadge = document.getElementById('fab-cart-badge');
  const fabCartTotal = document.getElementById('fab-cart-total');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerClose = document.getElementById('cart-drawer-close');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartCheckoutForm = document.getElementById('cart-checkout-form');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');
  const drawerItemsCount = document.getElementById('drawer-items-count');
  const cartTotalQty = document.getElementById('cart-total-qty');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const btnCheckoutWhatsapp = document.getElementById('btn-checkout-whatsapp');
  const btnClearCart = document.getElementById('btn-clear-cart');
  const orderClientName = document.getElementById('order-client-name');
  const orderClientCity = document.getElementById('order-client-city');
  const orderClientPayment = document.getElementById('order-client-payment');

  const pageLandmarks = Array.from(document.querySelectorAll('.skip-link, .site-header, main, .site-footer'));

  // Modo unificado de catálogo oficial com preços e carrinho completo
  function detectInitialMode() {
    return 'precos';
  }

  // Detecta categoria inicial via URL param ou hash
  function detectInitialCategory() {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    if (catParam) return catParam.toLowerCase();

    if (window.location.hash) {
      const hash = window.location.hash.substring(1).toLowerCase();
      const valid = catalogData.sections.some((s) => s.id === hash);
      if (valid) return hash;
    }
    return 'all';
  }

  const isVendorMode = false;

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
    filter: detectInitialCategory(),
    query: '',
    mode: detectInitialMode(),
    modalidade: 'all',
    priceRange: 'all',
    minPrice: null,
    maxPrice: null,
    packaging: 'all',
    sortBy: 'relevance'
  };

  // Mapeamento de produtos por ID para acesso rápido
  const productMap = new Map();
  catalogData.sections.forEach((sec) => {
    (sec.items || []).forEach((item) => {
      productMap.set(item.id, { ...item, sectionId: sec.id, sectionTitle: sec.title });
    });
  });

  /* ==========================================================================
     GERENCIAMENTO DE CARRINHO / COTAÇÃO (LOCALSTORAGE)
     ========================================================================== */

  const CART_STORAGE_KEY = isVendorMode ? 'odv_cotacao_v1' : 'odv_cart_v1';

  let cart = [];

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          cart = parsed;
        }
      }
    } catch {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Fallback silencioso
    }
    updateCartUI();
  }

  function calculateItemPrice(product, requestedType, qty) {
    if (isVendorMode) {
      return { priceType: 'cotacao', priceValue: 0, priceFormatted: '' };
    }
    const minAtacado = product.minAtacado || 6;
    let resolvedType = requestedType;

    // Se atingir a quantidade mínima de atacado, aplica automaticamente atacado!
    if (qty >= minAtacado) {
      resolvedType = 'atacado';
    } else if (requestedType !== 'atacado') {
      resolvedType = 'varejo';
    }

    const priceFormatted =
      (resolvedType === 'atacado'
        ? product.atacado || product.varejo
        : product.varejo || product.atacado) || '0,00';
    const priceValue = parseFloat(priceFormatted.replace(/\./g, '').replace(',', '.')) || 0;

    return { priceType: resolvedType, priceValue, priceFormatted };
  }

  // Adiciona ao carrinho (com aplicação automática de desconto de atacado)
  function addToCart(productId, priceType, qty = 1) {
    const product = productMap.get(productId);
    if (!product) return;

    const numericQty = Math.max(1, parseInt(qty, 10) || 1);
    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex >= 0) {
      const updatedQty = cart[existingIndex].qty + numericQty;
      const pricing = calculateItemPrice(product, priceType, updatedQty);
      cart[existingIndex].qty = updatedQty;
      cart[existingIndex].priceType = pricing.priceType;
      cart[existingIndex].priceValue = pricing.priceValue;
      cart[existingIndex].priceFormatted = pricing.priceFormatted;
    } else {
      const pricing = calculateItemPrice(product, priceType, numericQty);
      cart.push({
        key: product.id,
        id: product.id,
        title: product.title,
        embalagem: product.embalagem || '',
        priceType: pricing.priceType,
        priceValue: pricing.priceValue,
        priceFormatted: pricing.priceFormatted,
        qty: numericQty,
        image: product.image || '',
        minAtacado: product.minAtacado || 6
      });
    }

    saveCart();
  }

  function updateCartItemQty(key, newQty) {
    const index = cart.findIndex((item) => item.key === key || item.id === key);
    if (index === -1) return;

    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      const product = productMap.get(cart[index].id);
      cart[index].qty = Math.min(999, newQty);
      if (product && !isVendorMode) {
        const pricing = calculateItemPrice(product, cart[index].priceType, cart[index].qty);
        cart[index].priceType = pricing.priceType;
        cart[index].priceValue = pricing.priceValue;
        cart[index].priceFormatted = pricing.priceFormatted;
      }
    }
    saveCart();
  }

  function removeCartItem(key) {
    cart = cart.filter((item) => item.key !== key);
    saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function formatBrl(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.priceValue, 0);

    // Badges
    if (headerCartBadge) {
      headerCartBadge.textContent = String(totalQty);
      headerCartBadge.dataset.count = String(totalQty);
      headerCartBadge.hidden = totalQty === 0;
    }

    if (fabCartBadge) {
      fabCartBadge.textContent = String(totalQty);
    }

    if (fabCartTotal) {
      fabCartTotal.textContent = isVendorMode
        ? `${totalQty} produto${totalQty === 1 ? '' : 's'}`
        : formatBrl(totalPrice);
    }

    if (floatingCartFab) {
      floatingCartFab.hidden = totalQty === 0;
    }

    // Drawer info
    if (drawerItemsCount) {
      drawerItemsCount.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'}`;
    }

    if (cartTotalQty) {
      cartTotalQty.textContent = `${totalQty} produto${totalQty === 1 ? '' : 's'}`;
    }

    if (cartTotalPrice) {
      cartTotalPrice.textContent = isVendorMode ? 'Cotação Comercial' : formatBrl(totalPrice);
    }

    // Renderiza lista do drawer
    renderCartDrawerList();
  }

  function renderCartDrawerList() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '';
      if (cartEmptyState) cartEmptyState.hidden = false;
      if (cartCheckoutForm) cartCheckoutForm.hidden = true;
      if (cartDrawerFooter) cartDrawerFooter.hidden = true;
      return;
    }

    if (cartEmptyState) cartEmptyState.hidden = true;
    if (cartCheckoutForm) cartCheckoutForm.hidden = false;
    if (cartDrawerFooter) cartDrawerFooter.hidden = false;

    const html = cart
      .map((item) => {
        const itemSubtotal = item.qty * item.priceValue;
        const subtotalText = isVendorMode ? `${item.qty} un.` : formatBrl(itemSubtotal);
        const badgeClass =
          item.priceType === 'atacado' ? 'cart-item-badge cart-item-badge--atacado' : 'cart-item-badge cart-item-badge--varejo';
        const typeLabel = item.priceType === 'atacado' ? 'Atacado' : 'Varejo';
        const unitLabel = isVendorMode ? '' : ` &bull; R$ ${item.priceFormatted} cada`;

        const imgTag = item.image
          ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="cart-item-img" loading="lazy">`
          : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;background:#f1f5f3;color:#8ba396;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>`;

        return `
          <div class="cart-item-card" data-key="${item.key}">
            ${imgTag}
            <div class="cart-item-details">
              <span class="cart-item-name">${escapeHtml(item.title)}</span>
              <div class="cart-item-meta">
                ${isVendorMode ? '' : `<span class="${badgeClass}">${typeLabel}</span>`}
                <span class="cart-item-unit-price">${escapeHtml(item.embalagem)}${unitLabel}</span>
              </div>
              <div class="qty-control" style="margin-top: 6px; height: 32px;">
                <button type="button" class="qty-btn" data-cart-action="dec" data-key="${item.key}" aria-label="Diminuir quantidade">-</button>
                <input type="number" class="qty-input" value="${item.qty}" min="1" max="999" data-cart-input="${item.key}" aria-label="Quantidade">
                <button type="button" class="qty-btn" data-cart-action="inc" data-key="${item.key}" aria-label="Aumentar quantidade">+</button>
              </div>
            </div>
            <div class="cart-item-actions">
              <button type="button" class="cart-item-remove-btn" data-cart-remove="${item.key}" aria-label="Remover ${escapeHtml(item.title)} do pedido">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
              <span class="cart-item-subtotal">${subtotalText}</span>
            </div>
          </div>
        `;
      })
      .join('');

    cartItemsContainer.innerHTML = html;
  }

  // Eventos de clique na lista do carrinho (delegação)
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      const action = target.dataset.cartAction;
      const key = target.dataset.key;
      const removeKey = target.dataset.cartRemove;

      if (removeKey) {
        removeCartItem(removeKey);
        return;
      }

      if (action && key) {
        const item = cart.find((i) => i.key === key);
        if (!item) return;

        if (action === 'inc') {
          updateCartItemQty(key, item.qty + 1);
        } else if (action === 'dec') {
          updateCartItemQty(key, item.qty - 1);
        }
      }
    });

    cartItemsContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('qty-input')) {
        const key = e.target.dataset.cartInput;
        const val = parseInt(e.target.value, 10);
        if (key && !isNaN(val)) {
          updateCartItemQty(key, Math.max(1, val));
        }
      }
    });
  }

  // Abertura e Fechamento do Drawer do Carrinho
  function openCartDrawer() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.hidden = false;
    cartBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';

    if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'true');
    if (floatingCartFab) floatingCartFab.setAttribute('aria-expanded', 'true');

    if (prefersReducedMotion()) {
      cartDrawer.classList.add('is-open');
      cartBackdrop.classList.add('is-open');
    } else {
      window.requestAnimationFrame(() => {
        cartDrawer.classList.add('is-open');
        cartBackdrop.classList.add('is-open');
      });
    }

    const firstFocusable = cartDrawerClose || cartDrawer.querySelector('button');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeCartDrawer() {
    if (!cartDrawer || !cartBackdrop) return;
    if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'false');
    if (floatingCartFab) floatingCartFab.setAttribute('aria-expanded', 'false');

    cartDrawer.classList.remove('is-open');
    cartBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';

    const finalizeClose = () => {
      cartDrawer.hidden = true;
      cartBackdrop.hidden = true;
    };

    if (prefersReducedMotion()) {
      finalizeClose();
    } else {
      setTimeout(finalizeClose, 280);
    }
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCartDrawer);
  }

  if (floatingCartFab) {
    floatingCartFab.addEventListener('click', openCartDrawer);
  }

  if (cartDrawerClose) {
    cartDrawerClose.addEventListener('click', closeCartDrawer);
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', closeCartDrawer);
  }

  if (btnClearCart) {
    btnClearCart.addEventListener('click', () => {
      if (confirm('Deseja limpar todos os itens do pedido?')) {
        clearCart();
      }
    });
  }

  // Formata o nome do item evitando repetições de gramatura (ex: 540g Vidro 540g)
  function cleanProductItemLabel(title, embalagem) {
    if (!embalagem) return title;
    let cleanTitle = title;
    const weightMatch = title.match(/\s+(\d+(?:[.,]\d+)?\s*(?:g|kg|l|ml))$/i);
    if (weightMatch) {
      const weightStr = weightMatch[1].toLowerCase().replace(/\s+/g, '');
      const embClean = embalagem.toLowerCase().replace(/\s+/g, '');
      if (embClean.includes(weightStr)) {
        cleanTitle = title.replace(/\s+(\d+(?:[.,]\d+)?\s*(?:g|kg|l|ml))$/i, '').trim();
      }
    }
    return `${cleanTitle} (${embalagem})`;
  }

  // Finalização do Pedido pelo WhatsApp com Mensagem Personalizada
  function checkoutWhatsApp() {
    if (cart.length === 0) return;

    const clientName = (orderClientName && orderClientName.value.trim()) || '';
    const clientCity = (orderClientCity && orderClientCity.value.trim()) || '';
    const paymentMethod = (orderClientPayment && orderClientPayment.value) || '';

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.priceValue, 0);

    let message = '';

    if (isVendorMode) {
      // Modo Vendedor (Sem Preços - Formatação Limpa sem caracteres quebrados)
      message += '*SOLICITAÇÃO DE COTAÇÃO — ORIGEM DO VALE*\n';
      message += '----------------------------------------------\n';
      message += 'Olá! Gostaria de solicitar cotação para os seguintes produtos:\n\n';

      cart.forEach((item) => {
        const itemLabel = cleanProductItemLabel(item.title, item.embalagem);
        message += `• ${item.qty}x ${itemLabel}\n`;
      });

      message += '\n----------------------------------------------\n';
      message += `*Total de itens:* ${totalQty} produto${totalQty === 1 ? '' : 's'}\n`;
      if (clientName) message += `*Cliente / Razão Social:* ${clientName}\n`;
      if (clientCity) message += `*Cidade e Estado:* ${clientCity}\n`;
      if (paymentMethod) message += `*Segmento:* ${paymentMethod}\n`;
      message += '\nPoderiam me enviar a proposta comercial com condições de frete e prazos?';
    } else {
      // Modo Catálogo Oficial com Preços (Varejo e Atacado - Formatação 100% UTF-8 Segura)
      message += '*PEDIDO — CATÁLOGO ORIGEM DO VALE*\n';
      message += '----------------------------------------------\n';
      message += 'Olá! Gostaria de fazer o seguinte pedido pelo catálogo:\n\n';

      cart.forEach((item) => {
        const itemLabel = cleanProductItemLabel(item.title, item.embalagem);
        const typeLabel = item.priceType === 'atacado' ? 'Atacado' : 'Varejo';
        const unitVal = `R$ ${item.priceFormatted}`;
        const subtotal = formatBrl(item.qty * item.priceValue);
        message += `• ${item.qty}x ${itemLabel} (${typeLabel} - ${unitVal} cada) = ${subtotal}\n`;
      });

      message += '\n----------------------------------------------\n';
      message += `*Total de itens:* ${totalQty} produto${totalQty === 1 ? '' : 's'}\n`;
      message += `*Valor estimado:* ${formatBrl(totalPrice)}\n\n`;

      if (clientName) message += `*Nome:* ${clientName}\n`;
      if (clientCity) message += `*Cidade / Bairro para entrega:* ${clientCity}\n`;
      if (paymentMethod) message += `*Forma de pagamento:* ${paymentMethod}\n`;

      message += '\nPoderiam confirmar a disponibilidade e o valor do frete para entrega?';
    }

    const waPhone = catalogData.whatsappPhone || '5512988801327';
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  if (btnCheckoutWhatsapp) {
    btnCheckoutWhatsapp.addEventListener('click', checkoutWhatsApp);
  }

  /* ==========================================================================
     RENDERIZAÇÃO DOS CARDS DE PRODUTOS
     ========================================================================== */

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

  function buildSingleWhatsAppUrl(productTitle, packaging = '') {
    const extra = packaging ? ` (${packaging})` : '';
    const message = isVendorMode
      ? `Olá! Tenho interesse no produto: ${productTitle}${extra}. Gostaria de solicitar cotação e condições comerciais.`
      : `Olá! Tenho interesse no produto: ${productTitle}${extra} pelo catálogo Origem do Vale.`;
    return `https://wa.me/${catalogData.whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  function renderProductCard(item, sectionIndex, itemIndex, isFiltering) {
    const isVendor = state.mode === 'vendedor';
    const imgClass = item.imageMode === 'cover' ? 'card-img card-img--cover' : 'card-img card-img--contain';
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
        <div class="card-media card-media--placeholder" role="img" aria-label="Imagem de ${safeTitle}">
          <span class="card-placeholder-label">Foto em breve</span>
        </div>
      `;

    const embalagemHtml = item.embalagem
      ? `<span class="card-spec">${escapeHtml(item.embalagem)}</span>`
      : '';

    // Catálogo Oficial com Preços Reais, Seletor Varejo / Atacado e Atalho Dinâmico
    const varejoVal = item.varejo ? `R$ ${escapeHtml(item.varejo)}` : 'Sob consulta';
    const atacadoVal = item.atacado ? `R$ ${escapeHtml(item.atacado)}` : 'Sob consulta';
    const minAtacado = item.minAtacado || 6;
    const initialDiff = Math.max(1, minAtacado - 1);
    const wholesaleRuleText = `Adicione +${initialDiff} para obter desconto de atacado`;
    const atacadoSubText = item.cx ? escapeHtml(item.cx) : 'caixa / fardo';

    const purchaseBlockHtml = `
      <button
        type="button"
        class="card-wholesale-rule is-actionable"
        data-rule-for="${item.id}"
        data-min-atacado="${minAtacado}"
        title="Clique para adicionar +${initialDiff} e obter preço de atacado"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
        <span class="rule-text">${wholesaleRuleText}</span>
      </button>
      <div class="card-pricing-selector" role="group" aria-label="Modalidade de compra para ${safeTitle}">
        <button
          type="button"
          class="pricing-pill is-active"
          data-pricing-type="varejo"
          aria-pressed="true"
        >
          <span class="pill-type">Varejo</span>
          <span class="pill-val">${varejoVal}</span>
          <span class="pill-sub">unidade</span>
        </button>
        <button
          type="button"
          class="pricing-pill"
          data-pricing-type="atacado"
          aria-pressed="false"
        >
          <span class="pill-type">Atacado</span>
          <span class="pill-val">${atacadoVal}</span>
          <span class="pill-sub">${atacadoSubText}</span>
        </button>
      </div>

      <div class="card-cart-action-group">
        <div class="qty-control">
          <button type="button" class="qty-btn" data-action="minus" aria-label="Diminuir">-</button>
          <input type="number" class="qty-input" value="1" min="1" max="999" aria-label="Quantidade">
          <button type="button" class="qty-btn" data-action="plus" aria-label="Aumentar">+</button>
        </div>
        <button
          type="button"
          class="btn-add-cart"
          data-add-to-cart="${item.id}"
          data-selected-type="varejo"
          aria-label="Adicionar ${safeTitle} ao carrinho"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span>+ Carrinho</span>
        </button>
      </div>
    `;

    const waDirectHref = buildSingleWhatsAppUrl(item.title, item.embalagem);

    return `
      <article class="product-card${enterClass}" data-product-card-id="${item.id}"${enterStyle}>
        ${mediaHtml}
        ${embalagemHtml}
        <h3 class="card-title">${safeTitle}</h3>
        <div class="card-bottom">
          <hr class="card-divider" aria-hidden="true" />
          ${purchaseBlockHtml}
          <div style="margin-top: 8px; text-align: center;">
            <a
              href="${waDirectHref}"
              target="_blank"
              rel="noopener noreferrer"
              class="card-direct-wa-link"
              style="font-size: 0.75rem; color: var(--color-muted); text-decoration: none; display: inline-flex; align-items: center; gap: 4px;"
            >
              ${WHATSAPP_SVG}
              <span>Dúvida rápida sobre este item</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     FILTRO E ORDENAÇÃO DE PRODUTOS (MERCADO LIVRE + iFOOD)
     ========================================================================== */

  function getItemNumericPrice(item) {
    const raw = item.varejo || item.atacado || '0';
    return parseFloat(String(raw).replace(/\./g, '').replace(',', '.')) || 0;
  }

  function matchesFilters(item, section) {
    // 1. Categoria
    if (state.filter !== 'all' && section.id !== state.filter) {
      return false;
    }

    // 2. Busca
    if (state.query && state.query.trim()) {
      const q = normalizeText(state.query.trim());
      const inTitle = normalizeText(item.title).includes(q);
      const inEmbalagem = normalizeText(item.embalagem || '').includes(q);
      const inMarca = normalizeText(item.marca || '').includes(q);
      const inDesc = normalizeText(item.desc || '').includes(q);
      if (!inTitle && !inEmbalagem && !inMarca && !inDesc) {
        return false;
      }
    }

    // 3. Modalidade de Compra
    if (state.modalidade === 'atacado') {
      if (!item.atacado) return false;
    } else if (state.modalidade === 'varejo') {
      if (!item.varejo) return false;
    }

    // 4. Faixa de Preço (Mercado Livre)
    const price = getItemNumericPrice(item);
    if (state.priceRange === 'under15') {
      if (price > 15) return false;
    } else if (state.priceRange === '15to25') {
      if (price < 15 || price > 25) return false;
    } else if (state.priceRange === '25to35') {
      if (price < 25 || price > 35) return false;
    } else if (state.priceRange === 'above35') {
      if (price < 35) return false;
    } else if (state.priceRange === 'custom') {
      if (state.minPrice !== null && !isNaN(state.minPrice) && price < state.minPrice) return false;
      if (state.maxPrice !== null && !isNaN(state.maxPrice) && price > state.maxPrice) return false;
    }

    // 5. Tipo de Embalagem
    if (state.packaging !== 'all') {
      const emb = normalizeText(item.embalagem || '');
      if (state.packaging === 'vidro') {
        if (!emb.includes('vidro')) return false;
      } else if (state.packaging === 'vacuo') {
        if (!emb.includes('vacuo') && !emb.includes('vácuo')) return false;
      } else if (state.packaging === 'outros') {
        if (emb.includes('vidro') || emb.includes('vacuo') || emb.includes('vácuo')) return false;
      }
    }

    return true;
  }

  function sortItems(items) {
    const list = [...items];
    if (state.sortBy === 'price-asc') {
      list.sort((a, b) => getItemNumericPrice(a) - getItemNumericPrice(b));
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => getItemNumericPrice(b) - getItemNumericPrice(a));
    } else if (state.sortBy === 'name-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    }
    return list;
  }

  function syncFilterControlsUI() {
    // iFood rail
    ifoodCatBtns.forEach((btn) => {
      const match = btn.dataset.catFilter === state.filter;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    // Sidebar categories
    sidebarCatBtns.forEach((btn) => {
      const match = btn.dataset.sidebarCat === state.filter;
      btn.classList.toggle('is-active', match);
    });

    // Nav links
    navLinks.forEach((link) => {
      const match = link.dataset.nav === state.filter;
      link.classList.toggle('is-active', match);
    });

    // Modalidade radios
    modalidadeRadios.forEach((radio) => {
      radio.checked = radio.value === state.modalidade;
    });

    // Price range buttons
    priceRangeBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.priceRange === state.priceRange);
    });

    // Packaging radios
    packagingRadios.forEach((radio) => {
      radio.checked = radio.value === state.packaging;
    });

    // Sort select
    if (sortSelect) {
      sortSelect.value = state.sortBy;
    }
  }

  function getActiveFiltersList() {
    const list = [];
    if (state.filter !== 'all') {
      const sec = catalogData.sections.find((s) => s.id === state.filter);
      const catName = sec ? sec.title.split(' ')[0] : state.filter;
      list.push({ key: 'filter', label: `Categoria: ${catName}` });
    }
    if (state.modalidade === 'atacado') {
      list.push({ key: 'modalidade', label: 'Com Atacado' });
    } else if (state.modalidade === 'varejo') {
      list.push({ key: 'modalidade', label: 'Varejo Unitário' });
    }
    if (state.priceRange === 'under15') {
      list.push({ key: 'price', label: 'Até R$ 15' });
    } else if (state.priceRange === '15to25') {
      list.push({ key: 'price', label: 'R$ 15 a R$ 25' });
    } else if (state.priceRange === '25to35') {
      list.push({ key: 'price', label: 'R$ 25 a R$ 35' });
    } else if (state.priceRange === 'above35') {
      list.push({ key: 'price', label: 'Mais de R$ 35' });
    } else if (state.priceRange === 'custom') {
      let lbl = 'Preço';
      if (state.minPrice !== null && state.maxPrice !== null) {
        lbl = `R$ ${state.minPrice} - R$ ${state.maxPrice}`;
      } else if (state.minPrice !== null) {
        lbl = `>= R$ ${state.minPrice}`;
      } else if (state.maxPrice !== null) {
        lbl = `<= R$ ${state.maxPrice}`;
      }
      list.push({ key: 'price', label: lbl });
    }
    if (state.packaging === 'vidro') {
      list.push({ key: 'packaging', label: 'Embalagem: Vidro' });
    } else if (state.packaging === 'vacuo') {
      list.push({ key: 'packaging', label: 'Embalagem: A Vácuo' });
    } else if (state.packaging === 'outros') {
      list.push({ key: 'packaging', label: 'Embalagem: Latas/Potes' });
    }
    if (state.query && state.query.trim()) {
      list.push({ key: 'query', label: `Busca: "${state.query.trim()}"` });
    }
    if (state.sortBy && state.sortBy !== 'relevance') {
      const sortLabels = {
        'price-asc': 'Menor preço',
        'price-desc': 'Maior preço',
        'name-asc': 'A – Z'
      };
      list.push({ key: 'sort', label: `Ordem: ${sortLabels[state.sortBy] || state.sortBy}` });
    }
    return list;
  }

  function updateActiveFilterTags() {
    if (!activeFilterTags) return;
    const activeFilters = getActiveFiltersList();

    if (mobileFilterBadge) {
      if (activeFilters.length > 0) {
        mobileFilterBadge.textContent = String(activeFilters.length);
        mobileFilterBadge.hidden = false;
      } else {
        mobileFilterBadge.hidden = true;
      }
    }

    if (activeFilters.length === 0) {
      activeFilterTags.innerHTML = '';
      return;
    }

    activeFilterTags.innerHTML = activeFilters
      .map(
        (f) => `
        <span class="active-filter-pill">
          <span>${escapeHtml(f.label)}</span>
          <button type="button" data-remove-filter="${f.key}" aria-label="Remover filtro ${escapeHtml(f.label)}">&times;</button>
        </span>
      `
      )
      .join('');

    activeFilterTags.querySelectorAll('[data-remove-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFilterKey(btn.dataset.removeFilter);
      });
    });
  }

  function removeFilterKey(key) {
    if (key === 'filter') {
      setFilter('all');
    } else if (key === 'modalidade') {
      state.modalidade = 'all';
    } else if (key === 'price') {
      state.priceRange = 'all';
      state.minPrice = null;
      state.maxPrice = null;
      if (priceMinInput) priceMinInput.value = '';
      if (priceMaxInput) priceMaxInput.value = '';
    } else if (key === 'packaging') {
      state.packaging = 'all';
    } else if (key === 'query') {
      state.query = '';
      if (searchInput) searchInput.value = '';
    } else if (key === 'sort') {
      state.sortBy = 'relevance';
      if (sortSelect) sortSelect.value = 'relevance';
    }
    syncFilterControlsUI();
    renderCatalog();
  }

  function resetAllFilters() {
    state.filter = 'all';
    state.query = '';
    state.modalidade = 'all';
    state.priceRange = 'all';
    state.minPrice = null;
    state.maxPrice = null;
    state.packaging = 'all';
    state.sortBy = 'relevance';

    if (searchInput) searchInput.value = '';
    if (priceMinInput) priceMinInput.value = '';
    if (priceMaxInput) priceMaxInput.value = '';
    if (sortSelect) sortSelect.value = 'relevance';

    const url = new URL(window.location);
    url.searchParams.delete('categoria');
    window.history.pushState({}, '', url);

    syncFilterControlsUI();
    renderCatalog();
  }

  function setFilter(filterId, updateUrl = true) {
    state.filter = filterId;
    syncFilterControlsUI();

    if (updateUrl) {
      const url = new URL(window.location);
      if (filterId === 'all') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', filterId);
      }
      window.history.pushState({}, '', url);
    }

    renderCatalog();
  }

  // Cliques nas Categorias Superiores (Estilo iFood)
  ifoodCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.dataset.catFilter || 'all';
      setFilter(targetFilter);
      // Scroll suave até o início da vitrine
      if (sectionsRoot) {
        sectionsRoot.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
      }
    });
  });

  // Cliques nas Categorias Laterais (Estilo Mercado Livre)
  sidebarCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.dataset.sidebarCat || 'all';
      setFilter(targetFilter);
    });
  });

  // Cliques na Modalidade de Compra
  modalidadeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      state.modalidade = radio.value;
      renderCatalog();
    });
  });

  // Cliques nas Faixas de Preço pré-definidas
  priceRangeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.priceRange = btn.dataset.priceRange || 'all';
      state.minPrice = null;
      state.maxPrice = null;
      if (priceMinInput) priceMinInput.value = '';
      if (priceMaxInput) priceMaxInput.value = '';
      syncFilterControlsUI();
      renderCatalog();
    });
  });

  // Aplicação de faixa de preço manual
  function applyCustomPriceRange() {
    const minVal = priceMinInput && priceMinInput.value !== '' ? parseFloat(priceMinInput.value) : null;
    const maxVal = priceMaxInput && priceMaxInput.value !== '' ? parseFloat(priceMaxInput.value) : null;
    if (minVal === null && maxVal === null) {
      state.priceRange = 'all';
      state.minPrice = null;
      state.maxPrice = null;
    } else {
      state.priceRange = 'custom';
      state.minPrice = minVal;
      state.maxPrice = maxVal;
    }
    syncFilterControlsUI();
    renderCatalog();
  }

  if (btnPriceApply) {
    btnPriceApply.addEventListener('click', applyCustomPriceRange);
  }

  if (priceMinInput) {
    priceMinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCustomPriceRange();
      }
    });
  }

  if (priceMaxInput) {
    priceMaxInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCustomPriceRange();
      }
    });
  }

  // Cliques na Embalagem
  packagingRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      state.packaging = radio.value;
      renderCatalog();
    });
  });

  // Ordenação
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sortBy = sortSelect.value;
      renderCatalog();
    });
  }

  // Botão Limpar Tudo da Sidebar
  if (sidebarResetBtn) {
    sidebarResetBtn.addEventListener('click', resetAllFilters);
  }

  /* ==========================================================================
     DRAWER DE FILTROS MOBILE (ESTILO MERCADO LIVRE)
     ========================================================================== */

  function renderMobileFilterDrawer() {
    if (!mobileFilterBody) return;

    const categories = [
      { id: 'all', name: 'Todas as categorias', count: totalProductsCount },
      ...catalogData.sections.map((s) => ({ id: s.id, name: s.title, count: (s.items || []).length }))
    ];

    const catButtonsHtml = categories
      .map(
        (cat) => `
        <button type="button" class="filter-cat-btn ${state.filter === cat.id ? 'is-active' : ''}" data-mobile-cat="${cat.id}">
          <span class="cat-name">${escapeHtml(cat.name)}</span>
          <span class="cat-qty">${cat.count}</span>
        </button>
      `
      )
      .join('');

    mobileFilterBody.innerHTML = `
      <!-- Categorias -->
      <div class="filter-group">
        <h3 class="filter-group-title">Categorias</h3>
        <div class="filter-category-list">
          ${catButtonsHtml}
        </div>
      </div>

      <!-- Modalidade -->
      <div class="filter-group">
        <h3 class="filter-group-title">Modalidade de Compra</h3>
        <div class="filter-radio-list">
          <label class="filter-radio-label">
            <input type="radio" name="mobile-modalidade" value="all" ${state.modalidade === 'all' ? 'checked' : ''} />
            <span>Varejo &amp; Atacado (Todos)</span>
          </label>
          <label class="filter-radio-label">
            <input type="radio" name="mobile-modalidade" value="atacado" ${state.modalidade === 'atacado' ? 'checked' : ''} />
            <span>Com Desconto Atacado</span>
          </label>
          <label class="filter-radio-label">
            <input type="radio" name="mobile-modalidade" value="varejo" ${state.modalidade === 'varejo' ? 'checked' : ''} />
            <span>Varejo Unitário</span>
          </label>
        </div>
      </div>

      <!-- Faixa de Preço -->
      <div class="filter-group">
        <h3 class="filter-group-title">Preço</h3>
        <ul class="filter-price-list">
          <li><button type="button" class="filter-price-btn ${state.priceRange === 'all' ? 'is-active' : ''}" data-mobile-price="all">Todos os preços</button></li>
          <li><button type="button" class="filter-price-btn ${state.priceRange === 'under15' ? 'is-active' : ''}" data-mobile-price="under15">Até R$ 15,00</button></li>
          <li><button type="button" class="filter-price-btn ${state.priceRange === '15to25' ? 'is-active' : ''}" data-mobile-price="15to25">R$ 15 a R$ 25</button></li>
          <li><button type="button" class="filter-price-btn ${state.priceRange === '25to35' ? 'is-active' : ''}" data-mobile-price="25to35">R$ 25 a R$ 35</button></li>
          <li><button type="button" class="filter-price-btn ${state.priceRange === 'above35' ? 'is-active' : ''}" data-mobile-price="above35">Mais de R$ 35,00</button></li>
        </ul>
        <div class="filter-price-inputs">
          <div class="price-input-wrapper">
            <span>R$</span>
            <input type="number" id="mobile-price-min" placeholder="Mín" value="${state.minPrice || ''}" min="0" max="999" aria-label="Preço mínimo mobile" />
          </div>
          <span class="price-input-divider">-</span>
          <div class="price-input-wrapper">
            <span>R$</span>
            <input type="number" id="mobile-price-max" placeholder="Máx" value="${state.maxPrice || ''}" min="0" max="999" aria-label="Preço máximo mobile" />
          </div>
          <button type="button" class="btn-price-apply" id="btn-mobile-price-apply" aria-label="Aplicar faixa mobile">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <!-- Embalagem -->
      <div class="filter-group">
        <h3 class="filter-group-title">Embalagem</h3>
        <div class="filter-radio-list">
          <label class="filter-radio-label">
            <input type="radio" name="mobile-packaging" value="all" ${state.packaging === 'all' ? 'checked' : ''} />
            <span>Todas as embalagens</span>
          </label>
          <label class="filter-radio-label">
            <input type="radio" name="mobile-packaging" value="vidro" ${state.packaging === 'vidro' ? 'checked' : ''} />
            <span>Vidros (540g / 570g / 285g)</span>
          </label>
          <label class="filter-radio-label">
            <input type="radio" name="mobile-packaging" value="vacuo" ${state.packaging === 'vacuo' ? 'checked' : ''} />
            <span>A Vácuo (Frios &amp; Queijos)</span>
          </label>
          <label class="filter-radio-label">
            <input type="radio" name="mobile-packaging" value="outros" ${state.packaging === 'outros' ? 'checked' : ''} />
            <span>Latas, Potes &amp; Garrafas</span>
          </label>
        </div>
      </div>

      <!-- Ordenar por -->
      <div class="filter-group">
        <h3 class="filter-group-title">Ordenar por</h3>
        <select class="filter-select" id="mobile-sort-select" aria-label="Ordenar produtos mobile">
          <option value="relevance" ${state.sortBy === 'relevance' ? 'selected' : ''}>Mais relevantes</option>
          <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Menor preço</option>
          <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Maior preço</option>
          <option value="name-asc" ${state.sortBy === 'name-asc' ? 'selected' : ''}>Nome (A &ndash; Z)</option>
        </select>
      </div>
    `;

    // Listeners do Drawer Mobile
    mobileFilterBody.querySelectorAll('[data-mobile-cat]').forEach((b) => {
      b.addEventListener('click', () => {
        setFilter(b.dataset.mobileCat);
        renderMobileFilterDrawer();
      });
    });

    mobileFilterBody.querySelectorAll('input[name="mobile-modalidade"]').forEach((r) => {
      r.addEventListener('change', () => {
        state.modalidade = r.value;
        modalidadeRadios.forEach((mr) => {
          mr.checked = mr.value === r.value;
        });
        renderCatalog();
      });
    });

    mobileFilterBody.querySelectorAll('[data-mobile-price]').forEach((b) => {
      b.addEventListener('click', () => {
        state.priceRange = b.dataset.mobilePrice;
        state.minPrice = null;
        state.maxPrice = null;
        syncFilterControlsUI();
        renderMobileFilterDrawer();
        renderCatalog();
      });
    });

    const mobPriceMin = document.getElementById('mobile-price-min');
    const mobPriceMax = document.getElementById('mobile-price-max');
    const btnMobPriceApply = document.getElementById('btn-mobile-price-apply');
    if (btnMobPriceApply) {
      btnMobPriceApply.addEventListener('click', () => {
        const minVal = mobPriceMin && mobPriceMin.value !== '' ? parseFloat(mobPriceMin.value) : null;
        const maxVal = mobPriceMax && mobPriceMax.value !== '' ? parseFloat(mobPriceMax.value) : null;
        if (minVal === null && maxVal === null) {
          state.priceRange = 'all';
          state.minPrice = null;
          state.maxPrice = null;
        } else {
          state.priceRange = 'custom';
          state.minPrice = minVal;
          state.maxPrice = maxVal;
        }
        if (priceMinInput) priceMinInput.value = minVal !== null ? minVal : '';
        if (priceMaxInput) priceMaxInput.value = maxVal !== null ? maxVal : '';
        syncFilterControlsUI();
        renderMobileFilterDrawer();
        renderCatalog();
      });
    }

    mobileFilterBody.querySelectorAll('input[name="mobile-packaging"]').forEach((r) => {
      r.addEventListener('change', () => {
        state.packaging = r.value;
        packagingRadios.forEach((pr) => {
          pr.checked = pr.value === r.value;
        });
        renderCatalog();
      });
    });

    const mobSortSelect = document.getElementById('mobile-sort-select');
    if (mobSortSelect) {
      mobSortSelect.addEventListener('change', () => {
        state.sortBy = mobSortSelect.value;
        if (sortSelect) sortSelect.value = mobSortSelect.value;
        renderCatalog();
      });
    }
  }

  function openMobileFilterDrawer() {
    if (!mobileFilterDrawer || !mobileFilterBackdrop) return;
    renderMobileFilterDrawer();
    mobileFilterDrawer.hidden = false;
    mobileFilterBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeMobileFilterDrawer() {
    if (!mobileFilterDrawer || !mobileFilterBackdrop) return;
    mobileFilterDrawer.hidden = true;
    mobileFilterBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  if (btnMobileFilterToggle) {
    btnMobileFilterToggle.addEventListener('click', openMobileFilterDrawer);
  }

  if (mobileFilterClose) {
    mobileFilterClose.addEventListener('click', closeMobileFilterDrawer);
  }

  if (mobileFilterBackdrop) {
    mobileFilterBackdrop.addEventListener('click', closeMobileFilterDrawer);
  }

  if (btnMobileClear) {
    btnMobileClear.addEventListener('click', () => {
      resetAllFilters();
      renderMobileFilterDrawer();
    });
  }

  if (btnMobileApply) {
    btnMobileApply.addEventListener('click', () => {
      closeMobileFilterDrawer();
    });
  }

  // Responde ao botão voltar do navegador
  window.addEventListener('popstate', () => {
    const cat = detectInitialCategory();
    setFilter(cat, false);
  });

  /* ==========================================================================
     CARROSSEL E RENDERIZAÇÃO GERAL DO CATÁLOGO
     ========================================================================== */

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
      if (viewport) viewport.classList.remove('has-scroll-left', 'has-scroll-right');
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
    updateSearchClearButton();
    updateActiveFilterTags();

    let totalShown = 0;
    let visibleSectionIndex = 0;
    const isDedicatedCategory = state.filter !== 'all';
    const hasActiveFilters =
      isDedicatedCategory ||
      state.query.trim().length > 0 ||
      state.modalidade !== 'all' ||
      state.priceRange !== 'all' ||
      state.packaging !== 'all' ||
      state.sortBy !== 'relevance';

    const fragment = document.createDocumentFragment();

    catalogData.sections.forEach((section) => {
      // Se for categoria dedicada, filtra estritamente por ela
      if (isDedicatedCategory && section.id !== state.filter) return;

      // Filtra produtos pelos critérios do Mercado Livre e busca
      let filteredItems = (section.items || []).filter((item) => matchesFilters(item, section));

      if (filteredItems.length === 0) return;

      // Ordena produtos conforme seleção
      filteredItems = sortItems(filteredItems);

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
              hasActiveFilters
                ? ''
                : `
                  <div class="carousel-controls" aria-label="Navegar pelos produtos de ${escapeHtml(section.title)}">
                    <button
                      type="button"
                      class="carousel-nav-btn carousel-nav-btn--prev"
                      data-dir="-1"
                      aria-label="Ver produtos anteriores"
                      disabled
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button
                      type="button"
                      class="carousel-nav-btn carousel-nav-btn--next"
                      data-dir="1"
                      aria-label="Ver próximos produtos"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                `
            }
          </div>
        </div>
      `;

      // Modo Grid contínua quando filtrado, carrossel quando em visão global sem filtros
      const trackClass = hasActiveFilters ? 'product-track is-grid' : 'product-track';
      const cardsHtml = filteredItems
        .map((item, index) => renderProductCard(item, currentSectionIndex, index, hasActiveFilters))
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
            hasActiveFilters
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
          <h3 class="empty-title">Nenhum produto encontrado</h3>
          <p class="empty-text">Não encontramos itens com os filtros e busca selecionados. Tente ajustar os parâmetros ou limpar os filtros.</p>
          <button type="button" class="btn-clear-filter" id="btn-reset-filters">Limpar todos os filtros</button>
        </div>
      `;
      fragment.appendChild(emptyEl);
    }

    sectionsRoot.replaceChildren(fragment);

    // Atualiza contagem de resultados no topo da lista
    if (catalogResultsCount) {
      catalogResultsCount.innerHTML = `Exibindo <strong>${totalShown} produto${totalShown === 1 ? '' : 's'}</strong>`;
    }

    // Atualiza status para leitores de tela
    if (statusEl) {
      if (totalShown === 0) {
        statusEl.textContent = 'Nenhum produto encontrado.';
      } else {
        statusEl.textContent = `${totalShown} produto${totalShown === 1 ? '' : 's'} encontrado${totalShown === 1 ? '' : 's'}.`;
      }
    }

    wireCardControls();
    wireCarousels();
    initScrollSpy();

    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }
  }

  // Interações dentro dos Cards (Seletores Inteligentes de Varejo/Atacado, Qtd e Add Cart)
  function wireCardControls() {
    const cards = Array.from(sectionsRoot.querySelectorAll('.product-card'));
    cards.forEach((card) => {
      const productId = card.dataset.productCardId;
      const product = productMap.get(productId);
      const minAtacado = (product && product.minAtacado) || 6;
      const pills = Array.from(card.querySelectorAll('.pricing-pill'));
      const addBtn = card.querySelector('.btn-add-cart');
      const qtyInput = card.querySelector('.qty-input');
      const minusBtn = card.querySelector('[data-action="minus"]');
      const plusBtn = card.querySelector('[data-action="plus"]');
      const ruleBadge = card.querySelector('.card-wholesale-rule');

      function syncWholesaleByQuantity(newQty, explicitType = null) {
        if (!product) return;
        const qtyNum = Math.max(1, parseInt(newQty, 10) || 1);
        let targetType = explicitType;

        if (!targetType) {
          // Muda sozinho para atacado se atingir a quantidade mínima!
          targetType = qtyNum >= minAtacado ? 'atacado' : 'varejo';
        }

        pills.forEach((p) => {
          const match = p.dataset.pricingType === targetType;
          p.classList.toggle('is-active', match);
          p.setAttribute('aria-pressed', match ? 'true' : 'false');
        });

        if (addBtn) {
          addBtn.dataset.selectedType = targetType;
        }

        if (ruleBadge) {
          const textSpan = ruleBadge.querySelector('.rule-text');
          if (targetType === 'atacado' || qtyNum >= minAtacado) {
            ruleBadge.classList.add('is-applied');
            ruleBadge.classList.remove('is-actionable');
            if (textSpan) textSpan.textContent = `✓ Desconto de atacado ativado (${qtyNum} un.)`;
            ruleBadge.title = `Preço de atacado ativo para ${qtyNum} unidades`;
          } else {
            const diff = Math.max(1, minAtacado - qtyNum);
            ruleBadge.classList.remove('is-applied');
            ruleBadge.classList.add('is-actionable');
            if (textSpan) textSpan.textContent = `Adicione +${diff} para obter desconto de atacado`;
            ruleBadge.title = `Clique para adicionar +${diff} e obter preço de atacado (${minAtacado} un.)`;
          }
        }
      }

      // Atalho interativo no badge: clicar salta a quantidade para o atacado
      if (ruleBadge) {
        ruleBadge.addEventListener('click', () => {
          const currentVal = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
          if (currentVal < minAtacado) {
            if (qtyInput) qtyInput.value = minAtacado;
            syncWholesaleByQuantity(minAtacado, 'atacado');
          }
        });
      }

      // Cliques nas pílulas Varejo / Atacado
      pills.forEach((pill) => {
        pill.addEventListener('click', () => {
          const chosenType = pill.dataset.pricingType || 'varejo';
          if (chosenType === 'atacado') {
            const currentVal = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
            // Se clicou em atacado e tem menos que o mínimo, salta para o mínimo de atacado!
            if (currentVal < minAtacado && qtyInput) {
              qtyInput.value = minAtacado;
            }
            syncWholesaleByQuantity(qtyInput ? qtyInput.value : minAtacado, 'atacado');
          } else {
            const currentVal = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
            if (currentVal >= minAtacado && qtyInput) {
              qtyInput.value = Math.max(1, minAtacado - 1);
            }
            syncWholesaleByQuantity(qtyInput ? qtyInput.value : 1, 'varejo');
          }
        });
      });

      // Controles de quantidade sincronizados
      if (minusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
          const val = parseInt(qtyInput.value, 10) || 1;
          const nextVal = Math.max(1, val - 1);
          qtyInput.value = nextVal;
          syncWholesaleByQuantity(nextVal);
        });
      }

      if (plusBtn && qtyInput) {
        plusBtn.addEventListener('click', () => {
          const val = parseInt(qtyInput.value, 10) || 1;
          const nextVal = Math.min(999, val + 1);
          qtyInput.value = nextVal;
          syncWholesaleByQuantity(nextVal);
        });
      }

      if (qtyInput) {
        qtyInput.addEventListener('input', () => {
          const val = parseInt(qtyInput.value, 10) || 1;
          syncWholesaleByQuantity(val);
        });
      }

      // Botão Adicionar ao Carrinho / Cotação
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const productId = addBtn.dataset.addToCart;
          const type = addBtn.dataset.selectedType || addBtn.dataset.type || 'varejo';
          const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;

          addToCart(productId, type, qty);

          // Feedback visual animado
          addBtn.classList.add('is-added');
          const originalHtml = addBtn.innerHTML;
          addBtn.innerHTML = `<span>&check; Adicionado!</span>`;
          setTimeout(() => {
            addBtn.classList.remove('is-added');
            addBtn.innerHTML = originalHtml;
          }, 1400);
        });
      }
    });
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

  // Busca em tempo real com debounce
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
    if (state.filter !== 'all' && state.filter !== targetId) {
      setFilter(targetId);
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
    });
  });

  let scrollObserver = null;
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    if (scrollObserver) scrollObserver.disconnect();
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.dataset.nav === id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    ['palmitos', 'conservas', 'frios', 'doces', 'bebidas'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) scrollObserver.observe(el);
    });
  }

  // Mobile Drawer do Menu Superior
  let lastFocusedEl = null;
  let drawerCloseTimer = 0;

  function openMenuDrawer() {
    if (!drawer || !drawerBackdrop || !menuToggle) return;
    window.clearTimeout(drawerCloseTimer);
    lastFocusedEl = document.activeElement;
    pageLandmarks.forEach((el) => el.setAttribute('inert', ''));
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    drawer.classList.add('is-open');
    drawerBackdrop.classList.add('is-open');

    if (drawerClose) {
      setTimeout(() => drawerClose.focus(), 60);
    }
  }

  function closeMenuDrawer() {
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
        closeMenuDrawer();
      } else {
        openMenuDrawer();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeMenuDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenuDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        closeMenuDrawer();
        setTimeout(() => {
          navigateToSection(targetId, true);
        }, 180);
      } else {
        closeMenuDrawer();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawer && !cartDrawer.hidden) {
        e.preventDefault();
        closeCartDrawer();
        return;
      }
      if (menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
        e.preventDefault();
        closeMenuDrawer();
        return;
      }
    }
  });

  // Inicialização
  loadCart();
  renderCatalog();
  updateCartUI();
})();
