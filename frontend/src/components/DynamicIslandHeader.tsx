import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function DynamicIslandHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const isHome = window.location.pathname === '/';

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navigateToSection = (id: string) => {
    if (window.location.pathname === '/') {
      scrollToSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 md:w-auto max-w-5xl"
      >
        <nav
          className="flex items-center justify-between md:justify-start gap-3 md:gap-8 px-4 md:px-6 py-3 rounded-full"
          style={{
            background: 'rgba(8,8,16,0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(232,232,240,0.08)',
          }}
        >
          <a
            href="/"
            className="flex items-center flex-shrink-0 transition-all duration-300"
            style={{ filter: isHome ? 'brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,0.25))' : 'brightness(1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,0.25))')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = isHome ? 'brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,0.25))' : 'brightness(1)')}
          >
            <img src="/ScapeLabs-Logo.png" alt="ScapeLabs" className="h-10 md:h-12 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-6">
            {[
              { label: t.header.tools, id: 'tech-arsenal' },
              { label: t.header.team, id: 'team-section' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigateToSection(item.id)}
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(232,232,240,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E8E8F0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,232,240,0.6)')}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/join#section-academy"
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(232,232,240,0.6)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E8E8F0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,232,240,0.6)')}
            >
              {t.header.academy}
            </a>
            <a
              href="/work-with-us"
              className="text-sm font-medium whitespace-nowrap transition-colors"
              style={{ color: 'rgba(212,168,67,0.7)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A843')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(212,168,67,0.7)')}
            >
              {t.header.workWithUs}
            </a>

            <span style={{ width: '1px', height: '16px', background: 'rgba(232,232,240,0.1)', display: 'inline-block', flexShrink: 0 }} />

            <button
              onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
              className="text-xs font-mono tracking-widest transition-colors"
              style={{ color: 'rgba(232,232,240,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(232,232,240,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,232,240,0.3)')}
            >
              {lang === 'ro' ? 'EN' : 'RO'}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/join"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
            >
              {t.header.joinTeam}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
              className="text-xs font-mono tracking-widest transition-colors"
              style={{ color: 'rgba(232,232,240,0.3)' }}
            >
              {lang === 'ro' ? 'EN' : 'RO'}
            </button>
            <a
              href="/join"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
            >
              {t.header.joinTeam}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 transition-colors"
              style={{ color: 'rgba(232,232,240,0.6)' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm rounded-2xl flex flex-col items-center justify-center gap-8 py-16 px-8"
          style={{
            background: 'rgba(8,8,16,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(232,232,240,0.08)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          {[
            { label: t.header.tools, id: 'tech-arsenal' },
            { label: t.header.team, id: 'team-section' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigateToSection(item.id)}
              className="text-2xl font-medium text-[#E8E8F0]/70 hover:text-[#E8E8F0] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/join#section-academy"
            className="text-2xl font-medium text-[#E8E8F0]/70 hover:text-[#E8E8F0] transition-colors"
          >
            {t.header.academy}
          </a>
          <a
            href="/work-with-us"
            className="text-2xl font-medium transition-colors"
            style={{ color: 'rgba(212,168,67,0.7)' }}
          >
            {t.header.workWithUs}
          </a>
          <a
            href="/join"
            className="px-10 py-4 rounded-full text-lg font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
          >
            {t.header.joinTeam}
          </a>
        </motion.div>
      )}
    </>
  );
}
