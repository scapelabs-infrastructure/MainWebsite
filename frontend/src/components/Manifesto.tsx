import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const galleryImages = [
  'https://scapelabs.io/media/association/team/1.jpg',
  'https://scapelabs.io/media/association/team/2.jpg',
  'https://scapelabs.io/media/association/team/3.jpg',
  'https://scapelabs.io/media/association/team/4.jpg',
];

export function Manifesto() {
  const { t } = useLanguage();
  const m = t.manifest;

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
                className="text-[#E8E8F0]/40 text-sm italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
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
            className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden"
          >
            {galleryImages.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 16,
                  delay: i * 4,
                  repeat: Infinity,
                  times: [0, 0.05, 0.95, 1],
                  ease: 'easeInOut',
                }}
              />
            ))}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 60%, rgba(8,8,16,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ border: '1px solid rgba(45,110,255,0.15)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
