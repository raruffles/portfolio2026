const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://www.facetasdental.com.br/';
const DEST_DIR = path.join(__dirname, 'facetasdental-ref', 'assets');

const files = [
  'assets/img/corpo/LOGOTIPO_mini.png',
  'assets/img/corpo/DSC01351.jpg',
  'assets/img/corpo/2022-09-26.jpg',
  'assets/img/corpo/max-03.jpg',
  'assets/img/corpo/background-cel.jpg',
  'assets/img/galeria/ft01.jpg',
  'assets/img/galeria/ft02.jpg',
  'assets/img/galeria/ft03.jpg',
  'assets/img/galeria/fto05.jpg',
  'assets/img/galeria/fto06.jpg',
  'assets/img/galeria/ft04.jpg',
  'assets/img/galeria/landing.jpg',
  'assets/img/galeria/landing-04.jpg',
  'assets/img/galeria/landing-03.jpg',
  'assets/img/galeria/landing-05.jpg',
  'assets/img/galeria/landing-08.jpg',
  'assets/img/galeria/landing-06.jpg',
  'assets/img/depoimentos/grade-xl.jpg',
  'assets/img/depoimentos/depoimento (10).jpg',
  'assets/img/depoimentos/11212323.jpg',
  'assets/img/depoimentos/11212324.jpg',
  'assets/img/depoimentos/11212314.jpg',
  'assets/img/depoimentos/11212321.jpg',
  'assets/img/depoimentos/11212322.jpg',
  'assets/img/depoimentos/11212311.jpg'
];

async function downloadFile(relPath) {
  const url = new URL(encodeURI(relPath), BASE_URL).href;
  const localPath = path.join(__dirname, 'facetasdental-ref', relPath.replace(/\//g, path.sep));
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const fileStream = fs.createWriteStream(localPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Downloaded:', relPath);
          resolve(true);
        });
      } else {
        console.error(`Failed ${relPath}: status ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error ${relPath}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const f of files) {
    await downloadFile(f);
  }
  console.log('Finished downloading facetasdental assets.');
}

run();
