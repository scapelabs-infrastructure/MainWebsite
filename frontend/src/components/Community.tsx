import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const pillarIcons = ['◎', '◈', '◉', '✦', '◆'];

export function Community() {
  const { t } = useLanguage();
  const c = t.community;

  return (
    <section id="community-hub" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(14,165,233,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Top two-column: title/intro left, 3 community pillars right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div
                className="w-8 h-0.5 mb-8"
                style={{ background: 'linear-gradient(90deg, #0EA5E9, #7B3FE4)' }}
              />
              <h2
                className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {c.title}
              </h2>
              <p className="text-[#E8E8F0]/60 text-base md:text-lg leading-relaxed mb-10">
                {c.intro}
              </p>
              <a
                href="/join"
                className="inline-block py-3 px-6 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0EA5E9, #7B3FE4)' }}
              >
                {c.cta}
              </a>
            </motion.div>
          </div>

          <div className="space-y-3">
            {c.pillars.slice(0, 3).map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative rounded-xl p-5 transition-all duration-300"
                style={{
                  background: 'rgba(8,8,16,0.6)',
                  border: '1px solid rgba(232,232,240,0.07)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: '1px solid rgba(14,165,233,0.2)' }}
                />
                <div className="flex gap-4 items-start">
                  <span className="text-lg flex-shrink-0 mt-0.5" style={{ color: 'rgba(232,232,240,0.3)' }}>
                    {pillarIcons[i]}
                  </span>
                  <div>
                    <p className="text-[#E8E8F0] font-semibold text-sm mb-1">{pillar.title}</p>
                    <p className="text-[#E8E8F0]/50 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row: Erasmus + ESC side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {c.pillars.slice(3).map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
              className="group relative rounded-xl p-5 transition-all duration-300"
              style={{
                background: 'rgba(14,165,233,0.04)',
                border: '1px solid rgba(14,165,233,0.15)',
              }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: '1px solid rgba(14,165,233,0.3)' }}
              />
              <div className="flex gap-4 items-start">
                <span className="text-lg flex-shrink-0 mt-0.5" style={{ color: '#0EA5E9' }}>
                  {pillarIcons[3 + i]}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#0EA5E9' }}>{pillar.title}</p>
                  <p className="text-[#E8E8F0]/50 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
