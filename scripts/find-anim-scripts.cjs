const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const animScripts = html.match(/<script[^>]*src=['"][^'"]*anim[^'"]*['"][^>]*><\/script>/gi) || [];
console.log('Animation scripts:', animScripts);

// Search for t_animate or tilda-animation
const matches = html.match(/assets\/[^\s"'()]*anim[^\s"'()]*/gi) || [];
console.log('Animation assets:', [...new Set(matches)]);
