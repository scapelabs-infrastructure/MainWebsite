import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section id="manifesto" ref={ref} className="relative min-h-screen flex items-center justify-center py-4 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300F0FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="mb-16"
        >
          <div className="w-16 h-0.5 bg-[#00F0FF] mx-auto mb-6" />
          <h2 className="text-[#00F0FF] text-2xl md:text-4xl font-bold tracking-tight">
            {t.manifesto.label}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
          className="text-xl md:text-2xl text-[#EDEDED] leading-relaxed max-w-3xl mx-auto"
        >
          <p className="mb-6">
            {t.manifesto.body}
          </p>
          <p className="font-bold text-white relative inline-block">
            <span className="animate-pulse-glow">
              {t.manifesto.highlight}
            </span>{' '}
            {t.manifesto.rest}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl text-[#00F0FF]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, textShadow: "0 0 20px rgba(0, 240, 255, 0.5)" }}>
            {t.manifesto.founder}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
