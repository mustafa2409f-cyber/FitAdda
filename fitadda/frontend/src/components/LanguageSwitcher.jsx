import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useFitAdda } from "../context/FitAddaContext";
const LANG_OPTIONS = [
  { code: "en", short: "EN", full: "English" },
  { code: "ur", short: "اردو", full: "اردو" },
  { code: "roman", short: "Roman", full: "Roman Urdu" }
];
const LanguageSwitcher = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();
  const { updateProfile } = useFitAdda();
  const handleSelect = (code) => {
    setLanguage(code);
    updateProfile({ language: code });
  };
  return <div
    className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F3EEFF] dark:bg-[#1F222A] border border-[#E5DDF7] dark:border-[#2E3340]"
    role="group"
    aria-label="Language switcher"
  >
      {!compact && <Globe size={14} className="text-[#7C3AED] dark:text-[#2DD4BF] mx-1.5 shrink-0" />}
      {LANG_OPTIONS.map((opt) => {
    const active = language === opt.code;
    return <button
      key={opt.code}
      type="button"
      onClick={() => handleSelect(opt.code)}
      title={opt.full}
      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${active ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white shadow-sm" : "text-[#4C4461] dark:text-[#D1D5DB] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF]"}`}
    >
            {opt.short}
          </button>;
  })}
    </div>;
};
export {
  LanguageSwitcher
};
