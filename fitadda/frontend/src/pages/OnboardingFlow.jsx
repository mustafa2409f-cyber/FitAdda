import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useFitAdda } from "../context/FitAddaContext";
import { FITADDA_LOGO } from "../data/assets";
import { FloatingDecor } from "../components/FloatingDecor";
import { LanguageSelection } from "./onboarding/LanguageSelection";
import { CountrySelection } from "./onboarding/CountrySelection";
import { DietaryPreferences } from "./onboarding/DietaryPreferences";
import { GenderSelection } from "./onboarding/GenderSelection";
import { GoalSelection } from "./onboarding/GoalSelection";
import { ActivityLevel } from "./onboarding/ActivityLevel";
import { Welcome } from "./onboarding/Welcome";
const TOTAL_STEPS = 7;
const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, completeOnboarding, triggerCelebration } = useFitAdda();
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(language);
  const [countryCode, setCountryCode] = useState(user.countryCode || "PK");
  const [foodPreferences, setFoodPreferences] = useState(user.foodPreferences);
  const [gender, setGender] = useState(user.gender);
  const [goal, setGoal] = useState(user.goal);
  const [activityLevel, setActivityLevel] = useState(user.activityLevel);
  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setLanguage(lang);
  };
  const handleFinish = (displayName) => {
    const moveTarget = activityLevel === "active" ? 45 : activityLevel === "moderate" ? 35 : 25;
    const burnTarget = activityLevel === "active" ? 420 : activityLevel === "moderate" ? 320 : 220;
    completeOnboarding({
      name: displayName,
      language: selectedLang,
      countryCode,
      foodPreferences,
      gender,
      goal,
      activityLevel,
      dailyMoveMinutesTarget: moveTarget,
      dailyBurnTarget: burnTarget
    });
    triggerCelebration(
      `${t("brand.name")} — ${displayName}`,
      t("brand.tagline")
    );
    navigate("/auth");
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#FBF9FF] via-[#F6F2FF] to-[#FCE7F3]/50 dark:from-[#111317] dark:via-[#14161B] dark:to-[#111317] text-[#1E1B2E] dark:text-[#F3F4F6] relative flex flex-col">
      <FloatingDecor variant="hero" />

      {
    /* Clean Minimal Top Bar */
  }
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 flex items-center justify-between">
        <div className="flex items-center rounded-2xl bg-white px-2.5 py-1 border border-[#EAE3F8] dark:border-[#2E3340] shadow-xs">
          <img
    src={FITADDA_LOGO}
    alt={t("brand.name")}
    className="h-12 sm:h-14 w-auto object-contain"
  />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
            {t("common.stepOf", { current: step, total: TOTAL_STEPS })}
          </span>
          <button
    type="button"
    onClick={toggleTheme}
    aria-label={theme === "light" ? t("common.dark") : t("common.light")}
    className="w-9 h-9 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-white/90 dark:bg-[#181A20] flex items-center justify-center text-[#4C4461] dark:text-[#E5E7EB]"
  >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>

      {
    /* Progress Bar */
  }
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 mt-4">
        <div className="h-2 rounded-full bg-[#EDE9FE] dark:bg-[#262A34] overflow-hidden">
          <motion.div
    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#38BDF8]"
    initial={false}
    animate={{ width: `${step / TOTAL_STEPS * 100}%` }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
  />
        </div>
      </div>

      {
    /* Main Centered Onboarding Card */
  }
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-4xl rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white/90 dark:bg-[#181A20]/95 glass-card p-6 sm:p-9 shadow-[0_24px_60px_-18px_rgba(124,58,237,0.18)]">
          <AnimatePresence mode="wait">
            <motion.div
    key={step}
    initial={{ opacity: 0, x: 18 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -18 }}
    transition={{ duration: 0.24 }}
  >
              {step === 1 && <LanguageSelection
    selected={selectedLang}
    onSelect={handleLanguageChange}
    onNext={() => setStep(2)}
  />}
              {step === 2 && <CountrySelection
    selectedCode={countryCode}
    onSelect={setCountryCode}
    onBack={() => setStep(1)}
    onNext={() => setStep(3)}
  />}
              {step === 3 && <DietaryPreferences
    value={foodPreferences}
    onChange={setFoodPreferences}
    onBack={() => setStep(2)}
    onNext={() => setStep(4)}
  />}
              {step === 4 && <GenderSelection
    selected={gender}
    onSelect={setGender}
    onBack={() => setStep(3)}
    onNext={() => setStep(5)}
  />}
              {step === 5 && <GoalSelection
    selected={goal}
    onSelect={setGoal}
    onBack={() => setStep(4)}
    onNext={() => setStep(6)}
  />}
              {step === 6 && <ActivityLevel
    selected={activityLevel}
    onSelect={setActivityLevel}
    onBack={() => setStep(5)}
    onNext={() => setStep(7)}
  />}
              {step === 7 && <Welcome
    countryCode={countryCode}
    language={selectedLang}
    goal={goal}
    activityLevel={activityLevel}
    initialName={user.name}
    onBack={() => setStep(6)}
    onStart={handleFinish}
  />}
            </motion.div>
          </AnimatePresence>

          {step === 1 && (
            <div className="mt-6 pt-4 border-t border-[#EAE3F8] dark:border-[#2A2E39] text-center">
              <button
                type="button"
                onClick={() => navigate("/auth?mode=login")}
                className="text-xs font-semibold text-[#6E6586] dark:text-[#9CA3AF] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF] transition-colors"
              >
                Already have an account? <span className="underline font-bold">Login here</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>;
};
export {
  OnboardingFlow
};