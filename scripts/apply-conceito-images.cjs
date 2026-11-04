const fs = require('fs');
const path = require('path');

const conceitoFile = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'conceito-saude', 'index.html');
let html = fs.readFileSync(conceitoFile, 'utf8');

// 1. Inject CSS override for .hero__bg and .cta__bg to use local medical/wellness stock images with editorial dark overlay for WCAG AA contrast
const bgOverrideCss = `
  /* CONCEITO SAÚDE CUSTOM MEDICAL IMAGERY */
  .hero__bg {
    background-image: linear-gradient(180deg, rgba(16, 19, 24, 0.55) 0%, rgba(16, 19, 24, 0.68) 100%), url('assets/conceito-hero-bg.jpg') !important;
    background-position: center center !important;
    background-size: cover !important;
  }
  .cta__bg {
    background-image: linear-gradient(180deg, rgba(16, 19, 24, 0.52) 0%, rgba(16, 19, 24, 0.72) 100%), url('assets/conceito-cta-bg.jpg') !important;
    background-position: center center !important;
    background-size: cover !important;
  }
  .service-card__media-img,
  .why-us-card__img,
  .testimonials-card__big-img,
  .testimonials-card__min-img,
  .team-card__img,
  .booking-treatment-card__icon,
  .booking-doctor-card__avatar {
    object-fit: cover !important;
  }
</style>`;

if (!html.includes('CONCEITO SAÚDE CUSTOM MEDICAL IMAGERY')) {
  html = html.replace('</style>', bgOverrideCss);
}

// Helper to replace image src and strip old dental srcset
function replaceImg(oldAssetSubstring, newAsset, newAlt) {
  const regex = new RegExp(`<img([^>]*?)src="assets/[^"]*${oldAssetSubstring}[^"]*"([^>]*?)>`, 'gi');
  html = html.replace(regex, (fullMatch, before, after) => {
    let combined = `${before}src="assets/${newAsset}"${after}`;
    // Remove old dental srcset so browser always loads the new medical image
    combined = combined.replace(/\s*srcset="[^"]*"/gi, '');
    if (newAlt) {
      if (/alt="[^"]*"/i.test(combined)) {
        combined = combined.replace(/alt="[^"]*"/i, `alt="${newAlt}"`);
      } else {
        combined += ` alt="${newAlt}"`;
      }
    }
    return `<img${combined}>`;
  });
}

// 2. About Section Image
replaceImg('about--d', 'conceito-about.jpg', 'Consulta médica integrativa na Conceito Saúde');

// 3. 9 Service Card Images
replaceImg('aesthetic_dentistry\\.avif', 'conceito-srv-1-integrativa.jpg', 'Saúde Integrativa');
replaceImg('veneers\\.avif', 'conceito-srv-2-emagrecimento.jpg', 'Emagrecimento Avançado');
replaceImg('wisdom_tooth_extraction\\.avif', 'conceito-srv-3-soroterapia.jpg', 'Soroterapia e Injetáveis');
replaceImg('implantation\\.avif', 'conceito-srv-4-hormonal.jpg', 'Reposição Hormonal');
replaceImg('orthodontic_treatment\\.avif', 'conceito-srv-5-exames.jpg', 'Consultas e Exames Laboratoriais');
replaceImg('professional_hygiene\\.avif', 'conceito-srv-6-lipedema.jpg', 'Tratamento de Lipedema');
replaceImg('teeth_whitening\\.avif', 'conceito-srv-7-mounjaro.jpg', 'Suporte Nutricional a Mounjaro');
replaceImg('surgical_dentistry\\.avif', 'conceito-srv-8-performance.jpg', 'Performance e Hipertrofia');
replaceImg('braces\\.avif', 'conceito-srv-9-longevidade.jpg', 'Longevidade e Prevenção');

// 4. 4 Why Us Card Images
replaceImg('Experienced_Professionals_Image', 'conceito-why-1.jpg', 'Investigação Médica Completa');
replaceImg('State-of-the-Art_Technology_Image', 'conceito-why-2.jpg', 'Clínica e Laboratório no Mesmo Local');
replaceImg('Comfort-Focused_Care_Image', 'conceito-why-3.jpg', 'Protocolos de Soroterapia Exclusivos');
replaceImg('Patient-Centered_Approach_Image', 'conceito-why-4.jpg', 'Conduta Terapêutica Individualizada');

// 5. Testimonials Big Images & Avatars
replaceImg('testimonials-img-1', 'conceito-testi-big-1.jpg', 'Acompanhamento médico personalizado na Conceito Saúde');
replaceImg('testimonials-img-2', 'conceito-testi-big-2.jpg', 'Vitalidade, saúde e emagrecimento saudável');
replaceImg('testimonials-mini-img-1', 'conceito-avatar-1.jpg', 'Lucas M.');
replaceImg('testimonials-mini-img-4', 'conceito-avatar-4.jpg', 'Rodrigo P.');
replaceImg('testimonials-mini-img-5', 'conceito-avatar-5.jpg', 'Carlos E.');

// 6. Team Section Images (5 cards)
replaceImg('team-img-1', 'conceito-team-1.jpg', 'Dra. Daynith Oliveira — Saúde Integrativa');
replaceImg('team-img-2', 'conceito-team-2.jpg', 'Dr. Demetrio Sousa — Emagrecimento e Metabolismo');
replaceImg('team-img-3', 'conceito-team-3.jpg', 'Laboratório Conceito Saúde — Análises Clínicas');
replaceImg('team-img-4', 'conceito-team-4.jpg', 'Dr. Rafael Costa — Nutrologia e Suplementação');
replaceImg('team-img-5', 'conceito-team-5.jpg', 'Dr. Lucas Almeida — Medicina Preventiva');

// 7. Booking Modal Treatment & Doctor thumbnails
replaceImg('Aesthetic_dentistry_min', 'conceito-srv-1-integrativa.jpg', 'Saúde Integrativa');
replaceImg('Veneers_min', 'conceito-srv-2-emagrecimento.jpg', 'Emagrecimento');
replaceImg('Surgical_dentistry_min', 'conceito-srv-3-soroterapia.jpg', 'Soroterapia');
replaceImg('Implantation_min', 'conceito-srv-4-hormonal.jpg', 'Reposição Hormonal');
replaceImg('Orthodontic_treatment_min', 'conceito-srv-5-exames.jpg', 'Consultas e Exames');
replaceImg('Professional_hygiene_min', 'conceito-srv-6-lipedema.jpg', 'Tratamento de Lipedema');
replaceImg('Teeth_whitening_min', 'conceito-srv-7-mounjaro.jpg', 'Suporte a Mounjaro');
replaceImg('Braces_min', 'conceito-srv-8-performance.jpg', 'Performance e Massa');
replaceImg('Wisdom_tooth_extraction_min', 'conceito-srv-9-longevidade.jpg', 'Check-up Laboratorial');

replaceImg('Emily_Peterson_min', 'conceito-team-1.jpg', 'Dra. Daynith Oliveira');
replaceImg('Lucas_Marin_min', 'conceito-team-2.jpg', 'Dr. Demetrio Sousa');
replaceImg('Olivia_Hartman_min', 'conceito-team-3.jpg', 'Laboratório Conceito Saúde');
replaceImg('Marcus_Bennett_min', 'conceito-team-4.jpg', 'Dr. Rafael Costa');
replaceImg('Liam_Brooks_min', 'conceito-team-5.jpg', 'Dr. Lucas Almeida');

// Clean up empty Webflow CMS placeholder src="assets/220" and hide .w-webflow-badge
html = html.replaceAll('src="assets/220"', 'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"');
if (!html.includes('.w-webflow-badge')) {
  html = html.replace('</style>', '  .w-webflow-badge { display: none !important; }\n</style>');
}

fs.writeFileSync(conceitoFile, html, 'utf8');
console.log('Successfully updated all images in Conceito Saúde!');
