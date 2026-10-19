import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';

const assets = [
  // Casamentos & Editorial
  {
    folder: 'casamentos',
    filename: 'editorial-noiva.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/146449/ensaio-casamento-editorial-janousek-photos-11-22web.jpg'
  },
  {
    folder: 'casamentos',
    filename: 'making-of-noiva.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/68793/making-of-da-noiva-sjc-sp-janousek-photos-574-33.jpg'
  },
  {
    folder: 'casamentos',
    filename: 'wedding-love.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52607/_jmj5152.jpg'
  },
  {
    folder: 'casamentos',
    filename: 'monalisa-tiago.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52621/_jmj2945-2.jpg'
  },
  {
    folder: 'casamentos',
    filename: 'caio-nathalia-civil.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/albuns/110940/caio-e-nathalia1.jpg'
  },
  {
    folder: 'casamentos',
    filename: 'casamento-amanda-roberto.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/testimonials/casamento-amanda-e_roberto-janousek-photos-676-3.jpg'
  },

  // Ensaios & Lifestyle
  {
    folder: 'ensaios',
    filename: 'pin-up-leia.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/165923/lea-pin_up_banner.jpg'
  },
  {
    folder: 'ensaios',
    filename: 'ensaio-anne.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52579/_jmj4609-33.jpg'
  },
  {
    folder: 'ensaios',
    filename: 'adriele-ro.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52661/jmj_1115.jpg'
  },

  // Gestante & Família
  {
    folder: 'gestante-familia',
    filename: 'leticia-gestante.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52591/_jmj6479-4.jpg'
  },
  {
    folder: 'gestante-familia',
    filename: 'paloma-gestante.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52596/_jmj3306.jpg'
  },
  {
    folder: 'gestante-familia',
    filename: 'familia-renato.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52643/renato-1.jpg'
  },
  {
    folder: 'gestante-familia',
    filename: 'familia-lorena.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52584/_jmj4022-33333.jpg'
  },

  // Batizados & Cerimônias
  {
    folder: 'batizados',
    filename: 'maite-batizado.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52646/_jmj9109-2.jpg'
  },
  {
    folder: 'batizados',
    filename: 'joaquim-sagrada-familia.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/media/sagrada-famlia-batizado-sjc-joaquim-janousek-photos-220-2.jpg'
  },
  {
    folder: 'batizados',
    filename: 'capela-fatima.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52792/15129496_1248743141815428_8751419440052330_o.jpg'
  },

  // Autoral & Fine Art
  {
    folder: 'autoral-fineart',
    filename: 'o-equilibrista.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52614/_jmj0291-33.jpg'
  },
  {
    folder: 'autoral-fineart',
    filename: 'estudo-autoral-fineart.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/1075502/estudo-5.bjwebpg.jpg'
  },
  {
    folder: 'autoral-fineart',
    filename: 'feira-do-rolo.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/albuns/110905/img_2613.jpg'
  },

  // Aniversários & Infantil
  {
    folder: 'aniversarios',
    filename: 'sofia-1-ano.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/69402/splash-buffet-aniversario-sofia-janousek-photos-533banner.jpg'
  },
  {
    folder: 'aniversarios',
    filename: 'juju-smash-the-cake.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/69280/smash-the-cakejujujanousek-photos-254-banner.jpg'
  },
  {
    folder: 'aniversarios',
    filename: 'felipe-pluft-buffet.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/104646/pluft-buffet-infantil-janousek-photos-318.jpg'
  },
  {
    folder: 'aniversarios',
    filename: 'davi-3-anos.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/featured_images/52638/_jmj1355-23.jpg'
  },

  // Sobre / Retrato Marcio Janousek & Logo
  {
    folder: 'sobre',
    filename: 'marcio-janousek-perfil.jpg',
    url: 'https://storage.alboom.ninja/sites/3335/img/sobre/000_9174-janousekphotos2.jpg'
  },
  {
    folder: 'sobre',
    filename: 'logo-original.png',
    url: 'https://storage.alboom.ninja/sites/3335/img/logo/10.png'
  }
];

const targetBase = path.resolve('c:/portfólio/Portfólio-site/portfólio-raphael-codado-na-mão/janousek-photos/public/portfolio_assets');

function download(item) {
  return new Promise((resolve) => {
    const dir = path.join(targetBase, item.folder);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, item.filename);

    const client = item.url.startsWith('https') ? https : http;
    const req = client.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          const file = fs.createWriteStream(dest);
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded (redirect): ${item.filename}`);
            resolve(true);
          });
        }).on('error', (err) => {
          console.error(`Error redirect ${item.filename}:`, err.message);
          resolve(false);
        });
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${item.filename}`);
          resolve(true);
        });
      } else {
        console.error(`HTTP ${res.statusCode} for ${item.filename}`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.error(`Error requesting ${item.filename}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading Janousek Photos portfolio assets...');
  for (const item of assets) {
    await download(item);
  }
  console.log('Finished downloading assets!');
}

run();
