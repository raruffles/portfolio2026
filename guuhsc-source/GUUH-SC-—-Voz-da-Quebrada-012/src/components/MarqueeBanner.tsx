import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'FUNK / TRAP',
    'SÃO JOSÉ DOS CAMPOS',
    'LOVE FUNK & CRIA HIT',
    'GUUH SC',
    'DDD 012',
    'CABELO BRANCO',
    'TATTOO NA PELE',
    'DE DOMINGO A DOMINGO',
    'PROJETO-Z',
    'TENÉRÉ',
  ];

  return (
    <div className="bg-[#ff2e92] text-[#0a0612] overflow-hidden py-3 border-y border-white/15 select-none">
      <div className="flex animate-marquee">
        {[...items, ...items].map((text, index) => (
          <span
            key={index}
            className="font-anton text-base sm:text-lg tracking-wider px-6 inline-flex items-center gap-4"
          >
            <span>{text}</span>
            <span className="text-[#0a0612]/60">★</span>
          </span>
        ))}
      </div>
    </div>
  );
};
