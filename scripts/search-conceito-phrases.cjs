const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

// Search for key phrases we know exist
const phrases = [
  'Sua Saúde',
  'sua saúde',
  'Mude de',
  'mude de',
  'melhor vers',
  'integrativa',
  'soroterapia',
  'Soroterapia',
  'Pronto para',
  'pronto para',
  'Conquistar',
  'conquistar',
  'footer',
  'tagline',
  'Conceito Saúde',
  'Dayvith',
  'Redenção',
  'Dr.',
  'g-nav__tagline',
  'footer__logo',
  'footer__info',
  'Na Conceito',
  'Seu corpo',
  'Cansaço',
  'cansaço',
  'Superação',
  'superação',
  'Histórias Reais',
  'histórias reais',
];

phrases.forEach(phrase => {
  let idx = html.indexOf(phrase);
  if (idx === -1) {
    console.log(`"${phrase}" => NOT FOUND`);
  } else {
    const start = Math.max(0, idx - 80);
    const snippet = html.slice(start, idx + 200).replace(/\n/g, '↵');
    console.log(`\n"${phrase}" => idx ${idx}`);
    console.log(snippet);
  }
});
