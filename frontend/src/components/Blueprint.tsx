import { motion } from 'framer-motion';
import { Brain, Gamepad2, Blocks, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const cardIcons = [Brain, Gamepad2, Blocks, Zap];
const cardImages = ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg'];
const cardSpans = ['md:col-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1'];

export function Blueprint() {
  const { t } = useLanguage();
  const cards = t.blueprint.cards.map((card, i) => ({
    ...card,
    icon: cardIcons[i],
    image: cardImages[i],
    span: cardSpans[i],
  }));

  return (
    <section className="py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <div className="w-16 h-0.5 bg-[#00F0FF] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.blueprint.title} <span className="text-[#00F0FF]">{t.blueprint.highlight}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-[#00F0FF] transition-all duration-500 cursor-pointer ${card.span}`}
            >
              <div className="absolute inset-0">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent" />
              </div>

              <div className="relative p-8 flex flex-col h-full min-h-[280px]">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <card.icon className="w-10 h-10 text-[#00F0FF]" strokeWidth={1.5} />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {card.title}
                </h3>
                
                <p className="text-[#888888] leading-relaxed text-sm">
                  {card.body}
                </p>
              </div>

              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={false}
                animate={{
                  boxShadow: '0 0 0 0 rgba(0,240,255,0)'
                }}
                whileHover={{
                  boxShadow: '0 0 30px 2px rgba(0,240,255,0.3)'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
