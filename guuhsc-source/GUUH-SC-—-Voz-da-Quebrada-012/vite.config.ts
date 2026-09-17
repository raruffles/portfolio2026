import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function instagramApiPlugin(): Plugin {
  return {
    name: 'instagram-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/instagram', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const fallbackPosts = [
          {
            id: 'ig-3457740796632438066',
            shortcode: 'C_8XO9EpxUy',
            url: 'https://www.instagram.com/p/C_8XO9EpxUy/',
            embedUrl: 'https://www.instagram.com/p/C_8XO9EpxUy/embed/captioned/',
            title: 'Show em Jacareí · Família MPR012',
            caption: 'Show foda em Jacareí. Obrigado a todos que compareceram ! Familia MPR012 @evchris7 @mpr_012 @djbruno_diogo',
            likes: 140,
            commentsCount: 33,
            timestamp: 1726414845,
            date: '15 de set. de 2024',
            imageUrl: '/images/instagram/post-1-C_8XO9EpxUy.jpg',
            location: 'Jacareí / SP',
            platformUrl: 'https://www.instagram.com/p/C_8XO9EpxUy/',
            platform: 'instagram',
            tags: ['#guuhsc', '#show', '#funk', '#artista', '#jacarei', '#vozdovale', '#mpr012', '#funktrap']
          },
          {
            id: 'ig-3809277937409125856',
            shortcode: 'DTdRhoGAO3g',
            url: 'https://www.instagram.com/p/DTdRhoGAO3g/',
            embedUrl: 'https://www.instagram.com/p/DTdRhoGAO3g/embed/captioned/',
            title: 'Gravação de Clipe · Perfeição (Feat. Mc Lamp)',
            caption: 'Gravação de Clipe . Guuh SC Feat Mc Lamp - Perfeição. Cantores: @guuhscmc / @mundo_do_lamp. Atriz: @safernandesl. Filmakers: @rost.012 / @raphaelolivlima. Assistentes: @crisdesousapiercer_ / @michael_mendes46. Local: @espaco0rigem',
            likes: 39,
            commentsCount: 28,
            timestamp: 1768321338,
            date: '13 de jan. de 2026',
            imageUrl: '/images/instagram/post-2-DTdRhoGAO3g.jpg',
            location: 'Espaço Origem · SJC',
            platformUrl: 'https://www.instagram.com/p/DTdRhoGAO3g/',
            platform: 'instagram',
            tags: ['#videoclipe', '#trap', '#filmaker', '#mafiaitaliana', '#sjc', '#perfeição']
          },
          {
            id: 'ig-3308337554645029003',
            shortcode: 'C3pk3pFs5CL',
            url: 'https://www.instagram.com/p/C3pk3pFs5CL/',
            embedUrl: 'https://www.instagram.com/p/C3pk3pFs5CL/embed/captioned/',
            title: 'Nem tudo que é constante vira rotina 👑',
            caption: 'Nem tudo que é constante vai virar rotina!! 👑 ... #guuhsc #lovefunk #24por48 #criahit #artista #foto #estilo #mc #arte',
            likes: 107,
            commentsCount: 13,
            timestamp: 1708604591,
            date: '22 de fev. de 2024',
            imageUrl: '/images/instagram/post-3-C3pk3pFs5CL.jpg',
            location: 'Love Funk / Cria Hit',
            platformUrl: 'https://www.instagram.com/p/C3pk3pFs5CL/',
            platform: 'instagram',
            tags: ['#guuhsc', '#lovefunk', '#24por48', '#criahit', '#artista', '#cantor', '#nike']
          },
          {
            id: 'ig-3986313567837921562',
            shortcode: 'DdSOxHOTKEa',
            url: 'https://www.instagram.com/p/DdSOxHOTKEa/',
            embedUrl: 'https://www.instagram.com/p/DdSOxHOTKEa/embed/captioned/',
            title: 'Freestyle & Improviso no Beat 🎙️',
            caption: 'Eaiii???? Ha ha Obrigado a todos que participaram!❤️ #improviso #funkbrasil #fy #freestyle #beatmaker',
            likes: 57,
            commentsCount: 44,
            timestamp: 1789456425,
            date: '14 de set. de 2026',
            imageUrl: '/images/instagram/post-4-DdSOxHOTKEa.jpg',
            location: 'São José dos Campos / SP',
            platformUrl: 'https://www.instagram.com/p/DdSOxHOTKEa/',
            platform: 'instagram',
            tags: ['#improviso', '#funkbrasil', '#fy', '#freestyle', '#beatmaker']
          },
          {
            id: 'ig-3985718544796241816',
            shortcode: 'DdQHeY1RE-Y',
            url: 'https://www.instagram.com/p/DdQHeY1RE-Y/',
            embedUrl: 'https://www.instagram.com/p/DdQHeY1RE-Y/embed/captioned/',
            title: 'Johnnie Walker 🔥 Em Breve',
            caption: 'Johnnie Walker 🔥 @guuhscmc #explore #funkstatus #funkbrasil #funkbh #funkeiros @mccebezinho @mckako @mchariel @lovefunkprodutora',
            likes: 846,
            commentsCount: 27,
            timestamp: 1789420425,
            date: '14 de set. de 2026',
            imageUrl: '/images/instagram/post-5-DdQHeY1RE-Y.jpg',
            location: 'Love Funk Produtora',
            platformUrl: 'https://www.instagram.com/p/DdQHeY1RE-Y/',
            platform: 'instagram',
            tags: ['#explore', '#funkstatus', '#funkbrasil', '#funkbh', '#funkeiros', '#lovefunk']
          },
          {
            id: 'ig-3984279031523824956',
            shortcode: 'DdLAKtoA9U8',
            url: 'https://www.instagram.com/p/DdLAKtoA9U8/',
            embedUrl: 'https://www.instagram.com/p/DdLAKtoA9U8/embed/captioned/',
            title: 'Saiuuu!!! Johnnie Walker 🥃💥',
            caption: 'Saiuuu!!! Johnnie Walker🔥🔥 Em todas as plataformas digitais !. #explore #funkdefavela #mccebezinho #mctuto #funkeiro',
            likes: 22,
            commentsCount: 15,
            timestamp: 1789334025,
            date: '12 de set. de 2026',
            imageUrl: '/images/instagram/post-6-DdLAKtoA9U8.jpg',
            location: 'Todas as Plataformas Digitais',
            platformUrl: 'https://www.instagram.com/p/DdLAKtoA9U8/',
            platform: 'instagram',
            tags: ['#explore', '#funkdefavela', '#mccebezinho', '#mctuto', '#funkeiro', '#lancamento']
          }
        ];

        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 2500);
          const resp = await fetch('https://www.instagram.com/api/v1/users/web_profile_info/?username=guuhscmc', {
            headers: {
              'X-IG-App-ID': '936619743392459',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'application/json'
            },
            signal: controller.signal
          });
          clearTimeout(timeout);

          if (resp.ok) {
            const data = (await resp.json()) as any;
            const user = data?.data?.user;
            if (user?.edge_owner_to_timeline_media?.edges) {
              const livePosts = user.edge_owner_to_timeline_media.edges.slice(0, 6).map((edge: any, index: number) => {
                const n = edge.node;
                return {
                  id: n.id,
                  shortcode: n.shortcode,
                  url: `https://www.instagram.com/p/${n.shortcode}/`,
                  embedUrl: `https://www.instagram.com/p/${n.shortcode}/embed/captioned/`,
                  title: fallbackPosts[index]?.title || `Post @guuhscmc`,
                  caption: n.edge_media_to_caption?.edges[0]?.node?.text || fallbackPosts[index]?.caption || '',
                  likes: n.edge_liked_by?.count || n.edge_media_preview_like?.count || fallbackPosts[index]?.likes || 0,
                  commentsCount: n.edge_media_to_comment?.count || fallbackPosts[index]?.commentsCount || 0,
                  timestamp: n.taken_at_timestamp,
                  date: new Date(n.taken_at_timestamp * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                  imageUrl: `/images/instagram/post-${index + 1}-${n.shortcode}.jpg`,
                  location: fallbackPosts[index]?.location || 'São José dos Campos / SP',
                  platformUrl: `https://www.instagram.com/p/${n.shortcode}/`,
                  platform: 'instagram',
                  tags: fallbackPosts[index]?.tags || ['#guuhsc', '#funk012']
                };
              });

              res.end(JSON.stringify({
                success: true,
                live: true,
                user: {
                  username: user.username,
                  fullName: user.full_name,
                  followers: user.edge_followed_by?.count || 10812,
                  bio: user.biography
                },
                posts: livePosts
              }));
              return;
            }
          }
        } catch {
          // If Instagram rate-limits (429) or network times out, serve verified cache
        }

        res.end(JSON.stringify({
          success: true,
          live: false,
          user: {
            username: 'guuhscmc',
            fullName: 'Guuh SC',
            followers: 10812,
            bio: 'Sjc ✨ Artista independente · Parceria via direct 📩 ⬇️ Só pensa em namorar⬇️'
          },
          posts: fallbackPosts
        }));
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), instagramApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
