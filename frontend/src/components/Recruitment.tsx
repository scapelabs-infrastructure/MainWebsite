import { motion } from 'framer-motion';
import { Lightbulb, Code, TrendingUp, Radio } from 'lucide-react';
import { useState } from 'react';
import backend from '~backend/client';
import { CheckCircle, AlertCircle } from 'lucide-react';

const guilds = [
  {
    name: 'ARHITECȚII',
    subtitle: 'Creativity & Design',
    icon: Lightbulb,
    description: 'Rolul tău: Concept art, UI/UX design, copywriting, game design. Gândești experiențe de utilizator, definești identitatea vizuală a aplicațiilor și creezi conținut care comunică clar.',
    color: '#10B981',
    modalIntro: 'Bun venit în nucleul creativ. Aici gândești factorul "WOW" din spatele proiectelor noastre. Căutăm minți care refuză banalul și vor să redefinească estetica viitorului prin design, copy sau concepte de produs. Ești gata să schimbi regulile?',
  },
  {
    name: 'INGINERII',
    subtitle: 'Tech & Code',
    icon: Code,
    description: 'Rolul tău: AI, Unity3D, AR/VR, web development, robotică. Construiești aplicații mobile, backend, instalații hardware și integrări tehnologice pentru proiectele noastre.',
    color: '#00F0FF',
    modalIntro: 'E timpul să spargi bariera dintre ecran și realitate. De la AR la robotică și Vibe Coding, aici e laboratorul unde hardware-ul învață să danseze sub codul tău. Căutăm devs care vor să construiască produse reale, nu doar tutoriale.',
  },
  {
    name: 'VÂNĂTORII',
    subtitle: 'Growth & Sales',
    icon: TrendingUp,
    description: 'Rolul tău: Fundraising, partnerships, grant writing. Identifici sponsori, redactezi cereri de finanțare, negociezi colaborări cu corporații și primării. Înveți business development aplicat pe proiecte de zeci de mii de euro.',
    color: '#F59E0B',
    modalIntro: 'Căutăm \'hustlers\' care înțeleg că inovația are nevoie de combustibil. Învață cum se închid deal-uri de zeci de mii de euro, cum se scriu granturi de succes și cum se negociază cu coloșii din corporații.',
  },
  {
    name: 'VOCEA',
    subtitle: 'Content & PR',
    icon: Radio,
    description: 'Rolul tău: Video production, social media, public speaking, actor în TikTok-uri. Creezi conținut pentru TikTok/Instagram, filmezi behind-the-scenes, editezi video sau vorbești în fața publicului în licee și evenimente.',
    color: '#EC4899',
    modalIntro: 'Ești gata să devii fața revoluției? Căutăm carismă pură pe sticlă și maeștri ai editării care să facă ScapeLabs viral. Vei filma Vox Populi, vei prezenta în licee SAU vei fi vocea care inspiră o întreagă generație.',
  },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: string;
  modalIntro: string;
}

function ApplicationModal({ isOpen, onClose, department, modalIntro }: ModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    leadership: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setError('');
    setIsSubmitting(true);

    try {
      const response = await backend.forms.submit({
        formType: 'team',
        department,
        contactName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Leadership: ${formData.leadership}\n\nPrezentare: ${formData.message}`,
      });

      if (response.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', leadership: '', message: '' });
      } else {
        setError('A apărut o eroare. Te rugăm să încerci din nou.');
      }
    } catch (err) {
      console.error('Team application error:', err);
      const errorMessage = err instanceof Error ? err.message : 'A apărut o eroare la trimiterea aplicației. Te rugăm să încerci din nou.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.email && formData.phone;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-lg bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-lg p-8 shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-20 h-20 bg-[#00F0FF] rounded-full mx-auto flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-[#030303]" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-[#00F0FF]">
            Aplicație Trimisă!
          </h3>
          <p className="text-[#888888] mb-8">
            Mulțumim pentru aplicație! Vom reveni cu un răspuns în cel mai scurt timp.
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
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
          Aplică pentru <span className="text-[#00F0FF]">{department}</span>
        </h3>
        
        <p className="text-[#CCCCCC] mb-6 leading-relaxed">
          {modalIntro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Nume</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="Numele tău complet"
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
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
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
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors"
              placeholder="07xxxxxxxx"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">Ai experiență cu leadership-ul? Povestește-ne scurt.</label>
            <textarea
              rows={3}
              value={formData.leadership}
              onChange={(e) => setFormData({ ...formData, leadership: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
              placeholder="Împărtășește experiențele tale de leadership..."
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-2">O scurtă prezentare</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded text-white placeholder:text-[#666666] focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
              placeholder="Cine ești și de ce vrei să te alături?"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 backdrop-blur-xl border border-red-500/50 rounded text-red-400 flex items-center gap-3"
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
            {isSubmitting ? 'SE TRIMITE...' : 'TRIMITE APLICAȚIA'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-[#888888]">
            Pentru întrebări, scrie-ne pe WhatsApp:{' '}
            <a href="https://wa.me/40750480100" className="text-[#00F0FF] hover:underline font-semibold">
              0750480100
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function Recruitment() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedModalIntro, setSelectedModalIntro] = useState<string>('');

  const handleJoinClick = (guildName: string, modalIntro: string) => {
    setSelectedDepartment(guildName);
    setSelectedModalIntro(modalIntro);
  };

  return (
    <section id="voluntariat" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
            NU CĂUTĂM VOLUNTARI.
          </h2>
          <h3 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 text-[#00F0FF]">
            CĂUTĂM CO-CREATORI.
          </h3>
          <p className="text-base md:text-xl text-[#888888] max-w-3xl mx-auto mt-8">
            Alege-ți echipa și construiește proiecte reale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guilds.map((guild, index) => (
            <motion.div
              key={guild.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeInOut' }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div 
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${guild.color}40, transparent)` }}
              />
              
              <div className="relative h-full p-6 md:p-8 bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-lg transition-all duration-300">
                <div className="flex flex-col h-full">
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.15
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <guild.icon 
                      className="w-16 h-16" 
                      style={{ color: guild.color }}
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-2 tracking-tight">
                    {guild.name}
                  </h3>
                  
                  <p 
                    className="text-sm font-mono uppercase tracking-wider mb-6"
                    style={{ color: guild.color }}
                  >
                    {guild.subtitle}
                  </p>

                  <p className="text-[#CCCCCC] leading-relaxed text-base mb-8 flex-grow">
                    {guild.description}
                  </p>

                  <button
                    onClick={() => handleJoinClick(guild.name, guild.modalIntro)}
                    className="w-full py-3 border border-[#00F0FF] text-[#00F0FF] font-mono text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-[#030303] transition-all duration-300"
                  >
                    [ JOIN ]
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ApplicationModal
        isOpen={selectedDepartment !== null}
        onClose={() => {
          setSelectedDepartment(null);
          setSelectedModalIntro('');
        }}
        department={selectedDepartment || ''}
        modalIntro={selectedModalIntro}
      />
    </section>
  );
}
