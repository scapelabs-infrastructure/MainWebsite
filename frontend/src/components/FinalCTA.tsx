import { motion } from 'framer-motion';

interface FinalCTAProps {
  onRecruitmentClick: () => void;
  onPartnerClick: () => void;
}

export function FinalCTA({ onRecruitmentClick, onPartnerClick }: FinalCTAProps) {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#FF003C]/10 to-[#030303] opacity-50" />
      
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,0,60,0.5) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-16 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ textShadow: '0 0 40px rgba(255,0,60,0.6), 0 0 80px rgba(0,240,255,0.4)' }}
          >
            EȘTI GATA SĂ CONSTRUIEȘTI?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={onRecruitmentClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-[#00F0FF] text-[#030303] font-black text-xl rounded-sm uppercase tracking-wide overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-[#00F0FF] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" />
              <span className="relative flex items-center gap-2">
                DA, CA VOLUNTAR
              </span>
            </motion.button>

            <motion.button
              onClick={onPartnerClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 border-2 border-[#FF003C] text-[#FF003C] bg-[#FF003C]/10 backdrop-blur-lg font-black text-xl rounded-sm uppercase tracking-wide hover:bg-[#FF003C]/20 transition-all"
            >
              DA, CA PARTENER
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
