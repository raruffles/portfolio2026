const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const targetBlock = `<div class='t396__elem tn-elem tn-elem__6305761351692781161547' data-elem-id='1692781161547' data-elem-type='image' data-field-top-value="660" data-field-left-value="-194" data-field-width-value="127" data-field-axisy-value="top" data-field-axisx-value="right" data-field-container-value="window" data-field-topunits-value="px" data-field-leftunits-value="px" data-field-heightunits-value="" data-field-widthunits-value="px" data-field-filewidth-value="127" data-field-fileheight-value="21" data-field-top-res-320-value="774" data-field-left-res-320-value="-90" data-field-top-res-480-value="745" data-field-left-res-480-value="-163" data-field-top-res-640-value="1025" data-field-left-res-640-value="-34" data-field-left-res-960-value="-42" data-field-container-res-960-value="grid"> <a class='tn-atom' href="https://ricardoandrade.com.br/dr-ricardo/" target="_blank"> <img class='tn-atom__img t-img' src="assets/photo.svg" data-original="assets/photo.svg" alt='' imgfield='tn_img_1692781161547' /> </a> </div>`;

const newBlock = `<div class='t396__elem tn-elem tn-elem__6305761351692781161547' data-elem-id='1692781161547' data-elem-type='text' data-field-top-value="660" data-field-left-value="-240" data-field-width-value="220" data-field-axisy-value="top" data-field-axisx-value="right" data-field-container-value="window" data-field-topunits-value="px" data-field-leftunits-value="px" data-field-heightunits-value="" data-field-widthunits-value="px"> <a class='tn-atom' href="https://ricardoandrade.com.br/dr-ricardo/" target="_blank" style="text-decoration:none; display: inline-flex; align-items: center; gap: 8px; font-family: Arial, sans-serif; font-size: 15px; font-weight: 700; color: #1a1b1c; letter-spacing: 0.5px;">CONHEÇA O DOUTOR <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6H17M17 6L12 1M17 6L12 11" stroke="#1A1B1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a> </div>`;

if (html.includes(targetBlock)) {
  html = html.replace(targetBlock, newBlock);
  console.log('✓ Target block replaced with Portuguese CONHEÇA O DOUTOR link!');
} else {
  console.log('✗ Target block not found directly, searching flexible pattern...');
  const flexRegex = /<div class=['"]t396__elem tn-elem[^'"]*tn-elem__6305761351692781161547['"][\s\S]*?src=["']assets\/photo\.svg["'][\s\S]*?<\/div>/;
  if (flexRegex.test(html)) {
    html = html.replace(flexRegex, newBlock);
    console.log('✓ Replaced via flexible regex!');
  } else {
    console.log('✗ Flexible regex did not match.');
  }
}

// Hide the redundant hover layer
html = html.replace(/#rec630576135 \.tn-elem\[data-elem-id="1692637839362"\]\s*\{[^}]*\}/g, '#rec630576135 .tn-elem[data-elem-id="1692637839362"] { display: none !important; }');

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
