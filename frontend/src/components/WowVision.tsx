import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function WowVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  
  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] px-6 py-16 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
      
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-10" />
        <img
          src="/1.jpeg"
          alt="Futuristic vision of Bucharest"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ y }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center leading-tight max-w-6xl"
        >
          {t.wowVision.words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block relative mr-3"
              style={{
                textShadow: '0 0 40px rgba(0,0,0,0.8)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(255,0,60,0.6)',
                  '0 0 30px rgba(255,0,60,0.8), 0 0 50px rgba(0,240,255,0.6)',
                  '0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(255,0,60,0.6)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
