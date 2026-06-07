import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const memberImages = [
  'https://scapelabs.io/media/association/team/1.jpg',
  'https://scapelabs.io/media/association/team/2.jpg',
  'https://scapelabs.io/media/association/team/4.jpg',
  'https://scapelabs.io/media/association/team/3.jpg',
  'https://scapelabs.io/media/association/team/5.jpg',
  'https://scapelabs.io/media/association/team/6.jpg',
  'https://scapelabs.io/media/association/team/7.jpg',
  'https://scapelabs.io/media/association/team/8.jpg',
];

export function Team() {
  const { t } = useLanguage();
  const tb = t.teamBoard;

  const members = tb.members.map((m, i) => ({ ...m, image: memberImages[i] }));

  return (
    <section id="team-section" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(45,110,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight mb-16"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {tb.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div
              className="w-8 h-0.5 mb-6"
              style={{ background: 'linear-gradient(90deg, #2D6EFF, #7B3FE4)' }}
            />
            <p className="text-[#E8E8F0]/70 text-base md:text-lg leading-relaxed mb-6">
              {tb.introLeft}
            </p>
            <a
              href="https://www.linkedin.com/in/larismarcu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2D6EFF] hover:text-[#7B3FE4] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              /in/larismarcu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {members.slice(0, 4).map((member, i) => (
                <motion.div
                  key={member.name}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(232,232,240,0.07)' }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(8,8,16,0.95) 100%)' }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[#E8E8F0] font-semibold text-xs">{member.name}</p>
                    <p className="text-[#E8E8F0]/40 text-xs mt-0.5" style={{ fontSize: '10px' }}>{member.role}</p>
                    <p className="text-[#2D6EFF] mt-1 leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontSize: '9px' }}>
                      {member.advantage}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
