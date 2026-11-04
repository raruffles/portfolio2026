const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

console.log('Title:', html.match(/<title>([^<]*)<\/title>/i)?.[1]);
console.log('Hero title in html:', html.includes('Seu Sorriso Renovado'));
console.log('About title in html:', html.includes('Sobre a Dra. Adrieli'));
console.log('Services in html:', html.includes('Lentes em Resina'));
console.log('Gallery in html:', html.includes('gallery-section'));
console.log('Why Us in html:', html.includes('Mais de 10 Anos de Experiência'));
console.log('Testimonials in html:', html.includes('Por Trás de Cada Sorriso'));
console.log('Team in html:', html.includes('Dra. Adrieli'));
console.log('FAQ in html:', html.includes('faq-section'));
console.log('CTA in html:', html.includes('Deseja Transformar seu Sorriso'));
console.log('Footer in html:', html.includes('Martins Clinic Odontologia Ltda'));
console.log('Floating WA in html:', html.includes('whatsapp-float'));
console.log('Custom styles in html:', html.includes('brand-logo-custom'));
