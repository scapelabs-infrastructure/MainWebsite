import { CityGrid3D } from './CityGrid3D';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <CityGrid3D />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-6">
          <img
            src="/ScapeLabs-Logo.png"
            alt="ScapeLabs"
            className="h-24 md:h-32 w-auto mx-auto"
          />
        </div>

        <h1 className="leading-tight mb-8">
          <span
            className="block text-4xl md:text-6xl lg:text-7xl text-[#E8E8F0]/80 italic"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {t.hero.line1}
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl font-bold text-[#E8E8F0] tracking-tight"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}
          >
            {t.hero.line2}
          </span>
          <span
            className="block text-4xl md:text-6xl lg:text-7xl italic"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: 'linear-gradient(90deg, #2D6EFF, #7B3FE4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.hero.line3}
          </span>
        </h1>

        <p className="text-[#E8E8F0]/60 text-base md:text-lg max-w-[560px] mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>

      <div className="absolute bottom-10 right-8 md:right-12 z-20 flex flex-col gap-3 items-end">
        <button
          onClick={() => scrollToSection('partners')}
          className="text-sm font-medium text-[#E8E8F0]/70 hover:text-[#2D6EFF] transition-colors tracking-wide"
        >
          {t.hero.cta1}
        </button>
        <button
          onClick={() => scrollToSection('community')}
          className="text-sm font-medium text-[#E8E8F0]/70 hover:text-[#7B3FE4] transition-colors tracking-wide"
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
