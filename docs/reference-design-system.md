# Design System da Referência e Matriz de Adaptação

Documento de engenharia reversa do sistema de design de **EAST 64 Films** e diretrizes de tradução para a identidade de **Xandy Alves Artes**.

---

## 1. Tokens de Cores Extraídos da Referência

A folha de estilo original (`base.css` e `main.css`) define as seguintes variáveis CSS no `:root`:

```css
:root {
  /* Cores Base e Fundo */
  --cl-dark: #151515;       /* Fundo profundo / caixas secundárias */
  --cl-blackgray: #222222;  /* Fundo principal da página */
  --cl-black: #1a1a1a;      /* Elementos escuros intermediários */
  --cl-bg: var(--cl-blackgray);

  /* Tipografia e Tons Claros */
  --cl-white: #ffffff;      /* Branco puro para destaques */
  --cl-whitegray: #eeeeee;  /* Texto claro principal */
  --cl-lightgray: #b9b9b9;  /* Texto secundário e bordas suaves */
  --cl-base: var(--cl-white);
  /* Cor calculada no computedStyle para texto: #ECE9E2 (Linen / Bone) */
  /* Cor calculada para legendas escuras: #5A5751 (Muted Warm Gray) */

  /* Cores de Acento (Categorias e Tags de Produção) */
  --cl-blue: #4eaebf;       /* Azul petróleo/ciano suave */
  --cl-yellow: #f6b000;     /* Amarelo mostarda vibrante */
  --cl-green: #00a44d;      /* Verde esmeralda */
  --cl-red: #e43936;        /* Vermelho vibrante */
  --cl-orange: #f46f2c;     /* Laranja editorial */
}
```

### Análise Cromática
- **Dark Mode Primário:** O fundo não é preto puro `#000000`, mas sim um carvão quente `#151515` e cinza-grafite `#222222`. Isso reduz a fadiga ocular e dá profundidade a mídias com bordas escuras.
- **Texto Quente:** O texto não é branco puro `#FFFFFF`, mas sim um off-white cremoso `#ECE9E2` que emula papéis finos de revista e iluminação natural suave.
- **Acentos Pontuais:** As cores de acento aparecem apenas em metadados minúsculos (tags, badges de ano/categoria), nunca competindo com o trabalho exposto.

---

## 2. Tipografia e Escala de Tipos

### 2.1. Famílias Tipográficas Observadas
1. **Display Serif (Títulos de Destaque):**
   - Na referência: `matrix-ii-ext-semi-narrow, sans-serif` (Adobe Typekit).
   - Características: Serifada condensada, elegância editorial clássica, alto contraste entre hastes grossas e finas, grande apelo artístico e de autoridade.
2. **Interface e Textos Longos (Sans-serif Primária):**
   - Na referência: `helvetica-neue-lt-pro, sans-serif` e `Noto Sans JP` (Google Fonts).
   - Características: Geométrica/neo-grotesca neutra, alta legibilidade em corpos pequenos (12px–16px), tracking ligeiramente aberto em caixa alta.
3. **Alternativa Serifada/Secundária:**
   - Carregada via Google Fonts: `Cormorant` e `Inter`.

### 2.2. Escala Tipográfica (Fluid Typography com `clamp()`)
Extraída diretamente das variáveis CSS:

| Token | Fórmula Extraída | Tamanho Renderizado (Desktop) | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--font-size-xs` | `calc(12 * var(--torem))` | 12px | Metadados, copyright, tags de ano e categoria |
| `--font-size-sm` | `calc(14 * var(--torem))` | 14px | Menus secundários, legendas de rodapé |
| `--font-size-md` | `calc(16 * var(--torem))` | 16px | Corpo de texto principal, links de navegação |
| `--font-size-lg` | `calc(18 * var(--torem))` | 18px | Subtítulos e leads de parágrafo |
| `--font-size-xl` | `calc(24 * var(--torem))` | 24px | Títulos de seções internas e cartões |
| `--font-size-2xl`| `clamp(32px, 1.65rem + 1.5vi, 48px)` | 32px a 48px | Cabeçalhos de projetos e seções |
| `--font-size-3xl`| `clamp(40px, 1.97rem + 2.25vi, 64px)` | 40px a 64px | Título gigante na Home (Hero Heading) |

---

## 3. Espaçamento, Grid e Geometria

### 3.1. Grid e Proporções
- **Largura Máxima do Conteúdo (`.l-wrapper`):** 1440px com padding lateral fluido (`clamp(24px, 5vi, 72px)`).
- **Stage da Home:** Altura fixa em `100dvh` (viewport height dinâmica).
- **Proporções de Imagem:**
  - Projetos em destaque: 16:9 widescreen e formato cinematográfico 2.39:1.
  - Grade de arquivo: 16:10 e 4:3.
  - Retratos de artistas/sobre: 4:5 e 3:4 vertical.

### 3.2. Geometria e Formas
- **Cantos (`border-radius`):** 0px (cantos vivos / estéticos ortogonais rígidos).
- **Linhas divisórias:** Bordas sutis de 1px com transparência (`rgba(255, 255, 255, 0.08)` a `0.15`), conferindo um aspecto arquitetônico minimalista.

---

## 4. Componentes Base e Assinaturas Visuais

### 4.1. Botão e Link Decorado (`.c-button-decorate`)
- Possui um marcador inicial triangular recortado via `clip-path: polygon(7px 50%, 0% 0%, 0% 7px)`.
- Aplica um container de máscara (`overflow: hidden`) onde cada caractere é duplicado verticalmente em um contêiner `.c-button-decorate__char-inner`.
- No hover, dispara uma transição `translateY(-50%)` com curva `cubic-bezier(0.65, 0, 0.35, 1)`, gerando uma rotação visual limpa e precisa.

### 4.2. Lista Interativa de Projetos (`.p-works__list`)
- Formato de tabela editorial simplificada:
  - Coluna 1: Numeração sequencial com zero à esquerda (`01`, `02`...).
  - Coluna 2: Título do projeto + Marca/Cliente.
  - Coluna 3: Categoria de atuação.
  - Coluna 4: Ano de realização.
- O item ativo recebe a classe `.is-active`, alterando o contraste e a opacidade dos itens inativos (dimming de 1.0 para 0.35).

---

## 5. Matriz de Adaptação: EAST 64 Films ➔ Xandy Alves Artes

| Dimensão | Referência (Produtora Audiovisual) | Adaptação para Xandy Alves Artes (Design, Ilustração e Marketing) |
| :--- | :--- | :--- |
| **Paleta Principal** | Fundo escuro monótono quase sem luz (`#151515`). | Manter a sobriedade escura com fundo carvão nobre (`#121214`), mas enriquecer com contrastes artísticos vibrantes que valorizem paletas de cores de ilustrações e identidades visuais. |
| **Tipografia Display** | `matrix-ii` (Adobe Typekit pago). | Adotar uma fonte livre nobre com a mesma imponência editorial, como **Cinzel**, **Playfair Display**, **Syne** ou **Italiana** (combinada com **Inter** ou **Plus Jakarta Sans** para interface). |
| **Mídia em Destaque** | Vídeos em loop em alta resolução. | Pranchas visuais de design, artes conceituais, ilustrações em vetor/raster em altíssima definição com zoom interativo, mockups profissionais de branding e reels/micro-animações gráficas. |
| **Categorias de Projetos**| Ads, Brand Movie, Music Video, Fashion. | **Identidade Visual & Branding**, **Ilustração & Arte Autoral**, **Design para Redes Sociais**, **Materiais Gráficos & Publicitários**, **Marketing Visual**. |
| **Ficha Técnica** | Diretor, Fotografia, Gaffer, Produtor. | **Cliente**, **Segmento**, **Serviços Prestados**, **Software/Técnicas Utilizadas**, **Ano**, **Resultado Comercial Obtido**. |
| **Sobre o Profissional**| Produtora internacional com time corporativo em Tóquio. | Apresentação autoral e próxima de Xandy Alves, destacando visão artística, domínio técnico em ferramentas e capacidade de entregar soluções que vendem para negócios. |
| **Conversão / Contato** | Formulário genérico com campo corporativo. | Acesso direto ao **WhatsApp profissional**, e-mail e formulário claro para solicitação de orçamentos e briefings criativos. |
