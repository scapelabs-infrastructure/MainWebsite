import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function DynamicIslandHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 md:w-auto max-w-5xl"
      >
        <nav className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full px-4 md:px-6 py-3 md:py-3 flex items-center justify-between md:justify-start gap-3 md:gap-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src="/ScapeLabs-Logo.png" 
              alt="ScapeLabs"
              className="h-12 md:h-14 w-auto"
            />
          </button>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('manifesto')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Manifest
            </button>
            <button
              onClick={() => scrollToSection('concepts')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Proiecte
            </button>
            <button
              onClick={() => scrollToSection('team-section')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Echipă
            </button>
            <button
              onClick={() => scrollToSection('vibe-section')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Voluntariat
            </button>
          </div>

          <button
            onClick={() => scrollToSection('voluntariat')}
            className="hidden md:block px-5 py-2 bg-[#00F0FF] text-[#030303] text-sm font-bold rounded-full hover:scale-105 transition-transform"
          >
            Intră în Echipă
          </button>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => scrollToSection('voluntariat')}
              className="px-3 py-1.5 bg-[#00F0FF] text-[#030303] text-xs font-bold rounded-full hover:scale-105 transition-transform whitespace-nowrap"
            >
              Intră în Echipă
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[135%] max-w-[540px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-10 py-24 px-10"
          onClick={() => setMobileMenuOpen(false)}
        >
          <button
            onClick={() => scrollToSection('manifesto')}
            className="text-3xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Manifest
          </button>
          <button
            onClick={() => scrollToSection('concepts')}
            className="text-3xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Proiecte
          </button>
          <button
            onClick={() => scrollToSection('team-section')}
            className="text-3xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Echipă
          </button>
          <button
            onClick={() => scrollToSection('vibe-section')}
            className="text-3xl font-medium text-white/80 hover:text-white transition-colors"
          >
            Voluntariat
          </button>
          <button
            onClick={() => scrollToSection('voluntariat')}
            className="px-10 py-5 bg-[#00F0FF] text-[#030303] text-xl font-bold rounded-full hover:scale-105 transition-transform"
          >
            Intră în Echipă
          </button>
        </motion.div>
      )}
    </>
  );
}
