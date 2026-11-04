const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

console.log('--- Applying Precise Fixes to Dr. Ricardo Site ---');

// 1. NAVBAR FIXES (rec638094189)
// Swap spinning circular logo to Dr. Ricardo's official logo
html = html.replace(
  /assets\/a6821bdf-fc7f-40c7-b\.png/g,
  'assets/logo-dr-ricardo-menu.png'
);

// 2. FORM TRANSLATIONS IN rec630539366, rec631092667, rec642101398
const translatedFormJSON1 = JSON.stringify([
  {
    "lid": "1531306243545",
    "ls": "10",
    "loff": "",
    "li_type": "nm",
    "li_ph": "Nome completo",
    "li_req": "y",
    "li_nm": "Nome"
  },
  {
    "lid": "1531306540094",
    "ls": "20",
    "loff": "",
    "li_type": "ph",
    "li_ph": "Telefone / WhatsApp com DDD",
    "li_req": "y",
    "li_nm": "Telefone"
  },
  {
    "lid": "1692631841236",
    "ls": "30",
    "loff": "",
    "li_type": "em",
    "li_ph": "Seu melhor e-mail",
    "li_req": "y",
    "li_nm": "Email"
  },
  {
    "lid": "1692631866450",
    "ls": "40",
    "loff": "",
    "li_type": "rd",
    "li_title": "Qual cirurgia ou procedimento você tem interesse?",
    "li_variants": "Prótese de Mama R24R\nRinoplastia Estruturada\nBlefaroplastia / Facial\nMastopexia / Mamoplastia\nContorno Corporal / Mini Lipo a Laser\nOutro procedimento",
    "li_radcb": "rb",
    "li_nm": "Procedimento de Interesse"
  },
  {
    "lid": "1692631945162",
    "ls": "50",
    "loff": "",
    "li_type": "cb",
    "li_req": "y",
    "li_label": "Concordo com o tratamento dos dados conforme a LGPD",
    "li_nm": "Termos"
  }
]);

const translatedFormJSON2 = JSON.stringify([
  {
    "lid": "1692961953409",
    "ls": "10",
    "loff": "",
    "li_type": "nm",
    "li_ph": "Nome completo",
    "li_req": "y",
    "li_nm": "Nome"
  },
  {
    "lid": "1692961953410",
    "ls": "20",
    "loff": "",
    "li_type": "ph",
    "li_ph": "Telefone / WhatsApp com DDD",
    "li_req": "y",
    "li_nm": "Telefone"
  },
  {
    "lid": "1692961953411",
    "ls": "30",
    "loff": "",
    "li_type": "em",
    "li_ph": "Seu melhor e-mail",
    "li_req": "y",
    "li_nm": "Email"
  },
  {
    "lid": "1692961953412",
    "ls": "40",
    "loff": "",
    "li_type": "rd",
    "li_title": "Qual cirurgia ou procedimento você tem interesse?",
    "li_variants": "Prótese de Mama R24R\nRinoplastia Estruturada\nBlefaroplastia / Facial\nMastopexia / Mamoplastia\nContorno Corporal / Mini Lipo a Laser\nOutro procedimento",
    "li_radcb": "rb",
    "li_nm": "Procedimento de Interesse"
  },
  {
    "lid": "1692961953413",
    "ls": "50",
    "loff": "",
    "li_type": "cb",
    "li_req": "y",
    "li_label": "Concordo com o tratamento dos dados conforme a LGPD",
    "li_nm": "Termos"
  }
]);

// Replace form 1 in rec630539366
html = html.replace(
  /<textarea class="tn-atom__inputs-textarea">\[\{"lid":"1531306243545"[\s\S]*?<\/textarea>/i,
  `<textarea class="tn-atom__inputs-textarea">${translatedFormJSON1}</textarea>`
);

// Replace form 2 and 3 in rec631092667 and rec642101398 using global regex matching English text
html = html.replace(
  /<textarea class="tn-atom__inputs-textarea">\[\{"lid":"1692961953409"[\s\S]*?Full name[\s\S]*?<\/textarea>/g,
  `<textarea class="tn-atom__inputs-textarea">${translatedFormJSON2}</textarea>`
);

console.log('✓ Forms translated');

// 3. MASTER CSS FIXES BLOCK (Inject in <head> for zero-break layout, 60fps animations, and WhatsApp button)
const masterCSS = `
<style id="custom-fixes-dr-ricardo">
/* =========================================================
   1. HERO QUEBRAS & ALIGNMENTS (rec630419934)
   ========================================================= */
/* Ensure "a arte da" fits on a single line without breaking "da" */
#rec630419934 .tn-elem[data-elem-id="1692618174841"] {
  width: 580px !important;
  white-space: nowrap !important;
}
/* Ensure "Natural" is not clipped on the right edge */
#rec630419934 .tn-elem[data-elem-id="1692618174828"] {
  width: 440px !important;
  left: calc(100% - 440px + -20px) !important;
  white-space: nowrap !important;
}
/* Subtitle width expansion */
#rec630419934 .tn-elem[data-elem-id="1692618174824"] {
  width: 480px !important;
}
/* Top badge width expansion */
#rec630419934 .tn-elem[data-elem-id="1692618174847"] {
  width: 320px !important;
}
/* Hide the disconnected "SP" button in navbar */
#rec638094189 .tn-elem[data-elem-id="1701687580069"] {
  display: none !important;
}
/* Navbar logo sizing */
#rec638094189 .tn-elem[data-elem-id="1692618174895"] .tn-atom {
  background-size: contain !important;
  background-position: center left !important;
}

/* =========================================================
   2. MISSION SECTION CUTOFF FIX (rec630428990)
   ========================================================= */
#rec630428990 .t396__artboard {
  height: 940px !important;
}
#rec630428990 .tn-elem[data-elem-id="1692621943726"] {
  top: 730px !important;
  width: 640px !important;
  left: calc(50% - 320px) !important;
}

/* =========================================================
   3. SECTION rec630539366 TITLE OVERLAP FIX ("Cuidamos da sua Autoestima")
   ========================================================= */
/* Line 1: Cuidamos da sua */
#rec630539366 .tn-elem[data-elem-id="1692631697352"] {
  top: 48px !important;
  left: calc(50% - 600px + 630px) !important;
  width: 550px !important;
  white-space: nowrap !important;
}
/* Line 2: Autoestima (stacked cleanly below Line 1) */
#rec630539366 .tn-elem[data-elem-id="1692631697348"] {
  top: 132px !important;
  left: calc(50% - 600px + 630px) !important;
  width: 450px !important;
  white-space: nowrap !important;
}
@media screen and (max-width: 959px) {
  #rec630539366 .tn-elem[data-elem-id="1692631697352"] {
    top: 740px !important;
    left: calc(50% - 320px + 40px) !important;
    width: 90% !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697348"] {
    top: 820px !important;
    left: calc(50% - 320px + 40px) !important;
    width: 90% !important;
  }
}

/* =========================================================
   4. LIGHTWEIGHT 60FPS ANIMATIONS (Removes sluggishness)
   ========================================================= */
.t-animate, 
.t-animate[data-animate-style],
.tn-elem[data-animate-sbs-event] {
  will-change: transform, opacity !important;
  transform: translate3d(0, 0, 0) !important;
  backface-visibility: hidden !important;
  perspective: 1000px !important;
}
.t-animate_started {
  transition-duration: 0.5s !important;
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important;
}
@media (prefers-reduced-motion: reduce) {
  .t-animate, .t-animate[data-animate-style] {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* =========================================================
   5. FLOATING WHATSAPP BUTTON
   ========================================================= */
.floating-whatsapp-container {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999999;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-family: Arial, sans-serif;
}
.floating-whatsapp-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  cursor: pointer;
  animation: wa-pulse 2.4s infinite;
}
.floating-whatsapp-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
}
.floating-whatsapp-btn svg {
  width: 34px;
  height: 34px;
  fill: #ffffff;
}
.floating-whatsapp-badge {
  background: #ffffff;
  color: #1a1b1c;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
@keyframes wa-pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 8px 24px rgba(37, 211, 102, 0.45); }
  70% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.45); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.45); }
}
@media screen and (max-width: 639px) {
  .floating-whatsapp-badge {
    display: none;
  }
  .floating-whatsapp-container {
    bottom: 20px;
    right: 20px;
  }
  .floating-whatsapp-btn {
    width: 54px;
    height: 54px;
  }
  .floating-whatsapp-btn svg {
    width: 30px;
    height: 30px;
  }
}
</style>
`;

// Inject Master CSS right before </head>
if (!html.includes('id="custom-fixes-dr-ricardo"')) {
  html = html.replace('</head>', `${masterCSS}\n</head>`);
  console.log('✓ Master CSS injected into <head>');
} else {
  html = html.replace(/<style id="custom-fixes-dr-ricardo">[\s\S]*?<\/style>/i, masterCSS.trim());
  console.log('✓ Master CSS updated in <head>');
}

// 4. INJECT FLOATING WHATSAPP BUTTON (right before </body>)
const waHTML = `
<!-- Botão Flutuante Oficial do WhatsApp Dr. Ricardo Andrade -->
<a href="https://api.whatsapp.com/send?phone=5519989280809&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Ricardo%20Andrade" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="floating-whatsapp-container" 
   aria-label="Agendar consulta via WhatsApp com Dr. Ricardo Andrade">
  <div class="floating-whatsapp-badge">Fale no WhatsApp</div>
  <div class="floating-whatsapp-btn">
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C8.268 2 2 8.268 2 16C2 18.528 2.668 20.898 3.834 22.952L2.086 29.336L8.648 27.616C10.826 28.948 13.328 29.714 16 29.714C23.732 29.714 30 23.446 30 15.714C30 7.982 23.732 2 16 2ZM16 27.242C13.626 27.242 11.416 26.544 9.532 25.334L9.086 25.048L5.184 26.072L6.228 22.264L5.914 21.764C4.606 19.684 3.914 17.262 3.914 15.714C3.914 9.324 9.61 4.128 16 4.128C22.39 4.128 28.086 9.324 28.086 15.714C28.086 22.104 22.39 27.242 16 27.242ZM22.56 19.162C22.2 18.982 20.428 18.11 20.098 17.99C19.768 17.87 19.528 17.81 19.288 18.17C19.048 18.53 18.358 19.34 18.148 19.58C17.938 19.82 17.728 19.85 17.368 19.67C17.008 19.49 15.848 19.11 14.472 17.884C13.398 16.928 12.672 15.748 12.462 15.388C12.252 15.028 12.44 14.834 12.62 14.656C12.782 14.496 12.982 14.234 13.162 14.024C13.342 13.814 13.402 13.664 13.522 13.424C13.642 13.184 13.582 12.974 13.492 12.794C13.402 12.614 12.682 10.844 12.382 10.124C12.09 9.424 11.794 9.52 11.572 9.51L10.882 9.5C10.642 9.5 10.252 9.59 9.922 9.95C9.592 10.31 8.662 11.18 8.662 12.95C8.662 14.72 9.952 16.43 10.132 16.67C10.312 16.91 12.672 20.55 16.292 22.11C17.154 22.482 17.828 22.704 18.354 22.872C19.22 23.148 20.008 23.108 20.632 23.016C21.328 22.912 22.774 22.14 23.074 21.298C23.374 20.456 23.374 19.736 23.284 19.586C23.194 19.436 22.92 19.342 22.56 19.162Z" fill="white"/>
    </svg>
  </div>
</a>
`;

if (!html.includes('class="floating-whatsapp-container"')) {
  html = html.replace('</body>', `${waHTML}\n</body>`);
  console.log('✓ Floating WhatsApp button injected before </body>');
}

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('ALL FIXES SAVED TO index.html!');
