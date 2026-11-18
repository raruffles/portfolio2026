# EVER Lash Extension — Website Clone

Clone de alta fidelidade da página de serviços **EVER — Lash Extension** (`https://www.ever.co.id/services/lash-extension`), construído seguindo o **Fluxo de Desenvolvimento Web Padrão (6 Fases)** e a skill de replicação `clone-website`.

---

## 🎯 Visão Geral do Projeto

- **URL de Origem:** `https://www.ever.co.id/services/lash-extension`
- **Diretório Local:** `clones/ever-lash-extension/`
- **Arquivo Principal:** `clones/ever-lash-extension/index.html`
- **Assets Locais:** `clones/ever-lash-extension/assets/`
  - Fontes tipográficas originais: `BradfordLL-Medium` (serif luxo) e `Maax` (Light, Regular, Medium, Bold)
  - Imagens em alta resolução e texturas de papel (`.avif`, `.jpg`)
  - Animações Lottie vetoriais (`up-right.json`, `ever-logo.json`)
  - Bibliotecas interativas locais: Swiper 11, GSAP 3.12, ScrollTrigger, Lenis Smooth Scroll e Webflow Runtime

---

## 🧭 Mapeamento de Rotas e Arquitetura

| Origem | Destino Local | Descrição |
|---|---|---|
| `https://www.ever.co.id/services/lash-extension` | `clones/ever-lash-extension/index.html` | Página principal de Lash Extension |
| `/assets/ever-april.webflow.shared.css` | `assets/ever-april.webflow.shared.css` | Folha de estilos unificada com `@font-face` locais |
| `cdn.prod.website-files.com/.../fonts/` | `assets/fonts/` | 5 arquivos tipográficos completos |
| `cdn.prod.website-files.com/.../images/` | `assets/images/` | Fotografias editoriais, macros de cílios e texturas |
| `cdn.prod.website-files.com/.../lottie/` | `assets/*.json` | Animações vetoriais Lottie nativas |

---

## ⚡ Interações e Comportamentos Reproduzidos

1. **Menu Mobile Drawer:** Navegação lateral com índice numerado dos serviços (001 a 011), links de redes sociais e CTAs diretos para agendamento via WhatsApp e Ligação.
2. **Hero com Scroll Pinning & Scaling:** Transição dinâmica da fotografia principal conforme o usuário desce a página.
3. **Showcase Interativo de Opções:** Apresentação macro dos estilos de cílios (*Single Lash*, *Hybrid Lash*, *Natural Volume*, *Glam Volume*, *Artisan’s Choice*).
4. **Depoimento de Embaixadora:** Sessão editorial com imagem e aspas de Cinta Laura.
5. **FAQ Accordion:** Perguntas frequentes com abertura e fechamento suaves.
6. **Acessibilidade & Performance:**
   - Zero dependências de rastreadores externos (GTM e Meta Pixel removidos para privacidade e 0 erros de console).
   - Suporte nativo a `prefers-reduced-motion: reduce`.
   - 100% dos assets salvos localmente (autonomia offline).

---

## 🚀 Como Executar e Testar Localmente

1. No terminal do projeto, execute o servidor local:
   ```bash
   npx http-server . -p 3000 -c-1
   ```

2. Abra o navegador no endereço:
   ```
   http://127.0.0.1:3000/clones/ever-lash-extension/index.html
   ```

3. Teste nos viewports:
   - **Desktop:** 1440 × 900 px
   - **Mobile:** 390 × 844 px (experimente abrir o menu hambúrguer no topo esquerdo)
