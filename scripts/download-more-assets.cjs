const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2024/07/Mastopexia-Interna.jpg', name: 'mastopexia-interna.jpg' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2024/07/375-ml-de-Silicone.jpg', name: 'silicone-375ml.jpg' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/04/ricardo-andrade-imagem-protocolor24r-interna.jpg', name: 'protocolo-r24r.jpg' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/ricardo-andrade-imagem-rinoplastia-interna.png', name: 'rinoplastia-interna.png' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/ricardo-andrade-imagem-blefaroplastia-interna.jpg', name: 'blefaroplastia-interna.jpg' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/ricardo-andrade-imagem-cirurgia-interna.jpg', name: 'cirurgia-interna.jpg' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/01-home-ricardo-andrade-banner-desktop-01.png', name: 'hero-banner-01.png' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/01-home-ricardo-andrade-banner-desktop-02.png', name: 'hero-banner-02.png' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/07/ricardo-andrade-contato-imagem.png', name: 'contato-doutor.png' },
  { url: 'https://ricardoandrade.com.br/wp-content/uploads/2021/02/ricardo-andrade-dr-imagem-interna.jpg', name: 'doutor-interna.jpg' }
];

const destDir = path.resolve('clones/dr-ricardo/assets');

async function downloadFile(item) {
  const filePath = path.join(destDir, item.name);
  return new Promise((resolve) => {
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const fileStream = fs.createWriteStream(filePath);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${item.name} (${fs.statSync(filePath).size} bytes)`);
            resolve();
          });
        });
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${item.name} (${fs.statSync(filePath).size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Failed ${item.name}:`, err.message);
      resolve();
    });
  });
}

async function main() {
  for (const item of downloads) {
    await downloadFile(item);
  }
  console.log('All downloads completed!');
}

main();
