# Manual de Entrega do Projeto — Xandy Alves Artes

**Projeto:** Xandy Alves Artes — Portfólio Profissional de Design Gráfico, Ilustração & Marketing  
**Versão:** 1.0.0  
**Stack Técnica:** React 19 + TypeScript + Vite + CSS Tokens + Lucide Icons  
**Repositório Local:** `c:\portfólio\Portfólio-site\portfólio-raphael-codado-na-mão\xandy-alves-artes`  

---

## 1. Instruções de Instalação e Execução

### Pré-requisitos
- Node.js versão 18+ (testado e homologado no Node v24.15.0).
- NPM versão 9+ (testado no NPM v11.12.1).

### Comandos de Desenvolvimento
Acesse a pasta do projeto:
```bash
cd c:\portfólio\Portfólio-site\portfólio-raphael-codado-na-mão\xandy-alves-artes
```

Instale as dependências (caso seja clonado em nova máquina):
```bash
npm install
```

Inicie o servidor de desenvolvimento local:
```bash
npm run dev
```
O servidor estará acessível em `http://localhost:5173/`.

### Geração da Versão de Produção (Build)
```bash
npm run build
```
Os arquivos otimizados e prontos para publicação são gerados no diretório `dist/`.

Para testar a versão compilada de produção localmente:
```bash
npm run preview
```

---

## 2. Arquitetura de Componentes e Código Organizado

```
xandy-alves-artes/
├── public/
│   └── favicon.svg              # Símbolo autoral vetorial
├── src/
│   ├── components/
│   │   ├── KineticRoll.tsx      # Microinteração de roll-over vertical por caractere
│   │   ├── KineticRoll.css
│   │   ├── Navbar.tsx           # Cabeçalho fixo com status e links cinéticos
│   │   ├── Navbar.css
│   │   ├── ShowcaseStage.tsx    # Estágio de tela cheia (full-viewport snap scroll)
│   │   ├── ShowcaseStage.css
│   │   ├── PortfolioGrid.tsx    # Grade completa com filtros por categoria e busca
│   │   ├── PortfolioGrid.css
│   │   ├── ProjectDetailModal.tsx # Modal com ficha técnica, narrativa e galeria
│   │   ├── ProjectDetailModal.css
│   │   ├── ServicesSection.tsx  # Seção comercial com escopo e botão WhatsApp
│   │   ├── ServicesSection.css
│   │   ├── AboutSection.tsx     # Manifesto editorial, pilares 01-04 e ferramentas
│   │   ├── AboutSection.css
│   │   ├── ContactSection.tsx   # Painel de atendimento e formulário de briefing
│   │   ├── ContactSection.css
│   │   ├── Footer.tsx           # Rodapé minimalista com botão voltar ao topo
│   │   └── Footer.css
│   ├── data/
│   │   ├── portfolioData.ts     # Dados dos projetos, categorias e metadados
│   │   ├── servicesData.ts      # Dados dos serviços comerciais e mensagens
│   │   └── profileData.ts       # Contatos, manifesto e ferramentas
│   ├── styles/
│   │   ├── tokens.css           # Design tokens (cores, fontes, espaçamentos, clamps)
│   │   └── global.css           # Reset global, acessibilidade e scrollbars
│   ├── App.tsx                  # Componente raiz com orquestração de visualizações
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html                   # Metadados SEO e importação de fontes Google
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Guia de Personalização de Conteúdo

O projeto foi inteiramente desacoplado para que **textos, fotos, contatos e projetos possam ser atualizados sem encostar no código dos componentes**:

### 3.1. Como Atualizar os Dados de Contato e Perfil
Abra o arquivo [`src/data/profileData.ts`](file:///c:/portf%C3%B3lio/Portf%C3%B3lio-site/portf%C3%B3lio-raphael-codado-na-m%C3%A3o/xandy-alves-artes/src/data/profileData.ts):
- Altere `whatsappNumber` com o número com DDI e DDD (ex: `5511987654321`).
- Altere `email` para o e-mail oficial.
- Atualize os links de `instagram`, `behance` e `linkedin`.

### 3.2. Como Adicionar ou Alterar Projetos do Portfólio
Abra o arquivo [`src/data/portfolioData.ts`](file:///c:/portf%C3%B3lio/Portf%C3%B3lio-site/portf%C3%B3lio-raphael-codado-na-m%C3%A3o/xandy-alves-artes/src/data/portfolioData.ts):
- Para cada novo trabalho, adicione um objeto na lista `PROJECTS` informando:
  - `title`, `client`, `category`, `year`, `coverImage`, `gallery`, `summary`, `objective`, `process`, `result`, `tools` e `deliverables`.

### 3.3. Como Ajustar Serviços e Pacotes Comerciais
Abra o arquivo [`src/data/servicesData.ts`](file:///c:/portf%C3%B3lio/Portf%C3%B3lio-site/portf%C3%B3lio-raphael-codado-na-m%C3%A3o/xandy-alves-artes/src/data/servicesData.ts):
- Edite os itens da lista `SERVICES`, alterando escopo, entregáveis e a mensagem pré-formatada do WhatsApp.

---

## 4. Materiais que Ainda Precisam ser Fornecidos por Xandy Alves
Conforme acordado na auditoria, o site está operando com placeholders de altíssima fidelidade. Para a publicação definitiva, o profissional deve fornecer:
1. **Logotipo / Símbolo Oficial:** Se houver vetor em SVG ou manual de marca pré-existente (caso contrário, a identidade tipográfica autoral criada no site já está pronta).
2. **Imagens Reais dos Projetos:** Arquivos de alta resolução das identidades visuais, pranchas gráficas, ilustrações originais e peças publicitárias produzidas por Xandy.
3. **Telefone Oficial de WhatsApp:** Número corporativo para o qual os botões devem direcionar os orçamentos.
4. **Links de Redes Sociais:** URLs reais do Instagram e Behance do profissional.

---

## 5. Limitações Conhecidas & Boas Práticas
- **Imagens Externas (Placeholders):** As imagens demonstrativas estão hospedadas no Unsplash. Ao substituir pelas artes finais de Xandy, recomenda-se salvar os arquivos na pasta `public/projects/` no formato WebP comprimido (peso ideal: 200KB a 600KB por prancha).
- **Publicação:** Por determinação da regra de projeto, o site **NÃO** foi publicado em domínio externo ou hospedagem pública, aguardando aprovação explícita e fornecimento dos dados reais.
