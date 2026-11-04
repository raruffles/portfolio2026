const fs = require('fs');

const liveHtml = fs.readFileSync('C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.system_generated/steps/930/output.txt', 'utf8');

const heroIdx = liveHtml.indexOf('class="hero-content"');
if (heroIdx > -1) {
  console.log('LIVE HTML HERO:');
  console.log(liveHtml.slice(heroIdx, heroIdx + 1000));
}
