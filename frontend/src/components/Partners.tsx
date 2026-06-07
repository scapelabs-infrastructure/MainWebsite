import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import backend from '~backend/client';
import { useLanguage } from '../i18n/LanguageContext';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export function PartnerModal({ isOpen, onClose, type }: PartnerModalProps) {
  const { t, lang } = useLanguage();
  const m = t.partners.modal;
  const [formData, setFormData] = useState({ organizationName: '', contactName: '', email: '', phone: '' });
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
        formType: 'partner',
        partnerType: type,
        organizationName: type !== 'generic' ? formData.organizationName : undefined,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        language: lang,
      });
      if (response.success) {
        setSubmitted(true);
        setFormData({ organizationName: '', contactName: '', email: '', phone: '' });
      } else {
        setError(m.errorGeneric);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : m.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    formData.contactName && formData.email && formData.phone && (type === 'generic' || formData.organizationName);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-lg rounded-2xl p-8 shadow-2xl text-center"
          style={{ background: '#0d0d1a', border: '1px solid rgba(45,110,255,0.2)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{ background: 'rgba(45,110,255,0.15)', border: '1px solid rgba(45,110,255,0.3)' }}>
            <CheckCircle size={32} className="text-[#2D6EFF]" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#E8E8F0]">{m.successTitle}</h3>
          <p className="text-[#E8E8F0]/50 mb-8">{m.successMsg}</p>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-lg font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
          >
            {m.close}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-lg rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: '#0d0d1a', border: '1px solid rgba(45,110,255,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E8E8F0]/30 hover:text-[#E8E8F0] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-bold mb-1 text-[#E8E8F0]">
          {m.titles[type as keyof typeof m.titles] || m.titles.generic}
        </h3>
        <p className="text-[#E8E8F0]/40 text-sm mb-6">
          {m.descriptions[type as keyof typeof m.descriptions] || m.descriptions.generic}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type !== 'generic' && (
            <div>
              <label className="block text-xs font-medium text-[#E8E8F0]/50 mb-1.5 uppercase tracking-wide">{m.orgName}</label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm text-[#E8E8F0] placeholder:text-[#E8E8F0]/20 focus:outline-none transition-colors"
                style={{ background: 'rgba(232,232,240,0.04)', border: '1px solid rgba(232,232,240,0.08)' }}
                placeholder={m.orgPlaceholder}
                required
                disabled={isSubmitting}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-[#E8E8F0]/50 mb-1.5 uppercase tracking-wide">{m.contactName}</label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg text-sm text-[#E8E8F0] placeholder:text-[#E8E8F0]/20 focus:outline-none transition-colors"
              style={{ background: 'rgba(232,232,240,0.04)', border: '1px solid rgba(232,232,240,0.08)' }}
              placeholder={m.contactPlaceholder}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#E8E8F0]/50 mb-1.5 uppercase tracking-wide">{m.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm text-[#E8E8F0] placeholder:text-[#E8E8F0]/20 focus:outline-none"
                style={{ background: 'rgba(232,232,240,0.04)', border: '1px solid rgba(232,232,240,0.08)' }}
                placeholder="email@org.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#E8E8F0]/50 mb-1.5 uppercase tracking-wide">{m.phone}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm text-[#E8E8F0] placeholder:text-[#E8E8F0]/20 focus:outline-none"
                style={{ background: 'rgba(232,232,240,0.04)', border: '1px solid rgba(232,232,240,0.08)' }}
                placeholder="07xxxxxxxx"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg flex items-center gap-2 text-sm"
              style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff8080' }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full py-3.5 rounded-lg font-semibold text-white text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
          >
            {isSubmitting ? m.submitting : m.submit}
          </button>
        </form>

        <div className="mt-5 pt-5 text-center" style={{ borderTop: '1px solid rgba(232,232,240,0.06)' }}>
          <p className="text-xs text-[#E8E8F0]/30">
            {m.callDirect}{' '}
            <a href="tel:+40750480100" className="text-[#2D6EFF] hover:underline">
              0750480100
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

