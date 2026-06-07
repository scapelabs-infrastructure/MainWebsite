import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const f = t.footerNew;

  return (
    <footer
      className="py-10 px-6 text-center"
      style={{ borderTop: '1px solid rgba(232,232,240,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#E8E8F0]/30 text-xs">{f.line1}</p>

        <div className="flex items-center gap-6">
          <a href={`mailto:${f.contact1}`} className="text-[#E8E8F0]/30 hover:text-[#2D6EFF] transition-colors text-xs">
            {f.contact1}
          </a>
          <a href={`mailto:${f.contact2}`} className="text-[#E8E8F0]/30 hover:text-[#2D6EFF] transition-colors text-xs">
            {f.contact2}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/privacy-policy" className="text-[#E8E8F0]/30 hover:text-[#E8E8F0] transition-colors text-xs">
            {f.privacy}
          </a>
          <span className="text-[#E8E8F0]/15 text-xs">·</span>
          <a href="/terms-of-service" className="text-[#E8E8F0]/30 hover:text-[#E8E8F0] transition-colors text-xs">
            {f.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}
