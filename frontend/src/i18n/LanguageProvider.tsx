import { useState, ReactNode } from 'react';
import { translations, Lang, Translations } from './translations';
import { LanguageContext } from './LanguageContext';

function detectBrowserLang(): Lang {
  const saved = localStorage.getItem('scapelabs-lang');
  if (saved === 'ro' || saved === 'en') return saved;
  const browserLang = navigator.language || navigator.languages?.[0] || 'ro';
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'ro';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectBrowserLang);

  const setLang = (newLang: Lang) => {
    localStorage.setItem('scapelabs-lang', newLang);
    setLangState(newLang);
  };

  const t = translations[lang] as Translations;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
