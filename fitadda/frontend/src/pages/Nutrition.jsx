import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Droplets, Heart, Minus, Plus, Salad, Trash2, Utensils } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getSmartMealRecommendations, isSouthAsianCountry } from "../utils/dietEngine";
import { ProgressRing } from "../components/ProgressRing";
import { TiltCard } from "../components/TiltCard";
import { MilkMascot } from "../components/MilkMascot";
const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
const SUGGESTION_SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const Nutrition = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const {
    user,
    foodDiary,
    waterGlasses,
    adjustWater,
    addCustomDiaryEntry,
    logSmartMealToDiary,
    removeDiaryEntry,
    mealSwapOffsets
  } = useFitAdda();
  const [filterCat, setFilterCat] = useState("All");
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("Snacks");
  const [calories, setCalories] = useState("240");
  const [protein, setProtein] = useState("12");
  const [carbs, setCarbs] = useState("28");
  const [fats, setFats] = useState("8");
  const [formError, setFormError] = useState("");
  const totals = useMemo(() => {
    return foodDiary.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fats: acc.fats + entry.fats
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [foodDiary]);
  const macroChartData = useMemo(
    () => [
      { name: t("common.protein"), value: Math.max(1, totals.protein), color: "#7C3AED" },
      { name: t("common.carbs"), value: Math.max(1, totals.carbs), color: "#EC4899" },
      { name: t("common.fats"), value: Math.max(1, totals.fats), color: "#10B981" }
    ],
    [totals, t]
  );
  const smartRecommendations = useMemo(
    () => getSmartMealRecommendations(user, mealSwapOffsets),
    [user, mealSwapOffsets]
  );
  const isDesiRegion = isSouthAsianCountry(user.countryCode);
  const visibleDiary = useMemo(() => {
    if (filterCat === "All") return foodDiary;
    return foodDiary.filter((e) => e.category === filterCat);
  }, [foodDiary, filterCat]);
  const handleAddFood = (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
      setFormError(t("nutrition.foodNameError"));
      return;
    }
    if (Number(calories) < 0) {
      setFormError(t("nutrition.caloriesError"));
      return;
    }
    setFormError("");
    const nowLabel = (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    addCustomDiaryEntry(
      {
        name: foodName.trim(),
        category: foodCategory,
        calories: Math.max(0, Number(calories) || 0),
        protein: Math.max(0, Number(protein) || 0),
        carbs: Math.max(0, Number(carbs) || 0),
        fats: Math.max(0, Number(fats) || 0),
        time: nowLabel,
        serving: "1 serving"
      },
      t("nutrition.foodLoggedToast")
    );
    setFoodName("");
  };
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* Top Overview: Calorie Ring + Macro Donut + Hydration */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <TiltCard className="lg:col-span-4 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("nutrition.calorieOverview")}
            </h2>
            <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
              {t("nutrition.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-5 my-5">
            <ProgressRing
    value={totals.calories}
    max={user.dailyCalorieTarget}
    size={108}
    strokeWidth={10}
    color="#7C3AED"
    label={`${totals.calories}`}
    sublabel={t("common.kcal")}
  />
            <div className="space-y-1.5 text-xs text-[#6E6586] dark:text-[#9CA3AF]">
              <p>
                {t("dashboard.dailyTarget")}:{" "}
                <strong className="tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {user.dailyCalorieTarget} {t("common.kcal")}
                </strong>
              </p>
              <p>
                {t("common.protein")}:{" "}
                <strong className="tabular-nums text-[#7C3AED] dark:text-[#2DD4BF]">
                  {totals.protein}g
                </strong>
              </p>
              <p>
                {t("common.carbs")}:{" "}
                <strong className="tabular-nums text-[#EC4899]">
                  {totals.carbs}g
                </strong>
              </p>
            </div>
          </div>
        </TiltCard>

        {
    /* Macronutrient Chart */
  }
        <div className="lg:col-span-4 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("nutrition.macroChartTitle")}
          </h3>

          <div className="h-44 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
    data={macroChartData}
    dataKey="value"
    nameKey="name"
    innerRadius={46}
    outerRadius={68}
    paddingAngle={4}
  >
                  {macroChartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip
    formatter={(value) => [`${value ?? 0}g`, ""]}
    contentStyle={{
      borderRadius: "12px",
      border: "1px solid #DDD6FE",
      backgroundColor: theme === "dark" ? "#1C172B" : "#FFFFFF",
      color: theme === "dark" ? "#F4F1FF" : "#1E1B2E",
      fontSize: "12px"
    }}
  />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around text-xs">
            {macroChartData.map((m) => <div key={m.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-[#4C4461] dark:text-[#D1D5DB] font-medium">{m.name}</span>
              </div>)}
          </div>
        </div>

        {
    /* Hydration Card */
  }
        <div className="lg:col-span-4 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("nutrition.waterCardTitle")}
              </h3>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5 tabular-nums">
                {t("nutrition.waterAmountText", { ml: waterGlasses * 250 })}
              </p>
            </div>
            <MilkMascot mood="hydrate" size="sm" />
          </div>

          <div className="text-center py-3">
            <p className="text-3xl font-extrabold tabular-nums text-[#7C3AED] dark:text-[#2DD4BF]">
              {waterGlasses} / {user.dailyWaterTargetGlasses}
            </p>
            <div className="mt-3 h-2.5 rounded-full bg-[#F3EEFF] dark:bg-[#262A34] overflow-hidden">
              <div
    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#38BDF8] transition-all duration-400"
    style={{
      width: `${Math.min(100, Math.round(waterGlasses / user.dailyWaterTargetGlasses * 100))}%`
    }}
  />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
    type="button"
    onClick={() => adjustWater(-1)}
    disabled={waterGlasses === 0}
    aria-label={t("dashboard.removeGlass")}
    className="btn-3d-secondary min-w-[44px] min-h-[40px] px-3 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] disabled:opacity-40 flex items-center justify-center"
  >
              <Minus size={15} />
            </button>
            <button
    type="button"
    onClick={() => adjustWater(1)}
    className="btn-3d-primary flex-1 min-h-[40px] px-4 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
  >
              <Droplets size={14} />
              {t("dashboard.addGlass")}
            </button>
          </div>
        </div>
      </section>

      {
    /* Balanced Quick Suggestions (Country-Personalized) */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-5 space-y-3">
        <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
          {t("nutrition.balancedSuggestions")}
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTION_SLOTS.map((slot) => {
    const meal = smartRecommendations[slot].meal;
    const mealName = meal.names[language];
    return <button
      key={meal.id}
      type="button"
      onClick={() => logSmartMealToDiary(
        meal,
        mealName,
        meal.serving[language],
        t("nutrition.foodLoggedToast")
      )}
      className="px-3.5 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] hover:border-[#7C3AED] dark:hover:border-[#14B8A6] inline-flex items-center gap-1.5 transition-colors"
    >
                <Plus size={13} className="text-[#7C3AED] dark:text-[#2DD4BF]" />
                {mealName} ({meal.calories} {t("common.kcal")})
              </button>;
  })}
        </div>
      </section>

      {
    /* Quick Log Form + Food Diary */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
    onSubmit={handleAddFood}
    className="lg:col-span-4 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4 self-start"
  >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6] flex items-center justify-center">
              <Salad size={18} />
            </div>
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("nutrition.logFoodTitle")}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("nutrition.foodNameLabel")}
              </label>
              <input
    type="text"
    value={foodName}
    onChange={(e) => {
      setFoodName(e.target.value);
      if (formError) setFormError("");
    }}
    placeholder={isDesiRegion ? t("nutrition.foodNamePlaceholder") : t("nutrition.foodNamePlaceholderLocal")}
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("nutrition.mealSlotLabel")}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {["Breakfast", "Lunch", "Dinner", "Snacks"].map((cat) => <button
    key={cat}
    type="button"
    onClick={() => setFoodCategory(cat)}
    className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-colors ${foodCategory === cat ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                    {t(`diet.categories.${cat}`)}
                  </button>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("nutrition.caloriesLabel")}
                </label>
                <input
    type="number"
    value={calories}
    onChange={(e) => setCalories(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("common.protein")} (g)
                </label>
                <input
    type="number"
    min={0}
    value={protein}
    onChange={(e) => setProtein(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("common.carbs")} (g)
                </label>
                <input
    type="number"
    min={0}
    value={carbs}
    onChange={(e) => setCarbs(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("common.fats")} (g)
                </label>
                <input
    type="number"
    min={0}
    value={fats}
    onChange={(e) => setFats(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
            </div>

            {formError && <p className="text-xs font-semibold text-[#DC2626] dark:text-[#FCA5A5]">
                {formError}
              </p>}
          </div>

          <button
    type="submit"
    className="btn-3d-primary w-full py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold flex items-center justify-center gap-1.5"
  >
            <Plus size={15} />
            {t("nutrition.addDiaryBtn")}
          </button>
        </form>

        {
    /* Diary List */
  }
        <div className="lg:col-span-8 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("nutrition.diaryTitle")}
            </h3>

            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((c) => <button
    key={c}
    type="button"
    onClick={() => setFilterCat(c)}
    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${filterCat === c ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                  {c === "All" ? t("common.all") : t(`diet.categories.${c}`)}
                </button>)}
            </div>
          </div>

          {visibleDiary.length === 0 ? <div className="rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] p-8 text-center space-y-2">
              <Utensils size={26} className="mx-auto text-[#A78BFA]" />
              <p className="text-sm font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("nutrition.emptyDiaryTitle")}
              </p>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
                {t("nutrition.emptyDiaryDesc")}
              </p>
            </div> : <div className="divide-y divide-[#F0EBFA] dark:divide-[#2A2E39]">
              {visibleDiary.map((entry) => <div
    key={entry.id}
    className="py-3.5 flex items-center justify-between gap-4"
  >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <Heart size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                        {entry.name}
                      </p>
                      <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] tabular-nums">
                        {t(`diet.categories.${entry.category}`)} · {entry.time} · P {entry.protein}g · C {entry.carbs}g · F {entry.fats}g
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6]">
                      {entry.calories} {t("common.kcal")}
                    </span>
                    <button
    type="button"
    onClick={() => removeDiaryEntry(entry.id)}
    aria-label={t("common.remove")}
    className="p-2 rounded-xl text-[#8E84A8] hover:text-[#DC2626] hover:bg-[#FEE2E2]/50 transition-colors"
  >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
      </section>
    </motion.div>;
};
export {
  Nutrition
};
