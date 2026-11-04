const fs = require('fs');
const html = fs.readFileSync('clones/estetica-e-beleza/dr.ricardo-andrade/index.html', 'utf8');

const modalMatch = html.match(/class="[^"]*booking-modal[^"]*"[\s\S]*?<\/form>/i);
if (modalMatch) {
  console.log('Booking modal snippet (first 1500 chars):');
  console.log(modalMatch[0].substring(0, 1500));
} else {
  console.log('No booking modal match');
}
