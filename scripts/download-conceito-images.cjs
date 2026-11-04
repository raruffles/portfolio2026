const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, '..', 'clones', 'medicina-e-saude', 'conceito-saude', 'assets');

// Curated Unsplash free stock photos for Integrative Medicine, Lab, IV Therapy, Weight Loss, Hormone Replacement, and Doctors
const imageCatalog = [
  {
    name: 'conceito-hero-bg.jpg',
    desc: 'Hero background - wellness, vitality & integrative health clinic',
    urls: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&q=85'
    ]
  },
  {
    name: 'conceito-cta-bg.jpg',
    desc: 'CTA background - healthy active lifestyle & longevity',
    urls: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85'
    ]
  },
  {
    name: 'conceito-about.jpg',
    desc: 'About section - integrative medicine doctor consultation',
    urls: [
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // 9 Services
  {
    name: 'conceito-srv-1-integrativa.jpg',
    desc: 'Service 1: Saúde Integrativa (Medical consultation & holistic analysis)',
    urls: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-2-emagrecimento.jpg',
    desc: 'Service 2: Emagrecimento Avançado (Healthy body & fitness)',
    urls: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-3-soroterapia.jpg',
    desc: 'Service 3: Soroterapia & Injetáveis (IV drip / medical infusion)',
    urls: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583912267550-d44d7a125e7e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-4-hormonal.jpg',
    desc: 'Service 4: Reposição Hormonal (Vitamins, capsules & hormone balance)',
    urls: [
      'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-5-exames.jpg',
    desc: 'Service 5: Consultas & Exames (Clinical laboratory & blood tests)',
    urls: [
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-6-lipedema.jpg',
    desc: 'Service 6: Tratamento de Lipedema (Vascular & anti-inflammatory care)',
    urls: [
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-7-mounjaro.jpg',
    desc: 'Service 7: Suporte a Mounjaro (Essential vitamins & nutrition)',
    urls: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-8-performance.jpg',
    desc: 'Service 8: Performance & Hipertrofia (Strength & muscle mass)',
    urls: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    name: 'conceito-srv-9-longevidade.jpg',
    desc: 'Service 9: Longevidade & Prevenção (Stethoscope & preventative medicine)',
    urls: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    ]
  },
  // 4 Why Us Cards
  {
    name: 'conceito-why-1.jpg',
    desc: 'Why Us 1: Investigação Médica Completa',
    urls: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=930&q=85',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=930&q=85'
    ]
  },
  {
    name: 'conceito-why-2.jpg',
    desc: 'Why Us 2: Clínica & Laboratório no Mesmo Local',
    urls: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=930&q=85',
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=930&q=85'
    ]
  },
  {
    name: 'conceito-why-3.jpg',
    desc: 'Why Us 3: Protocolos de Soroterapia Exclusivos',
    urls: [
      'https://images.unsplash.com/photo-1583912267550-d44d7a125e7e?auto=format&fit=crop&w=930&q=85',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=930&q=85'
    ]
  },
  {
    name: 'conceito-why-4.jpg',
    desc: 'Why Us 4: Conduta Terapêutica Individualizada',
    urls: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=930&q=85',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=930&q=85'
    ]
  },
  // Testimonials Big Images & Avatars
  {
    name: 'conceito-testi-big-1.jpg',
    desc: 'Testimonials Big 1: Doctor consulting with happy patient',
    urls: [
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    name: 'conceito-testi-big-2.jpg',
    desc: 'Testimonials Big 2: Healthy radiant patient after weight loss & vitality',
    urls: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=85',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=85'
    ]
  },
  {
    name: 'conceito-avatar-1.jpg',
    desc: 'Lucas M. avatar',
    urls: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80']
  },
  {
    name: 'conceito-avatar-4.jpg',
    desc: 'Rodrigo P. avatar',
    urls: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80']
  },
  {
    name: 'conceito-avatar-5.jpg',
    desc: 'Carlos E. avatar',
    urls: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80']
  },
  // Team Doctors
  {
    name: 'conceito-team-1.jpg',
    desc: 'Dra. Daynith Oliveira - Female integrative medicine doctor',
    urls: [
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85'
    ]
  },
  {
    name: 'conceito-team-2.jpg',
    desc: 'Dr. Demetrio Sousa - Male weight loss & metabolism doctor',
    urls: [
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85'
    ]
  },
  {
    name: 'conceito-team-3.jpg',
    desc: 'Laboratório Conceito Saúde - Clinical diagnostic laboratory specialist',
    urls: [
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=85'
    ]
  },
  {
    name: 'conceito-team-4.jpg',
    desc: 'Dr. Rafael Costa - Nutrologia & Suplementação',
    urls: [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=85'
    ]
  },
  {
    name: 'conceito-team-5.jpg',
    desc: 'Dr. Lucas Almeida - Medicina Preventiva & Check-up',
    urls: [
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85'
    ]
  }
];

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of imageCatalog) {
    const dest = path.join(assetsDir, item.name);
    let success = false;
    for (const url of item.urls) {
      try {
        await downloadUrl(url, dest);
        const stat = fs.statSync(dest);
        if (stat.size > 5000) {
          console.log(`OK: ${item.name} (${Math.round(stat.size / 1024)} KB)`);
          success = true;
          break;
        }
      } catch (err) {
        console.warn(`Fallback needed for ${item.name}: ${err.message}`);
      }
    }
    if (!success) {
      console.error(`FAILED all URLs for ${item.name}`);
    }
  }
}

run();
