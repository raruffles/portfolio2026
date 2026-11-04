const fs = require('fs');
const html = fs.readFileSync('clones/arquitetura/decor-dani-melo/source.html', 'utf8');

// Find headings, buttons, links
const h = html.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
console.log('Headings:', h.map(x => x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));

const links = html.match(/<a[^>]+href="([^">]+)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
console.log('\nLinks count:', links.length);
links.slice(0, 10).forEach(l => {
  console.log(l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
});

const buttons = html.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
console.log('\nButtons count:', buttons.length);
buttons.forEach(b => console.log(b.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
