const fs = require('fs');
const html = fs.readFileSync('clones/facetasdental(dra.adrielipereira)/index.html', 'utf8');

const teamSection = html.slice(html.indexOf('data-team=""'), html.indexOf('</section>', html.indexOf('data-team=""')));
const authors = [...teamSection.matchAll(/<h3[^>]*data-team="author-name"[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].trim());
console.log('Team authors:\n', authors);

const jobs = [...teamSection.matchAll(/<div[^>]*data-team="author-job"[^>]*>([\s\S]*?)<\/div>/gi)].map(m => m[1].trim());
console.log('Team jobs:\n', jobs);
