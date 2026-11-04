const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const responsiveMasterCSS = `
<style id="custom-fixes-dr-ricardo">
/* =========================================================
   1. DESKTOP STYLES (min-width: 960px)
   ========================================================= */
@media screen and (min-width: 960px) {
  /* HERO (rec630419934) */
  #rec630419934 .tn-elem[data-elem-id="1692618174845"] {
    top: 405px !important;
    left: 182px !important;
    width: 624px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174841"] {
    top: 518px !important;
    left: 51px !important;
    width: 580px !important;
    white-space: nowrap !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174831"] {
    top: 575px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174828"] {
    top: 592px !important;
    width: 440px !important;
    left: calc(100% - 440px + -20px) !important;
    white-space: nowrap !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174824"] {
    top: 685px !important;
    width: 520px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174847"] {
    top: 290px !important;
    width: 340px !important;
  }

  /* MISSION (rec630428990) */
  #rec630428990 .t396__artboard {
    height: 940px !important;
  }
  #rec630428990 .tn-elem[data-elem-id="1692621943726"] {
    top: 730px !important;
    width: 640px !important;
    left: calc(50% - 320px) !important;
  }

  /* DOCTOR (rec630435465) */
  #rec630435465 .t396__artboard {
    height: 550px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175875"] {
    top: 190px !important;
    left: calc(50% - 600px + 83px) !important;
    width: 780px !important;
    white-space: nowrap !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175878"] {
    top: 255px !important;
    left: calc(50% - 600px + 459px) !important;
    width: 550px !important;
    white-space: nowrap !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175880"] {
    top: 325px !important;
    left: calc(50% - 600px + 198px) !important;
    width: 750px !important;
    white-space: nowrap !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175861"] {
    top: 418px !important;
  }

  /* FORM SECTION (rec630539366) */
  #rec630539366 .tn-elem[data-elem-id="1692631697352"] {
    top: 65px !important;
    left: calc(50% - 600px + 630px) !important;
    width: 550px !important;
    white-space: nowrap !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697348"] {
    top: 150px !important;
    left: calc(50% - 600px + 630px) !important;
    width: 450px !important;
    white-space: nowrap !important;
  }

  /* STEPS SECTION (rec630580488) */
  #rec630580488 .tn-elem[data-elem-id="1692638917591"] {
    top: 1010px !important;
  }
  #rec630580488 .tn-elem[data-elem-id="1692638917565"] {
    top: 945px !important;
  }
  #rec630580488 .tn-elem[data-elem-id="1692638917542"] {
    top: 930px !important;
  }
}

/* =========================================================
   2. MOBILE & TABLET STYLES (max-width: 959px)
   ========================================================= */
@media screen and (max-width: 959px) {
  /* HERO (rec630419934) on Mobile */
  #rec630419934 .t396__artboard {
    height: 580px !important;
    overflow: hidden !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174847"] {
    top: 90px !important;
    left: 20px !important;
    width: 280px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174845"] {
    top: 150px !important;
    left: 20px !important;
    width: 320px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174845"] .tn-atom {
    font-size: 38px !important;
    line-height: 1.1 !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174841"] {
    top: 195px !important;
    left: 20px !important;
    width: 320px !important;
    white-space: nowrap !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174841"] .tn-atom {
    font-size: 38px !important;
    line-height: 1.1 !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174831"] {
    top: 240px !important;
    left: 20px !important;
    width: 240px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174831"] .tn-atom {
    font-size: 48px !important;
    line-height: 1 !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174828"] {
    top: 246px !important;
    left: 175px !important;
    width: 180px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174828"] .tn-atom {
    font-size: 38px !important;
    line-height: 1 !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692781991743"] {
    top: 310px !important;
    left: 20px !important;
  }
  #rec630419934 .tn-elem[data-elem-id="1692618174824"] {
    top: 375px !important;
    left: 20px !important;
    width: 340px !important;
  }

  /* MISSION (rec630428990) on Mobile */
  #rec630428990 .t396__artboard {
    height: 700px !important;
  }
  #rec630428990 .tn-elem[data-elem-id="1692621943726"] {
    top: 480px !important;
    left: 20px !important;
    width: calc(100% - 40px) !important;
    text-align: center !important;
  }

  /* DOCTOR (rec630435465) on Mobile */
  #rec630435465 .t396__artboard {
    height: 620px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175865"] {
    top: 20px !important;
    left: calc(50% - 90px) !important;
    width: 180px !important;
    height: 140px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175871"] {
    display: none !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175875"] {
    top: 180px !important;
    left: 15px !important;
    width: calc(100% - 30px) !important;
    text-align: center !important;
    white-space: normal !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175875"] .tn-atom {
    font-size: 26px !important;
    letter-spacing: -0.5px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175878"] {
    top: 220px !important;
    left: 15px !important;
    width: calc(100% - 30px) !important;
    text-align: center !important;
    white-space: normal !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175878"] .tn-atom {
    font-size: 34px !important;
    letter-spacing: -1px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175880"] {
    top: 265px !important;
    left: 15px !important;
    width: calc(100% - 30px) !important;
    text-align: center !important;
    white-space: normal !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175880"] .tn-atom {
    font-size: 24px !important;
    letter-spacing: -0.5px !important;
  }
  #rec630435465 .tn-elem[data-elem-id="1692620175861"] {
    top: 330px !important;
    left: calc(50% - 110px) !important;
  }

  /* FORM SECTION (rec630539366) on Mobile */
  #rec630539366 .t396__artboard {
    height: 1260px !important;
    overflow: hidden !important;
  }
  /* Clinic photo shape on top */
  #rec630539366 .tn-elem[data-elem-id="1692631697355"] {
    top: 20px !important;
    left: 15px !important;
    width: calc(100% - 30px) !important;
    height: 240px !important;
    border-radius: 20px !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697355"] .tn-atom {
    border-radius: 20px !important;
    background-size: cover !important;
  }
  /* White card background below photo */
  #rec630539366 .tn-elem[data-elem-id="1692631697159"] {
    top: 280px !important;
    left: 12px !important;
    width: calc(100% - 24px) !important;
    height: 950px !important;
    border-radius: 20px !important;
    background-color: #fcfcfc !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697159"] .tn-atom {
    border-radius: 20px !important;
  }
  /* Title "Cuidamos da sua" */
  #rec630539366 .tn-elem[data-elem-id="1692631697352"] {
    top: 305px !important;
    left: 20px !important;
    width: calc(100% - 40px) !important;
    text-align: center !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697352"] .tn-atom {
    font-size: 34px !important;
    line-height: 1.1 !important;
  }
  /* "Autoestima" */
  #rec630539366 .tn-elem[data-elem-id="1692631697348"] {
    top: 348px !important;
    left: 20px !important;
    width: calc(100% - 40px) !important;
    text-align: center !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697348"] .tn-atom {
    font-size: 44px !important;
    line-height: 1 !important;
  }
  /* Subtext */
  #rec630539366 .tn-elem[data-elem-id="1692631697346"] {
    top: 405px !important;
    left: 25px !important;
    width: calc(100% - 50px) !important;
    text-align: center !important;
    display: block !important;
  }
  #rec630539366 .tn-elem[data-elem-id="1692631697346"] .tn-atom {
    font-size: 14px !important;
    line-height: 1.4 !important;
    color: #444444 !important;
  }
  /* Form Inputs Container */
  #rec630539366 .tn-elem[data-elem-id="1692631764064"] {
    top: 480px !important;
    left: 24px !important;
    width: calc(100% - 48px) !important;
    display: block !important;
  }
}

/* =========================================================
   3. GLOBAL COMMON FIXES
   ========================================================= */
/* Navbar fixes */
#rec638094189 .tn-elem[data-elem-id="1701687580069"] {
  display: none !important;
}
#rec638094189 .tn-elem[data-elem-id="1692618174895"] .tn-atom {
  background-size: contain !important;
  background-position: center left !important;
}

/* LIGHTWEIGHT 60FPS ANIMATIONS (Instant visibility, 0 heavy lag) */
.t-animate, 
.tn-elem.t-animate,
.t-animate[data-animate-style],
.t396__elem--anim-hidden {
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  will-change: auto !important;
}
.t-animate_started {
  opacity: 1 !important;
  transform: none !important;
  transition: opacity 0.3s ease-out !important;
}

/* =========================================================
   4. FLOATING WHATSAPP BUTTON
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

html = html.replace(/<style id="custom-fixes-dr-ricardo">[\s\S]*?<\/style>/i, responsiveMasterCSS.trim());
fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('✓ Updated master CSS with calibrated step descriptions!');
