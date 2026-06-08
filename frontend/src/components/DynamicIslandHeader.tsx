import { motion, AnimatePresence } from 'framer-motion';
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

  const navItems = [
    { label: t.header.tools, id: 'tech-arsenal', type: 'scroll' as const },
    { label: t.header.team, id: 'team-section', type: 'scroll' as const },
    { label: t.header.academy, href: '/join#section-academy', type: 'link' as const },
    { label: t.header.workWithUs, href: '/work-with-us', type: 'link' as const, gold: true },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 md:w-auto max-w-5xl"
    >
      {/* ── MOBILE PILL (expands in place) ── */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          background: 'rgba(8,8,16,0.88)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(232,232,240,0.10)',
          borderRadius: mobileMenuOpen ? '24px' : '9999px',
          transition: 'border-radius 0.38s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Top bar — always visible */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <a
            href="/"
            className="flex items-center flex-shrink-0"
            style={{ filter: isHome ? 'brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,0.22))' : 'brightness(1)' }}
          >
            <img src="/ScapeLabs-Logo.png" alt="ScapeLabs" className="h-14 w-auto" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
              className="text-xs font-mono tracking-widest"
              style={{ color: 'rgba(232,232,240,0.35)' }}
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
              className="p-1.5"
              style={{ color: 'rgba(232,232,240,0.6)' }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Expandable menu body */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {/* Hairline divider */}
              <div
                className="mx-5"
                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,232,240,0.12) 30%, rgba(232,232,240,0.12) 70%, transparent)' }}
              />

              {/* Nav items */}
              <div className="flex flex-col items-center gap-1 py-6 px-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.28, ease: 'easeOut' }}
                    className="w-full"
                  >
                    {item.type === 'scroll' ? (
                      <button
                        onClick={() => navigateToSection(item.id!)}
                        className="w-full text-center py-3 text-lg font-medium transition-colors rounded-xl hover:bg-white/5"
                        style={{ color: 'rgba(232,232,240,0.65)' }}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center py-3 text-lg font-medium transition-colors rounded-xl hover:bg-white/5"
                        style={{ color: item.gold ? 'rgba(212,168,67,0.9)' : 'rgba(232,232,240,0.65)' }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}

                {/* Bottom join CTA */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + navItems.length * 0.055, duration: 0.28, ease: 'easeOut' }}
                  className="w-full pt-3 mt-1"
                  style={{ borderTop: '1px solid rgba(232,232,240,0.07)' }}
                >
                  <a
                    href="/join"
                    className="block w-full text-center py-3 rounded-2xl text-base font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(45,110,255,0.85), rgba(123,63,228,0.85))' }}
                  >
                    {t.header.joinTeam}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP PILL (unchanged) ── */}
      <nav
        className="hidden md:flex items-center justify-between gap-3 px-6 py-3 rounded-full"
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
          <img src="/ScapeLabs-Logo.png" alt="ScapeLabs" className="h-12 w-auto" />
        </a>

        <div className="flex items-center gap-6">
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

        <div className="flex items-center gap-3">
          <a
            href="/join"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
          >
            {t.header.joinTeam}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
