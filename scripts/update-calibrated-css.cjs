const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const updatedCSS = `
<style id="custom-fixes-dr-ricardo">
/* =========================================================
   1. HERO QUEBRAS & ALIGNMENTS (rec630419934)
   ========================================================= */
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
#rec638094189 .tn-elem[data-elem-id="1701687580069"] {
  display: none !important;
}
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
   3. DOCTOR CREDENTIALS SPACING (rec630435465)
   ========================================================= */
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

@media screen and (max-width: 959px) {
  #rec630435465 .tn-elem[data-elem-id="1692620175875"],
  #rec630435465 .tn-elem[data-elem-id="1692620175878"],
  #rec630435465 .tn-elem[data-elem-id="1692620175880"] {
    white-space: normal !important;
  }
}

/* =========================================================
   4. SECTION rec630539366 TITLE OVERLAP FIX ("Cuidamos da sua Autoestima")
   ========================================================= */
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
   5. LIGHTWEIGHT 60FPS ANIMATIONS & INSTANT VISIBILITY
   ========================================================= */
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
   6. FLOATING WHATSAPP BUTTON
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

html = html.replace(/<style id="custom-fixes-dr-ricardo">[\s\S]*?<\/style>/i, updatedCSS.trim());
fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('✓ Calibrated CSS updated successfully!');
