import { motion } from 'framer-motion';
import { Zap, Users, Rocket, Trophy } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const statIcons = [Zap, Users, Rocket, Trophy];
const statColors = ['#10B981', '#EC4899', '#F59E0B', '#00F0FF'];

export function VibeStory() {
  const { t } = useLanguage();
  const stats = t.vibeStory.stats.map((label, i) => ({
    icon: statIcons[i],
    label,
    color: statColors[i],
  }));

  return (
    <section id="vibe-section" className="py-12 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t.vibeStory.title} <span className="text-[#00F0FF]">{t.vibeStory.highlight}</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00F0FF] to-[#FF003C] mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-center leading-tight">
            {t.vibeStory.subtitle}{' '}
            <span className="text-[#00F0FF]">{t.vibeStory.subtitleHighlight}</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-8 md:p-12 mb-12"
        >
          <p className="text-lg md:text-xl text-[#CCCCCC] leading-relaxed mb-6">
            {t.vibeStory.p1}
          </p>
          
          <p className="text-lg md:text-xl text-[#CCCCCC] leading-relaxed mb-6">
            {t.vibeStory.p2}
          </p>
          
          <p className="text-lg md:text-xl text-[#CCCCCC] leading-relaxed">
            {t.vibeStory.p3}{' '}
            <span className="text-white font-bold">{t.vibeStory.p3Bold}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group relative"
            >
              <div 
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${item.color}40, transparent)` }}
              />
              
              <div className="relative p-6 bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-lg transition-all duration-300 text-center">
                <item.icon
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: item.color }}
                  strokeWidth={1.5}
                />
                <p className="text-sm font-semibold text-white">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
