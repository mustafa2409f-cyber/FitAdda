import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Globe, Search, X } from "lucide-react";
import { COUNTRIES_LIST } from "../data/countries";
import { useLanguage } from "../context/LanguageContext";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
const CountrySelector = ({
  selectedCode,
  onSelect,
  maxHeightClass = "max-h-[340px]"
}) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES_LIST;
    return COUNTRIES_LIST.filter(
      (c) => c.name.en.toLowerCase().includes(q) || c.name.ur.includes(q) || c.name.roman.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [query]);
  return <div className="space-y-3.5">
      {
    /* Search bar */
  }
      <div className="relative">
        <Search
    size={16}
    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]"
  />
        <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={t("onboarding.countrySearchPlaceholder")}
    className="w-full ps-10 pe-9 py-3 rounded-xl border border-[#E5DDF7] dark:border-[#2E3340] bg-white dark:bg-[#181A20] text-sm text-[#1E1B2E] dark:text-[#F3F4F6] placeholder:text-[#8E84A8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
        {query && <button
    type="button"
    onClick={() => setQuery("")}
    aria-label={t("common.clearFilters")}
    className="absolute end-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#6E6586] hover:text-[#1E1B2E] dark:hover:text-white"
  >
            <X size={14} />
          </button>}
      </div>

      {
    /* Country Grid */
  }
      {filtered.length === 0 ? <div className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-[#FBF9FF] dark:bg-[#181A20] p-8 text-center space-y-2">
          <Globe size={28} className="mx-auto text-[#A78BFA]" />
          <p className="text-sm font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("common.noResults")}
          </p>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {t("onboarding.countryEmpty")}
          </p>
        </div> : <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 overflow-y-auto pe-1 ${maxHeightClass}`}>
          {filtered.map((country) => {
    const isSelected = selectedCode === country.code;
    return <motion.button
      key={country.code}
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(country.code)}
      className={`p-3.5 rounded-2xl border text-start flex items-center justify-between gap-2.5 transition-all ${isSelected ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] ring-2 ring-[#7C3AED]/20 dark:ring-[#14B8A6]/25 shadow-sm" : "border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] hover:border-[#C4B5FD] dark:hover:border-[#4B5563]"}`}
    >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl leading-none shrink-0" role="img" aria-label={country.name.en}>
                    {country.flag}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                      {country.name[language]}
                    </p>
                    <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF] truncate">
                      {country.region}
                    </p>
                  </div>
                </div>
                <AnimatedCheckmark checked={isSelected} size="sm" />
              </motion.button>;
  })}
        </div>}
    </div>;
};
export {
  CountrySelector
};
