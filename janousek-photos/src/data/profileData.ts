export interface ProfileConfig {
  name: string;
  brandTitle: string;
  roleDescription: string;
  location: string;
  addressFull: string;
  workingHours: string;
  serviceArea: string;
  status: string;
  manifesto: string[];
  workflowPillars: { number: string; title: string; description: string }[];
  credentials: { title: string; subtitle: string; tag: string }[];
  contacts: {
    phonePrimary: string;
    phoneSecondary: string;
    whatsappNumber: string;
    whatsappFormatted: string;
    email: string;
    instagram: string;
    instagramPersonal: string;
    websiteOfficial: string;
    address: string;
    city: string;
    cep: string;
  };
}

export const PROFILE: ProfileConfig = {
  name: 'Márcio Janousek',
  brandTitle: 'Janousek Photos',
  roleDescription: 'Fotografia Autoral, Casamentos & Retratos Corporativos',
  location: 'São José dos Campos — SP',
  addressFull: 'Rua das Rogérias, 33 - Jardim das Indústrias, São José dos Campos - SP, 12240-100',
  workingHours: 'Aberto · Fecha 20:00 (Segunda a Sábado)',
  serviceArea: 'São José dos Campos, Vale do Paraíba, Litoral Norte e proximidades',
  status: 'Agenda Aberta · São José dos Campos',
  manifesto: [
    'Acreditamos que a fotografia não é apenas o registro de um instante, mas a eternização da luz, do afeto e da verdade humana com sensibilidade artística e precisão estética.',
    'Iniciada na década de 1980 com processos analógicos e revelações manuais em laboratório, nossa trajetória une a disciplina da composição clássica à mais refinada tecnologia óptica contemporânea.',
    'Seja na solenidade de um casamento, no dinamismo de um retrato corporativo ou na quietude de uma obra autoral fine art, nosso compromisso é entregar imagens que superam o tempo com elegância inconfundível.'
  ],
  workflowPillars: [
    {
      number: '01',
      title: 'Sensibilidade & Escuta',
      description: 'Compreensão profunda das expectativas, valores familiares ou objetivos institucionais antes de apontar qualquer lente.'
    },
    {
      number: '02',
      title: 'Direção Natural & Espontaneidade',
      description: 'Condução discreta e acolhedora, deixando crianças, noivos e executivos confortáveis para que a emoção genuína prevaleça.'
    },
    {
      number: '03',
      title: 'Tratamento & Calibração Museológica',
      description: 'Edição artesanal de cores, contraste tonal e preservação de texturas, respeitando os padrões de impressão fine art.'
    },
    {
      number: '04',
      title: 'Álbuns & Fotolivros de Alta Durabilidade',
      description: 'Diagramação editorial personalizada e confecção com papéis nobres para guardar histórias para gerações inteiras.'
    }
  ],
  credentials: [
    {
      title: 'Red Dot Editions — Retratos #001',
      subtitle: 'Selecionado entre os 100 autores da prestigiada publicação coletiva de arte contemporânea.',
      tag: 'Reconhecimento Artístico'
    },
    {
      title: 'CONFOTO & Fotoclube Câmera e Luz',
      subtitle: 'Membro ativo com distinções e aceitações em salões nacionais da Confederação Brasileira de Fotografia.',
      tag: 'Filiação Oficial'
    },
    {
      title: 'PUC-Campinas Comunicação Social',
      subtitle: 'Formação em Publicidade e Propaganda, integrando visão estratégica e impacto visual de marca.',
      tag: 'Formação Acadêmica'
    },
    {
      title: 'Grandes Marcas & Clientes Corporativos',
      subtitle: 'Trabalhos para Bayer, Caixa Econômica, Hapvida, COREN-SP, OBMEP, Mars, Atimaky e Poliedro.',
      tag: 'Credibilidade Comercial'
    }
  ],
  contacts: {
    phonePrimary: '(12) 98804-0001',
    phoneSecondary: '(12) 3934-7090',
    whatsappNumber: '5512988040001',
    whatsappFormatted: '(12) 98804-0001',
    email: 'janousekphotos@gmail.com',
    instagram: 'https://www.instagram.com/janousekphotos/',
    instagramPersonal: 'https://www.instagram.com/janousekmarcio/',
    websiteOfficial: 'https://www.janousekphotos.com.br/',
    address: 'Rua das Rogérias, 33 - Jardim das Indústrias',
    city: 'São José dos Campos - SP',
    cep: '12240-100'
  }
};
