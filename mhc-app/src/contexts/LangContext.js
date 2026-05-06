import { createContext, useContext, useState } from 'react';
import vi from '../locales/vi';
import en from '../locales/en';

const translations = { vi, en };

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('mhc_lang') || 'vi');

  const toggle = () => setLang(l => {
    const next = l === 'vi' ? 'en' : 'vi';
    localStorage.setItem('mhc_lang', next);
    return next;
  });

  const t = (key) => {
    const keys = key.split('.');
    let obj = translations[lang];
    for (const k of keys) {
      if (obj == null) return key;
      obj = obj[k];
    }
    return obj ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
