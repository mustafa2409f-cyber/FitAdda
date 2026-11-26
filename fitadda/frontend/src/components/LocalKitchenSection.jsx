import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Flame,
  Globe,
  RefreshCw,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { getCulturalGreeting } from "../data/countries";
import { getSmartMealRecommendations, isSouthAsianCountry } from "../utils/dietEngine";
import { SafeImage } from "./SafeImage";
import { TiltCard } from "./TiltCard";
import { DietaryPreferencesForm } from "./DietaryPreferencesForm";
import { ChefRecipeModal } from "./ChefRecipeModal";
const SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const LocalKitchenSection = () => {
  const { language, t } = useLanguage();
  const {
    user,
    mealSwapOffsets,
    swapMealSlot,
    updateFoodPreferences,
    triggerCelebration
  } = useFitAdda();
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const greeting = getCulturalGreeting(user.countryCode, language);
  const isDesiRegion = isSouthAsianCountry(user.countryCode);
  const recommendations = useMemo(
    () => getSmartMealRecommendations(user, mealSwapOffsets),
    [user, mealSwapOffsets]
  );
  const anyFallbackUsed = SLOTS.some((slot) => recommendations[slot].usedInternationalFallback);
  const isIntlMode = user.foodPreferences.preferInternational;
  const activeSummary = [
    t(`dietPrefs.dietTypes.${user.foodPreferences.dietType}`),
    t(`dietPrefs.budgets.${user.foodPreferences.budget}`),
    t(`dietPrefs.cookingStyles.${user.foodPreferences.cookingStyle}`)
  ].join(" · ");
  return <section className="rounded-3xl border border-[#DDD6FE] dark:border-[#2E3340] bg-white dark:bg-[#181A20] p-5 sm:p-6 space-y-5 shadow-[0_12px_30px_-18px_rgba(124,58,237,0.2)]">
      {
    /* Header Row */
  }
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
            <span className="text-base leading-none">{greeting.countryFlag}</span>
            <span>{greeting.countryName}</span>
            <span>·</span>
            <span>{activeSummary}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {isDesiRegion ? t("diet.localKitchenTitle") : t("diet.localKitchenTitleLocal")}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-2xl leading-relaxed">
            {t("diet.localKitchenSubtitle")}
          </p>
        </div>

        {
    /* Mode Toggle + Customize Button */
  }
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
    type="button"
    onClick={() => updateFoodPreferences({ preferInternational: !isIntlMode })}
    className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${isIntlMode ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB]"}`}
  >
            <Globe size={14} />
            {isIntlMode ? t("diet.localPicksMode") : t("diet.internationalToggle")}
          </button>

          <button
    type="button"
    onClick={() => setPrefsOpen((v) => !v)}
    className={`btn-3d-secondary px-3.5 py-2.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 ${prefsOpen ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB]"}`}
  >
            <SlidersHorizontal size={14} />
            {t("diet.customizePrefsBtn")}
          </button>
        </div>
      </div>

      {
    /* Expandable Live Food Preferences Panel */
  }
      <AnimatePresence>
        {prefsOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="overflow-hidden"
  >
            <div className="rounded-2xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] p-4 sm:p-5 space-y-4">
              <DietaryPreferencesForm
    compact
    value={user.foodPreferences}
    onChange={(next) => {
      updateFoodPreferences(next);
    }}
  />
              <div className="flex justify-end">
                <button
    type="button"
    onClick={() => {
      setPrefsOpen(false);
      triggerCelebration(t("dietPrefs.savedToast"), greeting.countryName);
    }}
    className="btn-3d-primary px-5 py-2 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] text-white text-xs font-bold"
  >
                  {t("common.save")}
                </button>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {
    /* Safety Fallback Note (only shown when needed) */
  }
      {anyFallbackUsed && !isIntlMode && <p className="text-xs font-medium text-[#7C3AED] dark:text-[#2DD4BF] bg-[#F5F1FE] dark:bg-[#1F222A] px-3.5 py-2 rounded-xl inline-flex items-center gap-2">
          <Sparkles size={13} />
          {t("diet.fallbackNotice")}
        </p>}

      {
    /* 4 Meal Category Smart Cards */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SLOTS.map((slot) => {
    const rec = recommendations[slot];
    const meal = rec.meal;
    const mealName = meal.names[language];
    const mealDesc = meal.descriptions[language];
    const reasonLabels = rec.reasonKeys.map((k) => t(k)).filter(Boolean);
    return <TiltCard key={slot} className="overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A]">
                <SafeImage
      src={meal.image}
      alt={mealName}
      className="w-full h-full object-cover"
      fallbackType="meal"
    />
                <div className="absolute top-2.5 start-2.5 px-2.5 py-1 rounded-lg bg-white/92 dark:bg-[#181A20]/95 backdrop-blur text-[11px] font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {t(`diet.categories.${slot}`)}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
                    {meal.cookingStyle === "homemade" ? t("diet.cookingStyleHomemade") : t("diet.cookingStyleQuick")}{" "}
                    · {t("diet.prepTime", { min: meal.prepMinutes })}
                  </p>

                  <h3 className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-snug line-clamp-2">
                    {mealName}
                  </h3>

                  <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {mealDesc}
                  </p>

                  {reasonLabels.length > 0 && <p className="text-[11px] font-medium text-[#10B981] dark:text-[#6EE7B7] pt-0.5">
                      {reasonLabels.join(" · ")}
                    </p>}
                </div>

                <div className="space-y-2.5 pt-2.5 border-t border-[#F0EBFA] dark:border-[#2A2E39]">
                  <div className="flex items-center justify-between text-[11px] tabular-nums text-[#4C4461] dark:text-[#D1D5DB]">
                    <span className="inline-flex items-center gap-1 font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                      <Flame size={12} className="text-[#EC4899]" />
                      {meal.calories} {t("common.kcal")}
                    </span>
                    <span>
                      P {meal.protein}g · C {meal.carbs}g · F {meal.fats}g
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
      type="button"
      onClick={() => swapMealSlot(slot)}
      title={t("diet.swapCount", { count: rec.alternativesCount })}
      className="btn-3d-secondary flex-1 py-2 px-2.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#E5E7EB] text-xs font-bold inline-flex items-center justify-center gap-1.5"
    >
                      <RefreshCw size={12} />
                      {t("diet.swapMeal")}
                    </button>

                    <button
      type="button"
      onClick={() => setSelectedRecipe(meal)}
      className="btn-3d-primary py-2 px-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-semibold inline-flex items-center gap-1"
    >
                      <BookOpen size={12} />
                      {t("common.viewRecipe")}
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>;
  })}
      </div>

      {
    /* Chef MilkMate Step-by-Step Cooking Modal */
  }
      <ChefRecipeModal
    meal={selectedRecipe}
    onClose={() => setSelectedRecipe(null)}
  />
    </section>;
};
export {
  LocalKitchenSection
};
