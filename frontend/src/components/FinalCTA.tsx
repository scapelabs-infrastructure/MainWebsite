import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export function FinalCTA() {
  const { t } = useLanguage();
  const cta = t.finalCtaNew;

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative flex flex-col justify-center px-10 py-20 md:px-16 md:py-24"
          style={{ background: 'rgba(45,110,255,0.06)', borderTop: '1px solid rgba(45,110,255,0.1)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(45,110,255,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#E8E8F0] mb-4 leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cta.leftTitle}
            </p>
            <p className="text-[#E8E8F0]/60 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              {cta.leftBody}
            </p>
            <a
              href="/work-with-us"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D6EFF] hover:text-white transition-colors group"
            >
              {cta.leftCta}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="relative flex flex-col justify-center px-10 py-20 md:px-16 md:py-24"
          style={{ background: 'rgba(123,63,228,0.06)', borderTop: '1px solid rgba(123,63,228,0.1)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(123,63,228,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#E8E8F0] mb-4 leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cta.rightTitle}
            </p>
            <p className="text-[#E8E8F0]/60 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              {cta.rightBody}
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7B3FE4] hover:text-white transition-colors group"
            >
              {cta.rightCta}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
