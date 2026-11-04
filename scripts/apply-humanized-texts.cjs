const fs = require('fs');
let html = fs.readFileSync('clones/dr-ricardo/index.html', 'utf8');

const replacements = [
  // 1. Mission section
  {
    target: `Exaltar a beleza e promover o aumento da autoestima de forma ética, buscando o bem-estar e a felicidade dos pacientes com tecnologias atualizadas e otimização do conhecimento. Nosso foco é a busca contínua em atingir um nível elevado em excelência no atendimento e resultado cirúrgico.`,
    replacement: `A cirurgia plástica não deve transformar quem você é, mas resgatar a sua segurança de forma ética e natural. Há mais de 30 anos, meu compromisso é unir técnica cirúrgica precisa a um cuidado próximo e honesto, explicando com clareza cada detalhe do seu tratamento.`
  },
  {
    target: `Dr. Ricardo Andrade é cirurgião plástico especialista formado pela Unicamp, com mais de 30 anos de excelência, dedicação e aperfeiçoamento contínuo em Campinas e região.`,
    replacement: `Cirurgião plástico formado pela Unicamp em 1989, com mais de três décadas dedicadas à cirurgia plástica reconstrutora e estética em Campinas e região.`
  },

  // 2. Philosophy section
  {
    target: `A beleza autêntica nasce do equilíbrio perfeito entre rigor científico e sensibilidade artística. Com mais de 30 anos de prática cirúrgica, o Dr. Ricardo Andrade une conhecimento profundo, ética inegociável e tecnologia para entregar resultados harmônicos que respeitam a individualidade de cada paciente.`,
    replacement: `Resultados naturais são fruto de décadas de sala de cirurgia, respeito rigoroso à anatomia e diálogo transparente sobre o que é viável para cada caso. Nosso compromisso é com a sua saúde, segurança e tranquilidade.`
  },
  {
    target: `não é apenas um procedimento cirúrgico, mas uma arte médica que exige paixão, precisão milimétrica e`,
    replacement: `exige critério cirúrgico rigoroso, bom senso estético e escuta atenta desde a primeira conversa no consultório.`
  },
  {
    target: `Seriedade e excelência médica:`,
    replacement: `Medicina com responsabilidade:`
  },

  // 3. Form section
  {
    target: `Nosso propósito é valorizar a sua essência com técnicas consagradas e total segurança.`,
    replacement: `Tire suas dúvidas ou agende sua avaliação presencial com nossa equipe em Campinas.`
  },

  // 4. Bio section
  {
    target: `Com formação acadêmica e residência médica no prestigiado Hospital de Clínicas da Unicamp, o Dr. Ricardo Andrade consolidou mais de 30 anos de atuação cirúrgica de excelência em Campinas-SP. Autor de mais de 70 artigos científicos publicados e participante de mais de 200 cursos de extensão no Brasil e no exterior, é pioneiro em protocolos de recuperação rápida R24R, mamas, rinoplastia e contorno corporal. Em consultório acolhedor e privativo no Jardim Chapadão, cada paciente é atendido de forma individualizada e transparente, com foco em resultados elegantes que valorizam a autoestima. Agende sua consulta para conhecer de perto o plano cirúrgico sob medida para o seu bem-estar.`,
    replacement: `Formado em medicina pela Unicamp em 1989, com residência em cirurgia geral e plástica pelo Hospital de Clínicas, o Dr. Ricardo Andrade atua há mais de 30 anos em Campinas. Autor de mais de 70 artigos científicos e com atualização constante em técnicas como o protocolo R24R de mama e cirurgias faciais, atende pessoalmente no Jardim Chapadão. Aqui, cada consulta é um espaço de escuta para alinhar expectativas com transparência e planejar seu procedimento com total segurança.`
  },

  // 5. Steps (Jornada)
  {
    target: `1. Avaliação Detalhada e Humanizada`,
    replacement: `1. Primeira Consulta`
  },
  {
    target: `Consulta médica atenciosa e privativa para compreender suas metas e planejar sua cirurgia.`,
    replacement: `Conversamos com calma sobre suas dúvidas, histórico de saúde e o que você realmente deseja mudar.`
  },
  {
    target: `2. Planejamento Sob Medida`,
    replacement: `2. Planejamento Individual`
  },
  {
    target: `Definição precisa da técnica mais indicada para o seu biotipo, com total alinhamento de expectativas.`,
    replacement: `Escolhemos a técnica indicada para a sua anatomia, explicando com clareza o que é possível alcançar.`
  },
  {
    target: `3. Exames & Segurança Rigorosa`,
    replacement: `3. Preparo Pré-operatório`
  },
  {
    target: `Bateria completa de exames pré-operatórios e risco cirúrgico para sua máxima tranquilidade.`,
    replacement: `Exames de sangue, imagem e avaliação de risco cardiológico antes de qualquer agendamento cirúrgico.`
  },
  {
    target: `Procedimento em hospital estruturado de ponta em Campinas com anestesiologia dedicada.`,
    replacement: `Cirurgias realizadas apenas em hospitais estruturados com UTI e suporte anestésico integral.`
  },
  {
    target: `Cirurgia em hospital de ponta em Campinas com anestesiologia dedicada.`,
    replacement: `Cirurgias realizadas apenas em hospitais estruturados com UTI e suporte anestésico integral.`
  },
  {
    target: `5. Recuperação Acelerada`,
    replacement: `5. Recuperação Acompanhada`
  },
  {
    target: `Protocolo de retorno rápido às atividades com máximo conforto e segurança.`,
    replacement: `Protocolo para alívio do desconforto e orientações claras para retorno gradual à sua rotina.`
  },
  {
    target: `6. Cuidado Pós-Operatório`,
    replacement: `6. Pós-operatório Próximo`
  },
  {
    target: `Acompanhamento contínuo e sessões para otimizar a sua cicatrização.`,
    replacement: `Retornos regulares no consultório para acompanhar a cicatrização diretamente com o Dr. Ricardo.`
  },

  // 6. Manifesto quote
  {
    target: `de alta precisão e cuidado,`,
    replacement: `do rigor técnico,`
  },
  {
    target: `e do cuidado humano,`,
    replacement: `e do respeito à sua saúde,`
  },
  {
    target: `o fruto harmônico`,
    replacement: `o resultado direto`
  },

  // 7. Results banner
  {
    target: `TRANSFORMAÇÕES REAIS E PROCEDIMENTOS DE EXCELÊNCIA`,
    replacement: `PROCEDIMENTOS PLANEJADOS PARA A SUA ANATOMIA`
  },
  {
    target: `PASSE O MOUSE OU TOQUE PARA EXPLORAR RESULTADOS`,
    replacement: `PASSE O MOUSE OU TOQUE PARA CONHECER OS PROCEDIMENTOS`
  },

  // 8. Procedure descriptions
  {
    target: `Recuperação rápida em 24h com estabilidade e precisão muscular`,
    replacement: `Prótese de mama com recuperação em 24h, estabilidade muscular e retorno precoce`
  },
  {
    target: `Harmonia e refinamento facial com rejuvenescimento do olhar`,
    replacement: `Rinoplastia estruturada e cirurgia de pálpebras com traços naturais e harmônicos`
  },
  {
    target: `Mastopexia, mamoplastia e contorno mamário com prótese de recuperação rápida R24R`,
    replacement: `Mastopexia com ou sem prótese, mamoplastia redutora e recuperação rápida R24R`
  },
  {
    target: `Tecnologias cirúrgicas modernas para contorno corporal, Mini Lipo a Laser e Abdominoplastia`,
    replacement: `Abdominoplastia e lipoaspiração a laser para contorno corporal proporcional`
  },
  {
    target: `Cirurgias faciais de rejuvenescimento: Frontoplastia, Lifting Facial e Otoplastia`,
    replacement: `Lifting facial, frontoplastia e otoplastia para rejuvenescimento suave da face`
  },
  {
    target: `Procedimentos dermatológicos avançados: Toxina Botulínica, Preenchimentos e Laser`,
    replacement: `Toxina botulínica, preenchimento com ácido hialurônico e laser facial`
  },
  {
    target: `Atendimento personalizado respeitando a diversidade anatômica e os objetivos de cada paciente`,
    replacement: `Atendimento individual que respeita a estrutura anatômica e as prioridades de cada paciente`
  },
  {
    target: `à sua individualidade, proporções e biotipo único com total harmonia`,
    replacement: `às suas proporções físicas e aos seus objetivos com máxima harmonia`
  },

  // 9. Patients from other cities
  {
    target: `oferece suporte com Teleconsultas e planejamento para pacientes de toda a região, Grande SP e outros estados.`,
    replacement: `oferece teleconsulta prévia para orientar exames e planejar sua cirurgia em Campinas com praticidade.`
  },

  // 10. WhatsApp footer call
  {
    target: `Fale diretamente com nossa equipe via WhatsApp para agendar sua consulta: (19) 98928-0809 ou ligue para (19) 3242-2777`,
    replacement: `Para agendar uma consulta ou tirar dúvidas sobre procedimentos, fale com nossa equipe pelo WhatsApp no (19) 98928-0809 ou ligue para (19) 3242-2777`
  }
];

let appliedCount = 0;
replacements.forEach((r, idx) => {
  if (html.includes(r.target)) {
    // replace all occurrences
    html = html.split(r.target).join(r.replacement);
    appliedCount++;
    console.log(`✓ [${idx + 1}] Applied replacement for: "${r.target.substring(0, 40)}..."`);
  } else {
    console.log(`✗ [${idx + 1}] Not found: "${r.target.substring(0, 40)}..."`);
  }
});

console.log(`\nApplied ${appliedCount} of ${replacements.length} replacements.`);
fs.writeFileSync('clones/dr-ricardo/index.html', html, 'utf8');
