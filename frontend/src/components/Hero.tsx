import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { NeuralNetwork3D } from './NeuralNetwork3D';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden pb-0">
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
      >
        <NeuralNetwork3D />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-20"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
      />

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 text-center" style={{ opacity, scale: contentScale }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <img 
            src="/ScapeLabs-Logo.png" 
            alt="ScapeLabs Association"
            className="h-32 md:h-44 w-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: 'easeInOut' }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-8"
          style={{ letterSpacing: '-0.02em' }}
        >
          TRANSFORMĂM ORAȘELE
          <br />
          ÎN INTERFEȚE INTERACTIVE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
          className="text-[#888888] text-base md:text-lg max-w-[600px] mx-auto mb-12 leading-relaxed mt-6"
        >
          Nu suntem doar un ONG. Suntem laboratorul de R&D care dezvoltă aplicații educaționale, jocuri urbane și tehnologii imersive pentru spații publice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeInOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button 
            onClick={() => scrollToSection('voluntariat')}
            className="group relative px-8 py-4 bg-[#00F0FF] text-[#030303] font-bold rounded-sm uppercase tracking-wide overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#00F0FF] blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Intră în Echipă
              <ChevronRight size={20} />
            </span>
          </button>

          <button 
            onClick={() => scrollToSection('concepts')}
            className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-lg font-semibold rounded-sm uppercase tracking-wide hover:border-[#00F0FF] transition-all hover:scale-105 relative z-10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            Descoperă Proiectele
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, ease: 'easeInOut' }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-3 bg-[#00F0FF] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
