const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcUserImg = 'C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.user_uploaded/media_1793817842961_f2a7a019.png';

const targetDirs = [
  path.join(rootDir, 'clones', 'medicina-e-saude', 'conceito-saude', 'assets'),
  path.join(rootDir, 'previas', 'conceito-saude', 'assets')
];

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    // Save as conceito-team-1.jpg (replacing the generic stock doctor photo)
    fs.copyFileSync(srcUserImg, path.join(dir, 'conceito-team-1.jpg'));
    fs.copyFileSync(srcUserImg, path.join(dir, 'dra-clarissa.png'));
    console.log(`Copied real doctor photo to ${dir}`);
  }
});
