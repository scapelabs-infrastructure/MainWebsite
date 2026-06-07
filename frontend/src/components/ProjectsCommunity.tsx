import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const statusColors: Record<string, string> = {
  'Writing UX Document': '#7B3FE4',
  'Scriere Document UX': '#7B3FE4',
  'Active': '#2D6EFF',
  'Activ': '#2D6EFF',
  'In Development': '#E8E8F0',
  'În Dezvoltare': '#E8E8F0',
  'Seeking Partners': '#2D6EFF',
  'Căutăm Parteneri': '#2D6EFF',
  'Seeking Sponsors': '#0EA5E9',
  'Căutăm Sponsori': '#0EA5E9',
};

const projectImages = [
  '/project-academy.png',
  '/3.jpeg',
  '/1.jpeg',
  '/2.jpeg',
  '/vision-bucharest.png',
];

export function ProjectsCommunity() {
  const { t } = useLanguage();
  const pc = t.projectsCommunity;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="community" className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(123,63,228,0.06) 0%, transparent 70%)',
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
          {pc.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-4">
            {pc.projects.map((project, i) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(232,232,240,0.07)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background image — fades in on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{ opacity: hoveredIndex === i ? 1 : 0 }}
                >
                  <img
                    src={projectImages[i]}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.35) saturate(1.1)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(8,8,16,0.85) 0%, rgba(8,8,16,0.55) 60%, rgba(8,8,16,0.4) 100%)',
                    }}
                  />
                </div>

                {/* Dark base bg (when not hovered) */}
                <div
                  className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'rgba(8,8,16,0.6)',
                    opacity: hoveredIndex === i ? 0 : 1,
                  }}
                />

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: '1px solid rgba(45,110,255,0.3)' }}
                />

                {/* Card content */}
                <div className="relative z-10 p-6 flex items-start gap-4">
                  <span
                    className="text-3xl font-bold flex-shrink-0 leading-none mt-0.5 transition-colors duration-300"
                    style={{
                      color: hoveredIndex === i ? 'rgba(45,110,255,0.6)' : 'rgba(45,110,255,0.25)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {project.num}
                  </span>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-[#E8E8F0] text-base">{project.title}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          color: statusColors[project.status] || '#E8E8F0',
                          background: `${statusColors[project.status] || '#E8E8F0'}15`,
                          border: `1px solid ${statusColors[project.status] || '#E8E8F0'}30`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#E8E8F0]/50 text-sm leading-relaxed group-hover:text-[#E8E8F0]/70 transition-colors duration-300">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="lg:sticky lg:top-32"
          >
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: 'rgba(8,8,16,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(123,63,228,0.15)',
              }}
            >
              <div
                className="w-6 h-6 rounded-md mb-6 flex items-center justify-center"
                style={{ background: 'rgba(123,63,228,0.15)', border: '1px solid rgba(123,63,228,0.3)' }}
              >
                <div className="w-2 h-2 rounded-sm" style={{ background: '#7B3FE4' }} />
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold text-[#E8E8F0] mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {pc.academyTitle}
              </h3>

              <p className="text-[#E8E8F0]/60 text-sm leading-relaxed mb-8">
                {pc.academyBody}
              </p>

              <div className="space-y-5 mb-8">
                {pc.academyFeatures.map((feat, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(45,110,255,0.12)', border: '1px solid rgba(45,110,255,0.2)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2D6EFF]" />
                    </div>
                    <div>
                      <p className="text-[#E8E8F0] text-sm font-semibold mb-0.5">{feat.title}</p>
                      <p className="text-[#E8E8F0]/45 text-xs leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[#E8E8F0]/30 text-xs italic mb-8 pb-6" style={{ borderBottom: '1px solid rgba(232,232,240,0.06)' }}>
                {pc.academyNote}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/join#section-academy"
                  className="inline-block text-center py-3 px-8 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
                >
                  {pc.cta1}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
