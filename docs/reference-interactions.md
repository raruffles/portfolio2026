# Análise de Interações e Dinâmica da Referência

Engenharia reversa das microinterações, lógicas de animação e modelos comportamentais observados em **EAST 64 Films**, com diretrizes para implementação no projeto **Xandy Alves Artes**.

---

## 1. O Modelo de Interação da Página Inicial: Snap Scroll & Parallax Stage

Diferente de websites convencionais onde o usuário rola livremente pela barra vertical, a Home da referência opera como uma aplicação de estágio único em tela cheia (`100vh`). O código extraído de `main.js` revela a função `initWorksScroll`, cujos princípios fundamentais foram mapeados:

### 1.1. Controle de Roda do Mouse (Wheel Inertia & Snap)
- **Constantes Utilizadas:**
  - `WHEEL_MIN_DELTA`: Limiar mínimo de deslocamento para ignorar tremores sutis de trackpads.
  - `WHEEL_DECAY_WINDOW`: Janela temporal de análise de decaimento para detectar o início de um novo gesto deliberado vs. inércia residual.
  - `WHEEL_MIN_INTERVAL`: Intervalo mínimo entre avanços de item para impedir pulo descontrolado de múltiplos slides em um único toque rápido.
- **Lógica de Cálculo:**
  ```javascript
  const dir = e.deltaY > 0 ? 1 : -1;
  target = clamp(Math.round(target / ROW_H) * ROW_H + dir * ROW_H);
  ```
  O deslocamento do usuário é quantizado na altura exata de uma linha (`ROW_H`), garantindo que o slider sempre pare perfeitamente alinhado a um projeto.

### 1.2. Gestos de Toque em Dispositivos Móveis (Touch Swipe)
- **Constantes e Deadzones:**
  - `SWIPE_THRESHOLD = 16px`: Distância mínima de arraste vertical para validar uma transição de projeto.
  - `TOUCH_DEADZONE = 6px`: Zona morta inicial para evitar disparos acidentais ao encostar a ponta do dedo.
- **Elasticidade Tátil:**
  Durante o movimento (`touchmove`), o estágio aplica uma resistência proporcional (`eff * 0.5`), permitindo que o usuário sinta visualmente a resposta física do arraste antes de soltar o dedo.

### 1.3. Acessibilidade via Teclado
- `ArrowDown`: Avança para o próximo projeto (`target + ROW_H`).
- `ArrowUp`: Retorna para o projeto anterior (`target - ROW_H`).
- `Enter`: Abre a página detalhada do projeto ativo (`openDetail(active)`).

---

## 2. Tipografia Cinética e Microinterações de Texto

### 2.1. Roll-Over de Caracteres na Navegação (`.c-button-decorate`)
Cada link com texto dinâmico é decomposto em spans individuais por caractere com duas cópias verticais:
```html
<span class="c-button-decorate__char">
  <span class="c-button-decorate__char-inner">
    <span class="c-button-decorate__char-item">W</span>
    <span class="c-button-decorate__char-item">W</span>
  </span>
</span>
```
- No estado de repouso, `transform: translateY(0%)`.
- No estado de foco ou hover, `transform: translateY(-50%)` com curva `cubic-bezier(0.65, 0, 0.35, 1)`.
- O efeito cria a sensação tátil de um painel de aeroporto ou letreiro mecânico analógico de altíssima precisão.

### 2.2. Entrada em Onda do Título de Projeto (Caption Wave Stagger)
- Quando um novo projeto se torna ativo (`setActive(i)`), o título em letras gigantes no rodapé é renderizado em caracteres individuais (`.p-works__char-inner`).
- O script dispara uma animação via GSAP:
  - `CAP_IN_DUR = 0.4s` (duração da animação por caractere).
  - `CAP_IN_WAVE = 0.4s` (distribuição escalonada / stagger ao longo de toda a palavra).
  - Curva de aceleração suave que eleva cada caractere da base para a linha d'água com fade-in.

---

## 3. Comportamento Visual de Mídia e Parallax

- **Track Contínuo:** Todas as mídias ficam organizadas em um contêiner virtual `.p-works__preview-track`.
- **Posicionamento e Parallax:**
  - Cada mídia é posicionada com `top: calc(i * (100% + GAP_R * 100%))`.
  - Conforme o usuário avança a transição, a camada de fundo e a camada de primeiro plano se movem em velocidades ligeiramente dessincronizadas (`PARALLAX_INNER = 1`, `PARALLAX_INNER_CURVE = 1.8`).
- **Dimming de Inativos:** Itens não selecionados na lista de projetos perdem saturação e opacidade, garantindo que os olhos do visitante foquem imediatamente no item corrente.

---

## 4. Transições entre Páginas (Page Lifecycle)

- A referência utiliza um contêiner `#swup` com classes de estado:
  - `is-animating`: Reduz a opacidade da página anterior e congela a rolagem.
  - `is-leaving`: Desloca suavemente os elementos de cabeçalho e corpo.
  - `is-rendering`: Substitui o DOM sem recarregar scripts globais ou o cabeçalho fixo.
  - `is-entered`: Revela a nova página com transição fade-in de 300ms a 400ms.
- **Resultado:** A navegação parece um aplicativo nativo ultrarrápido, sem o "flicker" de tela branca característico de páginas tradicionais.

---

## 5. Conformidade com Acessibilidade e Movimento Reduzido

A referência respeita a diretiva do sistema operacional do usuário:
```javascript
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  // Desativa interpolações inerciais, aplicando atualização imediata (target = current)
  // Substitui a animação de onda nos caracteres por renderização direta de texto
}
```

---

## 6. Recomendações de Engenharia para Xandy Alves Artes

Para o novo site em **React + TypeScript + Vite**, recomendamos:
1. **Framer Motion ou GSAP leve:** Utilizar Framer Motion para transições de páginas e estados de hover dos componentes, garantindo código limpo, declarativo e de fácil manutenção.
2. **Componente Reutilizável `KineticText`:** Criar um componente isolado que aplique o efeito roll-over de caracteres sem redundância manual de código.
3. **Modo Duplo de Apresentação:**
   - **Modo Showcase (Página Inicial):** Experiência imersiva inspirada na referência, permitindo ao visitante navegar rapidamente pelos melhores cases com riqueza visual.
   - **Modo Grid (Página Portfólio):** Apresentação completa e escaneável para diretores de arte e clientes que desejam ver muitos trabalhos em poucos segundos.
4. **Respeito a `prefers-reduced-motion`:** Manter a regra estrita de fallback instantâneo sem animações para usuários sensíveis.
