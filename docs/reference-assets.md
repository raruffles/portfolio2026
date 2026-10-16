# Inventário de Recursos, Mídias e Evidências Visuais

Registro detalhado dos ativos técnicos inspecionados em **EAST 64 Films** e catálogo das evidências capturadas.

---

## 1. Mídias e Formatos Observados na Referência

### 1.1. Vídeos e Streaming
- **Uso:** Background loops nos projetos da Home e hero de case studies.
- **Formatos:** MP4 / H.264 comprimidos para web sem áudio nos previews (`muted`, `playsinline`, `loop`).
- **Resoluções e Proporções:**
  - 1920×1080 (16:9 Full HD) e 2560×1080 (Ultra-wide 21:9).
- **Fallback:** Cada vídeo possui imagem de poster em WebP/JPG de alta fidelidade e gradiente CSS com cor dominante dinâmica baseada no HSL do projeto (`data-hue`, `data-sat`).

### 1.2. Imagens Estáticas e Galerias
- **Páginas de Projetos e Criadores:**
  - Retratos de artistas: 768×960 e 768×1153 (proporções 4:5 e 2:3 vertical).
  - Imagens de arquivo: Thumbnails de 768×432 (16:9).
  - Formatos: JPG com compressão progressiva e suporte a WebP.

### 1.3. Ativos Vetoriais (SVG) e Geometrias
- Marcador de reprodução/seta: Recortado matematicamente com CSS `clip-path: polygon(7px 50%, 0% 0%, 0% 7px)`.
- Ícones de redes sociais: SVGs monocromáticos inline para Instagram e LinkedIn.
- Logotipo: Tipografia vetorial estilizada, renderizada como SVG inline para escalabilidade perfeita sem perda de nitidez em telas retina.

---

## 2. Dependências e Scripts Externos Mapeados

| Recurso | Origem / CDN | Versão | Função Observada |
| :--- | :--- | :--- | :--- |
| **GSAP** | Bundled / GreenSock | 3.15.0 | Animações cinéticas, interpolações e timelines |
| **ScrollTrigger** | Bundled / GreenSock | 3.15.0 | Gatilhos de animação baseados em rolagem |
| **Lenis** | Bundled | Studio Freight | Suavização da rolagem de inércia |
| **Swiper** | Bundled | v11+ | Carrosséis de projetos relacionados |
| **Adobe Fonts** | `use.typekit.net/knx0cof.css` | Typekit | Fontes `matrix-ii` e `helvetica-neue-lt-pro` |
| **Google Fonts**| `fonts.googleapis.com` | Noto Sans JP, Cormorant, Inter | Tipografia complementar |

---

## 3. Catálogo de Capturas de Tela Registradas

Todas as capturas foram salvas localmente no diretório `docs/reference-screenshots/` nas resoluções especificadas:

| Arquivo de Imagem | Resolução | Tipo de Captura | Contexto da Página |
| :--- | :--- | :--- | :--- |
| `desktop-1440x1000-hero.png` | 1440 × 1000 | Viewport (Hero) | Página Inicial — Estágio com primeiro projeto em destaque |
| `desktop-1440x1000-full.png` | 1440 × 1000 | Página Completa | Página Inicial — Visão estrutural completa do stage |
| `tablet-768x1024-hero.png` | 768 × 1024 | Viewport (Hero) | Página Inicial — Comportamento em tablet vertical |
| `tablet-768x1024-full.png` | 768 × 1024 | Página Completa | Página Inicial — Diagramação em tela média |
| `mobile-390x844-hero.png` | 390 × 844 | Viewport (Hero) | Página Inicial — Versão mobile (iPhone) com controles de swipe |
| `mobile-390x844-full.png` | 390 × 844 | Página Completa | Página Inicial — Layout vertical condensado |
| `works-desktop-hero.png` | 1440 × 1000 | Viewport | Arquivo de Trabalhos (`/works/`) — Barra de filtros |
| `works-desktop-full.png` | 1440 × 2708 | Página Completa | Arquivo de Trabalhos (`/works/`) — Grade geral de 32 cases |
| `project-detail-desktop-hero.png` | 1440 × 1000 | Viewport | Detalhe do Case (`/works/fendi...`) — Hero do projeto |
| `project-detail-desktop-full.png` | 1440 × 4908 | Página Completa | Detalhe do Case — Hero, créditos, galeria e relacionados |
| `artist-desktop-hero.png` | 1440 × 1000 | Viewport | Página de Criadores (`/artist/`) — Grid de diretores |
| `artist-desktop-full.png` | 1440 × 1580 | Página Completa | Página de Criadores (`/artist/`) — Todos os profissionais |
| `about-desktop-hero.png` | 1440 × 1000 | Viewport | Sobre (`/about/`) — Declaração e manifesto |
| `about-desktop-full.png` | 1440 × 3300 | Página Completa | Sobre (`/about/`) — Diferenciais e dados institucionais |
| `contact-desktop-hero.png` | 1440 × 1000 | Viewport | Contato (`/contact/`) — Cabeçalho e início do formulário |
| `contact-desktop-full.png` | 1440 × 1000 | Página Completa | Contato (`/contact/`) — Formulário completo comercial |

---

## 4. Diretriz Estrita de Isolamento de Propriedade Intelectual

> [!CAUTION]
> **REGRA DE ISOLAMENTO DE MARCA E CONTEÚDO:**
> Nenhum arquivo de imagem, vídeo, logotipo, texto institucional, nome de cliente comercial (ex: FENDI, G-SHOCK, GLOVO) ou recurso autoral pertencente à **EAST 64 Films** será importado ou utilizado como material no portfólio de **Xandy Alves Artes**.
>
> Todo o trabalho exibido no novo site pertencerá estritamente a Xandy Alves, utilizando temporariamente placeholders gráficos devidamente identificados (`[Projeto Exemplo - Em breve material final]`) até o fornecimento formal das artes definitivas pelo profissional.
