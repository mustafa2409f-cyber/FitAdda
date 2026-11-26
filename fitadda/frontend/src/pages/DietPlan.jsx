import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Flame, Plus, Search, Sparkles, Trash2, Utensils } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { getBrowseableMealsForUser, isSouthAsianCountry } from "../utils/dietEngine";
import { TiltCard } from "../components/TiltCard";
import { SafeImage } from "../components/SafeImage";
import { AnimatedCheckmark } from "../components/AnimatedCheckmark";
import { MilkMascot } from "../components/MilkMascot";
import { LocalKitchenSection } from "../components/LocalKitchenSection";
import { ChefRecipeModal } from "../components/ChefRecipeModal";
const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
const DietPlan = () => {
  const { language, t } = useLanguage();
  const { user, plannedMeals, addMealToPlan, removeMealFromPlan } = useFitAdda();
  const [category, setCategory] = useState("All");
  const [regionFocusOnly, setRegionFocusOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [recipeMeal, setRecipeMeal] = useState(null);
  const isDesiRegion = isSouthAsianCountry(user.countryCode);
  const countryCompatibleMeals = useMemo(
    () => getBrowseableMealsForUser(
      user,
      isDesiRegion ? { desiOnly: regionFocusOnly } : { localOnly: regionFocusOnly }
    ),
    [user, isDesiRegion, regionFocusOnly]
  );
  const filteredMeals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countryCompatibleMeals.filter((meal) => {
      if (category !== "All" && meal.category !== category) return false;
      if (q) {
        const name = meal.names[language].toLowerCase();
        const summary = meal.descriptions[language].toLowerCase();
        if (!name.includes(q) && !summary.includes(q)) return false;
      }
      return true;
    });
  }, [countryCompatibleMeals, category, query, language]);
  const isMealPlanned = (meal) => (plannedMeals[meal.category] || []).includes(meal.id);
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* Country-Aware Healthy Eating Tip Banner */
  }
      <section className="rounded-3xl border border-[#DDD6FE] dark:border-[#2E3340] bg-gradient-to-r from-[#FBF9FF] via-[#F5F1FE] to-[#FCE7F3]/60 dark:from-[#181A20] dark:via-[#1B1E25] dark:to-[#1F222A] p-5 flex flex-col sm:flex-row items-center gap-4">
        <MilkMascot mood="happy" size="sm" />
        <div className="space-y-1 text-center sm:text-start">
          <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
            <Sparkles size={13} />
            {isDesiRegion ? t("diet.healthyTipTitle") : t("diet.healthyTipTitleLocal")}
          </p>
          <p className="text-xs sm:text-sm text-[#4C4461] dark:text-[#D1D5DB] leading-relaxed">
            {isDesiRegion ? t("diet.healthyTipBody") : t("diet.healthyTipBodyLocal")}
          </p>
        </div>
      </section>

      {
    /* Smart Country-Based Diet Personalization */
  }
      <LocalKitchenSection />

      {
    /* Search + Category Tabs + Regional Filter */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {isDesiRegion ? t("diet.title") : t("diet.titleLocal")}
            </h2>
            <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
              {isDesiRegion ? t("diet.subtitle") : t("diet.subtitleLocal")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[230px]">
              <Search
    size={15}
    className="absolute start-3 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]"
  />
              <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={isDesiRegion ? t("diet.searchPlaceholder") : t("diet.searchPlaceholderLocal")}
    className="w-full ps-9 pe-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
            </div>

            <button
    type="button"
    onClick={() => setRegionFocusOnly((v) => !v)}
    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap ${regionFocusOnly ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
              {isDesiRegion ? t("diet.desiFilter") : t("diet.localFilter")}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => <button
    key={cat}
    type="button"
    onClick={() => setCategory(cat)}
    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${category === cat ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
              {t(`diet.categories.${cat}`)}
            </button>)}
        </div>
      </section>

      {
    /* Country-Filtered Meals Grid */
  }
      {filteredMeals.length === 0 ? <div className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-10 text-center space-y-2">
          <Utensils size={28} className="mx-auto text-[#A78BFA] dark:text-[#2DD4BF]" />
          <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("common.noResults")}
          </p>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {t("common.tryAnotherSearch")}
          </p>
        </div> : <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMeals.map((meal) => {
    const name = meal.names[language];
    const summary = meal.descriptions[language];
    const planned = isMealPlanned(meal);
    return <TiltCard key={meal.id} selected={planned} className="overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A]">
                  <SafeImage
      src={meal.image}
      alt={name}
      className="w-full h-full object-cover"
      fallbackType="meal"
    />
                  <div className="absolute top-3 end-3">
                    <AnimatedCheckmark checked={planned} />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
                      {t(`diet.categories.${meal.category}`)} ·{" "}
                      {t("diet.prepTime", { min: meal.prepMinutes })}
                    </p>
                    <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-snug">
                      {name}
                    </h3>
                    <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#F0EBFA] dark:border-[#2A2E39]">
                    <div className="flex items-center justify-between text-xs tabular-nums text-[#4C4461] dark:text-[#D1D5DB]">
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
      onClick={() => planned ? removeMealFromPlan(meal.id, meal.category) : addMealToPlan(meal.id, meal.category, t("diet.mealAddedToast"))}
      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${planned ? "bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6]" : "btn-3d-primary bg-[#7C3AED] dark:bg-[#0D9488] text-white"}`}
    >
                        {planned ? <Trash2 size={13} /> : <Plus size={13} />}
                        {planned ? t("diet.removeFromPlan") : t("diet.addToPlan")}
                      </button>

                      <button
      type="button"
      onClick={() => setRecipeMeal(meal)}
      className="btn-3d-secondary py-2 px-3 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] text-xs font-semibold inline-flex items-center gap-1"
    >
                        <BookOpen size={13} />
                        {t("common.viewRecipe")}
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>;
  })}
        </section>}

      {
    /* Chef MilkMate Step-by-Step Cooking Modal */
  }
      <ChefRecipeModal
    meal={recipeMeal}
    onClose={() => setRecipeMeal(null)}
  />
    </motion.div>;
};
export {
  DietPlan
};
