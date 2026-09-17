import { VideoItem, TrackItem, GalleryItem, ShowItem, InstagramProfile } from '../types';

export const ARTIST_INFO = {
  name: 'GUUH SC',
  legalName: 'Gustavo da Silva',
  role: 'Cantor, MC & Ator',
  genre: 'Funk / Trap',
  location: 'São José dos Campos - SP · DDD 012',
  tagline: 'Voz da Quebrada 012 · Funk / Trap sem esquentar banco',
  bio1: 'De DDD 012, Gustavo da Silva, natural de São José dos Campos/SP, conquistou a cena da quebrada pelo vulgo GUUH SC. Durante muito tempo teve que sustentar um riso fictício, mas como jogador diferente que é, não precisa esquentar banco.',
  bio2: 'Hoje acumula milhares de visualizações nas principais plataformas digitais, convertendo vivências reais em funk consciente, trap e ritmos marcantes. Músicas de produção própria e parcerias de peso com a gravadora Love Funk e Cria Hit.',
  phone: '+55 12 98164-1325',
  phoneRaw: '5512981641325',
  email: 'guuhscmc@gmail.com',
  links: {
    officialSite: 'https://guuhsc.com/',
    spotify: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtube: 'https://www.youtube.com/@guuhsc',
    instagram: 'https://www.instagram.com/guuhscmc/',
    tiktok: 'https://www.tiktok.com/@guuhscmc',
    presave: 'https://lnkfi.re/GuuhSC',
    loveFunk: 'https://www.youtube.com/@lovefunkprodutora',
    whatsapp: 'https://wa.me/5512981641325?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20para%20contratar%20o%20show%20do%20Guuh%20SC!',
  }
};

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'projeto-z',
    youtubeId: '9x3tqaA3IOE',
    title: 'Guuh SC - Projeto-Z (Clipe Oficial)',
    duration: '2:49',
    year: '2024',
    producer: 'Produção Oficial',
    description: 'Clipe oficial marcando uma das maiores produções audiovisuais de rua do Vale do Paraíba.',
    thumbnail: './images/yt-projeto-z.jpg',
    viewsBadge: '6,5 mil views',
    publishedText: 'há 4 meses'
  },
  {
    id: 'ligacao-charlinho',
    youtubeId: 'FKspkCav_ig',
    title: 'Guuh SC Feat Mc Charlinho ( Audio Visual )',
    duration: '2:21',
    year: '2024',
    producer: 'Prod: Mano R no beat · Visuals: Raphael O Lima',
    description: 'Ligação — Guuh SC feat. Mc Charlinho. Produção e mix/master por Mano R no beat, projeto visual por Raphael O Lima.',
    thumbnail: './images/yt-ligacao-charlinho.jpg',
    viewsBadge: 'Lançamento',
    publishedText: 'há 6 meses'
  },
  {
    id: 'perfeicao',
    youtubeId: '7oYXcMiCQKw',
    title: 'Perfeição - Guuh SC Feat. Mc Lamp ( Clipe Oficial)',
    duration: '3:35',
    year: '2024',
    producer: 'Clipe Oficial',
    description: 'Feat de peso unindo vozes marcantes da cena regional de São José dos Campos (012).',
    thumbnail: './images/yt-perfeicao.jpg',
    viewsBadge: '717 views',
    publishedText: 'há 7 meses'
  },
  {
    id: 'vivencias',
    youtubeId: 'OZV81v6rjJ4',
    title: 'Guuh SC - VIVÊNCIAS Prod. (Share, Mano-R no beat)',
    duration: '2:31',
    year: '2024',
    producer: 'Prod. (Share, Mano-R no beat)',
    description: 'Música consciente expressando a realidade, as vivências de rua e a vitória da quebrada.',
    thumbnail: './images/yt-vivencias.jpg',
    viewsBadge: '4,3 mil views',
    publishedText: 'há 9 meses'
  },
  {
    id: 'tenere',
    youtubeId: 'tzOta4NWV-I',
    title: 'Guuh SC - Tenéré Prod. Slaasty (Clipe Oficial)',
    duration: '2:48',
    year: '2023',
    producer: 'Prod. Slaasty',
    description: 'Clipe oficial de rua pelas pistas do Vale do Paraíba com batida pesada e acelerada.',
    thumbnail: './images/yt-tenere.jpg',
    viewsBadge: '3,8 mil views',
    publishedText: 'há 10 meses'
  },
  {
    id: 'making-of-tenere',
    youtubeId: 'WHrAlTBFbUg',
    title: 'Making of do Video Clipe “ Tenéré” Deu quase tudo errado 😂',
    duration: '7:55',
    year: '2023',
    producer: 'Bastidores Oficiais',
    description: 'Bastidores e resenha completa das gravações do clipe Tenéré mostrando a realidade das filmagens independentes.',
    thumbnail: './images/yt-making-of-tenere.jpg',
    viewsBadge: 'Bastidores',
    publishedText: 'há 10 meses'
  },
  {
    id: 'cabelo-branco',
    youtubeId: 'a3SwCEShmFo',
    title: 'Guuh SC - Cabelo Branco',
    duration: '2:45',
    year: '2023',
    producer: 'Prod. Dj Yago (Love Funk / Cria Hit)',
    description: 'Hit gravado com participação da comunidade e grande repercussão nas plataformas digitais.',
    thumbnail: './images/cabelo-branco-cover.jpg',
    viewsBadge: 'Love Funk'
  },
  {
    id: 'domingo-a-domingo',
    youtubeId: 'Dhzxg3T8oQk',
    title: 'Guuh SC - De Domingo a Domingo',
    duration: '3:05',
    year: '2024',
    producer: 'Prod. Biazzoto',
    description: 'Clipe oficial retratando a rotina, correria e a busca do progresso no dia a dia.',
    thumbnail: './images/yt-domingo.jpg',
    viewsBadge: 'Clipe Oficial'
  },
  {
    id: 'tattoo-na-pele',
    youtubeId: '-49zc37LDbk',
    title: 'Guuh SC - Tattoo na pele',
    duration: '2:30',
    year: '2023',
    producer: 'Dj Basili (Cria Hit / Love Funk)',
    description: 'Web Clipe oficial lançado em parceria com a gravadora Love Funk e selo Cria Hit.',
    thumbnail: './images/yt-tattoo-pele.jpg',
    viewsBadge: 'Cria Hit'
  }
];

export const TRACKS_DATA: TrackItem[] = [
  {
    id: 't-cabelo-branco',
    title: 'Cabelo Branco',
    producer: 'Dj Yago',
    duration: '2:45',
    year: '2023',
    coverImage: './images/cabelo-branco-cover.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=a3SwCEShmFo',
    highlight: true,
    bpm: 130
  },
  {
    id: 't-tattoo-na-pele',
    title: 'Tattoo na Pele',
    producer: 'Dj Basili · Love Funk / Cria Hit',
    duration: '2:30',
    year: '2023',
    coverImage: './images/yt-tattoo-pele.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=-49zc37LDbk',
    highlight: true,
    bpm: 132
  },
  {
    id: 't-de-domingo',
    title: 'De Domingo a Domingo',
    producer: 'Biazzoto',
    duration: '3:05',
    year: '2024',
    coverImage: './images/yt-domingo.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=Dhzxg3T8oQk',
    highlight: true,
    bpm: 128
  },
  {
    id: 't-projeto-z',
    title: 'Projeto-Z',
    producer: 'Guuh SC',
    duration: '2:50',
    year: '2022',
    coverImage: './images/yt-projeto-z.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=9x3tqaA3IOE',
    bpm: 130
  },
  {
    id: 't-tenere',
    title: 'Tenéré',
    producer: 'Slaasty',
    duration: '2:40',
    year: '2022',
    coverImage: './images/yt-tenere.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=tzOta4NWV-I',
    bpm: 134
  },
  {
    id: 't-perfeicao',
    title: 'Perfeição',
    featuring: 'Mc Lamp',
    producer: 'Produção Regional',
    duration: '3:15',
    year: '2022',
    coverImage: './images/yt-perfeicao.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO',
    youtubeUrl: 'https://www.youtube.com/watch?v=7oYXcMiCQKw',
    bpm: 125
  }
];

export const INSTAGRAM_PROFILE: InstagramProfile = {
  username: 'guuhscmc',
  fullName: 'Guuh SC',
  biography: 'Sjc ✨ Artista independente · Parceria via direct 📩 ⬇️ Só pensa em namorar⬇️',
  followersCount: 10812,
  profilePicUrl: './images/instagram/guuh-avatar.jpg',
  isVerified: true
};

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'ig-3457740796632438066',
    type: 'instagram',
    imageUrl: './images/instagram/post-1-C_8XO9EpxUy.jpg',
    shortcode: 'C_8XO9EpxUy',
    embedUrl: 'https://www.instagram.com/p/C_8XO9EpxUy/embed/captioned/',
    title: 'Show em Jacareí · Família MPR012',
    caption: 'Show foda em Jacareí. Obrigado a todos que compareceram ! Familia MPR012 @evchris7 @mpr_012 @djbruno_diogo',
    date: '15 de set. de 2024',
    location: 'Jacareí / SP',
    likes: 140,
    commentsCount: 33,
    platformUrl: 'https://www.instagram.com/p/C_8XO9EpxUy/',
    platform: 'instagram',
    tags: ['#guuhsc', '#show', '#funk', '#artista', '#jacarei', '#vozdovale', '#mpr012', '#funktrap']
  },
  {
    id: 'ig-3809277937409125856',
    type: 'instagram',
    imageUrl: './images/instagram/post-2-DTdRhoGAO3g.jpg',
    shortcode: 'DTdRhoGAO3g',
    embedUrl: 'https://www.instagram.com/p/DTdRhoGAO3g/embed/captioned/',
    title: 'Gravação de Clipe · Perfeição (Feat. Mc Lamp)',
    caption: 'Gravação de Clipe . Guuh SC Feat Mc Lamp - Perfeição. Cantores: @guuhscmc / @mundo_do_lamp. Atriz: @safernandesl. Filmakers: @rost.012 / @raphaelolivlima. Assistentes: @crisdesousapiercer_ / @michael_mendes46. Local: @espaco0rigem',
    date: '13 de jan. de 2026',
    location: 'Espaço Origem · SJC',
    likes: 39,
    commentsCount: 28,
    platformUrl: 'https://www.instagram.com/p/DTdRhoGAO3g/',
    platform: 'instagram',
    tags: ['#videoclipe', '#trap', '#filmaker', '#mafiaitaliana', '#sjc', '#perfeição']
  },
  {
    id: 'ig-3308337554645029003',
    type: 'instagram',
    imageUrl: './images/instagram/post-3-C3pk3pFs5CL.jpg',
    shortcode: 'C3pk3pFs5CL',
    embedUrl: 'https://www.instagram.com/p/C3pk3pFs5CL/embed/captioned/',
    title: 'Nem tudo que é constante vira rotina 👑',
    caption: 'Nem tudo que é constante vai virar rotina!! 👑 ... #guuhsc #lovefunk #24por48 #criahit #artista #foto #estilo #mc #arte',
    date: '22 de fev. de 2024',
    location: 'Love Funk / Cria Hit',
    likes: 107,
    commentsCount: 13,
    platformUrl: 'https://www.instagram.com/p/C3pk3pFs5CL/',
    platform: 'instagram',
    tags: ['#guuhsc', '#lovefunk', '#24por48', '#criahit', '#artista', '#cantor', '#nike']
  },
  {
    id: 'ig-3986313567837921562',
    type: 'instagram',
    imageUrl: './images/instagram/post-4-DdSOxHOTKEa.jpg',
    shortcode: 'DdSOxHOTKEa',
    embedUrl: 'https://www.instagram.com/p/DdSOxHOTKEa/embed/captioned/',
    title: 'Freestyle & Improviso no Beat 🎙️',
    caption: 'Eaiii???? Ha ha Obrigado a todos que participaram!❤️ #improviso #funkbrasil #fy #freestyle #beatmaker',
    date: '14 de set. de 2026',
    location: 'São José dos Campos / SP',
    likes: 57,
    commentsCount: 44,
    platformUrl: 'https://www.instagram.com/p/DdSOxHOTKEa/',
    platform: 'instagram',
    tags: ['#improviso', '#funkbrasil', '#fy', '#freestyle', '#beatmaker']
  },
  {
    id: 'ig-3985718544796241816',
    type: 'instagram',
    imageUrl: './images/instagram/post-5-DdQHeY1RE-Y.jpg',
    shortcode: 'DdQHeY1RE-Y',
    embedUrl: 'https://www.instagram.com/p/DdQHeY1RE-Y/embed/captioned/',
    title: 'Johnnie Walker 🔥 Em Breve',
    caption: 'Johnnie Walker 🔥 @guuhscmc #explore #funkstatus #funkbrasil #funkbh #funkeiros @mccebezinho @mckako @mchariel @lovefunkprodutora',
    date: '14 de set. de 2026',
    location: 'Love Funk Produtora',
    likes: 846,
    commentsCount: 27,
    platformUrl: 'https://www.instagram.com/p/DdQHeY1RE-Y/',
    platform: 'instagram',
    tags: ['#explore', '#funkstatus', '#funkbrasil', '#funkbh', '#funkeiros', '#lovefunk']
  },
  {
    id: 'ig-3984279031523824956',
    type: 'instagram',
    imageUrl: './images/instagram/post-6-DdLAKtoA9U8.jpg',
    shortcode: 'DdLAKtoA9U8',
    embedUrl: 'https://www.instagram.com/p/DdLAKtoA9U8/embed/captioned/',
    title: 'Saiuuu!!! Johnnie Walker 🥃💥',
    caption: 'Saiuuu!!! Johnnie Walker🔥🔥 Em todas as plataformas digitais !. #explore #funkdefavela #mccebezinho #mctuto #funkeiro',
    date: '12 de set. de 2026',
    location: 'Todas as Plataformas Digitais',
    likes: 22,
    commentsCount: 15,
    platformUrl: 'https://www.instagram.com/p/DdLAKtoA9U8/',
    platform: 'instagram',
    tags: ['#explore', '#funkdefavela', '#mccebezinho', '#mctuto', '#funkeiro', '#lancamento']
  }
];

export const SHOWS_DATA: ShowItem[] = [
  {
    id: 's-agenda-aberta',
    title: 'Agenda Aberta · Temporada 2026 / 2027',
    city: 'São José dos Campos, Taubaté, Jacareí, Vale do Paraíba, Litoral SP, São Paulo e Rio de Janeiro',
    location: 'Casas de Show, Festivais, Casas Noturnas e Eventos',
    status: 'agenda-aberta',
    date: 'Datas Disponíveis',
    description: 'Disponibilidade imediata para contratação de shows em São José dos Campos (012), Taubaté, Jacareí, todo o Vale do Paraíba, Litoral Norte de SP (Caraguatatuba, Ubatuba, São Sebastião, Ilhabela), Grande SP, Rio de Janeiro e capitais do Brasil.'
  },
  {
    id: 's-1',
    title: 'Festa Regional 1º de Maio',
    city: 'São José dos Campos / SP',
    location: 'Palco Principal da Comunidade',
    status: 'realizado',
    date: 'Edição Especial',
    description: 'Apresentação diante de milhares de pessoas com o repertório completo de funk de rua.'
  },
  {
    id: 's-3',
    title: 'Espeto & Viola Lounge',
    city: 'Vale do Paraíba / SP',
    location: 'Palco Sunset',
    status: 'realizado',
    date: 'Show Ao Vivo',
    description: 'Mistura de estilos e destaque para os hits Cabelo Branco e Tattoo na Pele.'
  },
  {
    id: 's-4',
    title: 'Quinta do Bem Especial',
    city: 'São José dos Campos / SP',
    location: 'Projeto Cultural',
    status: 'realizado',
    date: 'Evento Regional',
    description: 'Show beneficente com arrecadação de alimentos para a comunidade local.'
  },
  {
    id: 's-5',
    title: 'Festival Arteurbana - Pavam Music',
    city: 'São José dos Campos / SP',
    location: 'Espaço Urbano 012',
    status: 'realizado',
    date: 'Cultura de Rua',
    description: 'Encontro com nomes do funk e trap regional como MC Kaerri, MC G$, MC Chris e MC DSE.'
  }
];

export const SOCIAL_STATS = [
  { label: 'Canal no YouTube', value: '1.2K+', desc: 'Inscritos & Vlogs', link: 'https://www.youtube.com/@guuhsc' },
  { label: 'Vídeos Publicados', value: '200+', desc: 'Clipes & Conteúdo', link: 'https://www.youtube.com/@guuhsc/videos' },
  { label: 'Streams Totais', value: '50K+', desc: 'Spotify & Love Funk', link: 'https://open.spotify.com/intl-pt/artist/5H1zYFcTrOxFcFvOk1JjwO' },
  { label: 'DDD de Origem', value: '012', desc: 'São José dos Campos', link: '#sobre' }
];
