const fs = require('fs');
const https = require('https');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

// Curated aesthetic/plastic surgery Unsplash images (verified free Unsplash IDs)
const images = [
  // Elegant aesthetic silhouette / body contour / mamoplasty
  {
    name: 'procedimento-mamoplastia.jpg',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  // Surgery / Operating room / modern medical hospital
  {
    name: 'centro-cirurgico.jpg',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
  },
  // Body contour / wellness / abdominoplasty
  {
    name: 'contorno-corporal.jpg',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  },
  // Consultation / Doctor listening to patient
  {
    name: 'consulta-medica.jpg',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'
  },
  // Facial aesthetics / smooth skin / harmonização
  {
    name: 'harmonizacao-facial.jpg',
    url: 'https://images.unsplash.com/photo-1512290900672-1f4a956d396a?auto=format&fit=crop&w=800&q=80'
  },
  // Patient avatar 1
  {
    name: 'paciente-avatar-1.jpg',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80'
  },
  // Patient avatar 2
  {
    name: 'paciente-avatar-2.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80'
  },
  // Patient avatar 3
  {
    name: 'paciente-avatar-3.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80'
  },
  // Patient avatar 4
  {
    name: 'paciente-avatar-4.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
  },
  // Patient avatar 5
  {
    name: 'paciente-avatar-5.jpg',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80'
  }
];

async function run() {
  const destDir1 = 'clones/estetica-e-beleza/dr.ricardo-andrade/assets';
  const destDir2 = 'previas/dr-ricardo-andrade/assets';
  for (const img of images) {
    const p1 = path.join(destDir1, img.name);
    const p2 = path.join(destDir2, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await download(img.url, p1);
      fs.copyFileSync(p1, p2);
      console.log(`Downloaded ${img.name} (${fs.statSync(p1).size} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${img.name}:`, e.message);
    }
  }
}

run();
