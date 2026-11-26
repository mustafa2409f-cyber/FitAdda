import { useState } from "react";
import { Check, ChefHat, Coins, Globe, Plus, ShieldAlert, Sparkles, UtensilsCrossed, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
const DIET_TYPES = ["any", "vegetarian", "non_vegetarian"];
const ALLERGY_IDS = ["nuts", "dairy", "gluten", "eggs", "seafood", "soy"];
const RESTRICTION_IDS = [
  "none",
  "halal",
  "vegetarian_mindful",
  "no_pork",
  "lactose_friendly"
];
const BUDGET_TIERS = ["affordable", "moderate", "flexible"];
const COOKING_STYLES = ["homemade", "quick", "both"];
const DietaryPreferencesForm = ({
  value,
  onChange,
  compact = false
}) => {
  const { t, tList } = useLanguage();
  const [customAllergyInput, setCustomAllergyInput] = useState("");
  const [dislikeInput, setDislikeInput] = useState("");
  const quickDislikes = tList("dietPrefs.dislikeSuggestions");
  const toggleAllergy = (id) => {
    const exists = value.allergies.includes(id);
    onChange({
      ...value,
      allergies: exists ? value.allergies.filter((item) => item !== id) : [...value.allergies, id]
    });
  };
  const addCustomAllergy = () => {
    const clean = customAllergyInput.trim().toLowerCase();
    if (!clean) return;
    if (!value.customAllergies.includes(clean)) {
      onChange({
        ...value,
        customAllergies: [...value.customAllergies, clean]
      });
    }
    setCustomAllergyInput("");
  };
  const removeCustomAllergy = (item) => {
    onChange({
      ...value,
      customAllergies: value.customAllergies.filter((x) => x !== item)
    });
  };
  const toggleDislike = (food) => {
    const clean = food.trim().toLowerCase();
    if (!clean) return;
    const exists = value.dislikedFoods.includes(clean);
    onChange({
      ...value,
      dislikedFoods: exists ? value.dislikedFoods.filter((x) => x !== clean) : [...value.dislikedFoods, clean]
    });
  };
  const addCustomDislike = () => {
    const clean = dislikeInput.trim().toLowerCase();
    if (!clean) return;
    if (!value.dislikedFoods.includes(clean)) {
      onChange({
        ...value,
        dislikedFoods: [...value.dislikedFoods, clean]
      });
    }
    setDislikeInput("");
  };
  return <div className={compact ? "space-y-5" : "space-y-6"}>
      {
    /* 1. Vegetarian vs Non-Vegetarian */
  }
      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] flex items-center gap-2">
          <UtensilsCrossed size={15} className="text-[#7C3AED]" />
          {t("dietPrefs.dietTypeLabel")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DIET_TYPES.map((dt) => {
    const active = value.dietType === dt;
    return <button
      key={dt}
      type="button"
      onClick={() => onChange({ ...value, dietType: dt })}
      className={`p-3 rounded-xl border text-start transition-all flex items-center justify-between gap-2 ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] ring-2 ring-[#7C3AED]/20 dark:ring-[#14B8A6]/25 text-[#1E1B2E] dark:text-[#F3F4F6]" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                <span className="text-xs font-semibold">{t(`dietPrefs.dietTypes.${dt}`)}</span>
                {active && <Check size={14} className="text-[#7C3AED] shrink-0" />}
              </button>;
  })}
        </div>
      </div>

      {
    /* 2. Food Allergies (Safety Priority #1) */
  }
      <div className="space-y-2.5">
        <div>
          <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] flex items-center gap-2">
            <ShieldAlert size={15} className="text-[#EC4899]" />
            {t("dietPrefs.allergiesLabel")}
          </label>
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
            {t("dietPrefs.allergiesHint")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALLERGY_IDS.map((allergy) => {
    const selected = value.allergies.includes(allergy);
    return <button
      key={allergy}
      type="button"
      onClick={() => toggleAllergy(allergy)}
      className={`px-3 py-2.5 rounded-xl border text-start transition-all flex items-center justify-between gap-2 ${selected ? "border-[#EC4899] bg-[#FCE7F3]/70 dark:bg-[#2A2228] text-[#9D174D] dark:text-[#F9A8D4]" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                <span className="text-xs font-semibold truncate">
                  {t(`dietPrefs.allergies.${allergy}`)}
                </span>
                {selected && <Check size={13} className="shrink-0" />}
              </button>;
  })}
        </div>

        {
    /* Custom allergy input */
  }
        <div className="flex gap-2">
          <input
    type="text"
    value={customAllergyInput}
    onChange={(e) => setCustomAllergyInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomAllergy();
      }
    }}
    placeholder={t("dietPrefs.customAllergyPlaceholder")}
    className="flex-1 px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
          <button
    type="button"
    onClick={addCustomAllergy}
    className="btn-3d-secondary px-3.5 py-2 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#2DD4BF] text-xs font-bold inline-flex items-center gap-1"
  >
            <Plus size={13} />
            {t("dietPrefs.addBtn")}
          </button>
        </div>

        {value.customAllergies.length > 0 && <div className="flex flex-wrap gap-1.5">
            {value.customAllergies.map((item) => <button
    key={item}
    type="button"
    onClick={() => removeCustomAllergy(item)}
    className="px-2.5 py-1 rounded-lg border border-[#EC4899]/40 bg-[#FCE7F3]/70 dark:bg-[#2A2228] text-[#9D174D] dark:text-[#F9A8D4] text-[11px] font-semibold inline-flex items-center gap-1.5"
  >
                <span>{item}</span>
                <X size={12} />
              </button>)}
          </div>}
      </div>

      {
    /* 3. Foods You Dislike */
  }
      <div className="space-y-2.5">
        <div>
          <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("dietPrefs.dislikesLabel")}
          </label>
          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
            {t("dietPrefs.dislikesHint")}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {quickDislikes.map((food) => {
    const clean = food.toLowerCase();
    const active = value.dislikedFoods.includes(clean);
    return <button
      key={food}
      type="button"
      onClick={() => toggleDislike(food)}
      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold capitalize transition-colors ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                {food}
              </button>;
  })}
        </div>

        <div className="flex gap-2">
          <input
    type="text"
    value={dislikeInput}
    onChange={(e) => setDislikeInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomDislike();
      }
    }}
    placeholder={t("dietPrefs.dislikePlaceholder")}
    className="flex-1 px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
          <button
    type="button"
    onClick={addCustomDislike}
    className="btn-3d-secondary px-3.5 py-2 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#2DD4BF] text-xs font-bold inline-flex items-center gap-1"
  >
            <Plus size={13} />
            {t("dietPrefs.addBtn")}
          </button>
        </div>

        {value.dislikedFoods.some((f) => !quickDislikes.map((q) => q.toLowerCase()).includes(f)) && <div className="flex flex-wrap gap-1.5">
            {value.dislikedFoods.filter((f) => !quickDislikes.map((q) => q.toLowerCase()).includes(f)).map((food) => <button
    key={food}
    type="button"
    onClick={() => toggleDislike(food)}
    className="px-2.5 py-1 rounded-lg border border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white text-[11px] font-semibold inline-flex items-center gap-1.5"
  >
                  <span>{food}</span>
                  <X size={12} />
                </button>)}
          </div>}
      </div>

      {
    /* 4. Religious / Personal Dietary Style (Optional) */
  }
      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] flex items-center gap-2">
          <Sparkles size={15} className="text-[#7C3AED]" />
          {t("dietPrefs.restrictionsLabel")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {RESTRICTION_IDS.map((r) => {
    const active = value.religiousRestriction === r;
    return <button
      key={r}
      type="button"
      onClick={() => onChange({ ...value, religiousRestriction: r })}
      className={`px-3 py-2 rounded-xl border text-start transition-all flex items-center justify-between gap-2 ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#1E1B2E] dark:text-[#F3F4F6] ring-2 ring-[#7C3AED]/15 dark:ring-[#14B8A6]/20" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                <span className="text-xs font-semibold truncate">
                  {t(`dietPrefs.restrictions.${r}`)}
                </span>
                {active && <Check size={13} className="text-[#7C3AED] shrink-0" />}
              </button>;
  })}
        </div>
      </div>

      {
    /* 5. Budget & 6. Cooking Style */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] flex items-center gap-2">
            <Coins size={15} className="text-[#10B981]" />
            {t("dietPrefs.budgetLabel")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_TIERS.map((b) => {
    const active = value.budget === b;
    return <button
      key={b}
      type="button"
      onClick={() => onChange({ ...value, budget: b })}
      className={`py-2.5 px-2 rounded-xl border text-center text-xs font-semibold transition-all ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                  {t(`dietPrefs.budgets.${b}`)}
                </button>;
  })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] flex items-center gap-2">
            <ChefHat size={15} className="text-[#7C3AED]" />
            {t("dietPrefs.cookingStyleLabel")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {COOKING_STYLES.map((cs) => {
    const active = value.cookingStyle === cs;
    return <button
      key={cs}
      type="button"
      onClick={() => onChange({ ...value, cookingStyle: cs })}
      className={`py-2.5 px-2 rounded-xl border text-center text-xs font-semibold transition-all ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                  {t(`dietPrefs.cookingStyles.${cs}`)}
                </button>;
  })}
          </div>
        </div>
      </div>

      {
    /* 7. International Alternative Toggle */
  }
      <div className="p-3.5 rounded-2xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Globe size={16} className="text-[#7C3AED] shrink-0" />
          <span className="text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("dietPrefs.internationalPrefLabel")}
          </span>
        </div>
        <button
    type="button"
    role="switch"
    aria-checked={value.preferInternational}
    onClick={() => onChange({ ...value, preferInternational: !value.preferInternational })}
    className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${value.preferInternational ? "bg-[#7C3AED] dark:bg-[#0D9488]" : "bg-[#DDD6FE] dark:bg-[#2A2E39]"}`}
  >
          <span
    className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${value.preferInternational ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"}`}
  />
        </button>
      </div>
    </div>;
};
export {
  DietaryPreferencesForm
};
