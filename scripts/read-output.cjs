const fs = require('fs');
const content = fs.readFileSync('C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.system_generated/steps/930/output.txt', 'utf8');
console.log('Length:', content.length);
console.log('First 500 chars:', content.slice(0, 500));
