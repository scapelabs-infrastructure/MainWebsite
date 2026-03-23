import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const memberImages = [
  'https://scapelabs.io/media/association/team/1.jpg',
  'https://scapelabs.io/media/association/team/2.jpg',
  'https://scapelabs.io/media/association/team/3.jpg',
  'https://scapelabs.io/media/association/team/4.jpg',
  'https://scapelabs.io/media/association/team/5.jpg',
  'https://scapelabs.io/media/association/team/6.jpg',
  'https://scapelabs.io/media/association/team/7.jpg',
  'https://scapelabs.io/media/association/team/8.jpg',
];

export function Team() {
  const { t } = useLanguage();
  const teamMembers = t.team.members.map((m, i) => ({
    ...m,
    image: memberImages[i],
  }));

  return (
    <section id="team-section" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2 uppercase">
            {t.team.sectionTitle}
          </h2>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-[#00F0FF] uppercase">
            {t.team.sectionHighlight}
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeInOut' }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div 
                className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, #00F0FF, #FF003C)' }}
              />
              
              <div className="relative h-full flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover:border-[#00F0FF]/50 rounded-lg transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 via-transparent to-[#FF003C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-full aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />
                </div>

                <div className="absolute top-3 left-3 z-10">
                  <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
                </div>

                <div className="p-4 md:p-6 mt-auto relative z-10">
                  <div className="mb-2 px-2 py-1 bg-[#00F0FF]/20 border border-[#00F0FF]/30 rounded inline-block">
                    <p className="text-[10px] md:text-xs text-[#00F0FF] font-mono uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  
                  <h4 className="text-base md:text-lg font-bold text-white">
                    {member.name}
                  </h4>

                  <div className="mt-3 h-[1px] bg-gradient-to-r from-[#00F0FF] via-white/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
