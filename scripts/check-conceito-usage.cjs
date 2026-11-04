const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

// Find about/intro section
const introMatch = html.match(/<section[^>]+intro[^>]*>[\s\S]*?<\/section>/i) || html.match(/class="[^"]*intro[^"]*"[\s\S]{1,600}/i);
console.log('Intro section snippet:', introMatch ? introMatch[0].substring(0, 400) : 'not found');

// Find where conceito-about.jpg or conceito-team-1.jpg are used
const aboutUsage = [];
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('conceito-about.jpg') || l.includes('conceito-team-1.jpg') || l.includes('Daynith') || l.includes('Clarissa')) {
    aboutUsage.push(`L${i+1}: ${l.trim().substring(0, 150)}`);
  }
});
console.log('Usage of team/about images and names:', aboutUsage);
