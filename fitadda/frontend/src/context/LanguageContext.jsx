// Language Context: supports English (en), Urdu RTL (ur), and Roman Urdu (roman)
import { createContext, useContext, useEffect, useState } from "react";
import en from "../translations/en.json";
import ur from "../translations/ur.json";
import roman from "../translations/roman.json";
const DICTIONARIES = {
  en,
  ur,
  roman
};
const LANGUAGE_STORAGE_KEY = "fitadda_language";
function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return void 0;
  }, obj);
}
const LanguageContext = createContext(null);
const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "en" || saved === "ur" || saved === "roman") {
        return saved;
      }
    } catch {
    }
    return "en";
  });
  const isRTL = language === "ur";
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
    }
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language === "ur" ? "ur" : "en";
  }, [language, isRTL]);
  const setLanguage = (lang) => {
    setLanguageState(lang);
  };
  const t = (path, vars) => {
    const raw = resolvePath(DICTIONARIES[language], path) ?? resolvePath(DICTIONARIES.en, path) ?? path;
    let text = typeof raw === "string" ? raw : path;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      });
    }
    return text;
  };
  const tList = (path) => {
    const raw = resolvePath(DICTIONARIES[language], path) ?? resolvePath(DICTIONARIES.en, path);
    return Array.isArray(raw) ? raw.map(String) : [];
  };
  return <LanguageContext.Provider value={{ language, isRTL, setLanguage, t, tList }}>
      {children}
    </LanguageContext.Provider>;
};
const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
export {
  LanguageProvider,
  useLanguage
};
