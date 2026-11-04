const fs = require('fs');
const content = fs.readFileSync('previas/conceito-saude/index.html', 'utf8');
console.log('Title in previas/conceito-saude:', (content.match(/<title>[\s\S]*?<\/title>/) || [])[0]);
console.log('First 300 chars:', content.slice(0, 300));
