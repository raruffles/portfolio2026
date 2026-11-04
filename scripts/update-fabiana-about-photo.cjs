const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcImg = 'C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.user_uploaded/media_1793817842961_f2a7a019.png';

// Copy image to all relevant asset locations
const destPaths = [
  path.join(rootDir, 'clones', 'odontologia', 'dra-fabiana-borges', 'assets', 'dra-fabiana-borges.png'),
  path.join(rootDir, 'previas', 'dra-fabiana-borges', 'assets', 'dra-fabiana-borges.png'),
  path.join(rootDir, 'previas', 'drfabianaborges', 'assets', 'dra-fabiana-borges.png'),
];

destPaths.forEach(p => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.copyFileSync(srcImg, p);
  console.log(`Copied to ${p}`);
});

// Update build-fabiana-borges.cjs
let buildScript = fs.readFileSync(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'), 'utf8');

// Replace About section image in build-fabiana-borges.cjs
if (!buildScript.includes('intro__media-img') || !buildScript.includes('dra-fabiana-borges.png')) {
  // Let's add the About section replacement
  const aboutTarget = `html = html.replace(\n  'Dra. Adrieli Pereira (CROSP 106703) é cirurgiã-dentista há mais de 10 anos`;
  const aboutReplacement = `// Replace About section photo with Dra. Fabiana Borges photo
html = html.replace(
  /<img[^>]+class="intro__media-img"[^>]*\\/?>/,
  '<img src="assets/dra-fabiana-borges.png" alt="Dra. Fabiana Borges — FG Odontologia Integrada" loading="lazy" width="306" height="326" style="object-fit:cover;object-position:top;border-radius:16px;" class="intro__media-img"/>'
);
${aboutTarget}`;

  if (buildScript.includes(aboutTarget)) {
    buildScript = buildScript.replace(aboutTarget, aboutReplacement);
    fs.writeFileSync(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'), buildScript, 'utf8');
    console.log('Added About section photo replacement to build-fabiana-borges.cjs!');
  }
}

// Ensure the Team section image replacement is also present
if (!buildScript.includes('dra-fabiana-borges.png') || !buildScript.includes('CRO-SP 99524')) {
  console.log('Checking team section replacement in build-fabiana-borges.cjs...');
}

// Rebuild
console.log('Rebuilding Dra. Fabiana Borges preview...');
delete require.cache[require.resolve(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'))];
require(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'));
