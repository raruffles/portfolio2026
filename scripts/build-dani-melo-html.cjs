const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'clones', 'arquitetura', 'decor-dani-melo');
let html = fs.readFileSync(path.join(targetDir, 'rendered.html'), 'utf8');

// 1. Remove Next.js hydration script tags and bundles that try to contact /_next/
// Keep the DOM structure, CSS link, favicon, and fonts
html = html.replace(/<script[\s\S]*?<\/script>/gi, (match) => {
  // If it's a JSON-LD structured data or analytics we might keep or remove,
  // but remove Next.js static chunk scripts
  if (match.includes('_next/static/chunks')) return '';
  if (match.includes('self.__next_f')) return '';
  return match;
});

// 2. Fix absolute paths to relative paths
html = html.replaceAll('href="/_next/', 'href="_next/');
html = html.replaceAll('src="/_next/', 'src="_next/');
html = html.replaceAll('href="/images/', 'href="images/');
html = html.replaceAll('src="/images/', 'src="images/');
html = html.replaceAll('href="/favicon.svg"', 'href="favicon.svg"');
html = html.replaceAll('src="/favicon.svg"', 'src="favicon.svg"');

// 3. Add meta robots noindex
if (!html.includes('robots')) {
  html = html.replace('<head>', '<head><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"/>');
}

// 4. Add the lightweight vanilla JS script for interactivity (mobile menu toggle & smooth scroll)
const clientScript = `
<script>
  (function() {
    const btn = document.querySelector('.menu-button');
    const nav = document.querySelector('.site-header nav');
    if (btn && nav) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = nav.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      // Close on clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('nav-open')) {
          nav.classList.remove('nav-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
      // Close on clicking any link inside nav
      nav.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          nav.classList.remove('nav-open');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  })();
</script>
`;

html = html.replace('</body>', `${clientScript}</body>`);

// Write index.html
fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
console.log('Successfully created clones/arquitetura/decor-dani-melo/index.html! Length:', html.length);
