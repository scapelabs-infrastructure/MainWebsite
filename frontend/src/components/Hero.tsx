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
        <div className="mb-6 md:mb-8">
          <img
            src="/ScapeLabs-Logo.png"
            alt="ScapeLabs"
            className="h-16 md:h-20 w-auto mx-auto"
          />
        </div>

        <h1 className="mb-7" style={{ lineHeight: 1.04 }}>
          <span
            className="block text-2xl md:text-4xl lg:text-5xl italic text-[#C9CEE0]"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            }}
          >
            {t.hero.line1}
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl font-extrabold text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.035em',
              textShadow: '0 4px 40px rgba(0,0,0,0.65)',
            }}
          >
            {t.hero.line2}
          </span>
          <span
            className="block text-3xl md:text-5xl lg:text-6xl italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(90deg, #5B95FF, #A87BFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 18px rgba(91,149,255,0.35))',
            }}
          >
            {t.hero.line3}
          </span>
        </h1>

        <p
          className="text-[#C4C9DA] text-base md:text-lg max-w-[540px] mx-auto leading-relaxed"
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
