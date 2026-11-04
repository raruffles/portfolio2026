const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const t10Raw = `A beleza autêntica nasce do equilíbrio perfeito entre rigor científico e sensibilidade artística. <br /><br /><strong>Com mais de três décadas de aprimoramento cirúrgico contínuo na Unicamp e centros internacionais, o Dr. Ricardo Andrade dedica-se a esculpir resultados harmônicos, naturais e duradouros, tratando a cirurgia plástica como uma nobre união de técnica precisa, ética inegociável e cuidado humano.</strong>`;

const t10Humanized = `Resultados naturais são fruto de décadas de sala de cirurgia, respeito rigoroso à anatomia e de um diálogo transparente sobre o que é viável para cada caso.<br /><br /><strong>Com mais de 30 anos de prática cirúrgica em Campinas, o Dr. Ricardo Andrade acompanha cada paciente com atenção direta em todas as etapas, desde a primeira consulta até a recuperação final.</strong>`;

const t60Raw = `<strong>Com formação acadêmica e residência médica no prestigiado Hospital de Clínicas da Unicamp, o Dr. Ricardo Andrade consolidou mais de 30 anos de atuação cirúrgica de excelência em Campinas-SP. Autor de mais de 70 artigos científicos publicados e participante de mais de 200 cursos de extensão no Brasil e no exterior, é pioneiro em protocolos de recuperação rápida R24R, mamas, rinoplastia e contorno corporal.</strong><br /><br /><strong>Em consultório acolhedor e privativo no Jardim Chapadão, cada paciente é atendido de forma individualizada e transparente, com foco em resultados elegantes que valorizam a autoestima. Agende sua consulta para conhecer de perto o plano cirúrgico sob medida para o seu bem-estar.</strong>`;

const t60Humanized = `<strong>Formado pela Unicamp em 1989 e com residência médica em cirurgia geral e plástica pelo Hospital de Clínicas, o Dr. Ricardo Andrade atua há mais de três décadas em Campinas. Autor de mais de 70 artigos científicos e com atuação constante em cirurgias de prótese com recuperação rápida R24R, mamas e face, atende pessoalmente no Jardim Chapadão.</strong><br /><br /><strong>Cada consulta é um espaço reservado e tranquilo para tirar dúvidas, alinhar expectativas realistas e construir um planejamento cirúrgico seguro para você.</strong>`;

if (html.includes(t10Raw)) {
  html = html.replace(t10Raw, t10Humanized);
  console.log('✓ T10 replaced successfully');
} else {
  console.log('✗ T10 not found');
}

if (html.includes(t60Raw)) {
  html = html.replace(t60Raw, t60Humanized);
  console.log('✓ T60 replaced successfully');
} else {
  console.log('✗ T60 not found');
}

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
