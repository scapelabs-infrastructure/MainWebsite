import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const projectImages = [
  'https://scapelabs.io/media/association/5.jpeg',
  '/3.jpeg',
  'https://scapelabs.io/media/association/6.jpeg',
  'https://scapelabs.io/media/association/7.jpeg',
];

const projectNumbers = ['01', '02', '03', '04'];

export function PilotProjects() {
  const { t } = useLanguage();
  const projects = t.pilotProjects.projects.map((p, i) => ({
    ...p,
    number: projectNumbers[i],
    image: projectImages[i],
  }));

  return (
    <section id="pilot-projects" className="py-12 md:py-32 px-6 bg-gradient-to-b from-transparent via-[#030303] to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-[#FF003C]" />
            <div className="w-16 h-0.5 bg-[#FF003C]" />
          </div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
            {t.pilotProjects.title} <span className="text-[#FF003C]">Q1 2026</span>
          </h2>
          <p className="text-[#888888] text-base md:text-xl max-w-3xl mx-auto mt-6">
            {t.pilotProjects.subtitle}
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeInOut' }}
              className="group relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <motion.div
                  className={`relative overflow-hidden rounded-lg ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF003C]/20 to-[#00F0FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-64 md:h-80 object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#FF003C] text-white text-xs md:text-sm font-mono uppercase tracking-wider font-bold">
                      {project.number}
                    </span>
                  </div>
                </motion.div>

                <div className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight font-mono">
                      {project.name}
                    </h3>
                  </div>

                  <p 
                    className="text-[#CCCCCC] text-base md:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: project.desc }}
                  />

                  <motion.div
                    className="pt-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="h-0.5 bg-gradient-to-r from-[#FF003C] via-[#00F0FF] to-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
