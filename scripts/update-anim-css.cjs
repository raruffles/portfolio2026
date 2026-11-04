const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// Replace the animation section in custom-fixes-dr-ricardo style block
const oldAnimCSS = `/* =========================================================
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
}`;

const newAnimCSS = `/* =========================================================
   4. LIGHTWEIGHT 60FPS ANIMATIONS (Removes sluggishness & ensures 100% instant visibility)
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
  transition: opacity 0.4s ease-out !important;
}`;

html = html.replace(oldAnimCSS, newAnimCSS);
fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('✓ Instant visibility and lightweight CSS applied!');
