const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'clones', 'nova-dental', 'assets');
const files = fs.readdirSync(ASSETS_DIR);
const spaceFiles = files.filter(f => f.includes(' '));
console.log('Files with spaces:', spaceFiles);
