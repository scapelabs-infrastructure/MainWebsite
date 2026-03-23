import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-24 md:py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          <div>
            <h3 className="text-[#00F0FF] font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t.footer.nav}
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('manifest')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  {t.footer.navLinks.manifesto}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('proiecte')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  {t.footer.navLinks.projects}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('recruitment')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  {t.footer.navLinks.join}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00F0FF] font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@scapelabs.io" className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors break-all text-sm">
                  contact@scapelabs.io
                </a>
              </li>
              <li>
                <a href="mailto:partnerships@scapelabs.io" className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors break-all text-sm">
                  partnerships@scapelabs.io
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00F0FF] font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#888888] text-xs md:text-sm text-center md:text-left">
            © 2026 ScapeLabs Association.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#888888] text-xs md:text-sm font-mono">
              {t.footer.systemOnline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
