const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// 1. Update Navigation menu items in rec638094695
const oldNavMenu = `<ul role="list" class="t450__list t-menu__list"> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/dr-ricardo/" target="_blank" data-menu-submenu-hook="" data-menu-item-number="1">
Dr. Ricardo
</a> </li> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/cirurgias/" target="_blank" data-menu-submenu-hook="" data-menu-item-number="2">
Rhinoplasty Solutions
</a> </li> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/resultados/" target="_blank" data-menu-submenu-hook="" data-menu-item-number="3">
Learning Centre
</a> </li> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/a-clinica/" target="_blank" data-menu-submenu-hook="" data-menu-item-number="4">
Out Of Town
</a> </li> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/contato/" target="_blank" data-menu-submenu-hook="" data-menu-item-number="5">
Contact
</a> </li> <li class="t450__list_item"> <a class="t-menu__link-item "
href="https://ricardoandrade.com.br/" data-menu-submenu-hook="" data-menu-item-number="6">
Fr
</a> </li> </ul>`;

const newNavMenu = `<ul role="list" class="t450__list t-menu__list">
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://ricardoandrade.com.br/dr-ricardo/" target="_blank" data-menu-item-number="1">Dr. Ricardo</a> </li>
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://ricardoandrade.com.br/a-clinica/" target="_blank" data-menu-item-number="2">A Clínica</a> </li>
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://ricardoandrade.com.br/cirurgias/" target="_blank" data-menu-item-number="3">Cirurgias</a> </li>
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://ricardoandrade.com.br/resultados/" target="_blank" data-menu-item-number="4">Resultados</a> </li>
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://ricardoandrade.com.br/contato/" target="_blank" data-menu-item-number="5">Contato</a> </li>
<li class="t450__list_item"> <a class="t-menu__link-item " href="https://bit.ly/2ZMsbYJ" target="_blank" data-menu-item-number="6" style="color:#d4af37;">WhatsApp</a> </li>
</ul>`;

if (html.includes('Rhinoplasty Solutions')) {
  html = html.replace(oldNavMenu, newNavMenu);
  console.log('Nav menu updated!');
} else {
  console.log('Nav menu pattern not matched directly, using regex replacement');
  html = html.replace(/Rhinoplasty Solutions/g, 'Cirurgias');
  html = html.replace(/Learning Centre/g, 'Resultados');
  html = html.replace(/Out Of Town/g, 'A Clínica');
  html = html.replace(/>\s*Contact\s*<\/a>/gi, '>Contato</a>');
}

// Hide the leftover En/Fr language block in rec638094695
html = html.replace(/class="t450__right_langs/g, 'style="display:none;" class="t450__right_langs');

// 2. In rec630428990: update "Cirurgia à Beleza" to "Cirurgia com Excelência"
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692621943803['"]>[\s\S]*?<\/div>/i, `<div class='tn-atom'field='tn_text_1692621943803'>com</div>`);
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692621943800['"]>[\s\S]*?<\/div>/i, `<div class='tn-atom'field='tn_text_1692621943800'>Excelência</div>`);

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('Nav and Mission adjustments saved!');
