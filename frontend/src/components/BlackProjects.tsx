import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const projectMeta = [
  { number: '01', name: 'PROJECT BIOSPHERE', status: 'IN DEVELOPMENT' },
  { number: '02', name: 'URBAN ROVER', status: 'PROTOTYPE' },
  { number: '03', name: 'NEON HISTORY', status: 'DEPLOYED' },
];

export function BlackProjects() {
  const { t } = useLanguage();
  const projects = projectMeta.map((meta, i) => ({
    ...meta,
    desc: t.blackProjects.projects[i].desc,
  }));

  return (
    <section className="py-12 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-[#030303] to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-[#FF003C]" />
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight">
              THE <span className="text-[#FF003C]">BLACK</span> PROJECTS
            </h2>
          </div>
          <p className="text-[#888888] font-mono text-sm uppercase tracking-wider">
            {t.blackProjects.classified}
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative p-6 md:p-8 bg-black/40 backdrop-blur-lg border-l-4 border-[#FF003C] hover:border-[#00F0FF] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF003C]/5 blur-3xl group-hover:bg-[#00F0FF]/10 transition-all" />
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-bold text-white/10 font-mono">
                      {project.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-mono">
                      {project.name}
                    </h3>
                  </div>
                  
                  <span className="inline-block px-4 py-2 bg-[#FF003C]/20 border border-[#FF003C] text-[#FF003C] text-xs font-mono uppercase tracking-wider">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-[#888888] text-lg leading-relaxed md:pl-24">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
