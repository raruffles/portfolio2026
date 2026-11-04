const fs = require('fs');
const path = require('path');
const https = require('https');

const ASSETS_DIR = path.join(__dirname, '..', 'clones', 'nova-dental', 'assets');
const webflowJs = fs.readFileSync(path.join(ASSETS_DIR, 'webflow.min.js'), 'utf8');

// Find all .js chunk names in webflow.min.js
const chunkMatches = [...webflowJs.matchAll(/webflow\.achunk\.[a-f0-9]+\.js/g)].map(m => m[0]);
const uniqueChunks = [...new Set(chunkMatches)];
console.log('Found chunks in webflow.min.js:', uniqueChunks);

// Base CDN for webflow js
const CDN_BASE = 'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/js/';

async function downloadChunk(chunkName) {
  const url = CDN_BASE + chunkName;
  const target = path.join(ASSETS_DIR, chunkName);
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(target);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded chunk:', chunkName);
          resolve(true);
        });
      } else {
        console.error(`Failed ${chunkName} (${res.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error ${chunkName}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const chunk of uniqueChunks) {
    await downloadChunk(chunk);
  }
}

run();
