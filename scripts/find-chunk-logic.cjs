const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'clones', 'nova-dental', 'assets');
const webflowJs = fs.readFileSync(path.join(ASSETS_DIR, 'webflow.min.js'), 'utf8');

// Search for "achunk"
const idx = webflowJs.indexOf('achunk');
console.log('Index of achunk:', idx);
if (idx !== -1) {
  console.log('Surrounding code:', webflowJs.slice(Math.max(0, idx - 150), idx + 250));
}
