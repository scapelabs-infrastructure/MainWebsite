import { createContext, useContext } from 'react';
import { Lang, Translations } from './translations';

export interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
