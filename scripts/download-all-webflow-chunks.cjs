const fs = require('fs');
const path = require('path');
const https = require('https');

const ASSETS_DIR = path.join(__dirname, '..', 'clones', 'nova-dental', 'assets');
const webflowJs = fs.readFileSync(path.join(ASSETS_DIR, 'webflow.min.js'), 'utf8');

const match = webflowJs.match(/r\.u=e=>"webflow\.achunk\."\+\(\{([^}]+)\}\)\[e\]\+"\.js"/);
if (!match) {
  console.error('Could not match chunk map');
  process.exit(1);
}

const mapStr = '{' + match[1] + '}';
const chunkMap = eval('(' + mapStr + ')');
console.log('Chunk map:', chunkMap);

const CDN_BASE = 'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/js/';

async function downloadChunk(chunkId, hash) {
  const filename = `webflow.achunk.${hash}.js`;
  const url = CDN_BASE + filename;
  const target = path.join(ASSETS_DIR, filename);

  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(target);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded chunk ${chunkId}: ${filename}`);
          resolve(true);
        });
      } else {
        console.error(`Failed ${filename} (${res.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error ${filename}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const [id, hash] of Object.entries(chunkMap)) {
    await downloadChunk(id, hash);
  }
  console.log('Finished downloading all chunks.');
}

run();
