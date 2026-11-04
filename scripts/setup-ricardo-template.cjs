const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const templateDir = path.join(rootDir, 'clones', 'odontologia', 'nova-dental');
const targetDir = path.join(rootDir, 'clones', 'estetica-e-beleza', 'dr.ricardo-andrade');
const targetAssetsDir = path.join(targetDir, 'assets');

fs.mkdirSync(targetAssetsDir, { recursive: true });

// Copy all assets from template if not already present
const templateAssetsDir = path.join(templateDir, 'assets');
if (fs.existsSync(templateAssetsDir)) {
  fs.cpSync(templateAssetsDir, targetAssetsDir, { recursive: true });
  console.log('Copied template assets to dr.ricardo-andrade/assets!');
}

// Copy user images into targetAssetsDir too so everything is accessible via assets/
const userFiles = [
  '01-home-dr-ricardo-andrade-icone-agendamento.png',
  '01-home-dr-ricardo-andrade-imagem-youtube.png',
  '01-home-ricardo-andrade-logo-menu.png',
  'ricardo-andrade-imagem-doutor-principal.jpg',
  'ricardo-andrade-imagem-doutor-secundaria.jpg'
];

userFiles.forEach(f => {
  const src = path.join(targetDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(targetAssetsDir, f));
    console.log(`Copied ${f} to assets/${f}`);
  }
});
