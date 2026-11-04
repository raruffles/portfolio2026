const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)');
const indexPath = path.join(TARGET_DIR, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

const hookScript = `
<script>
  // Form WhatsApp Redirection
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('[data-booking-form]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const selected = form.querySelector('input[name="treatment"]:checked');
        const treatmentLabel = selected ? (selected.closest('.booking-treatment-card') ? selected.closest('.booking-treatment-card').innerText.trim() : selected.value) : 'Lentes em Resina';
        const nameInput = form.querySelector('input[name="name"], input[placeholder*="Nome"]');
        const name = nameInput && nameInput.value ? nameInput.value.trim() : '';
        const greeting = name ? ('Olá Dra. Adrieli, me chamo ' + name + '!') : 'Olá Dra. Adrieli!';
        const msg = encodeURIComponent(greeting + ' Gostaria de agendar uma consulta sobre ' + treatmentLabel + '.');
        window.open('https://wa.me/5519981963061?text=' + msg, '_blank');
      });
    }
  });
</script>
`;

html = html.replace('</body>', `${hookScript}\n</body>`);
fs.writeFileSync(indexPath, html);
console.log('Added WhatsApp form submit hook!');
