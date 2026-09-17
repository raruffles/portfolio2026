import React from 'react';
import { ARTIST_INFO } from '../data/guuhData';
import { ExternalLink, Mic2, MapPin, Award, Radio } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#150b24] border-b border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8a2be8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ff2e92]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Layered Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] sm:h-[480px] w-full max-w-[420px] mx-auto">
              {/* Primary Image: Guuh SC de costas com chapéu */}
              <div className="absolute left-0 top-0 w-[72%] h-[84%] rounded-xl overflow-hidden border-2 border-white/10 shadow-[-12px_12px_0px_#ff2e92] z-10 transition-transform duration-500 hover:scale-102">
                <img
                  src="./images/guuh-back.png"
                  alt="Guuh SC de costas com chapéu"
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0a0612] to-transparent">
                  <span className="text-xs font-bold text-[#21f6c9] tracking-wider uppercase">012 São José dos Campos</span>
                </div>
              </div>

              {/* Secondary Overlapping Image: Guuh com óculos */}
              <div className="absolute right-0 bottom-0 w-[58%] h-[64%] rounded-xl overflow-hidden border-2 border-white/10 shadow-[12px_-12px_0px_#21f6c9] z-20 transition-transform duration-500 hover:scale-105">
                <img
                  src="./images/guuh-sunglasses.jpg"
                  alt="Guuh SC com óculos escuros"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3">
                  <span className="bg-[#ff2e92] text-[#0a0612] font-anton text-xs px-2 py-0.5 rounded">
                    MC & ATOR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2e92] uppercase tracking-widest mb-3">
              <Mic2 className="w-3.5 h-3.5" />
              <span>Trajetória & Identidade</span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#f4eeff] mb-6 leading-tight">
              Quem é <span className="text-[#21f6c9] glow-cyan">GUUH SC</span>
            </h2>

            <div className="space-y-4 text-[#b7a6d6] text-base sm:text-lg leading-relaxed mb-8">
              <p>
                De <strong className="text-[#f4eeff]">DDD 012</strong>, Gustavo da Silva, natural de <strong className="text-[#21f6c9]">São José dos Campos/SP</strong>, ficou conhecido na quebrada pelo vulgo <strong className="text-[#f4eeff]">GUUH SC</strong>. Durante muito tempo teve que sustentar um riso fictício, mas como jogador diferente que é, não precisa esquentar banco.
              </p>
              <p>
                Hoje conta com conteúdo publicado em todas as plataformas digitais, transformando seus sonhos em realidade. Música de produção própria, além de faixas pela gravadora <a href={ARTIST_INFO.links.loveFunk} target="_blank" rel="noopener noreferrer" className="text-[#ff2e92] font-bold underline hover:text-[#21f6c9] transition-colors">Love Funk</a> e selo <strong className="text-[#f4eeff]">Cria Hit</strong>.
              </p>
              <p>
                Já passou por diversos shows e apresentações marcantes — <strong className="text-[#f4eeff]">Festa Regional 1º de Maio</strong>, <strong className="text-[#f4eeff]">Espeto & Viola</strong>, <strong className="text-[#f4eeff]">Quinta do Bem</strong>, além do festival <strong className="text-[#f4eeff]">Arteurbana (Pavam Music)</strong>.
              </p>
              <p>
                Com base firme em <strong className="text-[#21f6c9]">São José dos Campos</strong>, a voz do artista alcança <strong className="text-[#f4eeff]">Taubaté</strong>, <strong className="text-[#f4eeff]">Jacareí</strong> e todas as cidades do <strong className="text-[#21f6c9]">Vale do Paraíba</strong>, marcando presença também no <strong className="text-[#ff2e92]">Litoral Norte de SP</strong> (Caraguatatuba, Ubatuba, São Sebastião e Ilhabela), com conexões diretas na capital de <strong className="text-[#f4eeff]">São Paulo</strong>, <strong className="text-[#21f6c9]">Rio de Janeiro</strong> e capitais de todo o país.
              </p>
            </div>

            {/* Badges / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-[#0a0612]/70 border border-white/10 rounded-lg p-3.5 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#21f6c9] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Base</div>
                  <div className="text-sm font-bold text-[#f4eeff]">São José / 012</div>
                </div>
              </div>

              <div className="bg-[#0a0612]/70 border border-white/10 rounded-lg p-3.5 flex items-center gap-3">
                <Radio className="w-5 h-5 text-[#ff2e92] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Gravadora</div>
                  <div className="text-sm font-bold text-[#f4eeff]">Love Funk</div>
                </div>
              </div>

              <div className="bg-[#0a0612]/70 border border-white/10 rounded-lg p-3.5 flex items-center gap-3 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-[#21f6c9] shrink-0" />
                <div>
                  <div className="text-xs text-white/50">Gênero</div>
                  <div className="text-sm font-bold text-[#f4eeff]">Funk / Trap</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={ARTIST_INFO.links.presave}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-sm px-6 py-3 rounded-full box-glow-pink hover:scale-105 transition-all"
              >
                <span>Ouvir em todas as plataformas</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
