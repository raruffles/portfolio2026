const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

// 1. Fix malformed Cuidados Além da
html = html.replace('Cuidados Além da< <br/>/div>', 'Cuidados Além da');

// 2. Fix We love / your face across all occurrences
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692631697352['"]>We love<\/div>/g, "<div class='tn-atom'field='tn_text_1692631697352'>Cuidamos da sua</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692631697348['"]>your face<\/div>/g, "<div class='tn-atom'field='tn_text_1692631697348'>Autoestima</div>");

html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692961953399['"]>We love<\/div>/g, "<div class='tn-atom'field='tn_text_1692961953399'>Agende sua</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692961953396['"]>your face<\/div>/g, "<div class='tn-atom'field='tn_text_1692961953396'>Consulta</div>");

// 3. Fix results in procedures section
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692788044575['"]>\s*results<\/div>/g, "<div class='tn-atom'field='tn_text_1692788044575'>Resultados</div>");

// 4. Fix rec630579574 quote atoms
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146857['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146857'>A excelência médica é</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146860['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146860'>o fruto harmônico</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146863['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146863'>ciência</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146876['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146876'>assim como</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146879['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146879'>de alta precisão e cuidado,</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146883['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146883'>da</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146886['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146886'>A Arte</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692638146889['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692638146889'>da Cirurgia Plástica</div>");

// Mobile/tablet quote atoms
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692795466191['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692795466191'>A excelência médica é</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692795438081['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692795438081'>o fruto</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692795510405['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692795510405'>da ciência</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692795506286['"]>[\s\S]*?<\/div>/g, "<div class='tn-atom'field='tn_text_1692795506286'>e do cuidado humano,</div>");

// 5. Fix Footer
html = html.replace(
  /Rua Dr\. Barbosa de Andrade, 485<br>Campinas-SP, QC\. H2V 0B2/g,
  'Rua Dr. Barbosa de Andrade, 485 – Jd. Chapadão<br>Campinas/SP – CEP 13070-158'
);
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1692780820377['"]>Navigation<\/div>/g, "<div class='tn-atom'field='tn_text_1692780820377'>Navegação</div>");
html = html.replace(/<div class=['"]tn-atom['"]field=['"]tn_text_1717666809889['"]>Our Services<\/div>/g, "<div class='tn-atom'field='tn_text_1717666809889'>Procedimentos</div>");

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
console.log('REMAINING TEXT FIXES APPLIED SUCCESSFULLY!');
