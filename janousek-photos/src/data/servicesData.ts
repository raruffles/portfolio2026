export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  scope: string[];
  deliverables: string[];
  idealFor: string;
  whatsappMessage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'casamentos',
    number: '01',
    title: 'Casamentos & Editorial Nupcial',
    shortDescription:
      'Cobertura completa e intimista do grande dia: do making of dos noivos à cerimônia e recepção, com sensibilidade fotojornalística e direção editorial de alta costura.',
    scope: [
      'Reunião de alinhamento de roteiro e momentos inegociáveis',
      'Cobertura de making of da noiva e noivo com luz natural',
      'Cerimônia religiosa ou civil com discrição protocolar',
      'Sessão exclusiva a dois no pôr do sol (Golden Hour)',
      'Registro caloroso e espontâneo da recepção e festa'
    ],
    deliverables: [
      'Galeria Completa em Alta Resolução (sem limite de fotos)',
      'Curadoria de Imagens Fine Art Tratadas Manualmente',
      'Diagramação e Confecção de Fotolivro com Capa Nobre',
      'Plataforma Online Privada para Seleção e Compartilhamento Familiar'
    ],
    idealFor: 'Casais que buscam um olhar atemporal, livre de clichês e com a segurança de um fotógrafo experiente.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de consultar disponibilidade de data e solicitar um orçamento para Casamento.'
  },
  {
    id: 'gestante-familia',
    number: '02',
    title: 'Ensaios de Gestante & Família',
    shortDescription:
      'Sessões ao ar livre em cenários como o Parque Roberto Burle Marx ou em locações privativas, registrando o ventre materno e conexões familiares com leveza e afeto genuíno.',
    scope: [
      'Consultoria prévia de figurinos, horários e paleta cromática',
      'Sessão relaxante de 2 horas no horário de melhor luz natural',
      'Direção acolhedora focada em abraços, toques e cumplicidade',
      'Acolhimento especial para irmãos mais velhos e pets'
    ],
    deliverables: [
      'Seleção de 40 a 60 Fotografias em Altíssima Resolução',
      'Tratamento Suave e Luminoso de Pele e Cores',
      'Álbum Livro de Gestante 25x25cm com Laminação Térmica',
      'Arquivos Prontos para Impressão e Redes Sociais'
    ],
    idealFor: 'Futuras mães e famílias que desejam eternizar a espera e os primeiros anos com naturalidade.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de agendar um Ensaio de Gestante / Família em São José dos Campos.'
  },
  {
    id: 'batizados',
    number: '03',
    title: 'Batizados & Cerimônias Sacras',
    shortDescription:
      'Registro reverente e atento do sacramento do batismo em paróquias históricas de São José dos Campos (Sagrada Família, São Dimas, N. Sra. de Fátima), captando o rito da luz com discrição.',
    scope: [
      'Chegada antecipada para conferência de luz da nave e pia batismal',
      'Fotografia com câmeras silenciosas e sem luz de flash invasiva',
      'Registro de todas as etapas litúrgicas (unção, água, vela e bênção)',
      'Retratos clássicos na pia batismal com padrinhos, pais e avós'
    ],
    deliverables: [
      'Cobertura Completa da Cerimônia Religiosa',
      'Mini Ensaio Pós-Cerimônia com Familiares',
      'Fotolivro Temático de Batismo com Acabamento Alvo',
      'Entrega Ágil para Envio a Familiares Distantes'
    ],
    idealFor: 'Pais e padrinhos que valorizam a sacralidade do momento e exigem pontualidade e discrição exemplar.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de um orçamento para Cobertura Fotográfica de Batizado.'
  },
  {
    id: 'corporativo',
    number: '04',
    title: 'Retratos Corporativos & Presença Executiva',
    shortDescription:
      'Construção de autoridade visual para executivos, médicos, advogados, lideranças e equipes corporativas no Parque Tecnológico, Novotel e sedes empresariais de SP e Vale do Paraíba.',
    scope: [
      'Estúdio móvel completo montado in-company com iluminação profissional',
      'Orientação de postura, queixo e olhar para transmitir confiança e empatia',
      'Retratos individuais em fundo neutro e fotos ambientadas em salas de reunião',
      'Cobertura de convenções, seminários e eventos industriais'
    ],
    deliverables: [
      'Headshots Corporativos em Fundo Neutro e Ambientalizado',
      'Tratamento Digital de Pele Natural de Alto Padrão (Sem aspecto artificial)',
      'Cessão de Direitos para Uso Institucional, Mídia e LinkedIn',
      'Versões Cortadas para Avatares e Aplicações Web'
    ],
    idealFor: 'Líderes de negócios, consultores, profissionais liberais e departamentos de marketing corporativo.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de contratar uma sessão de Retratos Corporativos / Evento Empresarial.'
  },
  {
    id: 'aniversarios-infantil',
    number: '05',
    title: 'Aniversários, 15 Anos & Smash the Cake',
    shortDescription:
      'Fotografia documental e espontânea das festas infantis e celebrações de 15 anos nos principais buffets de SJC (Splash, Pluft, Mini Golf, Giga Festa), com carinho e energia inesgotável com as crianças.',
    scope: [
      'Acompanhamento completo desde a decoração intacta até o parabéns',
      'Fotografia na altura das crianças para capturar olhares e saltos genuínos',
      'Sessão formal com a mesa do bolo antes do início da comemoração',
      'Cobertura atenta da recreação, oficinas e atrações especiais'
    ],
    deliverables: [
      'Todas as Fotos da Festa Entregues Tratadas em Alta Definição',
      'Fotolivro Infantil Capa Dura com Diagramação Divertida',
      'Link em Nuvem de Alta Velocidade para Compartilhar com Convidados'
    ],
    idealFor: 'Pais que querem curtir a festa sem se preocupar com celular e ter a garantia de um álbum impecável.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de um orçamento para Cobertura de Festa de Aniversário Infantil / 15 Anos.'
  },
  {
    id: 'fine-art-autoral',
    number: '06',
    title: 'Fotografia Autoral & Impressões Fine Art',
    shortDescription:
      'Curadoria e venda de tiragens limitadas de séries autorais premiadas pela CONFOTO e selecionadas pela Red Dot Editions, impressas em papéis de algodão museológicos.',
    scope: [
      'Consultoria para escolha de obras para projetos de arquitetura e interiores',
      'Impressão giclée sobre papel Hahnemühle Photo Rag 308g',
      'Controle rigoroso de fidelidade tonal e longevidade museológica (100+ anos)',
      'Embalagem e envio seguro com paspatur livre de ácido'
    ],
    deliverables: [
      'Impressão Fine Art Numerada com Certificado de Autenticidade Assinado',
      'Opções de Moldura em Madeira Maciça com Vidro Museu Anti-Reflexo',
      'Termo de Procedência do Fotoclube Câmera & Luz'
    ],
    idealFor: 'Arquitetos, designers de interiores, colecionadores e apreciadores de fotografia contemporânea autoral.',
    whatsappMessage: 'Olá Márcio Janousek! Gostaria de informações sobre Obras Autorais e Impressões Fine Art.'
  }
];
