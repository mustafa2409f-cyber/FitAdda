// Chef MilkMate Modal: walks users step-by-step through ingredients & cooking directions
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Utensils,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { playCoachSound } from "../utils/coachAudio";
import { MilkMascot } from "./MilkMascot";
import { SafeImage } from "./SafeImage";
const ChefRecipeModal = ({ meal, onClose }) => {
  const { language, t, isRTL } = useLanguage();
  const { plannedMeals, addMealToPlan, removeMealFromPlan, logSmartMealToDiary } = useFitAdda();
  const [stage, setStage] = useState("ingredients");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    if (meal) {
      setStage("ingredients");
      setCheckedIngredients([]);
      setStepIndex(0);
      playCoachSound("intro", muted);
    }
  }, [meal?.id]);
  if (!meal) return null;
  const mealName = meal.names[language];
  const mealDesc = meal.descriptions[language];
  const ingredients = meal.ingredients[language];
  const steps = meal.steps[language];
  const serving = meal.serving[language];
  const isPlanned = (plannedMeals[meal.category] || []).includes(meal.id);
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;
  const ForwardIcon = isRTL ? ChevronLeft : ChevronRight;
  const toggleIngredient = (idx) => {
    setCheckedIngredients(
      (prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const getChefState = () => {
    if (stage === "ingredients") {
      return {
        mood: "chef",
        pose: "chef_prep",
        bubbleText: t("diet.chef.introBubble", { meal: mealName })
      };
    }
    if (stage === "done") {
      return {
        mood: "celebrate",
        pose: "celebrate",
        bubbleText: t("diet.chef.doneBubble")
      };
    }
    if (stepIndex === 0) {
      return {
        mood: "chef",
        pose: "chef_cook",
        bubbleText: t("diet.chef.stepPromptFirst")
      };
    }
    if (stepIndex === steps.length - 1) {
      return {
        mood: "chef",
        pose: "chef_cook",
        bubbleText: t("diet.chef.stepPromptLast")
      };
    }
    return {
      mood: "chef",
      pose: "chef_cook",
      bubbleText: t("diet.chef.stepPromptMiddle", { step: stepIndex + 1 })
    };
  };
  const chef = getChefState();
  const handleStartCooking = () => {
    setStage("cook");
    setStepIndex(0);
    playCoachSound("step", muted);
  };
  const handlePrevStep = () => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
      playCoachSound("step", muted);
    } else {
      setStage("ingredients");
    }
  };
  const handleNextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((s) => s + 1);
      playCoachSound("step", muted);
    } else {
      setStage("done");
      playCoachSound("victory", muted);
    }
  };
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#1E1B2E]/60 backdrop-blur-sm">
        <motion.div
    initial={{ opacity: 0, scale: 0.94, y: 14 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.94, y: 14 }}
    transition={{ type: "spring", stiffness: 360, damping: 28 }}
    className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
  >
          {
    /* Top Modal Header */
  }
          <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#F0EBFA] dark:border-[#2A2E39]">
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
                <ChefHat size={13} />
                {t("diet.chef.badge")}
              </p>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                {mealName}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
    type="button"
    onClick={() => setMuted((m) => !m)}
    aria-label={muted ? t("workouts.coach.soundMuted") : t("workouts.coach.soundOn")}
    className="px-2.5 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB] inline-flex items-center gap-1"
  >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#7C3AED] dark:text-[#2DD4BF]" />}
              </button>

              <button
    type="button"
    onClick={onClose}
    aria-label={t("common.close")}
    className="p-2 rounded-xl text-[#6E6586] dark:text-[#9CA3AF] hover:bg-[#F3EEFF] dark:hover:bg-[#262A34]"
  >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {
    /* Hero Visual: Chef MilkMate Teaching + Real Dish Photo */
  }
            <div className="rounded-3xl bg-gradient-to-br from-[#FBF9FF] via-[#F3EEFF] to-[#EDE9FE]/70 dark:from-[#1A1C23] dark:via-[#1B1E25] dark:to-[#1F222A] border border-[#E5DDF7] dark:border-[#2E3340] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {
    /* Left: Animated Chef MilkMate + Speech Bubble */
  }
              <div className="sm:col-span-6 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
    key={chef.bubbleText}
    initial={{ opacity: 0, y: 6, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="relative w-full max-w-xs mb-2.5 rounded-2xl bg-white dark:bg-[#181A20] border-2 border-[#DDD6FE] dark:border-[#14B8A6]/50 px-3.5 py-2.5 shadow-sm"
  >
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                      {chef.bubbleText}
                    </p>
                    <span
    aria-hidden="true"
    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-white dark:bg-[#181A20] border-e-2 border-b-2 border-[#DDD6FE] dark:border-[#14B8A6]/50"
  />
                  </motion.div>
                </AnimatePresence>

                <MilkMascot mood={chef.mood} pose={chef.pose} size="lg" interactive />
              </div>

              {
    /* Right: Realistic Dish Card + Macros */
  }
              <div className="sm:col-span-6 space-y-3">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#EAE3F8] dark:border-[#2E3340]">
                  <SafeImage
    src={meal.image}
    alt={mealName}
    className="w-full h-full object-cover"
    fallbackType="meal"
  />
                  <div className="absolute bottom-2 start-2 px-2.5 py-1 rounded-lg bg-white/92 dark:bg-[#181A20]/95 text-[11px] font-bold text-[#1E1B2E] dark:text-[#F3F4F6] inline-flex items-center gap-1">
                    <Clock size={11} className="text-[#7C3AED] dark:text-[#2DD4BF]" />
                    {t("diet.prepTime", { min: meal.prepMinutes })}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-2xl bg-white/90 dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] text-center tabular-nums">
                  <div>
                    <p className="text-[10px] text-[#6E6586] dark:text-[#9CA3AF]">
                      {t("common.kcal")}
                    </p>
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] inline-flex items-center gap-0.5">
                      <Flame size={10} className="text-[#EC4899]" />
                      {meal.calories}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6E6586] dark:text-[#9CA3AF]">
                      {t("common.protein")}
                    </p>
                    <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
                      {meal.protein}g
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6E6586] dark:text-[#9CA3AF]">
                      {t("common.carbs")}
                    </p>
                    <p className="text-xs font-bold text-[#EC4899]">{meal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6E6586] dark:text-[#9CA3AF]">
                      {t("common.fats")}
                    </p>
                    <p className="text-xs font-bold text-[#10B981]">{meal.fats}g</p>
                  </div>
                </div>

                <p className="text-[11px] text-[#4C4461] dark:text-[#D1D5DB] leading-relaxed">
                  <strong className="text-[#1E1B2E] dark:text-[#F3F4F6]">{serving}:</strong>{" "}
                  {mealDesc}
                </p>
              </div>
            </div>

            {
    /* Stage Switcher Tabs */
  }
            <div className="grid grid-cols-2 gap-2">
              <button
    type="button"
    onClick={() => setStage("ingredients")}
    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${stage === "ingredients" ? "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] text-white" : "bg-[#FBF9FF] dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                {t("diet.chef.tabIngredients")}
              </button>
              <button
    type="button"
    onClick={() => {
      setStage("cook");
      playCoachSound("step", muted);
    }}
    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${stage !== "ingredients" ? "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] text-white" : "bg-[#FBF9FF] dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                {t("diet.chef.tabCook")}
              </button>
            </div>

            {
    /* STAGE 1: INTERACTIVE INGREDIENT CHECKLIST */
  }
            {stage === "ingredients" && <motion.div
    key="stage-ingredients"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
  >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] inline-flex items-center gap-1.5">
                      <Utensils size={13} className="text-[#7C3AED] dark:text-[#2DD4BF]" />
                      {t("diet.ingredients")}
                    </p>
                    <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
                      {t("diet.chef.tapToCheck")}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
                    {t("diet.chef.ingredientsChecked", {
    done: checkedIngredients.length,
    total: ingredients.length
  })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingredients.map((ing, idx) => {
    const checked = checkedIngredients.includes(idx);
    return <button
      key={idx}
      type="button"
      onClick={() => toggleIngredient(idx)}
      className={`p-3 rounded-xl border text-start flex items-center gap-2.5 transition-all ${checked ? "bg-[#F5F1FE] dark:bg-[#162726] border-[#7C3AED] dark:border-[#14B8A6] text-[#1E1B2E] dark:text-[#F3F4F6]" : "bg-[#FBF9FF] dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
    >
                        <span
      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "border border-[#C4B5FD] dark:border-[#4B5563] bg-white dark:bg-[#181A20]"}`}
    >
                          {checked && <Check size={12} />}
                        </span>
                        <span className={`text-xs font-semibold ${checked ? "line-through opacity-75" : ""}`}>
                          {ing}
                        </span>
                      </button>;
  })}
                </div>

                <button
    type="button"
    onClick={handleStartCooking}
    className="btn-3d-primary w-full py-3.5 rounded-2xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2"
  >
                  <ChefHat size={16} />
                  {t("diet.chef.startCookingBtn")}
                  <ForwardIcon size={15} />
                </button>
              </motion.div>}

            {
    /* STAGE 2: STEP-BY-STEP GUIDED COOKING */
  }
            {stage === "cook" && <motion.div
    key="stage-cook"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
  >
                {
    /* Step Progress Pills */
  }
                <div className="flex items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
                    {t("diet.chef.stepCounter", {
    current: stepIndex + 1,
    total: steps.length
  })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, idx) => <button
    key={idx}
    type="button"
    onClick={() => {
      setStepIndex(idx);
      playCoachSound("step", muted);
    }}
    aria-label={`Step ${idx + 1}`}
    className={`h-2.5 rounded-full transition-all ${idx === stepIndex ? "w-7 bg-[#7C3AED] dark:bg-[#0D9488]" : idx < stepIndex ? "w-3.5 bg-[#A78BFA] dark:bg-[#14B8A6]/60" : "w-2.5 bg-[#EAE3F8] dark:bg-[#2E3340]"}`}
  />)}
                  </div>
                </div>

                {
    /* Big Focus Instruction Card */
  }
                <AnimatePresence mode="wait">
                  <motion.div
    key={stepIndex}
    initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
    transition={{ duration: 0.18 }}
    className="rounded-2xl border-2 border-[#DDD6FE] dark:border-[#14B8A6]/60 bg-[#FBF9FF] dark:bg-[#1F222A] p-4 sm:p-5 space-y-2"
  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#F3EEFF] dark:bg-[#162726] text-[11px] font-extrabold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
                        {stepIndex + 1} / {steps.length}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                      {steps[stepIndex]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {
    /* Prev / Next Controls */
  }
                <div className="flex items-center gap-2.5">
                  <button
    type="button"
    onClick={handlePrevStep}
    className="btn-3d-secondary px-4 py-3 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] text-xs font-bold text-[#4C4461] dark:text-[#D1D5DB] inline-flex items-center gap-1.5"
  >
                    <BackIcon size={14} />
                    {t("diet.chef.prevStep")}
                  </button>

                  <button
    type="button"
    onClick={handleNextStep}
    className="btn-3d-primary flex-1 py-3 px-4 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5"
  >
                    <span>
                      {stepIndex < steps.length - 1 ? t("diet.chef.nextStep") : t("diet.chef.finishCookingBtn")}
                    </span>
                    {stepIndex < steps.length - 1 ? <ForwardIcon size={14} /> : <Sparkles size={14} />}
                  </button>
                </div>

                {
    /* Clickable Overview of All Steps */
  }
                <div className="pt-1 space-y-1.5">
                  <p className="text-[11px] font-bold text-[#6E6586] dark:text-[#9CA3AF]">
                    {t("diet.chef.allStepsOverview")}
                  </p>
                  <div className="space-y-1.5">
                    {steps.map((st, idx) => <button
    key={idx}
    type="button"
    onClick={() => {
      setStepIndex(idx);
      playCoachSound("step", muted);
    }}
    className={`w-full text-start px-3 py-2 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${idx === stepIndex ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]" : "border-[#EAE3F8] dark:border-[#2E3340] bg-white dark:bg-[#181A20] text-[#6E6586] dark:text-[#9CA3AF]"}`}
  >
                        <span className="font-bold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{st}</span>
                      </button>)}
                  </div>
                </div>
              </motion.div>}

            {
    /* STAGE 3: DISH READY CELEBRATION */
  }
            {stage === "done" && <motion.div
    key="stage-done"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="rounded-2xl border border-[#DDD6FE] dark:border-[#14B8A6]/50 bg-[#F5F1FE] dark:bg-[#162726] p-5 text-center space-y-3"
  >
                <p className="text-base font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {t("diet.chef.doneTitle", { meal: mealName })}
                </p>
                <p className="text-xs text-[#4C4461] dark:text-[#D1D5DB]">
                  {t("diet.chef.doneBubble")}
                </p>
                <button
    type="button"
    onClick={() => {
      setStage("cook");
      setStepIndex(0);
    }}
    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] text-xs font-bold text-[#4C4461] dark:text-[#D1D5DB]"
  >
                  <RotateCcw size={13} />
                  {t("diet.chef.cookAgainBtn")}
                </button>
              </motion.div>}

            {
    /* Modal Footer: Plan & Diary Actions */
  }
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#F0EBFA] dark:border-[#2A2E39]">
              <button
    type="button"
    onClick={() => isPlanned ? removeMealFromPlan(meal.id, meal.category) : addMealToPlan(meal.id, meal.category, t("diet.mealAddedToast"))}
    className={`px-4 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors ${isPlanned ? "bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6]" : "btn-3d-secondary bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#E5E7EB]"}`}
  >
                {isPlanned ? <Trash2 size={14} /> : <Plus size={14} />}
                {isPlanned ? t("diet.removeFromPlan") : t("diet.addToPlan")}
              </button>

              <button
    type="button"
    onClick={() => {
      logSmartMealToDiary(
        meal,
        mealName,
        serving,
        t("nutrition.foodLoggedToast")
      );
      onClose();
    }}
    className="btn-3d-primary flex-1 py-3 px-4 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold"
  >
                {t("common.logMeal")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>;
};
export {
  ChefRecipeModal
};
