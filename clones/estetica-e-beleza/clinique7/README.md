# Clinique 7 — Clone Fiel da Home Page

Reconstrução autônoma, 100% local e de alta fidelidade da página inicial da **Clinique 7** ([https://clinique7.com/](https://clinique7.com/)), clínica de rinoplastia de alto padrão sediada em Montreal, Canadá (Dr. Zahi Abou Chacra).

---

## 💎 Visão Geral do Projeto

- **Localização dos Arquivos:** `clones/clinique7/`
- **URL de Origem:** `https://clinique7.com/`
- **URL Local de Execução:** `http://localhost:3000/clones/clinique7/index.html`
- **Status de Execução:** 100% autônomo, 0 erros no console do navegador, 0 dependências externas de rede.
- **Total de Assets Locais:** 121 arquivos (vídeo MP4 1080p, fontes WOFF, imagens WebP/JPG/PNG, ícones SVG, scripts e stylesheets).

---

## 🏗️ Arquitetura e Engenharia do Clone

1. **Framework & Engine:**
   - Base desenvolvida em Tilda Zero Blocks com layout adaptativo e tipografia de luxo.
   - Smooth Scroll cinematográfico via **Studio Freight Lenis** (`lenis.js`).
   - Animações e gatilhos de rolagem com **GSAP 3** e **ScrollTrigger**.
   - Carrossel interativo de casos clínicos Before & After com **ScrollBooster 3** e controles de seta.

2. **Tipografia & Design System:**
   - Família tipográfica serifada **Cormorant** (`Cormor` / `Cormorant-SemiBoldIt.woff`) renderizada localmente com fallback oficial Google Fonts.
   - Tipografia secundária refinada em `Arial, sans-serif`.
   - Paleta de cores editorial:
     - Fundo neutro quente: `#eaeaea`
     - Seções contrastantes em preto/chumbo: `#181818` e `#1f1f21`
     - Acentos de texto e botões: `#232323`, `#3c3d42`, `#1a1b1c`

3. **Mídia e Vídeo Hero:**
   - Vídeo hero original `OE9bEB0D-S30LPKak.mp4` baixado e hospedado localmente em `assets/`, integrado ao efeito de máscara rotativa com gradiente radial e autoplay suave.

---

## 📑 Seções Mapeadas e Preservadas

1. **Header Fixo & Navbar:**
   - Logotipo circular giratório com animação de entrada.
   - Menu desktop: *Dr. Chacra*, *Rhinoplasty Solutions*, *Learning Centre*, *Out Of Town*, *Contact Us*, botão *FR* e CTA *Book a consultation*.
   - Drawer mobile responsivo (`#menuopen` / `.t450`) com botão fechar e navegação completa.

2. **Hero Section (`#rec630419934`):**
   - Headings esculturais: *"Entrust your face to a rhinoplasty specialist in Montreal"* e *"BEAUTIFUL NOSES BEHIND CLOSED DOORS"*.
   - Vídeo editorial em loop perfeitamente integrado.

3. **O Que Fazemos / Especialidade (`#rec630428990`):**
   - Transição tipográfica *"Specialty as a Rhinoplasty / WHAT WE DO"*.

4. **Conheça o Dr. Zahi Abou Chacra (`#rec630435465`):**
   - Retrato editorial do especialista, bio e credenciais de excelência internacional.

5. **A Arte da Rinoplastia & Filosofia (`#rec630503658`):**
   - Seção imersiva em fundo escuro (`#181818`) destacando a filosofia estética: *"Beautiful noses are achieved through a thorough understanding of facial anatomy and balance"*.

6. **Galeria Interativa Antes & Depois (`#rec631088519` e `#rec667671212`):**
   - Casos clínicos reais com efeito de hover interativo (*"HOVER OVER PHOTOS TO SEE THE BEFORE / CLICK ON PHOTOS TO EXPAND"*).
   - Arrastador horizontal suave via ScrollBooster com navegação por setas.

7. **Acolhimento & Amor ao Rosto (`#rec630539366`):**
   - *"We love your face. Let us know how we can support you in loving yours even more"*.

8. **Experiência Boutique & Serviços (`#rec658898876` / `#rec630547094`):**
   - Grid de serviços com numeração e revelação interativa sob hover (01 ao 05).

9. **Abordagem & Processo em 7 Passos (`#rec630576135` e `#rec630580488`):**
   - Da primeira consulta ao follow-up pós-operatório aos 7 dias.

10. **Pacientes de Fora da Cidade (`#rec631044450`):**
    - Protocolo de consultas virtuais para pacientes de outras regiões.

11. **Formulário de Agendamento (`#rec631092667`):**
    - Interface de agendamento de consulta e envio de mensagem.

12. **Rodapé Completo (`#rec638094575`):**
    - Endereço da clínica: *1310 Ave. Thérèse-Lavoie-Roux, Montreal, QC. H2V 0B2*.
    - Telefones, e-mail de contato, política de privacidade e redes sociais.

---

## 📸 Evidências Visuais e Testes

Capturas de tela realizadas com navegadores reais headless nos viewports Desktop (1440x900) e Mobile (390x844):

### Desktop (1440px)
- `screenshots/local_desktop_hero.png` — Hero section com tipografia Cormorant e vídeo editorial
- `screenshots/local_desktop_drchacra.png` — Seção Meet Dr. Chacra
- `screenshots/local_desktop_philosophy.png` — Seção The Art of Rhinoplasty em dark mode
- `screenshots/local_desktop_before_after.png` — Galeria interativa Antes e Depois
- `screenshots/local_desktop_services.png` — Serviços boutique com numeração
- `screenshots/local_desktop_approach.png` — Abordagem e timeline em 7 passos
- `screenshots/local_desktop_footer.png` — Rodapé completo e informações de contato

### Mobile (390px)
- `screenshots/local_mobile_hero.png` — Adaptação responsiva fluida da seção Hero
- `screenshots/local_mobile_menu.png` — Menu gaveta mobile aberto
- `screenshots/local_mobile_before_after.png` — Galeria de antes e depois adaptada ao toque
- `screenshots/local_mobile_footer.png` — Rodapé responsivo compacto

---

## 🚀 Como Executar Localmente

No terminal, na raiz do repositório:

```bash
# Iniciar o servidor local
npm run dev

# Ou com npx http-server diretamente:
npx http-server . -p 3000
```

Abra no navegador:
```
http://localhost:3000/clones/clinique7/index.html
```
