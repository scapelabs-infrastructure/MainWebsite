import { motion } from 'framer-motion';
import { useState } from 'react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

function PartnerModal({ isOpen, onClose, type }: PartnerModalProps) {
  if (!isOpen) return null;

  const titles: Record<string, string> = {
    volunteer: 'ALĂTURĂ-TE ECHIPEI',
    partner: 'DEVINO PARTENER FONDATOR'
  };

  const descriptions: Record<string, string> = {
    volunteer: 'Excelentă alegere! Vei avea ocazia să lucrezi la proiecte de impact, să înveți de la experți și să îți construiești un portofoliu remarcabil. Cei mai implicați membri ai echipei au mereu prima șansă la rolurile plătite care apar în ecosistemul ScapeLabs.',
    partner: 'Suntem încântați să explorăm o colaborare strategică. Asociindu-vă cu ScapeLabs, investiți în viitorul comunității și tehnologiei, obținând vizibilitate autentică și impact real.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold mb-2">
          <span className="text-[#00F0FF]">{titles[type]}</span>
        </h3>
        
        <p className="text-[#888888] mb-6 leading-relaxed">
          {descriptions[type]}
        </p>

        <form className="space-y-4">
          {type === 'partner' && (
            <div>
              <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Nume Instituție / Companie</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
                placeholder="Numele organizației"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Nume</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="Numele tău complet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Telefon</label>
            <input
              type="tel"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="07xxxxxxxx"
            />
          </div>

          {type === 'volunteer' && (
            <div>
              <label className="block text-sm font-medium text-[#CCCCCC] mb-2">O scurtă prezentare</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
                placeholder="Cine ești și de ce vrei să te alături?"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-4 bg-[#00F0FF] text-[#030303] font-bold rounded uppercase tracking-wide hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all"
          >
            TRIMITE SOLICITAREA
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-[#888888]">
            Sau sunați direct la:{' '}
            <a href="tel:+40750480100" className="text-[#00F0FF] hover:underline font-semibold">
              0750480100
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function Footer() {
  const [modalType, setModalType] = useState<string | null>(null);

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
              Navigare
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('manifest')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  Manifestul
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('proiecte')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  Proiecte Pilot
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('recruitment')} className="text-[#CCCCCC] hover:text-[#00F0FF] transition-colors text-sm text-left">
                  Alătură-te Echipei
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00F0FF] font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">
              Contact
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
              Legal
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
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>

      <PartnerModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || ''}
      />
    </footer>
  );
}
