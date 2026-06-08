import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const galleryImages = [
  '/gallery-cyber-arena.jpg',
  '/gallery-robot-park.png',
  '/gallery-ar-museum.png',
  '/gallery-interactive-museum.png',
  '/gallery-phone-mockup.png',
  '/gallery-video-mapping.png',
  '/gallery-classroom.png',
  '/gallery-amphitheater.png',
];

export function Manifesto() {
  const { t } = useLanguage();
  const m = t.manifest;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="manifesto" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(45,110,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{
                background: 'rgba(8,8,16,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(232,232,240,0.08)',
              }}
            >
              <div
                className="w-8 h-0.5 mb-8"
                style={{ background: 'linear-gradient(90deg, #2D6EFF, #7B3FE4)' }}
              />

              <p
                className="text-[#E8E8F0]/80 text-lg md:text-xl leading-relaxed mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {m.body}
              </p>

              <p className="text-[#E8E8F0] text-lg md:text-xl font-semibold mb-8">
                {m.bodyBold}
              </p>

              <p
                className="text-[#E8E8F0] text-lg md:text-xl italic"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 1px 12px rgba(45,110,255,0.2)',
                }}
              >
                {m.founderNote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="group relative h-80 lg:h-[480px] rounded-2xl overflow-hidden"
          >
            {galleryImages.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            ))}

            {/* Left arrow */}
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(8,8,16,0.6)', border: '1px solid rgba(232,232,240,0.15)', backdropFilter: 'blur(8px)' }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-[#E8E8F0]/70" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(8,8,16,0.6)', border: '1px solid rgba(232,232,240,0.15)', backdropFilter: 'blur(8px)' }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-[#E8E8F0]/70" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === activeIndex ? 'rgba(232,232,240,0.8)' : 'rgba(232,232,240,0.2)',
                    transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* CONCEPT label */}
            <div className="absolute top-4 right-4 z-30 pointer-events-none">
              <span
                className="text-[9px] tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(232,232,240,0.28)',
                  border: '1px solid rgba(232,232,240,0.12)',
                  padding: '3px 7px',
                  borderRadius: '3px',
                  letterSpacing: '0.2em',
                }}
              >
                CONCEPT
              </span>
            </div>

            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(180deg, transparent 60%, rgba(8,8,16,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl z-20"
              style={{ border: '1px solid rgba(45,110,255,0.15)' }}
            />
          </motion.div>
        </div>
      </div>
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080810)' }}
      />
    </section>
  );
}
