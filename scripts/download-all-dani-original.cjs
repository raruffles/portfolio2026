const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'clones', 'arquitetura', 'decor-dani-melo');
const chunkDir = path.join(targetDir, '_next', 'static', 'chunks');
const mediaDir = path.join(targetDir, '_next', 'static', 'media');
const imgDir = path.join(targetDir, 'images');

fs.mkdirSync(chunkDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => {
        ws.close();
        console.log(`Saved: ${url}`);
        resolve();
      });
    }).on('error', reject);
  });
}

const chunks = [
  '03vcybz4ldxd4.js',
  '10u3y4bw1ayzs.js',
  'turbopack-0kroxf~4lmog9.js',
  '0fsi8lw5utejl.js',
  '0d3tkj33oycf2.js',
  '0tuze1pbf5c31.js',
  '03~yq9q893hmn.js',
  '11qk_vpw_zwkf.js',
  '07p.y134brcee.css',
];

const media = [
  'caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2',
  'fef07dbb0973bf53-s.12tyk43_3sh9u.woff2',
  '8a480f0b521d4e75-s.0jzbimsg8vl84.woff2',
  '53b9e256198e5412-s.0-wfv7uh4i7h9.woff2',
  '7178b3e590c64307-s.0nx0ww8fni_q3.woff2',
];

const images = [
  'portrait-01.jpg',
  'portrait-02.jpg',
  'project-01.jpg',
  'project-02.jpg',
  'project-03.jpg',
];

async function run() {
  console.log('Downloading chunks...');
  for (const c of chunks) {
    const url = `https://decor-dani-melo.vercel.app/_next/static/chunks/${c}`;
    const dest = path.join(chunkDir, c);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log('Downloading media...');
  for (const m of media) {
    const url = `https://decor-dani-melo.vercel.app/_next/static/media/${m}`;
    const dest = path.join(mediaDir, m);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log('Downloading images...');
  for (const img of images) {
    const url = `https://decor-dani-melo.vercel.app/images/${img}`;
    const dest = path.join(imgDir, img);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(e.message);
    }
  }

  // Also download favicon and source.html fresh
  await download('https://decor-dani-melo.vercel.app/favicon.svg', path.join(targetDir, 'favicon.svg'));
  await download('https://decor-dani-melo.vercel.app/', path.join(targetDir, 'source.html'));

  console.log('All files downloaded successfully!');
}

run();
