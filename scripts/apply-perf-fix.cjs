const fs = require('fs');

let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

console.log('Original html length:', html.length);

// 1. PERFORMANCE FIX: Replace rec632254742 slow script
// We replace the character-splitting and unthrottled getBoundingClientRect loop
const oldScript = html.substring(html.indexOf('id="rec632254742"'), html.indexOf('<!-- nominify end -->', html.indexOf('id="rec632254742"')) + 21);
console.log('Found rec632254742 snippet length:', oldScript.length);

const cleanScript = `id="rec632254742" class="r t-rec" style=" " data-animationappear="off" data-record-type="131"> <!-- T123 --> <div class="t123"> <div class="t-container_100 "> <div class="t-width t-width_100 "> <!-- nominify begin -->
<style>
.highlight-v1 .tn-atom, .text-highlight-v1 {
  opacity: 1 !important;
  transition: opacity 0.4s ease;
}
</style>
<script src='assets/gsap.min.js'></script>
<script src='assets/ScrollTrigger.min.js'></script>
<script src='assets/lenis.js'></script>
<script>
// High-performance smooth scrolling with 60fps budget
try {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch (e) {
  console.log('Lenis init smooth fallback');
}
</script> <!-- nominify end -->`;

if (html.includes('id="rec632254742"')) {
  html = html.replace(oldScript, cleanScript);
  console.log('SUCCESS: Performance script replaced with high-fps clean Lenis');
} else {
  console.error('ERROR: Could not find rec632254742');
}

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('Saved performance fix.');
