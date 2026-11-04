const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcUserImg = 'C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.user_uploaded/media_1793815552236_29ef675f.png';

const destCloneAssets = path.join(rootDir, 'clones', 'odontologia', 'dra-fabiana-borges', 'assets');
const destPreviaAssets = path.join(rootDir, 'previas', 'dra-fabiana-borges', 'assets');

fs.mkdirSync(destCloneAssets, { recursive: true });
fs.mkdirSync(destPreviaAssets, { recursive: true });

// Copy the image
fs.copyFileSync(srcUserImg, path.join(destCloneAssets, 'dra-fabiana-borges.png'));
fs.copyFileSync(srcUserImg, path.join(destPreviaAssets, 'dra-fabiana-borges.png'));
console.log('Image copied to dra-fabiana-borges assets!');

// Also copy to Conceito Saúde assets as dra-daynith.png for completeness
const conceitoAssets = path.join(rootDir, 'clones', 'medicina-e-saude', 'conceito-saude', 'assets');
fs.copyFileSync(srcUserImg, path.join(conceitoAssets, 'dra-daynith.png'));
console.log('Image copied to conceito-saude assets as dra-daynith.png!');

// Now update build-fabiana-borges.cjs so that future builds always use this image
let buildScript = fs.readFileSync(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'), 'utf8');

// Check if team img replacement is in build script
if (!buildScript.includes('dra-fabiana-borges.png')) {
  // Replace team-img-1 with dra-fabiana-borges.png
  buildScript = buildScript.replace(
    `html = html.replace(\n  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Adrieli Pereira</h3>',`,
    `html = html.replace(\n  'src="assets/6aa2283692c5e78e6a921c8d_team-img-1.avif" loading="lazy" width="426" height="479" alt="Dr. Emily Peterson"',\n  'src="assets/dra-fabiana-borges.png" loading="lazy" width="426" height="479" alt="Dra. Fabiana Borges (CRO-SP 99524)" style="object-fit:cover;object-position:top;"'\n);\nhtml = html.replace(\n  'CROSP 106703',\n  'CRO-SP 99524'\n);\nhtml = html.replace(\n  '<h3 data-team="author-name" class="text-p1"><span class="text-p1-serif">Dra.</span> <br/>Adrieli Pereira</h3>',`
  );
  fs.writeFileSync(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'), buildScript, 'utf8');
  console.log('Updated scripts/build-fabiana-borges.cjs!');
}

// Now re-run build-fabiana-borges.cjs to rebuild
console.log('Re-running build-fabiana-borges.cjs...');
require(path.join(rootDir, 'scripts', 'build-fabiana-borges.cjs'));
