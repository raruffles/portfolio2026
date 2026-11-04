const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'clones', 'arquitetura', 'decor-dani-melo');
const mediaDir = path.join(targetDir, '_next', 'static', 'media');

const fontFiles = [
  'fef07dbb0973bf53-s.12tyk43_3sh9u.woff2',
  '8a480f0b521d4e75-s.0jzbimsg8vl84.woff2',
  '53b9e256198e5412-s.0-wfv7uh4i7h9.woff2',
  '7178b3e590c64307-s.0nx0ww8fni_q3.woff2',
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${url} -> ${dest}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const f of fontFiles) {
    const url = `https://decor-dani-melo.vercel.app/_next/static/media/${f}`;
    const dest = path.join(mediaDir, f);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Error downloading ${url}:`, e.message);
    }
  }
  console.log('All fonts downloaded!');
}

run();
