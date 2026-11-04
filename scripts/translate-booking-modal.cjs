const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)');
const indexPath = path.join(TARGET_DIR, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// Replace Step labels
html = html.replace('<div class="booking-step__label">Service</div>', '<div class="booking-step__label">Procedimento</div>');
html = html.replace('<div class="booking-step__label">Contact details</div>', '<div class="booking-step__label">Seus Dados</div>');
html = html.replace('<div class="booking-step__label">Confirmation</div>', '<div class="booking-step__label">Confirmação</div>');

// Modal Title
html = html.replace(
  /<h1 data-modal-anim="title" class="booking-form__title">Book an <span class="h1-serif">Appointment<\/span><\/h1>/i,
  '<h1 data-modal-anim="title" class="booking-form__title">Agendar <span class="h1-serif">Avaliação</span></h1>'
);

html = html.replace('Select service', 'Selecione o procedimento desejado');
html = html.replace('<div>Treatment*</div>', '<div>Procedimento de Interesse*</div>');

// Replace Treatment Radio values & labels
html = html.replace(/value="aesthetic-dentistry"/g, 'value="lentes-em-resina"');
html = html.replace(
  /<span class="booking-treatment-card__title">Aesthetic dentistry<\/span>/gi,
  '<span class="booking-treatment-card__title">Lentes em Resina</span>'
);

html = html.replace(
  /<span class="booking-treatment-card__title">Veneers<\/span>/gi,
  '<span class="booking-treatment-card__title">Facetas Dentais</span>'
);

html = html.replace(
  /<span class="booking-treatment-card__title">Wisdom tooth extraction<\/span>/gi,
  '<span class="booking-treatment-card__title">Clareamento Dental</span>'
);

html = html.replace(
  /<span class="booking-treatment-card__title">Implantation<\/span>/gi,
  '<span class="booking-treatment-card__title">Alinhadores Invisíveis</span>'
);

html = html.replace(
  /<span class="booking-treatment-card__title">Orthodontic treatment<\/span>/gi,
  '<span class="booking-treatment-card__title">Harmonização Facial</span>'
);

html = html.replace(
  /<span class="booking-treatment-card__title">Professional hygiene<\/span>/gi,
  '<span class="booking-treatment-card__title">Limpeza e Profilaxia</span>'
);

// Buttons & form labels
html = html.replace(/<div>Next Step<\/div>/gi, '<div>Próximo Passo</div>');
html = html.replace(/<div>Back<\/div>/gi, '<div>Voltar</div>');
html = html.replace(/<div>Submit<\/div>/gi, '<div>Confirmar no WhatsApp</div>');
html = html.replace(/<div>Confirm Appointment<\/div>/gi, '<div>Confirmar no WhatsApp</div>');
html = html.replace(/placeholder="Full Name"/gi, 'placeholder="Seu Nome Completo"');
html = html.replace(/placeholder="Phone Number"/gi, 'placeholder="(19) 99999-9999"');
html = html.replace(/placeholder="Email Address"/gi, 'placeholder="seu@email.com"');

fs.writeFileSync(indexPath, html);
console.log('Translated booking modal successfully!');
