const fs = require('fs');
const html = fs.readFileSync('clones/medicina-e-saude/conceito-saude/index.html', 'utf8');

const teamMatches = html.match(/<[^>]+class="[^"]*team[^"]*"[^>]*>[\s\S]*?<\/[^>]+>/gi) || [];
console.log('Team matches count:', teamMatches.length);

const teamCardMatches = html.match(/<div[^>]+class="team-card"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];
console.log('teamCardMatches count:', teamCardMatches.length);

// Also look for names in the text
const names = html.match(/(Dra?\.[^<]+|CRM[^<]+)/g);
console.log('Names / CRMs found:', names);
