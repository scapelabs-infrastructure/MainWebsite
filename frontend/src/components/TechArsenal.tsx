import { motion } from 'framer-motion';
import { Scan, Projector, BrainCircuit, Radar, Boxes, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PartnerModal } from './Partners';

const cardIcons = [Scan, Projector, BrainCircuit, Radar, Boxes, Gamepad2];

const partners = [
  { name: 'Asociația Escape Project', logo: '/partner-escape.png', url: 'https://www.instagram.com/_escape_project_/' },
  { name: 'ASER', logo: '/partner-aser.png', url: 'https://www.instagram.com/aserbucuresti/' },
  { name: 'Străzi pentru Oameni', logo: '/partner-strazi.png', url: 'https://strazipentruoameni.net/' },
  { name: 'ASPA', logo: '/partner-aspa.png', url: 'https://aspa.ro/' },
];

export function TechArsenal() {
  const { t } = useLanguage();
  const ta = t.techArsenal;
  const [sponsorOpen, setSponsorOpen] = useState(false);

  return (
    <section id="tech-arsenal" className="py-24 md:py-36 px-6 relative overflow-hidden">
      {/* Top fade from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #080810, transparent)' }}
      />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ta.cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                className="group relative rounded-2xl p-7 md:p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(10,10,20,0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(232,232,240,0.08)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 30% 20%, rgba(45,110,255,0.1), transparent 60%)',
                  }}
                />

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(45,110,255,0.22), rgba(123,63,228,0.22))',
                    border: '1px solid rgba(110,150,255,0.3)',
                    boxShadow: '0 0 24px rgba(45,110,255,0.12)',
                  }}
                >
                  <Icon size={30} strokeWidth={1.7} color="#8FB4FF" />
                </div>

                <h3
                  className="text-[#F2F3FA] font-bold text-xl md:text-2xl leading-snug"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {card.title}
                </h3>

                <p className="text-[#E8E8F0]/75 text-[15px] md:text-base leading-relaxed flex-grow">
                  {card.body}
                </p>

                <p className="flex items-start gap-2 text-[13px] leading-snug font-medium" style={{ color: '#9FC0FF' }}>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.12em] mt-[2px] flex-shrink-0"
                    style={{ color: '#7FB0FF' }}
                  >
                    {ta.impactLabel}
                  </span>
                  <span>{card.impact}</span>
                </p>

                <p
                  className="text-sm md:text-[15px] font-semibold mt-auto pt-4"
                  style={{
                    color: '#BCA4FF',
                    borderTop: '1px solid rgba(123,63,228,0.25)',
                  }}
                >
                  {card.tagline}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div id="partners" className="mt-16 scroll-mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className="flex items-center justify-center h-16 md:h-20"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                  className="flex items-center justify-center h-full"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-full w-auto max-w-[150px] md:max-w-[175px] object-contain transition-all duration-300 hover:scale-[1.04]"
                    style={{ filter: 'none', opacity: 1 }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 pt-10"
          style={{ borderTop: '1px solid rgba(232,232,240,0.07)' }}
        >
          <p className="text-[#E8E8F0]/55 text-sm md:text-base max-w-2xl mb-4">
            {ta.sponsorPivot}
          </p>
          <a
            href="/work-with-us"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2D6EFF] hover:text-[#7B3FE4] transition-colors tracking-wide"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>→</span>
            {ta.sponsorLink}
          </a>
        </motion.div>
      </div>

      <PartnerModal isOpen={sponsorOpen} onClose={() => setSponsorOpen(false)} type="sponsor" />
    </section>
  );
}
