export interface ProfileConfig {
  name: string;
  brandTitle: string;
  roleDescription: string;
  location: string;
  status: string;
  manifesto: string[];
  workflowPillars: { number: string; title: string; description: string }[];
  tools: { name: string; category: string }[];
  contacts: {
    whatsappNumber: string;
    whatsappFormatted: string;
    email: string;
    instagram: string;
    behance: string;
    linkedin: string;
    isPlaceholderContact: boolean;
  };
}

export const PROFILE: ProfileConfig = {
  name: 'Xandy Alves',
  brandTitle: 'Xandy Alves Artes',
  roleDescription: 'Designer Gráfico, Ilustrador & Especialista em Identidade Visual',
  location: 'Brasil / Atendimento Remoto Global',
  status: 'Disponível para novos projetos',
  manifesto: [
    'Acreditamos que o design não é mera decoração estética, mas uma ponte estratégica entre a expressão autoral e a relevância comercial de uma marca.',
    'Cada traço de ilustração e cada decisão tipográfica devem cumprir um propósito claro: encantar o olhar humano e resolver as necessidades reais do negócio com autenticidade inconfundível.',
    'Trabalhamos de forma próxima e colaborativa com nossos clientes, combinando rigor técnico com sensibilidade artística para transformar ideias brutas em linguagens visuais memoráveis.'
  ],
  workflowPillars: [
    {
      number: '01',
      title: 'Diagnóstico & Imersão',
      description: 'Análise aprofundada do universo da marca, objetivos comerciais, público-alvo e referências estéticas para nortear o projeto com precisão.'
    },
    {
      number: '02',
      title: 'Exploração Conceitual',
      description: 'Geração de ideias, esboços manuais e digitais, explorações tipográficas e paletas cromáticas com foco em originalidade.'
    },
    {
      number: '03',
      title: 'Refinamento & Aplicação',
      description: 'Lapidação técnica em ferramentas vetoriais, criação de mockups foto-realistas e validação de legibilidade em múltiplas escalas.'
    },
    {
      number: '04',
      title: 'Entrega Técnica & Suporte',
      description: 'Organização rigorosa de arquivos em todas as extensões para web e gráfica, acompanhada de manual e suporte na implementação.'
    }
  ],
  tools: [
    { name: 'Adobe Illustrator', category: 'Vetor & Branding' },
    { name: 'Adobe Photoshop', category: 'Tratamento & Pintura' },
    { name: 'Procreate', category: 'Ilustração Digital' },
    { name: 'Adobe InDesign', category: 'Diagramação & Editorial' },
    { name: 'Figma', category: 'Design de Interfaces & Social' },
    { name: 'After Effects', category: 'Motion Design Básico' }
  ],
  contacts: {
    whatsappNumber: '5511999999999', // Placeholder configurável
    whatsappFormatted: '(11) 99999-9999',
    email: 'contato@xandyalvesartes.com.br',
    instagram: 'https://instagram.com/xandyalvesartes',
    behance: 'https://behance.net/xandyalvesartes',
    linkedin: 'https://linkedin.com/in/xandyalvesartes',
    isPlaceholderContact: true // Indica claramente que aguarda dados oficiais
  }
};
