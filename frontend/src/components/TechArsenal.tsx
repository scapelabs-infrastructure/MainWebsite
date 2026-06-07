import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const iconPaths = [
  'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'M15 10l-4 4-4-4M12 2v12M2 20h20',
  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
];

export function TechArsenal() {
  const { t } = useLanguage();
  const ta = t.techArsenal;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tech-arsenal" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,63,228,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {ta.title}
          </h2>
          <p className="text-[#E8E8F0]/40 text-lg italic" style={{ fontFamily: "'Inter', sans-serif" }}>
            {ta.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {ta.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
              className={`group relative rounded-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:border-[#2D6EFF]/30 ${
                i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
              style={{
                background: 'rgba(8,8,16,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(232,232,240,0.07)',
              }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(45,110,255,0.08), transparent 60%)',
                }}
              />

              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(45,110,255,0.12)', border: '1px solid rgba(45,110,255,0.2)' }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2D6EFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={iconPaths[i]} />
                  </svg>
                </div>
                <h3 className="text-[#E8E8F0] font-semibold text-base md:text-lg leading-tight pt-1">
                  {card.title}
                </h3>
              </div>

              <p className="text-[#E8E8F0]/60 text-sm leading-relaxed flex-grow">
                {card.body}
              </p>

              <p
                className="text-xs font-medium mt-auto pt-3"
                style={{
                  color: '#7B3FE4',
                  borderTop: '1px solid rgba(123,63,228,0.15)',
                }}
              >
                {card.tagline}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(232,232,240,0.07)' }}
        >
          <p className="text-[#E8E8F0]/50 text-sm md:text-base max-w-2xl mb-4">
            {ta.sponsorPivot}
          </p>
          <button
            onClick={() => scrollToSection('partners')}
            className="text-sm font-medium text-[#2D6EFF] hover:text-[#7B3FE4] transition-colors tracking-wide"
          >
            {ta.sponsorLink}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
