const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'assets', 'tilda-blocks-page38995148.min.css');
let css = fs.readFileSync(cssPath, 'utf8');

console.log('Original css length:', css.length);
if (css.includes('https://static.tildacdn.com/tild3766-6630-4863-b361-333561616230/Cormorant-SemiBoldIt.woff')) {
  css = css.replace(/https:\/\/static\.tildacdn\.com\/tild3766-6630-4863-b361-333561616230\/Cormorant-SemiBoldIt\.woff/g, './Cormorant-SemiBoldIt.woff');
  fs.writeFileSync(cssPath, css);
  console.log('Rewrote font URL in tilda-blocks-page38995148.min.css to local ./Cormorant-SemiBoldIt.woff');
} else {
  console.log('Font URL already replaced or not found');
}
