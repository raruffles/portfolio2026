import React, { useState } from 'react';
import { SHOWS_DATA, ARTIST_INFO } from '../data/guuhData';
import { Calendar, MapPin, CheckCircle2, Sparkles, Send, Phone, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const ShowsSection: React.FC = () => {
  const [contractCity, setContractCity] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [contractVenue, setContractVenue] = useState('');
  const [contractType, setContractType] = useState('Festival / Evento de Rua');
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  const handleSendBookingWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Assessoria GUUH SC! Gostaria de consultar disponibilidade de data para show:
• Cidade: ${contractCity || 'A definir'}
• Local/Evento: ${contractVenue || 'A definir'}
• Tipo: ${contractType}
• Data pretendida: ${contractDate || 'A combinar'}
Poderiam me passar os valores e rider técnico? Obrigado!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ARTIST_INFO.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <section id="shows" className="py-24 bg-[#150b24] border-b border-white/10 relative">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#21f6c9] uppercase tracking-widest mb-3">
              <Calendar className="w-4 h-4" />
              <span>Turnê & Apresentações</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#f4eeff]">
              Shows & <span className="text-[#ff2e92] glow-pink">Histórico de Palco</span>
            </h2>
            <p className="text-[#b7a6d6] text-base mt-2 max-w-xl">
              Já rolou em palco e pista por aí. Confira as apresentações realizadas e solicite a data para sua cidade.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsContractModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-sm px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(255,46,146,0.35)] hover:scale-105 transition-all self-start md:self-end cursor-pointer"
            id="btn-abrir-orcamento-show"
          >
            <Sparkles className="w-4 h-4" />
            <span>SOLICITAR ORÇAMENTO DE SHOW</span>
          </button>
        </div>

        {/* Shows List Table / Cards */}
        <div className="space-y-4 mb-14">
          {SHOWS_DATA.map((show, index) => {
            const isAgendaAberta = show.status === 'agenda-aberta';
            const isDone = show.status === 'realizado';

            if (isAgendaAberta) {
              return (
                <div
                  key={show.id}
                  className="bg-gradient-to-r from-[#ff2e92]/15 via-[#150b24] to-[#21f6c9]/10 border-2 border-[#ff2e92]/50 rounded-2xl p-6 sm:p-7 shadow-[0_0_30px_rgba(255,46,146,0.2)] relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a0612] bg-[#ff2e92] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,46,146,0.5)]">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          AGENDA ABERTA
                        </span>
                        <span className="text-xs font-bold text-[#21f6c9] uppercase tracking-wider">
                          Temporada 2026 / 2027
                        </span>
                      </div>

                      <h3 className="font-anton text-2xl sm:text-3xl text-[#f4eeff]">
                        {show.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#b7a6d6]">
                        <span className="flex items-center gap-1 text-[#21f6c9] font-medium">
                          <MapPin className="w-4 h-4" />
                          {show.city}
                        </span>
                        <span className="text-white/30">•</span>
                        <span>{show.location}</span>
                      </div>

                      {show.description && (
                        <p className="text-xs sm:text-sm text-[#b7a6d6] pt-1 max-w-2xl leading-relaxed">
                          {show.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-3 self-start md:self-center">
                      <button
                        type="button"
                        onClick={() => setIsContractModalOpen(true)}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0a0612] bg-[#21f6c9] hover:bg-[#21f6c9]/90 px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(33,246,201,0.4)] transition-all hover:scale-105 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>CONSULTAR DATAS & CACHÊ</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={show.id}
                className="py-5 px-4 sm:px-6 bg-[#0a0612]/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors rounded-xl group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#b7a6d6]">0{index}</span>
                    <h3 className="font-anton text-xl sm:text-2xl text-[#f4eeff] group-hover:text-[#21f6c9] transition-colors">
                      {show.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#b7a6d6]">
                    <span className="flex items-center gap-1 text-[#21f6c9]">
                      <MapPin className="w-3.5 h-3.5" />
                      {show.city}
                    </span>
                    <span className="text-white/30">•</span>
                    <span>{show.location}</span>
                  </div>

                  {show.description && (
                    <p className="text-xs text-white/50 pt-0.5 max-w-2xl">
                      {show.description}
                    </p>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  {isDone && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a0612] bg-[#21f6c9] px-3.5 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Show realizado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Action Banner */}
        <div className="bg-gradient-to-r from-[#0a0612] via-[#150b24] to-[#0a0612] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-anton text-2xl text-[#f4eeff]">Quer levar o GUUH SC para o seu evento?</h4>
            <p className="text-sm text-[#b7a6d6] max-w-2xl">
              Atendimento e contratação em <strong className="text-[#21f6c9]">São José dos Campos (SJC)</strong>, <strong className="text-[#f4eeff]">Taubaté</strong>, <strong className="text-[#f4eeff]">Jacareí</strong>, todo o <strong className="text-[#21f6c9]">Vale do Paraíba</strong>, <strong className="text-[#ff2e92]">Litoral de SP</strong> (Caraguá, Ubatuba, São Sebastião, Ilhabela), <strong className="text-[#f4eeff]">São Paulo Capital</strong>, <strong className="text-[#21f6c9]">Rio de Janeiro</strong> e capitais de todo o Brasil.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${ARTIST_INFO.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20para%20contratar%20show%20do%20Guuh%20SC.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm px-6 py-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all hover:scale-105"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>WhatsApp da Assessoria</span>
            </a>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isContractModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsContractModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#150b24] border border-[#21f6c9]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="font-anton text-2xl text-[#f4eeff]">Solicitar Data de Show</h3>
                <p className="text-xs text-[#b7a6d6]">Envie sua proposta direto para a assessoria oficial</p>
              </div>
              <button
                type="button"
                onClick={() => setIsContractModalOpen(false)}
                className="text-white/60 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBookingWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                  Cidade / Estado
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: São José dos Campos - SP"
                  value={contractCity}
                  onChange={(e) => setContractCity(e.target.value)}
                  className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3 rounded-lg text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                  Nome do Local / Casa de Show
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Bar, Arena, Lounge, Clube..."
                  value={contractVenue}
                  onChange={(e) => setContractVenue(e.target.value)}
                  className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3 rounded-lg text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                    Tipo de Evento
                  </label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3 rounded-lg text-sm outline-none transition-colors"
                  >
                    <option value="Festival / Evento de Rua">Festival / Rua</option>
                    <option value="Balada / Casa Noturna">Balada / Casa Noturna</option>
                    <option value="Tabacaria / Lounge">Tabacaria / Lounge</option>
                    <option value="Universitário">Universitário</option>
                    <option value="Aniversário / Particular">Particular / VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#b7a6d6] uppercase tracking-wider mb-1">
                    Data Pretendida
                  </label>
                  <input
                    type="date"
                    value={contractDate}
                    onChange={(e) => setContractDate(e.target.value)}
                    className="w-full bg-[#0a0612] border border-white/15 focus:border-[#21f6c9] text-white p-3 rounded-lg text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#b7a6d6] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-sm px-6 py-3 rounded-full box-glow-pink transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
