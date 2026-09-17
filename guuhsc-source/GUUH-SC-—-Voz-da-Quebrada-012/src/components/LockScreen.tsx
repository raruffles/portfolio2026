import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim().toLowerCase() === 'guuhsc') {
      try {
        sessionStorage.setItem('guuhsc_access', 'granted');
      } catch {
        // Fallback if sessionStorage is disabled
      }
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-[#f4eeff] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#ff2e92] selection:text-[#0a0612]">
      {/* Background Ambience / Neon Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff2e92]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#21f6c9]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Top Bar */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs text-[#b7a6d6]/60 tracking-widest uppercase">
        <a
          href="https://raphaelolima.com.br"
          className="inline-flex items-center gap-1.5 hover:text-[#21f6c9] transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>raphaelolima.com.br</span>
        </a>
        <span className="text-[#21f6c9] font-mono text-[11px]">012 // SJC</span>
      </div>

      {/* Main Lock Card */}
      <div
        className={`w-full max-w-md bg-[#130b20]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 transition-transform ${
          isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
        style={{
          boxShadow: '0 0 50px rgba(255, 46, 146, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glow Header Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff2e92]/20 to-[#9d4edd]/20 border border-[#ff2e92]/40 flex items-center justify-center text-[#ff2e92] shadow-[0_0_25px_rgba(255,46,146,0.35)]">
            <Lock className="w-8 h-8" />
          </div>
        </div>

        {/* Brand & Titles */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff2e92]/10 border border-[#ff2e92]/30 text-[#ff2e92] text-[10px] font-bold tracking-widest uppercase">
            <ShieldCheck className="w-3 h-3" />
            <span>Acesso Exclusivo</span>
          </div>
          <div className="flex justify-center pt-2 pb-1">
            <div className="logo-neon-container">
              <img
                src="/guuhsc/images/logo/logo-w-f.png"
                alt="GUUH SC"
                className="logo-neon h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'images/logo/logo-w-f.png';
                }}
              />
            </div>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#21f6c9] tracking-wider uppercase">
            Voz da Quebrada 012
          </p>
          <p className="text-xs text-[#b7a6d6] pt-2 leading-relaxed">
            Esta página é protegida. Digite a senha para visualizar o projeto completo.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="guuh-pass-input"
              className="block text-[11px] font-bold tracking-wider text-[#b7a6d6] uppercase"
            >
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                id="guuh-pass-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Digite a senha..."
                autoFocus
                autoComplete="current-password"
                className={`w-full bg-[#0a0612]/90 border ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-[#ff2e92]'
                } rounded-xl px-4 py-3.5 pr-11 text-sm text-[#f4eeff] placeholder-[#b7a6d6]/40 focus:outline-none focus:ring-2 focus:ring-[#ff2e92]/30 tracking-wider transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b7a6d6]/70 hover:text-[#f4eeff] p-1 transition-colors"
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs font-semibold text-red-400 bg-red-950/40 border border-red-800/50 rounded-lg px-3 py-2 text-center">
              Senha incorreta. Tente novamente.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff2e92] to-[#d90368] hover:from-[#ff2e92]/90 hover:to-[#d90368]/90 text-[#0a0612] font-black text-xs sm:text-sm tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-[0_0_25px_rgba(255,46,146,0.4)] hover:shadow-[0_0_35px_rgba(255,46,146,0.6)] transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98] cursor-pointer"
          >
            <span>Desbloquear Acesso</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <p className="text-[11px] text-[#b7a6d6]/50">
            Direção de Arte &amp; Design · Raphael Lima &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};