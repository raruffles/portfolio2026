const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const fonts = [
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b25bbe52d7a0de1262_Maax-Light.ttf', name: 'Maax-Light.ttf' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b3ca772d10c7e877dc_Maax.otf', name: 'Maax.otf' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8bb90c68aa2f629c077_Maax-Medium.otf', name: 'Maax-Medium.otf' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b26e91cb7c99f35f75_BradfordLL-Medium.otf', name: 'BradfordLL-Medium.otf' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f2b8b32d31c88ef57d34f6_Maax-Bold.otf', name: 'Maax-Bold.otf' }
];

const images = [
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f29bd64ed8bfee392f4c85_EverNails.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f29bd64ed8bfee392f4c85_EverNails-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c82e66acceebdf09f20_Service_Lash_Extensions_Ever_Main_header.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c82e66acceebdf09f20_Service_Lash_Extensions_Ever_Main_header-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c82e66acceebdf09f20_Service_Lash_Extensions_Ever_Main_header-p-800.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c82e66acceebdf09f20_Service_Lash_Extensions_Ever_Main_header-p-1080.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c82e66acceebdf09f20_Service_Lash_Extensions_Ever_Main_header-p-1600.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c7d7277987a4d6a6c6c_Service_Lash_Extensions_Ever_Personalize_your%20look.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c7d7277987a4d6a6c6c_Service_Lash_Extensions_Ever_Personalize_your%20look-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c94d519ae1be1fa1c1a_Service%20Lash%20Extensions_Ever.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c94d519ae1be1fa1c1a_Service%20Lash%20Extensions_Ever-p-500.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67fc9963ec1abbe58913940b_EVER%20textureArtboard%205.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353c99876ab74788614c50_Service%20Lash%20Extensions_Ever_why_matters_2.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67fc99642ea14342e387c3b6_EVER%20textureArtboard%202.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353ca0edbd3a67dbe50222_Service%20Lash%20Extensions_Ever_%20why_matters_3.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67fc99642ea14342e387c395_EVER%20textureArtboard%204.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353de9b20787c00e34e85d_Service%20Lash%20Extensions_Ever_single.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353de9b20787c00e34e85d_Service%20Lash%20Extensions_Ever_single-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353de9b20787c00e34e85d_Service%20Lash%20Extensions_Ever_single-p-800.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/6836d38a26f734a79ea171d3_Service%20Lash%20Extensions_Ever_%20hybrid.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/6836d38a26f734a79ea171d3_Service%20Lash%20Extensions_Ever_%20hybrid-p-500.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/6836d38a26f734a79ea171d3_Service%20Lash%20Extensions_Ever_%20hybrid-p-800.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/6836d38a26f734a79ea171d3_Service%20Lash%20Extensions_Ever_%20hybrid-p-1080.jpg',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e2be4d1450ea6e2bf40_Service%20Lash%20Extensions_Ever_natural_volume.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e2be4d1450ea6e2bf40_Service%20Lash%20Extensions_Ever_natural_volume-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e2be4d1450ea6e2bf40_Service%20Lash%20Extensions_Ever_natural_volume-p-800.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e4c7f15cafe06af9574_Service%20Lash%20Extensions_Ever_glam_volume.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e4c7f15cafe06af9574_Service%20Lash%20Extensions_Ever_glam_volume-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e4c7f15cafe06af9574_Service%20Lash%20Extensions_Ever_glam_volume-p-800.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e983eb6b4d2d57ff745_Service%20Lash%20Extensions_Ever_artisan%27s_choice.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353e983eb6b4d2d57ff745_Service%20Lash%20Extensions_Ever_artisan%27s_choice-p-500.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353ca8dd193d4600418e33_Service%20Lash%20Extensions_Ever_%20KOL_Cinta_Laura.avif',
  'https://cdn.prod.website-files.com/67f5fee5febd227226b7fb10/68353ca8dd193d4600418e33_Service%20Lash%20Extensions_Ever_%20KOL_Cinta_Laura-p-500.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02-p-500.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02-p-800.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02-p-1080.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02-p-1600.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/680a05f1151954a6decd8b99_Homepage%207%20CTA-02-p-2000.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67fc9d3fdadd41892ec65066_texture-paper.avif',
  'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68039b9c0f8de0d527dfe942_pexel%20.avif'
];

const otherFiles = [
  { url: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', name: 'swiper-bundle.min.css' },
  { url: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', name: 'swiper-bundle.min.js' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js', name: 'gsap.min.js' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js', name: 'ScrollTrigger.min.js' },
  { url: 'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js', name: 'jquery-3.5.1.min.js' },
  { url: 'https://cdn.prod.website-files.com/6330c0ebacf06abbc83b6eb3/64103732523ba652052e0223_lenis-bundled.txt', name: 'lenis.js' },
  { url: 'https://cdn.jsdelivr.net/gh/flowtricks/scripts@v1.0.4/variables-color-scroll.js', name: 'variables-color-scroll.js' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const assetsDir = path.join(__dirname, 'assets');
  const fontsDir = path.join(assetsDir, 'fonts');
  const imagesDir = path.join(assetsDir, 'images');

  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

  console.log('Downloading fonts...');
  for (const f of fonts) {
    const dest = path.join(fontsDir, f.name);
    try {
      await download(f.url, dest);
      console.log(`Downloaded font: ${f.name}`);
    } catch (e) {
      console.error(`Font download error ${f.name}:`, e.message);
    }
  }

  console.log('Downloading other files...');
  for (const f of otherFiles) {
    const dest = path.join(assetsDir, f.name);
    try {
      await download(f.url, dest);
      console.log(`Downloaded asset: ${f.name}`);
    } catch (e) {
      console.error(`Asset download error ${f.name}:`, e.message);
    }
  }

  console.log('Downloading images...');
  const imageMap = {};
  for (const imgUrl of images) {
    const rawName = path.basename(decodeURIComponent(imgUrl.split('?')[0]));
    // sanitize filename
    const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const dest = path.join(imagesDir, safeName);
    try {
      await download(imgUrl, dest);
      imageMap[imgUrl] = `assets/images/${safeName}`;
      console.log(`Downloaded image: ${safeName}`);
    } catch (e) {
      console.error(`Image download error ${safeName}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'image-map.json'), JSON.stringify(imageMap, null, 2));
  console.log('Done downloading assets!');
}

run();
