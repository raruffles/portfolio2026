const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'clones', 'arquitetura', 'decor-dani-melo');
const imgDir = path.join(targetDir, 'images');
const cssDir = path.join(targetDir, '_next', 'static', 'chunks');
const mediaDir = path.join(targetDir, '_next', 'static', 'media');

fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(cssDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });

// Copy the rendered HTML from output.txt or fetch it fresh
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
  const assets = [
    { url: 'https://decor-dani-melo.vercel.app/images/portrait-01.jpg', dest: path.join(imgDir, 'portrait-01.jpg') },
    { url: 'https://decor-dani-melo.vercel.app/images/portrait-02.jpg', dest: path.join(imgDir, 'portrait-02.jpg') },
    { url: 'https://decor-dani-melo.vercel.app/images/project-01.jpg', dest: path.join(imgDir, 'project-01.jpg') },
    { url: 'https://decor-dani-melo.vercel.app/images/project-02.jpg', dest: path.join(imgDir, 'project-02.jpg') },
    { url: 'https://decor-dani-melo.vercel.app/images/project-03.jpg', dest: path.join(imgDir, 'project-03.jpg') },
    { url: 'https://decor-dani-melo.vercel.app/favicon.svg', dest: path.join(targetDir, 'favicon.svg') },
    { url: 'https://decor-dani-melo.vercel.app/_next/static/chunks/07p.y134brcee.css', dest: path.join(cssDir, '07p.y134brcee.css') },
    { url: 'https://decor-dani-melo.vercel.app/_next/static/media/caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2', dest: path.join(mediaDir, 'caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2') }
  ];

  for (const asset of assets) {
    try {
      await download(asset.url, asset.dest);
    } catch (e) {
      console.error(`Error downloading ${asset.url}:`, e.message);
    }
  }

  // Also fetch the root HTML directly
  try {
    await download('https://decor-dani-melo.vercel.app/', path.join(targetDir, 'source.html'));
  } catch (e) {
    console.error('Error downloading source.html:', e.message);
  }

  console.log('Finished downloading assets!');
}

run();
