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

      {/* dark radial scrim to lift text off the neon scene */}
      <div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[5] w-[min(90vw,900px)] h-[70vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(6,6,15,0.72) 0%, rgba(6,6,15,0.45) 45%, transparent 78%)',
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
          className="mb-7 uppercase font-extrabold text-white text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textShadow: '0 4px 40px rgba(0,0,0,0.7)',
          }}
        >
          {t.hero.headline}
        </h1>

        <p
          className="text-[#C4C9DA] text-base md:text-lg max-w-[620px] mx-auto leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            textShadow: '0 1px 16px rgba(0,0,0,0.6)',
          }}
        >
          {t.hero.subtitle}
        </p>
      </div>

      <div className="absolute bottom-10 right-8 md:right-12 z-20 flex flex-col gap-3 items-end">
        <button
          onClick={() => scrollToSection('partners')}
          className="text-sm font-medium text-[#E8E8F0]/70 hover:text-[#2D6EFF] transition-colors tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t.hero.cta1}
        </button>
        <button
          onClick={() => scrollToSection('community')}
          className="text-sm font-medium text-[#E8E8F0]/70 hover:text-[#7B3FE4] transition-colors tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t.hero.cta2}
        </button>
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
