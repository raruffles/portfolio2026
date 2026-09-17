import React, { useState } from 'react';
import { ARTIST_INFO } from '../data/guuhData';
import { Phone, Mail, CheckCircle2, Instagram, Youtube } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    const text = `Mensagem enviada pelo site oficial GUUH SC:\n• Nome: ${name}\n• Email: ${email || 'Não informado'}\n• Telefone: ${phone || 'Não informado'}\n• Mensagem: ${message}`;
    const url = `https://wa.me/${ARTIST_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-[#0a0612] relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info (Left) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2e92] uppercase tracking-widest mb-3">
              <Phone className="w-3.5 h-3.5" />
              <span>Assessoria & Contratação</span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl text-[#f4eeff] mb-6 leading-tight">
              Contato para <span className="text-[#21f6c9] glow-cyan">Shows & Imprensa</span>
            </h2>

            <p className="text-[#b7a6d6] text-base mb-8 leading-relaxed">
              Para contratação de apresentações ao vivo, participações em videoclipes, parcerias musicais e contatos comerciais.
            </p>

            <div className="space-y-6">
              {/* Phone / WhatsApp Card */}
              <div className="bg-[#150b24] border border-white/10 rounded-xl p-5 hover:border-[#21f6c9]/40 transition-colors">
                <div className="text-xs font-bold text-[#21f6c9] uppercase tracking-wider mb-1">
                  Assessoria Direta (Telefone & WhatsApp)
                </div>
                <a
                  href={`https://wa.me/${ARTIST_INFO.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20a%20assessoria%20do%20Guuh%20SC.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-anton text-2xl text-[#21f6c9] hover:text-[#ff2e92] transition-colors flex items-center gap-2.5 group"
                >
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{ARTIST_INFO.phone}</span>
                </a>
                <span className="text-xs text-white/40 block mt-1">
                  Atendimento de segunda a sábado em horário comercial
                </span>
              </div>

              {/* Email Card */}
              <div className="bg-[#150b24] border border-white/10 rounded-xl p-5 hover:border-[#ff2e92]/40 transition-colors">
                <div className="text-xs font-bold text-[#ff2e92] uppercase tracking-wider mb-1">
                  E-mail Oficial
                </div>
                <a
                  href={`mailto:${ARTIST_INFO.email}`}
                  className="font-anton text-xl sm:text-2xl text-[#f4eeff] hover:text-[#21f6c9] transition-colors break-all"
                >
                  {ARTIST_INFO.email}
                </a>
                <span className="text-xs text-white/40 block mt-1">
                  Envio de propostas e contratos formais
                </span>
              </div>

              {/* Social Channels Row */}
              <div>
                <div className="text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-3">
                  Redes Oficiais do Artista
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={ARTIST_INFO.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#150b24] hover:bg-[#ff2e92]/20 border border-white/10 text-xs font-bold px-4 py-2 rounded-full transition-all text-[#f4eeff]"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#ff2e92]" />
                    <span>@guuhscmc</span>
                  </a>
                  <a
                    href={ARTIST_INFO.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#150b24] hover:bg-red-500/20 border border-white/10 text-xs font-bold px-4 py-2 rounded-full transition-all text-[#f4eeff]"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube Oficial</span>
                  </a>
                  <a
                    href={ARTIST_INFO.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#150b24] hover:bg-[#1db954]/20 border border-white/10 text-xs font-bold px-4 py-2 rounded-full transition-all text-[#f4eeff]"
                  >
                    <SpotifyIcon className="w-3.5 h-3.5 text-[#1db954] fill-current" />
                    <span>Spotify</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-[#150b24] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              <h3 className="font-anton text-2xl text-[#f4eeff] mb-2">Envie uma Mensagem</h3>
              <p className="text-xs sm:text-sm text-[#b7a6d6] mb-6">
                Preencha os campos abaixo para entrar em contato diretamente com a equipe do GUUH SC.
              </p>

              {isSent ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#21f6c9]/20 text-[#21f6c9] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-anton text-2xl text-[#f4eeff]">Mensagem Enviada com Sucesso!</h4>
                  <p className="text-sm text-[#b7a6d6] max-w-sm mx-auto">
                    Nossa assessoria responderá o mais rápido possível. Você também pode nos chamar no WhatsApp!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="text-xs text-[#21f6c9] hover:underline pt-2 font-bold"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome completo"
                        className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3.5 rounded-lg text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nome@exemplo.com"
                        className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3.5 rounded-lg text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(XX) 9XXXX-XXXX"
                      className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3.5 rounded-lg text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                      Mensagem / Detalhes da Proposta *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escreva sobre sua proposta de show, parceria ou evento..."
                      className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3.5 rounded-lg text-sm outline-none transition-colors resize-y min-h-[120px]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:scale-105 transition-all cursor-pointer w-full sm:w-auto justify-center"
                      id="btn-enviar-contato"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>ENVIAR MENSAGEM NO WHATSAPP</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
