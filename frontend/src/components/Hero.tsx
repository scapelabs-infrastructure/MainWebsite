import { NeonScene3D } from './NeonScene3D';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-start justify-center overflow-hidden">
      <div className="absolute inset-0">
        <NeonScene3D />
      </div>

      {/* darkening scrim to lift text off the neon scene (smooth fade, no hard edge) */}
      <div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-[5] w-[min(100vw,1200px)] h-[90vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(6,6,15,0.92) 0%, rgba(6,6,15,0.82) 32%, rgba(6,6,15,0.5) 58%, rgba(6,6,15,0.2) 78%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-28 md:pt-32">
        <div className="mb-8 md:mb-10">
          <img
            src="/ScapeLabs-Logo.png"
            alt="ScapeLabs"
            className="h-28 md:h-36 lg:h-40 w-auto mx-auto"
          />
        </div>

        <h1
          className="mb-6 uppercase font-extrabold text-white max-w-5xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            fontSize: 'clamp(0.85rem, 5vw, 3.5rem)',
            textShadow: '0 2px 24px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.7)',
          }}
        >
          <span className="block">{t.hero.headlineLine1}</span>
          <span className="block whitespace-nowrap">{t.hero.headlineLine2}</span>
        </h1>

        <p
          className="text-[#C4C9DA] text-base md:text-lg max-w-[620px] mx-auto leading-relaxed mb-10"
          style={{
            fontFamily: "'Inter', sans-serif",
            textShadow: '0 1px 16px rgba(0,0,0,0.6)',
          }}
        >
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/work-with-us"
            className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)',
              boxShadow: '0 0 24px rgba(45,110,255,0.35)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {t.hero.cta1}
          </a>
          <button
            onClick={() => scrollToSection('community-hub')}
            className="px-7 py-3 rounded-full text-sm font-semibold transition-colors whitespace-nowrap"
            style={{
              border: '1px solid rgba(232,232,240,0.2)',
              color: 'rgba(232,232,240,0.8)',
              background: 'rgba(232,232,240,0.04)',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(232,232,240,0.45)';
              e.currentTarget.style.color = '#E8E8F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(232,232,240,0.2)';
              e.currentTarget.style.color = 'rgba(232,232,240,0.8)';
            }}
          >
            {t.hero.cta2}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-9 border border-[#E8E8F0]/20 rounded-full flex justify-center pt-1.5">
          <div
            className="w-1 h-2.5 rounded-full"
            style={{ background: 'linear-gradient(180deg, #2D6EFF, #7B3FE4)' }}
          />
        </div>
      </div>
    </section>
  );
}
