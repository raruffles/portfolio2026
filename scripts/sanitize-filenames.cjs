const fs = require('fs');
const path = require('path');

const CLONE_DIR = path.join(__dirname, '..', 'clones', 'nova-dental');
const ASSETS_DIR = path.join(CLONE_DIR, 'assets');

let html = fs.readFileSync(path.join(CLONE_DIR, 'index.html'), 'utf8');
const files = fs.readdirSync(ASSETS_DIR);

for (const oldName of files) {
  // Clean filename: replace spaces and weird unicode chars with underscores
  const cleanName = oldName.replace(/[\s\u2028\u2029]+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '_');
  if (oldName !== cleanName) {
    const oldPath = path.join(ASSETS_DIR, oldName);
    const newPath = path.join(ASSETS_DIR, cleanName);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: "${oldName}" -> "${cleanName}"`);

    // Replace in HTML: both raw and encoded versions
    const rawOld = `assets/${oldName}`;
    const encOld = `assets/${encodeURI(oldName)}`;
    const newTarget = `assets/${cleanName}`;

    html = html.split(rawOld).join(newTarget);
    html = html.split(encOld).join(newTarget);
    html = html.split(oldName).join(cleanName);
  }
}

fs.writeFileSync(path.join(CLONE_DIR, 'index.html'), html);
console.log('Updated index.html with sanitized filenames.');
