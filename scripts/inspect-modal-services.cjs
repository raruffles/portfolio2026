const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const servicesListMatch = html.match(/class="[^"]*booking-service[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi);
console.log('Services list match count:', servicesListMatch ? servicesListMatch.length : 0);

const servicesTags = html.match(/<label[^>]*class="[^"]*booking-service[^"]*"[^>]*>[\s\S]*?<\/label>/gi) || [];
console.log('Services tags count:', servicesTags.length);
servicesTags.forEach((s, i) => console.log(`Tag ${i+1}: ${s.replace(/\s+/g, ' ').substring(0, 200)}`));
