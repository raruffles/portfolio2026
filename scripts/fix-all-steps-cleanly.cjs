const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const stepsMapping = [
  // Card I
  { id: '1692638917640', text: '1. Primeira Consulta' },
  { id: '1692638917643', text: 'Conversamos com calma sobre suas dúvidas, histórico de saúde e o que você realmente deseja mudar.' },

  // Card II
  { id: '1692638917615', text: '2. Avaliação Anatômica' },
  { id: '1692638917617', text: 'Análise detalhada das proporções físicas para entender o que é esteticamente viável e seguro.' },

  // Card III
  { id: '1692638917588', text: '3. Planejamento Cirúrgico' },
  { id: '1692638917591', text: 'Definimos a técnica cirúrgica indicada e alinhamos expectativas reais sobre cada etapa do resultado.' },

  // Card IV
  { id: '1692638917561', text: '4. Preparo Pré-operatório' },
  { id: '1692638917565', text: 'Exames laboratoriais, avaliação de imagem e risco cardiológico antes de qualquer agendamento.' },

  // Card V
  { id: '1692638917539', text: '5. O Dia da Cirurgia' },
  { id: '1692638917542', text: 'Realizada exclusivamente em hospital geral com UTI e anestesiologia presente em tempo integral.' },

  // Card VI
  { id: '1692638917517', text: '6. Recuperação Imediata' },
  { id: '1692638917520', text: 'Protocolo de cuidados pós-operatórios para conforto e retorno gradual às suas atividades.' },

  // Card VII
  { id: '1692638917485', text: '7. Pós-operatório & Acompanhamento' },
  { id: '1692638917487', text: 'Consultas regulares no consultório para acompanhar sua cicatrização diretamente com o Dr. Ricardo.' }
];

stepsMapping.forEach(step => {
  // Regex targeting the exact element atom
  const regex = new RegExp(`(<div class=['"][^'"]*tn-elem[^'"]*${step.id}[^'"]*['"][^>]*>[\\s\\S]*?<div class=['"]tn-atom['"][^>]*>)[\\s\\S]*?(<\\/div>)`, 'g');
  if (regex.test(html)) {
    html = html.replace(regex, `$1${step.text}$2`);
    console.log(`✓ Set Step Elem ${step.id} -> "${step.text.substring(0, 30)}..."`);
  } else {
    console.log(`✗ Elem ${step.id} not found by regex`);
  }
});

fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
