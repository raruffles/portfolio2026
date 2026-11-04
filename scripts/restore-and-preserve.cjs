const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const facetasDir = path.join(rootDir, 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)');
const novaDir = path.join(rootDir, 'clones', 'odontologia', 'nova-dental');
const conceitoDir = path.join(rootDir, 'clones', 'medicina-e-saude', 'conceito-saude');

// 1. Copy current facetasDir (which has Conceito Saúde HTML) to clones/medicina-e-saude/conceito-saude
if (!fs.existsSync(conceitoDir)) {
  fs.cpSync(facetasDir, conceitoDir, { recursive: true });
  console.log('Copied Conceito Saúde to:', conceitoDir);
}

// 2. Copy clean Nova Dental index.html into facetasDir/index.html
const novaHtml = fs.readFileSync(path.join(novaDir, 'index.html'), 'utf8');
const targetFile = path.join(facetasDir, 'index.html');
fs.writeFileSync(targetFile, novaHtml, 'utf8');

// 3. Apply the 3 Dra. Adrieli text-only scripts by patching their path in memory and running them
for (const scriptName of ['apply-text-only.cjs', 'apply-all-clean-text.cjs', 'finish-footer-and-card4.cjs']) {
  const scriptPath = path.join(__dirname, scriptName);
  let code = fs.readFileSync(scriptPath, 'utf8');
  code = code.replace(
    "path.join(__dirname, '..', 'clones', 'facetasdental(dra.adrielipereira)', 'index.html')",
    "path.join(__dirname, '..', 'clones', 'odontologia', 'facetasdental(dra.adrielipereira)', 'index.html')"
  );
  fs.writeFileSync(scriptPath, code, 'utf8');
  require(scriptPath);
}

console.log('Restored Dra. Adrieli Pereira in:', targetFile);
