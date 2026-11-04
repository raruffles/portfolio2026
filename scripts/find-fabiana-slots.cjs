const fs = require('fs');
const h = fs.readFileSync('clones/odontologia/dra-fabiana-borges/index.html', 'utf8');

// Find about image
const aboutIdx = h.indexOf('class="intro__');
if (aboutIdx > -1) {
  const snippet = h.slice(aboutIdx, aboutIdx + 1500);
  const m = snippet.match(/<img[^>]+>/g);
  console.log('About images:', m);
}

// Find team slide 1 image
const teamIdx = h.indexOf('data-team="author-name"');
if (teamIdx > -1) {
  const snippet = h.slice(teamIdx - 200, teamIdx + 1000);
  const m = snippet.match(/<img[^>]+>/g);
  console.log('Team slide 1 image area:\n', snippet.slice(0, 700));
}
