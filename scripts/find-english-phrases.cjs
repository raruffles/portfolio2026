const fs = require('fs');
const html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const englishWords = [
  'LEARN MORE',
  'Learn more',
  'read more',
  'READ MORE',
  'View all',
  'VIEW ALL',
  'Get in touch',
  'Book now',
  'BOOK NOW',
  'Our services',
  'Services',
  'About us',
  'Contact us',
  'Follow us'
];

englishWords.forEach(w => {
  if (html.includes(w)) {
    console.log(`Found English phrase: "${w}"`);
  }
});
