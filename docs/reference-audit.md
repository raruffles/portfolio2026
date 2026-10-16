# Auditoria Técnica e Visual de Referência — EAST 64 Films

**URL Auditada:** `https://www.east64films.com/`  
**Data da Auditoria:** 16 de Outubro de 2026  
**Ferramental Utilizado:** Playwright Headless Browser, DevTools Runtime Evaluation, DOM Inspector, Network & Asset Profiler.

---

## 1. Sumário Executivo

A referência `EAST 64 Films` é um site institucional/portfólio de uma produtora audiovisual internacional sediada em Tóquio. Seu design opera com forte apelo cinematográfico, minimalismo editorial contemporâneo e um sistema de interação centrado em **viewport único (full-viewport app-like stage)** na página inicial, contraposto a páginas internas de rolagem contínua com grid editorial estruturado.

O objetivo desta auditoria é dissecar rigorosamente sua arquitetura visual, componentes, sistema tipográfico, microinterações e engenharia de software para extrair princípios transferíveis para o projeto **Xandy Alves Artes** (Design Gráfico, Ilustração, Identidade Visual e Marketing), sem copiar marca, conteúdos ou identidade alheia.

---

## 2. Separação: Fatos Efetivamente Observados vs. Interpretações

### 2.1. Fatos Efetivamente Observados (Evidências Concretas)
1. **CMS e Engine:** WordPress rodando em `/cms/`, servindo tema customizado `east64films`, porém desacoplado no frontend com scripts empacotados via bundler moderno (pnpm/esbuild/vite).
2. **Bibliotecas Ativas no Escopo Global (`window`):**
   - `window.gsap` versão 3.15.0 (GreenSock Animation Platform).
   - `window.ScrollTrigger` (plugin GSAP).
   - `window.Lenis` (suavização de rolagem / smooth scroll).
   - `window.Swiper` (sliders).
   - Transição de páginas baseada em Swup (`#swup`, `.transition-fade`, `.c-transition`).
3. **Página Inicial (Home):** Não possui rolagem vertical tradicional no Desktop. É um estágio de 100vh (`.p-works__stage`) onde o evento de rolagem do mouse (`wheel`), gestos de toque (`touchstart`/`touchmove`/`touchend`) e teclas direcionais (`ArrowUp`/`ArrowDown`) avançam um slider vertical sincronizado entre uma lista de projetos (`#works-list`), um preview de mídia em tela cheia com efeito parallax (`#works-preview`), e uma legenda com tipografia cinética split-char (`#works-caption`).
4. **Páginas Internas Auditadas:**
   - `/works/` (Arquivo geral de projetos com navegação por categorias em abas).
   - `/works/fendi-holiday-campaign-2025-ren-meguro/` (Case detail com player em destaque, ficha técnica de créditos em 2 colunas, galeria de imagens estáticas e related works).
   - `/artist/` (Relação de diretores/criadores em grid visual de retratos verticais com tipografia condensada e hover states).
   - `/about/` (Manifesto institucional, estatísticas/diferenciais numerados `01`, `02`, `03` e tabela corporativa).
   - `/contact/` (Formulário minimalista e limpo de contato comercial com campos de seleção de assunto e artista).
5. **Acessibilidade:** Suporte a `prefers-reduced-motion: reduce`, desativando animações pesadas e renderizando conteúdo estático quando solicitado pelo usuário.

### 2.2. Hipóteses e Interpretações de Design
- O uso de uma paleta escura (Dark UI: `#151515` e `#222222`) com tipografia linho/creme (`#ECE9E2`) busca conferir sofisticação de sala de cinema ("lights down"), onde a mídia se sobressai sem concorrência de luz branca.
- O split-text animado de cada caractere na navegação gera um ritmo tátil e analógico ("split-flap display" ou letreiros mecânicos refinados).
- Para um designer gráfico e ilustrador (Xandy Alves), a transposição deste ritmo requer equilibrar o apelo escuro com a vibração das cores de ilustrações e materiais impressos.

---

## 3. Páginas Auditadas em Detalhe

### 3.1. Página Inicial (`/`)
- **Header (`.site-header`):** Altura compacta (~33px), fixo com espaçamento superior (`top: 18px`).
  - Lado esquerdo: Declaração de posicionamento em microtipografia ("creative production company ＠TOKYO, JAPAN").
  - Centro: Logotipo tipográfico monocromático com link para Home.
  - Lado direito: Navegação com efeito roll-over (`TOP`, `WORKS`, `ARTISTS`, `ABOUT`) e seletor de idioma (`JP / EN`).
- **Stage Central (`.p-works`):** Ocupa 100% da viewport (1440×1000).
  - Três camadas sobrepostas:
    1. Background/Mídia: Vídeos com poster JPG/WebP fallback e gradiente radial por projeto.
    2. Lista lateral de navegação rápida: Numeração `01`, `02`... Título, Cliente, Categoria e Ano.
    3. Tipografia Gigante (Display Heading): Título do projeto ativo com animação stagger por caractere.
- **Footer (`.l-footer`):** Altura compacta (~40px), fixado na base da viewport, com links sociais (Instagram, LinkedIn) e CTA para contato comercial com animação roll-over.

### 3.2. Arquivo de Trabalhos (`/works/`)
- **Filtros por Categoria (`.p-works-archive__filter`):** Barra de texto horizontal com categorias (`ALL WORKS`, `ADS`, `BRAND MOVIE`, `FASHION`, etc.). O item ativo recebe sublinhado ou destaque de contraste.
- **Grid de Projetos (`.p-works-archive__list`):**
  - Grid de 2 a 3 colunas em Desktop, 1 coluna em Mobile.
  - Proporção das imagens: 16:9 widescreen para produções de vídeo.
  - Hover: Leve zoom no card e revelação do título e metadados.

### 3.3. Página de Detalhe do Projeto (`/works/[slug]`)
- **Hero:** Título em corpo editorial display, cliente e ano no topo. Player de vídeo em destaque com proporção cinematográfica.
- **Ficha Técnica (Credits):** Grid em lista de duas colunas (Cargo / Profissional).
- **Galeria:** Bloco de imagens estáticas em alta resolução, com espaçamentos generosos (respiro mínimo de 80px a 120px entre seções).
- **Trabalhos Relacionados:** Carrossel horizontal ou grid de 3 cards levando a outros cases do portfólio.

### 3.4. Criadores / Sobre (`/artist/` e `/about/`)
- **Sobre:** Abordagem editorial de revista. Título grande ("We Are A Global Creative Production Company"), parágrafos concisos com linha de leitura confortável (máximo 60-75 caracteres por linha), blocos numéricos de diferenciais (`01`, `02`, `03`) e dados corporativos claros.
- **Criadores:** Grid vertical com proporção de retrato (4:5 ou 3:4), demonstrando autoridade e presença humana por trás do trabalho.

### 3.5. Contato (`/contact/`)
- Layout clean, sem ruído. Formulário com campos de linha inferior ou caixas sóbrias: Nome, Empresa, Assunto, E-mail, Telefone e Mensagem.
- CTA de envio direto e claro.

---

## 4. Comportamento Responsivo

| Viewport | Resolução Testada | Comportamento Observado |
| :--- | :--- | :--- |
| **Desktop** | 1440 × 1000 | Full-viewport snap experience na Home. Header e Footer fixos nos extremos. Stage central interativo via wheel e keys. |
| **Tablet** | 768 × 1024 | O layout preserva o preview central, mas a lista de títulos ganha maior área de toque e o botão flutuante de "View Work" ganha maior destaque tátil. |
| **Mobile** | 390 × 844 | O stage adapta o cálculo de gap (`GAP_R = 0.25`), permitindo swipe vertical por toque (`touchstart`/`touchmove`). Legenda e botão inferior adaptados para uma mão só. |

---

## 5. Limitações Técnicas Encontradas na Referência
1. **Dependência de Typekit Proprietário:** Fontes `matrix-ii-ext-semi-narrow` e `helvetica-neue-lt-pro` são proprietárias da Adobe, necessitando de alternativas livres de alta qualidade (Google Fonts / open source) com a mesma personalidade estética no novo projeto.
2. **Carga Inicial Pesada:** Múltiplos vídeos simultâneos em preload na Home podem onerar conexões móveis brasileiras (3G/4G). No projeto de Xandy, imagens otimizadas em WebP com lazy loading e vídeos curtos sob demanda serão muito mais eficientes.
3. **Contraste de Acessibilidade em Textos Secundários:** O tom `#5A5751` sobre fundo `#222222` em textos pequenos tem taxa de contraste de ~2.8:1, abaixo da recomendação WCAG AA (4.5:1). O novo projeto deve elevar o contraste para garantir legibilidade.
