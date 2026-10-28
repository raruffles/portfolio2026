# Diretrizes de Desenvolvimento Web — Portfolio Raphael

Este repositório contém o código do portfolio profissional e cases de clientes (HTML, CSS e JavaScript puros).

## FLUXO DE DESENVOLVIMENTO OBRIGATÓRIO

Para qualquer alteração, criação ou refatoração no projeto, siga estritamente o fluxo de 6 fases:

### FASE 1 — Investigar
- Examinar a estrutura existente do projeto, HTML, CSS (`style.css`), scripts (`script.js`) e assets em `src/`.
- Consultar padrões modernos via `modern-web-guidance` antes de criar soluções manuais redundantes.
- Identificar ferramentas de validação disponíveis (Playwright MCP, Chrome DevTools).

### FASE 2 — Planejar
- Definir hierarquia de componentes e semântica HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
- Manter harmonia com a direção de arte do portfolio: tipografia refinada, paleta de cores consistente, espaçamento 8pt.
- Planejar testes e interações necessárias.

### FASE 3 — Implementar
- Escrever código limpo, semântico, performático e compatível com navegadores modernos.
- Garantir que animações e transições respeitem `prefers-reduced-motion: reduce`.
- Nunca commitar chaves de API, credenciais ou segredos (ver `.agents/rules/security-and-secrets.md`).

### FASE 4 — Executar
- Iniciar o servidor local via `npm run dev` (`npx -y http-server . -p 3000`).
- Acessar as páginas através do Playwright ou navegador headless.
- Validar viewports: Mobile (390px) e Desktop (1440px).

### FASE 5 — Revisar
- Realizar a auditoria visual com `visual-quality-assurance` ou o agente `web-design-reviewer`.
- Inspecionar console buscando erros de JavaScript ou assets não encontrados (404).
- Testar menu mobile, modais, formulários e links de contato (WhatsApp).
- Corrigir qualquer problema identificado e re-testar.

### FASE 6 — Entregar
- Resumir as alterações executadas com clareza.
- Apresentar capturas e testes executados com sucesso.
- Explicar como testar localmente.
