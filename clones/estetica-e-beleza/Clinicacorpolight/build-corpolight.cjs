const fs = require('fs');

// Read fresh clone from ever-lash-extension
let html = fs.readFileSync('clones/ever-lash-extension/index.html', 'utf8');
const initialLength = html.length;
console.log('Starting build from fresh ever clone. Initial length:', initialLength);

// Helper to replace exactly one script matching a test
function replaceSingleScript(testFn, newContent) {
  const scriptRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?<\/script>/gi;
  let replaced = false;
  html = html.replace(scriptRegex, (match) => {
    if (!replaced && testFn(match)) {
      replaced = true;
      console.log('✓ Replaced single script tag (old length: ' + match.length + ')');
      return newContent;
    }
    return match;
  });
  if (!replaced) console.warn('⚠ Could not find matching script tag');
}

// 1. Meta / Head Title & Canonical
html = html.replace(
  '<title>EVER</title>',
  '<title>Clínica Corpo Light | Harmonização Corporal em São José dos Campos</title>'
);
html = html.replace(
  '<title>Lash Extension</title>',
  '<title>Clínica Corpo Light | Harmonização Corporal em São José dos Campos</title>'
);
html = html.replace(
  '<link href="https://www.ever.co.id/services/lash-extension" rel="canonical">',
  '<link href="https://www.clinicacorpolight.com.br" rel="canonical">'
);

// 2. Head Schema (Organization -> MedicalBusiness)
const headSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Clínica Corpo Light",
  "alternateName": "Corpo Light",
  "url": "https://www.instagram.com/clinicacorpolight_/",
  "telephone": "+55-12-98269-3615",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Cassiano Ricardo, 319 — Sala 1201, Pátio das Américas",
    "addressLocality": "São José dos Campos",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.instagram.com/clinicacorpolight_/"
  ],
  "description": "Harmonização corporal e facial, contorno, emagrecimento, rejuvenescimento e estética integrativa sob a responsabilidade técnica da Dra. Alessandra Carvalho no Pátio das Américas em São José dos Campos."
}
</script>`;
replaceSingleScript(s => s.includes('Ever House') || s.includes('"Organization"'), headSchema);

// 3. Navbar Logo SVG embed (Perfect typography, no clipping on top/bottom/sides)
html = html.replace(
  /<div class="navbar19_logo icon-height-xsmall w-embed"><svg[^>]*>[\s\S]*?<\/svg><\/div>/,
  `<div class="navbar19_logo icon-height-xsmall w-embed" style="width: 145px; height: auto;">
  <svg width="100%" height="100%" viewBox="0 0 1000 170" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
    <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="currentColor" font-family="'Maax', 'Helvetica Neue', sans-serif" font-weight="700" font-size="84" letter-spacing="14">CORPO LIGHT</text>
  </svg>
</div>`
);
console.log('✓ Replaced Navbar Logo SVG with unclipped CORPO LIGHT');

// 4. Category Brand SVGs (viewBox 0 0 1477 177)
const newCategorySvg = `<svg width="100%" height="100%" viewBox="0 0 1477 177" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="currentColor" font-family="'Maax', 'Helvetica Neue', sans-serif" font-weight="700" font-size="105" letter-spacing="22">CORPO LIGHT</text>
</svg>`;

html = html.replace(/(<div class="everlogo lash[^"]*">)<svg[^>]*>[\s\S]*?<\/svg>(<\/div>)/gi, (match, openTag, closeTag) => {
  return `${openTag}${newCategorySvg}${closeTag}`;
});
console.log('✓ Replaced all everlogo lash SVGs with CORPO LIGHT typography');

// 5. Navbar CTA Button & WhatsApp Links
html = html.replace(
  '>MAKE&nbsp;AN&nbsp;APPOINTMENT<',
  '>AGENDAR AVALIAÇÃO<'
);
html = html.replace(
  '<a href="tel:+622150980398" data-gsap="btn.8" class="navbar19_link w-nav-link">MAKE&nbsp;AN&nbsp;APPOINTMENT</a>',
  '<a href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank" data-gsap="btn.8" class="navbar19_link w-nav-link">AGENDAR AVALIAÇÃO</a>'
);
html = html.replace(
  '<a href="tel:+622150980398" data-gsap="btn.8" class="navbar19_link w-nav-link">AGENDAR AVALIAÇÃO</a>',
  '<a href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank" data-gsap="btn.8" class="navbar19_link w-nav-link">AGENDAR AVALIAÇÃO</a>'
);
html = html.replace(
  'href="https://api.whatsapp.com/send?phone=6281311888508&text=Halo%20EVER%20saya%20mau%20bertanya"',
  'href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank"'
);
html = html.replace(
  'href="https://api.whatsapp.com/send?phone=6281311888508&amp;text=Halo%20EVER%20saya%20mau%20bertanya"',
  'href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank"'
);
html = html.replace(
  'href="https://api.whatsapp.com/send?phone=6281311888508&amp;text=Halo%20Everlash%20saya%20mau%20Appointment"',
  'href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank"'
);
html = html.split('https://www.instagram.com/ever.co.id/').join('https://www.instagram.com/clinicacorpolight_/');
html = html.split('https://www.instagram.com/everlash_lash_expert/').join('https://www.instagram.com/clinicacorpolight_/');
html = html.split('https://www.facebook.com/everlash.id').join('https://www.instagram.com/clinicacorpolight_/');

// 6. Drawer Menu Items & Links
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Lash Extension</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Harmonização Corporal</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Keratine Filler Lift</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Drenagem Linfática</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Stem Cell Lash Regrowth</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Massagem Modeladora</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Ever Shape</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Radiofrequência</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Brow Bomber</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Criofrequência</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Brow Arch Shaping</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Intradermoterapia</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Keratiné Filler Lift</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Bioestimuladores de Colágeno</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Brow &amp; Face Threading</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Drenagem Linfática Corporal</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Manicure</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Protocolo Onix Duet</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Nail Art</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Harmonização Facial</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Pedicure</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Laser Lavieen Glow</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Waxing</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Lifting Glúteo &amp; Firmeza</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Semi Permanent Make Up</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Massagem Redutora</h3>'
);
html = html.replace(
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Everbody</h3>',
  '<h3 data-gsap="txt.3" class="text-font-body text-size-medium text-weight-light is-nav">Corpo Light Exclusivo</h3>'
);

// Drawer right navigation & contacts
html = html.replace(
  '<a data-gsap="btn.8" href="/about-us" class="navbar19_link-small">/&nbsp;OUR&nbsp;STORY</a>',
  '<a data-gsap="btn.8" href="#sobre" class="navbar19_link-small">/&nbsp;SOBRE A CLÍNICA</a>'
);
html = html.replace(
  '<a data-gsap="btn.8" href="/post" class="navbar19_link-small">/&nbsp;JOURNAL</a>',
  '<a data-gsap="btn.8" href="#resultados" class="navbar19_link-small">/&nbsp;RESULTADOS &amp; PROTOCOLOS</a>'
);
html = html.replace(
  '<a data-gsap="btn.8" href="/location" class="navbar19_link-small">/&nbsp;LOCATION</a>',
  '<a data-gsap="btn.8" href="#localizacao" class="navbar19_link-small">/&nbsp;LOCALIZAÇÃO (PÁTIO DAS AMÉRICAS)</a>'
);
html = html.replace(
  '<a data-gsap="btn.8" href="/services" class="navbar19_link-small">/ SERVICES</a>',
  '<a data-gsap="btn.8" href="#tratamentos" class="navbar19_link-small">/ TRATAMENTOS</a>'
);
html = html.replace(
  'FOR&nbsp;BOOKING',
  'AGENDAMENTO'
);
html = html.replace(
  '/ SCHEDULE&nbsp;VIA WHATSAPP',
  '/ AGENDAR VIA WHATSAPP'
);
html = html.replace(
  '<a data-gsap="btn.8" href="tel:+622150980398" class="navbar19_link-small">/ SCHEDULE&nbsp;VIA&nbsp;CALL</a>',
  '<a data-gsap="btn.8" href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20no%20WhatsApp" target="_blank" class="navbar19_link-small">/ CONTATO (12) 98269-3615</a>'
);
html = html.replace(
  '<a href="#" class="button w-button">CONTACT&nbsp;US</a>',
  '<a href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank" class="button w-button">FALAR NO WHATSAPP</a>'
);

// Drawer Image (Replace EverNails with 2026 aesthetic woman)
html = html.replace(
  /<img\b[^>]*67f29bd64ed8bfee392f4c85[^>]*>/i,
  '<img src="assets/images/menu-drawer-corpo.jpg" loading="lazy" alt="Clínica Corpo Light — Estética e Bem-estar" class="image-10">'
);

// 7. Section 0 (Hero - section_header81)
html = html.replace(
  '<h1 class="heading-style-h1-services">Lash Extension</h1>',
  '<h1 class="heading-style-h1-services">Harmonização Corporal</h1>'
);
html = html.replace(
  '<h3 class="heading-style-h5">Designed for Your Eyes. Meant to be Yours.</h3>',
  '<h3 class="heading-style-h5">Contorno, equilíbrio e luz no seu corpo.</h3>'
);
html = html.replace(
  '<p class="text-size-medium">Each set is mapped to suit the shape and character of your natural eyes, then applied strand by strand to move with you. Whether you prefer soft and subtle or full and bold, the result is always the same: lashes that look like they were always meant for you.</p>',
  '<p class="text-size-medium">Harmonização corporal real e personalizada. Protocolos pensados para o seu biotipo, sem promessas de milagre — com acompanhamento de perto e resultados construídos no tempo certo. Sob a responsabilidade técnica da Dra. Alessandra Carvalho no Pátio das Américas, São José dos Campos.</p>'
);

// HERO IMAGE: Replace eyelash extension eye image with 2026 aesthetic body/silhouette
html = html.replace(
  /<img\b[^>]*68353c82e66acceebdf09f20[^>]*>/i,
  '<img src="assets/images/hero-mulher-alta-beleza.jpg" loading="lazy" alt="Clínica Corpo Light — Harmonização Corporal em São José dos Campos" class="header81_image">'
);

// 8. Section 1 (Sobre a clínica - section_gallery25)
html = html.replace(
  '<h2 class="heading-style-h2">PERSONALISE your look</h2>',
  '<h2 class="heading-style-h2">SOBRE A CLÍNICA</h2>'
);
html = html.replace(
  '<h2 class="heading-style-h5">with</h2>',
  '<h2 class="heading-style-h5">feito para o</h2>'
);
html = html.replace(
  '<h2 class="heading-style-h5">Our</h2>',
  '<h2 class="heading-style-h5">seu</h2>'
);
html = html.replace(
  '<h2 class="heading-style-h2">first class <br></h2>',
  '<h2 class="heading-style-h2">corpo <br></h2>'
);
html = html.replace(
  '<h2 class="heading-style-h2">beauty serviceS</h2>',
  '<h2 class="heading-style-h2">CORPO LIGHT</h2>'
);
html = html.replace(
  '<p id="w-node-d2f9910b-b197-6888-275c-74bce4274a47-ad5729d3" class="text-size-large is-smaller">Through quiet precision and intentional care, we shape results that feel natural and entirely yours.</p>',
  '<p id="w-node-d2f9910b-b197-6888-275c-74bce4274a47-ad5729d3" class="text-size-large is-smaller">A Corpo Light nasceu da crença de que a estética corporal vai muito além de procedimentos: é escutar, avaliar e construir um caminho junto com cada paciente. Sob a responsabilidade técnica da Dra. Alessandra Carvalho, desenvolvemos protocolos individuais no Pátio das Américas, São José dos Campos.</p>'
);

// Gallery 25 image (Lavieen glow model - NO old eyelash srcset)
html = html.replace(
  /<img\b[^>]*68353c7d7277987a4d6a6c6c[^>]*>/i,
  '<img src="assets/images/modelo-lavieen-glow.jpg" loading="lazy" alt="Clínica Corpo Light — Modelo e Estética Integrativa" class="gallery25_image">'
);

// 9. Section 2 (Por que a Corpo Light? - section_header80)
html = html.replace(
  '<h2 class="heading-style-h2">Why Lash Extensions at EVER?</h2>',
  '<h2 class="heading-style-h2">Por que a Corpo Light?</h2>'
);
html = html.replace(
  '<p>We make you feel special. Just lashes that frame your eyes the way they were meant to.</p>',
  '<p>Não acreditamos em milagres. Acreditamos em consistência, técnica e em um ambiente confortável — no Pátio das Américas, em São José dos Campos — para que você se sinta segura em cada etapa do seu cuidado.</p>'
);
html = html.replace(
  '<h3 class="heading-style-h3">Always Comfortable</h3>',
  '<h3 class="heading-style-h3">Avaliação &amp; Diagnóstico</h3>'
);
html = html.replace(
  '<p>Every lash set is applied with consideration balancing your desired look with what your natural lashes can comfortably support.</p>',
  '<p>Diagnóstico corporal completo para entender seu biotipo, hábitos e objetivos reais. Protocolos pensados na medida do seu corpo e do seu dia a dia.</p>'
);
html = html.replace(
  '<h3 class="heading-style-h3">Mapped to Match You</h3>',
  '<h3 class="heading-style-h3">Acompanhamento Contínuo</h3>'
);
html = html.replace(
  /<p>Our lash artists design your set[^<]*<\/p>/i,
  '<p>Avaliamos a evolução em cada retorno com registro fotográfico e ajustamos o protocolo para manter resultados consistentes, saudáveis e duradouros.</p>'
);
html = html.replace(
  '<p>Our lash artists design your set by tailoring the style, curl, and length to compliment your facial feature and express your personal style.</p>',
  '<p>Avaliamos a evolução em cada retorno com registro fotográfico e ajustamos o protocolo para manter resultados consistentes, saudáveis e duradouros.</p>'
);

// Dual scroller images (6 real images - NO eye images)
html = html.replace(
  /<img\b[^>]*68353c94d519ae1be1fa1c1a[^>]*>/i,
  '<img id="w-node-_1726c86a-90e3-019b-7b84-94ffa1702ab7-ad5729d3" loading="lazy" alt="Harmonização e Contorno Facial" src="assets/images/mulher-contorno-facial.jpg" class="header80_image _1">'
);
html = html.replace(
  'src="assets/images/67fc9963ec1abbe58913940b_EVER_textureArtboard_5.jpg"',
  'src="assets/images/mulher-contorno-gluteos.jpg"'
);
html = html.replace(
  'src="assets/images/68353c99876ab74788614c50_Service_Lash_Extensions_Ever_why_matters_2.avif"',
  'src="assets/images/dra-alessandra-clinica.jpg"'
);
html = html.replace(
  'src="assets/images/67fc99642ea14342e387c3b6_EVER_textureArtboard_2.jpg"',
  'src="assets/images/mulher-gluteos-lifting.jpg"'
);
html = html.replace(
  'src="assets/images/68353ca0edbd3a67dbe50222_Service_Lash_Extensions_Ever__why_matters_3.avif"',
  'src="assets/images/resultado-onix-3.jpg"'
);
html = html.replace(
  'src="assets/images/67fc99642ea14342e387c395_EVER_textureArtboard_4.jpg"',
  'src="assets/images/mulher-pele-rejuvenescimento.jpg"'
);

// 10. Section 3 (Tratamentos - section_blog67)
html = html.replace(
  '<div class="text-size-tiny text-style-italic text-style-allcaps">experience the</div>',
  '<div class="text-size-tiny text-style-italic text-style-allcaps">tecnologia &amp; toque</div>'
);
html = html.replace(
  '<div class="text-size-tiny text-style-italic text-style-allcaps">Lash Extension</div>',
  '<div class="text-size-tiny text-style-italic text-style-allcaps">harmonização corporal</div>'
);
html = html.replace(
  '<h2 class="heading-style-h2">Lash Extension Options</h2>',
  '<h2 class="heading-style-h2">Tratamentos e Protocolos</h2>'
);

// Slide 1: Drenagem Linfática
html = html.replace(
  '<h3 class="heading-style-h4 text-style-body">Single Lash</h3>',
  '<h3 class="heading-style-h4 text-style-body">Drenagem Linfática</h3>'
);
html = html.replace(
  'One extension to one natural lash—for a refined, clean look that adds length and subtle definition without extra volume. Ideal for first-timers or lovers of quiet beauty.',
  'Estimula a circulação e ajuda na redução de inchaço, promovendo leveza imediata e sensação profunda de bem-estar corporal.'
);
html = html.replace(
  /<img\b[^>]*68353de9b20787c00e34e85d[^>]*>/i,
  '<img src="assets/images/mulher-pernas-firmeza.jpg" loading="lazy" alt="Drenagem Linfática e Redução de Inchaço" class="gallery25_image">'
);

// Slide 2: Massagem Modeladora
html = html.replace(
  '<h3 class="heading-style-h4 text-style-body">Hybrid lash</h3>',
  '<h3 class="heading-style-h4 text-style-body">Massagem Modeladora</h3>'
);
html = html.replace(
  'A curated blend of classic and volume techniques. Hybrid lashes offer texture and dimension with a soft, natural feel—perfect for an effortlessly elevated look.',
  'Manobras precisas e direcionadas para auxiliar no contorno corporal, ativação metabólica e firmeza da pele.'
);
html = html.replace(
  /<img\b[^>]*6836d38a26f734a79ea171d3[^>]*>/i,
  '<img src="assets/images/mulher-gluteos-lifting.jpg" loading="lazy" alt="Massagem Modeladora e Firmeza" class="gallery25_image">'
);

// Slide 3: Radiofrequência
html = html.replace(
  '<h3 class="heading-style-h4 text-style-body">Natural volume lash</h3>',
  '<h3 class="heading-style-h4 text-style-body">Radiofrequência</h3>'
);
html = html.replace(
  'Featherlight fans give your eyes a gentle boost. This set brings fuller lashes without the drama—airier, fluffier, and still grounded in your natural shape.',
  'Tecnologia que promove aquecimento controlado das camadas profundas para estimular intensamente a produção de colágeno e sustentação.'
);
html = html.replace(
  /<img\b[^>]*68353e2be4d1450ea6e2bf40[^>]*>/i,
  '<img src="assets/images/mulher-onix-abdomen.jpg" loading="lazy" alt="Radiofrequência e Redução de Medidas" class="gallery25_image">'
);

// Slide 4: Criofrequência
html = html.replace(
  '<h3 class="heading-style-h4 text-style-body">Glam volume lash</h3>',
  '<h3 class="heading-style-h4 text-style-body">Criofrequência</h3>'
);
html = html.replace(
  'For moments that call for more. Glam Volume gives bold density and depth while maintaining a soft finish. Dramatic, but never heavy.',
  'Combinação sinérgica de resfriamento e radiofrequência para tratamentos de alta precisão em contorno corporal e redução de flacidez.'
);
html = html.replace(
  /<img\b[^>]*68353e4c7f15cafe06af9574[^>]*>/i,
  '<img src="assets/images/resultado-onix-2.jpg" loading="lazy" alt="Criofrequência e Alta Performance" class="gallery25_image">'
);

// Slide 5: Intradermoterapia & Suplementos Injetáveis
html = html.replace(
  '<h3 class="heading-style-h4 text-style-body">Artisan’s choice lash</h3>',
  '<h3 class="heading-style-h4 text-style-body">Intradermoterapia &amp; Injetáveis</h3>'
);
html = html.replace(
  'Let our lash artist design a look just for you. This fully custom set adapts to your eye shape, lash growth, and overall energy. Ideal if you trust the process and want something beautifully bespoke.',
  'Microinjeções direcionadas e suplementos injetáveis personalizados que auxiliam na queima de gordura, definição muscular e tônus corporal.'
);
html = html.replace(
  /<img\b[^>]*68353e983eb6b4d2d57ff745[^>]*>/i,
  '<img src="assets/images/resultado-pernas-1.jpg" loading="lazy" alt="Intradermoterapia e Definição Corporal" class="gallery25_image">'
);

// 11. Section 4 (Depoimentos no Google & Dra. Alessandra - section_testimonial15)
html = html.replace(
  '<h2 class="heading-style-h2 z-index-2">EVER, Through Their Eyes</h2>',
  '<h2 class="heading-style-h2 z-index-2">O Que Dizem Nossas Pacientes</h2>'
);
html = html.replace(
  '<h2 class="heading-style-h4 text-align-center">Cinta Laura</h2>',
  '<h2 class="heading-style-h4 text-align-center">Juliana B Pereira &amp; Marta Bartelega</h2>'
);
html = html.replace(
  '<div class="text-size-small">By</div>',
  '<div class="text-size-small">Avaliações 5,0 no Google ★★★★★</div>'
);
html = html.replace(
  '<p class="text-size-small text-weight-bold text-style-italic">Actress</p>',
  '<p class="text-size-small text-weight-bold text-style-italic">Pacientes Reais · Depoimentos Verificados</p>'
);

// Replace the full testimonial block (Qoute + English text) with authentic Portuguese reviews
html = html.replace(
  /<div id="w-node-_58e5e50c-8a63-39ae-210b-d7d1203eeff7-ad5729d3"[^>]*>[\s\S]*?<\/div><\/div><div id="w-node-_58e5e50c-8a63-39ae-210b-d7d1203eeffc-ad5729d3"/,
  `<div id="w-node-_58e5e50c-8a63-39ae-210b-d7d1203eeff7-ad5729d3" class="div-block-2">
  <p class="text-size-small text-weight-bold text-style-italic" style="color: var(--color--text-subtle);">Depoimentos no Google</p>
  <p class="text-size-small text-style-italic" style="margin-bottom: 0.85rem; font-size: 1.05rem; line-height: 1.6;">
    “Clínica linda e atendimento excelente, recomendo muito!! Fiz meu protocolo de harmonização corporal com a Dra. Alessandra e o resultado superou todas as expectativas. Ambiente acolhedor e profissionais impecáveis.”
    <br><span style="font-weight: 600; font-size: 0.95rem; opacity: 0.9;">— Juliana B Pereira (Avaliação Google 5,0 ★★★★★)</span>
  </p>
  <p class="text-size-small text-style-italic" style="font-size: 1.05rem; line-height: 1.6;">
    “Tudo lá é maravilhoso! Procedimentos, atendimento, ambiente e custo. Recomendo de olhos fechados!!!”
    <br><span style="font-weight: 600; font-size: 0.95rem; opacity: 0.9;">— Marta Bartelega Cembranelli (Avaliação Google 5,0 ★★★★★)</span>
  </p>
</div></div><div id="w-node-_58e5e50c-8a63-39ae-210b-d7d1203eeffc-ad5729d3"`
);

// Replace Dra Alessandra Image (NO old Cinta Laura eyelash srcset)
html = html.replace(
  /<img\b[^>]*68353ca8dd193d4600418e33[^>]*>/i,
  '<img loading="lazy" src="assets/images/dra-alessandra-clinica.jpg" alt="Dra. Alessandra Carvalho — Responsável Técnica Corpo Light" class="testimonial15_client-image">'
);
html = html.replace(
  '<div class="text-size-small">ONLY AT</div>',
  '<div class="text-size-small">RESPONSÁVEL TÉCNICA · DRA. ALESSANDRA CARVALHO</div>'
);

// 12. Section 5 (CTA Banner - section_layout517-2)
html = html.replace(
  '<h2 class="heading-style-h2 is-small">FIND YOUR DESIRED LOOK WITH OUR EXTENSIVE SERVICES</h2>',
  '<h2 class="heading-style-h2 is-small">VAMOS MONTAR SEU PROTOCOLO?</h2>'
);
html = html.replace(
  'We understand that the world of beauty can be overwhelming with so many options. Our beauty experts are always ready to help you navigate our price list and find the most suitable service.',
  'Agende sua avaliação e descubra o melhor caminho para o seu contorno e bem-estar. Protocolos individuais pensados exclusivamente para o seu biotipo, rotina e objetivos reais.'
);
html = html.replace(
  'href="https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68b14daccdedf2f28f86b697_EVER%20Price%20List%20JKT%20AUG%202025_merged_compressed.pdf"',
  'href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank"'
);
html = html.replace(
  '<div>Download Our Pricing</div>',
  '<div>Falar no WhatsApp</div>'
);

// CTA Banner Image: Replace with luxury clinic body contouring & wellness woman (NO text, NO old CTA-02 srcset)
html = html.replace(
  /<img\b[^>]*680a05f1151954a6decd8b99[^>]*>/i,
  '<img src="assets/images/cta-mulher-harmonizacao-corpo.jpg" loading="lazy" alt="Harmonização Corporal e Bem-estar — Clínica Corpo Light" class="layout517_image">'
);

// 13. Section 6 (FAQs - faq3_component)
html = html.replace(
  '<h2 data-gsap="free.8">Frequently Asked Questions</h2>',
  '<h2 data-gsap="free.8">Dúvidas Frequentes</h2>'
);
html = html.replace(
  "Didn't find the answer to your question?<br>Send it to us by chat. We will be happy to answer you!",
  'Não encontrou a resposta para a sua dúvida?<br>Fale diretamente conosco pelo WhatsApp. Teremos prazer em atender você!'
);
html = html.replace(
  '<div>Ask a Question</div>',
  '<div>Falar no WhatsApp</div>'
);

// FAQ Questions & Answers
html = html.replace(
  'Will Lash Extension damage my natural lashes?',
  'Como funciona a avaliação corporal inicial?'
);
html = html.replace(
  'No! When applied properly, with perfect isolation and weight eyelash extensions will not harm your natural lashes. Our lash artists are all experienced and certified, the most important thing to them is the integrity of your natural lash. During your initial consultation they will evaluate your natural lashes to ensure you get the lashes that work best for your natural lashes so that you will never have damage or breakage!',
  'Realizamos um diagnóstico corporal individual e completo para analisar seu biotipo, rotina, histórico e objetivos reais. A partir dessa escuta clínica detalhada, desenhamos um protocolo sob medida para as necessidades do seu corpo.'
);

html = html.replace(
  'What is Lash Extension?',
  'O que é a harmonização corporal e para quem é indicada?'
);
html = html.replace(
  'The Lash Extensions used at EVER are synthetic Mink, or Silk and are applied individually to the natural lash',
  'A harmonização corporal reúne procedimentos estéticos e integrativos focados em contorno, firmeza e redução de medidas sem necessidade de intervenções cirúrgicas invasivas. É ideal para quem busca equilíbrio, autocuidado e resultados consistentes.'
);

html = html.replace(
  'Can I wear makeup&nbsp;with my Lash Extensions?',
  'Os resultados dos tratamentos são imediatos?'
);
html = html.replace(
  "Yes! Although we don’t recommend wearing any mascara that isn't extension safe or oil based products, as it will shorten the life of your lash extensions.",
  'Trabalhamos com processos reais e fisiológicos, sem promessas mágicas. Procedimentos como drenagem promovem alívio e leveza imediatos, enquanto tecnologias como radiofrequência e criofrequência desenvolvem estímulo progressivo de colágeno ao longo das sessões.'
);

html = html.replace(
  'Can I swim/shower/ get my Lash Extension wet?',
  'Quantas sessões são recomendadas para o meu caso?'
);
html = html.replace(
  'Yes. You can have pretty eyes when you wake up, straight out of the shower, and even out of the pool! If you’re swimming in water that is chlorinated or salty, splash your extensions with fresh water afterwards or cleanse them with our Lash &amp; Brow Mousse. Avoid detergents, oily soaps and eye-rubbing and your lashes should last well. Try to pat them dry gently.',
  'O número de sessões é definido exclusivamente na sua avaliação com a Dra. Alessandra Carvalho. Como cada organismo possui um ritmo próprio de resposta, o protocolo é ajustado continuamente para garantir a máxima eficácia.'
);

html = html.replace(
  'Can I decide on the color for my eyelashes?',
  'Onde a clínica está localizada em São José dos Campos?'
);
html = html.replace(
  'Certainly! We offer a wide array of color choices, including black, chocolate, autumn lash (a subtle, natural hue), and fairy blush (a lively neon pop-up color). For further information, do not hesitate to<a href="https://api.whatsapp.com/send?phone=628211218069&amp;text=Halo%20Ever%20House%20saya%20mau%20Bertanya"><strong><em> contact us.</em></strong></a>',
  'Estamos situados no Edifício Pátio das Américas, Sala 1201, no Jardim Aquarius — São José dos Campos/SP. O espaço conta com fácil acesso, estacionamento no local e um ambiente acolhedor e privativo.'
);

// FAQ Schema (strict single script replace)
const faqSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como funciona a avaliação corporal inicial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Realizamos um diagnóstico corporal individual e completo para analisar seu biotipo, rotina, histórico e objetivos reais. A partir dessa escuta clínica detalhada, desenhamos um protocolo sob medida para as necessidades do seu corpo."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a harmonização corporal e para quem é indicada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A harmonização corporal reúne procedimentos estéticos e integrativos focados em contorno, firmeza e redução de medidas sem necessidade de intervenções cirúrgicas invasivas."
      }
    },
    {
      "@type": "Question",
      "name": "Os resultados dos tratamentos são imediatos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabalhamos com processos reais e fisiológicos, sem promessas mágicas. Procedimentos como drenagem promovem alívio e leveza imediatos, enquanto tecnologias como radiofrequência e criofrequência desenvolvem estímulo progressivo de colágeno."
      }
    },
    {
      "@type": "Question",
      "name": "Quantas sessões são recomendadas para o meu caso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O número de sessões é definido exclusivamente na sua avaliação com a Dra. Alessandra Carvalho, sendo ajustado continuamente."
      }
    },
    {
      "@type": "Question",
      "name": "Onde a clínica está localizada em São José dos Campos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estamos situados no Edifício Pátio das Américas, Sala 1201, no Jardim Aquarius — São José dos Campos/SP."
      }
    }
  ]
}
</script>`;
replaceSingleScript(s => s.includes('Apakah Lash Extension') || s.includes('FAQPage'), faqSchema);

// 14. Section 7 (Footer - footer15_component & 2026 Credits)
html = html.replace(
  '<div class="text-size-small text-weight-light">Company</div>',
  '<div class="text-size-small text-weight-light">Navegação</div>'
);
html = html.replace(
  '<div class="text-size-small text-weight-light">Contact</div>',
  '<div class="text-size-small text-weight-light">Contato &amp; Localização</div>'
);
html = html.replace(
  '<a href="/" class="footer15_link">HOME</a>',
  '<a href="#inicio" class="footer15_link">INÍCIO</a>'
);
html = html.replace(
  '<a href="/about-us" class="footer15_link">OUR&nbsp;STORY</a>',
  '<a href="#sobre" class="footer15_link">SOBRE A CLÍNICA</a>'
);
html = html.replace(
  '<a href="/post" class="footer15_link">JOURNAL</a>',
  '<a href="#tratamentos" class="footer15_link">TRATAMENTOS</a>'
);
html = html.replace(
  '<a href="/services" class="footer15_link">SERVICES</a>',
  '<a href="#resultados" class="footer15_link">RESULTADOS</a>'
);
html = html.replace(
  '<a href="/services" class="footer15_link">SERVICE</a>',
  '<a href="#resultados" class="footer15_link">RESULTADOS</a>'
);
html = html.replace(
  '<a href="/location" class="footer15_link">LOCATIONs</a>',
  '<a href="#localizacao" class="footer15_link">LOCALIZAÇÃO (PÁTIO DAS AMÉRICAS)</a>'
);
html = html.replace(
  'href="https://api.whatsapp.com/send?phone=628211218069&amp;text=Halo%20Ever%20House%20saya%20mau%20Appointment"',
  'href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Corpo%20Light" target="_blank"'
);
html = html.replace(
  '>SCHEDULE&nbsp;AN&nbsp;APPOINTMENT<',
  '>AGENDAR AVALIAÇÃO<'
);
html = html.replace(
  '<a href="tel:+628211218069" class="footer15_link">ChAT&nbsp;WITH&nbsp;CONSULTANT</a>',
  '<a href="https://wa.me/5512982693615?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20no%20WhatsApp" target="_blank" class="footer15_link">WHATSAPP: (12) 98269-3615</a>'
);
html = html.replace(
  '>ChAT&nbsp;WITH&nbsp;CONSULTANT<',
  '>FALAR NO WHATSAPP<'
);

// Footer Credits (Site 2026 + Feito por Raphael de Oliveira Lima)
html = html.replace(
  /<div class="footer15_credit-text">[\s\S]*?<\/div><div class="w-layout-grid footer15_legal-list">[\s\S]*?<\/div>/i,
  `<div class="footer15_credit-text">
  © 2026 Clínica Corpo Light. Todos os direitos reservados.<br>
  Dra. Alessandra Carvalho · Responsável Técnica · Biomedicina Estética &amp; Integrativa · Av. Cassiano Ricardo, 319 — Sala 1201, Edifício Pátio das Américas, Jardim Aquarius, São José dos Campos — SP · Atendimento: Seg a Sex, 9h às 19h<br>
  <span style="display:inline-block; margin-top:0.6rem; opacity:0.95;">Desenvolvido com maestria por <a href="../../index.html" class="footer15_legal-link" style="text-decoration: underline; color: inherit; font-weight: 600;">Raphael de Oliveira Lima</a> — Designer &amp; Desenvolvedor Web</span>
</div>
<div class="w-layout-grid footer15_legal-list">
  <a href="#sobre" class="footer15_legal-link">Sobre a Clínica</a>
  <a href="#tratamentos" class="footer15_legal-link">Tratamentos</a>
  <a href="../../index.html" class="footer15_legal-link" style="font-weight: 600; text-decoration: underline;">Feito por Raphael de Oliveira Lima</a>
</div>`
);

// Map service links to #tratamentos
html = html.replace(/href="\/services\/[^"]*"/g, 'href="#tratamentos"');

// Save to clones/Clinicacorpolight/index.html
fs.writeFileSync('clones/Clinicacorpolight/index.html', html, 'utf8');
const finalLength = html.length;
console.log('Build complete. Final length:', finalLength, 'Difference:', finalLength - initialLength);
