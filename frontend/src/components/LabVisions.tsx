import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const visionImages = [
  'https://scapelabs.io/media/association/8.jpeg',
  'https://scapelabs.io/media/association/9.jpeg',
  'https://scapelabs.io/media/association/10.jpeg',
  'https://scapelabs.io/media/association/11.jpeg',
  'https://scapelabs.io/media/association/12.jpeg',
  'https://scapelabs.io/media/association/13.jpeg',
];

const visionColors = [
  'from-[#FF003C]/20 to-[#00F0FF]/20',
  'from-purple-500/20 to-pink-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-violet-500/20 to-fuchsia-500/20',
  'from-red-500/20 to-orange-500/20',
];

export function LabVisions() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const { t } = useLanguage();
  const visions = t.labVisions.visions.map((v, i) => ({
    ...v,
    image: visionImages[i],
    color: visionColors[i],
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visions.length);
    }, 750);

    return () => clearInterval(interval);
  }, [isUserInteracting, visions.length]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / visions.length;
    container.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth',
    });
  }, [currentIndex, visions.length]);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  return (
    <section id="concepts" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,240,255,0.1) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <p className="text-[#888888] text-base md:text-xl max-w-3xl mx-auto">
            {t.labVisions.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visions.map((vision, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [index % 2 === 0 ? -50 : 50, index % 2 === 0 ? 50 : -50]
            );

            return (
              <motion.div
                key={vision.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                style={{ y: yOffset }}
                className="group relative"
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${vision.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay`}
                    />
                    <motion.img
                      src={vision.image}
                      alt={vision.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                        {vision.title}
                      </h3>
                      <p className="text-[#888888] text-sm md:text-base group-hover:text-[#CCCCCC] transition-colors duration-300">
                        {vision.subtitle}
                      </p>
                    </motion.div>

                    <motion.div
                      className="mt-4 h-0.5 bg-gradient-to-r from-[#00F0FF] to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          </div>

          <div 
            ref={scrollContainerRef}
            className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide"
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            onScroll={handleUserInteraction}
          >
          {visions.map((vision, index) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="flex-shrink-0 w-[85vw] snap-center"
            >
              <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 h-96">
                <div className="relative h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${vision.color} opacity-30 z-10 mix-blend-overlay`} />
                  <img
                    src={vision.image}
                    alt={vision.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {vision.title}
                  </h3>
                  <p className="text-[#888888] text-sm">
                    {vision.subtitle}
                  </p>
                  <div className="mt-4 h-0.5 bg-gradient-to-r from-[#00F0FF] to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
          </div>

          <div className="md:hidden flex justify-between items-center mt-8 px-4">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + visions.length) % visions.length)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all"
              aria-label="Previous vision"
            >
              <ChevronLeft className="w-6 h-6 text-[#00F0FF]" />
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % visions.length)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all"
              aria-label="Next vision"
            >
              <ChevronRight className="w-6 h-6 text-[#00F0FF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
