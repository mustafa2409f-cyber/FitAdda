import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { TiltCard } from "../../components/TiltCard";
import { AnimatedCheckmark } from "../../components/AnimatedCheckmark";
import { FITADDA_LOGO } from "../../data/assets";
const LANGUAGE_CARDS = [
  {
    code: "en",
    flag: "🇬🇧",
    nativeTitle: "English",
    descKey: "onboarding.langEnDesc"
  },
  {
    code: "ur",
    flag: "🇵🇰",
    nativeTitle: "اردو",
    descKey: "onboarding.langUrDesc",
    isRtlPreview: true
  },
  {
    code: "roman",
    flag: "🇵🇰",
    nativeTitle: "Roman Urdu",
    descKey: "onboarding.langRomanDesc"
  }
];
const LanguageSelection = ({
  selected,
  onSelect,
  onNext
}) => {
  const { t } = useLanguage();
  return <div className="space-y-7 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-3xl bg-white p-3 sm:p-4 border border-[#EAE3F8] dark:border-[#2E3340] shadow-sm mx-auto">
          <img
    src={FITADDA_LOGO}
    alt={t("brand.name")}
    className="h-36 sm:h-44 w-auto object-contain"
  />
        </div>
        <span className="text-xs font-bold tracking-wide text-[#7C3AED] dark:text-[#2DD4BF]">
          {t("onboarding.step1Badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6] text-balance">
          {t("onboarding.step1Title")}
        </h1>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-xl mx-auto">
          {t("onboarding.step1Subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-start">
        {LANGUAGE_CARDS.map((card, idx) => {
    const isSelected = selected === card.code;
    return <motion.div
      key={card.code}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
    >
              <TiltCard
      selected={isSelected}
      onClick={() => onSelect(card.code)}
      className="p-5 sm:p-6 cursor-pointer h-full flex flex-col justify-between gap-4"
    >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-4xl leading-none" role="img" aria-label={card.nativeTitle}>
                    {card.flag}
                  </span>
                  <AnimatedCheckmark checked={isSelected} />
                </div>

                <div dir={card.isRtlPreview ? "rtl" : "ltr"}>
                  <p className="text-xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                    {card.nativeTitle}
                  </p>
                  <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-1.5 leading-relaxed">
                    {t(card.descKey)}
                  </p>
                </div>
              </TiltCard>
            </motion.div>;
  })}
      </div>

      <div className="pt-2">
        <button
    type="button"
    onClick={onNext}
    className="btn-3d-primary px-8 py-3.5 rounded-2xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-sm font-bold"
  >
          {t("common.continue")}
        </button>
      </div>
    </div>;
};
export {
  LanguageSelection
};
