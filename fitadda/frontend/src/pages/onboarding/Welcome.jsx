import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { getCulturalGreeting } from "../../data/countries";
import { MilkMascot } from "../../components/MilkMascot";
const GOAL_KEY_MAP = {
  stay_active: "onboarding.goalStayActive",
  build_strength: "onboarding.goalBuildStrength",
  improve_stamina: "onboarding.goalImproveStamina",
  healthy_lifestyle: "onboarding.goalHealthyLifestyle"
};
const LEVEL_KEY_MAP = {
  beginner: "onboarding.levelBeginner",
  moderate: "onboarding.levelModerate",
  active: "onboarding.levelActive"
};
const LANG_LABEL = {
  en: "English",
  ur: "اردو",
  roman: "Roman Urdu"
};
const Welcome = ({
  countryCode,
  language,
  goal,
  activityLevel,
  initialName,
  onBack,
  onStart
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(initialName || "");
  const [nameError, setNameError] = useState("");
  const greeting = getCulturalGreeting(countryCode, language);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(t("onboarding.welcomeNameError"));
      return;
    }
    setNameError("");
    onStart(name.trim());
  };
  return <motion.form
    onSubmit={handleSubmit}
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35 }}
    className="space-y-6 text-center"
  >
      {
    /* Celebrating Mascot */
  }
      <div className="flex flex-col items-center gap-2">
        <MilkMascot mood="welcome" size="xl" />
        <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
          <Sparkles size={13} />
          {t("onboarding.welcomeReadyBadge")}
        </p>
      </div>

      {
    /* Cultural Greeting Card */
  }
      <div className="rounded-3xl border border-[#DDD6FE] dark:border-[#363B48] bg-gradient-to-br from-[#FBF9FF] via-white to-[#F3EEFF] dark:from-[#181A20] dark:via-[#181A20] dark:to-[#1F222A] p-6 sm:p-7 space-y-3 shadow-sm">
        <p className="text-2xl sm:text-3xl font-extrabold text-[#7C3AED] dark:text-[#2DD4BF]">
          {greeting.countryFlag} {greeting.salutation}
        </p>
        <p className="text-sm sm:text-base text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed max-w-2xl mx-auto">
          {greeting.body}
        </p>
      </div>

      {
    /* Personalization Summary */
  }
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-start">
        <div className="p-3 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]">
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
            {t("onboarding.welcomeSummaryCountry")}
          </p>
          <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5 truncate">
            {greeting.countryFlag} {greeting.countryName}
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]">
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
            {t("onboarding.welcomeSummaryLang")}
          </p>
          <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5 truncate">
            {LANG_LABEL[language]}
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]">
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
            {t("onboarding.welcomeSummaryGoal")}
          </p>
          <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5 truncate">
            {t(GOAL_KEY_MAP[goal])}
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]">
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
            {t("onboarding.welcomeSummaryLevel")}
          </p>
          <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5 truncate">
            {t(LEVEL_KEY_MAP[activityLevel])}
          </p>
        </div>
      </div>

      {
    /* Friendly Name Input */
  }
      <div className="max-w-md mx-auto text-start space-y-1.5">
        <label className="block text-xs font-bold text-[#4C4461] dark:text-[#D1D5DB]">
          {t("onboarding.welcomeYourNameLabel")}
        </label>
        <input
    type="text"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      if (nameError) setNameError("");
    }}
    placeholder={t("onboarding.welcomeYourNamePlaceholder")}
    className="w-full px-4 py-3 rounded-xl border border-[#DDD6FE] dark:border-[#363B48] bg-white dark:bg-[#181A20] text-sm text-[#1E1B2E] dark:text-[#F3F4F6] placeholder:text-[#8E84A8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
        {nameError && <p className="text-xs font-semibold text-[#DC2626] dark:text-[#FCA5A5]">
            {nameError}
          </p>}
      </div>

      {
    /* CTAs */
  }
      <div className="flex items-center justify-between pt-2">
        <button
    type="button"
    onClick={onBack}
    className="btn-3d-secondary px-5 py-3 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] text-xs sm:text-sm font-semibold"
  >
          {t("common.back")}
        </button>

        <motion.button
    type="submit"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="btn-3d-primary px-8 py-3.5 rounded-2xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-sm font-bold inline-flex items-center gap-2"
  >
          <span>{t("onboarding.letsGetStarted")}</span>
          <ArrowRight size={17} />
        </motion.button>
      </div>
    </motion.form>;
};
export {
  Welcome
};
