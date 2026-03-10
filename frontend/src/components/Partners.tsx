import { motion } from 'framer-motion';
import { GraduationCap, Building, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import backend from '~backend/client';

const partnerTypes = [
  {
    icon: GraduationCap,
    title: 'Pentru Școli & Universități',
    description: 'Implementăm proiecte pilot de educație tech în instituția dvs. Oferim aplicații educaționale, tehnologii imersive (Realitate Virtuală / Augmentată), workshop-uri și instalații interactive. Transformăm predarea prin tehnologie aplicată.',
    cta: 'Deveniți Partener Educațional',
    color: '#00F0FF',
    type: 'educational'
  },
  {
    icon: Building,
    title: 'Pentru Primării & Instituții',
    description: 'Revitalizăm spații publice prin tehnologie interactivă. Transformăm piețe, parcuri și muzee în instalații imersive (Realitate Virtuală / Augmentată), jocuri urbane și experiențe educaționale. Creștem engagement-ul civic prin tech.',
    cta: 'Colaborați Cu Noi',
    color: '#FF003C',
    type: 'institutional'
  },
  {
    icon: Sparkles,
    title: 'Pentru Sponsori & Companii',
    description: 'Asociați-vă brandul cu proiecte tech de impact real. Finanțând ScapeLabs, investiți în educație, spații publice interactive și tehnologie aplicată. Oferim vizibilitate măsurabilă și raportare transparentă.',
    cta: 'Investiți în Viitor',
    color: '#00F0FF',
    type: 'sponsor'
  },
];

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

function PartnerModal({ isOpen, onClose, type }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const titles: Record<string, string> = {
    educational: 'PARTENERIAT STRATEGIC CU ȘCOLI & UNIVERSITĂȚI',
    institutional: 'PARTENERIAT STRATEGIC CU PRIMĂRII & INSTITUȚII',
    sponsor: 'PARTENERIAT STRATEGIC CU SPONSORI & COMPANII',
    generic: 'CONTACT DIRECT'
  };

  const descriptions: Record<string, string> = {
    educational: 'Suntem încântați să explorăm o colaborare. Fie că doriți un workshop de robotică pentru elevi sau implementarea unei soluții AR în laboratorul de biologie, suntem aici să construim împreună. Haideți să stabilim o discuție pentru a vedea cum putem aduce viitorul în instituția dumneavoastră.',
    institutional: 'Suntem încântați să explorăm o colaborare. Transformăm spații publice în experiențe interactive care cresc implicarea cetățenilor și atractivitatea orașului. Haideți să discutăm cum putem colabora pentru a aduce inovația în comunitatea dumneavoastră.',
    sponsor: 'Suntem încântați să explorăm o colaborare. Asociindu-vă brandul cu ScapeLabs, investiți în viitorul comunității și tehnologiei, obținând vizibilitate autentică și impact real. Haideți să discutăm despre oportunitățile de parteneriat.',
    generic: 'Suntem încântați să explorăm o colaborare. Haideți să discutăm despre cum putem lucra împreună pentru a aduce inovația în comunitatea dumneavoastră.'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setError('');
    setIsSubmitting(true);

    try {
      const response = await backend.forms.submit({
        formType: 'partner',
        partnerType: type,
        organizationName: type !== 'generic' ? formData.organizationName : undefined,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
      });

      if (response.success) {
        setSubmitted(true);
        setFormData({ organizationName: '', contactName: '', email: '', phone: '' });
      } else {
        setError('A apărut o eroare. Te rugăm să încerci din nou.');
      }
    } catch (err) {
      console.error('Partner form error:', err);
      const errorMessage = err instanceof Error ? err.message : 'A apărut o eroare la trimiterea formularului. Te rugăm să încerci din nou.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.contactName && formData.email && formData.phone && (type === 'generic' || formData.organizationName);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-lg p-8 shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-20 h-20 bg-[#00F0FF] rounded-full mx-auto flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-[#030303]" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-[#00F0FF]">
            Solicitare Trimisă!
          </h3>
          <p className="text-[#888888] mb-8">
            Mulțumim pentru interes. Vom reveni cu un răspuns în cel mai scurt timp.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-[#00F0FF] text-[#030303] font-bold rounded uppercase tracking-wide hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all"
          >
            Închide
          </button>
        </motion.div>
      </div>
    );
  }

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
          <span className="text-[#00F0FF]">{titles[type] || titles.generic}</span>
        </h3>
        
        <p className="text-[#888888] mb-6">
          {descriptions[type] || descriptions.generic}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type !== 'generic' && (
            <div>
              <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Nume Instituție / Companie</label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
                placeholder="Numele organizației"
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Nume Contact</label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="Numele dumneavoastră"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Telefon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="07xxxxxxxx"
              required
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/50 rounded text-red-400 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full px-6 py-4 bg-[#00F0FF] text-[#030303] font-bold rounded uppercase tracking-wide hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SE TRIMITE...' : 'TRIMITE SOLICITAREA'}
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

export function Partners() {
  const [modalType, setModalType] = useState<string | null>(null);

  return (
    <section id="partners" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/5 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,240,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mx-auto mb-6" />
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6">
            UN ECOSISTEM DESCHIS <span className="text-[#00F0FF]">COLABORĂRII</span>
          </h2>
          <p className="text-base md:text-xl text-[#888888] max-w-3xl mx-auto">
            ScapeLabs nu poate funcționa în vid. Căutăm parteneri care împărtășesc viziunea unui viitor mai interactiv, mai educat și mai conectat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeInOut' }}
              whileHover={{ y: -10 }}
              animate={{ y: 0 }}
              className="group relative"
            >
              <div 
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${partner.color}40, transparent)` }}
              />

              <div className="relative h-full p-6 md:p-10 bg-white/5 backdrop-blur-lg border border-white/10 group-hover:border-white/30 rounded-lg transition-all duration-500 flex flex-col">
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <partner.icon 
                    className="w-16 h-16" 
                    style={{ color: partner.color }}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3 className="text-2xl font-bold mb-6 tracking-tight">
                  {partner.title}
                </h3>

                <p className="text-[#CCCCCC] leading-relaxed mb-8 flex-grow text-base">
                  {partner.description}
                </p>

                <motion.button
                  onClick={() => setModalType(partner.type)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-4 border-2 font-semibold rounded-sm uppercase tracking-wide text-sm transition-all duration-300 group/btn"
                  style={{ 
                    borderColor: partner.color,
                    color: partner.color
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {partner.cta}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeInOut' }}
          className="mt-16 text-center"
        >
          <p className="text-[#888888] text-base md:text-lg mb-6">
            Sunteți interesat de o colaborare personalizată?
          </p>
          <button
            onClick={() => setModalType('generic')}
            className="inline-block px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#00F0FF] to-[#FF003C] text-white font-bold text-base md:text-lg rounded-sm uppercase tracking-wide hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all"
          >
            Contactați-ne Direct
          </button>
        </motion.div>
      </div>

      <PartnerModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || ''}
      />
    </section>
  );
}
